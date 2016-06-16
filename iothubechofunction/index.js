var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

var connectionString = process.env.AzureIoTHubConnectionString;

module.exports = function (context, myEventHubTrigger) {
    var client = Client.fromConnectionString(connectionString);

    if (!myEventHubTrigger) {
        context.log("Function triggered but without content. Discarding.");
    }
    else {
        context.log ("Function triggered by device " + myEventHubTrigger.userId + " with following content: " + myEventHubTrigger.getData());
        context.log('Opening IoT Hub client using connection string ' + connectionString);
        client.open(function (err) {
            if (err) {
                context.log('Error while opening IoT Hub service client: ' + err);
            } else {
                context.log('Connected.');
                var messageToSend = new Message(myEventHubTrigger.getData());
                context.log('Echoing message back to ' + myEventHubTrigger.userId + ' : ' + messageToSend.getData());
                client.send(myEventHubTrigger.userId, messageToSend, printResultFor('send', context));
            }
        });
    }
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