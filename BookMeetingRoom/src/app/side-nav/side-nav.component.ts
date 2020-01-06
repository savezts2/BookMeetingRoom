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

  }

logout(){


  this.authService.logout();


}

}
