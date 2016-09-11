window.connStat = false;

window.jms=(function(){

    var url="ws://10.141.80.136:8001/jms";
    var sender_queue="/queue/smartengineresponsenew";
    var receiver_queue="/queue/smartenginerequestnew";
    var username = "admin";
    var password = "password";
    var connection="";
    var session="";
    var jms = null;

    function generateCorrelationId(requesttype) {
        var min=100,max=999;
        return 'REQ'+(Math.floor(Math.random() * (max - min + 1)) + min).toString()+requesttype;
    }

    function handleDisconnect() {

        console.log("CLOSE");
        try {
            session.close();
            connection.close(function () {
                console.log("CONNECTION CLOSED");
            });
        }
        catch (e) {
            handleException(e);
        }
    }

    function handleException(e) {
        ex = true;
        console.log(e);
    }

    function handleConnect(url) {
    
        var jmsConnectionFactory = new JmsConnectionFactory(url);
        //setup challenge handler
        try {
            var connectionFuture =
                jmsConnectionFactory.createConnection(username,password,function () {
                if (!connectionFuture.exception) {
                    try {
                        connection = connectionFuture.getValue();
                        connection.setExceptionListener(handleException);

                        console.log("CONNECTED");

                        session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

                        connection.start(function () {
                            window.connStat = true;
                        });
                    }
                    catch (e) {
                        handleException(e);
                    }
                }
                else {
                    handleException(connectionFuture.exception);
                }
            });
        }
        catch (e) {
            handleException(e);
        }
    }

    function createDestination(name, session) {

        if (name.indexOf("/topic/") == 0) {
            return session.createTopic(name);
        }
        else if (name.indexOf("/queue/") == 0) {
            return session.createQueue(name);
        }
        else {
            throw new Error("Destination must start with /topic/ or /queue/");
        }
    }

    function handleMessage(message) {
        var content="";
        
        if (message instanceof TextMessage) {
            content = message.getText();
        }
        else if (message instanceof BytesMessage) {
            var body = [];
            message.readBytes(body);
            content = "RECEIVED BytesMessage: " + body;
        }
        else if (message instanceof MapMessage) {
            var keys = message.getMapNames();
            content = "RECEIVED MapMessage: <br/>";

            for (var i=0; i<keys.length; i++) {
                var key = keys[i];
                var value = message.getObject(key);
                var type;
                if (value == null) {
                    type = "";
                }
                else if (value instanceof String) {
                    type = "String";
                }
                else if (value instanceof Number) {
                    type = "Number";
                }
                else if (value instanceof Boolean) {
                    type = "Boolean";
                }
                else if (value instanceof Array) {
                    type = "Array";
                }
                content += key + ": " + value;
                if(type != "") {
                    content += " (" + type + ")"
                }
                content += "<br />";
            }
        }
        else {
            content = "RECEIVED UNKNOWN MESSAGE";
        }

        return content;
    }

    function jmsRequest(messageKey,message,callback){

        var correlationId = messageKey.toUpperCase();
        var messageSelector= "JMSCorrelationID = '"+correlationId+"'";

        var dest = createDestination(receiver_queue, session);
        var consumer = session.createConsumer(dest,messageSelector);

        // console.log("Consumer Message Selector :",consumer.getMessageSelector());
  
        consumer.setMessageListener(function(message) {

            console.log("Message received: ",correlationId);

            content = handleMessage(message);
            callback(content);
            try {
                consumer.close(function(){});
            }
            catch(e) {
                handleException(e);
            }
        });

        var source = createDestination(sender_queue, session);
        var producer = session.createProducer(source);
        var textMsg = session.createTextMessage(message);
        textMsg.setJMSReplyTo(dest);
        textMsg.setJMSCorrelationID(correlationId);

        try {
          var future = producer.send(textMsg, function(){
            console.log("Message Sent: ",correlationId);
          });
        } catch (e) {
          handleException(e);
        }

        producer.close();

    }

    jms = {
        jmsRequest:function(requestType,message,callback){
            function checkConnection(){
                if(!window.connStat){
                    setTimeout(function(){
                        checkConnection();
                    },50);
                }
                else {
                    jmsRequest(requestType,message,callback); 
                }
            }

            checkConnection();
        }
    };

    handleConnect(url);
    return jms;  

})();
