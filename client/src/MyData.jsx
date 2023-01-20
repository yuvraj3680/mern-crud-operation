import React, { Component } from 'react';
import Axios from 'axios';
 
class MyData extends React.Component {
   state={
    myID: 0,
    empName:'None',
    deptName:'None',
    Salary:0,
    Err:'-',
    Arr1 : [],
    Arr2 : []

   }
    submitData=()=>
    {
        let str1 = "insert into emp values("+this.state.myID+",'"+this.state.empName+"','"+this.state.deptName+"',"+this.state.Salary+")";
      Axios.post("http://localhost:3009/api/NonQuery",{mySQL:str1}).then(
      (e)=>  
      {
        this.setState({Err:e.data})
      }
      )
    }
    MyReadData=()=>
    {
        let str1='Select * from emp';
        Axios.get("http://localhost:3009/api/DataQuery",{params:{sql:str1}}).then((res)=>{
            this.setState({Arr1:res.data})
        })
    }
    MyUpdate=(e)=>
    {
        let str1='Select * from emp where Id = '+e.target.id;
        Axios.get("http://localhost:3009/api/DataQuery",
        {params:{sql:str1}})
        .then(
            (res)=>{
                this.setState({Arr2: res.data})
                document.getElementById('t1').value=this.state.Arr2[0].id
                document.getElementById('t2').value=this.state.Arr2[0].name
                document.getElementById('t3').value=this.state.Arr2[0].dept
                document.getElementById('t4').value=this.state.Arr2[0].salary
            }
        )
    }
    updateData=()=>{
        let str1 = "Update emp set name = '"+ document.getElementById('t2').value+"'where id = "+ document.getElementById('t1').value;
        Axios.post("http://localhost:3009/api/NonQuery",{mySQL:str1}).then(
        (e)=>  
        {
          this.setState({Err:e.data})
        }
        )
    }
    deleteData=()=>{
        let str1 = "Delete from emp where id = "+ document.getElementById('t1').value;
        Axios.post("http://localhost:3009/api/NonQuery",{mySQL:str1}).then(
        (e)=>  
        {
          this.setState({Err:e.data})
        }
        )
    }
    render() {
        return <div>
 
            
 
            <div style={{ height: '800px', display: 'flex', flexDirection: 'column', alignItems:'center', border: '5px solid gray' }}>
                <input id='t1' onChange={(e)=>this.setState({myID: parseInt(e.target.value)})} style={{borderRadius: '10px', padding:'10px', height: '45px', width:'330px',margin:'10px', fontSize:'30px'}}placeholder='Enter ID'></input>
                <input id='t2' onChange={(e)=>this.setState({empName: e.target.value})} style={{borderRadius: '10px', padding:'10px', height: '45px', width:'330px',margin:'10px', fontSize:'30px'}} placeholder='Enter  Name'></input>
                <input id='t3' onChange={(e)=>this.setState({deptName: e.target.value})} style={{borderRadius: '10px', padding:'10px', height: '45px', width:'330px',margin:'10px', fontSize:'30px'}} placeholder='Enter subject' ></input>
                <input id='t4' onChange={(e)=>this.setState({Salary: parseInt(e.target.value)})} style={{borderRadius: '10px', padding:'10px', height: '45px', width:'330px',margin:'10px', fontSize:'30px'}} placeholder='Enter rollno' ></input>
                



                <div style={{ height: '50px',display:'flex', justifyContent:'center', fontSize: '40px' }}>
                <button onClick={this.submitData} style={{borderRadius: '10px', height: '35px',width:'100px',margin:'10px'}} >Insert</button>
                <button onClick={this.updateData} style={{borderRadius: '10px', height: '35px',width:'100px',margin:'10px'}} >Update</button>
                <button onClick={this.deleteData} style={{borderRadius: '10px', height: '35px',width:'100px',margin:'10px'}} >Delete</button>
                <button onClick={this.MyReadData} style={{borderRadius: '10px', height: '35px',width:'100px',margin:'10px'}} >Read</button>
                </div>                
                
                <div>
                   <h1>{this.state.myID},{this.state.empName},{this.state.deptName},{this.state.Salary}</h1> 
                <h2>{this.state.Err}</h2>
                <div>
                    {this.state.Arr1.map(
                (val)=>
                <div style={{display:'flex',}}>
                 <div onClick={this.MyUpdate} id = {val.id} style={{cursor:'pointer',display:'flex',flexDirection:'row',margin:'2px',width:'50px',border:'1px gray solid'}}>{val.id}</div>
                    <div style={{display:'flex',flexDirection:'row',margin:'2px',width:'300px',border:'1px gray solid'}}>{val.name}</div>
                    <div style={{display:'flex',flexDirection:'row',margin:'2px',width:'300px',border:'1px gray solid'}}>{val.dept}</div>
                    <div style={{display:'flex',flexDirection:'row',margin:'2px',width:'150px',border:'1px gray solid'}}>{val.salary}</div>
                    </div>)}
                </div>
                </div>
            </div>
 
        </div>;
    }
}
 
export default MyData;