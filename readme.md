# Azure IoT Hub ping #
Simple "ping" solution to help validate a device connectivity to Azure IoT Hub.
The solution consists in an Azure IoT Hub and an Azure Function deployed at once. The Azure Function is triggered when a new message is received on the IoT Hub and will send the same message content back to the device that sent it.
The project contains all the code and deployment configuration needed for the solution.
It also contains a simple device sample written in JavaScript for Node.js.

## Deploy the ping solution ##

Deployment of the solution simply consists in clicking on the below button.

[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)
 
Once you have clicked on the button, you will be asked to login with your Azure subscription's credentials.
Then you'll have to choose the AAD tenant and Subscription you want to deploy the solution to, as well as a few other parameters regarding your solution.

Note that if you want to use the free SKU for Azure IoT Hub, you can select the F1 tier in the drop down menu, but keep in mind that you are limited to a single instance of an F1 IoT Hub per subscription.

**Important note about the "Solution Name" parameter**: the solution name should be all lower case, only ascii caracters and no longer that 16 characters.

![][1]

Hit **Next** then **Deploy** in the wizard and wait a couple minutes for the services to be deployed and configured.

![][2]

To visualize the newly deployed services in the Azure portal, you can simply click on the "Manage your resources" link displayed in the final screen of the deployment wizard.

Now that the services are deployed, you can look at how you can connect devices to Azure IoT Hub following [instructions from the Azure IoT SDKs repository][manageazureiothub].


## Message format ##

In order for a device to send a ping and receive the response from the solution, it needs to send a JSON message using the following format:

  ```
  {
      "deviceId":"<deviceId>",
      "message":"Hello IoT World"
  }
  ```
Where 'deviceId' is the device's ID as created in the Azure IoT Hub device registry. 
The message the device will receive back will contain the "message" itself.

## Send a ping from the Node device sample ##

Now that you have your IoT Hub ping solution deployed, you can test any of your devices that you are trying to connect to Azure IoT Hub using the [Azure IoT Hub SDKs][azureiotsdks].

The [Azure IoT Hub SDKs][azureiotsdks] are portable and can run on most types of devices out there, but if you want to get started on a device that has been certified for Azure IoT Hub, look into the list of [devices certified for Azure IoT][azureiotcertified].

And if you are looking for some cool cheap device to get started fast, ckeck out the [Azure IoT Starter Kits][azureiotstarterkits].

... Or you can test and play around with the Node.js sample provided in this repository. In order to use this one, follow the below steps:
The prerequisite to run this sample is to have [node.js](http://nodejs.org) installed on the machine you are using and that you have cloned or downloaded the current repository locally.

1. Create a new device Id in the IoT Hub deployed previously and copy its connection string: you will find instructions on how to do this [here][manageazureiothub].
1. Open the file devicesample/simple_sample_device.js
1. Find the below line of code and replace 'connectionstring' with the device's connection string you just copied

  ```
  var connectionString = '<connectionstring>';
  ```

1. Open a command prompt, navigate to the devicesample folder and type the following commands

  ```
  npm install
  node .
  ```

At this point the node sample device will establish a secure connection with Azure IoT Hub, send messages every other second and should receive the message back from IoT Hub.
If you want to get started with Azure IoT Hub, visit [Azure.com/iotdev](http://azure.com/iotdev).

[1]:media/azuredeploy1.png
[2]:media/azuredeploy2.png
[manageazureiothub]:https://github.com/Azure/azure-iot-sdks/blob/master/doc/manage_iot_hub.md
[azureiotsdks]:https://github.com/Azure/azure-iot-sdks
[azureiotstarterkits]:https://azure.microsoft.com/develop/iot/starter-kits/
[azureiotcertified]:https://azure.microsoft.com/en-us/marketplace/certified-iot-partners/