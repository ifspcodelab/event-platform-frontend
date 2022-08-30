import { SessionDto } from './../../../../../../core/models/activity.model';
import { Component, OnInit } from '@angular/core';
import { EnrolledStatusModel } from 'src/app/core/models/enrolled-status.model';
import { SpaceType } from 'src/app/core/models/spaceType.model';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  displayedColumns: string[] = ['user', 'status'];

 enrolledsDto: any[] = [
  {
    id: "459736c1-159f-4de5-82dd-db66bd9a9079",
    user: { id: "", name: "Carlos", email: "", cpf: "", agreed: "", role: "", verified: "true", registrationTimestamp: "" },
    status: EnrolledStatusModel.CONFIRMED,
  },
  {
    id: "459736c1-159f-4de5-82dd-db66bd9a9078",
    user: { id: "", name: "Daniel", email: "", cpf: "", agreed: "", role: "", verified: "true", registrationTimestamp: "" },
    status: EnrolledStatusModel.WAITING_LIST,
  }
]

// sessionDto: SessionDto = {
//   id: "",
//   title: "Sessão 1",
//   seats: 8,
//   schedulesSession: SessionScheduleDto[] [{
//   id: "",
//   start: "21/09/2022 09:00",
//   end: "21/09/2022 11:00",
//   location: { id: "", name: "IFSP Campus São Paulo", address: "" },
//   area: { id: "", name: "Bloco C", reference: null },
//   space: { id: "", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
//   }],
// }

  constructor() { }

  ngOnInit(): void {
    console.log(this.enrolledsDto);
  }

}
