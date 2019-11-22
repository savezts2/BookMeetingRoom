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

/**
*
* @returns {Observable<T>}
*/

isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }



  /**
   *  Login the user then tell all the subscribers about the new status
   */



  login(id: String, password: String) : void {

    this.service.getUserPassword(id,password).subscribe(data=>{
          console.log('Login Success!');
              if(data!=null){

                  alert("Login Success !");
                  localStorage.setItem('tokenid', 'JWT');
                  this.isLoginSubject.next(true);
                  localStorage.setItem('userid', data.userid);
                  localStorage.setItem('nameid', data.username);
                  //console.log(localStorage.getItem('userid'));
                  window.location.reload(true);
              }
              else{
                alert("id/password incorrect !");
              }
       })



  }

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
    localStorage.removeItem('tokenid');
    localStorage.removeItem('userid');
    localStorage.removeItem('nameid');
    this.isLoginSubject.next(false);
    this.router.navigate(['']);
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */

  private hasTokenId() : boolean {
    return !!localStorage.getItem('tokenid');
  }



  constructor(public dialog: MatDialog , private service : ServiceService, private router: Router) { }
}






//Dialog
@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.html',
  })
  export class DialogOverviewExampleDialog {
    id : String = '';
    password : String = '' ;
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog> , public authService : AuthService){}

    onNoClick(): void {
      this.dialogRef.close();
    }

    login() : void {
        this.authService.login(this.id,this.password);

        this.dialogRef.close();


    }



  }


