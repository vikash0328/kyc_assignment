import React from 'react'
import { withRouter } from 'react-router-dom';


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
    }

}
export default withRouter(Preview);