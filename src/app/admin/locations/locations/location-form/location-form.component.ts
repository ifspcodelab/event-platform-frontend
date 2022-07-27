import { AppValidators } from 'src/app/core/validators/app-validator';
import { Violation } from './../../../../core/models/problem-detail';
import { first } from 'rxjs/operators';
import { LocationService } from './../../../../core/services/location.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationDto } from 'src/app/core/models/location.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  submitted: boolean = false;
  createMode: boolean;

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LocationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationDto: LocationDto }
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    if (this.data.locationDto) {
      this.createMode = false;
      this.form.patchValue(this.data.locationDto);
    } else {
      this.createMode = true;
    }
    console.log(this.data);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, AppValidators.notBlank]],
      address: ['', [Validators.required, AppValidators.notBlank]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    if (this.createMode) {
      this.createLocation();
    } else {
      this.updateLocation();
    }
  }

  createLocation() {
    if(this.form) {
      this.locationService.postLocation(this.form.value)
      .pipe(first())
      .subscribe(
        locationDto => {
          if(locationDto) {
          this.dialogRef.close(locationDto)
        }
      },
      error => this.handleError(error)
      )
    }
  }

  updateLocation() {
    this.locationService.putLocation(this.data.locationDto.id, this.form.value)
    .subscribe(locationDto => this.dialogRef.close(locationDto));
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  // containsError(path: string, validationType: string) {
  //   return this.form.get(path)!.errors[validationType];
  // }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      console.log(error);
      if(error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.name);
          if(formControl) {
            formControl.setErrors({
              serverError: violation.message
            });
            console.log(formControl);
          }
        })
      }
    }
  }

}
