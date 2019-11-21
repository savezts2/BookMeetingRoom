import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ServiceService } from '../Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

isLoggedIn : Observable<boolean>;

roomnameandtime:any={}
fromtimeSelect : '';
totime : null ;
tel : null;
topic : null;
atten : null;
remark: null;
roomname: '' ;
date: '';
userid3: String;
public API = '//localhost:8080/BookMeetingRoom';   //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build


constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {

      this.route.params.subscribe(prams=>{
                this.roomnameandtime = prams;
                this.fromtimeSelect=this.roomnameandtime.roomtime;
                this.roomname =this.roomnameandtime.roomname;
                this.date = this.roomnameandtime.date;
              })

    this.userid3 = localStorage.getItem('userid');
  }

SubmitData(){
    //console.log(localStorage.getItem('userid'));
    //console.log(this.userid3);
    //console.log(this.fromtimeSelect);
    //console.log(this.totime);
    //console.log(this.tel);
    //console.log(this.topic);
    //console.log(this.atten);
    //console.log(this.remark);
      if(this.totime == null){
        alert("Please Check field To time");
      }
      else if(this.tel == null){
        alert("Please Check field Tel. Booking By");
      }
      else if(this.topic == null){
        alert("Please Check field Topic");
      }
      else if(this.atten == null){
        alert("Please Check field Attendees");
      }
     else{
     this.http.post(this.API + '/'+this.userid3 +'/' + this.fromtimeSelect +'/' + this.totime + '/' + this.tel
     + '/' + this.topic+ '/' + this.atten+ '/' + this.remark+ '/' + this.roomname+ '/' + this.date,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful', data);
                                   alert("จองสำเร็จ");
                                   this.router.navigate(['selectRoom',{datefull: this.date}]);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );

      }
   }

reset(){
    this.totime = null ;
    this.tel = null;
    this.topic = null;
    this.atten = null;
    this.remark = null;
}

}
