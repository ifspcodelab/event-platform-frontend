import { EventStatusModel } from "./event-status.model";
import { Period } from "./period.model";

export interface EventDto {
  id: string;
  title: string;
  slug: string;
  summary: string;
  presentation: string;
  registrationPeriod: Period;
  executionPeriod: Period;
  smallerImage: string;
  biggerImage: string;
  status: EventStatusModel;
  cancellationMessage: string;
}

export class EventCreateDto {
  title: string;
  slug: string;
  summary: string;
  presentation: string;
  registrationPeriod: Period;
  executionPeriod: Period;
  smallerImage: string;
  biggerImage: string;

  constructor(
    title: string,
    slug: string,
    summary: string,
    presentation: string,
    registrationPeriod: Period,
    executionPeriod: Period,
    smallerImage: string,
    biggerImage: string
  ) {
    this.title = title;
    this.slug = slug;
    this.summary = summary;
    this.presentation = presentation;
    this.registrationPeriod = registrationPeriod;
    this.executionPeriod = executionPeriod;
    this.smallerImage = smallerImage;
    this.biggerImage = biggerImage;
  }
}

export class CancellationMessageCreateDto {
  reason: string;

  constructor(reason: string) {
    this.reason = reason;
  }
}
