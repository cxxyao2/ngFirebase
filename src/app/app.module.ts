import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { VoteComponent } from './vote/vote.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { StructureDirective } from './structure.directive';
import { HighlightDirective } from './highlight.directive';
import { LightswitchComponent } from './lightswitch/lightswitch.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoggerInterceptor } from './http-interceptors/logger.interceptor';
import { HeroComponent } from './heros/hero/hero.component';
import { HerolistComponent } from './heros/herolist/herolist.component';
import { TwainComponent } from './twain/twain.component';
import { CanvasComponent } from './canvas/canvas.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { HwoToUnsubscribeComponent } from './00decorators/hwo-to-unsubscribe/hwo-to-unsubscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgChartComponent,
    PieChartComponent,
    EmployeeComponent,
    PageNoteFoundComponent,
    ComposeMessageComponent,
    LoginComponent,
    VoteComponent,
    RxjsComponent,
    ExponentialStrengthPipe,
    StructureDirective,
    HighlightDirective,
    LightswitchComponent,
    WelcomeComponent,
    HeroComponent,
    HerolistComponent,
    TwainComponent,
    CanvasComponent,
    HeroBannerComponent,
    HwoToUnsubscribeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
