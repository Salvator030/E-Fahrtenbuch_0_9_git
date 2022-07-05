const DB = require('./dbController.js')
class ViewController{
    constructor(doc){
       this.doc = doc;
       this.dayArray =[];
       this.monthArray =[];
    }
        
    setDayView(event){
        setDayViewDate(this.doc, event);
        setDayArray(this.doc.getElementById("dayViewDate").innerHTML = event.target.value, this.dayArray);
        setDayViewList(this.doc,this.dayArray);
        setDayViewStreckenAnz(this.doc, this.dayArray);
        setDayViewKm(this.doc, this.dayArray);
    }

    refreshView(){
        setDayArray(this.doc.getElementById("dayViewDate").innerHTML,this.dayArray);
 
        setDayViewList(this.doc,this.dayArray);
        setDayViewStreckenAnz(this.doc, this.dayArray);
        setDayViewKm(this.doc, this.dayArray);
    }
    ini(){
      
      
        setMonthArray(this.doc, this.monthArray);
        setMonthViewKm(this.doc, this.monthArray);
        setMonthViewStrecken(this.doc, this.monthArray);
    }

    clearDayViewList(){
        let dayViewList = this.doc.getElementById("dayViewList");
          
            while (dayViewList.lastChild){
                dayViewList.lastChild.remove();
            };
    }

    
}





module.exports = ViewController;




function setDayArray(date,dayArray){
// get the driven Tracks by the chosen day
    let array;
    try{
      array = DB.getFullDrivenTracksByDate(date)
    }
    catch(e){
        alert("setDayArray\n " + e);
    }

    let count = array.length
    dayArray.length = 0;
    for ( let i = 0; i < count; i++){
        dayArray.push(array[i]);
    }
  
}



function setDayViewList(doc,array){
    //set the View of the driven Tracks by the chosen day


  
        let dayViewList = doc.getElementById("dayViewList");
      
        while (dayViewList.lastChild){
            dayViewList.lastChild.remove();
        };
      
        for (let i = 0; i < array.length; i++){
            let div = doc.createElement("div");
            div.id = "dayViewListItem_" + i;
            div.value = array[i];
                            let table = doc.createElement("table");
                table.classList.add("dayViewListItem")
                table.innerHTML = "<tr><td>Start</td></tr>" + 
                                "<tr><td class='steckenListItemStr'>" + array[i].startStr + "</td>" +
                                "<td class='steckenListItemHnr'>" + array[i].startHnr + "</td>" +
                                "<td class='steckenListItemPlz'>" + array[i].startPlz + "</td>" +
                                "<td class='steckenListItemOrt'>" + array[i].startOrt + "</td>" +
                                "</tr>" +
                                "<tr><td>Ziel</td></tr>" +
                               "<tr><td class='steckenListItemStr'>" + array[i].zielStr + "</td>" +
                               "<td class='steckenListItemHnr'>" + array[i].zielHnr + "</td>" + 
                               "<td class='steckenListItemPlz'>" + array[i].zielPlz + "</td>" +
                               "<td class='steckenListItemOrt'>" + array[i].zielOrt + "</td>" +
                              
                            // "<td class='steckenListItemRemoveBtn'><button id='steckenListItemRemoveBtn" + i  + "'>entfernen</button></td>" >
                               "</tr>";    

                let btn = document.createElement("button");
                btn.id = "dayViewListItemRemoveBtn_" + i ;
                
                div.appendChild(table);
                div.appendChild(btn);
                dayViewList.appendChild(div);
            };
    }



function setMonthArray(doc, monthArray){

    //get the driveen tracks from the db by the chosen Mnth
   // var date = doc.getElementById("dayViewDate").innerHTML;
  
    let date = (getDateFromMemory(doc.all.date_memory.innerHTML));
  
    let month = (date.getMonth() +1).toString(); ;
    let year = date.getFullYear();
    
    if (month.length == 1 ){
        month = "0" + month;
    }
    date = year + "-" + month +  "-01" 
     
    let array;
    try{
        array = DB.getDrivenTracksByMonthAndYear(date);
      
    }
    catch(e){
        alert("setMonthArray\n " + e)
    }

  monthArray.length = 0;
  let count = array.length;
  for (var i = 0; i < count; i++){
    monthArray.push(array[i]);
  }

}


function  getDateFromMemory(doc){
	
	var z = doc.split(',');
	return new Date(z[0],z[1]-1,z[2]);
}

function setMonthViewStrecken(doc,array){
  
    doc.getElementById("monthViewStrecken").innerHTML = array.length;
   
}
 
function setMonthViewKm(doc, array){
   
 let count = 0;
 
    for (let i = 0; i < array.length; i++){
      
        count += array[i].km;
    }
    doc.getElementById("monthViewKm").innerHTML = count
}

function setDayViewDate(doc, event){
    doc.getElementById("dayViewDate").innerHTML = event.target.value;

}

function setDayViewStreckenAnz(doc, array){
  
    if (array.length != undefined){
        doc.getElementById("dayViewStreckenAnz").innerHTML = array.length;
    }
    else{
       doc.getElementById("dayViewStreckenAnz").innerHTML = "0";
    }
}

function setDayViewKm(doc,array){

    let count = 0;
    if (array.length != undefined){
        for (let i = 0; i < array.length; i++){
            count += array[i].km;
        }
        doc.getElementById("dayViewKm").innerHTML = count
    }
    else{
        doc.getElementById("dayViewKm").innerHTML = "0"
    }
}

function getRoutsByDate(date){
    let array ;
    try{
        DB.getDrivenRoutesByDate(date)
    }
    catch(e){
        alert(e);
    }
}

/*
function getKmByDayTracks(dayTracksArray){
    let sum = 0.0;
    for (let i = 0; i < dayTracksArray.length; i++){
        sum += dayTracksArray[i].km;
    }

    return sum;
}

function getCountByDayTracks(dayTracksArray){
    return dayTracksArray.length;
}
*/

function getFullRoutes(routeMap,array){

    function fullRoute(value,key,map){
       let route = new Object();
       route.name = value.name;
       route.start = value.start;
    }
}

module.exports = ViewController;