import React from 'react'
import history from "../history";
import { withRouter } from 'react-router-dom';
// import './App.css';


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
          localStorage.removeItem("auth")
          history.push("/");
          window.location.reload();
      }
      ev.preventDefault();
    };
    render(){
        return(
         <div className='App-header ' style={{color:'green'}}>
             <hr style={{width:'60%'}}/>
             <div><strong>Preview Page</strong></div>
             <hr style={{width:'60%'}}/>
             <div>Personal Information:</div>
             <div>NAME:{this.state.name}</div>
             <div>DATE OF BIRTH: {this.state.dateofbirth}</div>
             <div>GENDER:{this.state.gender}</div>
             <hr style={{width:'80%'}}/>
              <div>Selfie:</div>
             <div><img src={this.state.img} alt='Selfie'></img></div>
             <hr style={{width:'80%'}}/>
             <div>Document:</div>
             <div> Name of Goverment ID:{this.state.id}</div>
             <hr style={{width:'60%'}}/>
             <div>Front side Image of {this.state.id}</div>
             <div><img src={this.state.imgfront} alt='front side of document'></img></div>
             <hr style={{width:'80%'}}/>
             <div>Back side Image of {this.state.id}</div>
             <div><img  src={this.state.imgback} alt='back side of document'></img></div>
             <hr style={{width:'80%'}}/>
             <div><button type='submit' name='submit'  onClick={this.handleonsubmit}>SUBMIT</button></div>

         </div>
        );
    };

}
export default withRouter(Preview);