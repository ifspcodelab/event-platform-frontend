import { SpeakerDto } from "./speaker.model";

export interface ActivitySpeakerCreateDto{
  speakerId: string;
}

export interface ActivitySpeakerDto{
  id: string;
  speakerDto: SpeakerDto;
}
