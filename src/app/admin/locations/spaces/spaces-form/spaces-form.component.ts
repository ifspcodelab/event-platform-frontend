import {Component, Inject, OnInit} from '@angular/core';
import {SpaceService} from "../../../../core/services/space.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AreaDto} from "../../../../core/models/area.model";
import {LocationDto} from "../../../../core/models/location.model";
import {first} from "rxjs";
import {SpaceType} from "../../../../core/models/spaceType.model";
import {SpaceDto} from "../../../../core/models/space.model";

@Component({
  selector: 'app-spaces-form',
  templateUrl: './spaces-form.component.html',
  styleUrls: ['./spaces-form.component.scss']
})

export class SpacesFormComponent implements OnInit {
  selectedValue: SpaceType;
  form: FormGroup = this.buildForm();
  spaceType = SpaceType;
  enumKeys: any = [];

  constructor(
    private spaceService: SpaceService,
    private formBUilder: FormBuilder,
    private dialogRef: MatDialogRef<SpacesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locationId: string, areaId: string, spaceDto: SpaceDto },
  ) {
    this.enumKeys=Object.keys(this.spaceType);
  }

  ngOnInit(): void {
  console.log(this.data);
  }

  buildForm(): FormGroup {
    return this.formBUilder.group({
      name: [''],
      capacity: [''],
      type: ['']
    })
  }

  onSubmit() {
    this.createSpace();
  }

  createSpace() {
    if (this.form) {
      this.spaceService.postSpace(this.data.locationId, this.data.areaId, this.form.value)
        .pipe(first())
        .subscribe(spaceDto => this.dialogRef.close(spaceDto))
    }
  }
}
