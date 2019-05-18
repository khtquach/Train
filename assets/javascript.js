// FIREBASE CONFIGURATION
var config = {
    apiKey: "AIzaSyBTI1bLpmxYqbYQ3JpN3acBUMU53QcT0Bw",
    authDomain: "train-app-bc46c.firebaseapp.com",
    databaseURL: "https://train-app-bc46c.firebaseio.com",
    projectId: "train-app-bc46c",
    storageBucket: "train-app-bc46c.appspot.com",
    messagingSenderId: "207685362986"
};
firebase.initializeApp(config);

// SETS UP FIREBASE DATABASE
var database = firebase.database();

var trainName = "";
var firstTrainTime = "";
var trainDestination = "";
var trainTimeHr = "";
var trainTimeMinute1 = "";
var trainTimeMinute2 = "";
var trainTime = "";
var trainTimeHr = "";
var trainMin = "";
var trainFreq = "";
var timeDifference = 0;
var submitButton = 0;

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var dest = childSnapshot.val().trainDestination;
    var firstTime = childSnapshot.val().firstTrainName;
    var freq = childSnapshot.val().trainFreq;

    console.log(trainDestination)
    console.log(trainFreq)
    console.log(trainName)
    console.log(firstTrainTime)

//SUBMIT BUTTON FOR USER INPUT
$("#submit").on("click", function () {
    //SETTING UP VALUES 
    trainName = $("#trainName").val().trim();
    trainDestination = $("#trainDestination").val().trim();
    trainFreq = $("#trainFreq").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();

    //UPLOADS DATA TO THE DATABASE 
    database.ref().set({
        name: trainName,
        destination: trainDestination,
        frequency: trainFreq,
        firsttrain: firstTrainTime
    })
},
    database.ref().on("value", function (snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().trainDestination);
        console.log(snapshot.val().trainFreq);
        console.log(snapshot.val().firstTrainTime);

        // Change the HTML to reflect
        $("#trainName-input").text(snapshot.val().trainName);
        $("#trainDestination-input").text(snapshot.val().trainDestination);
        $("#trainFreq-input").text(snapshot.val().trainFreq);
        $("#firstTrainTime-input").text(snapshot.val().firstTrainTime);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code) 
    }),

//CLEARS INPUT BOXES
$("trainName-input").val(""));
$("#trainDestination-input").val("");
$("#firstTrainTime-input").val("");
$("#trainFreq-input").val("");



var tFrequency = childSnapshot.val().freq;

    // Time is 3:30 AM
    var firstTime =   childSnapshot.val().first;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var nextArrival = moment(nextTrain).format("hh:mm");
var minutesAway = tMinutesTillTrain;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFreq),
    // $("<td>").text(nextArrival),
    // $("<td>").text(minutesAway),
 
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
