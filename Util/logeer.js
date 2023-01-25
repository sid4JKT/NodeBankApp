<<<<<<< HEAD

const { configure, getLogger } =require( 'log4js');
// import { environment } from '../configuration/environment';
// appenders
configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: `./Util/log`,
      layout: { type: 'basic' },
      compress: true,
      daysToKeep: 14,
      keepFileExt: true
    }
  },
    categories: {
    default: { appenders: ['console', 'dateFile'], level: "info" }
  }
});
// fetch logger and export
=======

const { configure, getLogger } =require( 'log4js');
// import { environment } from '../configuration/environment';
// appenders
configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: `./Util/log`,
      layout: { type: 'basic' },
      compress: true,
      daysToKeep: 14,
      keepFileExt: true
    }
  },
    categories: {
    default: { appenders: ['console', 'dateFile'], level: "info" }
  }
});
// fetch logger and export
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
module.exports.logger = getLogger();