import{Component, OnInit ,ElementRef, ViewChild}from '@angular/core';
import {AuthService}from '../auth.service';
import {Observable}from "rxjs";
import {Router}from '@angular/router';
import {ServiceService}from '../Service/service.service';

import {DashboardService}from './dashboard.service';
import {ActivatedRoute}from "@angular/router";
import {MatSidenav}from '@angular/material/sidenav';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import * as XLSX from 'xlsx';
import {ExcelService} from '../excel.service';
@Component({
selector: 'app-dashboardtable',
templateUrl: './dashboardtable.component.html',
styleUrls: ['./dashboardtable.component.css']
})
export class DashboardtableComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

isLoggedIn : Observable < boolean>;
isLoggedInAdmin : Observable < boolean>;
isLoggedInHR : Observable < boolean>;
positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
position = new FormControl(this.positionOptions[2]);
dddays : Array <any>;
dateFull:any = {}
report : Array < any>;
report2 : Array < any>;
dateStart: string;
dateEnd: string;
counting: number ;

dateSelectMonth: Array < any>;


checkdelete : number = 0;

events: any[] = [];


fileName= 'ExcelSheet.xlsx';

roomnames : any[] = [];
CurrentTime: any;
numroom : number;
duration : number;
dateshow : string;
constructor(public authService : AuthService , private router: Router, private service : ServiceService,
   private route:ActivatedRoute , private dashboardService : DashboardService,private excelService:ExcelService) {
        this.isLoggedIn = authService.isLoggedIn();
        this.isLoggedInAdmin = authService.isLoggedInAdmin();
        this.isLoggedInHR = authService.isLoggedInHR();

         setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()
      }, 1);





   }

  close(){
  this.sidenav.close();
}





exportexcel(): void{
    let bookMeetingRoom : any[] = [];

  for(let i = 0 ; i < this.report2.length ; i++){

        bookMeetingRoom.push({Book_By : this.report2[i].bookMeetingRoom.create_by,
        Book_Date : this.report2[i].bookMeetingRoom.create_date.substring(8,10)+'/'+this.report2[i].bookMeetingRoom.create_date.substring(5,7)+'/'+this.report2[i].bookMeetingRoom.create_date.substring(0,4) ,
         Meeting_Room : this.report2[i].roomnamebook,
        Start_Time : this.report2[i].bookMeetingRoom.starttime.substring(0,2)+':'+ this.report2[i].bookMeetingRoom.starttime.substring(3,5),
         End_Time : this.report2[i].bookMeetingRoom.endtime.substring(0,2)+':'+ this.report2[i].bookMeetingRoom.endtime.substring(3,5),
        Topic : this.report2[i].bookMeetingRoom.topic ,
         Tel : '\''+this.report2[i].bookMeetingRoom.telbookingby+'\'',
        Attendance : this.report2[i].bookMeetingRoom.attendees ,
         Remark : this.report2[i].bookMeetingRoom.remark == 'null' ? null :  this.report2[i].bookMeetingRoom.remark,
         Status : this.report2[i].bookMeetingRoom.statusbooking,
        Update_Date : this.report2[i].bookMeetingRoom.update_date == null ? this.report2[i].bookMeetingRoom.update_date :
        this.report2[i].bookMeetingRoom.update_date.substring(8,10)+'/'+this.report2[i].bookMeetingRoom.update_date.substring(5,7)+'/'+this.report2[i].bookMeetingRoom.update_date.substring(0,4),
         Update_By : this.report2[i].bookMeetingRoom.update_by,
        Checkin_By : this.report2[i].bookMeetingRoom.checkinby,
        Checkin_Time : this.report2[i].bookMeetingRoom.checkintime,
        Checkout_By : this.report2[i].bookMeetingRoom.checkoutby,
        Checkout_Time : this.report2[i].bookMeetingRoom.checkouttime,
        Duration_Time : this.report2[i].bookMeetingRoom.latetime,
        Late : this.report2[i].bookMeetingRoom.late});


  }
   this.excelService.exportAsExcelFile(bookMeetingRoom, 'BookMeetingRoom');

}



  ngOnInit() {





    this.route.params.subscribe(prams=>{
                this.dateFull = prams;
                this.dateStart = this.dateFull.dateStart;
                this.dateEnd = this.dateFull.dateEnd;
                //console.log(this.dateFull);
                let date1 = new Date(this.dateStart).getTime();
                let date2 = new Date(this.dateEnd).getTime();
                this.duration = (date1 - date2) / (1000*60*60*24) *(-1) + 1;
               // console.log(this.duration);
              })

    this.service.getDateDashBoardReport(this.dateStart , this.dateEnd).subscribe(data=>{
       this.report2 = data;
        //console.log(data);
        this.appendRoomname();
    })

    this.service.getDateDashBoard(this.dateStart , this.dateEnd).subscribe(data=>{
       this.report = data;
        //console.log(data);
      setTimeout(() => {
       this.appendTime();
      }, 1000); //interval
    })

 // console.log(this.dateStart , this.dateEnd);
  this.dateshow = this.dateStart.slice(8,10) + '/' + this.dateStart.slice(5,7) + '/' + this.dateStart.slice(0,4) + '  -  ' +
  this.dateEnd.slice(8,10) + '/' + this.dateEnd.slice(5,7) + '/' + this.dateEnd.slice(0,4);
 // console.log(this.dateshow);
  }


  appendRoomname(){
    let count: number = 0 ;
      for(let i = 0 ; i < this.report2.length ; i++){
          count = 0 ;
          for(let j = 0 ; j < this.roomnames.length ; j++){

              if(this.roomnames[j] == this.report2[i].roomnamebook){
                count = 1 ;
              }
          }
        if(count == 0){
          this.roomnames.push(this.report2[i].roomnamebook);
        }
      }
     this.roomnames = this.roomnames.sort();
   // console.log( this.roomnames);



    for(let i = 0 ; i < this.duration ; i++){
          this.events.push(new Array());

        for(let j = 0 ; j <  this.roomnames.length ; j++){
            this.events[i].push(new Array());



            let date = new Date(this.dateEnd.slice(5,7) + '/'+ this.dateEnd.slice(8,10) + '/' + this.dateEnd.slice(0,4));

            date.setDate(date.getDate() - i);
              let datestring = date.toString();
              //console.log(datestring);

              let dayname = this.convertDayname(datestring.slice(0,3));
              let days = datestring.slice(8,10);
              let months = this.convertMonth(datestring.slice(4,7));;
              let years = datestring.slice(11,15);
              datestring = days + '/' + months +'/' +  years;

            this.events[i][j].push([0,'08.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([1,'09.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([2,'10.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([3,'11.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([4,'12.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([5,'13.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([6,'14.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([7,'15.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([8,'16.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([9,'17.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([10,'18.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([11,'19.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([12,'20.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([13,'21.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
            this.events[i][j].push([14,'22.00',1,'white',this.roomnames[j],false,'',0,'','',false,false,'','','',true,datestring,dayname]);
        }
    }

   // console.log( this.events);


  }

  public appendTime(){

    for(let i = 0 ; i < this.report2.length ; i++){
      if(this.report2[i].isActive == "1"){
           for(let j = 0 ; j < this.events.length ; j++){ //หาห้อง
                for(let k = 0 ; k < this.events[j].length ; k++){
                    for(let l = 0 ; l < this.events[j][k].length ; l++){

                        if(this.events[j][k][l][4] == this.report2[i].roomnamebook && this.report2[i].date == this.events[j][k][l][16].slice(0,2)+'-'
                        + this.events[j][k][l][16].slice(3,5) +'-' + this.events[j][k][l][16].slice(6,10) &&
                        this.report2[i].bookMeetingRoom.starttime == this.events[j][k][l][1]){

                              this.events[j][k][l][2] = this.report2[i].bookMeetingRoom.lengthtime ;

                              if(this.report2[i].bookMeetingRoom.statusbooking == 'Booking'){
                                this.events[j][k][l][3] = '#C0C0C0' ;
                              }else if(this.report2[i].bookMeetingRoom.statusbooking == 'Checkin'){
                                this.events[j][k][l][3] = '#A0FF7D' ;
                              }else if(this.report2[i].bookMeetingRoom.statusbooking == 'Checkout'){
                                this.events[j][k][l][3] = '#006633' ;
                              }else{
                                this.events[j][k][l][3] = '#FF4040' ;
                              }

                              this.events[j][k][l][5] = true;
                              this.events[j][k][l][6] = this.report2[i].users.firstname;
                              this.events[j][k][l][7] = this.report2[i].bookMeetingRoom.attendees ;
                              this.events[j][k][l][14] = this.report2[i].bookMeetingRoom.telbookingby ;
                              this.events[j][k][l][8] = this.report2[i].bookMeetingRoom.topic ;
                              this.events[j][k][l][13] = this.report2[i].bookMeetingRoom.endtime ;
                              this.events[j][k][l][11] = true ;
                              this.events[j][k][l][12] = this.report2[i].users.username;

                              if(this.events[j][k][l][2] > 1){
                                this.counting = l + 1;
                                  for(let m = 1 ; m < this.events[j][k][l][2] ; m++){
                                    this.events[j][k].splice(this.counting,1);
                                  }
                              }

                              if(this.report2[i].bookMeetingRoom.remark != "null" && this.report[i].bookMeetingRoom.remark != " "){
                                this.events[j][k][l][10] = true;
                                this.events[j][k][l][9] = this.report2[i].bookMeetingRoom.remark;
                              }





                        }

                     }
                }
          }
      }
    }

    for(let i = 0 ; i < this.events.length ; i++){

        for(let j = 0 ; j < this.events[i].length ; j++){
          this.checkdelete = 0 ;
            for(let k = 0 ; k < this.events[i][j].length ; k++){
                if(this.events[i][j][k][5] == true){
                    this.checkdelete = 1 ;
                }
            }

          if( this.checkdelete == 0){
              this.events[i].splice(j,1);
              j = j - 1 ;
          }
        }
    }

    for(let i = 0 ; i < this.events.length ; i++){

        if(this.events[i].length == 0){
            this.events.splice(i,1);
              i = i - 1;
        }
    }

  } // appendtime

 convertDayname(day){
    if(day == 'Sun'){
      return 'Sunday';
    }else if(day == 'Mon'){
      return 'Monday';
    }else if(day == 'Tue'){
      return 'Tuesday';
    }else if(day == 'Wed'){
      return 'Wednesday';
    }else if(day == 'Thu'){
      return 'Thursday';
    }else if(day == 'Fri'){
      return 'Friday';
    }else if(day == 'Sat'){
      return 'Saturday';
    }
 }
convertMonth(month){
  if(month == 'Jan'){
    return '01';
  }else if(month == 'Feb'){
    return '02';
  }else if(month == 'Mar'){
    return '03';
  }else if(month == 'Apr'){
    return '04';
  }else if(month == 'May'){
    return '05';
  }else if(month == 'Jun'){
    return '06';
  }else if(month == 'Jul'){
    return '07';
  }else if(month == 'Aug'){
    return '08';
  }else if(month == 'Sep'){
    return '09';
  }else if(month == 'Oct'){
    return '10';
  }else if(month == 'Nov'){
    return '11';
  }else {
    return '12';
  }
}


} // class




