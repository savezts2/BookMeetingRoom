import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AppDateAdapter, APP_DATE_FORMATS} from '../book-meeting-room1/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { ServiceService } from '../Service/service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

isLoggedIn : Observable<boolean>;
MonthSelect: String;
YearSelect: String;
dateEnd: String ;
DateEndDashboard: String;
DateStartDashboard: String;
month: String;
  constructor(public authService : AuthService , private router: Router , private service : ServiceService) {
      this.isLoggedIn = authService.isLoggedIn();
   }

  ngOnInit() {
  }

SearchDashBoard(){
  if(this.MonthSelect == null){
      alert("Please Select Month");
  }else if(this.YearSelect == null){
      alert("Please Select Year");
  }else{
  if(this.MonthSelect == 'January' || this.MonthSelect == 'March' ||this.MonthSelect == 'May' ||this.MonthSelect == 'July' ||
  this.MonthSelect == 'August' ||this.MonthSelect == 'October' ||this.MonthSelect == 'December' ){
    if(this.MonthSelect == 'January'){
      this.month = '01' ;
    }else if(this.MonthSelect == 'March'){
      this.month = '03' ;
    }else if(this.MonthSelect == 'May'){
      this.month = '05' ;
    }else if(this.MonthSelect == 'July'){
      this.month = '07' ;
    }else if(this.MonthSelect == 'August'){
      this.month = '08' ;
    }else if(this.MonthSelect == 'October'){
      this.month = '10' ;
    }else if(this.MonthSelect == 'December'){
      this.month = '12' ;
    }
    this.dateEnd = '31';
  }else if(this.MonthSelect == 'February'){
    this.dateEnd = '29';
    this.month = '02' ;
  }else{
     if(this.MonthSelect == 'April'){
      this.month = '04' ;
    }else if(this.MonthSelect == 'June'){
      this.month = '06' ;
    }else if(this.MonthSelect == 'September'){
      this.month = '09' ;
    }else if(this.MonthSelect == 'November'){
      this.month = '11' ;
    }
     this.dateEnd = '30';
  }
  this.DateEndDashboard =  this.YearSelect + '-' +this.month + '-' +this.dateEnd;
  this.DateStartDashboard = this.YearSelect+'-' + this.month + '-01' ;
   this.router.navigate(['dashboardTable',{dateStart : this.DateStartDashboard , dateEnd: this.DateEndDashboard , month: this.MonthSelect, year: this.YearSelect}]);
  //console.log(this.DateEndDashboard);
  //console.log(this.DateStartDashboard);
  }
}




}
