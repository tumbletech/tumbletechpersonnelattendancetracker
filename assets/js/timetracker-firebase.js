const firebaseConfig = {
    apiKey: "AIzaSyD-IOthwIvytZ_cwlxbGleaZHjLiOippLs",
    authDomain: "tumbletech-timetracker.firebaseapp.com",
    projectId: "tumbletech-timetracker",
    storageBucket: "tumbletech-timetracker.appspot.com",
    messagingSenderId: "225574185102",
    appId: "1:225574185102:web:a84355d6745728a2a481df"
  };

  //Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
// Load your employee list JSON
fetch('/assets/data/employeepassword.json')
  .then(response => response.json())
  .then(employeeList => {
    employeeList.forEach(user => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(userCredential => {
          console.log(`✅ ${user.displayName} registered:`, userCredential.user);
        })
        .catch(error => {
          console.error(`❌ Error with ${user.email}:`, error.message);
        });
    });
  })
  .catch(err => console.error("Failed to load employee JSON:", err));

  function handleLogin(event) {
  event.preventDefault(); // Prevent form reload

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Optionally store info in localStorage
      localStorage.setItem('userEmail', email);
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
      console.error(error);
    });
}


