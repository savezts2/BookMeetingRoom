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
import {CancelbookbyhrComponent} from '../cancelbookbyhr/cancelbookbyhr.component'
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { baseUrl } from '../app.component';
export interface DialogData {
room: string;
time: string;
date: String;
}


@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.component.html',
  styleUrls: ['./select-room.component.css'],
providers: [
{
provide: DateAdapter, useClass: AppDateAdapter
},
{
provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
}
]
})
export class SelectRoomComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
position = new FormControl(this.positionOptions[2]);
    isLoggedIn : Observable<boolean>;
    isLoggedInAdmin : Observable<boolean>;
    isLoggedInHR : Observable<boolean>;
serializedDate = new FormControl( (new Date() ).toISOString());
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
timehour : string;
timeminute : string;
fulltime : string;


dateshow : String;
today=new Date();
maxDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate() == 31 ? 31 : 31);
dateSelect : String ='';
latetime : number;
splitted : Array<any>;
dateFull : String ;
myFilter = (d: Date): boolean => {
const day = d.getDay();

// Prevent Saturday and Sunday from being selected.
return day !== 0 ;
}
countrepeatroom : number;

   constructor(public authService : AuthService , private router: Router, private service : ServiceService,private http: HttpClient,
   private route:ActivatedRoute, public dialog: MatDialog) {
      this.isLoggedIn = authService.isLoggedIn();
      this.isLoggedInAdmin = authService.isLoggedInAdmin();
      this.isLoggedInHR = authService.isLoggedInHR();

       setInterval(() => {

      this.hour = new Date().getHours(),
      this.minute = new Date().getMinutes(),this.sec = new Date().getSeconds(),
      this.days = new Date().getDay()
      }, 1000);

      this.in = setInterval(() => {
this.service.getHourCurrent().subscribe(data=>{
    this.timehour = data.toString();

    })

this.service.getMinuteCurrent().subscribe(data=>{
    this.timeminute = data.toString();

    })



     this.CurrentTime =  this.timehour + ':' +  this.timeminute + ':'+  new Date().getSeconds();


  if(parseInt(this.timehour) < 10){
    this.timehour = '0'+ this.timehour;
  }if( parseInt(this.timeminute) < 10){
    this.timeminute = '0'+ this.timeminute;
  }

  this.fulltime =  this.timehour+':'+ this.timeminute +':'+ new Date().getSeconds();
 // console.log(this.fulltime);


  }, 1000); //interval

   }
close(){
  this.sidenav.close();
}

ngOnDestroy() {
  if (this.intervals) {
    clearInterval(this.intervals);

  }
  if(this.in){
      clearInterval(this.in);
  }

}

clicksearch(){
    this.dateSelect = this.serializedDate.value;
 if(this.dateSelect == ''){
      alert("Please Select Date");
    }else{
      this.convertMonth(this.dateSelect.toString());
    }


}

convertMonth(month : String ){

this.splitted = month.split(" ");
if(this.splitted.length == 1){
  this.splitted = month.split("-");
  this.dateFull = this.splitted[2].substring(0,2)+'-'+this.splitted[1]+'-'+this.splitted[0]

  this.router.navigate(['selectRoom',{datefull : this.dateFull}]);
  window.location.href='#/selectRoom;datefull='+this.dateFull;
  window.location.reload();
}else{
  if(this.splitted[1] == 'Jan'){
  this.month='01';
  }else if(this.splitted[1] == 'Feb'){
  this.month='02';
  }else if(this.splitted[1] == 'Mar'){
  this.month='03';
  }else if(this.splitted[1] == 'Apr'){
  this.month='04';
  }else if(this.splitted[1] == 'May'){
  this.month='05';
  }else if(this.splitted[1] == 'Jun'){
  this.month='06';
  }else if(this.splitted[1] == 'Jul'){
  this.month='07';
  }else if(this.splitted[1] == 'Aug'){
  this.month='08';
  }else if(this.splitted[1] == 'Sep'){
  this.month='09';
  }else if(this.splitted[1] == 'Oct'){
  this.month='10';
  }else if(this.splitted[1] == 'Nov'){
  this.month='11';
  }else if(this.splitted[1] == 'Dec'){
  this.month='12';
  }
  this.dateFull = this.splitted[2]+'-'+this.month+'-'+this.splitted[3];

  this.router.navigate(['selectRoom',{datefull : this.dateFull}]);
  window.location.href='#/selectRoom;datefull='+this.dateFull;
  window.location.reload();
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

    this.serializedDate = new FormControl( (new Date(this.datefull.datefull.substring(6,10)+'-'+this.datefull.datefull.substring(3,5)+'-'+this.datefull.datefull.substring(0,2)) ).toISOString());
    this.service.findDate(this.datefull.datefull).subscribe(data=>{
    this.report = data;

    setTimeout(() => {
     this.appendTime();
       }, 500); //interval
   // console.log(data);

    })



    this.dateshow = this.dateShow(this.datefull.datefull);



  this.intervals = setInterval(() => {

    if(new Date().getMinutes() < 10){
       this.numberTime = parseInt(new Date().getHours()+"0"+new Date().getMinutes());
    }else{
       this.numberTime = parseInt(new Date().getHours()+""+new Date().getMinutes());
    }




  }, 2500); //interval

    this.service.getLatetime().subscribe(data=>{
             // console.log(data);
              this.latetime = data.latetimecheckout ;

       })

  } // oninit

appendRoomname(){
  for(let i = 0 ; i < this.roomnames.length ; i++){
      this.events.push(new Array());
    for(let j = 0 ; j < 19 ; j++){

      if(j == 0){
        this.events[i].push([j,'08.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 1){
        this.events[i].push([j,'09.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 2){
        this.events[i].push([j,'10.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 3){
        this.events[i].push([j,'11.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 4){
        this.events[i].push([j,'12.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 5){
        this.events[i].push([j,'13.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 6){
        this.events[i].push([j,'14.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 7){
        this.events[i].push([j,'15.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 8){
        this.events[i].push([j,'16.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 9){
        this.events[i].push([j,'17.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 10){
        this.events[i].push([j,'18.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 11){
        this.events[i].push([j,'19.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 12){
        this.events[i].push([j,'20.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 13){
        this.events[i].push([j,'21.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }else if(j == 14){
        this.events[i].push([j,'22.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','',true]);
      }

    }
  }

}


public appendTime(){

  for(let i = 0 ; i < this.report.length ; i++){

      if(this.report[i].isActive == "1"){

          for(let j = 0 ; j < this.roomnames.length ; j++){ //หาห้อง

            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '08.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 0){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                        this.events[j][k][3] = '#FF4040' ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
              if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            } // 8โมง

            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '09.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 1){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '10.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 2){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                            this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '11.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 3){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '12.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 4){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '13.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 5){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '14.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 6){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;

                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '15.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 7){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;




                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }

              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '16.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 8){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id&& this.report[i].bookMeetingRoom.starttime == '17.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 9){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '18.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 10){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '19.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 11){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '20.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 12){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id&& this.report[i].bookMeetingRoom.starttime == '21.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 13){


                        this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                        if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                            this.events[j][k][3] = '#C0C0C0' ;
                        }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                            this.events[j][k][3] = '#A0FF7D' ;
                        }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                           this.events[j][k][3] = '#006633' ;
                        }else{
                           this.events[j][k][3] = '#FF4040'  ;
                        }

                      this.events[j][k][5] = true;
                      this.events[j][k][6] = this.report[i].users.firstname;
                        this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                      this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                       this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                         this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                        this.events[j][k][11] = true ;


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
                    }else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }


              }
if(this.countrepeatroom == 0){
                  this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
              }
            }
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '22.00'){

              this.countrepeatroom = 0 ; for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 14){
                    this.countrepeatroom = 1 ;if(this.events[j][k][5] == false){this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'Booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'Checkout'){
                         this.events[j][k][3] = '#006633' ;
                    }else{
                       this.events[j][k][3] = '#FF4040'  ;
                    }

                  this.events[j][k][5] = true;
                  this.events[j][k][6] = this.report[i].users.firstname;
                  this.events[j][k][7] = this.report[i].bookMeetingRoom.attendees ;
                  this.events[j][k][14] = this.report[i].bookMeetingRoom.telbookingby ;
                  this.events[j][k][8] = this.report[i].bookMeetingRoom.topic ;
                  this.events[j][k][13] = this.report[i].bookMeetingRoom.endtime ;
                  this.events[j][k][11] = true ;


                   if(this.events[j][k][2] > 1){
                      this.counting = k + 1;

                      for(let l = 1 ; l < this.events[j][k][2] ; l++){
                        this.events[j].splice(this.counting,1);
                      }
                   }

                   if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                       this.events[j][k][10] = true;
                       this.events[j][k][9] = this.report[i].bookMeetingRoom.remark;
                   }}else{
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                    }
                }
              }
                if(this.countrepeatroom == 0){
                        this.http.post(baseUrl+'/bookrepeat/'+this.report[i].bookMeetingRoom.book_id,{})
                                  .subscribe(
                                  data => {
                                   console.log('PUT Request is successful');

                               },
                               error => {
                                   console.log('Error', error);

                               }
                                    );
                 }
            }

          }// หาห้อง
      } //if active
  } //for report

 // console.log(this.events);

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

    //console.log(datetoday,datebook,timesplit);
    let monthnumString = this.convertMonthstring(datetoday[1]);
    if(parseInt(datetoday[2]) == parseInt(datebook[0]) && monthnumString == datebook[1]){
       if(parseInt(this.fulltime.substring(0,2)) > parseInt(timesplit[0]) ){
         alert("Cannot make a previous Booking.");
       }else if( parseInt(this.fulltime.substring(0,2)) == parseInt(timesplit[0]) ){
          if( parseInt(this.fulltime.substring(3,5)) - parseInt(timesplit[1])  < 30 && parseInt(this.fulltime.substring(3,5)) - parseInt(timesplit[1])  >= 0){
              this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull,slowtime:true}]);
           }else if(parseInt(this.fulltime.substring(3,5)) - parseInt(timesplit[1])  >= 30){
               alert("Cannot make a previous Booking.");
            }else{
                this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull,slowtime:false}]);
            }
       }else{
              this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull,slowtime:false}]);
       }

    }else{
        this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull,slowtime:false}]);
    }

  }

convertMonthstring(monthstring){
    if(monthstring == 'Jan'){ return '01'}else if(monthstring == 'Feb'){ return '02' }
    else if(monthstring == 'Mar'){ return '03' }else if(monthstring == 'Apr'){ return '04' }
else if(monthstring == 'May'){ return '05' }else if(monthstring == 'Jun'){ return '06' }
else if(monthstring == 'Jul'){ return '07' }else if(monthstring == 'Aug'){ return '08' }
else if(monthstring == 'Sep'){ return '09' }else if(monthstring == 'Oct'){ return '10' }
else if(monthstring == 'Nov'){ return '11' }else if(monthstring == 'Dec'){ return '12' }
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

        for(let i = 0 ; i < this.roomnames.length ; i++){

            if(this.roomnames[i].roomnames == room){
              room = this.roomnames[i].roomname_id ;
            }
        }
        let totimesplit: Array<string>;
         let fromtimesplit: Array<string>;

        totimesplit = time.split(".");
        fromtimesplit = totime.split(".");
        this.time1 = totimesplit[0]+""+totimesplit[1];
        this.time2 = fromtimesplit[0]+""+fromtimesplit[1];
        let datestringeiei = new Date().getDate() < 10 ? '0'+new Date().getDate() : new Date().getDate();
         if(this.time3.getMinutes() < 10 ){
              this.time4 = this.time3.getHours().toString() +"0"+ this.time3.getMinutes().toString();
          }else{
               this.time4 = this.time3.getHours().toString() +""+ this.time3.getMinutes().toString();
          }

      //  console.log( this.time4, this.time2);
       this.service.getBookMeetingRoom(this.datefull.datefull,room,time).subscribe(data=>{

              if(data == null){
                  if(localStorage.getItem('tokenidadmin') == "JWT"){
                         if(parseInt(this.time4) >= parseInt(this.time2) && datestringeiei == this.day){
                          alert("This time has passed");
                         }else{

                             const dialogRef = this.dialog.open(CheckoutComponent, {
                               data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                              height: 'auto',
                               width:  'auto',
                               });
                          }
                  }

                  else if(localStorage.getItem('nameid') == username){

                          if(parseInt(this.time4) >= parseInt(this.time2) && datestringeiei == this.day){
                          alert("This time has passed");
                         }else{

                             const dialogRef = this.dialog.open(CheckoutComponent, {
                               data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                              height: 'auto',
                               width:  'auto',
                               });
                          }

                  }else{

                      alert("It's not your book.");
                  }
              }else{
                  if(localStorage.getItem('tokenidadmin') == "JWT"){
                       //   console.log(parseInt(this.time4) , parseInt(this.time2) ,datestringeiei , this.day);
                         if(parseInt(this.time4) >= parseInt(this.time2) && datestringeiei == this.day ){
                          alert("This time has passed");
                         }else{

                                const dialogRef = this.dialog.open(EditordeletebookComponent, {
                           data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                           height: 'auto',
                           width:  'auto',
                           });
                          }
                  }

                  else if(localStorage.getItem('nameid') == username){

                          if(parseInt(this.time4) >= parseInt(this.time2) && datestringeiei == this.day){
                          alert("This time has passed");
                         }else{

                              const dialogRef = this.dialog.open(EditordeletebookComponent, {
                           data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                           height: 'auto',
                           width:  'auto',
                           });
                          }

                  }else if(localStorage.getItem('tokenidhr') == "JWT"){
                      const dialogRef = this.dialog.open(CancelbookbyhrComponent, {
                           data: {room:room , time:time , date : this.datefull.datefull,atten:atten,topic:topic,remark:remark,totime:totime,tel:tel},
                           height: 'auto',
                           width:  'auto',
                           });


                  }else{

                      alert("It's not your book.");
                  }

              }




       })

  }//reserved




}//class



