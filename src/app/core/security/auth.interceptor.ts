import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {JwtService} from "../services/jwtservice.service";
import {Observable} from "rxjs";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private jwtService: JwtService
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.jwtService.getAccessToken();

    if (accessToken !== null) {
      const authRequest = req.clone({
        setHeaders: {'Authorization': `Bearer ${accessToken}`}
      })

      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
