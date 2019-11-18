import initHapi from './hapi';
import {init as initDb} from './db';

const init = async () => {
    console.log('##################################');
    console.log('###### vStore WebAPI Server ######');
    console.log('##################################');

    await initDb();
    await initHapi();
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();