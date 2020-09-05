//jshint esversion: 6

/*
Author: Anthony Noel
Thie page has a login system where you use your voice to login

Future Development
-Use https://arwes.dev/ as a futuristic UI theme for the app with react
-Refactor the code and make it relate to a database where every user has a name and password
-Add in functionality for the id as well
-Code is very fragil
*/

const loginCreds = [
  {codename: "blackfoot", id: "9915"}
];

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//Get the items from the login form
const loginForm = document.querySelector("form");
const codenameInput = loginForm.querySelector("input[data-login=codename]");
const passwordInput = loginForm.querySelector("input[data-login=password]");

//speech recognition object
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

//Called when speech is detected
const validateLogin = (e) => {
  const transcript = e.results[0][0].transcript;
  console.log(transcript);

  //WHen it ends check it against the loginCreds object
  if(e.results[0].isFinal) {
    console.log("Let's see the final");
    console.log("Final Transcript "+transcript);
    if(transcript.includes("codename") || transcript.includes("code name")) {
      codenameInput.textContent = `${transcript.replace("codename","")}`;
      if(transcript.includes("black")) {
        if(codenameInput.classList.contains("red")) codenameInput.classList.remove("red");
      //Add a class of green to the codename input
      codenameInput.classList.add("green");

    } else codenameInput.classList.add("red");

    //Loop through every login crediential and see if the codename and pasword match
    // loginCreds.forEach(login => {
    //   if(transcript.includes(`code name `)) {
    //     console.warn("You got the login!");
    //   }
    // });
    // if(transcript.includes("i d") || transcript.includes("ID")) {
    //   passwordInput.textContent=`${transcript.replace("id","")}`;
    //   if(transcript.includes("1234")) {
    //   //Add a class of green to the password/id input
    //
    //   passwordInput.classList.add("green");
    // } else passwordInput.classList.add("red");


    //Check if both inputs are green
      if(codenameInput.classList.contains("green")) loginSuccess();
  }}
};


const loginSuccess = () => {
  console.log("loginSuccess");

    //change the text of the header to Login Successful and welcome
    document.querySelector("h1").textContent = "Login Successful!";
    document.querySelector("h2").textContent = "Welcome";


};



//when the page laods
const initPage = () => {
  //add an event listener for the speech recognition
  recognition.addEventListener("result", validateLogin);
  //Start the recognition
  recognition.start();
  //When you stop speaking start it again
  recognition.addEventListener("end", recognition.start);

  //Add an event listener for the form if it's changed
  codenameInput.addEventListener("input",loginSuccess);
};


initPage();
