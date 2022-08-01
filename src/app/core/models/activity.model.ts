import { EventStatusModel } from "./event-status.model";
import { SpaceDto } from "./space.model";
import { AreaDto } from "./area.model";
import { LocationDto } from "./location.model";

export interface ActivityDto{
  id: string;
  title: string;
  slug: string;
  description: string;
  status: EventStatusModel;
}

export interface SessionDto{
  id: string;
  seats: number;
}


export interface SessionScheduleDto{
  id: string;
  start: string;
  end: string;
  location: LocationDto;
  area?: AreaDto;
  space?: SpaceDto;
}
