var SQS = (function(){

	var access_key_id = 'AKIAJPLUN3HSVWTJ4NKQ';
	var secret_access_key = '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';
	var region = 'us-west-2';
	var sqs_api_version = '2012-11-05';
	var receive_queue_url = "https://sqs.us-west-2.amazonaws.com/692480644307/smartenginerequestnew";
	var send_queue_url = "https://sqs.us-west-2.amazonaws.com/692480644307/smartengineresponsenew";
	var retry_count = 3;
	var retry_interval = 1000;
	var wait_time_seconds = 1;

    function resetCount(){
    	retry_count = 3;
    }

	(function configure(){
		AWS.config.update({
			accessKeyId: access_key_id, 
			secretAccessKey: secret_access_key
		});
		AWS.config.region = region;
		console.log("AWS: ",AWS);
	})();

	var sqs = new AWS.SQS({apiVersion: sqs_api_version});

	console.log("SQS: ",sqs);

	var sendQueueMessage = function(messageKeyValue, message, callback){

		var params = {
			MessageBody: message, /* required */
			QueueUrl: send_queue_url, /* required */
			DelaySeconds: 0,
			MessageAttributes: {
				messageKey: { 
					DataType: 'String', 
					StringValue: messageKeyValue
				}
			}
		};

		sqs.sendMessage(params, function(err, data) {
			if (err) {  // an error occurred
				console.log(err, err.stack); 
			}
			else { // successful response
				console.log("Message sent.");
				console.log(data); 
				if(callback)
					callback();
			} 
		});

	}

	var receiveQueueMessage = function(callback){
		var params = {
		  QueueUrl: receive_queue_url, /* required */
		  MaxNumberOfMessages: 1,
		  AttributeNames: ['All'],
		  VisibilityTimeout: 1,
		  WaitTimeSeconds: wait_time_seconds,
		  MessageAttributeNames:['messageKey']
		};

		sqs.receiveMessage(params, function(err, data) {

			if (err) {  // an error occurred
	  			console.log(err, err.stack); 
	  		}
	  		else { // successful response
		    	if (data.Messages.length) {
					// Get the first message (should be the only one since we said to only get one above)
	  				var message = data.Messages[0];
	  				var messageKey = message.MessageAttributes['messageKey'].StringValue;
	  				console.log("Message Key Received: ", messageKey);
	  				if(messageKey) { 
	  					resetCount();
		  				var receiptHandle  = message.ReceiptHandle;
		  				if(receiptHandle) {
		  					removeQueueMessage(receiptHandle);
		  				} 
		  				if (callback) {
		  					var messageBody = message.Body;
		  					if(messageBody)
		  						callback(messageKey, messageBody);
		  					else
		  						console.log("No content in the received message.");
		  				}
	  				} else {
	  					if(retry_count--) {
		  					setTimeout(function(){
		  						receiveQueueMessage(callback);
		  					}, retry_interval);
		  				} else {
		  					resetCount();
		  					if (callback) 
		  						callback('', "Unable to fetch the message. Maximum retry limit reached.");
		  				}
	  				}
				} else {
					if(retry_count--) {
	  					setTimeout(function(){
	  						receiveQueueMessage(callback);
	  					}, retry_interval);
	  				} else {
	  					resetCount();
	  					if (callback) 
		  						callback('', "Unable to fetch the message. Maximum retry limit reached.");
	  				}
				}
	  		} 
		});
	}

	var removeQueueMessage = function(receiptHandle){

		console.log("Message to be deleted");

		var params = {
		  QueueUrl: receive_queue_url, /* required */
		  ReceiptHandle: receiptHandle /* required */
		};
		sqs.deleteMessage(params, function(err, data){
			if (err) {  // an error occurred
				console.log(err, err.stack); 
			}
			else { // successful response
				console.log("Message deleted.");
				console.log(data); 
			}   
		});
	}


	SQS = {
		sendQueueMessage:function(messageKeyValue, message, callback){
			if(message && message.trim()){

				console.log("Message to be sent: ",message);
				console.log("Message key: ", messageKeyValue);

				sendQueueMessage(messageKeyValue, message.trim(), callback);

			} else {
				console.log("Can't send empty message.")
			}
		},

		receiveQueueMessage:function(callback){
			receiveQueueMessage(callback);
		}
	};

	return SQS;

})();



