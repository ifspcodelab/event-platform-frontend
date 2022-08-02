import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ConfirmationDialogComponent,
    AdminHeaderComponent
  ]
})
export class CoreModule { }
