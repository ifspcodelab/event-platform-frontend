import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, first, Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { EventDto } from "../models/event.model";
import { SiteService } from "../../site/services/site.service";


@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<EventDto> {

  constructor(private siteService: SiteService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventDto> {
    const eventSlug = route.paramMap.get('eventSlug');

    if(!eventSlug) {
      this.router.navigate(['']);
      return of(null);
    }

    return this.siteService.getEventBySlug(eventSlug)
      .pipe(
        first(),
        catchError(_ => {
          this.router.navigate(['']);
          return of(null)
        })
      )
  }
}
