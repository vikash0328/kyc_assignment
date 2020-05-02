// .........Page 2 code
// ......
// ...redirecting not done

import React from "react";
import history from "../history";
import "../Css/Page1.css";
import "../Css/Page2.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";

// Below belongs to only page 2----------------
//--------------------

import custo from "../Assets/customer.jpg";
const logOut = () => {
  localStorage.removeItem("auth");
  history.push("/");
};
var CryptoJS = require("crypto-js");

function Register() {
  var name = document.forms["RegForm"]["Name"];
  var dob = document.forms["RegForm"]["DOB"];
  var gender = document.forms["RegForm"]["gender"];
  if (gender.value == "") {
    alert("Please select your gender.");
    gender.focus();
    return false;
  }
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("Name", name.value);
    sessionStorage.setItem("DOB", dob.value);
    sessionStorage.setItem("gender", gender.value);
  }
  return true;
}
function detec() { 
  
  if (navigator.userAgent.match(/Android/i) 
      || navigator.userAgent.match(/webOS/i) 
      || navigator.userAgent.match(/iPhone/i)  
      || navigator.userAgent.match(/iPad/i)  
      || navigator.userAgent.match(/iPod/i) 
      || navigator.userAgent.match(/BlackBerry/i) 
      || navigator.userAgent.match(/Windows Phone/i)) { 
      
  } else { 
     alert('We require particular functionality of mobile phones ,so please use mobile phone');
     //history.push("/");
  } 
  
}




function verifypass(event) {
  event.preventDefault();
  var Name = CryptoJS.AES.encrypt(
    JSON.stringify(sessionStorage.getItem("Name")),
    "my-secret-key@123"
  ).toString();
  var DOB = CryptoJS.AES.encrypt(
    JSON.stringify(sessionStorage.getItem("DOB")),
    "my-secret-key@123"
  ).toString();
  var gender = CryptoJS.AES.encrypt(
    JSON.stringify(sessionStorage.getItem("gender")),
    "my-secret-key@123"
  ).toString();
  sessionStorage.setItem("Name", Name);
  sessionStorage.setItem("DOB", DOB);
  sessionStorage.setItem("gender", gender);
  console.log(gender);
  detec();
  history.push("/selfie");
  // var ippassword = document.getElementById("password").value;
  // console.log(ippassword);
  // localStorage.setItem("myData", ippassword);
  // if (true) {
  //   return <Redirect to="./components/Details" />;
  // }
}

//password encryption...............
//............

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FormDetailUser() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div id="DetailsPageMain" className="main">

      {localStorage.getItem("auth") ? (
        <button onClick={logOut}>logout</button>
      ) : null}

      <h3 id="DetailsPageDefault" class="text-center default-text">Help us setup your account</h3>
      <p id="DetailsPageHeading" className="heading">

        <img id="cus" src={custo} alt="customer image"></img> 
        We'll verify it with your KYC documents{" "}
      </p>

      <div className="App">
        <form className="form" onSubmit={verifypass}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Your Full Name"
            name="fullName"
            autoComplete="fullName"
            autoFocus
            placeholder="eg.Tony Stark"
            onChange={(ev) => {
              sessionStorage.setItem("Name", ev.target.value);
            }}
          />

          
          <Typography id="DetailsPageCaption" variant="caption">
            Ensure it matches name on your PAN
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dob"
            label="Date of Birth"
            name="dob"
            autoComplete="dob"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={(ev) => {
              sessionStorage.setItem("DOB", ev.target.value);
            }}
          />

          <div
            id="genderElement"
            class="custom-control custom-radio custom-control-inline"
          >
            <input
              type="radio"
              class="custom-control-input"
              id="Male"
              name="inlineDefaultRadiosExample"
              required
              onChange={(ev) => {
                sessionStorage.setItem("gender", ev.target.id);
              }}
            />
            <label class="custom-control-label" for="defaultInline1">
              Male
            </label>
            <input
              type="radio"
              class="custom-control-input"
              id="Female"
              name="inlineDefaultRadiosExample"
              onChange={(ev) => {
                sessionStorage.setItem("gender", ev.target.id);
              }}
            />
            <label class="custom-control-label" for="defaultInline1">
              Female
            </label>
            <input
              type="radio"
              class="custom-control-input"
              id="Other"
              name="inlineDefaultRadiosExample"
              onChange={(ev) => {
                sessionStorage.setItem("gender", ev.target.id);
              }}
            />
            <label class="custom-control-label" for="defaultInline1">
              Others
            </label>
          </div>

          <Button
            id="submitButton"
            type="submit"
            fullWidth
            colour="primary"
            variant="contained"
          >
            CONTINUE
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormDetailUser;
