import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../services/auth.service';
import {HttpService} from '../services/http.service';

@Component({
    moduleId: module.id,
    selector: 'm-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    private _authSubscription:Subscription;
    private _authStatus:Boolean;
    private _userInfo = {
        username: '',
        password: ''
    };

    constructor(private _httpService:HttpService,private _authService:AuthService,private _router:Router) {
        this._authSubscription = this._authService.authCheck$.subscribe(
            status => this._authStatus = status
        );
    }

    ngOnInit() {
        if(this._authStatus){
            this._router.navigate(['/home']);
        }
    }

    login():void{
        this._httpService
            .post('http://localhost:3000/auth',this._userInfo)
            .subscribe(
                (res:any) => {
                    this._authService.saveLocalStorage(JSON.parse(res._body));
                    this._authService.login();
                    this._router.navigate(['/home']);
                },
                (error:any) => {
                    console.log(error);
                }
            );
    }

}
