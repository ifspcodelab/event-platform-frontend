import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../../core/services/account.service";
import {LoaderService} from "../../loader.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppValidators} from "../../../core/validators/app-validator";
import {MatTableDataSource} from "@angular/material/table";
import {UsersDto} from "../../../core/models/users.model";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss']
})
export class AccountSearchComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  requestLoading: boolean = false;
  displayedColumns: string[] = ['name', 'email', 'cpf', 'agreed', 'role', 'verified', 'registrationTimestamp'];
  usersDto: UsersDto[] = [];
  dataSource: MatTableDataSource<UsersDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private accountService: AccountService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();

  }

  private buildForm() {
    return this.formBuilder.group({
      query: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ]
    })
  }

  onSubmit() {
    if(this.form.invalid){
      return;
    }
    this.requestLoading = true;
    this.fetchUsers(this.form.value['query']);
    this.requestLoading = false;
  }
  fetchUsers(query: string) {
    this.accountService.getAccountsByName(query)
      .subscribe(
        pageDto => {
          console.log(pageDto);
          this.usersDto= pageDto.content;
          this.dataSource = new MatTableDataSource<UsersDto>(this.usersDto);
          this.loaderService.hide();
        }
      )
  }

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;

    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
  }

}
