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
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'selectRoom', component: SelectRoomComponent },
    { path: 'selectDate', component: BookMeetingRoom1Component },
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
{ path: 'addroom', component: AddroombyadminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


