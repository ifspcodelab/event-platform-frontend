import { Injectable } from '@angular/core';
import { Router, Resolve,  RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, first, Observable, of, switchMap, tap } from 'rxjs';
import { map } from "rxjs/operators";
import { EventService } from "../services/event.service";
import { SubeventService } from "../services/subevent.service";
import { EventDto } from "../models/event.model";
import { SubeventDto } from "../models/subevent.model";
import { SiteService } from "../../site/services/site.service";

export interface SubeventDtoResolved {
  eventDto: EventDto;
  subeventDto: SubeventDto;
}

@Injectable({
  providedIn: 'root'
})
export class SubeventResolver implements Resolve<SubeventDtoResolved> {

  constructor(private siteService: SiteService, private subeventService: SubeventService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubeventDtoResolved> {
    const eventSlug = route.paramMap.get('eventSlug');
    const subeventSlug = route.paramMap.get('subeventSlug');

    if(!eventSlug || !subeventSlug) {
      this.router.navigate(['']);
      return of(null);
    }

    return this.siteService.getEventBySlug(eventSlug)
      .pipe(
        first(),
        switchMap(eventDto => {
          return this.siteService.getSubeventBySlug(eventDto.slug, subeventSlug)
            .pipe(
              first(),
              map(subeventDto => ({ eventDto: eventDto, subeventDto: subeventDto })),
              catchError(_ => {
                this.router.navigate(['']);
                return of(null)
              })
            )
        })
      )
  }
}
