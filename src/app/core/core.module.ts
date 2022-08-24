import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { CancelDialogComponent } from './components/cancel-dialog/cancel-dialog.component';
import { MatInputModule } from "@angular/material/input";
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { MatIconModule } from "@angular/material/icon";
import { SearchTypesPipe } from './pipes/search-types.pipe';
import { EventStatusPipe } from "./pipes/event-status.pipe";
import { ActivityTypesPipe } from "./pipes/activity-types.pipe";
import { ActivityModalitiesPipe } from "./pipes/activity-modalities.pipe";
import { CpfFomatPipe } from './pipes/cpfFomat.pipe';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CancelDialogComponent,
    AdminHeaderComponent,
    EventStatusPipe,
    ActivityTypesPipe,
    ActivityModalitiesPipe,
    CpfFomatPipe,
    SearchTypesPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ConfirmationDialogComponent,
    CancelDialogComponent,
    AdminHeaderComponent,
    EventStatusPipe,
    ActivityTypesPipe,
    ActivityModalitiesPipe,
    CpfFomatPipe
  ]
})
export class CoreModule { }
