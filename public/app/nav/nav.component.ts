import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs/Subscription';
declare var $: JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'm-nav',
    templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit {
    private _authSubscription:Subscription;
    private _authUser:Object;
    private _authStatus:Boolean;
    constructor(private _authService:AuthService) {
        this._authSubscription = this._authService.authCheck$.subscribe(
            status => {
                this._authStatus = status;
                this._authUser = this._authService.authUser;
            }
        );
    }

    ngOnInit() {

    }

    showHideSubMenu(event):void {
    	if($(event.target).find('i').eq(1).hasClass('fa-arrow-down')){
    		$(event.target).find('i').eq(1).removeClass('fa-arrow-down').addClass('fa-arrow-left');
    	}else{
    		$(event.target).find('i').eq(1).removeClass('fa-arrow-left').addClass('fa-arrow-down');
    	}
    	$(event.target).parent().find('ul').toggle();
    }

    logout():void{
        this._authService.logout();
    }
}