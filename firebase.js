// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDNTaXQi5DURZYQ2qgSTKPEQUjOFS_BBGU",
    authDomain: "mobile-programming-4b11e.firebaseapp.com",
    projectId: "mobile-programming-4b11e",
    storageBucket: "mobile-programming-4b11e.firebasestorage.app",
    messagingSenderId: "759317539914",
    appId: "1:759317539914:web:22f94358f30b3446a24ab3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
console.log(db);


function writeUserData(userId, firstname, lastname, e_mail, phone_no, marriedstatus, fathername, mothername, girlfriendname, kycnumber) {
  set(ref(db, 'users/' + userId),{
    firstname: firstname,
    lastname: lastname,
    e_mail: e_mail,
    phone_no: phone_no,
    marriedstatus: marriedstatus,
    fathername: fathername,
    mothername: mothername,
    girlfriendname: girlfriendname,
    kycnumber: kycnumber,
  })
}

writeUserData(1, "Shreejal", "Shrestha", "Shreejal.Shrestha@westcliff.edu", 9706094801, "Single", "Ganesh Bahadur Shrestha", "Kanchi Shrestha", "Ms.Jane", 1234567890)

