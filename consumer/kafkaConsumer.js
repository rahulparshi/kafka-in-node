const async = require('async');
const { ConsumerGroup } = require('kafka-node');

const consumerConfig = {
    kafkaHost: "localhost:9092",
    groupId: 'my-topic-group',
    fetchMaxBytes: 100* 1024, // 100 KB
    autoCommit: false,
};

async function wait(delay) {
    console.log(`waiting for ${delay} milliseconds`);
    await new Promise(resolve => setTimeout(() => { resolve(); }, delay));
}

const consumer = new ConsumerGroup(consumerConfig, 'my-topic');
console.log("consumer is started");
async function processData(queueData) {
    try {
    // perform data processing here
    await wait(1000)
    console.log("queueData.offset, queueData.value", queueData.offset, queueData.value);
    const message = JSON.parse(queueData.value);
    console.log("message.key", message.msgKey);
    console.log("queue.length() after", q.length());        
    } catch (error) {
     console.error("Error in process Data", error)   
    }

}

const concurrency = 2;
const q = async.queue(processData, concurrency);

function initiateConsumer() {
    try {
        console.log("initiating consumer");
        q.drain(() => {
            console.log("queue drained");
            consumer.commit(function (err, data) {
                console.log("err, data in commit", err, data);
                if (err) {
                    console.log("Error in commiting message", err);
                }
            });
            consumer.resume();
        });

        consumer.on('message', (data) => {
            console.log("data", data);
            consumer.pause();
            q.push(data);
        });

        consumer.on('error', function (err) {
            console.log("error ", err.message);
        });
    } catch (error) {
        console.log(`Error while consuming messages ${error}`);
    }
}

module.exports = initiateConsumer;