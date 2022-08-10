import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderSubject = new Subject<LoaderState>();
  loaderState: Observable<LoaderState>;

  constructor() {
    this.loaderState = this.loaderSubject.asObservable();
  }

  show(): void {
    this.loaderSubject.next({ show: true });
  }

  hide(): void {
    this.loaderSubject.next({ show: false });
  }
}
