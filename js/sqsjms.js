var sqsReceivejmsSend = function(){
	lock = true;
	SQS.receiveQueueMessage(function(messageKey, message){
		if(messageKey) {
			jms.jmsRequest(messageKey, message, function(message){
				SQS.sendQueueMessage(messageKey, message, function(){
					console.log("Response Sent.");
					lock = false;
				});
			});
		} else {
			lock = false;
		}
	});

};

var sqsReceivesqsSend = function(){

	var inputText = document.getElementById("input-text");
	lock = true;
	inputText.value = '';

	SQS.receiveQueueMessage(function(messageKey, message){

		if(messageKey) {
			message = "Hi Im Response";
			SQS.sendQueueMessage(messageKey, message, function(){
				console.log("Response Sent.");
				inputText.value = message;
				lock = false;
			});
		} else {
			inputText.value = message;
			lock = false;
		}
	});
	
};


