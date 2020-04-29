import React from "react";
import { Route, Switch } from "react-router-dom";
import FormUserAuth from "./Components/Page1";
import WebCamCapture from "./Components/WebCam";
import FormDetailUser from "./Components/Page2";
import TakePhoto from "./Components/handleSelfie";
import Preview from "./Components/Docs";
import PrivateRoute from './Components/Utility/PrivateRoutes'
const App = () => {
  React.useEffect(() => {
    // localStorage.setItem("auth",false);
  }, [])
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <FormUserAuth />
          </Route>
          <Route exact path="/detail" render={() => <FormDetailUser/>}/>
          <Route path="/selfie">
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
          </Route>
        </Switch>
      </div>
    );
}
export default App;