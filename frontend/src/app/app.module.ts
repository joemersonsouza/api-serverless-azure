import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarOverviewComponent } from './pages/car-overview/car-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatTableModule, MAT_DATE_LOCALE } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CarOverviewComponent,
    CarDetailComponent
  ],
  imports: [
    ToastrModule.forRoot({timeOut: 3000, closeButton: true, autoDismiss: true, positionClass: "toast-top-right"}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
