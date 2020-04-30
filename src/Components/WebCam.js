import React from 'react';

import Webcam from 'react-webcam';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import history from "../history";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import Skeleton from "@material-ui/lab/Skeleton";
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
        <div >
        <Paper>
         <Container >
         <Typography>
        <strong>SELECT THE GOVERMENT ID</strong>
        </Typography>
         <form onClick={this.changeHandler}>
    <div><button type='radio'  name='ADHAR' disabled={dis}  style={{marginRight:'10px' ,marginTop:"5px",backgroundColor:'blue'}}>ADHAR CARD</button>
         <button type='radio'  name='PAN'style={{marginTop:"5px",marginLeft:'50px',backgroundColor:'blue'}} disabled={dis} >PAN CARD</button></div>
         <button  name='LICENSE'  style={{marginTop:'10px', backgroundColor:'blue'}} disabled={dis} >Driving LICENSE</button>
         </form> 
         <Typography>
         <h>TAKE PICTURE OF DOCUMENT FOR KYC SUBMITION:</h>
         <h>Your Name and Photo should be clearly visible </h>
         </Typography>
         </Container>
         </Paper>
         <hr style={{width:'60%'}}/>
         { this.state.id ? <div>TAKE THE PICTURE OF {this.state.side} SIDE OF YOUR {this.state.id}</div>:<p> First Select Goverment Id for Click </p>}
           <div> <button name='clickme' disabled={!this.state.isclick} onClick={this.capture}>CLICK HERE</button> </div>

         { dis ? <div >
                {this.state.looksgood?  <Box color='white'> <Webcam audio={false} height={350} ref={ref} screenshotFormat="image/jpeg"
            width={400} videoConstraints={videoConstraints} style={{backgroundColor:'white'}}/>  </Box>:null}</div>:<MySkeleton
                    variant="react"
                    width={200}
                    height={200}
                    animation={false}
                  ></MySkeleton>} 

                   <form >
                   <div> <button type='radio' name='retake' style={{marginRight:'50px'}} disabled={this.state.retake} onClick={this.changeHandler}>RETAKE</button>
                   <span>  </span>
                  <button type='radio'name="looksgood"  style={{marginLeft:'10px'}} disabled={this.state.retake} onClick={this.changeHandler} >LOOKS GOOD</button>
                   </div><br></br></form>
         
          {img?<div><div>The Preview of {this.state.side} side of {this.state.id} :</div><div><img  src={img} alt='document'/></div> </div>:<MySkeleton
                    variant="react"
                    width={200}
                    height={200}
                    animation={false}
                  ></MySkeleton>}
          
          
           
          <hr style={{width:'60%'}}></hr>
            <Container>
            <Typography>
            <p> You choosen a {this.state.id}</p>
            </Typography>
            <Typography>
                <EnhancedEncryptionIcon /> Your Photo will be used only for KYC
                purpose
                </Typography>
            <button type='submit' name='submit'onClick={this.HandleSubmit}>SUBMIT</button>
            </Container>
        </div>
      );
    }
  }
  export default WebCamCapture ;