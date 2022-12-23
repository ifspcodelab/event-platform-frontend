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
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), AppValidators.notBlank, AppValidators.alpha]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), AppValidators.notBlank, AppValidators.alpha]]
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
    this.locationService.postLocation(this.form.value)
      .pipe(first())
      .subscribe({
        next: locationDto => this.dialogRef.close(locationDto),
        error: error => this.handleError(error)
      })
  }

  updateLocation() {
    this.locationService.putLocation(this.data.locationDto.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: locationDto => this.dialogRef.close(locationDto),
        error: error => this.handleError(error)
      })
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
        const nameField = this.field('name');
        nameField.setErrors({ serverError: `Local já existente com nome ${nameField.value}` })
      }
    }
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path).errors;
  }
}

