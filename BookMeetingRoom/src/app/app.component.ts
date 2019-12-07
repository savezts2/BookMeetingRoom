import { Component } from '@angular/core';


export const baseUrl = 'http://192.168.1.47:8080/BookMeetingRoom';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'BookMeetingRoom';
}
