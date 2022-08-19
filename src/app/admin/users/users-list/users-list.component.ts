import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { UsersDto } from "../../../core/models/users.model";
import { UsersService } from "../../../core/services/users.service";
import { LoaderService } from "../../loader.service";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'cpf', 'agreed', 'role', 'verified', 'registrationTimestamp'];
  usersDto: UsersDto[] = [];
  dataSource: MatTableDataSource<UsersDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private usersService: UsersService,
    private loaderService: LoaderService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.getUsers()
      .subscribe(
        pageDto => {
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
