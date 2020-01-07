import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AppDateAdapter, APP_DATE_FORMATS} from '../book-meeting-room1/date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { ServiceService } from '../Service/service.service';
import {MatSidenav} from '@angular/material/sidenav';
import {FormControl} from '@angular/forms';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css'],
providers: [
{
provide: DateAdapter, useClass: AppDateAdapter
},
{
provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
}
]
})
export class DashboardComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
serializedDate = new FormControl();
serializedDate2 = new FormControl();
frommonthnum : string;
tomonthnum : string;
DateStartDashboard: string;
DateEndDashboard: string;
in : any;
year: string;
mindate : any;
constructor(public authService : AuthService , private router: Router , private service : ServiceService) {
      this.isLoggedIn = authService.isLoggedIn();
      this.isLoggedInAdmin = authService.isLoggedInAdmin();
      this.isLoggedInHR = authService.isLoggedInHR();

   }

  ngOnInit() {
          this.in = setInterval(() => {
              this.mindate = this.serializedDate.value;
              //console.log(this.serializedDate.value);
        }, 1000); //interval
    }



ngOnDestroy() {

  if(this.in){
      clearInterval(this.in);
  }

}

SearchDashBoard(){
  let fromdatesplit : Array<any>;
  let todatesplit : Array<any>;

  if(this.serializedDate.value == null  ||  this.serializedDate2.value == null){
      alert('Please Check Field Date.');
  }else if(this.serializedDate.value  >  this.serializedDate2.value){
      alert('Please Check From Date.');
      this.serializedDate2 = new FormControl();
  }else{
      fromdatesplit = this.serializedDate.value.toString().split(' ');
      todatesplit = this.serializedDate2.value.toString().split(' ');

      this.frommonthnum = this.convertMonth(fromdatesplit[1]);
      this.tomonthnum = this.convertMonth(todatesplit[1]);

      this.DateStartDashboard = fromdatesplit[3]+'-'+ this.frommonthnum +'-'+ fromdatesplit[2];
      this.DateEndDashboard = todatesplit[3]+'-'+ this.tomonthnum +'-'+ todatesplit[2];
     // console.log( this.DateStartDashboard ,this.DateEndDashboard);
      this.router.navigate(['dashboardTable',{dateStart : this.DateStartDashboard , dateEnd: this.DateEndDashboard , month: fromdatesplit[1], year: fromdatesplit[3]}]);
  }










}

convertMonth(month){
  let monthnum;
  if(month == 'Jan'){
    monthnum = '01';
  }else if(month == 'Feb'){
    monthnum = '02';
  }else if(month == 'Mar'){
    monthnum = '03';
  }else if(month == 'Apr'){
    monthnum = '04';
  }else if(month == 'May'){
    monthnum = '05';
  }else if(month == 'Jun'){
    monthnum = '06';
  }else if(month == 'Jul'){
    monthnum = '07';
  }else if(month == 'Aug'){
    monthnum = '08';
  }else if(month == 'Sep'){
    monthnum = '09';
  }else if(month == 'Oct'){
    monthnum = '10';
  }else if(month == 'Nov'){
    monthnum = '11';
  }else{
    monthnum = '12';
  }
  return monthnum;
}


}
