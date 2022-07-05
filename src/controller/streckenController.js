const DB = require('./dbController.js')
class StreckenController {

    constructor(doc){
        this.doc = doc;
        this.streckenArray = [];
        this.trackToSetInDay = [];
        this.isSort = false;
        this.hasFirst = false;
        
    }

    ini(){
       setStreckenArray(this.streckenArray);
        getAccessibleRouts(this.doc, this.streckenArray);
    }

    clickStreckenListItem(div){
        // setzt die id nummer der ausgewählten strecke in das trackToSetInDay Array bzw. etfernt sie 
       
        changeItem(this.doc, div, this.trackToSetInDay, this.hasFirst);
        if(this.hasFirst){
            changeCheckBoxForFirstTrack(this.doc.getElementById("checkBoxForFirstTrack_" + div.id.split("_"[1])), this.doc, this.trackToSetInDay, this.treckenArray, this.hasFirst)
            sortTrackToSetInDayArryByFirstTrack(this.trackToSetInDay, this.streckenArray)

        }
        sortStreckenListItem(this.doc, this.trackToSetInDay);
    }

   clickAddStreckeToDay(){
     
        // let array = getAllCheckedRoutes(this.doc);
        setDrivenRoutesByDayInDB(this.trackToSetInDay,this.doc)
    }


    clickCheckBoxForFirtsTrack(box){
        changeCheckBoxForFirstTrack(box,this.doc, this.trackToSetInDay, this.treckenArray, this.hasFirst)
        sortTrackToSetInDayArryByFirstTrack(this.trackToSetInDay, this.streckenArray)
        sortStreckenListItem(this.doc, this.trackToSetInDay);
    }
    

    

    clickSortBy(event){
       
        try{
        let id = event.target.id;
        
        
        if (id == "sortByStartName"){
            this.streckenArray.sort(function (a, b)	{
                
               let a2 = a.startName.toLowerCase();
             
                a2.replace(/ä/g,"a");
                a2.replace(/ö/g,"o");
                a2.replace(/ü/g,"u");
                a2.replace(/ß/g,"s");
            
                
                let b2 = b.startName.toLowerCase();
                b2.replace(/ä/g,"a");
                b2.replace(/ö/g,"o");
                b2.replace(/ü/g,"u");
                b2.replace(/ß/g,"s");
            
                return(a2==b2)?0:(a2>b2)?1:-1;
            });
        }
        else if (id == "sortByStartStr"){
          this.streckenArray.sort( function (a, b)	{
                let a2 = a.startStr.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.startStr.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
        else if (id == "sortByStartHnr"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.startHnr.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.startHnr.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
        else if (id == "sortByStartPlz"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.startPlz.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.startPlz.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
        else if (id == "sortByStartOrt"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.startOrt.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.startOrt.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
            
        }
        else if (id == "sortByZielName"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.zielName.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.zielName.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
        else if (id == "sortByZielStr"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.zielStr.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.zielStr.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
        else if (id == "sortByZielHnr"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.zielHnr.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.zielHnr.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
        else if (id == "sortByZielPlz"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.zielPlz.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.zielPlz.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
        else if (id == "sortByZielOrt"){
            this.streckenArray.sort( function (a, b)	{
                let a2 = a.zielOrt.toLowerCase();
                 a2.replace(/ä/g,"a");
                 a2.replace(/ö/g,"o");
                 a2.replace(/ü/g,"u");
                 a2.replace(/ß/g,"s");
             
                 
                 let b2 = b.zielOrt.toLowerCase();
                 b2.replace(/ä/g,"a");
                 b2.replace(/ö/g,"o");
                 b2.replace(/ü/g,"u");
                 b2.replace(/ß/g,"s");
             
                 return(a2==b2)?0:(a2>b2)?1:-1;
             });
        }
   
       
     
        

    }catch(e){
        alert("Error \n" + e)
    }
    sortStreckenListItemByTag(this.trackToSetInDay,this.streckenArray)
    refreshAccessibleRouts(this.doc,this.streckenArray)
    }

  
}
module.exports = StreckenController;


function changeCheckBoxForFirstTrack(box,doc, trackToSetInDay,streckenArray,hasFirst){
    //if a checkbox checked by click event, the othe checkBoxes will be disabled
 
   

    try{
        if ( box.checked == true){
            for ( let i = 0; i < trackToSetInDay.length; i++ ){
                if( box.id.split("_")[1] != trackToSetInDay[i]){
                    doc.getElementById("checkBoxForFirstTrack_"+trackToSetInDay[i]).disabled = true;
                }
                else{
                    let temp = trackToSetInDay.splice(i, 1);
                    trackToSetInDay.unshift(temp[0])
                    hasFirst = true;
                }
            }
        }
        else{
            for ( let i = 0; i < trackToSetInDay.length; i++ ){
                doc.getElementById("checkBoxForFirstTrack_"+trackToSetInDay[i]).disabled = false;
            }
            hasFirst = false
        }
     }
    catch(e){
        alert("changeCheckBoxForFirstTrack\n Error: " + e)
    }  
    
}


function setStreckenArray(array){
    
    let a = DB.getFullRoutes();
    for ( let i = 0; i < a.length; i++){
        array.push(a[i]);
    }

}

function getAccessibleRouts(doc, streckenArray){

   
  
        let streckenList = doc.getElementById("streckenList");
        
        while (streckenList.lastChild){
            streckenList.lastChild.remove();
        };
     
        for (let i = 0; i < streckenArray.length; i++){
        let containerDiv = doc.createElement("div");
        let idR = streckenArray[i].idRoute ;
        containerDiv.id = "containerDiv_" + idR;
        containerDiv.classList.add("containerDiv");
        containerDiv.name = "unchecked"
        containerDiv.value = streckenArray[i];

                let table = doc.createElement("table");
                table.id ="streckenListItemTable_" +idR;
                table.classList.add("streckenListItemTable")
               
                             table.innerHTML = "<tr><td class='streckenListItemPunkt'>Start</td>" + 
                                "<td class='streckenListItemName'>" + streckenArray[i].startName + "</td>" +
                                "<td class='steckenListItemStr'>" + streckenArray[i].startStr + "</td>" +
                                "<td class='steckenListItemHnr'>" + streckenArray[i].startHnr + "</td>" +
                                "<td class='steckenListItemPlz'>" + streckenArray[i].startPlz + "</td>" +
                                "<td class='steckenListItemOrt'>" + streckenArray[i].startOrt + "</td>" +
                                "<td class='streckenListItemPunkt'>Ziel</td>" +
                                "<td class='streckenListItemName'>" + streckenArray[i].zielName + "</td>" +
                               "<td class='steckenListItemStr'>" + streckenArray[i].zielStr + "</td>" +
                               "<td class='steckenListItemHnr'>" + streckenArray[i].zielHnr + "</td>" + 
                               "<td class='steckenListItemPlz'>" + streckenArray[i].zielPlz + "</td>" +
                               "<td class='steckenListItemOrt'>" + streckenArray[i].zielOrt + "</td>" +
                               "<td><div id='steckenListItemCheckBoxDiv_"+ idR +"' class='steckenListItemCheckBox' hidden><input type='checkBox' id='checkBoxForFirstTrack_"+ idR +"' class='steckenListItemCheckBox' value='first'><label for='checkBoxForFirstTrack_"+ idR+"'>ertse Fahrt</label></div></td>" +
                               "</tr>";    
                
       
         containerDiv.appendChild(table)
      

               streckenList.appendChild(containerDiv);
            };
    }

    function refreshAccessibleRouts(doc, streckenArray){
        try{   
            let streckenList = doc.getElementById("streckenList");
            for (let i = streckenArray.length - 1; i >= 0; i--){
                let temp = doc.getElementById("containerDiv_" + streckenArray[i].idRoute);
                streckenList.removeChild(temp);
                streckenList.insertBefore(temp, streckenList.children[0])
            
            }

        }
        catch(e){
            alert("refreshAccessibleRouts - Error: "+e.message);
        }
    }
    
    function changeItem(doc,div, trackToSetInDay, hasFirst){
        //get the steckenListItemCheckBoxDiv id
       try{
        let s = div.id.split("_")[1];
        if ( div.name != "checked" ){
            div.style.backgroundColor ="lightgray";
            div.name = "checked"
            doc.getElementById("steckenListItemCheckBoxDiv_" + s).hidden = false;
            trackToSetInDay.push(s)
        
            if(hasFirst){
                doc.getElementById("checkBoxForFirstTrack_"+div.id.split("_")[1]).disabled = true;
            }
        }
        else {
            
            div.style.backgroundColor ="#f2f2f2";
            div.name = "unchecked";
            
            doc.getElementById("steckenListItemCheckBoxDiv_" + s).hidden = true;
            trackToSetInDay.splice(trackToSetInDay.indexOf(s),1)
            if ( doc.getElementById("checkBoxForFirstTrack_"+s).checked){
                  hasFirst = false;
                doc.getElementById("checkBoxForFirstTrack_"+s).checked = false;
                trackToSetInDay.forEach(function(n){
                doc.getElementById("checkBoxForFirstTrack_"+n).disabled = false;
              
                }

            )}
        }

       
        }
        catch(e){
            alert("Error:\n" + e.message)
        }
    
    }

    function sortTrackToSetInDayArryByFirstTrack(trackToSetInDay, streckenArray){
    try{
        
                
        let change = false; 
          
          do{
              change = false;

                    for (let i = 0; i < trackToSetInDay.length; i++){
                        
                        if (  i!= 0 && streckenArray[trackToSetInDay[i] - 1].zielId == streckenArray[trackToSetInDay[i-1] -1 ].startId ){
                          
                           let temp =  trackToSetInDay.splice(i, 1);
                           trackToSetInDay.splice(i-1,0,temp[0])
                           change = true;
                        }
                    }
         }while(change)


    }
    catch(e){
        alert("sortTrackToSetInDayArryByFirstTrack\n ERROR" + e.message)
    }
        
    }

    function sortStreckenListItemByTag(trackToSetInDay, streckenArray){
        try{
           
                for (let i = trackToSetInDay.length - 1; i >= 0; i--){
                    let notMatch = true;
                    let j = 0;
                    do{
                        if (trackToSetInDay[i] == streckenArray[j].idRoute){
                            streckenArray.unshift(streckenArray.splice(j,1)[0])
                            notMatch = false;
                        }
                        else{
                            j++
                        }

                    }while(notMatch)
                }



        }
        catch(e){
            alert("sortStreckenListItemByTag\n" + e.message)
        }
    }

    function sortStreckenListItem(doc,trackToSetInDay){

        try{
            let streckenList = doc.getElementById("streckenList");
          
            let childs = streckenList.children
           
            for (let i = trackToSetInDay.length-1 ; i > -1;i--){
             
               
              for ( let j = 0 ; j < childs.length ; j++ ){
             
                  if (childs[j].id.split("_")[1] == trackToSetInDay[i] ){
                    let temp = childs[j];
                    streckenList.removeChild(childs[j]);
                     streckenList.insertBefore(temp, streckenList.children[0]);

                  }
              }
            }
        }catch(e){
            alert("sortStreckenListItem\n Error " + e);
        }
    }

    function setDrivenRoutesByDayInDB(array, doc){
        let dateArray = doc.getElementById("dayViewDate").innerText.split(".");
         let date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

        try{
          DB.insertDrivenRoute(array,date);
        }
        catch(e){
            alert(e);
        }
        array.length = 0;
    }

    

    function  getDateFromMemory(doc){
	
        var z = doc.all.date_memory.innerHTML.split(',');
        return new Date(z[0],z[1]-1,z[2]);
    }

    function getAllCheckedRoutes(doc){

        let list = doc.getElementById("streckenList").children;
        let array = [];
       let count = list.length;
       for (let i = 0; i < count; i++){
           if(list[i].name == "checked"){
               array.push(list[i].value);
           }
       }
     
        return array;
    }