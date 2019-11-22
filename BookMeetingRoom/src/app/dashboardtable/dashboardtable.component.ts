import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboardtable',
  templateUrl: './dashboardtable.component.html',
  styleUrls: ['./dashboardtable.component.css']
})
export class DashboardtableComponent implements OnInit {


isLoggedIn : Observable<boolean>;
dateFull:any={}
report : Array<any>;
dateStart: String;
dateEnd: String;
counting: number ;


dateSelectMonth: Array<any>;
  constructor(public authService : AuthService , private router: Router, private service : ServiceService,
   private route:ActivatedRoute) {
        this.isLoggedIn = authService.isLoggedIn();
   }

  ngOnInit() {


    this.route.params.subscribe(prams=>{
                this.dateFull = prams;
                this.dateStart = this.dateFull.dateStart;
                this.dateEnd = this.dateFull.dateEnd;

                console.log(this.dateFull);
              })

    this.service.getDateDashBoard(this.dateStart , this.dateEnd).subscribe(data=>{
       this.report = data;
       console.log(this.report);
      this.appendTime();
    })

    this.dateSelectMonth = this.dateFull.dateStart.split("-");
    //console.log('01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year);

  }


timeofweekOTSF2Day01 = [
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
timeofweekOTSF2Day02 = [
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
timeofweekOTSF2Day03 = [
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
timeofweekOTSF2Day04 = [
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
timeofweekOTSF2Day05 = [
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
timeofweekOTSF2Day06 = [
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
timeofweekOTSF2Day07 = [
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
timeofweekOTSF2Day08 = [
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
timeofweekOTSF2Day09 = [
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
timeofweekOTSF2Day10 = [
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
timeofweekOTSF2Day11 = [
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
timeofweekOTSF2Day12 = [
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
timeofweekOTSF2Day13 = [
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
timeofweekOTSF2Day14 = [
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
timeofweekOTSF2Day15 = [
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
timeofweekOTSF2Day16 = [
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
timeofweekOTSF2Day17 = [
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
timeofweekOTSF2Day18 = [
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
timeofweekOTSF2Day19 = [
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
timeofweekOTSF2Day20 = [
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
timeofweekOTSF2Day21 = [
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
timeofweekOTSF2Day22 = [
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
timeofweekOTSF2Day23 = [
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
timeofweekOTSF2Day24 = [
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
timeofweekOTSF2Day25 = [
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
timeofweekOTSF2Day26 = [
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
timeofweekOTSF2Day27 = [
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
timeofweekOTSF2Day28 = [
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
timeofweekOTSF2Day29 = [
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
timeofweekOTSF2Day30 = [
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
timeofweekOTSF2Day31 = [
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


//Room2

timeofweekR2WH7F2Day01 = [
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

timeofweekR2WH7F2Day02 = [
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
timeofweekR2WH7F2Day03 = [
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
timeofweekR2WH7F2Day04 = [
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
timeofweekR2WH7F2Day05 = [
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
timeofweekR2WH7F2Day06 = [
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
timeofweekR2WH7F2Day07 = [
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
timeofweekR2WH7F2Day08 = [
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
timeofweekR2WH7F2Day09 = [
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
timeofweekR2WH7F2Day10 = [
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
timeofweekR2WH7F2Day11 = [
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
timeofweekR2WH7F2Day12 = [
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
timeofweekR2WH7F2Day13 = [
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
timeofweekR2WH7F2Day14 = [
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
timeofweekR2WH7F2Day15 = [
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
timeofweekR2WH7F2Day16 = [
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
timeofweekR2WH7F2Day17 = [
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
timeofweekR2WH7F2Day18 = [
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
timeofweekR2WH7F2Day19 = [
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
timeofweekR2WH7F2Day20 = [
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
timeofweekR2WH7F2Day21 = [
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
timeofweekR2WH7F2Day22 = [
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
timeofweekR2WH7F2Day23 = [
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
timeofweekR2WH7F2Day24 = [
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
timeofweekR2WH7F2Day25 = [
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
timeofweekR2WH7F2Day26 = [
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
timeofweekR2WH7F2Day27 = [
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
timeofweekR2WH7F2Day28 = [
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
timeofweekR2WH7F2Day29 = [
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
timeofweekR2WH7F2Day30 = [
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
timeofweekR2WH7F2Day31 = [
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




//Room3



timeofweekR1WH7F2Day01 = [
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

timeofweekR1WH7F2Day02 = [
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
timeofweekR1WH7F2Day03 = [
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
timeofweekR1WH7F2Day04 = [
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
timeofweekR1WH7F2Day05 = [
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
timeofweekR1WH7F2Day06 = [
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
timeofweekR1WH7F2Day07 = [
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
timeofweekR1WH7F2Day08 = [
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
timeofweekR1WH7F2Day09 = [
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
timeofweekR1WH7F2Day10 = [
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
timeofweekR1WH7F2Day11 = [
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
timeofweekR1WH7F2Day12 = [
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
timeofweekR1WH7F2Day13 = [
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
timeofweekR1WH7F2Day14 = [
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
timeofweekR1WH7F2Day15 = [
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
timeofweekR1WH7F2Day16 = [
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
timeofweekR1WH7F2Day17 = [
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
timeofweekR1WH7F2Day18 = [
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
timeofweekR1WH7F2Day19 = [
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
timeofweekR1WH7F2Day20 = [
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
timeofweekR1WH7F2Day21 = [
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
timeofweekR1WH7F2Day22 = [
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
timeofweekR1WH7F2Day23 = [
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
timeofweekR1WH7F2Day24 = [
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
timeofweekR1WH7F2Day25 = [
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
timeofweekR1WH7F2Day26 = [
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
timeofweekR1WH7F2Day27 = [
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
timeofweekR1WH7F2Day28 = [
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
timeofweekR1WH7F2Day29 = [
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
timeofweekR1WH7F2Day30 = [
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
timeofweekR1WH7F2Day31 = [
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



//Room 4


timeofweekWH2F2Day01 = [
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

timeofweekWH2F2Day02 = [
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
timeofweekWH2F2Day03 = [
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
timeofweekWH2F2Day04 = [
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
timeofweekWH2F2Day05 = [
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
timeofweekWH2F2Day06 = [
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
timeofweekWH2F2Day07 = [
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
timeofweekWH2F2Day08 = [
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
timeofweekWH2F2Day09 = [
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
timeofweekWH2F2Day10 = [
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
timeofweekWH2F2Day11 = [
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
timeofweekWH2F2Day12 = [
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
timeofweekWH2F2Day13 = [
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
timeofweekWH2F2Day14 = [
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
timeofweekWH2F2Day15 = [
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
timeofweekWH2F2Day16 = [
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
timeofweekWH2F2Day17 = [
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
timeofweekWH2F2Day18 = [
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
timeofweekWH2F2Day19 = [
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
timeofweekWH2F2Day20 = [
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
timeofweekWH2F2Day21 = [
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
timeofweekWH2F2Day22 = [
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
timeofweekWH2F2Day23 = [
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
timeofweekWH2F2Day24 = [
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
timeofweekWH2F2Day25 = [
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
timeofweekWH2F2Day26 = [
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
timeofweekWH2F2Day27 = [
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
timeofweekWH2F2Day28 = [
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
timeofweekWH2F2Day29 = [
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
timeofweekWH2F2Day30 = [
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
timeofweekWH2F2Day31 = [
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



public appendTime(){
    for(let i = 0 ; i < this.report.length ; i++){

        if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 0){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 1){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 2){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 3){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 4){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 5){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 6){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 7){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 8){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '01-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
          for(let j =0 ; j < this.timeofweekOTSF2Day01.length; j++){
            if(this.timeofweekOTSF2Day01[j].roomid == 9){
              this.timeofweekOTSF2Day01[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2Day01[j].color = 'red' ;
              this.timeofweekOTSF2Day01[j].showlabel = true;
              this.timeofweekOTSF2Day01[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2Day01[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2Day01[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2Day01[j].checkReservations = true ;
              if(this.timeofweekOTSF2Day01[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2Day01[j].id   ; k++){
                      this.timeofweekOTSF2Day01.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2Day01[j].showremark = true;
                this.timeofweekOTSF2Day01[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 0){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 1){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 2){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 3){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 4){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 5){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 6){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 7){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 8){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '02-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day02.length; j++){
                 if(this.timeofweekOTSF2Day02[j].roomid == 9){
                     this.timeofweekOTSF2Day02[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day02[j].color = 'red' ;
                     this.timeofweekOTSF2Day02[j].showlabel = true;
                     this.timeofweekOTSF2Day02[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day02[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day02[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day02[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day02[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day02[j].id   ; k++){
                              this.timeofweekOTSF2Day02.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day02[j].showremark = true;
                         this.timeofweekOTSF2Day02[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 0){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 1){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 2){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 3){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 4){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 5){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 6){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 7){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 8){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Office TSP Second Floor 2' && this.report[i].date== '03-'+this.dateSelectMonth[1]+'-'+this.dateFull.year){
             for(let j =0 ; j < this.timeofweekOTSF2Day03.length; j++){
                 if(this.timeofweekOTSF2Day03[j].roomid == 9){
                     this.timeofweekOTSF2Day03[j].id = this.report[i].bookMeetingRoom.lengthtime ;
                     this.timeofweekOTSF2Day03[j].color = 'red' ;
                     this.timeofweekOTSF2Day03[j].showlabel = true;
                     this.timeofweekOTSF2Day03[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
                     this.timeofweekOTSF2Day03[j].atten = this.report[i].bookMeetingRoom.attendees ;
                     this.timeofweekOTSF2Day03[j].topic = this.report[i].bookMeetingRoom.topic ;
                     this.timeofweekOTSF2Day03[j].checkReservations = true ;
                     if(this.timeofweekOTSF2Day03[j].id > 1){
                         this.counting = j+1 ;
                           for(let k = 1 ; k < this.timeofweekOTSF2Day03[j].id   ; k++){
                              this.timeofweekOTSF2Day03.splice(this.counting,1);
                            }
                      }
                     if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                         this.timeofweekOTSF2Day03[j].showremark = true;
                         this.timeofweekOTSF2Day03[j].remark = this.report[i].bookMeetingRoom.remark;
                      }
                 }
             }
           }



    } //close loop


} //close function

} // close class
