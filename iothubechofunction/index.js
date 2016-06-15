var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = process.env.AzureIoTHubConnectionString;

module.exports = function (context, myEventHubTrigger) {
    var client = Client.fromConnectionString(connectionString);
    var targetDevice = myEventHubTrigger.DeviceId;
    var messageToSend = "whoops";

    // 1. Open our Azure IoT Hub client
    context.log('Opening client using connection string ' + connectionString);
    client.open(function (err) {
        if (err) {
            context.log('Error while opening IoT Hub service client: ' + err);
        } else {
            context.log('Connected.');
            
            var messageReceived = new Message(myEventHubTrigger);
            
            context.log('Received new message: ' + messageReceived.message + ' from device ' + messageReceived.DeviceId);
            context.log('Echoing message back.');
            // 2. Generate Message for our device
//            var data = JSON.stringify({ message: "Hello" });
//            var message = new Message(data);
    
            // 3. Send message to device
            context.log('Sending message to ' + messageReceived.DeviceId + ' : ' + messageReceived.getData());
            client.send(messageReceived.DeviceId, messageReceived, printResultFor('send', context));
        }
    });
    context.done();
};

// Helper function to print results in the context
function printResultFor(op, context) {
    return function printResult(err, res) {
        if (err) {
            context.log(op + ' error: ' + err.toString());
        } else {
            context.log(op + ' status: ' + res.constructor.name);
        }
    };
}