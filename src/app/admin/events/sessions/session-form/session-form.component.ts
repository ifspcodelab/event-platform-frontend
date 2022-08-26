import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../../../core/validators/app-validator";
import { LocationDto } from "../../../../core/models/location.model";
import { first } from "rxjs";
import { LocationService } from "../../../../core/services/location.service";
import { AreaDto } from "../../../../core/models/area.model";
import { SpaceDto } from "../../../../core/models/space.model";
import { AreaService } from "../../../../core/services/area.service";
import { SpaceService } from "../../../../core/services/space.service";
import { ActivityDto, SessionDto, SessionScheduleDto } from "../../../../core/models/activity.model";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "../../../../core/services/event.service";
import { ActivityService } from "../../../../core/services/activity.service";
import { SessionService } from "../../../../core/services/session.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../../core/models/problem-detail";
import { NotificationService } from "../../../../core/services/notification.service";

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss']
})
export class SessionFormComponent implements OnInit {
  eventId: string;
  subeventId: string;
  activityId: string;
  activityDto: ActivityDto;
  sessionId: string;
  sessionDto: SessionDto;
  createMode: boolean = true;
  eventMode: boolean = true;
  form: FormGroup;
  submitted: boolean = false;
  locationsDto: LocationDto[];
  formData: { locationId: string, areasDto: AreaDto[], spacesDto: SpaceDto[] }[] = [
    { locationId: "", areasDto: [], spacesDto: [] }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private activityService: ActivityService,
    private sessionService: SessionService,
    private locationService: LocationService,
    private areaService: AreaService,
    private spaceService: SpaceService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();

    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.activityId = this.route.snapshot.paramMap.get('activityId');
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');

    if(this.subeventId) {
      this.eventMode = false;
    }

    if(this.sessionId) {
      this.createMode = false;

      if(this.eventMode) {
        this.fetchEventActivity()
      } else {
        this.fetchSubEventActivity()
      }
    }

    this.fetchLocation();
  }

  fetchEventActivity() {
    this.activityService.getEventActivity(this.eventId, this.activityId)
      .pipe(first())
      .subscribe(activityDto => this.activityDto = activityDto)
  }

  fetchEventSession() {
    this.loadFormData();
  }

  fetchSubEventSession() {
    this.loadFormData();
  }

  loadFormData() {
    console.log(this.form);
    this.form.patchValue(this.sessionDto);

    this.sessionDto.sessionSchedules.forEach((sessionsSchedule, index) => {
      this.formData[index] = { locationId: sessionsSchedule.location.id, areasDto: [], spacesDto: [] }

      const scheduleFormGroup = this.buildScheduleFormGroup()

      scheduleFormGroup.get("locationId").setValue(sessionsSchedule.location.id);

      this.fetchArea(sessionsSchedule.location.id, index);

      if(sessionsSchedule.area) {
        scheduleFormGroup.get("areaId").setValue(sessionsSchedule.area.id);
        this.fetchSpace(sessionsSchedule.location.id, sessionsSchedule.area.id, index);
      }

      if(sessionsSchedule.space) {
        scheduleFormGroup.get("spaceId").setValue(sessionsSchedule.space.id);
      }
      this.sessionSchedules.push(scheduleFormGroup);
    })
  }

  fetchSubEventActivity() {
    this.activityService.getSubEventActivity(this.eventId, this.subeventId, this.activityId)
      .pipe(first())
      .subscribe(activityDto => this.activityDto = activityDto)
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

  // TODO: COLOCAR O min date e max date com base no execution date do evento
  // https://h2qutc.github.io/angular-material-components/datetimepicker


  private buildForm() {
    const sessionSchedulesArray = this.createMode ?
      this.formBuilder.array([this.buildScheduleFormGroup()], Validators.required) :
      this.formBuilder.array([], Validators.required)

    return this.formBuilder.group({
      title: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(1), Validators.maxLength(30)]],
      seats: ['', [Validators.required, Validators.min(1)]],
      sessionSchedules:  sessionSchedulesArray
    });
  }

  private buildScheduleFormGroup() {
    return this.formBuilder.group({
      locationId: ['', [Validators.required]],
      areaId: [''],
      spaceId: [''],
      url: [''],
      executionStart: [''],
      executionEnd: ['']
    })
  }

  get sessionSchedules(): FormArray {
    return this.form.get('sessionSchedules') as FormArray;
  }

  addSessionSchedule() {
    this.formData.push({ locationId: "", areasDto: [], spacesDto: [] })
    this.sessionSchedules.push(this.buildScheduleFormGroup());
  }

  removeSessionSchedule(formGroupIndex: any) {
    this.formData = this.formData.filter((_, index) => index != formGroupIndex);
    this.sessionSchedules.removeAt(formGroupIndex);
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
    // if(this.form.invalid) {
    //   return;
    // }

    if(this.createMode) {
      this.createSession();
    } else {
      this.updateSession();
    }
  }

  getBackUrl() {
    if(this.eventMode) {
      return this.router.navigate(['admin', 'events', this.eventId, 'activities', this.activityId], { queryParams: { tab: 2 }});
    } else {
      return this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', this.activityId], { queryParams: { tab: 2 }});
    }
  }

  private createSession() {
    if(this.eventMode) {
      this.sessionService.postEventSession(this.eventId, this.activityId, this.form.value)
        .pipe(first())
        .subscribe({
          next: sessionDto => console.log(sessionDto),
          error: error => this.handleError(error)
        });
    } else {
      this.sessionService.postSubEventSession(this.eventId, this.subeventId, this.activityId, this.form.value)
        .pipe(first())
        .subscribe({
          next: sessionDto => console.log(sessionDto),
          error: error => this.handleError(error)
        });
    }
  }

  private updateSession() {

  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.name);
          if(formControl) {
            formControl.setErrors({ serverError: violation.message });
          }
        })
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "Resource already exists exception") {
          const violation = problem.violations[0];
          if(violation.message.includes("title")) {
            this.form.get("title").setErrors({ serverError: 'Já existe uma atividade com esse título' });
          }
          if(violation.message.includes("slug")) {
            this.form.get("slug").setErrors({ serverError: 'Já existe uma atividade com esse slug' });
          }
        } else {
          this.notificationService.error(problem.violations[0].message);
        }
      }
    }
  }



  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

}
