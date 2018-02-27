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
    { path: 'home/admin', component: __WEBPACK_IMPORTED_MODULE_2__main_main_component__["a" /* MainComponent */] },
    { path: 'upload', component: __WEBPACK_IMPORTED_MODULE_3__upload_upload_component__["a" /* UploadComponent */] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
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
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.admin = false;
        router.events.subscribe(function (val) {
            _this.admin = _this.router.url.indexOf('admin') > -1;
        });
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_3__navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_5__main_main_component__["a" /* MainComponent */],
                __WEBPACK_IMPORTED_MODULE_6__upload_upload_component__["a" /* UploadComponent */],
                __WEBPACK_IMPORTED_MODULE_10__main_bubble_chart_bubble_chart_component__["a" /* BubbleChartComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_7__shared_bootstrap_table_bootstrap_table_module__["a" /* BootstrapTableModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_9__shared_data_service__["a" /* DataService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/main/bubble-chart/bubble-chart.component.css":
/***/ (function(module, exports) {

module.exports = ".card {\r\n    margin-top: 20px;\r\n    margin-bottom: 20px;\r\n}"

/***/ }),

/***/ "./src/app/main/bubble-chart/bubble-chart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-12\">\r\n        <div class=\"card\">\r\n            <div class=\"card-body\">\r\n                <div id=\"toolbar\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-2\">\r\n                            <p id=\"all\" class=\"button active\">All Grants</p>\r\n                        </div>\r\n                        <div class=\"col-2\">\r\n                            <p id=\"parteien\" class=\"button\">Urheber</p>\r\n                        </div>\r\n                        <div class=\"col-2\">\r\n                            <p id=\"themenbereich\" class=\"button\">Themenbereich</p>\r\n                        </div>\r\n                        <div class=\"col-2\">\r\n                            <p id=\"instrument\" class=\"button\">Instrument</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div id=\"vis\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

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
            BubbleChart.initialize(changes.data.currentValue);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "data", void 0);
    BubbleChartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-bubble-chart',
            template: __webpack_require__("./src/app/main/bubble-chart/bubble-chart.component.html"),
            styles: [__webpack_require__("./src/app/main/bubble-chart/bubble-chart.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BubbleChartComponent);
    return BubbleChartComponent;
}());



/***/ }),

/***/ "./src/app/main/main.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "<app-bubble-chart [data]=\"data\"></app-bubble-chart>\r\n<app-bootstrap-table *ngIf=\"data\"\r\n                       [data]=\"data\"\r\n                       [title]=\"'Politdaten'\"\r\n                       [initialSortBy]=\"'mandat'\">\r\n</app-bootstrap-table>"

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
            _this.data = data;
        }, function (err) {
            alert('An error occurred. See console for details.');
            console.log(err);
        });
    };
    MainComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
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

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\r\n  <a class=\"navbar-brand\" href=\"#\">\r\n    <img src=\"\" width=\"30\" height=\"30\" alt=\"\">\r\n    Politmonitoring\r\n  </a>\r\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n    <ul class=\"navbar-nav\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [routerLinkActive]=\"['active']\" [routerLink]=\"['/home']\">Home</a>\r\n      </li>\r\n      <li class=\"nav-item\" *ngIf=\"admin\">\r\n        <a class=\"nav-link\"[routerLinkActive]=\"['active']\" [routerLink]=\"['/upload']\">Daten hochladen</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>"

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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], NavbarComponent.prototype, "admin", void 0);
    NavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-navbar',
            template: __webpack_require__("./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/shared/bootstrap-table/bootstrap-table.component.css":
/***/ (function(module, exports) {

module.exports = "#pageView {\r\n    padding-right: 5px;\r\n    padding-left: 5px;\r\n}\r\n\r\nth.titleCol {\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n}\r\n\r\nth.titleCol:hover {\r\n    background-color: #f5f5f5;\r\n}\r\n\r\nth.titleCol p {\r\n    position: relative;\r\n    padding-right: 30px;\r\n}\r\n\r\nth.titleCol i {\r\n    margin-left: 7px;\r\n}\r\n\r\n#paginationWrapper {\r\n    position: absolute;\r\n    right: 20px;\r\n    top: 75px;\r\n}\r\n\r\n.highlight {\r\n  cursor: pointer;\r\n}\r\n\r\n#table {\r\n    margin-top: 50px;\r\n}\r\n\r\n#tableWrapper {\r\n    overflow-x: scroll;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/shared/bootstrap-table/bootstrap-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"card-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-8\">\r\n            <h2>{{title}} ({{data.length}})</h2>\r\n          </div>\r\n          <div class=\"col-4\">\r\n            <div class=\"row\">\r\n              <div class=\"input-group col-12\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\" id=\"input_search_addon\">\r\n                     <i class=\"fa fa-search\"></i>\r\n                  </span>\r\n                </div>\r\n                <input id=\"search\" type=\"text\" class=\"form-control\" [(ngModel)]=\"searchString\" (ngModelChange)=\"filterData(searchString)\" aria-describedby=\"input_search_addon\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div id=\"paginationWrapper\">\r\n            <ul class=\"pagination\">\r\n              <li [class.disabled]=\"pagination.start === 0\" [class.waves-effect]=\"pagination.start !== 0\"><a (click)=\"pageBack()\"><i class=\"fas fa-chevron-left\"></i></a></li>\r\n              <li id=\"pageView\">{{pagination.start}} - {{pagination.end}} / {{dataAfterFilter.length}}</li>\r\n              <li [class.disabled]=\"pagination.end === dataAfterFilter.length\" [class.waves-effect]=\"pagination.end !== dataAfterFilter.length\"><a (click)=\"pageUp()\"><i class=\"fas fa-chevron-right\"></i></a></li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-12\">\r\n            <div id=\"tableWrapper\">\r\n              <table id=\"table\" class=\"table highlight table-hover\">\r\n                <tr>\r\n                  <th class=\"titleCol\" *ngFor=\"let col of data[0] | keys\" (click)=\"changeSortBy(col)\">\r\n                    <p>{{col}}\r\n                      <i *ngIf=\"col === sort.sortBy && sort.asc\" class=\"fas fa-chevron-up\"></i>\r\n                      <i *ngIf=\"col === sort.sortBy && !sort.asc\" class=\"fas fa-chevron-down\"></i></p>\r\n                  </th>\r\n                </tr>\r\n                <tr #table *ngFor=\"let entry of dataAfterFilter | sortBy: sort.sortBy: sort.asc | slice:pagination.start:pagination.end\"\r\n                    (click)=\"selectEntry(entry)\">\r\n                  <td *ngFor=\"let col of entry | keys\">\r\n                    <span *ngIf=\"entry[col]\" [innerHTML]=\"entry[col].toString() | highlight:searchString\"></span>\r\n                    <span *ngIf=\"!entry[col]\"></span>\r\n                  </td>\r\n                </tr>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

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
        this.selectEntryEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
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
    BootstrapTableComponent.prototype.ngOnInit = function () {
        this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
        this.pagination.numberPages = Math.ceil(this.data.length / this.pagination.numberOfEntries);
        this.sort.sortBy = this.initialSortBy;
        this.dataAfterFilter = this.data;
    };
    BootstrapTableComponent.prototype.filterData = function (searchTerm) {
        var list = this.data;
        var result = [];
        if (typeof list === 'undefined' || typeof searchTerm === 'undefined' || searchTerm === '')
            this.dataAfterFilter = this.data;
        var found;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var entry = list_1[_i];
            found = false;
            for (var key in entry) {
                if (entry.hasOwnProperty(key)) {
                    // debugger;
                    if (entry[key] !== null && entry[key].toString().toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1) {
                        found = true;
                    }
                }
            }
            if (found) {
                result.push(entry);
            }
        }
        this.dataAfterFilter = result;
        this.setPaginationToStart();
        // if result length is smaller than numberOfEntries, we have to adapt pagination end
        this.pagination.end = Math.min(this.pagination.end + this.pagination.numberOfEntries, this.dataAfterFilter.length);
    };
    BootstrapTableComponent.prototype.pageBack = function () {
        if (this.pagination.start !== 0) {
            this.pagination.start = Math.max(this.pagination.start - this.pagination.numberOfEntries, 0);
            this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
        }
    };
    BootstrapTableComponent.prototype.pageUp = function () {
        if (this.pagination.end !== this.dataAfterFilter.length) {
            this.pagination.start = this.pagination.start + this.pagination.numberOfEntries;
            this.pagination.end = Math.min(this.pagination.end + this.pagination.numberOfEntries, this.dataAfterFilter.length);
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
    BootstrapTableComponent.prototype.setPaginationToStart = function () {
        this.pagination.start = 0;
        this.pagination.end = this.pagination.numberOfEntries;
    };
    BootstrapTableComponent.prototype.selectEntry = function (entry) {
        this.selectEntryEvent.emit(entry);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], BootstrapTableComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], BootstrapTableComponent.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], BootstrapTableComponent.prototype, "initialSortBy", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], BootstrapTableComponent.prototype, "selectEntryEvent", void 0);
    BootstrapTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
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
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
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

module.exports = "<p>\r\n  upload works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/upload/upload.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadComponent; });
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

var UploadComponent = /** @class */ (function () {
    function UploadComponent() {
    }
    UploadComponent.prototype.ngOnInit = function () {
    };
    UploadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-upload',
            template: __webpack_require__("./src/app/upload/upload.component.html"),
            styles: [__webpack_require__("./src/app/upload/upload.component.css")]
        }),
        __metadata("design:paramtypes", [])
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
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