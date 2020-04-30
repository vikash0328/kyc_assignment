import React from 'react'
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import '../Css/Docs.css';
import { green } from '@material-ui/core/colors';

class Preview extends React.Component{
    constructor(props)
    {
        super(props);
         this.state={
             name:'XYZ',
             dateofbirth:'08/05/1998',
             gender:'MALE',
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
      }
      ev.preventDefault();
    }
    render(){
        return(
<div id="DocsMain">

          
<div id="DocsBox" >
       <card>
           <cardcontent id="DocsHeading"> 
           <strong>Preview Page</strong>
           </cardcontent>
       </card>
       
    <hr style={{width:'60%'}}/>
       <card>
           
           <cardcontent>
             <div><strong>Name:</strong >{this.state.name}</div>
             <div><strong>Date Of Birth:</strong> {this.state.dateofbirth}</div>
             <div><strong>Gender:</strong>{this.state.gender}</div>

           </cardcontent>
       </card>                     
   </div>
   <div id="DocsBox">
  

        <div id="DocsSelfieHeading"><strong>Selfie:</strong></div>
        <div><img src={this.state.img} id="DocsImage" alt='Selfie'></img></div>
        <hr style={{width:'80%'}}/>

    </div> 

    <div id="DocsBox">   
 
    <div id="DocsSelfieHeading"> <strong>Goverment ID:</strong>{this.state.id}</div>
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