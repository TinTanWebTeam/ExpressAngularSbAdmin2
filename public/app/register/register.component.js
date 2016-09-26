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
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth.service');
var http_service_1 = require('../services/http.service');
var RegisterComponent = (function () {
    function RegisterComponent(_httpService, _authService, _router) {
        var _this = this;
        this._httpService = _httpService;
        this._authService = _authService;
        this._router = _router;
        this._authSubscription = this._authService.authCheck$.subscribe(function (status) { return _this._authStatus = status; });
    }
    RegisterComponent.prototype.ngOnInit = function () {
        if (this._authStatus) {
            this._router.navigate(['/home']);
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-register',
            templateUrl: 'register.component.html'
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, auth_service_1.AuthService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map