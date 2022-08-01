import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppValidators} from "../../validators/app-validator";

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss']
})
export class CancelDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, cancelMessage: string, cancelText: string, okText: string }
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.formBuilder.group({
      cancelMessage: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(5)]]
    });
  }

  formIsValid() {
    return this.form.invalid;
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }
}
