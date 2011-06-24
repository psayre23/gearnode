var Gearman = require("./gearman");

client = new Gearman();
client.addServer("localhost", 7003);

client.getExceptions(function(err, success){
    console.log(arguments);
});

var job = client.submitJob("reverse", "Hello world!", {encoding:"base64"});    

job.on("created", function(handle){
    console.log("Job created as '"+handle+"'");
});

job.on("complete", function(response){
    console.log("Job ready: '"+response+"'");
    client.end();
});

job.on("fail", function(){
    console.log("Job failed");
    client.end();
});

job.on("exception", function(message){
    console.log("Exception '"+message+"'");
});

job.on("warning", function(message){
    console.log("Warning '"+message+"'");
});

job.on("data", function(message){
    console.log("Data '"+message+"'");
});