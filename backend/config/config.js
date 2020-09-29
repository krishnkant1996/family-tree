let path = require('path')
let NODE_ENV = process.env.NODE_ENV;

console.log(NODE_ENV)
if(NODE_ENV === 'LOCAL') {
console.log(NODE_ENV)
  require('dotenv').config({path : path.join(process.cwd(), '.env.local')})
} else if(NODE_ENV === 'DEVELOPMENT') {
  require('dotenv').config({path : path.join(process.cwd(), '.env.development')})
} else if(NODE_ENV === 'TEST') {
  require('dotenv').config({path : path.join(process.cwd(), '.env.test')})
} else if(NODE_ENV === 'PRODUCTION') {
  require('dotenv').config({path : path.join(process.cwd(), '.env.production')})
} else {
  require('dotenv').config({path : path.join(process.cwd(), '.env.local')})
}

console.log(process.env.DB_USERNAME)

module.exports = {
  [NODE_ENV] : {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "database": process.env.DB_NAME,
    "dialect": process.env.DB_DIALECT,
    "operatorsAliases": process.env.DB_OPERATORS_ALIASES
  }
}