export interface AttendanceDto {
  id: string;
  createdAt: string;
  sessionId: string;
  sessionScheduleId: string;
  registrationId: string;
}

export interface AttendanceCreateDto {
  registrationId: string;
}
