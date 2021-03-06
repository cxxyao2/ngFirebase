import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

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
import { HeroDetailComponent } from './heros/hero-detail/hero-detail.component';
import { JwModalComponent } from './modal/jw-modal/jw-modal.component';
import { ModalHomeComponent } from './modal-home/modal-home.component';
import { VchildComponent } from './viewChild/vchild/vchild.component';
import { VparentComponent } from './viewChild/vparent/vparent.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HostComponent } from './flowers/host/host.component';
import { HostChildComponent } from './flowers/host-child/host-child.component';
import { HostParentComponent } from './flowers/host-parent/host-parent.component';
import { OptionalComponent } from './modifiers/optional/optional.component';
import { SelfComponent } from './modifiers/self/self.component';
import { SelfNoDataComponent } from './modifiers/self-no-data/self-no-data.component';
import { SkipselfComponent } from './modifiers/skipself/skipself.component';
import { InspectorComponent } from './inspector/inspector.component';
import { ChildComponent } from './child/child.component';
import { StorageComponent } from './storage/storage.component';

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
    HeroDetailComponent,
    JwModalComponent,
    ModalHomeComponent,
    VchildComponent,
    VparentComponent,
    HomeComponent,
    SignupComponent,
    HostComponent,
    HostChildComponent,
    HostParentComponent,
    OptionalComponent,
    SelfComponent,
    SelfNoDataComponent,
    SkipselfComponent,
    InspectorComponent,
    ChildComponent,
    StorageComponent,
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
    AngularFireAuthModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
