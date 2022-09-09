import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrationDto } from "../../../core/models/registration.model";
import { ActivityModality } from "../../../core/models/activity-modality.model";

@Component({
  selector: 'app-registration-card',
  templateUrl: './registration-card.component.html',
  styleUrls: ['./registration-card.component.scss']
})
export class RegistrationCardComponent implements OnInit {
  @Input()
  registration: RegistrationDto;
  @Input()
  registrationType: string;
  @Input()
  primaryEventName: string;
  @Input()
  secondaryEventName: string;
  @Output()
  primaryEvent = new EventEmitter<string>();
  @Output()
  secondaryEvent = new EventEmitter<string>();
  @Input()
  actionLoading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  showUrl() {
    const modality = ActivityModality[this.registration.session.activity.modality];
    return modality == ActivityModality.ONLINE.toString() || modality == ActivityModality.HYBRID.toString();
  }

  showLocation() {
    const modality = ActivityModality[this.registration.session.activity.modality];
    return modality == ActivityModality.IN_PERSON.toString() || modality == ActivityModality.HYBRID.toString();
  }

  primaryEventExecute(registrationId: string) {
    this.primaryEvent.emit(registrationId);
  }

  secondaryEventExecute(registrationId: string) {
    this.secondaryEvent.emit(registrationId);
  }

  isCanceled() {
    return this.registrationType == 'canceled';
  }

  isConfirmed() {
    return this.registrationType == 'confirmed';
  }

  isActivityOnline() {
    const modality = ActivityModality[this.registration.session.activity.modality];
    return modality == ActivityModality.ONLINE.toString();
  }
}
