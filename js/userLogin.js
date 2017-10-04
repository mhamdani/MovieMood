
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("loginBtn");

// var subBtn = document.getElementById("submitBtn");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     };


// subBtn.onclick = function(event) {
// 	modal.style.display = "none";
// 	}

//firebase
  var config = {
    apiKey: "AIzaSyChtc5y8fKeLNnMT-tt1B9T8ZR88mcxycc",
    authDomain: "login-mood.firebaseapp.com",
    databaseURL: "https://login-mood.firebaseio.com",
    projectId: "login-mood",
    storageBucket: "login-mood.appspot.com",
    messagingSenderId: "691695081824"
  };

    firebase.initializeApp(config);

var database = firebase.database();



var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#viewers").html(snap.numChildren());
});
	
	var name = "";
	var email = "";

$('#submitBtn').on("click", function(){



	 event.preventDefault();
	 name = $("#name-input").val().trim();
     email = $("#email-input").val().trim();

     database.ref().push({
        name: name,
        email: email
	});

    modal.style.display = "none";

    $("#name-input").val("");
	$("#email-input").val("");
		 	 	
 	database.ref().on("value", function(snapshot) {
 	console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().email);
	
	$("#loginBtn").html("Hi " + name + "!");
 	});

 });





// //show all objects frm firebase
// 	database.ref().on("value", function(snapshot) {
// 	 	console.log(snapshot.val());
// 		// $("#name-display").html(snapshot  

// 	}, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });
