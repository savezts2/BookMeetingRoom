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
styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
serializedDate = new FormControl((new Date()).toISOString());
MonthSelect: String;
YearSelect: String;
dateEnd: String ;
DateEndDashboard: String;
DateStartDashboard: String;
month: String;
splittedDate : Array<any>;
CurrentTime: any;
selectedyear = this.convertyear(this.serializedDate);
selectedmonth= this.convertmonth(this.serializedDate);
constructor(public authService : AuthService , private router: Router , private service : ServiceService) {
      this.isLoggedIn = authService.isLoggedIn();
      this.isLoggedInAdmin = authService.isLoggedInAdmin();
      this.isLoggedInHR = authService.isLoggedInHR();

     setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()
      }, 1);
   }

  ngOnInit() {

    }

convertyear(selectedyear){
    this.splittedDate = this.serializedDate.value.split("-");
    return this.splittedDate[0];
}

close() {
    this.sidenav.close();
  }

convertmonth(selectedmonth){
    this.splittedDate = this.serializedDate.value.split("-");
    if(this.splittedDate[1] == '01'){
      return 'January';
    }else if(this.splittedDate[1] == '02'){
      return 'February';
    }else if(this.splittedDate[1] == '03'){
      return 'March';
    }else if(this.splittedDate[1] == '04'){
      return 'April';
    }else if(this.splittedDate[1] == '05'){
      return 'May';
    }else if(this.splittedDate[1] == '06'){
      return 'June';
    }else if(this.splittedDate[1] == '07'){
      return 'July';
    }else if(this.splittedDate[1] == '08'){
      return 'August';
    }else if(this.splittedDate[1] == '09'){
      return 'September';
    }else if(this.splittedDate[1] == '10'){
      return 'October';
    }else if(this.splittedDate[1] == '11'){
      return 'November';
    }else{
      return 'December';
    }
}

SearchDashBoard(){




  if(this.selectedmonth == null){
      alert("Please Select Month");
  }else if(this.selectedyear == null){
      alert("Please Select Year");
  }else{
  if(this.selectedmonth == 'January' || this.selectedmonth == 'March' ||this.selectedmonth == 'May' ||this.selectedmonth == 'July' ||
  this.selectedmonth == 'August' ||this.selectedmonth == 'October' ||this.selectedmonth == 'December' ){
    if(this.selectedmonth == 'January'){
      this.month = '01' ;
    }else if(this.selectedmonth == 'March'){
      this.month = '03' ;
    }else if(this.selectedmonth == 'May'){
      this.month = '05' ;
    }else if(this.selectedmonth == 'July'){
      this.month = '07' ;
    }else if(this.selectedmonth == 'August'){
      this.month = '08' ;
    }else if(this.selectedmonth == 'October'){
      this.month = '10' ;
    }else if(this.selectedmonth == 'December'){
      this.month = '12' ;
    }
    this.dateEnd = '31';
  }else if(this.selectedmonth == 'February'){
    if(this.selectedyear == '2019' || this.selectedyear == '2021' || this.selectedyear == '2022' || this.selectedyear == '2025' || this.selectedyear == '2026' || this.selectedyear == '2027' || this.selectedyear == '2029'){
       this.dateEnd = '28';
       this.month = '02' ;
    }else{
       this.dateEnd = '29';
       this.month = '02' ;
    }
  }else{
     if(this.selectedmonth == 'April'){
      this.month = '04' ;
    }else if(this.selectedmonth == 'June'){
      this.month = '06' ;
    }else if(this.selectedmonth == 'September'){
      this.month = '09' ;
    }else if(this.selectedmonth == 'November'){
      this.month = '11' ;
    }
     this.dateEnd = '30';
  }
  this.DateEndDashboard =  this.selectedyear + '-' +this.month + '-' +this.dateEnd;
  this.DateStartDashboard = this.selectedyear+'-' + this.month + '-01' ;
   this.router.navigate(['dashboardTable',{dateStart : this.DateStartDashboard , dateEnd: this.DateEndDashboard , month: this.selectedmonth, year: this.selectedyear}]);
  //console.log(this.DateEndDashboard);
  //console.log(this.DateStartDashboard);



  }

}




}
