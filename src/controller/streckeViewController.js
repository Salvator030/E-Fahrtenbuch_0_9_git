const NewStreckenViewController = require('../controller/newStreckeViewController.js');
class StreckeViewController{
    #document;
    #newStreckeViewController;

    constructor(document){
        this.#document = document;
        this.#newStreckeViewController  = new NewStreckenViewController(this.#document);
        this.#init()
    }

    #init(){
        this.#document.getElementById('newStreckenBtn').addEventListener('click',this.#newStreckeViewController.toggleDialog)
    }
}

module.exports = StreckeViewController;