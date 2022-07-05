const Address = require('../classes/address.js');
const DB = require("./dbController.js");

class DialogController{
    constructor(doc){
        this.doc = doc;
        this.dbArray = new Array();
        this.startLocation;
        this.destination;
    }

 

    //present the hidden dialog or remove it
     toggleDialog(){
            let dialog = this.doc.querySelector('dialog');
        let abrBtn = this.doc.getElementById("newStreckeAbrBtn");
           if (!dialog.hasAttribute('open')) {
            // show the dialog 
            dialog.setAttribute('open','open');
            // after displaying the dialog, focus the closebutton inside it
           abrBtn.focus();
            // set the optins in both selected tags
            getOptionsForOrtSelect(this.doc, this.dbArray)
            var div = this.doc.createElement('div');
            div.id = 'backdrop';
           body.appendChild(div); 
            this.startLocation = undefined;
            this.destination = undefined;
            }
        else {
    leaveDialog(this.doc, this.startLocation, this.destination);
        }
        
    }
   
    clickStartOrtSelect(){
     
        var select = this.doc.getElementById("startOrtSelect");
        let index = select.selectedIndex;
     
        if (select.options[index].value !== undefined ){
            this.startLocation = select.options[index].value
             setInputValuesFromSelectedOrt(this.doc, this.dbArray,'start',this.startLocation)
            
        }
    }

    clickZielOrtSelect(){
        var select = this.doc.getElementById("zielOrtSelect");
        let index = select.selectedIndex;
        if (select.options[index].value !== undefined ){
            this.destination = select.options[index].value
            setInputValuesFromSelectedOrt(this.doc, this.dbArray,'destination', this.destination)
             console.log(this.document.getElementById('zielOrtSelect').options[index].value);
        }
    }

     creatNewStrecke(){
        //eventLisener mehtode for the okBtn
        let startId;
        let zielId;
        let km;

        //set the start address
        // first checked if a addres selected 
        if ( this.startLocation === undefined){
        // if a adress not selected then the addres will take from the input field  when its posibyl
            let address = getAddress(this.doc, 'start');
            if  (address !== false){
            // if a addres get by the inputfields they will rid in the DB , and the id of the adress will be save in the variabel
            startId=  writeAddressInDb(address);
            }
        }
        else{
            //the id of the adress will be get form the array
            startId = this.dbArray[this.startLocation].idAdd;
        }
    
        //the same vor the destinatiom address
        if (this.destination === undefined){
        
            let address = getAddress(this.doc, 'destination')
            if (address !== false){
                zielId = writeAddressInDb(address);
            }
        }
        else{
            zielId = this.dbArray[this.destination].idAdd;
        }
    
        km = getKm(this.doc);
        console.log(km);
       
        if ( km !== false){

             writeTrackInDb(startId,zielId,km);
            if (this.doc.getElementById('checkbox').checked  ==true ){
                writeTrackInDb(zielId,startId,km);
            }
            
             leaveDialog(this.doc, this.startLocation, this.destination);
           
        }
        
      
    }

}

module.exports = DialogController;

// contains the Eventhandler functions for the 'newStreckeBtn'

// shows the dialog for create a new track and write them in the Database by Click on the 'okBtn'
     
// leav the dialog window
    function leaveDialog(doc,startLocation, destination){
             deletInputs(doc,startLocation, destination)
        
       doc.querySelector('dialog').removeAttribute('open');  
     
        var div = doc.querySelector('#backdrop');

       // div.parentNode.removeChild(div);

        
    };

    function deletInputs(doc, startLocation, destination){
            let s = doc.getElementsByName('start');
        let z = doc.getElementsByName('destination');

        startLocation = undefined;
        destination = undefined;

        for (let i = 0; i < s.length; i++){
           
            s[i].value = "";
            z[i].value = "";
        }
        doc.getElementById("km").value = ""


    }


function getKm(doc){
    let inputKm = doc.getElementById('km').value;
    let km
    console.log(inputKm);
    console.log(typeof inputKm);
    if ( inputKm != ""){
    inputKm =  inputKm.replace(",",".");
       console.log(inputKm);
    console.log(typeof inputKm);
        km = Number.parseFloat(inputKm); 
        console.log(km);
        console.log(typeof km);
        
        if ( isNaN(km)){
            doc.getElementById('km').value = "mus eine Zahl sein";
            return false;
        }
        return km;
    }
    else{
        doc.getElementById('km').value = "darf nicht lehr sein";
        return false;
    }

}

function getAddress(doc,name){
    // read out the input fileds of the dialog view and give a Address Object back when its possibil else false will be return
    const inputArray = doc.getElementsByName(name);
    let valuesArray = [];
    let bol;
    for(let i = 0; i < inputArray.length; i++){
      console.log(inputArray[i].value);
        if (i > 0 && inputArray[i].value === "" || inputArray[i].value === "darf nicht lehr sein"){
            inputArray[i].value = "darf nicht lehr sein"
            bol =  false;
        }
       
         if ( i == 3){
             if ( valuesArray[3].length != 5 && inputArray[i].value === "darf nicht lehr sein"){
                 alert("Plz")
                 valuesArray[3].value = "bitte 5 stellige PLZ"
                 bol = false;
             }
         }
        valuesArray[i] =  inputArray[i].value.trim(); 
    }
    if ( bol == false){
        return false;
    }
createTrackName(valuesArray);
    return new Address(valuesArray[0], valuesArray[1], valuesArray[2], valuesArray[3], valuesArray[4]);
}

function writeTrackInDb(start,ziel,km){
   let id;
    try{
       id = DB.insertTrack(start, ziel,km);
    }
    catch(e){
        alert(e);
    }
    return id;
}

function writeAddressInDb(address) {
    //write a address Object in the database
    let id;
    try{
           id =  DB.insertAddress(address);
    }
    catch(e){
        alert(e)
       
    }
    return id;

}

function createTrackName(valuesArray) {
    // if the name of a track not set then it will be created 
    if ( valuesArray[0] === ""){
        console.log(valuesArray[0])
        valuesArray[0] = valuesArray[1].slice(0,4) + valuesArray[2];
    }
   
}

function getOptionsForOrtSelect(doc,dbArray){
    //set the options in the both select tags, 
  
    dbArray.length = 0;

   let array = DB.getAllAddresses();
   for (let i = 0; i < array.length; i++){
    dbArray.push(array[i]);
   }
     let sSelect = doc.getElementById("startOrtSelect");
     let zSelect = doc.getElementById("zielOrtSelect");
     removeChilds(sSelect);
   removeChilds(zSelect) ;
 
       
        
   
        for ( let i = 0; i < dbArray.length; i++ ){
            let text = dbArray[i].idAdd + "\t" + dbArray[i].street + " " + dbArray[i].hnr + "\t" + dbArray[i].plz + " " + dbArray[i].city 
            let option = new Option(text, i);
            let option2 = new Option(text, i);
            option.classList.add('options');
            option2.classList.add('options');
            sSelect.appendChild(option); 
            zSelect.appendChild(option2);
            console.log(sSelect.childElementCount);
            console.log(zSelect.childElementCount);
        }
    
  
    
}

function setInputValuesFromSelectedOrt(doc,dbArray,string, i){
    // set the dtails of a adress (start, ziel), form the db request array in the different input fields
   let inputs =  doc.getElementsByName(string);
   inputs[0].value = dbArray[i].name;
   inputs[1].value = dbArray[i].street;
   inputs[2].value = dbArray[i].hnr;
   inputs[3].value = dbArray[i].plz;
   inputs[4].value = dbArray[i].city;
   
}






/*
window.onclick = function(event){
    console.log(event.target)
    if (event.target.matches('.startOrtSelect')){
        //select Tag
        var select = document.getElementById("startOrtSelect");
        let index = select.selectedIndex;
        console.log("select.options[index].value: " + select.options[index].value)
        if (select.options[index].value !== undefined ){
            startLocation = select.options[index].value
            setInputValuesFromSelectedOrt('start',startLocation)
             console.log(document.getElementById('startOrtSelect').options[index].value);
        }

    }
     if (event.target.matches('.zielOrtSelect')){

        var select = document.getElementById("zielOrtSelect");
        let index = select.selectedIndex;
        if (select.options[index].value !== undefined ){
            destination = select.options[index].value
            setInputValuesFromSelectedOrt('destination', destination)
             console.log(document.getElementById('zielOrtSelect').options[index].value);
        }
    }
       
           
          //  setInputValuesFromSelectedOrt('start',DB.getById().idAdd);
}

*/

function removeChilds(obj){
    console.log(obj);
    while(obj.childElementCount > 0){
        console.log(obj.childNodes);
        console.log(obj.hasChildNodes());
		obj.firstElementChild.remove();
	}
}



