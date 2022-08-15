import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";
import {UsersDto} from "../../../core/models/users.model";
import {AccountService} from "../../../core/services/account.service";
import {LoaderService} from "../../loader.service";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountDto} from "../../../core/models/account.model";
import {SpeakerDto} from "../../../core/models/speaker.model";



@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'cpf', 'agreed', 'role', 'verified', 'registrationTimestamp'];
  accountDto: AccountDto[] = [];
  dataSource: MatTableDataSource<UsersDto>;
  @ViewChild(MatSort)
  sort: MatSort;
  form: FormGroup;
  submitted: boolean = false;
  requestLoading: boolean = false;
  searchTypes =[{
    type:'name',
    show:'Nome'
  },{
    type:'cpf',
    show:'CPF'
  },{
    type:'email',
    show:'E-mail'
  }]


  constructor(
    private accountService: AccountService,
    private loaderService: LoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit(): void {
    this.form = this.buildForm();
    const toSelect = this.searchTypes.find(t => t.type == 'name');
    this.form.get('searchType').setValue(toSelect);
    this.loaderService.show();
    this.fetchAccounts();
  }

  onSubmit() {
    if(this.form.invalid){
      return;
    }
    this.requestLoading = true;
    let type = this.form.get('searchType').value['type'];
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
      searchType: ['', [Validators.required]],
    })
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path).errors;
  }

  private fetchAccountsByQuery(query: string, type: string) {
    this.accountService.getAccountsByQuery(query, type)
      .subscribe(
        pageDto => {
          this.accountDto = pageDto.content;
          this.dataSource = new MatTableDataSource<UsersDto>(this.accountDto);
          this.loaderService.hide();
          this.requestLoading = false;
        }
      )
  }

  openAccountShow(accountDto: AccountDto) {
    return this.router.navigate(['admin', 'accounts', accountDto.id])
  }
}
