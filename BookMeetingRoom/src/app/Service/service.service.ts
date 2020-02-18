import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {



  constructor( private http: HttpClient ) { }


  getEmailmaster(){
    return this.http.get(baseUrl+'/Emailmaster/',{})
  }

  findDate(date : String) : Observable<any>{
      return this.http.get(baseUrl+'/Report/'+date,{})
  }

  getUserPassword(id: String , password : String): Observable<any>{
      return this.http.get(baseUrl+'/Users/'+id+/Password/+password,{})
  }

  getLatetime(): Observable<any>{
      return this.http.get(baseUrl+'/Latetime',{})
  }

  getNotify(): Observable<any>{
      return this.http.get(baseUrl+'/TimeNotyfy',{})
  }

  getAddroomname(roomnames: string): Observable<any>{
      return this.http.get(baseUrl+'/Getroomname/'+roomnames,{})
  }

getDatedesc(){
  return this.http.get(baseUrl+'/datereportdesc/',{})
}


getUsers(): Observable<any>{
      return this.http.get(baseUrl+'/Users',{})
  }

getHourCurrent(){
    return this.http.get(baseUrl+'/getHourCurrent',{})
}

getMinuteCurrent(){
    return this.http.get(baseUrl+'/getMinuteCurrent',{})
}


  getDateDashBoard(startdate : String , enddate: String) : Observable<any>{
      return this.http.get(baseUrl+'/Report/'+startdate+'/'+enddate,{})
  }

getDateDashBoardReport(startdate : String , enddate: String) : Observable<any>{
      return this.http.get(baseUrl+'/ReportDashBoard/'+startdate+'/'+enddate,{})
  }

findUserid(userid : String){
    return this.http.get(baseUrl+'/Userid/'+userid,{})
}

findBook(date , room , time){
    return this.http.get(baseUrl+'/'+date+'/'+room+'/'+time,{})
}

public getUserid(userid : String): Observable<any> {
                 return this.http.get(baseUrl + '/Userid/'+userid,{});
               }


 getBookMeetingRoom(date: String, room: String , time: String): Observable<any>{
      return this.http.get(baseUrl +'/Bookeiei/'+date+'/'+room+'/'+time,{});
  }

getDepartment(): Observable<any> {
            return this.http.get(baseUrl + '/Department');
         }

getPosition(): Observable<any> {
            return this.http.get(baseUrl + '/Position');
         }

getRole(): Observable<any> {
            return this.http.get(baseUrl + '/Role');
         }

getRoomname(): Observable<any> {
            return this.http.get(baseUrl + '/Roomname');
         }

getAllReport(): Observable<any> {
            return this.http.get(baseUrl + '/Report');
         }



}
