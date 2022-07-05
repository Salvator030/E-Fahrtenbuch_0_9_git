//Kalender wurde unbekannter Quelle entnommen und angepasst



const DB = require("./dbController");

class CalendarController{
	constructor(doc, yearMap, routeMap, addressMap){
		this.doc = doc;
				/**
		 * regelt welche R�ckgabe erfolgt.
		 * 0 = geklicktes Datum wird zur�ckgegeben.
		 * 1 = Veranstaltungstext aus getEventtext() 
		 * 		wird zur�ckgegeben.
		 */
		this.returnModus = 0;
		this.yearMap = yearMap;
		this.routeMap = routeMap;
		this.addressMap = addressMap;
		this.current = null;
		

	}

	/**
	* zum erstmaligen aufrufen des Kalenders
	*/
	iniCalendar(){
		//heutiges Datum setzen
		var d = new Date();
		//aktuelles Datudoc,m speichern
		setDateToMemory(this.doc,d);
		//Calender laden
		loadcalendar(this.doc,this.current);
		
	}

	 nextMonth(){
		var d = getDateFromMemory(this.doc.all.date_memory.innerHTML);
		var m = d.getMonth()+1;
		var y = d.getFullYear();
	
		//Falls Jahres wechsel
		if ((m+1)>12)
		{
			m = 0;
			y = y + 1;
		}
		d = new Date(y,m,0o01);
		setDateToMemory(this.doc,d);
		if ( this.current != null){
			this.current.classList.remove("currentEntry");
			this.current = null;
		}
		loadcalendar(this.doc);
		this.doc.getElementById("dayViewDate").innerHTML = "01." + (m+1) + "." + y;
		
	
	}
	
	  prevMonth(){
		var d = getDateFromMemory(this.doc.all.date_memory.innerHTML);
		var m = d.getMonth()+1;
		var y = d.getFullYear();
		
		//Falls Jahres1wechsel
		if ((m-1)<1)
		{
			m = 11;
			y = y - 1;
		}
		else
		{
			m = m - 2;
		}
		d = new Date(y,m,0o01);
		setDateToMemory(this.doc,d);
		if ( this.current != null){
			this.current.classList.remove("currentEntry");
			this.current = null;
		}
		loadcalendar(this.doc);
		this.doc.getElementById("dayViewDate").innerHTML = "01." + (m+1) + "." + y;
	
	}

	 changeClickedDay(event){

		 if (this.current != null){
		 	this.current.classList.toggle("currentEntry");
		 }
		 event.target.classList.add("currentEntry");
		 this.current = event.target;
	}

	
	

	

/**
 * Setzt die Art der R�ckgabe bei, Datums-klick
 * @param returnIndex:
 * 		0 = geklicktes Datum zur�ckgeben
 * 		1 = event aus getEventtext()
 */
 	setReturnModus(returnIndex){
		this.returnModus = returnIndex;
	}	
}

let yearArray = [];
let monthArray;



//gibt die Tages zahl des des Datums zurück
function putDateInnerHtml(n, doc){
	var d = getDateFromMemory(doc.all.date_memory.innerHTML);
	d.setDate(n);
	
	return  d.getDate();
	
}

//gibt das gesamte datum zurück
function putDateValue(n, doc){
	var d = getDateFromMemory(doc.all.date_memory.innerHTML);
	d.setDate(n);
	let day = d.getDate()+"";
	let month = (d.getMonth()+1) + "";
	let y = d.getFullYear() +""

	if(day.length == 1){
		day = 0 + day
	}

	if (month.length == 1){
		month = 0 + month;
	}
	let date= day +"." + month + "." + y;

	
	return date;
	
}

function loadcalendar(doc,current) {
	//aktuelles Datum holen (1. des Monats)
	var d = getDateFromMemory(doc.all.date_memory.innerHTML);
	//Monat ermitteln aus this_date (z�hlen beginnt bei 0, daher +1)
	var m = d.getMonth(); 
	//Jahr ermitteln aus this_date (YYYY)
	var y = d.getFullYear();
	//Monat und Jahr eintragen
	doc.all.calendar_month.innerHTML = getMonthname(m+1) + ' ' + y;
	//ersten Tag des Monats festlegen
	var firstD = d;
	firstD.setDate(1);
	//Wochentag ermitteln vom 1. des �bergebenen Monats (Wochentag aus firstD)
	var dateDay = firstD.getDay(); //So = 0, Mo = 1 ... Sa = 6
	//Sonntag soll den Wert 7 darstellen -> Mo = 1 ... So = 7
	dateDay = (dateDay == 0) ? 7: dateDay;
	//Speicher f�r aktuelle Zelle
	var entry = '';
	//Speicher f�r aktuellen Tag
	var zahl = '';
	//heutiges Datum ermitteln
	var hD = new Date();
	//ist event 
	//falls event, dann darf der Rahmen
	//nicht vom isHolyday �berschrieben werden
	var bEvent = false;
	//Alle Kalender Spalten durchz�hlen
	for (var i = 1; i <= 42; i++)
	{
		bEvent = false;
		//holen der aktuellen Zelle
		entry = doc.getElementById('calendar_entry_'+i);
		//errechnen der Tages Zahl
		zahl = (i+1)-dateDay;
		//datum zusammenschreiben
		var dx = new Date(y,m,zahl);

		//Eintragen der Daten ab ersten Tag im Monat und wenn es ein g�ltiges Datum ist
		if (i >= dateDay && isValidDate(y,m,zahl ))		
		{
			let t = doc.all.date_memory.innerHTML;
			
			entry.innerHTML = putDateInnerHtml(zahl, doc);
			entry.value = putDateValue(zahl,doc);
			//gibt die Anzahl der Strecken in die aktuelle zelle
			
			entry.hidden = false;
			entry.style.visibility='visible';
			entry.style.border = 'solid 1px';
		
			//Wenn Tag ein Feiertag ist
			if (isHoliday(m,zahl))
				{entry.style.color='#FF0000';}
			else{
				if (!bEvent)
					entry.style.color='#000000';
			}
						
			//heutiges Datum hervorheben			
			if (hD.getDate() == dx.getDate() && 
				hD.getMonth() == dx.getMonth() && 
				hD.getYear() == dx.getYear())
			{
				current = entry;
			}
		}
		else
		{
			entry.innerHTML = '';
		
			if (i>= dateDay)
			{//Wenn Kalenderende
				//Zelle = hidden
				entry.hidden = true;
				entry.style.border = '0px';
			}
			else
			{//Wenn Kalenderanfang
				//Border-width = 0px
				entry.style.border = '0px';
			}
		} 
								
	}	
	if(current != undefined){
	current.click();
	}
}


function isHoliday(m,d){	
	//Monate fangen bei 0 an zuz�hlen
	m++;
	//festlegen der Feiertage
	var h = new Array(7);
	h[0] = "1.1";
	h[1] = "6.1";
	h[2] = "1.5";
	h[3] = "3.10";
	h[4] = "1.11";
	h[5] = "25.12";
	h[6] = "26.12";
	h[7] = "31.12";
	var iD;
	//Alle Daten Testen
	for ( var i = 0; i < h.length; i++) {
		let iH = h[i].split(".");
				
		if (iH[0] == d && iH[1] == m) {
			return true;
		}
	}
	//Wenn kein Feiertag gefunden
	return false;
	
}

function isValidDate(y,m,d) {
	//--Gibt Datum des letzten Tag des Monats aus--
	var thisDate = new Date(y,m,1);
	//einen Tag weiter schalten
	thisDate.setMonth(thisDate.getMonth()+1);
	//vom ersten Tag des n�chsten monats
	//ein Tag abziehen
	thisDate.setTime(thisDate.getTime() - 12*3600*1000);
	
	if (d>thisDate.getDate())
		{return false;}
	else
		{return true;}
}
/**
* ermittelt den letzten Tag des aktuellen Monats
* @return: gibt letzten Tag zur�ck
*/
 function getLastDayOfMonth(doc) {
	var d = getDateFromMemory(doc.all.date_memory.innerHTML);
	//einen Tag weiter schalten
	d.setMonth(d.getMonth()+1);
	//den ersten des Monats setzen
	d.setDate(1);
	//vom ersten Tag des n�chsten monats
	//ein Tag abziehen
	d.setTime(d.getTime() - 12*3600*1000);
	return d.getDate();
}

function  getMonthname(monthnumber){
	switch(monthnumber)
	{
		case 1:
		  return 'Januar';
		  break;
		case 2:
		  return 'Februar';
		  break;
		case 3:
		  return 'März';
		  break;
		case 4:
		  return 'April';
		  break;
		case 5:
		  return 'Mai';
		  break;
		case 6:
		  return 'Juni';
		  break;
		case 7:
		  return 'Juli';
		  break;
		case 8:
		  return 'August';
		  break;
		case 9:
		  return 'September';
		  break;
		case 10:
		  return 'Oktober';
		  break;
		case 11:
		  return 'November';
		  break;
		case 12:
		  return 'Dezember';
		  break;
		default:
		  return '---';
	}
}

function  getDateFromMemory(doc){
	
	var z = doc.split(',');
	return new Date(z[0],z[1]-1,z[2]);
}





function setDateToMemory(doc,d){
	
	doc.all.date_memory.innerHTML = d.getFullYear()+','+(d.getMonth()+1)+','+d.getDate();
}



	


	


module.exports = CalendarController;

