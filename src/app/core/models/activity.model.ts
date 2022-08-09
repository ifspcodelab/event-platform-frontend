import { EventStatusModel } from "./event-status.model";
import { SpaceDto } from "./space.model";
import { AreaDto } from "./area.model";
import { LocationDto } from "./location.model";
import { ActivityType } from "./activity-type.model";
import { EventDto } from "./event.model";
import { SubeventDto } from "./subevent.model";
import { ActivityModality } from "./activity-modality.model";

export interface ActivityCreateDto{
  title: string;
  slug: string;
  description: string;
  type: ActivityType;
  modality: ActivityModality;
  needRegistration: boolean;
  duration: number;
  status: EventStatusModel;
}


export interface ActivityDto{
  id: string;
  title: string;
  slug: string;
  description: string;
  type: ActivityType;
  modality: ActivityModality;
  needRegistration?: boolean;
  duration: number;
  status: EventStatusModel;
  cancellationMessage?: string;
  event?: EventDto;
  subevent?: SubeventDto;
}

export interface SessionDto{
  id: string;
  title: string;
  seats: number;
  schedulesSession: SessionScheduleDto[];
}


export interface SessionScheduleDto{
  id: string;
  start: string;
  end: string;
  location: LocationDto;
  area?: AreaDto;
  space?: SpaceDto;
}
