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
//public API = '//localhost:8080';  //for test
public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
events: any[] = [];
roomnames : Array<any>;





  ngOnInit() {

      this.route.params.subscribe(prams=>{

                this.roomnameandtime = prams;
                this.roomname =this.roomnameandtime.roomname;
                this.date = this.roomnameandtime.date;
                console.log(this.roomnameandtime);
              })
    this.fromtimeSelect = this.roomnameandtime.roomtime;
    this.userid3 = localStorage.getItem('userid');
    this.service.findDate(this.date).subscribe(data=>{
    this.report = data;
    console.log(data);
    this.appendTime();
    })

     this.service.getRoomname().subscribe(data => {
                                 this.roomnames = data;
                                console.log(this.roomnames);
                                this.appendRoomname();
                               });

    this.firstFormGroup = this._formBuilder.group({
      totime: [null, Validators.required]
    });

     this.secondFormGroup = this._formBuilder.group({
      tel: [null, Validators.required],
      topic: [null, Validators.required],
      atten: [null, Validators.required],
      remark: null
    });
  }

constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router,private _formBuilder: FormBuilder) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();

  }

close() {
    this.sidenav.close();
  }

checkOne(){
   if(this.firstFormGroup.get('totime').value == null || this.firstFormGroup.get('totime').value == ''){
    alert("Please Check your field");
  }

}

checkTwo(){

if(this.secondFormGroup.get('tel').value == null || this.secondFormGroup.get('tel').value == '' ||
  this.secondFormGroup.get('topic').value == null || this.secondFormGroup.get('topic').value == '' ||
   this.secondFormGroup.get('atten').value == null || this.secondFormGroup.get('atten').value == ''){
    alert("Please Check your field");
  }
}


appendRoomname(){
  for(let i = 0 ; i < this.roomnames.length ; i++){
      this.events.push(new Array());
    for(let j = 0 ; j < 19 ; j++){

      if(j == 0){
        this.events[i].push([j,'08.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 1){
        this.events[i].push([j,'08.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 2){
        this.events[i].push([j,'09.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 3){
        this.events[i].push([j,'09.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 4){
        this.events[i].push([j,'10.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 5){
        this.events[i].push([j,'10.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 6){
        this.events[i].push([j,'11.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 7){
        this.events[i].push([j,'11.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 8){
        this.events[i].push([j,'12.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 9){
        this.events[i].push([j,'12.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 10){
        this.events[i].push([j,'13.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 11){
        this.events[i].push([j,'13.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 12){
        this.events[i].push([j,'14.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 13){
        this.events[i].push([j,'14.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 14){
        this.events[i].push([j,'15.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 15){
        this.events[i].push([j,'15.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 16){
        this.events[i].push([j,'16.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 17){
        this.events[i].push([j,'16.30',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
      }else if(j == 18){
        this.events[i].push([j,'17.00',1,'white',this.roomnames[i].roomnames,false,'',0,'','',false,false,'','','']);
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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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
                  this.events[j][k][12] = this.report[i].users.username;

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

  console.log(this.events);

} // appendtime


SubmitData(){

      this.spiner = true;

      if(this.checkReserved (this.fromtimeSelect , this.firstFormGroup.get('totime').value , this.roomname)){
          alert("Cannot book this time period");
          window.location.reload(true);
      }else{

     this.http.post(this.API + '/'+this.userid3 +'/' + this.fromtimeSelect +'/' + this.firstFormGroup.get('totime').value +'/'+ this.secondFormGroup.get('tel').value
     + '/' + this.secondFormGroup.get('topic').value+ '/' + this.secondFormGroup.get('atten').value+ '/' + this.secondFormGroup.get('remark').value+ '/' + this.roomname+ '/' + this.date,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("จองสำเร็จ");

                                   this.router.navigate(['selectDate']);

                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );


      }

   }


checkReserved (fromtime: String , totime: String , roomname:String){
    this.fromtimesplited = fromtime.split(".");
    this.totimesplited = totime.split(".");

    this.countTime = this.convertlengthTime(this.fromtimesplited[0],this.fromtimesplited[1],this.totimesplited[0],this.totimesplited[1]);

     for(let i = 0 ; i < this.roomnames.length ; i++){

         if(this.roomnames[i].roomnames == roomname){
            for(let j = 0 ; j < this.events[i].length ; j++){
                if(this.events[i][j][1] == fromtime){
                  if(this.countTime > 1){

                    for(let k = j+1 ; k < this.countTime + j ; k++){
                      if(this.events[i][k][11] == true){

                        return true;

                          break;
                       }
                    }
                   }
                }
            }
          return false;
         }

     }


}


convertlengthTime(from , fromback , to , toback){

     if(from == "08"  && to == "08"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "08"  && to == "09"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "08"  && to == "10"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "08"  && to == "11"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "08"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "08"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "08"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 14 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12;
            }else{
                this.lengthtime = 13;
            }
        }else if(from == "08"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 15 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 16 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 14;
            }else{
                this.lengthtime = 15;
            }
        }else if(from == "08"  && to == "16"){
             if(fromback == "00" && toback == "00"){
                this.lengthtime = 17 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 18 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 16;
            }else{
                this.lengthtime = 17;
            }
        }else if(from == "08"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 19 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 18 ;
            }
        }else if(from == "09"  && to == "09"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "09"  && to == "10"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "09"  && to == "11"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "09"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "09"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "09"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "09"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 14 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12;
            }else{
                this.lengthtime = 13;
            }
        }else if(from == "09"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 15 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 16 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 14;
            }else{
                this.lengthtime = 15;
            }
        }else if(from == "09"  && to == "17"){
             if(fromback == "00" && toback == "00"){
                this.lengthtime = 17 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 16 ;
            }
        }else if(from == "10"  && to == "10"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "10"  && to == "11"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "10"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "10"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "10"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "10"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "10"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 14 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12;
            }else{
                this.lengthtime = 13;
            }
        }else if(from == "10"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 15 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 14 ;
            }
        }else if(from == "11"  && to == "11"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "11"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "11"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "11"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "11"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "11"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "11"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12 ;
            }
        }else if(from == "12"  && to == "12"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "12"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "12"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "12"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "12"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "12"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10 ;
            }
        }else if(from == "13"  && to == "13"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "13"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "13"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "13"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "13"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8 ;
            }
        }else if(from == "14"  && to == "14"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "14"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "14"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "14"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6 ;
            }
        }else if(from == "15"  && to == "15"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "15"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "15"  && to == "17"){
             if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4 ;
            }
        }else if(from == "16"  && to == "16"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "16"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2 ;
            }
        }else if(from == "17"  && to == "17"){
            this.lengthtime = 1 ;
        }
        return this.lengthtime ;

      }




}
