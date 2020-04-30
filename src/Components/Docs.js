import React from 'react'
import history from "../history";
import { withRouter } from 'react-router-dom';
import "../Css/Docs.css";
import { green } from '@material-ui/core/colors';
import Card from "@material-ui/core/Card";
import Container from '@material-ui/core/Container';
class Preview extends React.Component{
    constructor(props)
    {
        super(props);
         this.state={
            name:sessionStorage.getItem('Name'),
            dateofbirth:sessionStorage.getItem('DOB'),
            gender:sessionStorage.getItem('gender'),
            img:sessionStorage.getItem('img'),
            imgfront:sessionStorage.getItem('front'),
            imgback:sessionStorage.getItem('back'),
            id:sessionStorage.getItem('id')
         }
        
    }
    handleonsubmit=(ev)=>{
      const type=ev.target.name;
      if(type==='submit')
      { console.log(this.state.imgfront.length);
          alert('FORM IS SUBMITTED ')
          history.push("/");
          window.location.reload();
      }
      ev.preventDefault();
    }
    render(){
        return(

        <div className="App-header">
                <Container id="PageContainer">
          
                
            



    <div id="DocsBox" >
       <card >
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
        <hr style={{width:'60%'}}/>
        <div><img src={this.state.img} id="DocsImage" alt='Selfie'></img></div>
        
    </div> 

    <div id="DocsBox">   
        
       <div id="DocsSelfieHeading"> <strong>Goverment ID:</strong>{this.state.id}</div>
            
       <hr style={{width:'60%'}}/>
    
         <div><img src={this.state.imgfront}  id="DocsImage" alt='front side of document'></img></div>
        <div>Front side Image of {this.state.id}</div>

        <div><img  src={this.state.imgback}  id="DocsImage" alt='back side of document'></img></div>
        <div>Back side Image of {this.state.id}</div>
        <div><button type='submit' name='submit'  onClick={this.handleonsubmit}>SUBMIT</button></div>
   </div>

   </Container>
      </div>
        );
}

}
export default withRouter(Preview);