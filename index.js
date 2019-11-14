const db = require('./models/index');

async function init() {
    console.log('##################################');
    console.log('###### vStore WebAPI Server ######');
    console.log('##################################');

    try {
        await db.sequelize.authenticate();
        console.log('Connected to database.');
    } catch (e) {
        console.error('Can\'t connect to database.\n', e);
        process.exit();
    }
    require('./server')();
}

init();