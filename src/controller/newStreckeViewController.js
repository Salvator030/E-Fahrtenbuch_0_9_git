class NewStreckenViewController{
    #document;

    constructor(document){
        this.#document = document;
        
    }

    // eventLisener function vor the hiden Dialog Window
    toggleDialog(event){
       console.log("toggleDialog()")
       let dialog = this.#document.querySelector('dialog');
       let abrBtn = this.#document.getElementById("newStreckeAbrBtn");
       let okBtn = this.#document.getElementById("newStreckeOkBtn");
       lastFocus = event.target;
           
       if (!dialog.hasAttribute('open')) {
           // show the dialog 
           dialog.setAttribute('open','open');
           // after displaying the dialog, focus the closebutton inside it
       abrBtn.focus();
           abrBtn.addEventListener('click',toggleDialog);
           okBtn.addEventListener('click',creatNewStrecke);
           var div = this.#document.createElement('div');
           div.id = 'backdrop';
           this.#document.body.appendChild(div); 
           }
       else {
   leaveDialog();
       }
   };

   #leaveDialog(){
   var inputArray =  this.#document.getElementsByTagName("input");
   for (var i = 0 ; i < inputArray.length; i++) {
           inputArray[i].value ="";
       }
       this.#document.querySelector('dialog').removeAttribute('open');  
       var div = this.#document.querySelector('#backdrop');
       div.parentNode.removeChild(div);
       lastFocus.focus(); 
   };

    
    #getAddress = function(name){
        const startInputArray = this.#document.getElementsByName(name);
        let startValuesArray = [];
        for(let i = 0; i < startInputArray.length; i++){
            if (startInputArray[i].value === null ){
                startInputArray[i].value = "darf nicht lehr sein"
                return false;
            }
            if(i ===1 ){
                startValuesArray[i] = parseInt(startInputArray[i].value,10);
            }
        startValuesArray[i] =  startInputArray[i].value.trim(); 

    }
    const Address = require("./mod/address.js")
    return new Address(startValuesArray[0], startValuesArray[1], startValuesArray[2], startValuesArray[3]);
    }

    #writeAddressInDb(address){
        const DB = require("../controller/dbController.js")
        DB.insertAddress(address);
    }

    #creatNewStrecke(){
        writeAddressInDb(this.#getAddress('start'))
    }

}

module.exports = NewStreckenViewController;

    



