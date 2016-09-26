"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var AuthService = (function () {
    function AuthService() {
        this.authCheck = new BehaviorSubject_1.BehaviorSubject(false);
        this.authCheck$ = this.authCheck.asObservable();
        this.checkLocalStorageForAuth();
    }
    AuthService.prototype.checkLocalStorageForAuth = function () {
        if (localStorage.getItem('token')) {
            this.authUser = {
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                role: localStorage.getItem('role'),
                login_at: localStorage.getItem('login_at'),
                expire_at: localStorage.getItem('expire_at'),
                token: localStorage.getItem('token')
            };
            this.authStatusChange(true);
        }
        else {
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
    };
    AuthService.prototype.authStatusChange = function (status) {
        this.authCheck.next(status);
    };
    AuthService.prototype.login = function () {
        this.checkLocalStorageForAuth();
    };
    AuthService.prototype.logout = function () {
        this.clearLocalStorage();
        this.checkLocalStorageForAuth();
    };
    AuthService.prototype.saveLocalStorage = function (userInfo) {
        localStorage.setItem('username', userInfo.username);
        localStorage.setItem('email', userInfo.email);
        localStorage.setItem('role', userInfo.role);
        localStorage.setItem('login_at', userInfo.login_at);
        localStorage.setItem('expire_at', userInfo.expire_at);
        localStorage.setItem('token', userInfo.token);
    };
    AuthService.prototype.clearLocalStorage = function () {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('login_at');
        localStorage.removeItem('expire_at');
        localStorage.removeItem('token');
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map