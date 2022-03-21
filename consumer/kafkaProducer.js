const kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    client = new kafka.KafkaClient(),
    producer = new HighLevelProducer(client),
    topic_name = "my-topic";
const numberOfMessage = 5;
const messages = []
const sampleMessage = {
    "key": "value",
    "timestamp": 1646589734000,
}

for (let index = 0; index < numberOfMessage; index++) {
    messages.push(JSON.stringify(sampleMessage))
}
const payloads = [
    { topic: topic_name, messages: messages },
];

producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});