import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { ServiceService } from '../Service/service.service';

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
    isLoggedIn : Observable<boolean>;
    isLoginSubject = new BehaviorSubject<boolean>(false);
    dateSelect : String = '' ;
    month : String;
    splitted : Array<any>;
    dateFull : String ;


constructor(public authService : AuthService , private router: Router , private service : ServiceService) {
    this.isLoggedIn = authService.isLoggedIn();

  }


  ngOnInit(){}


convertMonth(month : String ){

this.splitted = month.split(" ");
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

}

clicksearch(){
    this.convertMonth(this.dateSelect.toString());

}


}
