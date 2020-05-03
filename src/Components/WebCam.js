import React from "react";

import Webcam from "react-webcam";
import { styled } from "@material-ui/core/styles";
import { compose, spacing, palette } from "@material-ui/system";
import history from "../history";
import { Typography } from "@material-ui/core";
import "../Css/WebCam.css";

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import Skeleton from "@material-ui/lab/Skeleton";
import verifyIdentity from '../Assets/SelfiePage1.png';
import Card from '@material-ui/core/Card';
const Box = styled('div')(compose(spacing, palette));

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
    const id = this.state.id?this.state.id:sessionStorage.getItem('id');
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
        facingMode: "user"
      };
      const ref=this.setRef;
      
      const img =
      this.state.side === "FRONT" ? this.state.imgfront : this.state.imgback;

    const dis = this.state.isclick;
    

      return (

        /*
    <div style={{backgroundColor:'white'}}>

            <Card className="HeaderCard" id="HeaderCard">
              <h3 id="SelfiePageDefault" class="text-center default-text">Please verify your Identity</h3>

             <p id="SelfiePageHeading" className="heading">

              <img src={verifyIdentity} id="VerifyLogo" alt="VerifyLogo"></img> 
                Please provide personal details for KYC verification
             </p>

            </Card>


      <div id="WebCamBox">
      <h3 id="SelfiePageDefault" class="text-center default-text">Select The government ID</h3>

          <form onClick={this.changeHandler}>
            <div id="WebCamButtonRow" >
              <Button id="WebCamPageTwoButtons" className="Tap" type='radio'  name='ADHAR' disabled={dis} >ADHAR CARD</Button>
              <Button id="WebCamPageTwoButtons" className="Tap" type='radio'  name='PAN'  disabled={dis} >PAN CARD</Button>
            </div>
              <Button id="WebCamPageTwoButtons" className="Tap" name='LICENSE'   disabled={dis} >Driving LICENSE</Button>
          </form>




        { dis ? <div> 
          <Typography variant="subtitle1" id="WebCamText">
         
            Take the picture of  {this.state.side} side of your {this.state.id}
         
          </Typography>
             
        

          {this.state.looksgood?  <Box id="WebCamImage" color='white'> <Webcam id="WebCamImage" audio={false} height={200} ref={ref} screenshotFormat="image/jpeg"
                       width={300} videoConstraints={videoConstraints} style={{backgroundColor:'white'}}/>  </Box>:null}
          

                    <Button 
                       fullWidth 
                       id="IdSelectionButton" className="Tap" color="sucess" name='clickme' disabled={!this.state.isclick} onClick={this.capture}>CLICK HERE</Button>


                       </div>:null  }



            </div>     
  
         
          <div id="WebCamBox" >



                   {img?
                   <div>
                     <div>
                      <strong>
                         The Preview of {this.state.side} side of {this.state.id} :  
                      </strong>
                     </div>
                       <div>
                        <img id="WebCamImage" src={img}/>
                       </div>
                    
                    <div id="WebCamButtonRow"> 
                      <Button id="WebCamPageTwoButtons" className="Tap" color="sucess" type='radio' name='retake'  disabled={this.state.retake} onClick={this.changeHandler}>RETAKE</Button>
                   
                       <Button id="WebCamPageTwoButtons" className="Tap" color="sucess" type='radio'name="looksgood"   disabled={this.state.retake} onClick={this.changeHandler} >LOOKS GOOD</Button>
                    </div>

                       <p>{this.state.id}</p>
                       </div>:null}
                       

               <p> <EnhancedEncryptionIcon /> Your Goverment Id will be used only for KYC
                purpose</p>
              
                       <Button fullWidth id="WebCamPageSubmit" className="Tap" type='submit' name='submit' onClick={this.HandleSubmit}>
                         SUBMIT
                        </Button>
                  
                    

                   
 


       </div>
      </div>

      */





     <div style={{backgroundColor:'white'}}>


        <Card className="WebCamHeaderCard" id="WebCamHeaderCard">
              <h3 id="SelfiePageDefault" class="text-center default-text">Please verify your Identity</h3>

             <p id="SelfiePageHeading" className="heading">

              <img src={verifyIdentity} id="VerifyLogo" alt="VerifyLogo"></img> 
                Please provide personal details for KYC verification
             </p>

          </Card>

            <Card className="HeaderCard" id="WebCamHeaderCard">


        <h3 id="SelfiePageDefault" class="text-center default-text">SELECT THE GOVERMENT ID</h3>
     
      <form onClick={this.changeHandler}>
      <div>
        <button id="WebCamButton" type='radio'  name='ADHAR' disabled={dis}  style={{marginRight:'10px'} ,{marginTop:"5px"},{backgroundColor:'green'}}>
          <strong>ADHAR CARD</strong>
        </button>
        <button id="WebCamButton" type='radio'  name='PAN'style={{marginTop:"5px"},{marginLeft:'50px'},{backgroundColor:'green'}} disabled={dis} >
          <strong>PAN CARD</strong> 
        </button>
        
      <button id="WebCamButton" name='LICENSE'  style={{marginTop:'10px'},{backgroundColor:'green'}}disabled={dis} >
        <strong>Driving LICENSE</strong>  
      </button>

      </div>

      </form> 
   
     



      { dis ? <div> <div>TAKE THE PICTURE OF {this.state.side} SIDE OF YOUR {this.state.id}</div>
         <div> 
           <button  id="WebCamClickButton" name='clickme'  style={{marginTop:'10px'},{backgroundColor:'green'}} disabled={this.state.clickme} onClick={this.capture}>
             <strong>
             CLICK HERE
             </strong>
           </button>
         </div>
             {this.state.looksgood?  <Box color='white'> <Webcam audio={false} height={200} ref={ref} screenshotFormat="image/jpeg"
         width={300} videoConstraints={videoConstraints} style={{backgroundColor:'white'}}/>  </Box>:null}</div>:null  }

                <form >
                <div> 
                  <button id="WebCamPreviewButtons" type='radio' name='retake' style={{backgroundColor:'green'}} disabled={this.state.retake} onClick={this.changeHandler}>
                    <strong>
                    RETAKE
                    </strong> 
                  </button>
                <span>  </span>
               <button id="WebCamPreviewButtons" type='radio'name="looksgood"  style={{backgroundColor:'green'}} disabled={this.state.retake} onClick={this.changeHandler} >
                 <strong>
                   LOOKS GOOD
                  </strong>
                 
               </button>
                </div><br></br></form>
      
       {this.state.firstclick?<div><div>The Preview of {this.state.side} side of {this.state.id} :</div><div>
         <img  src={img}/></div> </div>:null}
       
       
        
       </Card>

       <h3 id="SelfiePageDefault" class="text-center default-text">{this.state.id}</h3>
       
         <button id="WebCamClickButton"  type='submit' name='submit' style={{backgroundColor:'green'}} onClick={this.HandleSubmit}>SUBMIT</button>
     </div>
    
      );
                   }
}
export default WebCamCapture;
