import {appBuilder} from './app';

const x = 1;
const y = x + 1;

appBuilder({}).listen(3000, () => {
    console.log('listening');
});


