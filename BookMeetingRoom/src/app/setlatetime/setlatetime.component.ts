
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

export interface DialogData {
latetimes : string;

}
@Component({
  selector: 'app-setlatetime',
  templateUrl: './setlatetime.component.html',
  styleUrls: ['./setlatetime.component.css']
})
export class SetlatetimeComponent implements OnInit {

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
latetimes : number;

  constructor(public authService : AuthService , private router: Router , private service : ServiceService,public dialog: MatDialog
  ,private http: HttpClient) {
     this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
   }

  ngOnInit() {

this.service.getLatetime().subscribe(data=>{

              this.latetimes = data.latetimecheckout;
           // console.log( this.latetimes);

       })

  }

 openDialog(): void {
    const dialogRef = this.dialog.open(SetLateTimeDialog, {
      width: '250px',
        data: {latetimes: this.latetimes}
    });


  }

}

@Component({
  selector: 'setlatetimedialog',
  templateUrl: 'setlatetimedialog.html',
})
export class SetLateTimeDialog {
latetimes : string;
public API = '//localhost:8080';   //for test
//public API = 'http://172.27.209.27:8080/BookMeetingRoom';  //for build
  constructor(
    public dialogRef: MatDialogRef<SetLateTimeDialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service : ServiceService, private http: HttpClient) {
        this.latetimes = this.data.latetimes;
    }


edit(){
 // console.log(this.data);
      if(this.latetimes == '' || this.latetimes == null || this.latetimes == ' '){
          alert("Please check your field.");
      }
      else{
        this.http.post(this.API + '/setlatetime/'+this.latetimes,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Edit Success!");
                                   window.location.reload(true);

                               },
                               error => {
                                   console.log('Error', error);
                                    window.location.reload(true);
                               }
                              );
      }
}
  cancel(): void {
    this.dialogRef.close();
  }

}
