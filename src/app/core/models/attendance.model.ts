import { SessionScheduleDto } from "./activity.model";
import { RegistrationDto } from "./registration.model";

export interface AttendanceCreateDto {
  registrationId: string;
}

export interface AttendanceDto {
  id: string;
  registration: RegistrationDto;
  sessionSchedules: SessionScheduleDto;
  // timeEmailWasSent: string;
  // emailReplyDate: string;
}



