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

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LocationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationDto: LocationDto }
  ) { }

  ngOnInit(): void {
    console.log(this.data.locationDto);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      address: ['']
    });
  }

  onSubmit() {
    this.createLocation();
  }

  createLocation() {
    if(this.form) {
      this.locationService.postLocation(this.form.value)
      .pipe(first())
      .subscribe(
        locationDto => {
        this.dialogRef.close(locationDto);
      }
    );
    }
  }

}
