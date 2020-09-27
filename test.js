/**
 * 對axios使用await
 */

const axios = require('axios');

async function test() {
    let result = axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1
    }, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return result;
}

(async()=>{
    let abc = await test();
    console.log('>>>>>>>>>>> abc', abc.data);
 })();
 