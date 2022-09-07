import { ActivityType } from "../../core/models/activity-type.model";
import { EventStatusModel } from "../../core/models/event-status.model";
import { ActivityModality } from "../../core/models/activity-modality.model";
import { SpaceType } from "../../core/models/spaceType.model";

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
  confirmedSeats: number,
  sessionSchedules: SessionScheduleForSiteDto[]
}

export interface SessionScheduleForSiteDto{
  id: string;
  executionStart: string,
  executionEnd: string,
  url: string,
  locationName: string,
  locationAddress: string,
  areaName: string,
  spaceName: string,
  spaceType: SpaceType
}


