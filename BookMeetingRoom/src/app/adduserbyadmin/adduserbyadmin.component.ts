  import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../Service/service.service';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';

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
active: String = null;

departments : Array<any>;
positions : Array<any>;
roles : Array<any>;
public API = '//localhost:8080';   //for test
 // public API = 'http://172.27.209.27:8080/BookMeetingRoom';  //for build
firstFormGroup: FormGroup;

  emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
  ]);

constructor( public authService : AuthService,private router: Router , private service : ServiceService, private http: HttpClient,private  _formBuilder: FormBuilder) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
 }

  ngOnInit() {

this.service.getDepartment().subscribe(data => {
                                 this.departments = data;
                               //  console.log(this.departments);
                               });
        this.service.getPosition().subscribe(data => {
                                 this.positions = data;
                              //   console.log(this.positions);
                               });
         this.service.getRole().subscribe(data => {
                                 this.roles = data;
                              //   console.log(this.roles);
                               });

     this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      userid: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required]

    });

  }

reset(){
    this.firstFormGroup.setValue({
       username: '',
      lastname: '',
      department: '',
      position: '',
      userid: '',
      password: '',
      status: '',
      email: ''
    });
}

submit(){

      if(this.firstFormGroup.get('username').value == '' || this.firstFormGroup.get('lastname').value == '' || this.firstFormGroup.get('department').value == '' ||
          this.firstFormGroup.get('position').value == '' ||  this.firstFormGroup.get('userid').value == '' || this.firstFormGroup.get('password').value == ''
           || this.firstFormGroup.get('status').value == '' || this.firstFormGroup.get('email').value == ''){

          alert("Please Check your filled");

      }else{

          this.service.findUserid(this.firstFormGroup.get('userid').value).subscribe(data=>{
              if(data!=null){
                alert("This username already exists in the system.");

                 this.firstFormGroup.setValue({

                    username: this.firstFormGroup.get('username').value,
                    lastname: this.firstFormGroup.get('lastname').value,
                    department: this.firstFormGroup.get('department').value,
                    position: this.firstFormGroup.get('position').value,
                    userid: '',
                    password: this.firstFormGroup.get('password').value,
                    status: this.firstFormGroup.get('status').value,
                    email: this.firstFormGroup.get('email').value
                 });

              }else{

                  this.http.post(this.API + '/Adduser/'+localStorage.getItem('nameid')+'/'+this.firstFormGroup.get('username').value +'/' + this.firstFormGroup.get('lastname').value +'/' +
                 this.firstFormGroup.get('department').value + '/' + this.firstFormGroup.get('position').value + '/' + this.firstFormGroup.get('userid').value+ '/' + this.firstFormGroup.get('password').value+ '/' + this.firstFormGroup.get('status').value+'/'+
                 this.firstFormGroup.get('email').value,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Add Success!");
                                   window.location.reload(true);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );

              }

       })
      }
}



}
