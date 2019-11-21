import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookMeetingRoom1Component } from './book-meeting-room1/book-meeting-room1.component';

import { DataFormComponent } from './data-form/data-form.component';
import { SelectRoomComponent } from './select-room/select-room.component';

const routes: Routes = [
    { path: 'selectRoom', component: SelectRoomComponent },
    { path: 'selectDate', component: BookMeetingRoom1Component },
    { path: 'data-form', component: DataFormComponent },
    { path: '', redirectTo: '/selectDate', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
