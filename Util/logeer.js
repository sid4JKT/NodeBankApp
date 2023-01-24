
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
module.exports.logger = getLogger();