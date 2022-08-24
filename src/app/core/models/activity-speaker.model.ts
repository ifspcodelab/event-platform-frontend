import { ActivityDto } from "./activity.model";
import { SpeakerDto } from "./speaker.model";

export interface ActivitySpeakerCreateDto{
  speakerId: string;
}

export interface ActivitySpeakerDto{
  id: string;
  activityDto: ActivityDto;
  speakerDto: SpeakerDto;
}
