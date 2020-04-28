import React from 'react';

import Webcam from 'react-webcam';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import history from "../history";
const Box = styled('div')(compose(spacing, palette));


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
       }
       else if(name==='looksgood' && side==="FRONT")
       {this.setState({'side':'BACK'});
        this.setState({'clickme':!this.state.isclick});
        this.setState({'retake':!this.state.retake}); 
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
     
      this.setState({size:img.length/1024});
      
      event.preventDefault();
    };

    HandleSubmit=(event)=>{
    const id=this.state.id;
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
      
      const img=this.state.side==='FRONT'?this.state.imgfront:this.state.imgback
      
      const dis=this.state.isclick;
  
      return (
        <div style={{backgroundColor:'orange'}}>

        <Box color='white' bgcolor='palevioletred'p={2}><strong>SELECT THE GOVERMENT ID</strong>
         <form onClick={this.changeHandler}>
    <div><button type='radio'  name='ADHAR' disabled={dis}  style={{marginRight:'10px'} ,{marginTop:"5px"},{backgroundColor:'blue'}}>ADHAR CARD</button>
         <button type='radio'  name='PAN'style={{marginTop:"5px"},{marginLeft:'50px'},{backgroundColor:'blue'}} disabled={dis} >PAN CARD</button></div>
         <button  name='LICENSE'  style={{marginTop:'10px'},{backgroundColor:'blue'}}disabled={dis} >Driving LICENSE</button>
         </form>  </Box><hr></hr>
         <Box color="white" bgcolor="lightblue" p={2}>TAKE PICTURE OF DOCUMENT FOR KYC SUBMITION:</Box>

         { dis ? <div> <div>TAKE THE PICTURE OF {this.state.side} SIDE OF YOUR {this.state.id}</div>
            <div> <button name='clickme' disabled={this.state.clickme} onClick={this.capture}>CLICK HERE</button></div>
                {this.state.looksgood?  <Box color='white'> <Webcam audio={false} height={350} ref={ref} screenshotFormat="image/jpeg"
            width={400} videoConstraints={videoConstraints} style={{backgroundColor:'white'}}/>  </Box>:null}</div>:null  }

                   <form >
                   <div> <button type='radio' name='retake' style={{marginRight:'50px'}} disabled={this.state.retake} onClick={this.changeHandler}>RETAKE</button>
                   <span>  </span>
                  <button type='radio'name="looksgood"  style={{marginLeft:'10px'}} disabled={this.state.retake} onClick={this.changeHandler} >LOOKS GOOD</button>
                   </div><br></br></form>
         
          {this.state.firstclick?<div><div>The Preview of {this.state.side} side of {this.state.id} :</div><div><img  src={img}/></div> </div>:null}
          
          
           
           
           
            <p>{this.state.id}</p><hr></hr>
            <button type='submit' name='submit'onClick={this.HandleSubmit}>SUBMIT</button>
        </div>
      );
    }
  }
  export default WebCamCapture ;