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
}
