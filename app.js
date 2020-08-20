const express = require("express");
var AWS = require("aws-sdk");
var fs = require("fs");
var short = require("short-uuid");

const app = express();
const port = 9000;
AWS.config.loadFromPath("./config.json"); // has the secrets for now

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const queueUrl = "https://sqs.ap-southeast-2.amazonaws.com/XXXX/XXXX.fifo";

app.get("/test", (req, res) => {
  return res.json({ success: "true" });
});

app.get("/addmessage", (req, res) => {
  var messageId = short.generate();
  // load example payload
  var blargeMessagePayload = JSON.parse(
    fs.readFileSync("./examples/example-blarga.json", "utf8")
  );
  blargeMessagePayload.serviceRequest.requestDetails.requestNumber =
    "BLA" + messageId;

  // Setup the sendMessage parameter object
  const params = {
    MessageBody: JSON.stringify(blargeMessagePayload),
    MessageDeduplicationId: messageId, // Required i.e. 73WakrfVbNJBaAmhQtEeDv
    MessageGroupId: "NewServiceRequests", // Required
    QueueUrl: queueUrl,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      return res.json({ error: err });
    } else {
      console.log("Successfully added message", data.MessageId);
      return res.json({ data: data, params: params });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
