import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { ServiceService } from './Service/service.service';

import { Router } from '@angular/router';
export interface DialogData {
animal: string;
name: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

isLoginSubject = new BehaviorSubject<boolean>(this.hasTokenId());
isLoginHR = new BehaviorSubject<boolean>(this.hasTokenIdHR());
isLoginAdmin = new BehaviorSubject<boolean>(this.hasTokenIdAdmin());

/**
*
* @returns {Observable<T>}
*/

isLoggedInAdmin() : Observable<boolean> {
    return this.isLoginAdmin.asObservable();
  }

isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }


isLoggedInHR() : Observable<boolean> {
    return this.isLoginHR.asObservable();
  }



  /**
   *  Login the user then tell all the subscribers about the new status
   */


  login(id: String, password: String) : any {

    this.service.getUserPassword(id,password).subscribe(data=>{
              //console.log(data);
              if(data!=null){

                  if(data.isActive == "0"){
                      alert("this id hasn't active please contact IT Support");
                  }
                  else{
                  if(data.role == "ADMIN"){

                      sessionStorage.setItem('tokenidadmin', 'JWT');
                      this.isLoginAdmin.next(true);
                      localStorage.setItem('userid', data.username);
                      localStorage.setItem('nameid', data.firstname);
                      localStorage.setItem('lastname', data.lastname);
                      localStorage.setItem('roleid', data.role);
                      sessionStorage.removeItem('tokenid');
                      sessionStorage.removeItem('tokenidhr');
                      this.isLoginSubject.next(false);
                      this.isLoginHR.next(false);
                      console.log("admin");
                      window.location.href='#/';
                      window.location.reload()
                  }else if(data.role == "HR"){

                      sessionStorage.setItem('tokenidhr', 'JWT');
                      this.isLoginHR.next(true);
                      localStorage.setItem('userid', data.username);
                      localStorage.setItem('nameid', data.firstname);
                      localStorage.setItem('lastname', data.lastname);
                      localStorage.setItem('roleid', data.role);
                      sessionStorage.removeItem('tokenid');
                      sessionStorage.removeItem('tokenidadmin');
                      this.isLoginSubject.next(false);
                      this.isLoginAdmin.next(false);
                      console.log("HR");
                      window.location.href='#/';
                      window.location.reload()
                  }
                  else{

                     sessionStorage.setItem('tokenid', 'JWT');
                     this.isLoginSubject.next(true);
                     localStorage.setItem('userid', data.username);
                     localStorage.setItem('nameid', data.firstname);
                      localStorage.setItem('lastname', data.lastname);
                      localStorage.setItem('roleid', data.role);
                      sessionStorage.removeItem('tokenidadmin');
                      sessionStorage.removeItem('tokenidhr');
                      this.isLoginHR.next(false);
                      this.isLoginAdmin.next(false);
                     console.log("user");
                    window.location.href='#/';
                      window.location.reload()
                  }
                  }
              }
              else{

               // alert("id/password incorrect !");
               // window.location.reload()
                  sessionStorage.setItem('checkLogin', 'false');
              }
       })



  } // login

  callDialog() : void{
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      height: '350px'
    });
  }


  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout() : void {

    this.isLoginSubject.next(false);
    this.isLoginHR.next(false);
    this.isLoginAdmin.next(false);

    sessionStorage.clear();
    window.location.href='#/';
    window.location.reload()
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */

  private hasTokenId() : boolean {
    return !!localStorage.getItem('tokenid');
  }

private hasTokenIdAdmin() : boolean {
    return !!localStorage.getItem('tokenidadmin');
  }

private hasTokenIdHR() : boolean {
    return !!localStorage.getItem('tokenidhr');
  }


  constructor(public dialog: MatDialog , private service : ServiceService, private router: Router) {

  }
}






//Dialog
@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.html',
  })
  export class DialogOverviewExampleDialog {
    id : String = null;
    password : String = null ;
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog> , public authService : AuthService){
          dialogRef.disableClose = true;

      }

    onNoClick(): void {
      this.dialogRef.close();
    }

    login() : void {
        if(this.id == null || this.password == null){
          alert("Please fill out all information.");
        }else{
          this.authService.login(this.id,this.password);

           this.dialogRef.close();
        }


    }



  }


