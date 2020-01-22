import { Component, OnInit ,ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ServiceService } from '../Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { baseUrl } from '../app.component';
export interface Fruit {
name: string;
invalid: boolean;
}

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;


roomnameandtime:any={}
fromtimeSelect: '';

roomname: '' ;
date: '';
userid3: String;
report : Array<any>;
counting: number ;
lengthtime : number ;
fromtimesplited : Array<any>;
totimesplited : Array<any>;
countTime : number;
spiner : boolean = false;

firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
events: any[] = [];
roomnames : Array<any>;
in : any ;
timehour : string;
timeminute : string;
fulltime : string;
datechecktime = new Date();
datechecktime2 : string;
todaychecktime : string;
  ngOnInit() {

      this.route.params.subscribe(prams=>{

                this.roomnameandtime = prams;
                this.roomname =this.roomnameandtime.roomname;
                this.date = this.roomnameandtime.date;
                //console.log(this.roomnameandtime);
              })
    this.fromtimeSelect = this.roomnameandtime.roomtime;
    this.userid3 = localStorage.getItem('userid');


    this.service.findDate(this.date).subscribe(data=>{
    this.report = data;

    setTimeout(() => {
    this.appendTime();
      }, 500); //interval
  //  console.log(data);

    })





    this.datechecktime2 = (new Date(this.datechecktime.toString().substring(11,15)+'-'+this.convertMonth(this.datechecktime.toString().substring(4,7)) + '-'+this.datechecktime.toString().substring(8,10))).toString();
    this.todaychecktime = (new Date(this.date.substring(6,10)+'-'+this.date.substring(3,5)+'-'+this.date.substring(0,2))).toString();


     this.service.getRoomname().subscribe(data => {
                                 this.roomnames = data;
                               // console.log(this.roomnames);
                                this.appendRoomname();
                               });



     this.secondFormGroup = this._formBuilder.group({
      totime: [null, Validators.required],
      tel: [null, Validators.required],
      topic: [null, Validators.required],
      atten: [null, Validators.required],
      remark: null
    });
  }

convertMonth(month){
  if(month == 'Jan')
    return '01';
  else if(month == 'Feb')
    return '02';
  else if(month == 'Mar')
    return '03';
  else if(month == 'Apr')
    return '04';
  else if(month == 'May')
    return '05';
  else if(month == 'Jun')
    return '06';
  else if(month == 'Jul')
    return '07';
  else if(month == 'Aug')
    return '08';
  else if(month == 'Sep')
    return '09';
  else if(month == 'Oct')
    return '10';
  else if(month == 'Nov')
    return '11';
  else
    return '12';
}

roleadmin : boolean = false;
rolehr : boolean = false;
roleuser : boolean  = false;


constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router,private _formBuilder: FormBuilder) {
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


  this.in = setInterval(() => {
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

  this.fulltime =  this.timehour+'.'+ this.timeminute  ;
  //console.log(this.fulltime);


  }, 100); //interval

  }

close() {
    this.sidenav.close();
  }




ngOnDestroy() {
  if (this.in) {
    clearInterval(this.in);
  }

}

back(){
    this.router.navigate(['selectRoom',{datefull : this.date}]);
}

appendRoomname(){
  for(let i = 0 ; i < this.roomnames.length ; i++){
      this.events.push(new Array());
    for(let j = 0 ; j < 19 ; j++){

      if(j == 0){
        this.events[i].push([j,'08.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 1){
        this.events[i].push([j,'09.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 2){
        this.events[i].push([j,'10.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 3){
        this.events[i].push([j,'11.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 4){
        this.events[i].push([j,'12.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 5){
        this.events[i].push([j,'13.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 6){
        this.events[i].push([j,'14.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 7){
        this.events[i].push([j,'15.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 8){
        this.events[i].push([j,'16.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 9){
        this.events[i].push([j,'17.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 10){
        this.events[i].push([j,'18.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 11){
        this.events[i].push([j,'19.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 12){
        this.events[i].push([j,'20.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 13){
        this.events[i].push([j,'21.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 14){
        this.events[i].push([j,'22.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }

    }
  }

}


public appendTime(){

  for(let i = 0 ; i < this.report.length ; i++){

      if(this.report[i].isActive == "1"){

          for(let j = 0 ; j < this.roomnames.length ; j++){ //หาห้อง

            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '08.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 0){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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

            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '09.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 1){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '10.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 2){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '11.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 3){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '12.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 4){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '13.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 5){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '14.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 6){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '15.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 7){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '16.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 8){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id&& this.report[i].bookMeetingRoom.starttime == '17.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 9){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '18.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 10){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '19.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 11){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '20.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 12){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id&& this.report[i].bookMeetingRoom.starttime == '21.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 13){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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
            if(this.report[i].bookMeetingRoom.roomname.roomname_id == this.roomnames[j].roomname_id && this.report[i].bookMeetingRoom.starttime == '22.00'){

              for(let k =0 ; k < this.events[j].length; k++){

                if(this.events[j][k][0] == 14){
                    this.events[j][k][2] = this.report[i].bookMeetingRoom.lengthtime ;

                    if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                        this.events[j][k][3] = '#C0C0C0' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                        this.events[j][k][3] = '#A0FF7D' ;
                    }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkout'){
                         this.events[j][k][3] = '#006633' ;
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

numnum : number ;
 select: any;
SubmitData(){

        for(let i = 0 ; i < this.fruits.length ; i++){
          if(this. fruits[i].invalid == true){
              this.fruits.splice(i,1);
              i = i - 1 ;
          }
        }
      //  console.log(this.fruits);
        let nan : number = 0 ;
        for(let j = 0 ; j < this.roomnames.length ; j++){ //หาห้อง

            if(this.roomnames[j].roomnames == this.roomname){
               nan = this.roomnames[j].roomname_id ;
            }

        }


      if(this.secondFormGroup.get('tel').value == null || this.secondFormGroup.get('tel').value == '' ||
         this.secondFormGroup.get('topic').value == null || this.secondFormGroup.get('topic').value == '' ||
         this.secondFormGroup.get('atten').value == null || this.secondFormGroup.get('atten').value == '' || this.secondFormGroup.get('totime').value == ''){
          alert("Please Check your field");
      }
      else if(this.fromtimeSelect > this.secondFormGroup.get('totime').value){
           alert("Please Check your field");

      }else if(this.checkReserved (this.fromtimeSelect , this.secondFormGroup.get('totime').value , nan)){
            alert("Cannot book this time period");
            this.router.navigate(['selectRoom',{datefull : this.date}]);
      }
      else{


          let emailcomma = '';
          for(let i = 0 ; i < this.fruits.length ; i++){

            if(i == this.fruits.length-1){
              emailcomma = emailcomma+this.fruits[i].name;
            }else{
              emailcomma = emailcomma+this.fruits[i].name+',';
            }
          }

          this.select = {
              userid: this.userid3,
              fromtimeSelect: this.fromtimeSelect,
              totime: this.secondFormGroup.get('totime').value,
              tel: this.secondFormGroup.get('tel').value,
              topic: this.secondFormGroup.get('topic').value,
              atten: this.secondFormGroup.get('atten').value,
              remark: this.secondFormGroup.get('remark').value,
              roomname: this.roomname,
              date: this.date,
              email: emailcomma
          };

          if(this.roomnameandtime.slowtime == 'false'){
                  this.spiner = true;
                  this.http.post(baseUrl+'/dataform', JSON.stringify(this.select), {
                       headers: {
                          "Content-Type": "application/json"
                        }
                   })
      .subscribe(data => {
        alert("จองสำเร็จ");
         this.router.navigate(['selectRoom',{datefull : this.date}]);
      });
          }else{
              this.spiner = true;
                  this.http.post(baseUrl+'/dataform/booklate', JSON.stringify(this.select), {
                       headers: {
                          "Content-Type": "application/json"
                        }
                   })
      .subscribe(data => {
        alert("จองสำเร็จ");
         this.router.navigate(['selectRoom',{datefull : this.date}]);
      });
          }

      }

   }


checkReserved (fromtime: String , totime: String , roomname){
    this.fromtimesplited = fromtime.split(".");
    this.totimesplited = totime.split(".");


    this.countTime = this.convertlengthTime(this.fromtimesplited[0],this.fromtimesplited[1],this.totimesplited[0],this.totimesplited[1]);

    this.events = [];
    this.appendRoomname();
    this.appendTime();


    let numnum :number = 0  ;
    for(let i = 0 ; i < this.roomnames.length ; i++){

      if(this.roomnames[i].roomname_id == roomname){

        for(let j = 0 ; j < this.events[i].length ; j++){

            if(this.events[i][j][1] == fromtime){
                numnum = 1 ;
                if(this.events[i][j][5] == true){
                    return true;
                    break;
                }else{
                     for(let k = j + 1 ; k <  this.countTime + j - this.events[i][j][2] + 1 ; k++){
                          if(this.events[i][k][11] == true){
                              return true;
                              break;
                            }
                     }
                }

            }
        }

      }
    } // add book and check book

    if(numnum == 0){
        return true;
    }else{
        return false;
    }


}


convertlengthTime(from , fromback , to , toback){

     if(from == "08"  && to == "09"){
            this.lengthtime = 1 ;
     }else if(from == "08"  && to == "10"){
            this.lengthtime = 2 ;
     }else if(from == "08"  && to == "11"){
            this.lengthtime = 3 ;
     }else if(from == "08"  && to == "12"){
            this.lengthtime = 4 ;
     }else if(from == "08"  && to == "13"){
            this.lengthtime = 5 ;
     }else if(from == "08"  && to == "14"){
            this.lengthtime = 6 ;
     }else if(from == "08"  && to == "15"){
            this.lengthtime = 7 ;
     }else if(from == "08"  && to == "16"){
            this.lengthtime = 8 ;
     }else if(from == "08"  && to == "17"){
            this.lengthtime = 9 ;
     }else if(from == "08"  && to == "18"){
            this.lengthtime = 10 ;
     }else if(from == "08"  && to == "19"){
            this.lengthtime = 11 ;
     }else if(from == "08"  && to == "20"){
            this.lengthtime = 12 ;
     }else if(from == "08"  && to == "21"){
            this.lengthtime = 13 ;
     }else if(from == "08"  && to == "22"){
            this.lengthtime = 14 ;
     }

     else if(from == "09"  && to == "10"){
            this.lengthtime = 1 ;
     }else if(from == "09"  && to == "11"){
            this.lengthtime = 2 ;
     }else if(from == "09"  && to == "12"){
            this.lengthtime = 3 ;
     }else if(from == "09"  && to == "13"){
            this.lengthtime = 4 ;
     }else if(from == "09"  && to == "14"){
            this.lengthtime = 5 ;
     }else if(from == "09"  && to == "15"){
            this.lengthtime = 6 ;
     }else if(from == "09"  && to == "16"){
            this.lengthtime = 7 ;
     }else if(from == "09"  && to == "17"){
            this.lengthtime = 8 ;
     }else if(from == "09"  && to == "18"){
            this.lengthtime = 9 ;
     }else if(from == "09"  && to == "19"){
            this.lengthtime = 10 ;
     }else if(from == "09"  && to == "20"){
            this.lengthtime = 11 ;
     }else if(from == "09"  && to == "21"){
            this.lengthtime = 12 ;
     }else if(from == "09"  && to == "22"){
            this.lengthtime = 13 ;
     }


      else if(from == "10"  && to == "11"){
            this.lengthtime = 1 ;
     }else if(from == "10"  && to == "12"){
            this.lengthtime = 2 ;
     }else if(from == "10"  && to == "13"){
            this.lengthtime = 3 ;
     }else if(from == "10"  && to == "14"){
            this.lengthtime = 4 ;
     }else if(from == "10"  && to == "15"){
            this.lengthtime = 5 ;
     }else if(from == "10"  && to == "16"){
            this.lengthtime = 6 ;
     }else if(from == "10"  && to == "17"){
            this.lengthtime = 7 ;
     }else if(from == "10"  && to == "18"){
            this.lengthtime = 8 ;
     }else if(from == "10"  && to == "19"){
            this.lengthtime = 9 ;
     }else if(from == "10"  && to == "20"){
            this.lengthtime = 10 ;
     }else if(from == "10"  && to == "21"){
            this.lengthtime = 11 ;
     }else if(from == "10"  && to == "22"){
            this.lengthtime = 12 ;
     }

      else if(from == "11"  && to == "12"){
            this.lengthtime = 1 ;
     }else if(from == "11"  && to == "13"){
            this.lengthtime = 2 ;
     }else if(from == "11"  && to == "14"){
            this.lengthtime = 3 ;
     }else if(from == "11"  && to == "15"){
            this.lengthtime = 4 ;
     }else if(from == "11"  && to == "16"){
            this.lengthtime = 5 ;
     }else if(from == "11"  && to == "17"){
            this.lengthtime = 6 ;
     }else if(from == "11"  && to == "18"){
            this.lengthtime = 7 ;
     }else if(from == "11"  && to == "19"){
            this.lengthtime = 8 ;
     }else if(from == "11"  && to == "20"){
            this.lengthtime = 9 ;
     }else if(from == "11"  && to == "21"){
            this.lengthtime = 10 ;
     }else if(from == "11"  && to == "22"){
            this.lengthtime = 11 ;
     }

      else if(from == "12"  && to == "13"){
            this.lengthtime = 1 ;
     }else if(from == "12"  && to == "14"){
            this.lengthtime = 2 ;
     }else if(from == "12"  && to == "15"){
            this.lengthtime = 3 ;
     }else if(from == "12"  && to == "16"){
            this.lengthtime = 4 ;
     }else if(from == "12"  && to == "17"){
            this.lengthtime = 5 ;
     }else if(from == "12"  && to == "18"){
            this.lengthtime = 6 ;
     }else if(from == "12"  && to == "19"){
            this.lengthtime = 7 ;
     }else if(from == "12"  && to == "20"){
            this.lengthtime = 8 ;
     }else if(from == "12"  && to == "21"){
            this.lengthtime = 9 ;
     }else if(from == "12"  && to == "22"){
            this.lengthtime = 10 ;
     }


       else if(from == "13"  && to == "14"){
            this.lengthtime = 1 ;
     }else if(from == "13"  && to == "15"){
            this.lengthtime = 2 ;
     }else if(from == "13"  && to == "16"){
            this.lengthtime = 3 ;
     }else if(from == "13"  && to == "17"){
            this.lengthtime = 4 ;
     }else if(from == "13"  && to == "18"){
            this.lengthtime = 5 ;
     }else if(from == "13"  && to == "19"){
            this.lengthtime = 6 ;
     }else if(from == "13"  && to == "20"){
            this.lengthtime = 7 ;
     }else if(from == "13"  && to == "21"){
            this.lengthtime = 8 ;
     }else if(from == "13"  && to == "22"){
            this.lengthtime = 9 ;
     }

         else if(from == "14"  && to == "15"){
            this.lengthtime = 1 ;
     }else if(from == "14"  && to == "16"){
            this.lengthtime = 2 ;
     }else if(from == "14"  && to == "17"){
            this.lengthtime = 3 ;
     }else if(from == "14"  && to == "18"){
            this.lengthtime = 4 ;
     }else if(from == "14"  && to == "19"){
            this.lengthtime = 5 ;
     }else if(from == "14"  && to == "20"){
            this.lengthtime = 6 ;
     }else if(from == "14"  && to == "21"){
            this.lengthtime = 7 ;
     }else if(from == "14"  && to == "22"){
            this.lengthtime = 8 ;
     }


         else if(from == "15"  && to == "16"){
            this.lengthtime = 1 ;
     }else if(from == "15"  && to == "17"){
            this.lengthtime = 2 ;
     }else if(from == "15"  && to == "18"){
            this.lengthtime = 3 ;
     }else if(from == "15"  && to == "19"){
            this.lengthtime = 4 ;
     }else if(from == "15"  && to == "20"){
            this.lengthtime = 5 ;
     }else if(from == "15"  && to == "21"){
            this.lengthtime = 6 ;
     }else if(from == "15"  && to == "22"){
            this.lengthtime = 7 ;
     }


         else if(from == "16"  && to == "17"){
            this.lengthtime = 1 ;
     }else if(from == "16"  && to == "18"){
            this.lengthtime = 2 ;
     }else if(from == "16"  && to == "19"){
            this.lengthtime = 3 ;
     }else if(from == "16"  && to == "20"){
            this.lengthtime = 4 ;
     }else if(from == "16"  && to == "21"){
            this.lengthtime = 5 ;
     }else if(from == "16"  && to == "22"){
            this.lengthtime = 6 ;
     }


         else if(from == "17"  && to == "18"){
            this.lengthtime = 1 ;
     }else if(from == "17"  && to == "19"){
            this.lengthtime = 2 ;
     }else if(from == "17"  && to == "20"){
            this.lengthtime = 3 ;
     }else if(from == "17"  && to == "21"){
            this.lengthtime = 4 ;
     }else if(from == "17"  && to == "22"){
            this.lengthtime = 5 ;
     }


         else if(from == "18"  && to == "19"){
            this.lengthtime = 1 ;
     }else if(from == "18"  && to == "20"){
            this.lengthtime = 2 ;
     }else if(from == "18"  && to == "21"){
            this.lengthtime = 3 ;
     }else if(from == "18"  && to == "22"){
            this.lengthtime = 4 ;
     }


         else if(from == "19"  && to == "20"){
            this.lengthtime = 1 ;
     }else if(from == "19"  && to == "21"){
            this.lengthtime = 2 ;
     }else if(from == "19"  && to == "22"){
            this.lengthtime = 3 ;
     }


           else if(from == "20"  && to == "21"){
            this.lengthtime = 1 ;
     }else if(from == "20"  && to == "22"){
            this.lengthtime = 2 ;
     }

           else if(from == "21"  && to == "22"){
            this.lengthtime = 1 ;
     }


        return this.lengthtime ;

  }


visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [

  ];



  add(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

     // console.log(event.value)

    // Add our fruit

    if ((value || '').trim()) {
      if (this.validateEmail(event.value)) {
        this.fruits.push({name:value.trim(), invalid:false});
      }else{
        this.fruits.push({name:value.trim(), invalid:true});
      }
    }

   /* if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }*/

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


private validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

}
