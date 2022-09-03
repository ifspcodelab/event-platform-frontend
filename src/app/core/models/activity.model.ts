import { EventStatusModel } from "./event-status.model";
import { SpaceDto } from "./space.model";
import { AreaDto } from "./area.model";
import { LocationDto } from "./location.model";
import { ActivityType } from "./activity-type.model";
import { ActivityModality } from "./activity-modality.model";

export interface ActivityCreateDto{
  title: string;
  slug: string;
  description: string;
  type: ActivityType;
  modality: ActivityModality;
  needRegistration: boolean;
  duration: number;
  setupTime: number;
  status: EventStatusModel;
}

export interface ActivityDto{
  id: string;
  title: string;
  slug: string;
  description: string;
  type: ActivityType;
  status: EventStatusModel;
  modality: ActivityModality;
  needRegistration?: boolean;
  duration: number;
  setupTime: number;
  cancellationMessage?: string;
}

export interface ActivitySiteDto {
  activityid: string;
  activityTitle: string;
  activitySlug: string;
  activityType: string;
  activityDescription: string;
  speakerName: string;
  sessionTitle: string;
  sessionScheduleId: string;
  sessionScheduleExecutionStart: string;
  sessionScheduleExecutionEnd: string;
  sessionScheduleExecutionStartDate: string;
  speakers: string[];
}


export interface SessionCreateDto{
  title: string;
  seats: number;
  sessionSchedules: SessionScheduleCreateDto[];
}

export interface SessionDto{
  id: string;
  title: string;
  seats: number;
  cancellationMessage?: string;
  canceled?: boolean;
  sessionSchedules: SessionScheduleDto[];
}

export interface SessionScheduleCreateDto{
  executionStart: string;
  executionEnd: string;
  url?: string,
  locationId?: string;
  areaId?: string;
  spaceId?: string;
}


export interface SessionScheduleDto{
  id: string;
  executionStart: string;
  executionEnd: string;
  url?: string,
  location?: LocationDto;
  area?: AreaDto;
  space?: SpaceDto;
}
