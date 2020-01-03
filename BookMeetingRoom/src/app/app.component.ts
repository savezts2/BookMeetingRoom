import { Component ,HostListener,OnDestroy} from '@angular/core';
import { ServiceService } from './Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'BookMeetingRoom';
report : Array<any>;

public API = '//localhost:8080';  //for test
//public API = 'http://172.27.209.27:8080/BookMeetingRoom';  //for build
timehour : string;
timeminute : string;
fulltime : string;
isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;
latetime : number;




constructor(private service : ServiceService,private http: HttpClient , public authService : AuthService) {
  this.isLoggedIn = authService.isLoggedIn();
      this.isLoggedInAdmin = authService.isLoggedInAdmin();
      this.isLoggedInHR = authService.isLoggedInHR();

}





ngOnInit() {


this.service.getAllReport().subscribe(data=>{
    this.report = data;
   // console.log(data);

    })

  setInterval(() => {
this.service.getHourCurrent().subscribe(data=>{
    this.timehour = data.toString();

    })

this.service.getMinuteCurrent().subscribe(data=>{
    this.timeminute = data.toString();

    })

  if(parseInt(this.timehour) < 10){
    this.timehour = '0'+ this.timehour;
  }if( parseInt(this.timeminute) < 10){
    this.timeminute = '0'+ this.timeminute;
  }

  this.fulltime =  this.timehour+'.'+ this.timeminute;
  //console.log(this.fulltime);


  }, 100); //interval


  this.service.getLatetime().subscribe(data=>{
              console.log(data);
              this.latetime = data.latetimecheckout ;

       })

setTimeout(() => {
  setInterval(() => {

  let CurrentDate = new Date();


  //////////////////////////////////////////////
  ////////       late 15              /////////
 /////////////////////////////////////////////


    console.log( this.latetime);
  /*for(let i = 0 ; i < this.report.length ; i++){

      let GivenDate  = new Date(this.convertDate(this.report[i].bookMeetingRoom.dateBookMeetingRoom));

      if(CurrentDate >= GivenDate){
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '08.14'   ){
              if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '09.14'){
              if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '10.14'){
              if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '11.14'){
              if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '12.14'){
              if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '13.14'){
              if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '14.14'){
              if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }

          if( this.fulltime != 'undefined.undefined' && this.fulltime > '15.14'){
              //  console.log(1);
              if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '16.14'){
              if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '17.14'){
              if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '18.14'){
              if(this.report[i].bookMeetingRoom.starttime == '18.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }

          if( this.fulltime != 'undefined.undefined' && this.fulltime > '19.14'){
              if(this.report[i].bookMeetingRoom.starttime == '19.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '20.14'){
              if(this.report[i].bookMeetingRoom.starttime == '20.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '21.14'){
              if(this.report[i].bookMeetingRoom.starttime == '21.00' && this.report[i].bookMeetingRoom.statusbooking == 'Booking'){

                   this.http.post(this.API + '/Notcheckin15min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }


          /////////////////////////////////////////////////////////
          ////////          late 30                         ///////
          //////////////////////////////////////////////////////////


          if( this.fulltime != 'undefined.undefined' && this.fulltime > '08.29'){
              if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){
                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '08.59'){
              if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '09.29'){
              if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '09.59'){
              if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '10.29'){
              if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '10.59'){
              if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '11.29'){
              if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '11.59'){
              if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '12.29'){
              if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '12.59'){
              if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '13.29'){
              if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '13.59'){
              if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '14.29'){
              if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '14.59'){
              if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '15.29'){
              if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '15.59'){
              if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '16.29'){
              if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '16.59'){
              if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.statusbooking == 'Not Checkin' && this.report[i].bookMeetingRoom.latetime == 15){

                   this.http.post(this.API + '/Notcheckin30min/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          //////////////////////////////////////////////
          ////////       checkoutby sys             /////////
           /////////////////////////////////////////////


          if( this.fulltime != 'undefined.undefined' && this.fulltime > '08.29'){
              if(this.report[i].bookMeetingRoom.endtime == '08.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '08.59'){
              if(this.report[i].bookMeetingRoom.endtime == '09.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '09.29'){
              if(this.report[i].bookMeetingRoom.endtime == '09.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '09.59'){
              if(this.report[i].bookMeetingRoom.endtime == '10.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '10.29'){
              if(this.report[i].bookMeetingRoom.endtime == '10.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '10.59'){
              if(this.report[i].bookMeetingRoom.endtime == '11.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }

          if( this.fulltime != 'undefined.undefined' && this.fulltime > '11.29'){
              if(this.report[i].bookMeetingRoom.endtime == '11.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '11.59'){
              if(this.report[i].bookMeetingRoom.endtime == '12.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '12.29'){
              if(this.report[i].bookMeetingRoom.endtime == '12.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '12.59'){
              if(this.report[i].bookMeetingRoom.endtime == '13.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '13.29'){
              if(this.report[i].bookMeetingRoom.endtime == '13.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '13.59'){
              if(this.report[i].bookMeetingRoom.endtime == '14.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);

                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '14.29'){
              if(this.report[i].bookMeetingRoom.endtime == '14.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);

                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '14.59'){
              if(this.report[i].bookMeetingRoom.endtime == '15.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '15.29'){
              if(this.report[i].bookMeetingRoom.endtime == '15.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '15.59'){
              if(this.report[i].bookMeetingRoom.endtime == '16.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }

          if( this.fulltime != 'undefined.undefined' && this.fulltime > '16.29'){
              if(this.report[i].bookMeetingRoom.endtime == '16.30' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
          if( this.fulltime != 'undefined.undefined' && this.fulltime > '16.59'){
              if(this.report[i].bookMeetingRoom.endtime == '17.00' && this.report[i].bookMeetingRoom.statusbooking == 'Checkin'){

                   this.http.post(this.API + '/checkoutauto/'+this.report[i].bookMeetingRoom.dateBookMeetingRoom +'/' + this.report[i].bookMeetingRoom.roomname.roomname_id
                   +'/' + this.report[i].bookMeetingRoom.starttime,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                    window.location.reload();


                               },
                               error => {
                                   console.log('Error', error);
                                  window.location.reload();
                               }
                              );

              }
          }
      }

  }//for report*/

    }, 1500); //interval
  }, 1500); //interval




}//oninit


convertDate(date){
  return date.substring(6,10)+'-'+date.substring(3,5)+'-'+date.substring(0,2);
}


}


