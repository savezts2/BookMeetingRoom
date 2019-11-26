import { Component, OnInit ,Inject} from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    isLoggedIn : Observable<boolean>;
    isLoggedInAdmin : Observable<boolean>;
    isLoggedInHR : Observable<boolean>;

    report : Array<any>;
    starttime : Array<any> = [];
    counting: number ;



    datefull :any={}
public API = '//localhost:8080/BookMeetingRoom';   //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build

   constructor(public authService : AuthService , private router: Router, private service : ServiceService,private http: HttpClient,
   private route:ActivatedRoute, public dialog: MatDialog) {
      this.isLoggedIn = authService.isLoggedIn();
      this.isLoggedInAdmin = authService.isLoggedInAdmin();
      this.isLoggedInHR = authService.isLoggedInHR();

   }

  ngOnInit() {

      this.route.params.subscribe(prams=>{
                this.datefull = prams;
                })

    this.service.findDate(this.datefull.datefull).subscribe(data=>{
    this.report = data;
    console.log(data);
    this.appendTime();
    })

  }

 openDialog(room,time,date): void {
    const dialogRef = this.dialog.open(DialogCancel, {
      width: '280px',
      data: {room: room, time: time, date:date}
    });

  }


  selectTable(room,time){
    //console.log(room);
    //console.log(time);
      //console.log(this.datefull.datefull);
    this.router.navigate(['data-form',{roomname:room,roomtime:time,date:this.datefull.datefull}]);
  }

   Reserved(room,time){
    if(localStorage.getItem('tokenidadmin') == "JWT" || localStorage.getItem('tokenidhr') == "JWT"){

     /*this.http.post(this.API + '/CancelBooking/'+this.datefull.datefull +'/' + room +'/' + time ,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Cancel Success");
                                    window.location.reload();
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );*/

      this.openDialog(room,time,this.datefull.datefull);
      //console.log(this.datefull.datefull);
      //console.log(room);
      //console.log(time);
    }else{
      alert("This room cannot be reserved.");
    }
  }

cancelBooking(room,time){

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





//show datatable
 public appendTime(){
    for(let i = 0 ; i < this.report.length ; i++){
      if(this.report[i].isActive == "1"){
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
}



@Component({
  selector: 'dialog-cancel',
  templateUrl: 'dialog-cancel.html',
})
export class DialogCancel {
  public API = '//localhost:8080/BookMeetingRoom';   //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build
  constructor(
    public dialogRef: MatDialogRef<DialogCancel>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData , private http: HttpClient) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){

      this.http.post(this.API + '/CancelBooking/'+this.data.date +'/' + this.data.room +'/' +this.data.time ,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Cancel Success");
                                    window.location.reload();
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );
      this.dialogRef.close();
  }

}
