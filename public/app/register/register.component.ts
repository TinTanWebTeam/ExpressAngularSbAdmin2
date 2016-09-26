import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../services/auth.service';
import {HttpService} from '../services/http.service';

@Component({
    moduleId: module.id,
    selector: 'm-register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    private _authSubscription:Subscription;
    private _authStatus:Boolean;
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
}