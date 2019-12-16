import { Component, OnInit,ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { ServiceService } from '../Service/service.service';
import {FormControl} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AdduserbyadminComponent} from '../adduserbyadmin/adduserbyadmin.component'
import {EdituserbyadminComponent} from '../edituserbyadmin/edituserbyadmin.component'
import {DeleteuserbyadminComponent} from '../deleteuserbyadmin/deleteuserbyadmin.component'

export interface PeriodicElement {
userid: number;
firstname: string;
lastname: string;
department: string;
position: string;
username: string;
status: string;
isactive: string;
}


@Component({
  selector: 'app-systemadmin',
  templateUrl: './systemadmin.component.html',
  styleUrls: ['./systemadmin.component.css']
})
export class SystemadminComponent implements OnInit {

@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

displayedColumns: string[] = ['username','firstname', 'lastname','department','position','status','edit','delete'];

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
users : Array<any>;

dataSource = new MatTableDataSource<PeriodicElement>(this.users);
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public authService : AuthService , private router: Router , private service : ServiceService,public dialog: MatDialog) {
      this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
   }

  ngOnInit() {
  this.dataSource.paginator = this.paginator;
  this.service.getUsers().subscribe(data => {
        this.users = data;
        this.dataSource.data = data;

      });

  }

close() {
    this.sidenav.close();
  }

onEdituser(row : any){
  const dialogRef = this.dialog.open(EdituserbyadminComponent, {
        data: row,
        height: 'auto',
        width:  'auto',
    });
}

onDeleteuser(row : any){
  const dialogRef = this.dialog.open(DeleteuserbyadminComponent, {
        data: row,
        height: 'auto',
        width:  'auto',
    });
}

onAdduser(){
    const dialogRef = this.dialog.open(AdduserbyadminComponent, {

        height: 'auto',
        width:  'auto',
    });

  }

}
