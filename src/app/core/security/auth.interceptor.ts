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
      const authRequest = req.clone(this.addAuthorizationHeader(req, accessToken));

      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          const isValid = this.jwtService.isRefreshTokenValid(refreshToken);

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

          const refreshedRequest = req.clone(this.addAuthorizationHeader(req, jwtDto.accessToken));
          return next.handle(refreshedRequest);
        }
      ),
      catchError((error) => {
        this.jwtService.removeAccessToken();
        this.jwtService.removeRefreshToken();

        this.router.navigate(['login']);

        return throwError(() => givenError);
      })
    )
  }

  private addAuthorizationHeader(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    })
  }
}
