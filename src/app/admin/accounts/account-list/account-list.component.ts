import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";
import {AccountService} from "../../../core/services/account.service";
import {LoaderService} from "../../loader.service";
import { Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountDto} from "../../../core/models/account.model";
import {SearchType} from "../../../core/models/search-types.model";
import {PageDto} from "../../../core/models/page.model";
import {AccountRole} from "../../../core/models/account-role.model";


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'cpf', 'agreed', 'role', 'verified',]
  dataSource: MatTableDataSource<AccountDto>;
  requestLoading: boolean = false;
  accountDto: AccountDto[] = [];
  page: PageDto<AccountDto>;
  searchType = SearchType;
  selectedOption = 'NAME';
  @ViewChild(MatSort)
  sort: MatSort;
  enumKeys: any = [];
  form: FormGroup;

  constructor(
    protected accountService: AccountService,
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
    this.fetchAccounts(0);
  }

  onSubmit() {
    if(this.form.invalid){
      console.log(this.form.errors);
      return;
    }
    this.requestLoading = true;
    this.fetchAccounts(0);
  }

  fetchAccounts(page: number) {
    this.accountService.getAccounts(page, this.form.value['query'], this.form.value['searchType'])
      .subscribe(
        pageDto => {
          this.page = pageDto;
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
      query: ['', [Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 @._]*$")]],
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
    return this.router.navigate(['admin', 'accounts', accountDto.id]);
  }


}
