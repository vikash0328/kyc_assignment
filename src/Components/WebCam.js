import React from "react";
import Button from "@material-ui/core/Button";
import Webcam from "react-webcam";
import { styled } from "@material-ui/core/styles";
import { compose, spacing, palette } from "@material-ui/system";
import history from "../history";
import { Typography } from "@material-ui/core";
import "../Css/WebCam.css";

const Box = styled("div")(compose(spacing, palette));

class WebCamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgfront: "",
      imgback: "",
      size: "",
      id: "",
      isclick: false,
      side: "FRONT",
      clickme: false,
      retake: true,
      firstclick: false,
      looksgood: true,
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  changeHandler = (event) => {
    const name = event.target.name;
    const side = this.state.side;
    if (name === "ADHAR" || name === "PAN" || name === "LICENSE") {
      this.setState({ id: name });
      sessionStorage.setItem("id", name);
      this.setState({ isclick: !this.state.isclick });
    } else if (name === "retake") {
      this.setState({ clickme: !this.state.isclick });
      this.setState({ retake: !this.state.retake });
    } else if (name === "looksgood" && side === "FRONT") {
      this.setState({ side: "BACK" });
      this.setState({ clickme: !this.state.isclick });
      this.setState({ retake: !this.state.retake });
    } else if (name === "looksgood" && side === "BACK") {
      this.setState({ looksgood: !this.state.looksgood });
      this.setState({ retake: !this.state.retake });
    }
    event.preventDefault();
  };

  capture = (event) => {
    const img = this.webcam.getScreenshot();
    if (this.state.side === "FRONT") {
      this.setState({ imgfront: img });
      sessionStorage.setItem("front", img);
    } else if (this.state.side === "BACK") {
      this.setState({ imgback: img });
      sessionStorage.setItem("back", img);
    }
    this.setState({ firstclick: true });
    this.setState({ clickme: !this.state.clickme });
    this.setState({ retake: !this.state.retake });

    this.setState({ size: img.length / 1024 });

    event.preventDefault();
  };

  HandleSubmit = (event) => {
    const id = this.state.id;
    const front = this.state.imgfront
      ? this.state.imgfront
      : sessionStorage.getItem("front");
    const back = this.state.imgback
      ? this.state.imgback
      : sessionStorage.getItem("back");
    if (id && front && back) {
      console.log(front.length);
      alert("Succesfully ENTERED:");
      history.push("/final");
    } else {
      alert("Some Field Are Empty");
    }

    event.preventDefault();
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };
    const ref = this.setRef;

    const img =
      this.state.side === "FRONT" ? this.state.imgfront : this.state.imgback;

    const dis = this.state.isclick;

    return (
      <div style={{ backgroundColor: "white" }}>
        <div id="WebCamBox">
          <Typography>
            <strong>SELECT THE GOVERNMENT ID</strong>
          </Typography>

          <form onClick={this.changeHandler}>
            <div id="WebCamButtonRow">
              <Button
                id="IdSelectionButton"
                className="Tap"
                type="radio"
                name="ADHAR"
                disabled={dis}
                style={
                  ({ marginRight: "10px" },
                  { marginTop: "5px" },
                  { backgroundColor: "008000" })
                }
              >
                ADHAR CARD
              </Button>
              <Button
                id="IdSelectionButton"
                className="Tap"
                type="radio"
                name="PAN"
                style={
                  ({ marginTop: "5px" },
                  { marginLeft: "50px" },
                  { backgroundColor: "008000" })
                }
                disabled={dis}
              >
                PAN CARD
              </Button>
            </div>
            <Button
              id="IdSelectionButton"
              className="Tap"
              name="LICENSE"
              style={({ marginTop: "10px" }, { backgroundColor: "008000" })}
              disabled={dis}
            >
              Driving LICENSE
            </Button>
          </form>

          <Box color="black" bgcolor="white" p={2}>
            <Typography>
              <strong>TAKE PICTURE OF DOCUMENT FOR KYC SUBMITION:</strong>
            </Typography>
          </Box>
        </div>

        <div id="WebCamBox">
          {dis ? (
            <div>
              <Typography variant="subtitle1" id="WebCamText">
                Take the picture of {this.state.side} side of your{" "}
                {this.state.id}
              </Typography>

              <div>
                {" "}
                <Button
                  id="IdSelectionButton"
                  className="Tap"
                  color="sucess"
                  name="clickme"
                  disabled={this.state.clickme}
                  onClick={this.capture}
                >
                  CLICK HERE
                </Button>
              </div>

              {this.state.looksgood ? (
                <Box id="WebCamImage" color="white">
                  {" "}
                  <Webcam
                    id="WebCamImage"
                    audio={false}
                    height={200}
                    ref={ref}
                    screenshotFormat="image/jpeg"
                    width={300}
                    videoConstraints={videoConstraints}
                    style={{ backgroundColor: "white" }}
                  />{" "}
                </Box>
              ) : null}
            </div>
          ) : null}
        </div>

        <div id="WebCamBox">
          <form>
            <div id="WebCamButtonRow">
              <Button
                id="IdSelectionButton"
                className="Tap"
                color="sucess"
                type="radio"
                name="retake"
                style={{ marginRight: "50px" }}
                disabled={this.state.retake}
                onClick={this.changeHandler}
              >
                RETAKE
              </Button>

              <Button
                id="IdSelectionButton"
                className="Tap"
                color="sucess"
                type="radio"
                name="looksgood"
                style={{ marginLeft: "10px" }}
                disabled={this.state.retake}
                onClick={this.changeHandler}
              >
                LOOKS GOOD
              </Button>
            </div>
          </form>

          {this.state.firstclick ? (
            <div>
              <div>
                <strong>
                  The Preview of {this.state.side} side of {this.state.id} :
                </strong>
              </div>
              <div>
                <img id="WebCamImage" src={img} />
              </div>{" "}
            </div>
          ) : null}

          <p>{this.state.id}</p>
          <Button
            id="IdSelectionButton"
            className="Tap"
            type="submit"
            name="submit"
            onClick={this.HandleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    );
  }
}
export default WebCamCapture;
