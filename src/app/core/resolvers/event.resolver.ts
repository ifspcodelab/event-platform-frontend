import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, first, Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { EventService } from "../services/event.service";
import { EventDto } from "../models/event.model";


@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<EventDto> {

  constructor(private eventService: EventService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventDto> {
    const eventSlug = route.paramMap.get('eventSlug');

    if(!eventSlug) {
      this.router.navigate(['']);
      return of(null);
    }

    return this.eventService.getEventsBySlug(eventSlug)
      .pipe(
        first(),
        map(eventsDto => eventsDto[0]),
        catchError(_ => {
          this.router.navigate(['']);
          return of(null)
        })
      )
  }
}
