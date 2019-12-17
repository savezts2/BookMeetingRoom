import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSidenav} from '@angular/material/sidenav';
import {EditordeletebookComponent} from '../editordeletebook/editordeletebook.component'
import {CheckoutComponent} from '../checkout/checkout.component'
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
export interface DialogData {
room: string;
time: string;
date: String;
}


@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.component.html',
  styleUrls: ['./select-room.component.css']
})
export class SelectRoomComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
position = new FormControl(this.positionOptions[2]);
    isLoggedIn : Observable<boolean>;
    isLoggedInAdmin : Observable<boolean>;
    isLoggedInHR : Observable<boolean>;

    report : Array<any>;
    roomnames : any[] = [];
    starttime : Array<any> = [];
    counting: number ;

    showDelay = 0;
    hideDelay = 10000;

CurrentTime: any;
days: any ;
hour: any;
minute: any;
sec: any;

intervals : any;
in : any;
day : string;
month : string;
year : string;
numberTime : number = 0 ;
events: any[] = [];
    datefull :any={}
 now = new Date();
dt1 : any;
dt2 : any;
    public API = '//localhost:8080';  //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build

dateshow : String;

   constructor(public authService : AuthService , private router: Router, private service : ServiceService,private http: HttpClient,
   private route:ActivatedRoute, public dialog: MatDialog) {
      this.isLoggedIn = authService.isLoggedIn();
      this.isLoggedInAdmin = authService.isLoggedInAdmin();
      this.isLoggedInHR = authService.isLoggedInHR();

       setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds(),
      this.hour = new Date().getHours(),this.minute = new Date().getMinutes(),this.sec = new Date().getSeconds(),
      this.days = new Date().getDay()
      }, 1);


   }


ngOnDestroy() {
  if (this.intervals) {
    clearInterval(this.intervals);

  }
  if(this.in){
      clearInterval(this.in);
  }

}



  ngOnInit() {


    this.service.getRoomname().subscribe(data => {
                                 this.roomnames = data;
                               // console.log(this.roomnames);
                                this.appendRoomname();
                               });




      this.route.params.subscribe(prams=>{
                this.datefull = prams;

                })


    this.service.findDate(this.datefull.datefull).subscribe(data=>{
    this.report = data;

    setTimeout(() => {
     this.appendTime();
       }, 1000); //interval
    //console.log(data);

    })


    setTimeout(() => {
    window.location.reload();
    }, 60000); //interval
    this.dateshow = this.dateShow(this.datefull.datefull);



  this.intervals = setInterval(() => {

    if(new Date().getMinutes() < 10){
       this.numberTime = parseInt(new Date().getHours()+"0"+new Date().getMinutes());
    }else{
       this.numberTime = parseInt(new Date().getHours()+""+new Date().getMinutes());
    }


    if(this.numberTime > 814 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "08.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
    if(this.numberTime > 844 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "08.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
    if(this.numberTime > 914 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "09.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 944 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "09.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1014 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "10.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1044 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "10.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1114 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "11.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1144 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "11.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1214 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "12.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1244 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "12.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1314 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "13.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1344 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "13.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1414 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "14.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1444 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "14.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1514 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "15.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1544 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "15.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1614 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "16.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1644 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "16.30" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
     if(this.numberTime > 1714 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.starttime == "17.00" && this.report[i].bookMeetingRoom.statusbooking == "booking" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Changstatusbook/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                     window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }




      ///////////////////////////////////////////////////////////////////
      ///////////             checkout auto /////////////////////////////
      ///////////////////////////////////////////////////////////////////




      if(this.numberTime > 829 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "08.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                      window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 899 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "09.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                    window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 929 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "9.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
                                      window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 999 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "10.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
                                    window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }

     if(this.numberTime > 1029 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "10.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
                                      window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
    if(this.numberTime > 1099 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "11.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                    window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1129 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "11.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                      window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1199 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "12.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

                                    window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1229 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "12.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 829 || new Date().getDate() > parseInt(this.day)){
      for(let i = 1299 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "13.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');

window.location.reload(true);
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1329 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "13.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1399 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "14.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1429 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "14.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1499 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "15.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1529 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "15.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1599 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "16.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1629 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "16.30" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }
if(this.numberTime > 1699 || new Date().getDate() > parseInt(this.day)){
      for(let i = 0 ; i < this.report.length ; i++){
          if(this.report[i].bookMeetingRoom.endtime == "17.00" && this.report[i].bookMeetingRoom.statusbooking == "checkin" && parseInt(this.day) == new Date().
          getDate()){

                this.http.post(this.API + '/Checkoutauto/'+this.report[i].bookMeetingRoom.roomname+'/'+this.report[i].bookMeetingRoom.starttime+'/'+
                this.report[i].bookMeetingRoom.dateBookMeetingRoom,{})
                               .subscribe(
                                 data => {
                                     console.log('PUT Request is successful');
window.location.reload(true);

                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                                );


          }
      }

    }



  }, 2500); //interval



  } // oninit

appendRoomname(){
  for(let i = 0 ; i < this.roomnames.length ; i++){
      this.events.push(new Array());
    for(let j = 0 ; j < 19 ; j++){

      if(j == 0){
        this.events[i].push([j,'08.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 1){
        this.events[i].push([j,'08.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 2){
        this.events[i].push([j,'09.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 3){
        this.events[i].push([j,'09.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 4){
        this.events[i].push([j,'10.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 5){
        this.events[i].push([j,'10.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 6){
        this.events[i].push([j,'11.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 7){
        this.events[i].push([j,'11.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 8){
        this.events[i].push([j,'12.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 9){
        this.events[i].push([j,'12.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 10){
        this.events[i].push([j,'13.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 11){
        this.events[i].push([j,'13.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 12){
        this.events[i].push([j,'14.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 13){
        this.events[i].push([j,'14.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 14){
        this.events[i].push([j,'15.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 15){
        this.events[i].push([j,'15.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 16){
        this.events[i].push([j,'16.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 17){
        this.events[i].push([j,'16.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 18){
        this.events[i].push([j,'17.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }

    }
  }

}


public appendTime(){

  for(let i = 0 ; i < this.report.length ; i++){

      if(this.report[i].isActive == "1"){

          for(let j = 0 ; j < this.roomnames.length ; j++){ //หาห้อง

            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '08.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 0){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            } // 8โมง

            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '08.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 1){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '09.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 2){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '09.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 3){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '10.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 4){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '10.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 5){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '11.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 6){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;

                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }

            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '11.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 7){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }



                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '12.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 8){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '12.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 9){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '13.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 10){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '13.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 11){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '14.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 12){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '14.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 13){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '15.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 14){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '15.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 15){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '16.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 16){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '16.30'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 17){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
            if(this.report[i].bookMeetingRoom.roomname == this.roomnames[j].roomnames && this.report[i].bookMeetingRoom.starttime == '17.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 18){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                        this.events[j][k][3] = '#3366FF' ;
                    }else{
                        this.events[j][k][3] = '#FF3333' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;
                  this.events[j][k][12] = this.report[i].users.username;if(this.events[j][k][8].length > 15){
                       this.events[j][k][15] = false;
                  }

                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }
                }
              }
            }
          }// หาห้อง
      } //if active
  } //for report

  //console.log(this.events);

} // appendtime

selectTable(room,time){
    //console.log(room);
    //console.log(time);
      //console.log(this.datefull.datefull);

    let datebook: Array<string>;
    let datetoday: Array<string>;
    let dates = new Date();
    datetoday = dates.toString().split(" ");
    datebook = this.datefull.datefull.split("-");
    let timesplit: Array<string>;
    timesplit = time.split(".");

   // console.log(datetoday,datebook,timesplit);

    if(parseInt(datetoday[2]) == parseInt(datebook[0])){
    if(new Date().getHours() > parseInt(timesplit[0]) ){
        alert("Cannot make a previous booking.");
    }else if( new Date().getHours() == parseInt(timesplit[0]) ){
      if( new Date().getMinutes() > parseInt(timesplit[1]) ){
        alert("Cannot make a previous booking.");
      }else{
        this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull}]);
      }
    }else{
        this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull}]);
    }

    }else{
        this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull}]);
    }

  }



close() {
    this.sidenav.close();
  }

dateShow(datefull){

  this.day = datefull.substring(0,2);
  this.month = datefull.substring(3,5);
  this.year = datefull.substring(6,10);

  return this.day+'/'+this.month+'/'+this.year;
}



  time1 : string;
        time2 : string;
        time3 = new Date();
        time4 : string;
   Reserved(room,time,username,atten,topic,remark,totime,tel){
        let totimesplit: Array<string>;
         let fromtimesplit: Array<string>;

        totimesplit = time.split(".");
        fromtimesplit = totime.split(".");
        this.time1 = totimesplit[0]+""+totimesplit[1];
        this.time2 = fromtimesplit[0]+""+fromtimesplit[1];

         if(this.time3.getMinutes() < 10 ){
              this.time4 = this.time3.getHours().toString() +"0"+ this.time3.getMinutes().toString();
          }else{
               this.time4 = this.time3.getHours().toString() +""+ this.time3.getMinutes().toString();
          }


       this.service.getBookMeetingRoom(this.datefull.datefull,room,time).subscribe(data=>{
           //   console.log(data);
              if(data != null){

                    if(parseInt(this.time4) >= parseInt(this.time2) && new Date().getDate().toString() == this.day){
                          alert("This time has passed");
                    }else{

                         if(localStorage.getItem('tokenidadmin') == "JWT" || localStorage.getItem('tokenidhr') == "JWT"){

                           const dialogRef = this.dialog.open(EditordeletebookComponent, {
                           data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                           height: 'auto',
                           width:  'auto',
                           });

                   }else{
                        if(localStorage.getItem('userid') == username){
                             const dialogRef = this.dialog.open(EditordeletebookComponent, {
                             data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                             height: 'auto',
                             width:  'auto',
                               });
                        }else{
                           alert("Cannot book this time");
                         }
                     }

                }
              }else{
                  if(localStorage.getItem('tokenidadmin') == "JWT" || localStorage.getItem('tokenidhr') == "JWT"){
                       if(parseInt(this.time4) >= parseInt(this.time2) && new Date().getDate().toString() == this.day){
                          alert("This time has passed");
                         }else{
                                     const dialogRef = this.dialog.open(CheckoutComponent, {
                            data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                           height: 'auto',
                           width:  'auto',
                           });
                          }
                  }else{
                              if(localStorage.getItem('userid') == username){
                                  if(parseInt(this.time4) > parseInt(this.time2) && new Date().getDate().toString() == this.day){
                                     alert("This time has passed");
                                  }else{
                                    const dialogRef = this.dialog.open(CheckoutComponent, {
                                   data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                                   height: 'auto',
                                    width:  'auto',
                                    });
                                  }
                               }
                                else{
                                    alert("is not your book.");
                                 }
                  }
              }
       })

  }




}



