import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookMeetingRoom1Component } from './book-meeting-room1/book-meeting-room1.component';

import { DataFormComponent } from './data-form/data-form.component';
import { SelectRoomComponent } from './select-room/select-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardtableComponent } from './dashboardtable/dashboardtable.component';
import { AdduserbyadminComponent } from './adduserbyadmin/adduserbyadmin.component';
import { ModuleWithProviders } from '@angular/core';
import {CheckoutComponent} from './checkout/checkout.component'
import { SystemadminComponent } from './systemadmin/systemadmin.component';
import { EdituserbyadminComponent } from './edituserbyadmin/edituserbyadmin.component';
import { DeleteuserbyadminComponent } from './deleteuserbyadmin/deleteuserbyadmin.component';
import { EditordeletebookComponent } from './editordeletebook/editordeletebook.component';
import { EditbookComponent } from './editbook/editbook.component';
import { AddroombyadminComponent } from './addroombyadmin/addroombyadmin.component';
import { EditroomnameComponent } from './editroomname/editroomname.component';
import { DeleteroomComponent } from './deleteroom/deleteroom.component';
import { CancelbookbyhrComponent } from './cancelbookbyhr/cancelbookbyhr.component';
import { SetlatetimeComponent } from './setlatetime/setlatetime.component';
const routes: Routes = [

    { path: 'selectRoom', component: SelectRoomComponent },
    { path: '', component: BookMeetingRoom1Component },
    { path: 'data-form', component: DataFormComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboardTable', component: DashboardtableComponent },
    { path: 'adduserbyadmin', component: AdduserbyadminComponent },
    { path: 'systemadmin', component: SystemadminComponent },
    { path: 'edituserbyadmin', component: EdituserbyadminComponent },
    { path: 'deleteuserbyadmin', component: DeleteuserbyadminComponent },
    { path: 'editordeletebook', component: EditordeletebookComponent },
{ path: 'editbook', component: EditbookComponent },
{ path: 'checkout', component: CheckoutComponent },
{ path: 'editroomname', component: EditroomnameComponent },
{ path: 'deleteroom', component: DeleteroomComponent },
{ path: 'addroom', component: AddroombyadminComponent },
{ path: 'cancelbookbyhr', component: CancelbookbyhrComponent },
{ path: 'setlatetime', component: SetlatetimeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


