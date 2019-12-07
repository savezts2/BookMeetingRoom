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
    isLoggedIn : Observable<boolean>;
    isLoggedInAdmin : Observable<boolean>;
    isLoggedInHR : Observable<boolean>;

    report : Array<any>;
    starttime : Array<any> = [];
    counting: number ;

CurrentTime: any;
days: any ;
hour: any;
minute: any;
sec: any;


day : String;
month : String;
year : String;

    datefull :any={}
    public API = '//localhost:8080/';  //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build

dateshow : String;
bf : boolean = true;
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

  ngOnInit() {

     /*setInterval(() => {
      if(new Date().getHours() == 13 && new Date().getMinutes() == 31){
        console.log(1);
      }
        myInterval = myInterval + 1 ;
        console.log(myInterval);

    }, 1000);*/



      this.route.params.subscribe(prams=>{
                this.datefull = prams;
                })

    this.service.findDate(this.datefull.datefull).subscribe(data=>{
    this.report = data;
    this.appendTime();
    console.log(data);
    })
    this.dateshow = this.dateShow(this.datefull.datefull);


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

    console.log(datetoday,datebook,timesplit);

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

        time1 : string;
        time2 : string;
        time3 = new Date();
   Reserved(room,time,username,atten,topic,remark,totime,tel){
        let totimesplit: Array<string>;
         let fromtimesplit: Array<string>;

        totimesplit = time.split(".");
        fromtimesplit = totime.split(".");
        this.time1 = totimesplit[0]+""+totimesplit[1];
        this.time2 = fromtimesplit[0]+""+fromtimesplit[1];
        let time4 : string = this.time3.getHours().toString() +""+ this.time3.getMinutes().toString();

       this.service.getBookMeetingRoom(this.datefull.datefull,room,time).subscribe(data=>{
              console.log(data);
              if(data != null){
                    if(parseInt(time4) > parseInt(this.time2)){
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
                  alert("this time is checked");
              }
       })

  }




  timeofweekOTSF2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''}
  ];



  timeofweekR1WH7F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''}
  ];


timeofweekR2WH7F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''}
  ];





timeofweekWH2F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false,byusername: '',totime: '',tel: ''}
  ];







//show datatable
 public appendTime(){
    for(let i = 0 ; i < this.report.length ; i++){
      if(this.report[i].isActive == "1"){
        // Meeting Room1(TSP)
        if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 0){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;

              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }

              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != "unde"){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 1){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 2){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 3){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 4){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 5){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 6){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;

              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 7){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 8){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 9){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 10){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 11){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 12){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 13){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 14){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 15){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 16){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 17){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 18){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekOTSF2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekOTSF2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekOTSF2[j].color = '#FF3333' ;
              }
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.firstname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekOTSF2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekOTSF2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekOTSF2[j].checkReservations = true ; this.timeofweekOTSF2[j].byusername = this.report[i].users.username;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }






        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 0){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 1){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 2){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 3){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 4){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 5){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 6){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 7){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 8){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 9){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 10){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 11){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 12){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 13){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 14){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 15){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 16){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 17){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 18){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR1WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR1WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR1WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR1WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR1WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR1WH7F2[j].checkReservations = true ; this.timeofweekR1WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }





        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 0){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 1){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 2){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 3){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 4){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 5){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 6){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 7){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 8){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 9){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 10){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 11){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 12){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 13){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 14){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 15){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 16){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 17){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 18){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekR2WH7F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekR2WH7F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekR2WH7F2[j].color = '#FF3333' ;
              }
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.firstname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ; this.timeofweekR2WH7F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekR2WH7F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekR2WH7F2[j].checkReservations = true ; this.timeofweekR2WH7F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }

      //WH2F2

        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 0){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 1){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 2){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 3){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 4){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 5){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 6){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 7){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 8){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 9){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 10){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 11){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 12){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 13){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 14){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 15){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 16){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 17){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 18){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              if(this.report[i].bookMeetingRoom.statusbooking == 'booking'){
                this.timeofweekWH2F2[j].color = '#C0C0C0' ;
              }else if(this.report[i].bookMeetingRoom.statusbooking == 'checkin'){
                this.timeofweekWH2F2[j].color = '#A0FF7D' ;
              }else{
                this.timeofweekWH2F2[j].color = '#FF3333' ;
              }
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.firstname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;this.timeofweekWH2F2[j].tel = this.report[i].bookMeetingRoom.telbookingby ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;this.timeofweekWH2F2[j].totime = this.report[i].bookMeetingRoom.endtime ;
              this.timeofweekWH2F2[j].checkReservations = true ; this.timeofweekWH2F2[j].byusername = this.report[i].users.username;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
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
}



