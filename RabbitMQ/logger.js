const { configure, getLogger } =require( 'log4js');
// import { environment } from '../configuration/environment';
// appenders
const path = require('path');
// var  filepath ='alllog.log';
// async function logfiles(file=''){
//     if(file>1){
//         filepath = file
//     }
// }
logfiles = function logfiles(file=''){
    if(file<=1){
        configure({
            appenders: {
              console: { type: 'stdout', layout: { type: 'colored' } },
              dateFile: {
                type: 'dateFile',
                filename: `./logs/alllog.log`,
                layout: { type: 'basic' },
                compress: true,
                daysToKeep: 10,
                keepFileExt: true
              }
            },
              categories: {
              default: { appenders: ['console', 'dateFile'], level: "info" }
            }
          });
    }
    else  configure({
        appenders: {
          console: { type: 'stdout', layout: { type: 'colored' } },
          dateFile: {
            type: 'dateFile',
            filename: `./logs/${file}`,
            layout: { type: 'basic' },
            compress: true,
            daysToKeep: 10,
            keepFileExt: true
          }
        },
          categories: {
          default: { appenders: ['console', 'dateFile'], level: "info" }
        }
      });
}
logger = getLogger();
// fetch logger and export
module.exports = {logger, logfiles};