import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {routing, appRoutingProviders}  from './app.routing';
import {HttpModule} from '@angular/http';
import {AuthService} from './services/auth.service';
import {HttpService} from './services/http.service';
import {AppComponent}   from './app.component';
import {NavComponent}   from './nav/nav.component';
import {HomeComponent}   from './home/home.component';
import {AboutComponent}   from './about/about.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
    imports: [BrowserModule,FormsModule,HttpModule, routing],
    declarations: [AppComponent, NavComponent, HomeComponent, AboutComponent, LoginComponent, RegisterComponent],
    providers: [appRoutingProviders,AuthService,HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
