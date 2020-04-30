import React, { useState } from "react";

import "../Css/Page1.css";
import history from "../history";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import { makeStyles} from "@material-ui/core/styles";

import loginLogo from "../Assets/login.jpg";
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
  const [name, setname] = useState([]);
  const [password, setpassword] = useState([]);
  
  const verifypass = (event) => {
   event.preventDefault();
    fetch("http://localhost:8000/users?name=" + name + "&&password=" + password).then((result) => {
    result.json().then((resp) => {
      if(resp.length>0){
            //password encryption...............
            //............
            localStorage.setItem("auth","app");
            history.push("/detail");
      }
      else{
        alert("Wrong Credentials");
        window.location.reload()
      }
    })
  })

    // var ippassword = document.getElementById("password").value;
    // console.log(ippassword);
    // localStorage.setItem("myData", ippassword);
  };
  const handleChangeName = (e) => {
    setname(e.target.value);
  };
  const HandlePassword = (e) => {
    setpassword(e.target.value);
  };
  return (
    <div className="main">
      <h3 class="text-center default-text">Hi! Welcome to ZestMoney</h3>
      <h5 class="text-center default-text">One stop KYC solution</h5>
      <img id="loginLogo" src={loginLogo} alt="customer image"></img>
      <Typography id="signInHeading" component="h1" variant="h5">
        Sign in
      </Typography>
      <div className="App">
        <div className="form" >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="UserName"
            name="username"
            autoComplete="username"
            autoFocus
            placeholder="Tony@abc"
            onChange={handleChangeName}
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
            onChange={HandlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button className="Tap" type="submit" fullWidth colour="sucess" variant="contained" onClick={verifypass} >
            GET OTP
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormUserAuth;
