import { Component, OnInit ,ViewChild, Inject} from '@angular/core';
import {  MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import {MatSidenav} from '@angular/material/sidenav';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { HttpClient} from '@angular/common/http';
import {EditroomnameComponent} from '../editroomname/editroomname.component'
import {DeleteroomComponent} from '../deleteroom/deleteroom.component'
import { baseUrl } from '../app.component';
export interface PeriodicElement {
roomnames : string;
}

export interface DialogData {
roominput : string;
firstname : string;
}

@Component({
  selector: 'app-addroombyadmin',
  templateUrl: './addroombyadmin.component.html',
  styleUrls: ['./addroombyadmin.component.css']
})
export class AddroombyadminComponent implements OnInit {

@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
displayedColumns: string[] = ['roomnames','edit','delete'];

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
roomnames : Array<any>;
roominput : string = '';
firstname : string;

dataSource = new MatTableDataSource<PeriodicElement>(this.roomnames);
  constructor(public authService : AuthService , private router: Router , private service : ServiceService,public dialog: MatDialog
  ,private http: HttpClient) {
      this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
  }

  ngOnInit() {

      this.service.getRoomname().subscribe(data => {
                                 this.roomnames = data;
                               //  console.log(this.roomnames);
                                this.dataSource.data = data;
                               });
      this.firstname = localStorage.getItem('nameid');
  }

close() {
    this.sidenav.close();
  }


onAddroom(){

  if(this.roominput == '' || this.roominput == ' '){
    alert("Please check your filled.");
  }else{

      const dialogRef = this.dialog.open(DialogSubmitRoom, {
      width: '250px',
      data: {roominput: this.roominput , firstname : this.firstname}
    });

  }

}


onDelete(row : any){
  const dialogRef = this.dialog.open(DeleteroomComponent, {
        data: row,
        height: 'auto',
        width:  'auto',
    });
}

onEdit(row : any){
  const dialogRef = this.dialog.open(EditroomnameComponent, {
        data: row,
        height: 'auto',
        width:  'auto',
    });
}


}





@Component({
  selector: 'dialog-submit-room-dialog',
  templateUrl: 'dialog-submit-room-dialog.html',
})
export class DialogSubmitRoom {

  constructor(
    public dialogRef: MatDialogRef<DialogSubmitRoom>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service : ServiceService, private http: HttpClient) {}

  add(){

    this.service.getAddroomname(this.data.roominput).subscribe(data=>{

              if(data != null){
                alert("This room name already exists in the system.");
              }else{
                  this.http.post(baseUrl + '/Addroom/'+this.data.firstname +'/' + this.data.roominput,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Input Success!");
                                   window.location.reload(true);

                               },
                               error => {
                                   console.log('Error', error);
                                    window.location.reload(true);
                               }
                              );

              }

       })
  }

  cancel(){
  this.dialogRef.close();
}

}
