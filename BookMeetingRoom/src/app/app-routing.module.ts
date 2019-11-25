import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookMeetingRoom1Component } from './book-meeting-room1/book-meeting-room1.component';

import { DataFormComponent } from './data-form/data-form.component';
import { SelectRoomComponent } from './select-room/select-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardtableComponent } from './dashboardtable/dashboardtable.component';
import { AdduserbyadminComponent } from './adduserbyadmin/adduserbyadmin.component';

import { CanceluserComponent } from './canceluser/canceluser.component';
const routes: Routes = [
    { path: 'selectRoom', component: SelectRoomComponent },
    { path: 'selectDate', component: BookMeetingRoom1Component },
    { path: 'data-form', component: DataFormComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboardTable', component: DashboardtableComponent },
    { path: 'adduserbyadmin', component: AdduserbyadminComponent },
    { path: 'canceluser', component: CanceluserComponent },
    { path: '', redirectTo: '/selectDate', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
