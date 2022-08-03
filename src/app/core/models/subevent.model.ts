import { EventStatusModel } from "./event-status.model";
import { Period } from "./period.model";

export interface SubeventDto {
  id: string;
  title: string;
  slug: string;
  summary: string;
  presentation: string;
  executionPeriod: Period;
  smallerImage: string;
  biggerImage: string;
  status: EventStatusModel;
  cancellationMessage: string;
}

export class SubeventCreateDto {
  title: string;
  slug: string;
  summary: string;
  presentation: string;
  executionPeriod: Period;
  smallerImage: string;
  biggerImage: string;
  status: EventStatusModel;

  constructor(title: string,
              slug: string,
              summary: string,
              presentation: string,
              executionPeriod: Period,
              smallerImage: string,
              biggerImage: string,
  ) {
    this.title = title;
    this.slug = slug;
    this.summary = summary;
    this.presentation = presentation;
    this.executionPeriod = executionPeriod;
    this.smallerImage = smallerImage;
    this.biggerImage = biggerImage;
    this.status = EventStatusModel.DRAFT;
  }
}

export class CancellationMessageCreateDto {
  reason: string;

  constructor(reason: string) {
    this.reason = reason;
  }
}
