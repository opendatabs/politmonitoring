webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_main_component__ = __webpack_require__("./src/app/main/main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_upload_component__ = __webpack_require__("./src/app/upload/upload.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__main_main_component__["a" /* MainComponent */] },
    { path: 'upload', component: __WEBPACK_IMPORTED_MODULE_3__upload_upload_component__["a" /* UploadComponent */] },
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_2__main_main_component__["a" /* MainComponent */] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar [admin]=\"admin\"></app-navbar>\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__ = __webpack_require__("./src/app/shared/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(router, authService, route) {
        var _this = this;
        this.router = router;
        this.authService = authService;
        this.route = route;
        this.admin = false;
        router.events.subscribe(function () {
            if (_this.router.url.indexOf('admin') > -1) {
                _this.authService.requestLogin().subscribe(function (event) { return _this.admin = event; }, function (error) { return console.log(error); });
            }
        });
        //   this.route.url.subscribe(
        //     (url) => {
        //       if (url.length >= 1)
        //         if (url[url.length - 1].path === 'admin')
        //           this.authService.requestLogin().subscribe(
        //             event => {this.admin = event
        //             console.log('triggered')},
        //             error => console.log(error)
        //           );
        //     });
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__shared_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__navbar_navbar_component__ = __webpack_require__("./src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_main_component__ = __webpack_require__("./src/app/main/main.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__upload_upload_component__ = __webpack_require__("./src/app/upload/upload.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_bootstrap_table_bootstrap_table_module__ = __webpack_require__("./src/app/shared/bootstrap-table/bootstrap-table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_data_service__ = __webpack_require__("./src/app/shared/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__main_bubble_chart_bubble_chart_component__ = __webpack_require__("./src/app/main/bubble-chart/bubble-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__main_data_filter_data_filter_component__ = __webpack_require__("./src/app/main/data-filter/data-filter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_auth_service__ = __webpack_require__("./src/app/shared/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ngx_toastr__ = __webpack_require__("./node_modules/ngx-toastr/esm5/ngx-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_3__navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_5__main_main_component__["a" /* MainComponent */],
                __WEBPACK_IMPORTED_MODULE_6__upload_upload_component__["a" /* UploadComponent */],
                __WEBPACK_IMPORTED_MODULE_10__main_bubble_chart_bubble_chart_component__["a" /* BubbleChartComponent */],
                __WEBPACK_IMPORTED_MODULE_11__main_data_filter_data_filter_component__["a" /* DataFilterComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_7__shared_bootstrap_table_bootstrap_table_module__["a" /* BootstrapTableModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_14_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_15__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_17_ngx_toastr__["a" /* ToastrModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_18__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__shared_data_service__["a" /* DataService */],
                __WEBPACK_IMPORTED_MODULE_13__shared_auth_service__["a" /* AuthService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/main/bubble-chart/bubble-chart.component.css":
/***/ (function(module, exports) {

module.exports = ".card {\r\n    margin-top: 20px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n#toolbar .button-wrapper {\r\n  width: calc(20% - 4px);\r\n  display: inline-block;\r\n  padding: 0 10px;\r\n}\r\n\r\n#toolbar .button-wrapper .btn {\r\n  width: 100%;\r\n}\r\n\r\n#toolbar button.btn.active {\r\n  background-color: #6c757d;\r\n  color: white;\r\n}\r\n"

/***/ }),

/***/ "./src/app/main/bubble-chart/bubble-chart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n        <div id=\"toolbar\">\r\n          <div class=\"row\">\r\n            <div class=\"col-12\">\r\n              <div class=\"button-wrapper\">\r\n                <button id=\"themenbereich\" class=\"btn active\">Themenbereich</button>\r\n              </div>\r\n              <div class=\"button-wrapper\">\r\n                <button id=\"parteien\" class=\"btn\">Partei</button>\r\n              </div>\r\n              <div class=\"button-wrapper\">\r\n                <button id=\"instrument\" class=\"btn\">Instrument</button>\r\n              </div>\r\n              <div class=\"button-wrapper\">\r\n                <button id=\"jahr\" class=\"btn\">Jahr</button>\r\n              </div>\r\n              <div class=\"button-wrapper\">\r\n                <button id=\"all\" class=\"btn\">Alle</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div id=\"vis\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/main/bubble-chart/bubble-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BubbleChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BubbleChartComponent = /** @class */ (function () {
    function BubbleChartComponent() {
        this.bubblesInitialized = false;
    }
    BubbleChartComponent.prototype.ngOnInit = function () {
    };
    BubbleChartComponent.prototype.ngOnChanges = function (changes) {
        if (changes.data && changes.data.currentValue) {
            if (!changes.data.previousValue) {
                BubbleChart.initialize(changes.data.currentValue);
            }
            else {
                BubbleChart.update(changes.data.currentValue);
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "data", void 0);
    BubbleChartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-bubble-chart',
            template: __webpack_require__("./src/app/main/bubble-chart/bubble-chart.component.html"),
            styles: [__webpack_require__("./src/app/main/bubble-chart/bubble-chart.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BubbleChartComponent);
    return BubbleChartComponent;
}());



/***/ }),

/***/ "./src/app/main/data-filter/data-filter.component.css":
/***/ (function(module, exports) {

module.exports = ".custom-fixed-navbar {\r\n  height: 56px;\r\n  width: 100%;\r\n  position: fixed;\r\n  margin-left: -15px;\r\n  z-index: 2;\r\n  padding: 0 0;\r\n}\r\n\r\n.invisible-navbar-placeholder {\r\n  height: 56px;\r\n  width: 100%;\r\n  visibility: hidden;\r\n}\r\n\r\n.content {\r\n  background-color: #9bb2ca;\r\n  padding: 0 10px;\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0 15px;\r\n  display: -webkit-flex; /* Safari */\r\n  -webkit-align-items: center; /* Safari 7.0+ */\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  border-bottom-left-radius: .25rem;\r\n  border-bottom-right-radius: .25rem;\r\n}\r\n\r\n.dropdown-item {\r\n  cursor: pointer;\r\n}\r\n\r\n/*CSS FOR RADIO BUTTONS*/\r\n\r\n[type=\"radio\"]:checked,\r\n[type=\"radio\"]:not(:checked) {\r\n  position: absolute;\r\n  left: -9999px;\r\n}\r\n\r\n[type=\"radio\"]:checked + label,\r\n[type=\"radio\"]:not(:checked) + label\r\n{\r\n  position: relative;\r\n  padding-left: 28px;\r\n  cursor: pointer;\r\n  line-height: 20px;\r\n  display: inline-block;\r\n  color: #666;\r\n}\r\n\r\n[type=\"radio\"]:checked + label:before,\r\n[type=\"radio\"]:not(:checked) + label:before {\r\n  content: '';\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 18px;\r\n  height: 18px;\r\n  border: 1px solid #ddd;\r\n  border-radius: 100%;\r\n  background: #fff;\r\n}\r\n\r\n[type=\"radio\"]:checked + label:after,\r\n[type=\"radio\"]:not(:checked) + label:after {\r\n  content: '';\r\n  width: 12px;\r\n  height: 12px;\r\n  background: #3da7f8;\r\n  position: absolute;\r\n  top: 3px;\r\n  left: 3px;\r\n  border-radius: 100%;\r\n  -webkit-transition: all 0.2s ease;\r\n  transition: all 0.2s ease;\r\n}\r\n\r\n[type=\"radio\"]:not(:checked) + label:after {\r\n  opacity: 0;\r\n  -webkit-transform: scale(0);\r\n  transform: scale(0);\r\n}\r\n\r\n[type=\"radio\"]:checked + label:after {\r\n  opacity: 1;\r\n  -webkit-transform: scale(1);\r\n  transform: scale(1);\r\n}\r\n\r\n#seachInput .input-group-append {\r\n  cursor: pointer;\r\n}\r\n\r\n.dropdown-menu {\r\n  max-height: 500px;\r\n  overflow-y: auto;\r\n}\r\n\r\n#dateFilter {\r\n  position: absolute;\r\n  right: 30px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/main/data-filter/data-filter.component.html":
/***/ (function(module, exports) {

module.exports = "<!--because navbar is static, we add this invisible placeholder to provide space for the navbar -->\r\n<div class=\"invisible-navbar-placeholder\"></div>\r\n<div class=\"custom-fixed-navbar container navbar\">\r\n  <div class=\"content\">\r\n    <form class=\"form-inline\">\r\n      <div class=\"input-group mr-sm-2\" id='seachInput'>\r\n        <input name='search' class=\"form-control\" type=\"search\" placeholder=\"Suchen\" aria-label=\"Suchen\"\r\n               (keydown)=\"keyDownFunction($event)\" [(ngModel)]=\"searchText\">\r\n        <div class=\"input-group-append\">\r\n          <div class=\"input-group-text\" (click)=\"filterData('')\">Suchen</div>\r\n        </div>\r\n      </div>\r\n    </form>\r\n    <div ngbDropdown class=\"mr-sm-2\">\r\n      <button ngbDropdownToggle class=\"btn btn-secondary\" type=\"button\" id=\"dropdownMenuButton\"\r\n              aria-haspopup=\"true\" aria-expanded=\"false\">\r\n        <span *ngIf=\"categoryFilter === 'all'\">Themenbereich</span>\r\n        <span *ngIf=\"categoryFilter !== 'all'\">{{categoryFilter}}</span>\r\n      </button>\r\n      <div ngbDropdownMenu aria-labelledby=\"dropdownMenuButton\">\r\n        <div class=\"dropdown-item\">\r\n          <div (click)=\"filterByCategory('all')\">\r\n            <input type=\"radio\" id=\"radio_all\" name=\"radio-group\" [checked]=\"categoryFilter === 'all'\">\r\n            <label for=\"radio_all\">Alle</label>\r\n          </div>\r\n        </div>\r\n        <div class=\"dropdown-item\" *ngFor=\"let entry of categoryDropdown; let i = index\">\r\n          <div (click)=\"filterByCategory(entry)\">\r\n            <input type=\"radio\" id=\"radio_{{i}}\" name=\"radio-group\">\r\n            <label for=\"radio_{{i}}\">{{entry}}</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div ngbDropdown class=\"mr-sm-2\">\r\n      <button class=\"btn btn-secondary\" type=\"button\" id=\"dropdownMenuButton2\" ngbDropdownToggle\r\n              aria-haspopup=\"true\" aria-expanded=\"false\">\r\n        Jahr\r\n      </button>\r\n      <div ngbDropdownMenu aria-labelledby=\"dropdownMenuButton2\">\r\n        <div class=\"dropdown-item\" *ngFor=\"let entry of yearDropdown; let i = index\">\r\n          <div>\r\n            <input type=\"checkbox\" id=\"checkbox_{{entry.year}}\" [(checked)]=\"entry.checked\" (change)=\"filterYears(entry)\">\r\n            <label for=\"checkbox_{{entry.year}}\">{{entry.year}}</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div ngbDropdown class=\"mr-sm-2\">\r\n      <button class=\"btn btn-secondary\" type=\"button\" id=\"dropdownMenuButton3\" ngbDropdownToggle\r\n              aria-haspopup=\"true\" aria-expanded=\"false\">\r\n        <span *ngIf=\"statusFilter === 'all'\">Status</span>\r\n        <span *ngIf=\"statusFilter !== 'all'\">{{statusFilter}}</span>\r\n      </button>\r\n      <div ngbDropdownMenu aria-labelledby=\"dropdownMenuButton3\">\r\n        <div class=\"dropdown-item\">\r\n          <div (click)=\"filterStatus('all')\">\r\n            <input type=\"radio\" id=\"radio_status_all\" name=\"radio-group2\" [checked]=\"statusFilter === 'all'\">\r\n            <label for=\"radio_all\">Alle</label>\r\n          </div>\r\n        </div>\r\n        <div class=\"dropdown-item\">\r\n          <div (click)=\"filterStatus('Erledigt')\">\r\n            <input type=\"radio\" id=\"radio_status_erledigt\" name=\"radio-group2\" [checked]=\"statusFilter === 'Erledigt'\">\r\n            <label for=\"radio_all\">Erledigt</label>\r\n          </div>\r\n        </div>\r\n        <div class=\"dropdown-item\">\r\n          <div (click)=\"filterStatus('In Bearbeitung')\">\r\n            <input type=\"radio\" id=\"radio_status_bearbeitung\" name=\"radio-group2\" [checked]=\"statusFilter === 'In Bearbeitung'\">\r\n            <label for=\"radio_all\">In Bearbeitung</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id=\"dateFilter\" *ngIf=\"filtered\">\r\n      <button class=\"btn btn-secondary\" type=\"button\" (click)=\"resetFilters()\" placement=\"bottom\" ngbTooltip=\"Alle&nbsp;Filter&nbsp;zurücksetzen\">\r\n        X\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/main/data-filter/data-filter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_data_service__ = __webpack_require__("./src/app/shared/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataFilterComponent = /** @class */ (function () {
    function DataFilterComponent(dataService) {
        this.dataService = dataService;
        this.onFiltered = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.searchText = '';
        this.originalData = [];
        this.yearDropdown = [];
        this.categoryFilter = 'all';
        this.statusFilter = 'all';
        this.filtered = false;
    }
    DataFilterComponent_1 = DataFilterComponent;
    DataFilterComponent.scroll = function () {
        var navHeight = $('.navbar').outerHeight();
        var scrollTop = navHeight - $(window).scrollTop();
        $('.custom-fixed-navbar').css('top', (Math.max(scrollTop, 0)));
    };
    DataFilterComponent.prototype.ngOnInit = function () {
        window.addEventListener('scroll', DataFilterComponent_1.scroll, true);
        /*    $(document).ready(function(){
              $('[data-toggle="tooltip"]').tooltip();
            });*/
    };
    DataFilterComponent.prototype.ngAfterViewChecked = function () {
        DataFilterComponent_1.scroll();
    };
    DataFilterComponent.prototype.ngOnChanges = function (changes) {
        // save originalData when data is loaded the first time
        if (changes.data.currentValue && this.originalData.length === 0) {
            this.originalData = changes.data.currentValue;
            this.initDropdown();
        }
    };
    DataFilterComponent.prototype.filterData = function () {
        var _this = this;
        this.data = this.originalData;
        if (this.categoryFilter !== 'all') {
            this.data = this.dataService.filterByCategory(this.data, this.categoryFilter);
        }
        if (this.statusFilter !== 'all') {
            this.data = this.dataService.filterByStatus(this.data, this.statusFilter);
        }
        this.data = this.dataService.searchInArrayOfObjects(this.data, this.searchText);
        this.data = this.dataService.filterYears(this.data, this.yearDropdown);
        // check if any filter is set.
        this.filtered = this.categoryFilter !== 'all' || this.searchText.length > 0 || this.statusFilter !== 'all';
        this.yearDropdown.forEach(function (d) {
            if (!d.checked) {
                _this.filtered = true;
            }
        });
        this.onFiltered.emit(this.data);
    };
    DataFilterComponent.prototype.initDropdown = function () {
        this.categoryDropdown = $.unique(this.originalData.map(function (d) { return d.Themenbereich; }));
        this.categoryDropdown.sort();
        this.yearDropdown = $.unique(this.originalData.map(function (d) { return d.Jahr; }));
        this.yearDropdown = this.yearDropdown.map(function (d) {
            return { year: d, checked: true };
        });
    };
    DataFilterComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode === 13) {
            this.filterData();
        }
    };
    DataFilterComponent.prototype.filterYears = function (entry) {
        entry.checked = !entry.checked;
        this.filterData();
    };
    DataFilterComponent.prototype.filterStatus = function (status) {
        this.statusFilter = status;
        this.filterData();
    };
    DataFilterComponent.prototype.filterByCategory = function (category) {
        this.categoryFilter = category;
        this.filterData();
    };
    DataFilterComponent.prototype.resetFilters = function () {
        this.searchText = '';
        this.categoryFilter = 'all';
        this.yearDropdown.forEach(function (d) {
            d.checked = true;
        });
        this.statusFilter = 'all';
        this.filterData();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], DataFilterComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], DataFilterComponent.prototype, "onFiltered", void 0);
    DataFilterComponent = DataFilterComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-data-filter',
            template: __webpack_require__("./src/app/main/data-filter/data-filter.component.html"),
            styles: [__webpack_require__("./src/app/main/data-filter/data-filter.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_data_service__["a" /* DataService */]])
    ], DataFilterComponent);
    return DataFilterComponent;
    var DataFilterComponent_1;
}());



/***/ }),

/***/ "./src/app/main/main.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "<app-data-filter [data]=\"data\" (onFiltered)=\"replaceFilteredData($event)\"></app-data-filter>\r\n<!--<app-upload *ngIf=\"admin\"></app-upload>-->\r\n<app-bubble-chart [data]=\"data\"></app-bubble-chart>\r\n<app-bootstrap-table *ngIf=\"data\"\r\n                       [data]=\"data\"\r\n                       [title]=\"'Politdaten'\"\r\n                       [initialSortBy]=\"'geschaefts_nr'\">\r\n</app-bootstrap-table>\r\n"

/***/ }),

/***/ "./src/app/main/main.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_data_service__ = __webpack_require__("./src/app/shared/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MainComponent = /** @class */ (function () {
    function MainComponent(dataService) {
        this.dataService = dataService;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getData().subscribe(function (data) {
            data.forEach(function (d) {
                d.Themenbereich = d.Themenbereich.substring(0, d.Themenbereich.indexOf('(')).trim();
                d['Thema 1 (gleiche Nr wie Themenbereich)'] = d['Thema 1 (gleiche Nr wie Themenbereich)'].substring(0, d['Thema 1 (gleiche Nr wie Themenbereich)'].indexOf('(')).trim();
                d['Thema 2 (andere Nr)'] = d['Thema 2 (andere Nr)'].substring(0, d['Thema 2 (andere Nr)'].indexOf('(')).trim();
            });
            // Remove empty elements from array
            var filteredData = data.filter(function (el) { return el['Geschäfts-nr'] > 0; });
            _this.data = filteredData;
            _this.originalData = filteredData;
        }, function (err) {
            alert('An error occurred. See console for details.');
            console.log(err);
        });
    };
    MainComponent.prototype.replaceFilteredData = function (filteredData) {
        this.data = filteredData;
    };
    MainComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-main',
            template: __webpack_require__("./src/app/main/main.component.html"),
            styles: [__webpack_require__("./src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_data_service__["a" /* DataService */]])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\r\n  <a class=\"navbar-brand\" href=\"#\">\r\n    <img src=\"\" width=\"30\" height=\"30\" alt=\"\">\r\n    Politmonitoring\r\n  </a>\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n    <ul class=\"navbar-nav\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [routerLinkActive]=\"['active']\" [routerLink]=\"['/home']\">Home</a>\r\n      </li>\r\n      <li class=\"nav-item\" *ngIf=\"admin\">\r\n        <a class=\"nav-link\"[routerLinkActive]=\"['active']\" [routerLink]=\"['/upload']\">Daten hochladen</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], NavbarComponent.prototype, "admin", void 0);
    NavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__("./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/shared/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.requestLogin = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + 'auth');
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/shared/bootstrap-table/bootstrap-table.component.css":
/***/ (function(module, exports) {

module.exports = "#pageView {\r\n    padding-right: 5px;\r\n    padding-left: 5px;\r\n}\r\n\r\nth.titleCol {\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n}\r\n\r\nth.titleCol:hover {\r\n    background-color: #f5f5f5;\r\n}\r\n\r\nth.titleCol p {\r\n    position: relative;\r\n    padding-right: 30px;\r\n}\r\n\r\nth.titleCol i {\r\n    margin-left: 7px;\r\n}\r\n\r\n#paginationWrapper {\r\n    position: absolute;\r\n    right: 20px;\r\n    z-index: 20;\r\n}\r\n\r\n#paginationWrapper ul {\r\n  float: right;\r\n  margin-top: 56px;\r\n}\r\n\r\n#paginationWrapper a:hover {\r\n  cursor: pointer;\r\n  background-color: #0000001f;\r\n}\r\n\r\n.highlight {\r\n  cursor: pointer;\r\n}\r\n\r\n#table {\r\n    margin-top: 50px;\r\n}\r\n\r\n#tableWrapper {\r\n    overflow-x: scroll;\r\n}\r\n\r\n.customToolTip {\r\n  position: relative;\r\n}\r\n\r\n.customToolTip .tooltiptext {\r\n  visibility: hidden;\r\n  width: 120px;\r\n  background-color: #555;\r\n  color: #fff;\r\n  text-align: center;\r\n  border-radius: 6px;\r\n  padding: 5px 0;\r\n  position: absolute;\r\n  z-index: 100;\r\n  bottom: 125%;\r\n  left: 50%;\r\n  margin-left: -60px;\r\n  opacity: 0;\r\n  -webkit-transition: opacity 0.3s;\r\n  transition: opacity 0.3s;\r\n}\r\n\r\n.customToolTip .tooltiptext::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border-width: 5px;\r\n  border-style: solid;\r\n  border-color: #555 transparent transparent transparent;\r\n}\r\n\r\n.customToolTip:hover .tooltiptext {\r\n  visibility: visible;\r\n  opacity: 1;\r\n}\r\n"

/***/ }),

/***/ "./src/app/shared/bootstrap-table/bootstrap-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" xmlns:slice=\"http://www.w3.org/1999/xhtml\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-9\">\r\n            <h2>{{title}} ({{data.length}})</h2>\r\n          </div>\r\n          <div class=\"col-3\" id=\"paginationWrapper\">\r\n            <ul class=\"pagination\">\r\n              <li [class.disabled]=\"pagination.start === 0\" [class.waves-effect]=\"pagination.start !== 0\"><a (click)=\"pageBack()\"><i class=\"fas fa-chevron-left\"></i></a></li>\r\n              <li id=\"pageView\">{{pagination.start}} - {{pagination.end}} / {{data.length}}</li>\r\n              <li [class.disabled]=\"pagination.end === data.length\" [class.waves-effect]=\"pagination.end !== data.length\"><a (click)=\"pageUp()\"><i class=\"fas fa-chevron-right\"></i></a></li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-12\">\r\n            <div id=\"tableWrapper\">\r\n              <table id=\"table\" class=\"table highlight table-hover\">\r\n                <tr>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('geschaefts_nr')\">\r\n                    <p>Geschäftsnummer\r\n                      <i *ngIf=\"'geschaefts_nr' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'geschaefts_nr' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('instrument')\">\r\n                    <p>Instrument\r\n                      <i *ngIf=\"'instrument' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'instrument' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('urheber')\">\r\n                    <p>Urheber\r\n                      <i *ngIf=\"'urheber' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'urheber' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('titel')\">\r\n                    <p>Titel\r\n                      <i *ngIf=\"'titel' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'titel' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('status')\">\r\n                    <p>Status\r\n                      <i *ngIf=\"'status' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'status' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('jahr')\">\r\n                    <p>Jahr\r\n                      <i *ngIf=\"'jahr' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'jahr' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('themenbereich')\">\r\n                    <p>Themenbereich\r\n                      <i *ngIf=\"'themenbereich' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'themenbereich' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('thema_1')\">\r\n                    <p>Thema 1\r\n                      <i *ngIf=\"'thema_1' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'thema_1' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('thema_2')\">\r\n                    <p>Thema 2\r\n                      <i *ngIf=\"'thema_2' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'thema_2' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('schwerpunktthema')\">\r\n                    <p>Schwerpunktthema\r\n                      <i *ngIf=\"'schwerpunktthema' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'schwerpunktthema' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('konsorten')\">\r\n                    <p>Konsorten\r\n                      <i *ngIf=\"'konsorten' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'konsorten' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                  <th class=\"titleCol\" (click)=\"changeSortBy('link')\">\r\n                    <p>Link\r\n                      <i *ngIf=\"'link' === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"'link' === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i>\r\n                    </p>\r\n                  </th>\r\n                </tr>\r\n                <tr #table *ngFor=\"let entry of data | sortBy: sort.sortBy: sort.asc | slice:pagination.start:pagination.end\"\r\n                    (click)=\"selectEntry(entry)\">\r\n                  <td>\r\n                    <span *ngIf=\"entry['Geschäfts-nr']\" [innerHTML]=\"entry['Geschäfts-nr'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Geschäfts-nr']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Instrument']\" [innerHTML]=\"entry['Instrument'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Instrument']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['UrheberIn']\" [innerHTML]=\"entry['UrheberIn'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['UrheberIn']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Titel']\" [innerHTML]=\"entry['Titel'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Titel']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Status']\" [innerHTML]=\"entry['Status'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Status']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Jahr']\" [innerHTML]=\"entry['Jahr'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Jahr']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Themenbereich']\" [innerHTML]=\"entry['Themenbereich'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Themenbereich']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Thema 1 (gleiche Nr wie Themenbereich)']\" [innerHTML]=\"entry['Thema 1 (gleiche Nr wie Themenbereich)'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Thema 1 (gleiche Nr wie Themenbereich)']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Thema 2 (andere Nr)']\" [innerHTML]=\"entry['Thema 2 (andere Nr)'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Thema 2 (andere Nr)']\"></span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Schwerpunktthema (bei Bedarf)']\" [innerHTML]=\"entry['Schwerpunktthema (bei Bedarf)'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Schwerpunktthema (bei Bedarf)']\"></span>\r\n                  </td>\r\n                  <td class=\"customToolTip\">\r\n                    <span *ngIf=\"entry['Konsorten']\" [innerHTML]=\"(entry['Konsorten'].slice(0, 70).toString() | highlight:searchString) + '...'\"></span>\r\n                    <span *ngIf=\"!entry['Konsorten']\"></span>\r\n                    <span class=\"tooltiptext\">{{entry.Konsorten}}</span>\r\n                  </td>\r\n                  <td>\r\n                    <span *ngIf=\"entry['Link']\" [innerHTML]=\"entry['Link'].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry['Link']\"></span>\r\n                  </td>\r\n                </tr>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/shared/bootstrap-table/bootstrap-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BootstrapTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BootstrapTableComponent = /** @class */ (function () {
    function BootstrapTableComponent() {
        this.selectEntryEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.searchString = '';
        this.pagination = {
            start: 0,
            end: 0,
            numberOfEntries: 20,
            numberPages: 0
        };
        this.sort = {
            sortBy: '',
            asc: false
        };
    }
    BootstrapTableComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
    };
    BootstrapTableComponent.prototype.ngOnInit = function () {
        this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
        this.pagination.numberPages = Math.ceil(this.data.length / this.pagination.numberOfEntries);
        this.sort.sortBy = this.initialSortBy;
    };
    BootstrapTableComponent.prototype.pageBack = function () {
        if (this.pagination.start !== 0) {
            this.pagination.start = Math.max(this.pagination.start - this.pagination.numberOfEntries, 0);
            this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
        }
    };
    BootstrapTableComponent.prototype.pageUp = function () {
        if (this.pagination.end !== this.data.length) {
            this.pagination.start = this.pagination.start + this.pagination.numberOfEntries;
            this.pagination.end = Math.min(this.pagination.end + this.pagination.numberOfEntries, this.data.length);
        }
    };
    BootstrapTableComponent.prototype.changeSortBy = function (col) {
        // change direction if second click on same col
        if (this.sort.sortBy === col) {
            this.sort.asc = !this.sort.asc;
            // change filter
        }
        else {
            this.sort.sortBy = col;
            this.sort.asc = false;
        }
    };
    BootstrapTableComponent.prototype.selectEntry = function (entry) {
        this.selectEntryEvent.emit(entry);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], BootstrapTableComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], BootstrapTableComponent.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], BootstrapTableComponent.prototype, "initialSortBy", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], BootstrapTableComponent.prototype, "selectEntryEvent", void 0);
    BootstrapTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-bootstrap-table',
            template: __webpack_require__("./src/app/shared/bootstrap-table/bootstrap-table.component.html"),
            styles: [__webpack_require__("./src/app/shared/bootstrap-table/bootstrap-table.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BootstrapTableComponent);
    return BootstrapTableComponent;
}());



/***/ }),

/***/ "./src/app/shared/bootstrap-table/bootstrap-table.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BootstrapTableModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootstrap_table_component__ = __webpack_require__("./src/app/shared/bootstrap-table/bootstrap-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_keys_pipe__ = __webpack_require__("./src/app/shared/bootstrap-table/pipes/keys.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_sort_by_pipe__ = __webpack_require__("./src/app/shared/bootstrap-table/pipes/sort-by.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_highlight_pipe__ = __webpack_require__("./src/app/shared/bootstrap-table/pipes/highlight.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var BootstrapTableModule = /** @class */ (function () {
    function BootstrapTableModule() {
    }
    BootstrapTableModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__bootstrap_table_component__["a" /* BootstrapTableComponent */],
                __WEBPACK_IMPORTED_MODULE_3__pipes_keys_pipe__["a" /* KeysPipe */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_sort_by_pipe__["a" /* SortByPipe */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_highlight_pipe__["a" /* HighlightPipe */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__bootstrap_table_component__["a" /* BootstrapTableComponent */],
                __WEBPACK_IMPORTED_MODULE_3__pipes_keys_pipe__["a" /* KeysPipe */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_sort_by_pipe__["a" /* SortByPipe */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_highlight_pipe__["a" /* HighlightPipe */]
            ]
        })
    ], BootstrapTableModule);
    return BootstrapTableModule;
}());



/***/ }),

/***/ "./src/app/shared/bootstrap-table/pipes/highlight.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighlightPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    HighlightPipe.prototype.transform = function (text, search) {
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        pattern = pattern.split(' ').filter(function (t) {
            return t.length > 0;
        }).join('|');
        var regex = new RegExp(pattern, 'gi');
        if (typeof text !== 'undefined' && text.length > 0)
            return search ? text.replace(regex, function (match) { return "<span class=\"highlight_search_text\">" + match + "</span>"; }) : text;
        else
            return text;
    };
    HighlightPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'highlight'
        })
    ], HighlightPipe);
    return HighlightPipe;
}());



/***/ }),

/***/ "./src/app/shared/bootstrap-table/pipes/keys.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys;
    };
    KeysPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'keys'
        })
    ], KeysPipe);
    return KeysPipe;
}());



/***/ }),

/***/ "./src/app/shared/bootstrap-table/pipes/sort-by.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortByPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SortByPipe = /** @class */ (function () {
    function SortByPipe() {
    }
    SortByPipe.prototype.transform = function (array, sortBy, asc) {
        array.sort(function (a, b) {
            var returnValue;
            if (a[sortBy] < b[sortBy]) {
                returnValue = -1;
            }
            else if (a[sortBy] > b[sortBy]) {
                returnValue = 1;
            }
            else {
                returnValue = 0;
            }
            if (asc) {
                return returnValue;
            }
            else {
                return returnValue * (-1);
            }
        });
        return array;
    };
    SortByPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'sortBy'
        })
    ], SortByPipe);
    return SortByPipe;
}());



/***/ }),

/***/ "./src/app/shared/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
    }
    DataService.prototype.getData = function () {
        var url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + 'data';
        return this.http.get(url);
    };
    DataService.prototype.searchInArrayOfObjects = function (data, searchText) {
        var list = data;
        var result = [];
        if (typeof list === 'undefined' || typeof searchText === 'undefined' || searchText === '') {
            return data;
        }
        var found;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var entry = list_1[_i];
            found = false;
            for (var key in entry) {
                if (entry.hasOwnProperty(key)) {
                    if (entry[key] !== null && entry[key].toString().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1) {
                        found = true;
                    }
                }
            }
            if (found) {
                result.push(entry);
            }
        }
        return result;
    };
    DataService.prototype.filterByCategory = function (data, category) {
        return data.filter(function (d) {
            return d.Themenbereich === category;
        });
    };
    DataService.prototype.filterYears = function (data, years) {
        return data.filter(function (d) {
            var found = false;
            years.forEach(function (y) {
                if (y.checked && y.year === d.Jahr) {
                    found = true;
                }
            });
            return found;
        });
    };
    DataService.prototype.filterByStatus = function (data, statusFilter) {
        return data.filter(function (d) {
            return d.Status.toLowerCase() === statusFilter.toLowerCase();
        });
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/upload/upload.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/upload/upload.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n        <h2>Neue Daten hochladen</h2>\r\n        <p>Hier kann die Visualisierung mit neuen Grossratsgeschäfts-Daten aktualisiert werden.</p>\r\n        <p>Die neue Datei muss für eine erfolgreiche Aktualisierung die untenstehenden Bedingungen erfüllen.</p>\r\n        <div class=\"custom-file w-25\">\r\n          <input type=\"file\" class=\"custom-file-input\" id=\"customFile\"\r\n                 name=\"json\" ng2FileSelect [uploader]=\"uploader\">\r\n          <label class=\"custom-file-label\" for=\"customFile\">Choose file</label>\r\n          <!--<input class=\"custom-file-input\" type=\"file\" name=\"json\" ng2FileSelect [uploader]=\"uploader\" />-->\r\n          <button type=\"button\" class=\"btn btn-secondary my-2\"\r\n                  (click)=\"uploader.uploadAll()\"\r\n                  [disabled]=\"!uploader.getNotUploadedItems().length\">Upload file\r\n          </button>\r\n        </div>\r\n        <div class=\"beschreibung w-100 mt-5\">\r\n        <b>Excel-Voraussetzungen</b>\r\n        <ol>\r\n          <li>Dateiformat: <em>.xlsx</em></li>\r\n          <li>Enthält nur ein Arbeitsblatt (worksheet)</li>\r\n          <li>Kein freistehender Text. Nur Daten zu den jeweiligen Spalten</li>\r\n          <li>Spaltenüberschriften:\r\n            <ul>\r\n              <li>Geschäfts-nr</li>\r\n              <li>Instrument</li>\r\n              <li>UrheberIn</li>\r\n              <li>Titel</li>\r\n              <li>Status</li>\r\n              <li>Jahr</li>\r\n              <li>Themenbereich</li>\r\n              <li>Thema 1 (gleiche Nr wie Themenbereich)</li>\r\n              <li>Thema 2 (andere Nr)</li>\r\n              <li>Schwerpunktthema (bei Bedarf)</li>\r\n              <li>Konsorten</li>\r\n              <li>Link</li>\r\n              <li>Partei</li>\r\n            </ul>\r\n          </li>\r\n        </ol>\r\n        <p><b>Wichtig: </b>In den Spaltenüberschriften sollten keine Punkte <b><em>.</em></b> oder\r\n          eckige Klammern <b><em>[ ]</em></b> verwendet werden.</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/upload/upload.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__ = __webpack_require__("./node_modules/ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_toastr__ = __webpack_require__("./node_modules/ngx-toastr/esm5/ngx-toastr.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var URL = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + 'upload';
var UploadComponent = /** @class */ (function () {
    function UploadComponent(toastr) {
        this.toastr = toastr;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({ url: URL, itemAlias: 'file' });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.onUpload = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    UploadComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploadComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    UploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        // override the onAfterAddingfile property of the uploader so it doesn't authenticate with credentials.
        this.uploader.onAfterAddingFile = function (file) { file.withCredentials = false; };
        // overide the onCompleteItem property of the uploader to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log('ImageUpload:uploaded:', item, status, response);
            if (status === 200)
                _this.toastr.success('Neue Daten wurden hochgeladen', 'Upload erfolgreich');
        };
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], UploadComponent.prototype, "onUpload", void 0);
    UploadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-upload',
            template: __webpack_require__("./src/app/upload/upload.component.html"),
            styles: [__webpack_require__("./src/app/upload/upload.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ngx_toastr__["b" /* ToastrService */]])
    ], UploadComponent);
    return UploadComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    apiUrl: 'http://localhost:5000/'
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map