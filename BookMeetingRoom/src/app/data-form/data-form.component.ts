import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ServiceService } from '../Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;


roomnameandtime:any={}
fromtimeSelect : '';
totime : null ;
tel : null;
topic : null;
atten : null;
remark: null;
roomname: '' ;
date: '';
userid3: String;
report : Array<any>;
counting: number ;

fromtimesplited : Array<any>;
totimesplited : Array<any>;
countTime : number;
spiner : boolean = false;
public API = '//localhost:8080/BookMeetingRoom';   //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build


constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
  }

  ngOnInit() {

      this.route.params.subscribe(prams=>{
                this.roomnameandtime = prams;
                this.fromtimeSelect=this.roomnameandtime.roomtime;
                this.roomname =this.roomnameandtime.roomname;
                this.date = this.roomnameandtime.date;
              })

    this.userid3 = localStorage.getItem('userid');
    this.service.findDate(this.date).subscribe(data=>{
    this.report = data;
    //console.log(data);
    this.appendTime();
    })
  }

SubmitData(){
    //console.log(localStorage.getItem('userid'));
    //console.log(this.userid3);
    //console.log(this.fromtimeSelect);
    //console.log(this.totime);
    //console.log(this.tel);
    //console.log(this.topic);
    //console.log(this.atten);
    //console.log(this.remark);
      if(this.totime == null){
        alert("Please Check field To time");
      }
      else if(this.tel == null){
        alert("Please Check field Tel. Booking By");
      }
      else if(this.topic == null){
        alert("Please Check field Topic");
      }
      else if(this.atten == null){
        alert("Please Check field Attendees");
      }
      else if(this.checkReserved(this.fromtimeSelect,this.totime,this.roomname)){
        alert("มีคนจองช่วงเวลานี้แล้ว");
        this.totime = null ;
      }
     else{
      this.spiner = true;
     this.http.post(this.API + '/'+this.userid3 +'/' + this.fromtimeSelect +'/' + this.totime + '/' + this.tel
     + '/' + this.topic+ '/' + this.atten+ '/' + this.remark+ '/' + this.roomname+ '/' + this.date,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("จองสำเร็จ");
                                   this.router.navigate(['selectRoom',{datefull: this.date}]);
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
  //console.log(parseInt(this.totimesplited[0])+1);
  this.countTime = parseInt(this.totimesplited[0]) - parseInt(this.fromtimesplited[0]) ;
  //console.log(this.countTime);
  if(roomname == 'Office TSP Second Floor 2'){
      for(let i =0 ; i < this.timeofweekOTSF2.length ; i++){
          if(this.timeofweekOTSF2[i].time == fromtime){
            for(let j = i+1 ;j < this.countTime + i + 1 ;j++){
              if(this.timeofweekOTSF2[j].checkReservations == true){
                return true;
                break;
              }
            }
          }
      }
      return false;
  }else if(roomname == 'Room1 WH7 Second Floor 2'){
      for(let i =0 ; i < this.timeofweekR1WH7F2.length ; i++){
          if(this.timeofweekR1WH7F2[i].time == fromtime){
            for(let j = i+1 ;j < this.countTime + i + 1 ;j++){
              if(this.timeofweekR1WH7F2[j].checkReservations == true){
                return true;
                break;
              }
            }
          }
      }
      return false;
  }else if(roomname == 'Room2 WH7 Second Floor 2'){
      for(let i =0 ; i < this.timeofweekR2WH7F2.length ; i++){
          if(this.timeofweekR2WH7F2[i].time == fromtime){
            for(let j = i+1 ;j < this.countTime + i + 1 ;j++){
              if(this.timeofweekR2WH7F2[j].checkReservations == true){
                return true;
                break;
              }
            }
          }
      }
      return false;
  }else if(roomname == 'WH2 Second Floor 2'){
      for(let i =0 ; i < this.timeofweekWH2F2.length ; i++){
          if(this.timeofweekWH2F2[i].time == fromtime){
            for(let j = i+1 ;j < this.countTime + i + 1 ;j++){
              if(this.timeofweekWH2F2[j].checkReservations == true){
                return true;
                break;
              }
            }
          }
      }
      return false;
  }

}


reset(){
    this.totime = null ;
    this.tel = null;
    this.topic = null;
    this.atten = null;
    this.remark = null;
}

timeofweekOTSF2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 1,time:'09.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 2,time:'10.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 3,time:'11.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 4,time:'12.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 5,time:'13.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 6,time:'14.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 7,time:'15.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 8,time:'16.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 9,time:'17.00',id: 1,color:'white',roomname: 'Office TSP Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];

  timeofweekR1WH7F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 1,time:'09.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 2,time:'10.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 3,time:'11.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 4,time:'12.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 5,time:'13.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 6,time:'14.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 7,time:'15.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 8,time:'16.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 9,time:'17.00',id: 1,color:'white',roomname: 'Room1 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];

  timeofweekR2WH7F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 1,time:'09.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 2,time:'10.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 3,time:'11.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 4,time:'12.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 5,time:'13.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 6,time:'14.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 7,time:'15.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 8,time:'16.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 9,time:'17.00',id: 1,color:'white',roomname: 'Room2 WH7 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];

  timeofweekWH2F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 1,time:'09.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 2,time:'10.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 3,time:'11.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 4,time:'12.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 5,time:'13.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 6,time:'14.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 7,time:'15.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 8,time:'16.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},
    {roomid : 9,time:'17.00',id: 1,color:'white',roomname: 'WH2 Second Floor 2',showlabel:false, byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];

public appendTime(){
    for(let i = 0 ; i < this.report.length ; i++){

        // Office TSP Second Floor 2
        if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 0){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 1){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 2){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 3){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 4){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 5){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 6){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 7){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 8){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 9){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }



        // Room1 WH7 Second Floor 2
        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 0){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 1){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 2){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 3){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 4){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 5){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 6){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 7){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 8){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Room1 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 9){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }




    //Room2 WH7 Second Floor 2

        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 0){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 1){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 2){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 3){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 4){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 5){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 6){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 7){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 8){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Room2 WH7 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 9){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }

      //WH2F2

        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 0){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }

        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 1){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 2){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 3){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 4){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 5){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 6){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 7){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 8){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'WH2 Second Floor 2'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 9){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
    }
//console.log(this.timeofweekOTSF2);
//console.log(this.timeofweekR1WH7F2);
//console.log(this.timeofweekR2WH7F2);
//console.log(this.timeofweekWH2F2);
}

}
