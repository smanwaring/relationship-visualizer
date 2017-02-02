const chalk = require('chalk');
const db = require('./db');
// pull in models to database
require('./models');

// Sync the db, creating it if necessary
const isTest = process.env.NODE_ENV === 'testing';

const sync = (force = isTest) => {
  return db.sync({ force })
    .then(ok => console.log(chalk.green(`Synced ${db.config.database} database`)))
    .catch(fail => {
      console.error(fail);
      // console.log(chalk.yellow(`Creating ${db.config.database} database...`))
      // return new Promise((resolve, reject) =>
      //   require('child_process').exec(`createdb "${db.config.database}"`, resolve)
      // ).then(() => sync(true))
    });
};


/* THIS IS HOW TO DO IT WITH THE COUNTER TO TRY TO SYNC DB AT LEAST 5 TIMES , WE CAN ADD THIS IN LATER */

// sync the db, creating it if necessary
// function sync(force=app.isTesting, retries=0, maxRetries=5) {
//   return db.sync({force})
//     .then(ok => console.log(`Synced models to db ${url}`))
//     .catch(fail => {
//       // Don't do this auto-create nonsense in prod, or
//       // if we've retried too many times. 
//       if (app.isProduction || retries > maxRetries) {
//         console.error(chalk.red(`********** database error ***********`))
//         console.error(chalk.red(`    Couldn't connect to ${url}`))
//         console.error()
//         console.error(chalk.red(fail))
//         console.error(chalk.red(`*************************************`))
//         return
//       }
//       // Otherwise, do this autocreate nonsense
//       console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
//       return new Promise((resolve, reject) =>
//         require('child_process').exec(`createdb "${name}"`, resolve)
//       ).then(() => sync(true, retries + 1))
//     })
// }


db.didSync = sync();

module.exports = db;
