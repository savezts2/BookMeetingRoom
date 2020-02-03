import { Component, OnInit,ViewChild,ChangeDetectorRef ,OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MediaMatcher} from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { ServiceService } from '../Service/service.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;

nameuser: string;
lastname: string;
role: string;
mobileQuery: MediaQueryList;

roleadmin : boolean = false;
rolehr : boolean = false;
roleuser : boolean  = false;
serializedDate = new FormControl(new Date());
serializedDate2 = new FormControl(new Date());
frommonthnum : string;
tomonthnum : string;
DateStartDashboard: string;
DateEndDashboard: string;
datedesc : any;
  constructor(private breakpointObserver: BreakpointObserver,public authService : AuthService , private router: Router , private service : ServiceService,
  changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
       this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
    this.nameuser = localStorage.getItem('nameid');
    this.lastname = localStorage.getItem('lastname');
     this.mobileQuery = media.matchMedia('(max-width: 100px)');

    this.nameuser = localStorage.getItem('nameid');
    this.lastname = localStorage.getItem('lastname');
    this.role = localStorage.getItem('roleid');

 if(sessionStorage.getItem('tokenidadmin') == 'JWT'){
      this.roleadmin=true;
    }else if(sessionStorage.getItem('tokenidhr') == 'JWT'){
      this.rolehr=true;
    }else if(sessionStorage.getItem('tokenid') == 'JWT'){
      this.roleuser=true;
    }

  }

ngOnInit() {
    this.service.getDatedesc().subscribe(data=>{
       this.datedesc = data;
        this.getdatedesc();
     // console.log(this.datedesc);
    })

}
dateeee : string;
getdatedesc(){

      for(let i = 0 ; i < this.datedesc.length ; i++){
        this.dateeee = this.datedesc[i].dateBook;
      }
  //console.log(new Date(" ' "+this.dateeee+" ' "));
  this.serializedDate2 = new FormControl(new Date(" ' "+this.dateeee+" ' "));
}

logout(){


  this.authService.logout();

}



goToDashboard(){
   let fromdatesplit : Array<any>;
   let todatesplit : Array<any>;

    fromdatesplit = this.serializedDate.value.toString().split(' ');
      todatesplit = this.serializedDate2.value.toString().split(' ');

      this.frommonthnum = this.convertMonth(fromdatesplit[1]);
      this.tomonthnum = this.convertMonth(todatesplit[1]);

      this.DateStartDashboard = fromdatesplit[3]+'-'+ this.frommonthnum +'-'+ fromdatesplit[2];
      this.DateEndDashboard = todatesplit[3]+'-'+ this.tomonthnum +'-'+ todatesplit[2];

  this.router.navigate(['dashboardTable',{dateStart : this.DateStartDashboard , dateEnd: this.DateEndDashboard , month: fromdatesplit[1], year: fromdatesplit[3]}]);
      window.location.href= '#/dashboardTable;dateStart='+this.DateStartDashboard +';dateEnd='+this.DateEndDashboard+
      ';month'+ fromdatesplit[1]+';year='+fromdatesplit[3];
       window.location.reload()
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

}
