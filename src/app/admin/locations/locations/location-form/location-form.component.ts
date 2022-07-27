import { first } from 'rxjs/operators';
import { LocationService } from './../../../../core/services/location.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationDto } from 'src/app/core/models/location.model';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
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
      name: [''],
      address: ['']
    });
  }

  onSubmit() {
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
      .subscribe(locationDto => this.dialogRef.close(locationDto));
    }
  }

  updateLocation() {
    this.locationService.putLocation(this.data.locationDto.id, this.form.value)
    .subscribe(locationDto => this.dialogRef.close(locationDto));
  }

}
