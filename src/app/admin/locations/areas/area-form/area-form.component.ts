import { AppValidators } from 'src/app/core/validators/app-validator';
import { Violation } from './../../../../core/models/problem-detail';
import { AreaDto } from './../../../../core/models/area.model';
import { first } from 'rxjs/operators';
import { AreaService } from './../../../../core/services/area.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationDto } from 'src/app/core/models/location.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  createMode: boolean;

  constructor(
    private areaService: AreaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AreaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationId: string,  areaDto: AreaDto }
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();

    if(this.data.areaDto) {
      this.createMode = false;
      this.form.patchValue(this.data.areaDto);
    }
    else {
      this.createMode = true;
    }
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(80), AppValidators.notBlank]],
      reference: ['', [AppValidators.optional({ minLength: 4, maxLength: 150 })]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    if(this.form.value.reference.trim() == '') {
      this.form.value.reference = null;
    }

    if(this.createMode) {
      this.createArea();
    } else {
      this.updateArea();
    }
  }

  createArea() {
    this.areaService.postArea(this.data.locationId, this.form.value)
      .pipe(first())
      .subscribe({
        next: areaDto => this.dialogRef.close(areaDto),
        error: error => this.handleError(error)
      });
  }

  updateArea() {
    this.areaService.putArea(this.data.locationId, this.data.areaDto.id, this.form.value)
      .subscribe({
        next: areaDto => this.dialogRef.close(areaDto),
        error: error => this.handleError(error)
      });
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
        nameField.setErrors({ serverError: `Área já existente com nome ${nameField.value}` })
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
