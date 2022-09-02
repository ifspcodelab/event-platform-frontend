import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { JwtService } from "../services/jwtservice.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { RefreshTokenRotateDto } from "../models/refresh-token.model";
import { JwtTokensDto } from "../models/jwt-tokens.model";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  interceptorSkipHeader: string = 'Skip-Interceptor';

  constructor(
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(this.interceptorSkipHeader)) {
      const headers = req.headers.delete(this.interceptorSkipHeader);
      return next.handle(req.clone({ headers }))
    }

    let accessToken: string = this.jwtService.getAccessToken()!;
    const refreshToken: string = this.jwtService.getRefreshToken()!;

    if (accessToken !== null && refreshToken !== null) {
      const isValid = this.jwtService.isRefreshTokenValid(refreshToken);

      if (!isValid) {
        this.jwtService.removeAccessToken();
        this.jwtService.removeRefreshToken();

        this.router.navigate(['login']);
        return throwError(() => 'Refresh Token expired');
      }

      const authRequest = req.clone(AuthInterceptor.addAuthorizationHeader(req, accessToken));

      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {

          if (error.status == 401 && isValid) {
            return this.handleUnauthorizedError(req, next, error);
          }

          return throwError(() => error)
        })
      );
    }
    else {
      this.router.navigate(['login']);
    }

    return next.handle(req);
  }

  private handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler, givenError: any) {
    const refreshTokenDto = new RefreshTokenRotateDto(this.jwtService.getRefreshToken()!);

    return this.authenticationService.postRefreshTokenRotation(refreshTokenDto).pipe(
      switchMap(
        (jwtDto: JwtTokensDto) => {
          this.jwtService.removeAccessToken();
          this.jwtService.storeAccessToken(jwtDto.accessToken);

          this.jwtService.removeRefreshToken();
          this.jwtService.storeRefreshToken(jwtDto.refreshToken);

          const refreshedRequest = req.clone(AuthInterceptor.addAuthorizationHeader(req, jwtDto.accessToken));

          return next.handle(refreshedRequest).pipe(
            catchError((error) => {
              if(error.status == 401) {
                this.jwtService.removeAccessToken();
                this.jwtService.removeRefreshToken();
                this.router.navigate(['login']);
                return throwError(() => error)
              }
              return throwError(() => error)
            })
          )
        }
      ),
      catchError(error => {
        if(error.status == 401 || error.error.title == "Invalid Refresh Token") {
          this.jwtService.removeAccessToken();
          this.jwtService.removeRefreshToken();
          this.router.navigate(['login']);
          return throwError(() => error)
        }
        return throwError(() => error)
      })
    )
  }

  private static addAuthorizationHeader(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    })
  }
}
