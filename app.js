const express = require('express');
const initiateConsumer = require("./consumer/kafkaConsumer");


const app = express();

const portNumber = 3000;
app.listen(portNumber, ()=>{
console.log(`listening on ${portNumber}`);
});

async function wait(delay) {
    console.log(`waiting for ${delay} milliseconds`);
    await new Promise(resolve => setTimeout(() => { resolve(); }, delay));
}

app.get("", async (req, res) => {
    await wait(500);
    res.status(200).send("awesome");
});

initiateConsumer();


