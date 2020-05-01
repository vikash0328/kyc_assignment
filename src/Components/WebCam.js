import React from 'react';
import Button from '@material-ui/core/Button';
import Webcam from 'react-webcam';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import history from "../history";
import { Typography } from '@material-ui/core';
import '../Css/WebCam.css';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import Skeleton from "@material-ui/lab/Skeleton";
import verifyIdentity from '../Assets/SelfiePage1.png';
import Card from '@material-ui/core/Card';
const Box = styled('div')(compose(spacing, palette));


const MySkeleton = styled(Skeleton)({
  alignItems: "center",
  textalign: "center",
});
class WebCamCapture extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            imgfront:"",
            imgback:"",
            size:'',
            id:'',
            isclick:false,
            side:'FRONT',
            clickme:false,
            retake:true,
            firstclick:false,
            looksgood:true
        };

    }
   
    setRef = webcam => {
      this.webcam = webcam;
    }
  
     changeHandler=(event)=>{
       const name=event.target.name;
      const side=this.state.side;
       if(name==="ADHAR" || name==="PAN" || name==="LICENSE")
       {
      this.setState({'id':name});
      sessionStorage.setItem('id', name);
      this.setState({'isclick':!this.state.isclick});
       }
       else if(name==='retake')
       {
        this.setState({'clickme':!this.state.isclick});
        this.setState({'retake':!this.state.retake}); 
        this.setState({'isclick':!this.state.isclick})
       }
       else if(name==='looksgood' && side==="FRONT")
       {this.setState({'side':'BACK'});
        this.setState({'clickme':!this.state.isclick});
        this.setState({'retake':!this.state.retake}); 
        this.setState({'isclick':!this.state.isclick})
       }
       else if(name==='looksgood' && side==='BACK')
       {
        this.setState({'looksgood':!this.state.looksgood});
        this.setState({'retake':!this.state.retake});
        
       }
      event.preventDefault();
     }



    capture = (event) => {
      
        const img=this.webcam.getScreenshot();
        if(this.state.side==='FRONT')
        {
          this.setState({imgfront:img });
          sessionStorage.setItem('front', img);
        }
        else if(this.state.side==='BACK'){
            this.setState({imgback:img });
            sessionStorage.setItem('back', img);
         }
         this.setState({'firstclick':true}); 
         this.setState({'clickme':!this.state.clickme});   
         this.setState({'retake':!this.state.retake});
         this.setState({'isclick':!this.state.isclick})
     
      this.setState({size:img.length/1024});
      
      event.preventDefault();
    };

    HandleSubmit=(event)=>{
    const id=this.state.id?this.state.id:sessionStorage.getItem('id');
    const front=this.state.imgfront?this.state.imgfront:sessionStorage.getItem('front');
    const back=this.state.imgback?this.state.imgback:sessionStorage.getItem('back');
    if(id && front && back)
    {console.log(front.length);
      alert("Succesfully ENTERED:")
      history.push('/final')
    }
    else{
      alert ("Some Field Are Empty")
    }
      
    event.preventDefault();
    }
  
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
      const ref=this.setRef;
      
      const img=this.state.side==='FRONT'?sessionStorage.getItem('front'):sessionStorage.getItem('back');
      
      const dis=this.state.isclick;

      return (
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
              <Button id="WebCamPageTwoButtons" className="Tap" type='radio'  name='ADHAR' disabled={dis}  style={{marginRight:'10px'} ,{marginTop:"5px"},{backgroundColor:'008000'}}>ADHAR CARD</Button>
              <Button id="WebCamPageTwoButtons" className="Tap" type='radio'  name='PAN'style={{marginTop:"5px"},{marginLeft:'50px'},{backgroundColor:'008000'}} disabled={dis} >PAN CARD</Button>
            </div>
              <Button id="WebCamPageTwoButtons" className="Tap" name='LICENSE'  style={{marginTop:'10px'},{backgroundColor:'008000'}}disabled={dis} >Driving LICENSE</Button>
          </form>





        { dis ? <div> 
          <Typography variant="subtitle1" id="WebCamText">
         
            Take the picture of  {this.state.side} side of your {this.state.id}
         
          </Typography>
             
        

          {this.state.looksgood?  <Box id="WebCamImage" color='white'> <Webcam id="WebCamImage" audio={false} height={200} ref={ref} screenshotFormat="image/jpeg"
                       width={300} videoConstraints={videoConstraints} style={{backgroundColor:'white'}}/>  </Box>:null}
                       
                       <Button 
                       fullWidth 
                       id="IdSelectionButton" className="Tap" color="sucess" name='clickme' disabled={this.state.clickme} onClick={this.capture}>CLICK HERE</Button>
                       </div>:null  }


        </div>
  
         
          <div id="WebCamBox" >

          <form >

          </form>

                   {this.state.firstclick?<div><div>
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
                       <Button fullWidth id="WebCamPageSubmit" className="Tap" type='submit' name='submit'onClick={this.HandleSubmit}>SUBMIT</Button>
                  
                     </div>:null}

                   
 


          </div>
   
           
 
        </div>
      );
    }
  }

  export default WebCamCapture ;
  
    
