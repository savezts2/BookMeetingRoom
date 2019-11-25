import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../Service/service.service';


@Component({
  selector: 'app-canceluser',
  templateUrl: './canceluser.component.html',
  styleUrls: ['./canceluser.component.css']
})
export class CanceluserComponent implements OnInit {

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
userid : String = null;
public API = '//localhost:8080/BookMeetingRoom';   //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build
user_id : null;
username: null;
lastname: null;
useridbase: null;
department: null;
position: null;
status: null;
isactive: null;
func : null;
  constructor(  public authService : AuthService,private router: Router , private service : ServiceService,private http: HttpClient) {

   this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
    }

  ngOnInit() {

  }

search(){
  if(this.userid == null){
        alert("Please fill out all information.");

  }else{
  this.service.getUserid(this.userid).subscribe(data=>{
    if(data == null)
      alert("This userid does not exist in the system.");
    else{
     console.log(data);
     this.user_id = data.user_id;
     this.username = data.firstname;
     this.lastname = data.lastname;
     this.useridbase = data.username;
     this.department = data.department;
     this.position = data.position;
     this.status = data.status;
     this.isactive = data.isActive;
    }
    })
}
}


submit(){
    if(this.func == null || this.useridbase == null){
      alert("Please Check Your Fill");
    }else{
    if(this.func == 'IsActive'){
        this.http.post(this.API + '/Canceluser/add/'+this.userid,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Success !");
                                   window.location.reload(true);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );
    }else{

      this.http.post(this.API + '/Canceluser/'+this.userid,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Success !");
                                   window.location.reload(true);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );

    }
}
}
reset(){
    window.location.reload(true);
}


}
