import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../services/auth.service';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import 'moment/locale/vi';
declare var $: JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'm-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
	private _authStatus:Boolean;
    private _authUser:Object;
	private _authSubscription:Subscription;
    private _dateTimeNowVi: String;
    constructor(private _authService:AuthService){
    	this._authSubscription = this._authService.authCheck$.subscribe(
    		status => {
                this._authStatus = status;
                this._authUser = this._authService.authUser;
            }
    	);
        this._dateTimeNowVi =  moment().locale('vi').format('LLLL');
    }

    ngOnInit() {

    }
}
