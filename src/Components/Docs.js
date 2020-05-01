import React from 'react'
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import '../Css/Docs.css';
import { green } from '@material-ui/core/colors';
import history from '../history'
var CryptoJS = require("crypto-js");

class Preview extends React.Component{
    constructor(props)
    {
        super(props);
         this.state={
             name: JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('Name'), 'my-secret-key@123').toString(CryptoJS.enc.Utf8)),
             dateofbirth:JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('DOB'), 'my-secret-key@123').toString(CryptoJS.enc.Utf8)),
             gender:JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('gender'), 'my-secret-key@123').toString(CryptoJS.enc.Utf8)),
             img:sessionStorage.getItem('img'),
             imgfront:sessionStorage.getItem('front'),
             imgback:sessionStorage.getItem('back'),
             id:sessionStorage.getItem('id')
         }
        
    }
    handleonsubmit=(ev)=>{
      const type=ev.target.name;
      if(type==='submit')
      {
    //   {  console.log(this.state.imgfront.length);
          alert('FORM IS SUBMITTED ')
          localStorage.removeItem("auth")
          history.push("/");
          window.location.reload();
      }
      ev.preventDefault();
    }
    render(){
        return(
<div id="DocsMain">

          
<div id="DocsBox" >
       <card>
           <cardcontent id="DocsHeading"> 
           <strong id="StrongText" >Preview Page</strong>
           </cardcontent>
       </card>
       
    <hr style={{width:'60%'}}/>
       <card>
           
           <cardcontent>
             <div><strong id="StrongText" >Name:</strong >{this.state.name}</div>
             <div><strong id="StrongText" >Date Of Birth:</strong> {this.state.dateofbirth}</div>
             <div><strong id="StrongText" >Gender:</strong>{this.state.gender}</div>

           </cardcontent>
       </card>                     
   </div>
   <div id="DocsBox">
  

        <div id="DocsSelfieHeading"><strong id="StrongText" >Selfie:</strong></div>
        <div><img src={this.state.img} id="DocsImage" alt='Selfie'></img></div>
        <hr style={{width:'80%'}}/>

    </div> 

    <div id="DocsBox">   
 
    <div id="DocsSelfieHeading"> <strong id="StrongText">Goverment ID:</strong>{this.state.id}</div>
    <hr style={{width:'60%'}}/>
    
    <div><img src={this.state.imgfront} id="DocsImage" alt='front side of document'></img></div>
    <div>Front side Image of {this.state.id}</div>

   
    <div><img  src={this.state.imgback} id="DocsImage" alt='back side of document'></img></div>
    <div>Back side Image of {this.state.id}</div>

    <div><button type='submit' name='submit'  onClick={this.handleonsubmit}>SUBMIT</button></div>





   </div>



  
</div>
 

        );
    }

}
export default withRouter(Preview);