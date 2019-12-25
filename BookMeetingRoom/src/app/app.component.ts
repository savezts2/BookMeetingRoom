import { Component } from '@angular/core';
import { ServiceService } from './Service/service.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'BookMeetingRoom';
report : Array<any>;

//public API = '//localhost:8080';  //for test
public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build
timehour : string;
timeminute : string;
fulltime : string;
constructor(private service : ServiceService,private http: HttpClient) {}

ngOnInit() {


this.service.getAllReport().subscribe(data=>{
    this.report = data;
    console.log(data);

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

  }, 1000); //interval


setTimeout(() => {
  setInterval(() => {

  let CurrentDate = new Date();


  //////////////////////////////////////////////
  ////////       late 15              /////////
 /////////////////////////////////////////////



  for(let i = 0 ; i < this.report.length ; i++){

      let GivenDate  = new Date(this.convertDate(this.report[i].bookMeetingRoom.dateBookMeetingRoom));

      if(CurrentDate >= GivenDate){
          if( this.fulltime > '08.14'){
              if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '08.44'){
              if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '09.14'){
              if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '09.44'){
              if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '10.14'){
              if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '10.44'){
              if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '11.14'){
              if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '11.44'){
              if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '12.14'){
              if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '12.44'){
              if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '13.14'){
              if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '13.44'){
              if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '14.14'){
              if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '14.44'){
              if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '15.14'){
              if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '15.44'){
              if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '16.14'){
              if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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
          if( this.fulltime > '16.44'){
              if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.statusbooking == 'booking'){

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


          if( this.fulltime > '08.29'){
              if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){
                    console.log(1);
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
          if( this.fulltime > '08.59'){
              if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '09.29'){
              if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '09.59'){
              if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '10.29'){
              if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '10.59'){
              if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '11.29'){
              if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '11.59'){
              if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '12.29'){
              if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '12.59'){
              if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '13.29'){
              if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '13.59'){
              if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '14.29'){
              if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '14.59'){
              if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '15.29'){
              if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '15.59'){
              if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '16.29'){
              if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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
          if( this.fulltime > '16.59'){
              if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.statusbooking == 'notcheckin'){

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


          if( this.fulltime > '08.29'){
              if(this.report[i].bookMeetingRoom.endtime == '08.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '08.59'){
              if(this.report[i].bookMeetingRoom.endtime == '09.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '09.29'){
              if(this.report[i].bookMeetingRoom.endtime == '09.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '09.59'){
              if(this.report[i].bookMeetingRoom.endtime == '10.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '10.29'){
              if(this.report[i].bookMeetingRoom.endtime == '10.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '10.59'){
              if(this.report[i].bookMeetingRoom.endtime == '11.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '11.29'){
              if(this.report[i].bookMeetingRoom.endtime == '11.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '11.59'){
              if(this.report[i].bookMeetingRoom.endtime == '12.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '12.29'){
              if(this.report[i].bookMeetingRoom.endtime == '12.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '12.59'){
              if(this.report[i].bookMeetingRoom.endtime == '13.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '13.29'){
              if(this.report[i].bookMeetingRoom.endtime == '13.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '13.59'){
              if(this.report[i].bookMeetingRoom.endtime == '14.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '14.29'){
              if(this.report[i].bookMeetingRoom.endtime == '14.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '14.59'){
              if(this.report[i].bookMeetingRoom.endtime == '15.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '15.29'){
              if(this.report[i].bookMeetingRoom.endtime == '15.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '15.59'){
              if(this.report[i].bookMeetingRoom.endtime == '16.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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

          if( this.fulltime > '16.29'){
              if(this.report[i].bookMeetingRoom.endtime == '16.30' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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
          if( this.fulltime > '16.59'){
              if(this.report[i].bookMeetingRoom.endtime == '17.00' && this.report[i].bookMeetingRoom.statusbooking == 'checkin'){

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

  }//for report

    }, 1000); //interval
  }, 1000); //interval




}//oninit


convertDate(date){
  return date.substring(6,10)+'-'+date.substring(3,5)+'-'+date.substring(0,2);
}


}


