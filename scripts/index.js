const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

const iconoLuzElement = document.getElementById("icono-luz");
const textoLuzElement = document.getElementById("texto-luz");
const tarjetaElement = document.getElementById("tarjetaDia");
const textoActuadorUno = document.getElementById("textoUno");
const tarjetaActuadorUno = document.getElementById("actuadorUno");
const textoActuadorDos = document.getElementById("textoDos");
const tarjetaActuadorDos = document.getElementById("actuadorDos");
const textoActuadorTres = document.getElementById("textoTres");
const tarjetaActuadorTres = document.getElementById("actuadorTres");
const textoActuadorCuatro = document.getElementById("textoCuatro");
const tarjetaActuadorCuatro = document.getElementById("actuadorCuatro");

// Elements for sensor readings
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");
const luzElement = document.getElementById("luz");
const voltElement = document.getElementById("volt");
const ampElement = document.getElementById("amp");
const potElement = document.getElementById("pot");
const kwhElement = document.getElementById("kwh");
const led1Element = document.getElementById("led1");
const led2Element = document.getElementById("led2");
const led3Element = document.getElementById("led3");
const led4Element = document.getElementById("led4");

var dbPathLed1;
var dbPathLed2;
var dbPathLed3;
var dbPathLed4;

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='flex';
    userDetailsElement.style.display ='flex';
    userDetailsElement.innerHTML = user.email;
    document.getElementById("video-login").style.display = "none";
    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathTemp = 'UsersData/' + uid.toString() + '/temperature';
    var dbPathHum = 'UsersData/' + uid.toString() + '/humidity';
    var dbPathPres = 'UsersData/' + uid.toString() + '/pressure';
    var dbPathLuz = 'UsersData/' + uid.toString() + '/luminocity';
    var dbPathvolt = 'UsersData/' + uid.toString() + '/voltaje';
    var dbPathamp = 'UsersData/' + uid.toString() + '/amperaje';
    var dbPathpot = 'UsersData/' + uid.toString() + '/potencia';
    var dbPathkwh = 'UsersData/' + uid.toString() + '/kwh';
    dbPathLed1 = 'UsersData/' + uid.toString() + '/led1';
    dbPathLed2= 'UsersData/' + uid.toString() + '/led2';
    dbPathLed3 = 'UsersData/' + uid.toString() + '/led3';
    dbPathLed4 = 'UsersData/' + uid.toString() + '/led4';


    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefPres = firebase.database().ref().child(dbPathPres);
    var dbRefluz = firebase.database().ref().child(dbPathLuz);
    var dbRefVolt = firebase.database().ref().child(dbPathvolt);
    var dbRefAmp = firebase.database().ref().child(dbPathamp);
    var dbRefPot = firebase.database().ref().child(dbPathpot);
    var dbRefKwh = firebase.database().ref().child(dbPathkwh);
    //var dbPathLed = firebase.database().ref().child(dbPathLed);

    // Update page with new readings
    dbRefTemp.on('value', snap => {

      tempElement.innerText = snap.val().toFixed(2);
      var x = (new Date()).getTime(),
      y= parseFloat(snap.val().toFixed(2));

         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
    });

    dbRefPres.on('value', snap => {
      presElement.innerText = snap.val().toFixed(2);
    });

    dbRefluz.on('value', snap => {
      luzElement.innerText = snap.val().toFixed(2);

      if (luzElement.innerText < 1 ) {
        iconoLuzElement.classList.remove("fa-sun");
        iconoLuzElement.classList.add("fa-moon");
        textoLuzElement.innerText = "ES DE NOCHE";
        textoLuzElement.style.color = "#ffffff";
        tarjetaElement.style.backgroundColor = "#1F1E2B";
      } else {
        iconoLuzElement.classList.remove("fa-moon");
        iconoLuzElement.classList.add("fa-sun");
        textoLuzElement.innerText = "ES DE DÍA";
        textoLuzElement.style.color = "#ffffff";
        tarjetaElement.style.backgroundColor = "#7FC7D2";
      }
      
    });

    dbRefVolt.on('value', snap => {
      voltElement.innerText = snap.val().toFixed(2);
    });

    dbRefAmp.on('value', snap => {
      ampElement.innerText = snap.val().toFixed(2);
    });

    dbRefPot.on('value', snap => {
      potElement.innerText = snap.val().toFixed(2);
    });

    dbRefKwh.on('value', snap => {
      kwhElement.innerText = snap.val().toFixed(2);
    });

  // if user is logged out
  } else{
    // toggle UI elements
    document.getElementById("video-login").style.display = "block";
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}

function toggleLed1() {
  if (led1Element.checked) 
  {
    firebase.database().ref(dbPathLed1).set("ON");
    textoActuadorUno.innerText = "ON";
    tarjetaActuadorUno.style.backgroundColor = "#7FC7D2";
  }
  else{
    firebase.database().ref(dbPathLed1).set("OFF");
    textoActuadorUno.innerText = "OFF";
    tarjetaActuadorUno.style.backgroundColor = "#1F1E2B";
  }
}

function toggleLed2() {
  if (led2Element.checked) 
  {
    firebase.database().ref(dbPathLed2).set("ON");
    textoActuadorDos.innerText = "ON";
    tarjetaActuadorDos.style.backgroundColor = "#7FC7D2";
  }
  else{
    firebase.database().ref(dbPathLed2).set("OFF");
    textoActuadorDos.innerText = "OFF";
    tarjetaActuadorDos.style.backgroundColor = "#1F1E2B";
  }
}

function toggleLed3() {
  if (led3Element.checked) 
  {
    firebase.database().ref(dbPathLed3).set("ON");
    textoActuadorTres.innerText = "ON";
    tarjetaActuadorTres.style.backgroundColor = "#7FC7D2";
  }
  else{
    firebase.database().ref(dbPathLed3).set("OFF");
    textoActuadorTres.innerText = "OFF";
    tarjetaActuadorTres.style.backgroundColor = "#1F1E2B";
  }
}

function toggleLed4() {
  if (led4Element.checked) 
  {
    firebase.database().ref(dbPathLed4).set("ON");
    textoActuadorCuatro.innerText = "ON";
    tarjetaActuadorCuatro.style.backgroundColor = "#7FC7D2";
  }
  else{
    firebase.database().ref(dbPathLed4).set("OFF");
    textoActuadorCuatro.innerText = "OFF";
    tarjetaActuadorCuatro.style.backgroundColor = "#1F1E2B";
  }
}
