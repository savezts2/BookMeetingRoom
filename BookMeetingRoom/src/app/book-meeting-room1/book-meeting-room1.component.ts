import { Component, OnInit ,ViewChild,HostListener} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { ServiceService } from '../Service/service.service';
import {FormControl} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-book-meeting-room1',
  templateUrl: './book-meeting-room1.component.html',
  styleUrls: ['./book-meeting-room1.component.css'],
  providers: [
      {
          provide: DateAdapter, useClass: AppDateAdapter
      },
      {
          provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
      }
      ]
})


export class BookMeetingRoom1Component implements OnInit {
    @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

screenHeight: number;
screenWidth: number;
checkWidthMobile : boolean = true;
@HostListener('window:resize', ['$event'])
getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
         // console.log(this.screenHeight, this.screenWidth,this.checkWidthMobile);
          if(this.screenWidth < 600){
              this.checkWidthMobile = false;
          }else{
              this.checkWidthMobile = true;
          }
    }


    isLoggedIn : Observable<boolean>;
    isLoggedInAdmin : Observable<boolean>;
    isLoggedInHR : Observable<boolean>;
username : string = '' ;
password : string = '' ;


isLoginSubject = new BehaviorSubject<boolean>(false);
    isLoginSubjectAdmin = new BehaviorSubject<boolean>(false);
    isLoginSubjectHR = new BehaviorSubject<boolean>(false);

    dateSelect : String ='';
    month : String;
    splitted : Array<any>;
    dateFull : String ;
    nameLogin: String ;
    serializedDate = new FormControl((new Date()).toISOString());

    today=new Date();
    maxDate = new Date(new Date().getFullYear(),new Date().getMonth()+2,new Date().getDate());

    CurrentTime: any;
    days: any;
    hour: any;
    minute: any;
    sec: any;

    roleadmin : boolean = false;
    rolehr : boolean = false;
    roleuser : boolean  = false;



constructor(public authService : AuthService , private router: Router , private service : ServiceService) {
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

    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds(),
      this.hour = new Date().getHours(),this.minute = new Date().getMinutes(),this.sec = new Date().getSeconds(),
      this.days = new Date().getDay()
      }, 1);
     this.getScreenSize();
  }


close(){
  this.sidenav.close();
}

  ngOnInit(){


      this.nameLogin = localStorage.getItem('nameid');
      //console.log("user",this.isLoggedIn );
      //console.log("admin",this.isLoggedInAdmin );
     // console.log("hr",this.isLoggedInHR );

  }



convertMonth(month : String ){

this.splitted = month.split(" ");
if(this.splitted.length == 1){
  this.splitted = month.split("-");
  this.dateFull = this.splitted[2].substring(0,2)+'-'+this.splitted[1]+'-'+this.splitted[0]
  this.router.navigate(['selectRoom',{datefull : this.dateFull}]);
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
  //console.log(this.dateFull);
  this.router.navigate(['selectRoom',{datefull : this.dateFull}]);
}


}

login(){
  if(this.username == '' || this.password == ''){
    alert("please check your field");
  }else{
    this.authService.login(this.username,this.password);
  }
}

reset(){
  this.username = '';
  this.password = '';
}


clicksearch(){
    this.dateSelect = this.serializedDate.value;
 if(this.dateSelect == ''){
      alert("Please Select Date");
    }else{
      this.convertMonth(this.dateSelect.toString());
    }


}


}
