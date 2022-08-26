import { Component, OnInit } from '@angular/core';
import { SessionDto, SessionScheduleDto } from "../../../../core/models/activity.model";
import { LocationDto } from "../../../../core/models/location.model";
import { AreaDto } from "../../../../core/models/area.model";
import { SpaceDto } from "../../../../core/models/space.model";
import { SpaceType } from "../../../../core/models/spaceType.model";

@Component({
  selector: 'app-session-show',
  templateUrl: './session-show.component.html',
  styleUrls: ['./session-show.component.scss']
})
export class SessionShowComponent implements OnInit {
  // displayedColumns: string[] = ['location', 'area', 'space', 'start', 'end', 'actions'];
  displayedColumns: string[] = ['location', 'start', 'end', 'actions'];
  eventId: string = null;
  subEventId: string = null;
  sessionDto: SessionDto = {
    id: "d7b09a41-6b9e-40e1-8c19-fd655a0ce8c5",
    title: "",
    seats: 30,
    sessionSchedules: []
  };

  sessionSchedulesDto: SessionScheduleDto[] = [
    {
      id: "",
      executionStart: "19/09/2022 08:00",
      executionEnd: "19/09/2022 10:00",
      location: { id: "", name: "IFSP Campus São Paulo", address: "" },
      // area: { id: "", name: "Bloco C", reference: null },
      // space: { id: "", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
    },
    {
      id: "",
      executionStart: "20/09/2022 09:00",
      executionEnd: "20/09/2022 11:00",
      location: { id: "", name: "IFSP Campus São Paulo", address: "" },
      area: { id: "", name: "Bloco C", reference: null },
      // space: { id: "", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
    },
    {
      id: "",
      executionStart: "21/09/2022 09:00",
      executionEnd: "21/09/2022 11:00",
      location: { id: "", name: "IFSP Campus São Paulo", address: "" },
      area: { id: "", name: "Bloco C", reference: null },
      space: { id: "", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
    }
  ];

  id: string;
  start: string;
  end: string;
  location: LocationDto;
  area: AreaDto;
  space: SpaceDto;

  constructor() { }

  ngOnInit(): void {
  }

  openActivityList() {

  }

  getBackUrl() {

  }

  showActions() {
    return true;
  }

  cancelActivity() {

  }

  openDeleteConfirmationDialog() {

  }

  editSessionSchedule(sessionScheduleDto: SessionScheduleDto) {
    console.log(sessionScheduleDto);
  }

  deleteSessionSchedule(sessionScheduleDto: SessionScheduleDto) {
    console.log(sessionScheduleDto);
  }
}
