import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ServiceService } from '../Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
username : string = '' ;
password : string = '' ;
  constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router) {
     this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
}

  ngOnInit() {
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

}
