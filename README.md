`npm install`

Update AWS config.json

- accessKeyId
- secretAccessKey

Update the Queue URL in app.js:

`const queueUrl = "https://sqs.ap-southeast-2.amazonaws.com/XXXX/XXXX.fifo";`

`npm start`

Browse to: http://localhost:9000

To create a new Message onto the Queue navigate to: http://localhost:9000/addmessage
