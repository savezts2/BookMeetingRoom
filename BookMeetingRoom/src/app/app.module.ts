import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { BookMeetingRoom1Component } from './book-meeting-room1/book-meeting-room1.component';

import {MatTableModule} from '@angular/material/table';
import { DataFormComponent } from './data-form/data-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectRoomComponent } from './select-room/select-room.component';
import {MatDialogModule} from '@angular/material/dialog';

import {DialogOverviewExampleDialog} from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardtableComponent } from './dashboardtable/dashboardtable.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    BookMeetingRoom1Component,
    DataFormComponent,
    SelectRoomComponent,
    DialogOverviewExampleDialog,
    DashboardComponent,
    DashboardtableComponent
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
    MatProgressSpinnerModule
  ],
    entryComponents: [ DialogOverviewExampleDialog ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
