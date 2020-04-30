import React from "react";
import "../Css/selfie.css";
import WebCam from "./selfie";
import { makeStyles, styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import CameraFrontIcon from "@material-ui/icons/CameraFront";
import history from "../history";

import verifyIdentity from '../Assets/verifyIdentity.png';
const MySkeleton = styled(Skeleton)({
  alignItems: "center",
  textalign: "center",
});

class TakePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.webcam = null;

    this.state = {
      image: "",
      error: "",
      clickme: false,
      retake: false,
    };
  }
  componentDidMount() {
    this.CanvasElement = document.createElement("canvas");
    this.con = document.getElementById("cancamera");
    console.log(this.con);
    this.context = this.con.getContext("2d");
    console.log(this.context);
    this.video = document.createElement("video");
    this.video.src = "urlToVideo.mp4";
    this.video.width = "350";
    this.video.height = "300";
    this.video.play();
    this.webcam = new WebCam(this.video, this.CanvasElement, this.context);
    this.webcam.SetUp().catch(() => {});
    this.webcam.setup2();
  }
  handleOnClick = (ev) => {
    const name = ev.target.name;
    if (name === "click") {
      const img = this.webcam.takeBase64Image();
      this.setState({ img: img.base64, clickme: !this.state.clickme });
      console.log(img.base64.length);
      sessionStorage.setItem("img", img.base64);
    } else if (name === "retake") {
      this.setState({ clickme: !this.state.clickme });
    } else if (name === "looksgood") {
      this.setState({ retake: !this.state.retake });
    } else if (name === "submit") {
      if (sessionStorage.getItem("img")) {
        this.webcam.destroy();
        history.push("/docs");
        alert("sucessfully submitted");
      } else {
        alert("click your selfie for submit");
      }
    }

    ev.preventDefault();
  };

  render() {
    const { img, error, clickme, retake } = this.state;

    const clickbutton = !error ? (
      <button
        name="click"
        className="button"
        disabled={clickme}
        onClick={this.handleOnClick}
      >
        CLICK <CameraFrontIcon fontSize="large" />
      </button>
    ) : null;
    const retakebutton = (
      <button
        name="retake"
        className="button"
        disabled={!clickme || retake}
        onClick={this.handleOnClick}
      >
        RETAKE
      </button>
    );
    const looksgoodbutton = (
      <button
        name="looksgood"
        className="button"
        disabled={!clickme || retake}
        onClick={this.handleOnClick}
      >
        LOOKSGOOD
      </button>
    );
    const IMAGE = img ? img : sessionStorage.getItem("img");

    return (
      <div className="App-header">
        <Container id="PageContainer">
          
            <Card className="HeaderCard" id="HeaderCard">

              <CardContent color="primary">
                <img src={verifyIdentity} id="VerifyLogo" alt="VerifyLogo"></img>
                <Typography id="SessionHeadings"><strong  > Verify your Identity</strong></Typography>
                <Typography id="ContentText"> 
                    Please upload a Selfie and provide personal details for KYC verification
                </Typography>
                
              </CardContent>
            </Card>

            
            <Card id="PreviewCard">
             <CardContent  id="CaptureCardHeading" color='primary'>
                <strong> Take a Selfie</strong>
              </CardContent>
              <CardContent color='secondary' id="CaptureCardContent" > 
                {" "}
                <Typography id="ContentText">
                  Make sure your whole face is clearly visible without any glare
                  or blur.Make sure that your whole face will fit inside oval
                </Typography>{" "}
              </CardContent>

              <CardMedia>
                {" "}
                <canvas id="cancamera" width="300" height="200"></canvas>
              </CardMedia>
              <CardActions>{clickbutton}</CardActions>
            </Card>



 
            <Card id="CaptureCard">
              <CardContent id="CaptureCardHeading">
                <div className="text">
                  <strong> Preview</strong>
                </div>
              </CardContent>

              
              <CardContent id="PreviewImage">
                {IMAGE ? (
                  <div>
                    <img src={IMAGE} alt="You see your Selfie here " />
                  </div>
                ) : (
                  <MySkeleton
                    variant="react"
                    width={400}
                    height={350}
                    animation={false}
                  ></MySkeleton>
                )}
              </CardContent>

              <CardActions>
                {retakebutton} <span></span> {looksgoodbutton}
              </CardActions>


              <CardContent id="ContentText">

                <EnhancedEncryptionIcon /> Your Photo will be used only for KYC
                purpose
              </CardContent>

              <button
                name="submit"
                className="button"
                style={{ backgroundColor: "green" }}
                onClick={this.handleOnClick}
              >
                SAVE & CONTINUE
              </button>
            </Card>
         
        </Container>
      </div>
    );
  }
}
export default TakePhoto;
