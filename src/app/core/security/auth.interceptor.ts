import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {JwtService} from "../services/jwtservice.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  interceptorSkipHeader: string = 'Skip-Interceptor';

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //TODO: refactor to send rotation and then actual request
    if (req.headers.has(this.interceptorSkipHeader)) {
      console.log("interceptor skip header")
      const headers = req.headers.delete(this.interceptorSkipHeader);
      return next.handle(req.clone({ headers }))
    }

    let accessToken: string = this.jwtService.getAccessToken()!;
    const refreshToken: string = this.jwtService.getRefreshToken()!;

    if (accessToken !== null && refreshToken !== null) {
      if (this.jwtService.isAccessTokenExpired(accessToken) && this.jwtService.isRefreshTokenValid(refreshToken)) {
          this.jwtService.rotateJwtToken();
        }

      const authRequest = req.clone({
        setHeaders: {'Authorization': `Bearer ${accessToken}`}
      })

      return next.handle(authRequest);
    }
    else {
      this.router.navigate(['login']);
    }

    return next.handle(req);
  }
}
