// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD_7HADnHTZHzunSb6EmWBeyTRosvcT7zE",
    authDomain: "michaelfj-toms-restaurant.firebaseapp.com",
    databaseURL: "https://michaelfj-toms-restaurant.firebaseio.com",
    projectId: "michaelfj-toms-restaurant",
    storageBucket: "michaelfj-toms-restaurant.appspot.com",
    messagingSenderId: "452491721380",
    appId: "1:452491721380:web:2219df3feb3014c9"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$('#reservForm').on('submit', function (e) {
  e.preventDefault();
  
  var userInput = {
    name: $("#name").val();
    day: $("#day").val();
  };
// get the name of the customer and the day
  $("#name").val("");
  $("form #day").val("");
  // Create record to put into resevationRecord
  var reservationRecord = database.ref("record");
  // Use the set method to save data to the 
  reservationRecord.push(userInput);
    
  });

// 3. Retrieve reservation data when page loads
function getReservation () {
  // Use reference to database to listen for changes
    database.ref("record").on('value', function (result) {
      // Get recrod stored in the result we received back from Firebase
    var allRecords = result.val();
 
    // Set an empty array where we can add new record element
    var allInputs = [];
    // Iterate (loop) through all records coming from database call
    for (var item in allBookings) {
      // Create an object literal with the data we'll pass to Handlebars
      var data = {
        name: allBookings[item].name,
        day: allBookings[item].day,
        itemId: item
      };
      // Get the HTML from our Handlebars comment template
      var source = $("#template").html();
      // Compile our Handlebars template
      var template = Handlebars.compile(source);
      // Pass the data for these records (data) into the template
      var recordsListElement = template(data);
      // Push newly created element to array of records
      allInputs.push(recordsListElement)
    }
    // Remove all list items from DOM before appending list items
    $('.comments').empty()
    // Append each comment to the list of comments in the DOM
    for (var i in comments) {
      $(".reser-item").append(allInputs[i])
    }
  });
}
// 4). When page loads, get reservation
getReservation();

// create Google Map section

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10
    scrollwheel: false
  };
  
  var marker = new google.maps.Marker({
  position: {lat: 40.8054491, lng: -73.9654415},
  map: map
});

}