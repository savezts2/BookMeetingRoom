import { Component, OnInit ,ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ServiceService } from '../Service/service.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
@ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
isLoggedIn : Observable<boolean>;
isLoggedInAdmin : Observable<boolean>;
isLoggedInHR : Observable<boolean>;


roomnameandtime:any={}
fromtimeSelect: '';

roomname: '' ;
date: '';
userid3: String;
report : Array<any>;
counting: number ;
lengthtime : number ;
fromtimesplited : Array<any>;
totimesplited : Array<any>;
countTime : number;
spiner : boolean = false;
public API = '//localhost:8080';  //for test
//public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;







  ngOnInit() {

      this.route.params.subscribe(prams=>{

                this.roomnameandtime = prams;
                this.roomname =this.roomnameandtime.roomname;
                this.date = this.roomnameandtime.date;
                console.log(this.roomnameandtime);
              })
    this.fromtimeSelect = this.roomnameandtime.roomtime;
    this.userid3 = localStorage.getItem('userid');
    this.service.findDate(this.date).subscribe(data=>{
    this.report = data;
    console.log(data);
    this.appendTime();
    })

    this.firstFormGroup = this._formBuilder.group({
      totime: [null, Validators.required]
    });

     this.secondFormGroup = this._formBuilder.group({
      tel: [null, Validators.required],
      topic: [null, Validators.required],
      atten: [null, Validators.required],
      remark: null
    });
  }

constructor(public authService : AuthService, private route:ActivatedRoute, private service : ServiceService,private http: HttpClient,
private router: Router,private _formBuilder: FormBuilder) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isLoggedInAdmin = authService.isLoggedInAdmin();
    this.isLoggedInHR = authService.isLoggedInHR();

  }

close() {
    this.sidenav.close();
  }


SubmitData(){

      this.spiner = true;

      if(this.checkReserved (this.fromtimeSelect , this.firstFormGroup.get('totime').value , this.roomname)){
          alert("Cannot book this time period");
          //window.location.reload(true);
      }else{

     this.http.post(this.API + '/'+this.userid3 +'/' + this.fromtimeSelect +'/' + this.firstFormGroup.get('totime').value +'/'+ this.secondFormGroup.get('tel').value
     + '/' + this.secondFormGroup.get('topic').value+ '/' + this.secondFormGroup.get('atten').value+ '/' + this.secondFormGroup.get('remark').value+ '/' + this.roomname+ '/' + this.date,{})
                             .subscribe(
                               data => {
                                   console.log('PUT Request is successful');
                                   alert("จองสำเร็จ");
                                   this.router.navigate(['selectRoom',{datefull: this.date}]);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );


      }

   }


checkReserved (fromtime: String , totime: String , roomname:String){
    this.fromtimesplited = fromtime.split(".");
    this.totimesplited = totime.split(".");

    this.countTime = this.convertlengthTime(this.fromtimesplited[0],this.fromtimesplited[1],this.totimesplited[0],this.totimesplited[1]);
    if(roomname == "Meeting Room1(TSP)"){
      for(let i = 0 ; i < this.timeofweekOTSF2.length ; i++){
        if(this.timeofweekOTSF2[i].time == fromtime){
          if(this.countTime > 1)
             for(let j = i+1 ; j < this.countTime + i ; j++){
                 if(this.timeofweekOTSF2[j].checkReservations == true){

                     return true;

                     break;
                  }
             }

          }
       }
          return false;
    }

    else if(roomname == "Meeting Room2(WH7)"){
      for(let i = 0 ; i < this.timeofweekR1WH7F2.length ; i++){
        if(this.timeofweekR1WH7F2[i].time == fromtime){
          if(this.countTime > 1)
             for(let j = i+1 ; j < this.countTime + i ; j++){
                 if(this.timeofweekR1WH7F2[j].checkReservations == true){
                     return true;
                     break;
                  }

             }

        }
      }
    return false;
    }

     else if(roomname == "Meeting Room3(WH7)"){
      for(let i = 0 ; i < this.timeofweekR2WH7F2.length ; i++){
        if(this.timeofweekR2WH7F2[i].time == fromtime){
          if(this.countTime > 1)
             for(let j = i+1 ; j < this.countTime + i ; j++){
                 if(this.timeofweekR2WH7F2[j].checkReservations == true){
                     return true;
                     break;
                  }

             }

        }
      }
    return false;
    }


    else if(roomname == "Meeting Room4(WH2)"){
      for(let i = 0 ; i < this.timeofweekWH2F2.length ; i++){
        if(this.timeofweekWH2F2[i].time == fromtime){
          if(this.countTime > 1)
             for(let j = i+1 ; j < this.countTime + i ; j++){
                 if(this.timeofweekWH2F2[j].checkReservations == true){
                   return true;
                     break;
                  }
             }

        }
      }
      return false;
    }

}


convertlengthTime(from , fromback , to , toback){

     if(from == "08"  && to == "08"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "08"  && to == "09"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "08"  && to == "10"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "08"  && to == "11"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "08"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "08"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "08"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 14 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12;
            }else{
                this.lengthtime = 13;
            }
        }else if(from == "08"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 15 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 16 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 14;
            }else{
                this.lengthtime = 15;
            }
        }else if(from == "08"  && to == "16"){
             if(fromback == "00" && toback == "00"){
                this.lengthtime = 17 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 18 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 16;
            }else{
                this.lengthtime = 17;
            }
        }else if(from == "08"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 19 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 18 ;
            }
        }else if(from == "09"  && to == "09"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "09"  && to == "10"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "09"  && to == "11"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "09"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "09"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "09"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "09"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 14 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12;
            }else{
                this.lengthtime = 13;
            }
        }else if(from == "09"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 15 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 16 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 14;
            }else{
                this.lengthtime = 15;
            }
        }else if(from == "09"  && to == "17"){
             if(fromback == "00" && toback == "00"){
                this.lengthtime = 17 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 16 ;
            }
        }else if(from == "10"  && to == "10"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "10"  && to == "11"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "10"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "10"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "10"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "10"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "10"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 14 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12;
            }else{
                this.lengthtime = 13;
            }
        }else if(from == "10"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 15 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 14 ;
            }
        }else if(from == "11"  && to == "11"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "11"  && to == "12"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "11"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "11"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "11"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "11"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 12 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10;
            }else{
                this.lengthtime = 11;
            }
        }else if(from == "11"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 13 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 12 ;
            }
        }else if(from == "12"  && to == "12"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "12"  && to == "13"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "12"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "12"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "12"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 10 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8;
            }else{
                this.lengthtime = 9;
            }
        }else if(from == "12"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 11 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 10 ;
            }
        }else if(from == "13"  && to == "13"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "13"  && to == "14"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "13"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "13"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 8 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6;
            }else{
                this.lengthtime = 7;
            }
        }else if(from == "13"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 9 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 8 ;
            }
        }else if(from == "14"  && to == "14"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "14"  && to == "15"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "14"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 6 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4;
            }else{
                this.lengthtime = 5;
            }
        }else if(from == "14"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 7 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 6 ;
            }
        }else if(from == "15"  && to == "15"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "15"  && to == "16"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "00" && toback == "30"){
                this.lengthtime = 4 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2;
            }else{
                this.lengthtime = 3;
            }
        }else if(from == "15"  && to == "17"){
             if(fromback == "00" && toback == "00"){
                this.lengthtime = 5 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 4 ;
            }
        }else if(from == "16"  && to == "16"){
            if(fromback == "30" && toback == "30"){
                this.lengthtime = 1 ;
            }else if(fromback == "00" && toback == "00"){
                this.lengthtime = 1 ;
            }else{
                this.lengthtime = 2 ;
            }
        }else if(from == "16"  && to == "17"){
            if(fromback == "00" && toback == "00"){
                this.lengthtime = 3 ;
            }else if(fromback == "30" && toback == "00"){
                this.lengthtime = 2 ;
            }
        }else if(from == "17"  && to == "17"){
            this.lengthtime = 1 ;
        }
        return this.lengthtime ;

      }


timeofweekOTSF2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room1(TSP)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];



  timeofweekR1WH7F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room2(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];


timeofweekR2WH7F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room3(WH7)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];





timeofweekWH2F2 = [
    {roomid : 0,time:'08.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 1,time:'08.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 2,time:'09.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 3,time:'09.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 4,time:'10.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 5,time:'10.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 6,time:'11.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 7,time:'11.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 8,time:'12.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 9,time:'12.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 10,time:'13.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 11,time:'13.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 12,time:'14.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 13,time:'14.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 14,time:'15.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 15,time:'15.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 16,time:'16.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 17,time:'16.30',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false},

    {roomid : 18,time:'17.00',id: 1,color:'white',roomname: 'Meeting Room4(WH2)',showlabel:false,
    byname: '',atten:'0',topic: '',remark:'',showremark:false,checkReservations: false}
  ];




 public appendTime(){
    for(let i = 0 ; i < this.report.length ; i++){
      if(this.report[i].isActive == "1"){
        // Meeting Room1(TSP)
        if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 0){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 1){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 2){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 3){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 4){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 5){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 6){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 7){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 8){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 9){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 10){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 11){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 12){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 13){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 14){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 15){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 16){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 17){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room1(TSP)'){
          for(let j =0 ; j < this.timeofweekOTSF2.length; j++){
            if(this.timeofweekOTSF2[j].roomid == 18){
              this.timeofweekOTSF2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekOTSF2[j].color = 'red' ;
              this.timeofweekOTSF2[j].showlabel = true;
              this.timeofweekOTSF2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekOTSF2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekOTSF2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekOTSF2[j].checkReservations = true ;
              if(this.timeofweekOTSF2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekOTSF2[j].id   ; k++){
                      this.timeofweekOTSF2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekOTSF2[j].showremark = true;
                this.timeofweekOTSF2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }






        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 0){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 1){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 2){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 3){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 4){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 5){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 6){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 7){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 8){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 9){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 10){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 11){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 12){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 13){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 14){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 15){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 16){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 17){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room2(WH7)'){
          for(let j =0 ; j < this.timeofweekR1WH7F2.length; j++){
            if(this.timeofweekR1WH7F2[j].roomid == 18){
              this.timeofweekR1WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR1WH7F2[j].color = 'red' ;
              this.timeofweekR1WH7F2[j].showlabel = true;
              this.timeofweekR1WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR1WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR1WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR1WH7F2[j].checkReservations = true ;
              if(this.timeofweekR1WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR1WH7F2[j].id   ; k++){
                      this.timeofweekR1WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR1WH7F2[j].showremark = true;
                this.timeofweekR1WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }





        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 0){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 1){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 2){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 3){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 4){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 5){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 6){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 7){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 8){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 9){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 10){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 11){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 12){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 13){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 14){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 15){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 16){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 17){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room3(WH7)'){
          for(let j =0 ; j < this.timeofweekR2WH7F2.length; j++){
            if(this.timeofweekR2WH7F2[j].roomid == 18){
              this.timeofweekR2WH7F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekR2WH7F2[j].color = 'red' ;
              this.timeofweekR2WH7F2[j].showlabel = true;
              this.timeofweekR2WH7F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekR2WH7F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekR2WH7F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekR2WH7F2[j].checkReservations = true ;
              if(this.timeofweekR2WH7F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekR2WH7F2[j].id   ; k++){
                      this.timeofweekR2WH7F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekR2WH7F2[j].showremark = true;
                this.timeofweekR2WH7F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }

      //WH2F2

        else if(this.report[i].bookMeetingRoom.starttime == '08.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 0){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
              if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }

        }
        else if(this.report[i].bookMeetingRoom.starttime == '08.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 1){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 2){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '09.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 3){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 4){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '10.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 5){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 6){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '11.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 7){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 8){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '12.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 9){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 10){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '13.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 11){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 12){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '14.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 13){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 14){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '15.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 15){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 16){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '16.30' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 17){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }
        else if(this.report[i].bookMeetingRoom.starttime == '17.00' && this.report[i].bookMeetingRoom.roomname == 'Meeting Room4(WH2)'){
          for(let j =0 ; j < this.timeofweekWH2F2.length; j++){
            if(this.timeofweekWH2F2[j].roomid == 18){
              this.timeofweekWH2F2[j].id = this.report[i].bookMeetingRoom.lengthtime ;
              this.timeofweekWH2F2[j].color = 'red' ;
              this.timeofweekWH2F2[j].showlabel = true;
              this.timeofweekWH2F2[j].byname = this.report[i].users.username +' '+ this.report[i].users.lastname;
              this.timeofweekWH2F2[j].atten = this.report[i].bookMeetingRoom.attendees ;
              this.timeofweekWH2F2[j].topic = this.report[i].bookMeetingRoom.topic ;
              this.timeofweekWH2F2[j].checkReservations = true ;
              if(this.timeofweekWH2F2[j].id > 1){
                   this.counting = j+1 ;
                   for(let k = 1 ; k < this.timeofweekWH2F2[j].id   ; k++){
                      this.timeofweekWH2F2.splice(this.counting,1);
                   }
              }
               if(this.report[i].bookMeetingRoom.remark != 'undefined'){
                this.timeofweekWH2F2[j].showremark = true;
                this.timeofweekWH2F2[j].remark = this.report[i].bookMeetingRoom.remark;
               }
            }
          }
        }

 }

}

}

}
