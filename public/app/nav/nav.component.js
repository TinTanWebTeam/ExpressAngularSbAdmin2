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
var auth_service_1 = require('../services/auth.service');
var NavComponent = (function () {
    function NavComponent(_authService) {
        var _this = this;
        this._authService = _authService;
        this._authSubscription = this._authService.authCheck$.subscribe(function (status) {
            _this._authStatus = status;
            _this._authUser = _this._authService.authUser;
        });
    }
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent.prototype.showHideSubMenu = function (event) {
        if ($(event.target).find('i').eq(1).hasClass('fa-arrow-down')) {
            $(event.target).find('i').eq(1).removeClass('fa-arrow-down').addClass('fa-arrow-left');
        }
        else {
            $(event.target).find('i').eq(1).removeClass('fa-arrow-left').addClass('fa-arrow-down');
        }
        $(event.target).parent().find('ul').toggle();
    };
    NavComponent.prototype.logout = function () {
        this._authService.logout();
    };
    NavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-nav',
            templateUrl: 'nav.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map