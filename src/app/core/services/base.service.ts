import { HttpHeaders } from "@angular/common/http";

export class BaseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR'
    })
  };

  httpOptionsSkipInterceptor = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR',
      'Skip-Interceptor': ''
    })
  };
}
