

var start = function(){
	sqsReceivesqsSend();
};

var startAutomate = function(){
	console.log("Listening...");
	var startBtn = document.getElementById("start_btn_automate");
	startBtn.innerHTML = 'Started';
	startBtn.disabled = true;
	var lock = false;
	window.sqsInterval = setInterval(function(){
		if(!lock){
			sqsReceivesqsSend();
		}
	} , 3000);

};

var stopAutomate = function() {
	console.log("Listener stopped");
	clearInterval(window.sqsInterval);
	var startBtn = document.getElementById("start_btn_automate");
	startBtn.innerHTML = 'Start Automate';
	startBtn.disabled = false;
};

startAutomate();

