/**
 * Author:    Anbarasan Swaminathan
 * Created:   15-Aug-2016
 *
 * Built for the Code Challenge for Meetyl corp
 **/
System.register(['angular2/platform/browser', 'angular2/core', 'angular2/common', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, common_1;
    var Mission, AddMission, EditMission, MissionsList;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (_1) {}],
        execute: function() {
            Mission = (function () {
                function Mission() {
                    this.missionsStorage = localStorage.getItem("Missionentry");
                    /*if running for the first time, check if data is present in localstorage or create an empty arra to populate with form data when adding new data*/
                    if (this.missionsStorage == null) {
                        localStorage.setItem("Missionentry", "[]");
                    }
                    else {
                        console.log("Not Empty");
                    }
                }
                Mission.prototype.addMission = function (entry) {
                    var oldMissions = JSON.parse(localStorage.getItem("Missionentry"));
                    oldMissions.push(entry);
                    localStorage.setItem("Missionentry", JSON.stringify(oldMissions));
                    alert("new Mission Added");
                    return true;
                };
                Mission.prototype.deleteMission = function (index) {
                    var newmissionsStorage = JSON.parse(this.missionsStorage);
                    newmissionsStorage.splice(index, 1);
                    localStorage.setItem("Missionentry", JSON.stringify(newmissionsStorage));
                    alert("Mission Deleted");
                };
                return Mission;
            }());
            /*Data Control component on the right - Add Module*/
            AddMission = (function () {
                function AddMission(builder) {
                    this.builder = builder;
                    this.missionControl = new Mission;
                    this.submitAttempt = false;
                    this.missionname = new common_1.Control('', common_1.Validators.required);
                    this.missiondate = new common_1.Control('', common_1.Validators.required);
                    this.missionnote = new common_1.Control('', common_1.Validators.required);
                    this.missionstatus = new common_1.Control('', common_1.Validators.required);
                    this.missiondesc = new common_1.Control('', common_1.Validators.required);
                    this.newentry = builder.group({
                        missionname: this.missionname,
                        missiondate: this.missiondate,
                        missionnote: this.missionnote,
                        missionstatus: this.missionstatus,
                        missiondesc: this.missiondesc
                    });
                }
                AddMission.prototype.addEntry = function (entry) {
                    this.submitAttempt = true;
                    if (this.newentry.valid) {
                        this.missionControl.addMission(entry);
                    }
                    else {
                        alert("Complete form before submitting");
                    }
                };
                AddMission = __decorate([
                    core_1.Component({
                        selector: 'add-mission',
                        template: "\n        <div class=\"col s12 m6\" id=\"mission-control-col\">\n          <div class=\"row\">\n            <form [ngFormModel]=\"newentry\" (ngSubmit) = \"addEntry(newentry.value)\" class=\"col s12\" id=\"add-form\">\n              <h3> Add new Entry </h3>\n              <div class=\"input-field col s12 form-group\">\n                <input id=\"mission-name\" type=\"text\" ngControl=\"missionname\" [ngClass]=\"{ 'invalid' : !missionname.valid && submitAttempt }\">\n                <label for=\"mission-name\"> Mission Name </label>\n              </div>\n              <div class=\"input-field col s12 form-group\">\n                <input type=\"text\" id=\"mission-date\" ngControl=\"missiondate\" [ngClass]=\"{ 'invalid' : !missiondate.valid && submitAttempt }\">\n                <label for=\"mission-date\"> Launch Date </label>\n              </div>\n              <div class=\"input-field col s6 form-group\">\n                <input id=\"mission-note\" type=\"text\" ngControl=\"missionnote\" [ngClass]=\"{ 'invalid' : !missionnote.valid && submitAttempt }\">\n                <label for=\"short-note\"> Short Note </label> \n              </div>\n              <div class=\"input-field col s6 form-group\">\n                <input id=\"status\" type=\"text\" ngControl=\"missionstatus\" [ngClass]=\"{ 'invalid' : !missionstatus.valid && submitAttempt }\">\n                <label for=\"status\"> Status </label> \n              </div>\n              <div class=\"input-field col s12 form-group\">\n                <textarea id=\"mission-desc\" class=\"materialize-textarea\" ngControl=\"missiondesc\"  [ngClass]=\"{ 'invalid' : !missiondesc.valid && submitAttempt }\"></textarea>\n                <label for=\"mission-desc\"> Mission Description </label>\n              </div>\n              <button class=\"btn waves-effect waves-light blue right\" type=\"submit\" name=\"action\">Submit\n                <i class=\"material-icons right\">send</i>\n              </button>\n            </form>\n          </div>\n        </div>\n      \n\t",
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object])
                ], AddMission);
                return AddMission;
                var _a;
            }());
            exports_1("AddMission", AddMission);
            /*Data Control component on the right - Add Module*/
            EditMission = (function () {
                function EditMission(builder) {
                    this.builder = builder;
                    this.submitAttempt = false;
                    this.missionname = new common_1.Control('', common_1.Validators.required);
                    this.missiondate = new common_1.Control('', common_1.Validators.required);
                    this.missionnote = new common_1.Control('', common_1.Validators.required);
                    this.missionstatus = new common_1.Control('', common_1.Validators.required);
                    this.missiondesc = new common_1.Control('', common_1.Validators.required);
                    this.editentry = builder.group({
                        missionname: this.missionname,
                        missiondate: this.missiondate,
                        missionnote: this.missionnote,
                        missionstatus: this.missionstatus,
                        missiondesc: this.missiondesc
                    });
                }
                EditMission.prototype.editEntry = function (entry) {
                    this.submitAttempt = true;
                    /*Posts the data only if all the fields filled*/
                    if (this.editentry.valid) {
                        /*get the existing array from the localstorage and change it into an Object*/
                        this.editMissions = (JSON.parse(localStorage.getItem("Missionentry")));
                        /*Change the nth object using the obtained indexvalue*/
                        this.editMissions[this.editIndexvalue] = entry;
                        /*Stringify the object since local storage does not accept JSON objects*/
                        this.editMissions = JSON.stringify(this.editMissions);
                        /*Update the local storage after every change*/
                        localStorage.setItem("Missionentry", this.editMissions);
                        alert("Mission Edited");
                    }
                    else {
                        alert("Please fill all the details");
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], EditMission.prototype, "editIndex", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], EditMission.prototype, "editIndexvalue", void 0);
                EditMission = __decorate([
                    core_1.Component({
                        selector: 'edit-mission',
                        template: "\n        <div class=\"col s12 m6\" id=\"mission-control-col\">\n          <div class=\"row\">\n            <form [ngFormModel]=\"editentry\" (ngSubmit) = \"editEntry(editentry.value)\" class=\"col s12\" id=\"add-form\">\n              <h3> Edit Mission </h3>\n              <div class=\"input-field col s12 form-group\">\n                <input id=\"mission-name\" type=\"text\" ngControl=\"missionname\" [ngModel]=\"editIndex.missionname\" [ngClass]=\"{ 'invalid' : !missionname.valid && submitAttempt }\">\n                <label class=\"active\" for=\"mission-name\"> Mission Name </label>\n              </div>\n              <div class=\"input-field col s12 form-group\">\n                <input type=\"text\" id=\"mission-date\" ngControl=\"missiondate\" [ngModel]=\"editIndex.missiondate\" [ngClass]=\"{ 'invalid' : !missiondate.valid && submitAttempt }\">\n                <label class=\"active\" for=\"mission-date\"> Launch Date </label>\n              </div>\n              <div class=\"input-field col s6 form-group\">\n                <input id=\"mission-note\" type=\"text\" ngControl=\"missionnote\" [ngModel]=\"editIndex.missionnote\" [ngClass]=\"{ 'invalid' : !missionnote.valid && submitAttempt }\">\n                <label class=\"active\" for=\"short-note\"> Short Note </label> \n              </div>\n              <div class=\"input-field col s6 form-group\">\n                <input id=\"status\" type=\"text\" ngControl=\"missionstatus\" [ngModel]=\"editIndex.missionstatus\" [ngClass]=\"{ 'invalid' : !missionstatus.valid && submitAttempt }\">\n                <label class=\"active\" for=\"status\"> Status </label> \n              </div>\n              <div class=\"input-field col s12 form-group\">\n                <textarea id=\"mission-desc\" class=\"materialize-textarea\" ngControl=\"missiondesc\" [ngModel]=\"editIndex.missiondesc\"  [ngClass]=\"{ 'invalid' : !missiondesc.valid && submitAttempt }\"></textarea>\n                <label class=\"active\" for=\"mission-desc\"> Mission Description </label>\n              </div>\n              <button class=\"btn waves-effect waves-light blue right\" type=\"submit\" name=\"action\">Submit\n                <i class=\"material-icons right\">send</i>\n              </button>\n            </form>\n          </div>\n        </div>\n      \n\t",
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object])
                ], EditMission);
                return EditMission;
                var _a;
            }());
            exports_1("EditMission", EditMission);
            /*List Missions component on the left*/
            MissionsList = (function () {
                function MissionsList() {
                    this.rightViews = ''; //string to change the views on the left column
                    this.missionControl = new Mission;
                    /*This give the value for the main table list*/
                    this.missionList = JSON.parse(localStorage.getItem("Missionentry"));
                }
                /*Shows the current item details and changes the view on the right column*/
                MissionsList.prototype.viewMission = function (view, index) {
                    this.rightViews = view;
                    var missions = JSON.parse(localStorage.getItem("Missionentry"))[index];
                    this.mission = missions;
                    this.currentIndex = index;
                    this.editIndex = null;
                    this.editIndexvalue = null;
                };
                /*Changed the view on the right to add new Mission*/
                MissionsList.prototype.addMission = function (view) {
                    this.rightViews = view;
                    this.editIndex = null;
                    this.editIndexvalue = null;
                };
                /*Changes the view on right to edit the currently selected item*/
                MissionsList.prototype.editMission = function (view, index) {
                    this.rightViews = view;
                    var editEntry = JSON.parse(localStorage.getItem("Missionentry"))[index];
                    this.editIndex = editEntry;
                    this.editIndexvalue = index;
                };
                /*Deletes the current JSON element from the object*/
                MissionsList.prototype.deleteMission = function (index) {
                    this.missionControl.deleteMission(index);
                };
                MissionsList = __decorate([
                    core_1.Component({
                        selector: 'mission-list',
                        template: "\n\t<div class=\"row mission-list\">\n        <div class=\"col s12 m6\" id=\"mission-list-col\">\n          <button class=\"btn waves-effect waves-light blue right\" (click) = \"addMission('addMission')\">Add New</button>\n          <div>\n           <table class=\"striped\">\n            <thead>\n              <tr>\n                <th data-field=\"id\">Mission</th>\n                <th data-field=\"name\">Launch Date</th>\n                <th data-field=\"price\">Notes</th>\n              </tr>\n            </thead>\n\n            <tbody *ngFor = \"let mission of missionList;let i = index\">\n              <tr (click) = \"viewMission('viewMission', i)\">\n                <td>{{mission.missionname}}</td>\n                <td>{{mission.missiondate}}</td>\n                <td>{{mission.missionnote}}</td>\n              </tr>\n            </tbody>\n          </table>\n\n        </div>\n      </div>\n      <div [ngSwitch]=\"rightViews\"> \n        <div *ngSwitchWhen=\"'addMission'\">\n          <add-mission> </add-mission>\n        </div>\n        <div *ngSwitchWhen=\"'editMission'\">\n          <edit-mission [editIndex] = 'editIndex' [editIndexvalue] = 'editIndexvalue'> </edit-mission>\n        </div>\n        <div *ngSwitchWhen=\"'viewMission'\" class=\"viewMission\">\n          <div class=\"col s12 m6\" id=\"mission-control-col\">\n            <div class=\"row\">\n              <div>\n                <div class=\"card blue-grey darken-1\">\n                  <div class=\"card-content white-text\">\n                    <span class=\"card-title\"><h4>{{mission.missionname}}</h4></span>\n                    <p><i>Launch Date</i> : {{mission.missiondate}} </p><br>\n                    <p><i>Short Note</i> : {{mission.missionnote}} </p><br>\n                    <p><i>Status</i> : {{mission.missionstatus}} </p><br>\n                    <p><i>Description</i></p> <blockquote>{{mission.missiondesc}}</blockquote>\n                  </div>\n                  <div class=\"card-action\">\n                   <button class=\"btn waves-effect waves-light blue left\" (click) = \"editMission('editMission', currentIndex)\">Edit       </button>\n\n                   <button class=\"btn waves-effect waves-light red accent-2 right\" (click) = \"deleteMission(currentIndex)\">Delete       </button>\n                 </div>\n               </div>\n             </div>\n           </div>\n         </div>\n       </div>\n       <div *ngSwitchDefault class=\"welcome-message\"> <h4> Hi! Click on the Add New button to add new Missions or click on any existing entry to review them.</h4> </div>\n     </div>\n   </div>\n\t",
                        directives: [AddMission, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault, EditMission]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MissionsList);
                return MissionsList;
            }());
            browser_1.bootstrap(MissionsList);
        }
    }
});
//# sourceMappingURL=app.js.map