import React from "react";

import "../Css/Page1.css";
import history from "../history";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";

import loginLogo from "../Assets/login.jpg";

import formControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import select from "@material-ui/core/Select";
import menuitem from "@material-ui/core/MenuItem";
import { FormLabel, RadioGroup, Radio } from "@material-ui/core";

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

function verifypass(event) {
  event.preventDefault();
  //password encryption...............
  //............
  history.push("/detail");
  // var ippassword = document.getElementById("password").value;
  // console.log(ippassword);
  // localStorage.setItem("myData", ippassword);
}
//.....here exists a verify pass function and encryption function has been temparoryly removed

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FormUserAuth(props) {
  return (
    <div className="main">
      <h3 class="text-center default-text">Hi! Welcome to ZestMoney</h3>
      <h5 class="text-center default-text">One stop KYC solution</h5>
      <img id="loginLogo" src={loginLogo} alt="customer image"></img>
      <Typography id="signInHeading" component="h1" variant="h5">
        Sign in
      </Typography>
      <div className="Apple">
        <form className="form" onSubmit={verifypass}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="Tony@abc.com"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            // autoFocus
            type="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button className="Tap" type="submit" fullWidth colour="sucess" variant="contained">
            GET OTP
          </Button>
        

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default FormUserAuth;
