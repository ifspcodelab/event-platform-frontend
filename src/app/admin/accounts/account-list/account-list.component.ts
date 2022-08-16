import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";
import {UsersDto} from "../../../core/models/users.model";
import {AccountService} from "../../../core/services/account.service";
import {LoaderService} from "../../loader.service";
import { Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountDto} from "../../../core/models/account.model";
import {SearchType} from "../../../core/models/search-types.model";


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'cpf', 'agreed', 'role', 'verified', 'registrationTimestamp'];
  accountDto: AccountDto[] = [];
  dataSource: MatTableDataSource<AccountDto>;
  @ViewChild(MatSort)
  sort: MatSort;
  form: FormGroup;
  submitted: boolean = false;
  requestLoading: boolean = false;
  enumKeys: any = [];
  searchType = SearchType;
  selectedOption = 'NAME';


  constructor(
    private accountService: AccountService,
    private loaderService: LoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer,
  ) {
    this.enumKeys = Object.keys(this.searchType);
  }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.loaderService.show();
    this.fetchAccountsByQuery('', this.selectedOption);
  }

  onSubmit() {
    if(this.form.invalid){
      return;
    }
    this.requestLoading = true;
    let type = this.form.value['searchType'];
    let query =this.form.value['query'];
    this.fetchAccountsByQuery(query, type);

  }

  fetchAccounts() {
      this.accountService.getAccounts()
        .subscribe(
          pageDto => {
            this.accountDto = pageDto.content;
            this.dataSource = new MatTableDataSource<UsersDto>(this.accountDto);
            this.loaderService.hide();

          }
        )
  }

  private fetchAccountsByQuery(query: string, type: string) {
    this.accountService.getAccountsByQuery(query, type)
      .subscribe(
        pageDto => {
          this.accountDto = pageDto.content;
          this.dataSource = new MatTableDataSource<AccountDto>(this.accountDto);
          this.loaderService.hide();
          this.requestLoading = false;
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

  private buildForm() {
    return this.formBuilder.group({
      query: ['', [Validators.maxLength(50)]],
      searchType: [this.selectedOption, [Validators.required]],
    })
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path).errors;
  }

  openAccountShow(accountDto: AccountDto) {
    return this.router.navigate(['admin', 'accounts', accountDto.id])
  }
}
