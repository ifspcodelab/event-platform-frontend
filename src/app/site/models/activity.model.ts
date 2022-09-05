import { ActivityType } from "../../core/models/activity-type.model";
import { EventStatusModel } from "../../core/models/event-status.model";
import { ActivityModality } from "../../core/models/activity-modality.model";

export interface ActivityForSiteDto{
  id: string;
  title: string;
  slug: string;
  description: string;
  type: ActivityType;
  status: EventStatusModel;
  modality: ActivityModality;
  needRegistration: boolean;
  duration: number;
  setupTime: number;
  speakers: string[],
  sessions: SessionForSiteDto[]
}

export interface SessionForSiteDto {
  id: string;
  title: string,
  seats: number,
  sessionSchedules: SessionScheduleForSiteDto[]
}

export interface SessionScheduleForSiteDto{
  id: string;
  executionStart: string,
  executionEnd: string,
  url: string,
  location: string,
  area: string,
  space: string
}


