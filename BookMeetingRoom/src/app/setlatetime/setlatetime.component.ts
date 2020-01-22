
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
import { baseUrl } from '../app.component';
export interface DialogData {
latetimes : string;

}

export interface DialogData2 {
notify : string;

}
@Component({
  selector: 'app-setlatetime',
  templateUrl: './setlatetime.component.html',
  styleUrls: ['./setlatetime.component.css']
})
export class SetlatetimeComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
latetimes : number;
notify : number;
roleadmin : boolean = false;
rolehr : boolean = false;
roleuser : boolean  = false;
  constructor(public authService : AuthService , private router: Router , private service : ServiceService,public dialog: MatDialog
  ,private http: HttpClient) {
     this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
       if(sessionStorage.getItem('tokenidadmin') == 'JWT'){
      this.roleadmin=true;
    }else if(sessionStorage.getItem('tokenidhr') == 'JWT'){
      this.rolehr=true;
    }else if(sessionStorage.getItem('tokenid') == 'JWT'){
      this.roleuser=true;
    }
   }

  ngOnInit() {

this.service.getLatetime().subscribe(data=>{

              this.latetimes = data.latetimecheckout;
           // console.log( this.latetimes);

       })

this.service.getNotify().subscribe(data=>{

              this.notify = data.timenotify;
            //console.log(data);

       })

  }

 openDialog(): void {
    const dialogRef = this.dialog.open(SetLateTimeDialog, {
      width: '250px',
        data: {latetimes: this.latetimes}
    });


  }

 openDialog2(): void {
    const dialogRef = this.dialog.open(SetTimeNotifyDialog, {
      width: '250px',
        data: {notify: this.notify}
    });


  }

close() {
    this.sidenav.close();
  }

}



@Component({
  selector: 'setlatetimedialog',
  templateUrl: 'setlatetimedialog.html',
})
export class SetLateTimeDialog {
latetimes : string;

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
        this.http.post(baseUrl + '/setlatetime/'+this.latetimes,{})
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





@Component({
  selector: 'settimenotify',
  templateUrl: 'settimenotify.html',
})
export class SetTimeNotifyDialog {
notify : string;
  constructor(
    public dialogRef: MatDialogRef<SetTimeNotifyDialog>,@Inject(MAT_DIALOG_DATA) public data: DialogData2,
    private service : ServiceService, private http: HttpClient) {
        this.notify = this.data.notify;

    }



  cancel(): void {
    this.dialogRef.close();
  }

edit(){
      if(this.notify == '' || this.notify == null || this.notify == ' '){
          alert("Please check your field.");
      }
      else{
        this.http.post(baseUrl + '/settimenotify/'+this.notify,{})
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



}
