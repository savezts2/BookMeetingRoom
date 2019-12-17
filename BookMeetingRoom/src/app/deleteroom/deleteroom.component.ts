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
roomnames : string;
}


@Component({
  selector: 'app-deleteroom',
  templateUrl: './deleteroom.component.html',
  styleUrls: ['./deleteroom.component.css']
})
export class DeleteroomComponent implements OnInit {

roomnames : string ;
firstname : string;
public API = '//localhost:8080';   //for test
//public API = 'http://192.168.1.56:8080/BookMeetingRoom';  //for build
constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router,private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<DeleteroomComponent>) { }

  ngOnInit() {
   this.roomnames = this.data.roomnames;
    this.firstname = localStorage.getItem('nameid');

  }


cancel(){
  this.dialogRef.close();
}

Delete(){

    this.http.post(this.API + '/Deleteroom/'+this.firstname +'/' + this.data.roomnames+'/',{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("Delete Success!");
                                   window.location.reload(true);

                               },
                               error => {
                                   console.log('Error', error);
                                    window.location.reload(true);
                               }
                              );

}


}
