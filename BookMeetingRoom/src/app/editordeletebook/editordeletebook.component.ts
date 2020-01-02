import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
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
import { HttpClient} from '@angular/common/http';
import {EditbookComponent} from '../editbook/editbook.component'

export interface DialogData {
room: string;
time : string;
date : String;
atten : String;
topic : String;
remark : String;
totime : String;
tel : String;
}


@Component({
  selector: 'app-editordeletebook',
  templateUrl: './editordeletebook.component.html',
  styleUrls: ['./editordeletebook.component.css']
})


export class EditordeletebookComponent implements OnInit {



isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
public API = '//localhost:8080';   //for test
//public API = 'http://172.27.209.27:8080/BookMeetingRoom';  //for build
timenum : number;
totimenum : number;
datetimenow : number;
spiner : boolean = false;
nameuser : string;
timehour : string;
timeminute : string;
fulltime : string;
  constructor(public authService : AuthService , private router: Router , private service : ServiceService,public dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<EditordeletebookComponent>, private http: HttpClient) {
      this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();



          setInterval(() => {
this.service.getHourCurrent().subscribe(data=>{
    this.timehour = data.toString();

    })

this.service.getMinuteCurrent().subscribe(data=>{
    this.timeminute = data.toString();

    })

  if(parseInt(this.timehour) < 10){
    this.timehour = '0'+ this.timehour;
  }if( parseInt(this.timeminute) < 10){
    this.timeminute = '0'+ this.timeminute;
  }

  this.fulltime =  this.timehour+':'+ this.timeminute +':'+ new Date().getSeconds();
 // console.log(this.fulltime);


  }, 100); //interval
  }

  ngOnInit() {
    this.nameuser = localStorage.getItem('nameid');
  }

checkin(){
  let totimesplit: Array<string>;
  let fromtimesplit: Array<string>;
  totimesplit = this.data.time.split(".");
  fromtimesplit = this.data.totime.split(".");
  let datetoday: Array<string>;
  let datebook: Array<string>;
  let dates = new Date();
  datetoday = dates.toString().split(" ");
  datebook = this.data.date.split("-");


    this.timenum = parseInt(totimesplit[0]+""+totimesplit[1]);
    this.totimenum = parseInt(fromtimesplit[0]+""+fromtimesplit[1]);


  if(new Date().getMinutes() < 10 ){

     this.datetimenow = parseInt(new Date().getHours().toString()+"0"+new Date().getMinutes().toString());

  }else{

     this.datetimenow = parseInt(new Date().getHours().toString()+""+new Date().getMinutes().toString());

  }



  if(this.fulltime.substring(0,2)+":"+this.fulltime.substring(3,5) <  this.data.time || this.datetimenow >  this.totimenum || datetoday[2] != datebook[0]){

    alert("Please Checkin in time "+this.data.time+" - "+this.data.totime + " Date: "+this.data.date);


  }else{

     this.http.post(this.API + '/CheckIn/'+this.nameuser+'/'+this.data.date+'/'+this.data.room+'/'+this.data.time+'/'+
     this.fulltime.substring(0,2)+':'+this.fulltime.substring(3,5),{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Checkin Success!");
                                   this.dialogRef.close();
                                    window.location.reload(true);
                               },
                               error => {
                                   console.log('Error', error);
                                  alert("Checkin Success!");
                                  this.dialogRef.close();
                                    window.location.reload(true);
                               }
                              );
  }



}

delete(){
  this.spiner = true;
  this.http.post(this.API + '/CancelBooking/'+this.nameuser+'/'+this.data.date+'/'+this.data.room+'/'+this.data.time,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Cancel Success!");
                                    window.location.reload(true);
                                   this.dialogRef.close();
                               },
                               error => {
                                   console.log('Error', error);
                                    alert("Cancel Success!");
                                    window.location.reload(true);
                                  this.dialogRef.close();
                               }
                              );
}

edit(){
    this.dialogRef.close();
     const dialogRef = this.dialog.open(EditbookComponent, {
        data: {room:this.data.room , time:this.data.time , date : this.data.date,atten:this.data.atten,
        topic:this.data.topic,remark:this.data.remark,totime:this.data.totime,tel:this.data.tel},
        height: 'auto',
        width:  '750px',
    });

}

}
