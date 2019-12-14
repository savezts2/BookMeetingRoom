import { Component, OnInit ,Inject} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ServiceService } from '../Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
firstname: string;
lastname : string;
department : string;
position : string;
username: string;
status: string;
isActive: string;
password: string;
}


@Component({
  selector: 'app-deleteuserbyadmin',
  templateUrl: './deleteuserbyadmin.component.html',
  styleUrls: ['./deleteuserbyadmin.component.css']
})
export class DeleteuserbyadminComponent implements OnInit {


isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;

public API = '//localhost:8080';   //for test
//public API = 'http://192.168.1.56:8080/BookMeetingRoom';  //for build

  constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router,private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<DeleteuserbyadminComponent>) {

    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();

}

closed(){
    this.dialogRef.close();
}

deleteUser(){


     this.http.post(this.API + '/Deleteuser/'+this.data.username,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Delete Success!");
                                   window.location.reload(true);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );

}

  ngOnInit() {
  }

}
