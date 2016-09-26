import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Subscription} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class HttpService {
    private _http:Http;
    private _authSubscription:Subscription;
    private _headers:Headers = new Headers();

    constructor(private http:Http,private authService:AuthService) {
        this._http = this.http;
        this._authSubscription = this.authService.authCheck$.subscribe(
            status => {
                if(status){
                    this.createAuthorizationHeaderWhenUserLogin();
                }else{
                    this.destroyAuthorizationHeaderWhenUserLogout();
                }
            }
        );
    }

    createAuthorizationHeaderWhenUserLogin() {
        this._headers.delete('Authorization');
        this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    destroyAuthorizationHeaderWhenUserLogout(){
        this._headers.delete('Authorization');
    }

    get(url) {
        return this._http.get(url, {
            headers: this._headers
        });
    }

    post(url, data) {
        return this._http.post(url, data, {
            headers: this._headers
        });
    }
}