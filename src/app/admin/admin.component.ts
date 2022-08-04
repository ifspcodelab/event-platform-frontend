import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoaderService } from "./loader.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  show = false;
  subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe(
      state => setTimeout(() => this.show = state.show, 50)
    )
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
