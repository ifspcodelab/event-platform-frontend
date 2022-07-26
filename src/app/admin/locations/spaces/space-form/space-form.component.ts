import { Component, Inject, OnInit } from '@angular/core';
import { SpaceService } from "../../../../core/services/space.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { first } from "rxjs";
import { SpaceType } from "../../../../core/models/spaceType.model";
import { SpaceDto } from "../../../../core/models/space.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Violation } from "../../../../core/models/problem-detail";
import { AppValidators } from "../../../../core/validators/app-validator";

@Component({
  selector: 'app-space-form',
  templateUrl: './space-form.component.html',
  styleUrls: ['./space-form.component.scss']
})
export class SpaceFormComponent implements OnInit {
  form: FormGroup;
  spaceType = SpaceType;
  enumKeys: any = [];
  submitted: boolean = false;
  createMode: boolean;

  constructor(
    private spaceService: SpaceService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SpaceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationId: string, areaId: string, spaceDto: SpaceDto }
  ) {
    this.enumKeys = Object.keys(this.spaceType);
  }

  ngOnInit(): void {
    this.form = this.buildForm();

    if (this.data.spaceDto) {
      this.createMode = false;
      this.form.patchValue(this.data.spaceDto);
    } else {
      this.createMode = true;
    }
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), AppValidators.notBlank]],
      capacity: ['', [Validators.required, Validators.min(2), Validators.max(9999), AppValidators.numeric]],
      type: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    if (this.createMode) {
      this.createSpace();
    } else {
      this.updateSpace();
    }
  }

  createSpace() {
    this.spaceService.postSpace(this.data.locationId, this.data.areaId, this.form.value)
      .pipe(first())
        .subscribe({
         next: spaceDto => this.dialogRef.close(spaceDto),
         error: error => this.handleError(error)
      });
  }

  updateSpace() {
    this.spaceService.putSpace(this.data.locationId, this.data.areaId, this.data.spaceDto.id, this.form.value)
      .pipe(first())
        .subscribe({
         next: spaceDto => this.dialogRef.close(spaceDto),
         error: error => this.handleError(error)
      });
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.name);
          if (formControl) {
            formControl.setErrors({ serverError: violation.message });
          }
        })
      }

      if(error.status === 409) {
        const nameField = this.field('name');
        nameField.setErrors({ serverError: `Espaço já existente com nome ${nameField.value}` })
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
