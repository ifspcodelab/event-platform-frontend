import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { CancelDialogComponent } from './components/cancel-dialog/cancel-dialog.component';
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CancelDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ConfirmationDialogComponent,
    CancelDialogComponent
  ]
})
export class CoreModule { }
