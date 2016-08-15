/**
 * Author:    Anbarasan Swaminathan
 * Created:   15-Aug-2016
 * 
 * Built for the Code Challenge for Meetyl corp
 **/

import {bootstrap} from 'angular2/platform/browser';
import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
import 'rxjs/Rx';

class Mission{

	missionsStorage : string;

	constructor(){
		this.missionsStorage = localStorage.getItem("Missionentry");

		/*if running for the first time, check if data is present in localstorage or create an empty arra to populate with form data when adding new data*/
		if(this.missionsStorage == null){
			localStorage.setItem("Missionentry","[]");
		}else{
			console.log("Not Empty");
		}
		
	}

	addMission(entry){
		let oldMissions = JSON.parse(localStorage.getItem("Missionentry"));
		oldMissions.push(entry);
		localStorage.setItem("Missionentry", JSON.stringify(oldMissions));	

		alert("new Mission Added");

		return true;	
	}

	deleteMission(index){
		let newmissionsStorage = JSON.parse(this.missionsStorage);
		newmissionsStorage.splice(index, 1);
		localStorage.setItem("Missionentry", JSON.stringify(newmissionsStorage));

		alert("Mission Deleted");
	}


}

/*Data Control component on the right - Add Module*/

@Component({
	selector: 'add-mission',
	template: `
        <div class="col s12 m6" id="mission-control-col">
          <div class="row">
            <form [ngFormModel]="newentry" (ngSubmit) = "addEntry(newentry.value)" class="col s12" id="add-form">
              <h3> Add new Entry </h3>
              <div class="input-field col s12 form-group">
                <input id="mission-name" type="text" ngControl="missionname" [ngClass]="{ 'invalid' : !missionname.valid && submitAttempt }">
                <label for="mission-name"> Mission Name </label>
              </div>
              <div class="input-field col s12 form-group">
                <input type="text" id="mission-date" ngControl="missiondate" [ngClass]="{ 'invalid' : !missiondate.valid && submitAttempt }">
                <label for="mission-date"> Launch Date </label>
              </div>
              <div class="input-field col s6 form-group">
                <input id="mission-note" type="text" ngControl="missionnote" [ngClass]="{ 'invalid' : !missionnote.valid && submitAttempt }">
                <label for="short-note"> Short Note </label> 
              </div>
              <div class="input-field col s6 form-group">
                <input id="status" type="text" ngControl="missionstatus" [ngClass]="{ 'invalid' : !missionstatus.valid && submitAttempt }">
                <label for="status"> Status </label> 
              </div>
              <div class="input-field col s12 form-group">
                <textarea id="mission-desc" class="materialize-textarea" ngControl="missiondesc"  [ngClass]="{ 'invalid' : !missiondesc.valid && submitAttempt }"></textarea>
                <label for="mission-desc"> Mission Description </label>
              </div>
              <button class="btn waves-effect waves-light blue right" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      
	`,
	directives: [FORM_DIRECTIVES]
})

export class AddMission{

	missionControl = new Mission;

	newentry: ControlGroup;
	missionname: Control;
	missiondate: Control;
	missionnote: Control;
	missionstatus: Control;
	missiondesc: Control;
	submitAttempt: boolean = false;

	constructor(private builder: FormBuilder){
		this.missionname = new Control('', Validators.required);
		this.missiondate = new Control('', Validators.required);
		this.missionnote = new Control('', Validators.required);
		this.missionstatus = new Control('', Validators.required);
		this.missiondesc = new Control('', Validators.required);

		this.newentry = builder.group({
			missionname: this.missionname,
			missiondate: this.missiondate,
			missionnote: this.missionnote,
			missionstatus: this.missionstatus,
			missiondesc: this.missiondesc
		});
	}
	addEntry(entry){
		this.submitAttempt = true;

		if(this.newentry.valid){
			this.missionControl.addMission(entry);
		}else{
			alert("Complete form before submitting");
		}
	}
}

/*Data Control component on the right - Add Module*/

@Component({
	selector: 'edit-mission',
	template: `
        <div class="col s12 m6" id="mission-control-col">
          <div class="row">
            <form [ngFormModel]="editentry" (ngSubmit) = "editEntry(editentry.value)" class="col s12" id="add-form">
              <h3> Edit Mission </h3>
              <div class="input-field col s12 form-group">
                <input id="mission-name" type="text" ngControl="missionname" [ngModel]="editIndex.missionname" [ngClass]="{ 'invalid' : !missionname.valid && submitAttempt }">
                <label class="active" for="mission-name"> Mission Name </label>
              </div>
              <div class="input-field col s12 form-group">
                <input type="text" id="mission-date" ngControl="missiondate" [ngModel]="editIndex.missiondate" [ngClass]="{ 'invalid' : !missiondate.valid && submitAttempt }">
                <label class="active" for="mission-date"> Launch Date </label>
              </div>
              <div class="input-field col s6 form-group">
                <input id="mission-note" type="text" ngControl="missionnote" [ngModel]="editIndex.missionnote" [ngClass]="{ 'invalid' : !missionnote.valid && submitAttempt }">
                <label class="active" for="short-note"> Short Note </label> 
              </div>
              <div class="input-field col s6 form-group">
                <input id="status" type="text" ngControl="missionstatus" [ngModel]="editIndex.missionstatus" [ngClass]="{ 'invalid' : !missionstatus.valid && submitAttempt }">
                <label class="active" for="status"> Status </label> 
              </div>
              <div class="input-field col s12 form-group">
                <textarea id="mission-desc" class="materialize-textarea" ngControl="missiondesc" [ngModel]="editIndex.missiondesc"  [ngClass]="{ 'invalid' : !missiondesc.valid && submitAttempt }"></textarea>
                <label class="active" for="mission-desc"> Mission Description </label>
              </div>
              <button class="btn waves-effect waves-light blue right" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      
	`,
	directives: [FORM_DIRECTIVES]
})

export class EditMission{

	@Input() editIndex: string;
	@Input() editIndexvalue: number;

	editMissions : string;

	editentry: ControlGroup;
	missionname: Control;
	missiondate: Control;
	missionnote: Control;
	missionstatus: Control;
	missiondesc: Control;
	submitAttempt: boolean = false;

	constructor(private builder: FormBuilder){
		this.missionname = new Control('', Validators.required);
		this.missiondate = new Control('', Validators.required);
		this.missionnote = new Control('', Validators.required);
		this.missionstatus = new Control('', Validators.required);
		this.missiondesc = new Control('', Validators.required);

		this.editentry = builder.group({
			missionname: this.missionname,
			missiondate: this.missiondate,
			missionnote: this.missionnote,
			missionstatus: this.missionstatus,
			missiondesc: this.missiondesc
		});
	}
	editEntry(entry){
		this.submitAttempt = true;

		/*Posts the data only if all the fields filled*/
		if(this.editentry.valid){

			/*get the existing array from the localstorage and change it into an Object*/
			this.editMissions = (JSON.parse(localStorage.getItem("Missionentry")));

			/*Change the nth object using the obtained indexvalue*/
			this.editMissions[this.editIndexvalue] = entry;

			/*Stringify the object since local storage does not accept JSON objects*/
			this.editMissions = JSON.stringify(this.editMissions);

			/*Update the local storage after every change*/
			localStorage.setItem("Missionentry", this.editMissions);

			alert("Mission Edited");

		}else{
			alert("Please fill all the details");
		}
	}
}





/*List Missions component on the left*/
@Component({
	selector: 'mission-list',
	template:	`
	<div class="row mission-list">
        <div class="col s12 m6" id="mission-list-col">
          <button class="btn waves-effect waves-light blue right" (click) = "addMission('addMission')">Add New</button>
          <div>
           <table class="striped">
            <thead>
              <tr>
                <th data-field="id">Mission</th>
                <th data-field="name">Launch Date</th>
                <th data-field="price">Notes</th>
              </tr>
            </thead>

            <tbody *ngFor = "let mission of missionList;let i = index">
              <tr (click) = "viewMission('viewMission', i)">
                <td>{{mission.missionname}}</td>
                <td>{{mission.missiondate}}</td>
                <td>{{mission.missionnote}}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div [ngSwitch]="rightViews"> 
        <div *ngSwitchWhen="'addMission'">
          <add-mission> </add-mission>
        </div>
        <div *ngSwitchWhen="'editMission'">
          <edit-mission [editIndex] = 'editIndex' [editIndexvalue] = 'editIndexvalue'> </edit-mission>
        </div>
        <div *ngSwitchWhen="'viewMission'" class="viewMission">
          <div class="col s12 m6" id="mission-control-col">
            <div class="row">
              <div>
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title"><h4>{{mission.missionname}}</h4></span>
                    <p><i>Launch Date</i> : {{mission.missiondate}} </p><br>
                    <p><i>Short Note</i> : {{mission.missionnote}} </p><br>
                    <p><i>Status</i> : {{mission.missionstatus}} </p><br>
                    <p><i>Description</i></p> <blockquote>{{mission.missiondesc}}</blockquote>
                  </div>
                  <div class="card-action">
                   <button class="btn waves-effect waves-light blue left" (click) = "editMission('editMission', currentIndex)">Edit       </button>

                   <button class="btn waves-effect waves-light red accent-2 right" (click) = "deleteMission(currentIndex)">Delete       </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div *ngSwitchDefault class="welcome-message"> <h4> Hi! Click on the Add New button to add new Missions or click on any existing entry to review them.</h4> </div>
     </div>
   </div>
	`,
	directives: [AddMission, NgSwitch, NgSwitchWhen, NgSwitchDefault, EditMission]
})

class MissionsList{

	missionList: string; //string to hold the Json file stored in local storage
	rightViews = ''; //string to change the views on the left column
	mission: string; //value container used for the HTML DOM
	currentIndex: number; //value to store the index of the current JSON object


	missionControl = new Mission;

	editIndex: string;
	editIndexvalue: number;

	constructor(){
		/*This give the value for the main table list*/
		this.missionList = JSON.parse(localStorage.getItem("Missionentry"));
	}


	/*Shows the current item details and changes the view on the right column*/
	viewMission(view, index){
		this.rightViews = view;
		let missions = JSON.parse(localStorage.getItem("Missionentry"))[index];
		this.mission = missions;
		this.currentIndex = index;
		this.editIndex = null;
		this.editIndexvalue = null;
	}

	/*Changed the view on the right to add new Mission*/
	addMission(view){
		this.rightViews = view;
		this.editIndex = null;
		this.editIndexvalue = null;
	}

	/*Changes the view on right to edit the currently selected item*/
	editMission(view, index){
		this.rightViews = view;
		let editEntry = JSON.parse(localStorage.getItem("Missionentry"))[index];
		this.editIndex = editEntry;
		this.editIndexvalue = index;
	}

	/*Deletes the current JSON element from the object*/
	deleteMission(index){
		this.missionControl.deleteMission(index);
	}
}

bootstrap(MissionsList);