import { SessionScheduleDto } from "./activity.model";
import { RegistrationDto } from "./registration.model";

export interface AttendanceDto {
  accountId: string;
}

export interface AttendanceDto {
  id: string;
  registration: RegistrationDto;
  sessionSchedule: SessionScheduleDto;
  // timeEmailWasSent: string;
  // emailReplyDate: string;
}

export class AttendanceCreateDto {
  registrationId: string;
}

