import {EventStatusModel} from "./event-status.model";
import {Period} from "./period.model";

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
}

export interface EventCreateDto {
  title: string;
  slug: string;
  summary: string;
  presentation: string;
  registrationPeriod: Period;
  executionPeriod: Period;
  smallerImage: string;
  biggerImage: string;
}
