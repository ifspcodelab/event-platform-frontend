import { AreaDto } from './../../../../core/models/area.model';
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
  createMode: boolean;

  constructor(
    private areaService: AreaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AreaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationId: string,  areaDto: AreaDto}
  ) { }

  ngOnInit(): void {
    if(this.data.areaDto) {
      this.createMode = false;
      this.form.patchValue(this.data.areaDto);
    }
    else {
      this.createMode = true;
    }
    console.log(this.data);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      reference: ['']
    });
  }

  onSubmit() {
    if(this.createMode) {
      this.createArea();
    }
    else {
      this.updateArea();
    }
  }

  createArea() {
    if(this.form) {
      this.areaService.postArea(this.data.locationId, this.form.value)
      .pipe(first())
      .subscribe( areaDto => {
        if(areaDto) {
          this.dialogRef.close(areaDto)
        }
      })
    }
  }

  updateArea() {
    this.areaService.putArea(this.data.locationId, this.data.areaDto.id, this.form.value)
    .subscribe( areaDto => {
      if(areaDto) {
        this.dialogRef.close(areaDto)
      }
    })
  }

}
