import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../../../core/validators/app-validator";
import { LocationDto } from "../../../../core/models/location.model";
import { first, Observable, startWith } from "rxjs";
import { LocationService } from "../../../../core/services/location.service";
import { map } from "rxjs/operators";
import { AreaDto } from "../../../../core/models/area.model";
import { SpaceDto } from "../../../../core/models/space.model";
import { AreaService } from "../../../../core/services/area.service";
import { SpaceService } from "../../../../core/services/space.service";
import { SessionDto, SessionScheduleDto } from "../../../../core/models/activity.model";
import { SpaceType } from "../../../../core/models/spaceType.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss']
})
export class SessionFormComponent implements OnInit {
  createMode: boolean = true;
  form: FormGroup;
  submitted: boolean = false;
  sessionId: string = null;
  locationsDto: LocationDto[];
  formData: { locationId: string, areasDto: AreaDto[], spacesDto: SpaceDto[] }[] = [
    { locationId: "", areasDto: [], spacesDto: [] }
  ]

  sessionDto: SessionDto;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private areaService: AreaService,
    private spaceService: SpaceService
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');

    if(this.sessionId) {
      this.createMode = false;
      this.fetchSession();
    } else {
      this.createMode = true;
    }

    this.fetchLocation();
  }

  fetchSession() {
    this.sessionDto = {
      id: "d7b09a41-6b9e-40e1-8c19-fd655a0ce8c5",
      title: "Sessão 1",
      seats: 30,
      schedulesSession: [
        {
          id: "",
          start: "19/09/2022 08:00",
          end: "19/09/2022 10:00",
          location: { id: "7b679c58-6b28-45ce-8643-cf4ab259343b", name: "IFSP Campus São Paulo", address: "" },
          area: null,
          space: null
        },
        {
          id: "",
          start: "20/09/2022 09:00",
          end: "20/09/2022 11:00",
          location: { id: "7b679c58-6b28-45ce-8643-cf4ab259343b", name: "IFSP Campus São Paulo", address: "" },
          area: { id: "ca1783a4-92f8-483d-a742-b5460a082dfa", name: "Bloco C", reference: null },
          space: null
        },
        {
          id: "",
          start: "21/09/2022 09:00",
          end: "21/09/2022 11:00",
          location: { id: "5607ddd3-31ed-4435-bd61-23133d2f3381", name: "IFSP Campus São Paulo", address: "" },
          area: { id: "ab0c4b24-f85f-469d-a50a-7152cc143648", name: "Bloco C", reference: null },
          space: { id: "678b3256-a518-41f4-a905-4ac219747d59", name: "Laboratório 2", capacity: 20, type: SpaceType.LABORATORY }
        }
      ]
    };
    console.log(this.sessionDto)
    this.loadFormData();
  }

  loadFormData() {
    console.log(this.form);
    this.form.patchValue(this.sessionDto);

    this.sessionDto.schedulesSession.forEach((scheduleSession, index) => {
      this.formData[index] = { locationId: scheduleSession.location.id, areasDto: [], spacesDto: [] }

      const scheduleFormGroup = this.buildScheduleFormGroup()

      scheduleFormGroup.get("location").setValue(scheduleSession.location.id);

      this.fetchArea(scheduleSession.location.id, index);

      if(scheduleSession.area) {
        scheduleFormGroup.get("area").setValue(scheduleSession.area.id);
        this.fetchSpace(scheduleSession.location.id, scheduleSession.area.id, index);
      }

      if(scheduleSession.space) {
        scheduleFormGroup.get("space").setValue(scheduleSession.space.id);
      }
      this.schedulesSession.push(scheduleFormGroup);
    })
  }

  fetchLocation() {
    this.locationService.getLocations()
      .pipe(first())
      .subscribe(locationsDto => this.locationsDto = locationsDto);
  }

  fetchArea(locationId: string, scheduleFormGroupIndex: number) {
    this.areaService.getAreas(locationId)
      .pipe(first())
      .subscribe(areasDto => this.formData[scheduleFormGroupIndex].areasDto = areasDto);
  }

  fetchSpace(locationId: string, areaId: string, scheduleFormGroupIndex: number) {
    this.spaceService.getSpaces(locationId, areaId)
      .pipe(first())
      .subscribe(spacesDto => this.formData[scheduleFormGroupIndex].spacesDto = spacesDto);
  }

  private buildForm() {
    const schedulesSessionArray = this.createMode ?
      this.formBuilder.array([this.buildScheduleFormGroup()], Validators.required) :
      this.formBuilder.array([], Validators.required)

    return this.formBuilder.group({
      title: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(3), Validators.maxLength(50)]],
      seats: ['', [Validators.required, Validators.min(1)]],
      schedulesSession:  this.formBuilder.array([], Validators.required)
    });
  }

  private buildScheduleFormGroup() {
    return this.formBuilder.group({
      location: ['', [Validators.required]],
      area: [''],
      space: [''],
      date: [''],
      start: [''],
      end: ['']
    })
  }

  get schedulesSession(): FormArray {
    return this.form.get('schedulesSession') as FormArray;
  }

  addScheduleSession() {
    this.formData.push({ locationId: "", areasDto: [], spacesDto: [] })
    this.schedulesSession.push(this.buildScheduleFormGroup());
  }

  removeScheduleSession(formGroupIndex: any) {
    this.formData = this.formData.filter((_, index) => index != formGroupIndex);
    this.schedulesSession.removeAt(formGroupIndex);
  }

  locationChange(matSelectChange: any, scheduleFormGroupIndex: any) {
    const locationId = matSelectChange.value;
    this.formData[scheduleFormGroupIndex].locationId = locationId
    this.fetchArea(locationId, scheduleFormGroupIndex)
  }

  areaChange(matSelectChange: any, scheduleFormGroupIndex: any) {
    const locationId = this.formData[scheduleFormGroupIndex].locationId;
    const areaId = matSelectChange.value;
    this.fetchSpace(locationId, areaId, scheduleFormGroupIndex);
  }

  locationsOf() {
    return this.locationsDto;
  }

  areasOf(formGroupIndex: any) {
    return this.formData[formGroupIndex].areasDto;
  }

  spacesOf(formGroupIndex: any) {
    return this.formData[formGroupIndex].spacesDto;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);
    console.log(this.form.value);
    if(this.form.invalid) {
      return;
    }

    if(this.createMode) {
      this.createSession();
    } else {
      this.updateSession();
    }
  }

  getBackUrl() {

  }

  private createSession() {

  }

  private updateSession() {

  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }



}
