const {headers} = require('./config.js');

const requestP = require('./modules/requestP.js');
// const packData = require('./modules/packData.js');

let main = async ()=> {
    try {
        let data = await requestP(headers);
        console.log(data);
    }catch(e){
        console.log(e);
    }
};

main();