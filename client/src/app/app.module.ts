import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigupComponent } from './components/sigup/sigup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AdminComponent } from './components/admin/admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSharingService } from './services/user-sharing.service';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/functions/users/users.component';
import { ChartContainerComponent } from './components/functions/chart-container/chart-container.component';
import { ListReadersComponent } from './components/functions/list-readers/list-readers.component';
import { MainPageComponent } from './components/functions/main-page/main-page.component';
import { ListBooksComponent } from './components/functions/list-books/list-books.component';
import { BooksContainerComponent } from './components/functions/books-container/books-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SigupComponent,
    AdminComponent,
    FooterComponent,
    UsersComponent,
    ChartContainerComponent,
    ListReadersComponent,
    MainPageComponent,
    ListBooksComponent,
    BooksContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    //TOken Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    UserSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
