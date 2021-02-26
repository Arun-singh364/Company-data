import React from 'react'
import axios from 'axios'
class Liststudent extends React.Component
{
    state = {
        companyData : [],
        cname:'',
        cdate:'',
        cphone:'',
        corg:'',
        cid:''
    }
    getCompanyData = ()=>{
        axios.get('http://localhost:5000/')
        .then(res=>{
            console.log(res);
            this.setState({companyData:res.data});
        })
    }
    componentDidMount = ()=>{
        this.getCompanyData();
    }
    handleDelete = (id)=>{
        axios.delete(`http://localhost:5000/company/${id}`)
        .then(res=>{
            console.log(res);
            window.location = '/showdata';
        })
    }
    handleUpdate = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleModalUpdate = (e)=>{
        axios.put(`http://localhost:5000/company/${this.state.cid}`,{name:this.state.cname,date:this.state.cdate,phone:this.state.cphone,org:this.state.corg})
        .then(res=>{
            console.log(res);
            this.setState({cname:'',cdate:'',cphone:'',corg:''})
            window.location = '/showdata';
        })

    }
    render()
    {
        return(
            <div>
              {
                  this.state.companyData.map(company=>(
                      <div key={company._id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:'whitesmoke',display:'inline-block',marginLeft:'15px',marginTop:'10px'}}>
                            <div class="card-body">
                                <h2>Name: {company.name}</h2>
                                <h2>Date: {company.date}</h2>
                                <h3>Phone: {company.phone}</h3>
                                <h3>Organisation: {company.org}</h3>
                                <div class="container" style={{display:'inline'}}>
                                    
                                    
                                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onClick={()=>{this.setState({cid:company._id,cname:company.name,cdate:company.date,cphone:company.phone,corg:company.org})}}>UPDATE</button>
                                    <button style={{marginLeft:'20px'}} onClick={()=>this.handleDelete(company._id)} class="btn btn-danger">DELETE</button>
                                
                                    <div class="modal fade" id="myModal" role="dialog">
                                        <div class="modal-dialog">
                                        
                            
                                        <div class="modal-content">
                                            <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">UPDATE</h4>
                                            </div>
                                            <div class="modal-body">
                                                <input onChange={(e)=>this.handleUpdate(e)} value={this.state.cname} name='cname' class="form-control" style={{marginBottom:'10px',width:'80%',fontFamily:'cursive',fontSize:'15px'}} placeholder="Name"/>
                                                <input onChange={(e)=>this.handleUpdate(e)} value={this.state.cdate} name='cdate' class="form-control" style={{marginBottom:'10px',width:'80%',fontFamily:'cursive',fontSize:'15px'}} placeholder="Date"/>
                                                <input onChange={(e)=>this.handleUpdate(e)} value={this.state.cphone} name='cphone' class="form-control" style={{marginBottom:'10px',width:'80%',fontFamily:'cursive',fontSize:'15px'}} placeholder="Phone"/>
                                                <input onChange={(e)=>this.handleUpdate(e)} value={this.state.corg} name='corg' class="form-control" style={{marginBottom:'10px',width:'80%',fontFamily:'cursive',fontSize:'15px'}} placeholder="Organisation"/>
                                
                                            </div>
                                            <div class="modal-footer">
                                            <button class="btn btn-warning" onClick={(e)=>this.handleModalUpdate(e)}>Update</button>    
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={()=>{this.setState({cname:'',cdate:'',cphone:'',corg:''})}}>Close</button>
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    
                                    </div>
                                
                            </div>
                      </div> 
                  ))
              }
            </div>
        );
    }
}
export default Liststudent;