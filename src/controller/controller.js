const CalendarControler = require("./calendarController.js");
const ViewController = require("./viewController.js");
const StreckenController = require("./streckenController.js")
const DialogController = require("./dialogController.js")
const DB = require("./dbController.js");

class Controller{
    constructor(doc){   
        
        /*
        this.yearMap = new Map();
        this.routeMap = new Map();
        this.addressMap = new Map();
        */

        this.doc = doc;
        this.viewController =new ViewController(this.doc);
       
        this.streckenController = new StreckenController(this.doc);
		this.dialogController = new DialogController(this.doc);
		this.calendarController = new CalendarControler(this.doc, this.dayViewController, this.yearMap, this.routeMap, this.addressMap);
    }

    ini(){
        event(this.doc, this.viewController,this.calendarController, this.streckenController,this.dialogController);
        this.streckenController.ini();
 		this.calendarController.iniCalendar();
		this.viewController.ini();
    
    }

}

module.exports = Controller;




function  getDateFromMemory(doc){
	
	var z = doc.split(',');
	return new Date(z[0],z[1]-1,z[2]);
}

function event(doc,viewController, calendarController, streckenController,dialogController){
	doc.onclick = function(event){

		let et = event.target;
		
		
		if (et.matches('.calendar_link_prev')){
			calendarController.prevMonth(doc);
			viewController.ini();
		}
		else if  (et.matches('.calendar_link_next')){
			 
			calendarController.nextMonth(doc);
			viewController.ini();
		}

		else if (et.matches('.calendar_entry')){
			
			
			viewController.setDayView(event);
			calendarController.changeClickedDay(event);

		}

		//-- Strecken Btns
		else if (et.matches('.containerDiv')){
		
		   let div = event.target
		   streckenController.clickStreckenListItem(div);

	   }

	   else if (et.id == "addStreckeToDay"){
		 
		   streckenController.clickAddStreckeToDay()
		   viewController.refreshView();
	   }

	   else if(et.matches(".sortBy")){
		 
		   streckenController.clickSortBy(event);
	   }

	   else if(et.matches('.startOrtSelect')){
			dialogController.clickStartOrtSelect();
	   }

	   else if(et.matches('.zielOrtSelect')){
		   dialogController.clickZielOrtSelect();
		}
		
		//-- dialog Btns
		else if (et.id == "newStreckenBtn" || et.id == "newStreckeAbrBtn"){
			dialogController.toggleDialog();
		}

		else if (et.id == "newStreckeOkBtn"){

			dialogController.creatNewStrecke();
			streckenController.ini();
		}

		else if (et.matches('.steckenListItemCheckBox')){
			alert(".steckenListItemCheckBox")
			streckenController.clickCheckBoxForFirtsTrack(event.target);
		}
		
	}

}