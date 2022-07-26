import { first } from 'rxjs/operators';
import { AreaService } from './../../../../core/services/area.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationDto } from 'src/app/core/models/location.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {
  form: FormGroup = this.buildForm();

  constructor(
    private areaService: AreaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AreaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationDto: LocationDto }
  ) { }

  ngOnInit(): void {
    console.log(this.data.locationDto);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      reference: ['']
    });
  }

  onSubmit() {
    this.createArea();
  }

  createArea() {
    if(this.form) {
      this.areaService.postArea(this.data.locationDto.id, this.form.value)
      .pipe(first())
      .subscribe(
        areaDto => {
        this.dialogRef.close(areaDto);
      }
    );
    }
  }

}
