const Controller = require('../controller/controller.js');

function ini(document){
        console.log('index.js ... load')
    const db = require('../controller/dbController.js');
    db.initDb();
    let controller = new Controller(document);
    controller.ini();
}

let doc = document;
console.log(doc);
ini(doc);
