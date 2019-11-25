import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';

import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-adduserbyadmin',
  templateUrl: './adduserbyadmin.component.html',
  styleUrls: ['./adduserbyadmin.component.css']
})
export class AdduserbyadminComponent implements OnInit {

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;


constructor( public authService : AuthService,private router: Router , private service : ServiceService) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
 }

  ngOnInit() {
  }

}
