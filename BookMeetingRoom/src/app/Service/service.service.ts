import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

public API = '//localhost:8080';   //for test
//public API = 'http://172.27.209.27:8080/BookMeetingRoom';  //for build

  constructor( private http: HttpClient ) { }

  findDate(date : String) : Observable<any>{
      return this.http.get(this.API+'/Report/'+date,{})
  }

  getUserPassword(id: String , password : String): Observable<any>{
      return this.http.get(this.API+'/Users/'+id+/Password/+password,{})
  }

  getLatetime(): Observable<any>{
      return this.http.get(this.API+'/Latetime',{})
  }

  getAddroomname(roomnames: string): Observable<any>{
      return this.http.get(this.API+'/Getroomname/'+roomnames,{})
  }


getUsers(): Observable<any>{
      return this.http.get(this.API+'/Users',{})
  }

getHourCurrent(){
    return this.http.get(this.API+'/getHourCurrent',{})
}

getMinuteCurrent(){
    return this.http.get(this.API+'/getMinuteCurrent',{})
}


  getDateDashBoard(startdate : String , enddate: String) : Observable<any>{
      return this.http.get(this.API+'/Report/'+startdate+'/'+enddate,{})
  }

getDateDashBoardReport(startdate : String , enddate: String) : Observable<any>{
      return this.http.get(this.API+'/ReportDashBoard/'+startdate+'/'+enddate,{})
  }

findUserid(userid : String){
    return this.http.get(this.API+'/Userid/'+userid,{})
}

findBook(date , room , time){
    return this.http.get(this.API+'/'+date+'/'+room+'/'+time,{})
}

public getUserid(userid : String): Observable<any> {
                 return this.http.get(this.API + '/Userid/'+userid,{});
               }


 getBookMeetingRoom(date: String, room: String , time: String): Observable<any>{
      return this.http.get(this.API +'/Bookeiei/'+date+'/'+room+'/'+time,{});
  }

getDepartment(): Observable<any> {
            return this.http.get(this.API + '/Department');
         }

getPosition(): Observable<any> {
            return this.http.get(this.API + '/Position');
         }

getRole(): Observable<any> {
            return this.http.get(this.API + '/Role');
         }

getRoomname(): Observable<any> {
            return this.http.get(this.API + '/Roomname');
         }

getAllReport(): Observable<any> {
            return this.http.get(this.API + '/Report');
         }



}
