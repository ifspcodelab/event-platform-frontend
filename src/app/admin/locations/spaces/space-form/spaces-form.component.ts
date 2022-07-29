import {Component, Inject, OnInit} from '@angular/core';
import {SpaceService} from "../../../../core/services/space.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {first} from "rxjs";
import {SpaceType} from "../../../../core/models/spaceType.model";
import {SpaceDto} from "../../../../core/models/space.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Violation} from "../../../../core/models/problem-detail";
import {AppValidators} from "../../../../core/validators/app-validator";

@Component({
  selector: 'app-space-form',
  templateUrl: './spaces-form.component.html',
  styleUrls: ['./spaces-form.component.scss']
})

export class SpacesFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  spaceType = SpaceType;
  enumKeys: any = [];
  submitted: boolean = false;
  createMode: boolean;

  constructor(
    private spaceService: SpaceService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SpacesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationId: string, areaId: string, spaceDto: SpaceDto }
  ) {
    this.enumKeys = Object.keys(this.spaceType);
  }

  ngOnInit(): void {
    if (this.data.spaceDto) {
      this.createMode = false;
      this.form.patchValue(this.data.spaceDto);
    } else {
      this.createMode = true;
    }
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), AppValidators.notBlank]],
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

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path).errors;
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.name);
          if (formControl) {
            formControl.setErrors({serverError: violation.message});
          }
        })
      }
    }
  }

  createSpace() {
    if (this.form) {
      this.spaceService.postSpace(this.data.locationId, this.data.areaId, this.form.value)
        .pipe(first())
        .subscribe(
          spaceDto => {
            if (spaceDto) {
              this.dialogRef.close(spaceDto)
            }
          },
          error => this.handleError(error)
        )
    }
  }

  updateSpace() {
    this.spaceService.putSpace(this.data.locationId, this.data.areaId, this.data.spaceDto.id, this.form.value)
      .subscribe(spaceDto => {
        if (spaceDto) {
          this.dialogRef.close(spaceDto)
        }
      },
        error => this.handleError(error))
  }
}
