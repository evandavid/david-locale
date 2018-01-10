let axios = require('axios');
var fs = require('fs');
var util = require('util');

class ScrapData {
  constructor() {
    axios.defaults.baseURL = 'https://payor.netlify.com';

    let idnLabel = axios.get('/locale/label-idn.json');
    let enLabel = axios.get('/locale/label-en.json');
    let idnError = axios.get('/locale/error-idn.json');
    let enError = axios.get('/locale/error-en.json');



    axios.all([idnLabel, enLabel, idnError, enError])
      .then(axios.spread(function (_idnLabel, _enLabel, _idnError, _enError) {

         let obj = {
           label: {
             en: _enLabel.data,
             idn: _idnLabel.data
           },
           errors: {
             en: _enError.data,
             idn: _idnError.data
           }
         }
        let toBeWrite = 'module.exports = ' + JSON.stringify(obj, null, 2);

        fs.writeFile('index.js', toBeWrite, function (err) {
            if (err)
                return console.log(err);
            console.log('writing completed');
        });
    }));

  }
}

let instance = new ScrapData();
