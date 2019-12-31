import Sequelize from "sequelize"
import glob from 'glob'
import path from 'path'

var db = {}

const sequelize = new Sequelize('graphql', 'root', '', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    // operatorsAliases: false,
})

glob.sync( './schema/*' ).forEach( function( file ) {
    const model = require( path.resolve( file ) )
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
});

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
