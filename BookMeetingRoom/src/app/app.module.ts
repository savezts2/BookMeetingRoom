import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { BookMeetingRoom1Component } from './book-meeting-room1/book-meeting-room1.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { DataFormComponent } from './data-form/data-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectRoomComponent , DialogCancel} from './select-room/select-room.component';
import {MatDialogModule} from '@angular/material/dialog';

import {DialogOverviewExampleDialog} from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardtableComponent } from './dashboardtable/dashboardtable.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdduserbyadminComponent } from './adduserbyadmin/adduserbyadmin.component';


import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { SystemadminComponent } from './systemadmin/systemadmin.component';
import { EdituserbyadminComponent } from './edituserbyadmin/edituserbyadmin.component';
import { DeleteuserbyadminComponent } from './deleteuserbyadmin/deleteuserbyadmin.component';
@NgModule({
  declarations: [
    AppComponent,
    BookMeetingRoom1Component,
    DataFormComponent,
    SelectRoomComponent,
    DialogOverviewExampleDialog,
    DashboardComponent,
    DashboardtableComponent,
    AdduserbyadminComponent,
    DialogCancel,
    HeaderComponent,
    SystemadminComponent,
    EdituserbyadminComponent,
    DeleteuserbyadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
    entryComponents: [ DialogOverviewExampleDialog , DialogCancel],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
