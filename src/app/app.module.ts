import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { SvgChartComponent } from './svg-chart/svg-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    SvgChartComponent,
    PieChartComponent,
    EmployeeComponent,
    PageNoteFoundComponent,
    ComposeMessageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
