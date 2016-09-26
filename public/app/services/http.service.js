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
var http_1 = require('@angular/http');
var auth_service_1 = require('./auth.service');
var HttpService = (function () {
    function HttpService(http, authService) {
        var _this = this;
        this.http = http;
        this.authService = authService;
        this._headers = new http_1.Headers();
        this._http = this.http;
        this._authSubscription = this.authService.authCheck$.subscribe(function (status) {
            if (status) {
                _this.createAuthorizationHeaderWhenUserLogin();
            }
            else {
                _this.destroyAuthorizationHeaderWhenUserLogout();
            }
        });
    }
    HttpService.prototype.createAuthorizationHeaderWhenUserLogin = function () {
        this._headers.delete('Authorization');
        this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    };
    HttpService.prototype.destroyAuthorizationHeaderWhenUserLogout = function () {
        this._headers.delete('Authorization');
    };
    HttpService.prototype.get = function (url) {
        return this._http.get(url, {
            headers: this._headers
        });
    };
    HttpService.prototype.post = function (url, data) {
        return this._http.post(url, data, {
            headers: this._headers
        });
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map