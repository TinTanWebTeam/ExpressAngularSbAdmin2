import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
	public authCheck = new BehaviorSubject<Boolean>(false);
	public authCheck$ = this.authCheck.asObservable();
	public authUser:Object;
	constructor() {
		this.checkLocalStorageForAuth();
	}
	checkLocalStorageForAuth():void{
		if(localStorage.getItem('token')){
			this.authUser = {
				username: localStorage.getItem('username'),
				email: localStorage.getItem('email'),
				role: localStorage.getItem('role'),
				login_at: localStorage.getItem('login_at'),
				expire_at: localStorage.getItem('expire_at'),
				token: localStorage.getItem('token')
			};
			this.authStatusChange(true);
		}else{
            this.authUser = {
                username: null,
                email: null,
                role: null,
                login_at: null,
                expire_at: null,
                token: null
            };
			this.authStatusChange(false);
		}
	}
	authStatusChange(status:Boolean):void{
		this.authCheck.next(status);
	}
	login():void{
        this.checkLocalStorageForAuth();
    }
    logout():void{
    	this.clearLocalStorage();
        this.checkLocalStorageForAuth();
    }
	saveLocalStorage(userInfo:any):void{
		localStorage.setItem('username',userInfo.username);
		localStorage.setItem('email',userInfo.email);
		localStorage.setItem('role',userInfo.role);
		localStorage.setItem('login_at',userInfo.login_at);
		localStorage.setItem('expire_at',userInfo.expire_at);
		localStorage.setItem('token',userInfo.token);
	}
	clearLocalStorage():void{
		localStorage.removeItem('username');
		localStorage.removeItem('email');
		localStorage.removeItem('role');
		localStorage.removeItem('login_at');
		localStorage.removeItem('expire_at');
		localStorage.removeItem('token');
	}
}