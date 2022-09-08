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
  tabSelectedIndex: number = 0;
  displayedColumns: string[] = ['location', 'start', 'end', 'actions'];
  eventId: string = "fc64e57a-aaf5-45a8-beb6-90066a21a217";
  activityId: string = "5632547d-ac27-4fe2-8d1b-0de8697e45f5";
  sessionId: string = "5632547d-ac27-4fe2-8d1b-0de8697e45f6";
  subEventId: string = null;
  sessionDto: SessionDto = {
    id: "d7b09a41-6b9e-40e1-8c19-fd655a0ce8c5",
    title: "",
    seats: 30,
    schedulesSession: []
  };

  sessionSchedulesDto: SessionScheduleDto[] = [
    {
      id: "",
      start: "19/09/2022 08:00",
      end: "19/09/2022 10:00",
      location: { id: "", name: "IFSP Campus São Paulo", address: "" },
      // area: { id: "", name: "Bloco C", reference: null },
      // space: { id: "", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
    },
    {
      id: "",
      start: "20/09/2022 09:00",
      end: "20/09/2022 11:00",
      location: { id: "", name: "IFSP Campus São Paulo", address: "" },
      area: { id: "", name: "Bloco C", reference: null },
      // space: { id: "", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
    },
    {
      id: "",
      start: "21/09/2022 09:00",
      end: "21/09/2022 11:00",
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
