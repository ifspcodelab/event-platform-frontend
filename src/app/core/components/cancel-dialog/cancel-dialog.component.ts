import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../validators/app-validator";
import {CancellationMessageCreateDto} from "../../models/event.model";

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss']
})
export class CancelDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string,
      cancellationMessageCreateDto: CancellationMessageCreateDto,
      cancelText: string,
      okText: string
    }
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.formBuilder.group({
      reason: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(5)]]
    });
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }
}
