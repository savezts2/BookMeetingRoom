import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AppDateAdapter, APP_DATE_FORMATS} from '../book-meeting-room1/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [{
      provide: DateAdapter, useClass: AppDateAdapter
      },
  {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }
]
})
export class DashboardComponent implements OnInit {
isLoggedIn : Observable<boolean>;

todateSelect : String = '' ;
fromdateSelect : String = '';

tosplit : Array<any>;
fromsplit : Array<any>;

toconvert : String;
fromconvert : String ;

todatefull : String ;
fromdatefull : String ;
  constructor(public authService : AuthService , private router: Router , private service : ServiceService) {
      this.isLoggedIn = authService.isLoggedIn();
   }

  ngOnInit() {
  }



convertMonth(to : String , from: String){

this.tosplit = to.split(" ");
this.fromsplit= from.split(" ");
  if(this.tosplit[1] == 'Jan'){
  this.toconvert='01';
  }else if(this.tosplit[1] == 'Feb'){
  this.toconvert='02';
  }else if(this.tosplit[1] == 'Mar'){
  this.toconvert='03';
  }else if(this.tosplit[1] == 'Apr'){
  this.toconvert='04';
  }else if(this.tosplit[1] == 'May'){
  this.toconvert='05';
  }else if(this.tosplit[1] == 'Jun'){
  this.toconvert='06';
  }else if(this.tosplit[1] == 'Jul'){
  this.toconvert='07';
  }else if(this.tosplit[1] == 'Aug'){
  this.toconvert='08';
  }else if(this.tosplit[1] == 'Sep'){
  this.toconvert='09';
  }else if(this.tosplit[1] == 'Oct'){
  this.toconvert='10';
  }else if(this.tosplit[1] == 'Nov'){
  this.toconvert='11';
  }else if(this.tosplit[1] == 'Dec'){
  this.toconvert='12';
  }

  if(this.fromsplit[1] == 'Jan'){
  this.fromconvert='01';
  }else if(this.fromsplit[1] == 'Feb'){
  this.fromconvert='02';
  }else if(this.fromsplit[1] == 'Mar'){
  this.fromconvert='03';
  }else if(this.fromsplit[1] == 'Apr'){
  this.fromconvert='04';
  }else if(this.fromsplit[1] == 'May'){
  this.fromconvert='05';
  }else if(this.fromsplit[1] == 'Jun'){
  this.fromconvert='06';
  }else if(this.fromsplit[1] == 'Jul'){
  this.fromconvert='07';
  }else if(this.fromsplit[1] == 'Aug'){
  this.fromconvert='08';
  }else if(this.fromsplit[1] == 'Sep'){
  this.fromconvert='09';
  }else if(this.fromsplit[1] == 'Oct'){
  this.fromconvert='10';
  }else if(this.fromsplit[1] == 'Nov'){
  this.fromconvert='11';
  }else if(this.fromsplit[1] == 'Dec'){
  this.fromconvert='12';
  }

  this.todatefull = this.tosplit[2]+'-'+this.toconvert+'-'+this.tosplit[3];
  this.fromdatefull = this.fromsplit[2]+'-'+this.fromconvert+'-'+this.fromsplit[3];
  console.log(this.todatefull);
  console.log(this.fromdatefull);
}

clicksearch(){
    this.convertMonth(this.todateSelect.toString(),this.fromdateSelect.toString());
  }

}
