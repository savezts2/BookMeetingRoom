import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
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

username : String = null;
lastname : String = null;
department : String = null;
position : String = null;
userid : String = null;
password : String = null;
status : String = null;
hide : boolean;
//public API = '//localhost:8080/BookMeetingRoom';   //for test
public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build

constructor( public authService : AuthService,private router: Router , private service : ServiceService, private http: HttpClient) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
 }

  ngOnInit() {
  }

submit(){
     this.service.findUserid(this.userid).subscribe(data=>{
        if(data != null){
          alert("This userid already exists in the system.");
          this.userid = null ;
        }else{
            if(this.username == null || this.lastname == null || this.department == null || this.position == null ||
                this.userid == null || this.password == null || this. status == null){
                alert("Please fill out all information.");
            }else{

                this.http.post(this.API + '/Adduser/'+this.username +'/' + this.lastname +'/' + this.department + '/' + this.position
                  + '/' + this.userid+ '/' + this.password+ '/' + this.status,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Add User Success!");
                                   window.location.reload(true);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );
            }
        }
    })


}

reset(){
this.username=null;
this.lastname=null;
this.department=null;
this.position=null;
this.userid=null;
this.password=null;
this.status=null;
}

}
