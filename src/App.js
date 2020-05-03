import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import FormUserAuth from "./Components/Page1";
import WebCamCapture from "./Components/WebCam";
import FormDetailUser from "./Components/Page2";
import TakePhoto from "./Components/handleSelfie";
import Preview from "./Components/Docs";
import Protected from "./Components/Protected.js";
import history from './history'

const App = () => {
  React.useEffect(() => {
    localStorage.setItem("dark","dark");
  }, []);
  return (
    <div className="App">
      
      <Switch>
        <Route exact path="/" component={FormUserAuth} />
        <Protected exact path="/detail" component={FormDetailUser} />
        <Protected exact path="/selfie" component={TakePhoto} />
        <Protected exact path="/docs" component={WebCamCapture} />
        <Protected exact path="/final" component={Preview} />
        {/* <Route path="/selfie">
            {" "}
            <TakePhoto />{" "}
          </Route>
          <Route path="/docs">
            {" "}
            <WebCamCapture />{" "}
          </Route>
          <Route path="/final">
            {" "}
            <Preview />{" "}
          </Route> */}
      </Switch>
    </div>
  );
};
export default App;
