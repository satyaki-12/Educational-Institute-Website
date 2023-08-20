// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDJvkObMhjqsMLh7ZK5tIoHS-uDVUd6qPM",
  authDomain: "contactform-cc27d.firebaseapp.com",
  databaseURL:
    "https://contactform-cc27d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "contactform-cc27d",
  storageBucket: "contactform-cc27d.appspot.com",
  messagingSenderId: "246487084583",
  appId: "1:246487084583:web:dbaad366ea3bcb9ef06802",
  measurementId: "G-SRLY1R4700",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Firebase (ADD YOUR OWN DATA)

// Reference messages collection

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal("name");
  var classid = getInputVal("classid");
  var email = getInputVal("email");
  var phone = getInputVal("phone");
  var message = getInputVal("message");

  // Save message
  saveMessage(name, classid, email, phone, message);

  // Show alert
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, classid, email, phone, message) {
  const obj = {
    name: name,
    class: classid,
    email: email,
    phone: phone,
    message: message,
  };
  db.collection("messages")
    .add(obj)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);

      var alertInfo = document.querySelector(".alert");
      alertInfo.style.display = "block";

      // Hide alert after 3 seconds
      setTimeout(function () {
        alertInfo.style.display = "none";
      }, 3000);

      // Clear form
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);

      var alertInfo = document.querySelector(".alert");

      alertInfo.style.background = "red";
      alertInfo.innerHTML = "Something went wrong. Please try again!";
      // Hide alert after 3 seconds
      setTimeout(function () {
        alertInfo.style.display = "none";
        alertInfo.innerHTML = "Your message has been sent";
      }, 3000);
    });
}
