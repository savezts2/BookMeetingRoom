import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

public API = '//localhost:8080/';   //for test
  //public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build

  constructor( private http: HttpClient ) { }

  findDate(date : String) : Observable<any>{
      return this.http.get(this.API+'/Report/'+date,{})
  }

  getUserPassword(id: String , password : String): Observable<any>{
      return this.http.get(this.API+'/Users/'+id+/Password/+password,{})
  }


  getDateDashBoard(startdate : String , enddate: String) : Observable<any>{
      return this.http.get(this.API+'/Report/'+startdate+'/'+enddate,{})
  }

findUserid(userid : String){
    return this.http.get(this.API+'/Userid/'+userid,{})
}

public getUserid(userid : String): Observable<any> {
                 return this.http.get(this.API + '/Userid/'+userid,{});
               }



}
