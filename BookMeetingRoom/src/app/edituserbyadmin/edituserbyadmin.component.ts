import { Component, OnInit ,Inject} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ServiceService } from '../Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { baseUrl } from '../app.component';

export interface DialogData {
firstname: string;
lastname : string;
department : string;
position : string;
username: string;
role: string;
isActive: string;
password: string;
email: string;
}


@Component({
  selector: 'app-edituserbyadmin',
  templateUrl: './edituserbyadmin.component.html',
  styleUrls: ['./edituserbyadmin.component.css']
})



export class EdituserbyadminComponent implements OnInit {

isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
firstFormGroup: FormGroup;
hide : boolean;
departments : Array<any>;
positions : Array<any>;
roles : Array<any>;
email = new FormControl('', [Validators.required, Validators.email]);

username: String;
  constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router,private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<EdituserbyadminComponent>) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();
    this.username = this.data.username;
    this.email.setValue( this.data.email);

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
       firstname: [this.data.firstname, Validators.required],
      lastname: [this.data.lastname, Validators.required],
      department: [this.data.department, Validators.required],
      position: [this.data.position, Validators.required],
      password: [this.data.password, Validators.required],
      status: [this.data.role, Validators.required],
      isActive: [this.data.isActive, Validators.required]
    });

  }
   getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

editUser(){
    if(this.firstFormGroup.get('firstname').value == '' || this.firstFormGroup.get('lastname').value == '' ||
    this.firstFormGroup.get('department').value == '' || this.firstFormGroup.get('position').value == '' ||
    this.firstFormGroup.get('password').value == '' || this.firstFormGroup.get('status').value == '' || this.email.status == 'INVALID'){
      alert("Please check your filled");
    }else{
       this.http.post(baseUrl + '/Edituser/'+localStorage.getItem('nameid')+'/'+this.firstFormGroup.get('firstname').value +'/' + this.firstFormGroup.get('lastname').value +'/' +
                 this.firstFormGroup.get('department').value + '/' + this.firstFormGroup.get('position').value + '/' + this.username+ '/' + this.firstFormGroup.get('password').value+ '/' + this.firstFormGroup.get('status').value+
                 '/' + this.email.value,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Edit Success!");
                                   window.location.reload(true);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );
    }
}

closed(){

    this.dialogRef.close();
}

}
