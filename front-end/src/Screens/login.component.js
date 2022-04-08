import React from "react";
import {useState} from 'react'
import {Button, InputGroup,FormControl, Table} from 'react-bootstrap'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Login.css'
import './Doctor.css'
function Login() {
       const [Name,setName]=useState("")
       const [ID,setID]=useState("")
       const [alreadyuse,setalreadyuse]=useState(false)
       const[Ward,setWard]=useState("")
       const [patients,setpatients]=useState("")
       const [patientfetch,setpatientfetch]=useState(false)
       const [patientdetails,setpatientdetails]=useState({})
       const [patientdisplay,setpatientdisplay]=useState(false)
       const [recorddata,setrecorddata]=useState("")
       const [recordexists,setrecordexists]=useState(false)
       const [norecord,setnorecord]=useState(false)
       const [newRecord,setnewRecord]=useState("")
       const [successsubmit,setsuccesssubmit]=useState(false)
       const [medicine1,setmedicine1]=useState(false)
       const [medicine2,setmedicine2]=useState(false)
       const [medicine3,setmedicine3]=useState(false)
       const [medicine4,setmedicine4]=useState(false)
       const [medicinesadded,setmedicinesadded]=useState(false)
       const [medicinesremoved,setmedicinesremoved]=useState("None")
       function gotoprevious(){
           setpatientdisplay(false)
           setpatientfetch(true)
       }
       function remove_medicine1(){
           fetch('http://'+window.location.hostname+':5000/removemedicine1',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({ID:patientdetails.ID})
           }).then(()=>{
               setmedicine1(false)
               setmedicinesremoved("Medicine 1")})
       }
       function remove_medicine2(){
        fetch('http://'+window.location.hostname+':5000/removemedicine2',{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({ID:patientdetails.ID})
        }).then(()=>{
            setmedicine2(false)
            setmedicinesremoved("Medicine 2")})
    }
    function remove_medicine3(){
        fetch('http://'+window.location.hostname+':5000/removemedicine3',{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({ID:patientdetails.ID})
        }).then(()=>{
            setmedicine3(false)
            setmedicinesremoved("Medicine 3")})
    }
    function remove_medicine4(){
        fetch('http://'+window.location.hostname+':5000/removemedicine4',{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({ID:patientdetails.ID})
        }).then(()=>{
            setmedicine4(false)
            setmedicinesremoved("Medicine 4")})
    }
    function add_medicine1(){
        fetch('http://'+window.location.hostname+':5000/addmedicine1',{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({ID:patientdetails.ID})
        }).then(()=>{
            setmedicine1(true)
            setmedicinesadded("Medicine 1")})
    }
    function add_medicine2(){
        fetch('http://'+window.location.hostname+':5000/addmedicine2',{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({ID:patientdetails.ID})
        }).then(()=>{
            setmedicine2(true)
            setmedicinesadded("Medicine 2")})
    }
    function add_medicine3(){
        fetch('http://'+window.location.hostname+':5000/addmedicine3',{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({ID:patientdetails.ID})
        }).then(()=>{
            setmedicine3(true)
            setmedicinesadded("Medicine 3")})
    }
    function add_medicine4(){
        fetch('http://'+window.location.hostname+':5000/addmedicine4',{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({ID:patientdetails.ID})
        }).then(()=>{
            setmedicine4(true)
            setmedicinesadded("Medicine 4")})
    }
       function selectpatient(element){
        console.log(typeof(element.target.firstChild.data))
        fetch('http://'+window.location.hostname+':5000/fetchpatient',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({ID:element.target.firstChild.data})
        }).then(response=>response.json()).then(data=>{
            console.log(data)
            setmedicine1(data.Medicine_1)
            setmedicine2(data.Medicine_2)
            setmedicine3(data.Medicine_3)
            setmedicine4(data.Medicine_4)
            setpatientfetch(false)
            setpatientdetails(data)
            setpatientdisplay(true)
            setrecordexists(true)
        })
    
    }
    if(recordexists){
        fetch('http://'+window.location.hostname+':5000/fetchlog',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({ID:patientdetails.ID,Datetime:new Date().toString()})
        }).then(response=>response.json()).then(data=>{
            setrecordexists(false)
            if(data.records_exist==false){
                setnorecord(true)
            }
            setrecorddata(data)
            console.log(data)
        })
    }
       function doctorfetch(){
        fetch('http://'+window.location.hostname+':5000/doctorpatients').then(response=>response.json()).then(data=>{
            console.log(data)
           setpatientfetch(true)
           setpatients(data)
            });
        }
       
       function handleLogin(e){
           e.preventDefault();
           fetch('http://'+window.location.hostname+':5000/doctorverify',{
  method:'POST',
  headers:{'Content-type':'application/json'},
  body:JSON.stringify({Name:Name,ID:ID})
}).then(response=>response.json()).then(data=>{
    if(Object.keys(data).length ===0)
    {
         setalreadyuse(true)
        console.log("hit")
        console.log(alreadyuse)}
    else{
        console.log(data)
        setWard(data.ward)
        setalreadyuse(false) 
        doctorfetch()
    }
    })}
    function submitRecord(){
        setsuccesssubmit(false)
        fetch('http://'+window.location.hostname+':5000/submitrecord',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({Record:newRecord,Patient_id:patientdetails.ID,Doctor_id:ID,Datetime:new Date().toString()})
    }).then(setsuccesssubmit(true))
}
   
        return (<div id="dnroot">
            {Ward=="" && <div>
            <form onSubmit={handleLogin}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Enter your ID" />
                </div>
                <br />
                <div className="form-group">
                    <label>ID</label>
                    <input type="password" value={ID} onChange={(e)=>setID(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit"  className="btn btn-success btn-block">Submit</button>
                {alreadyuse && <p style={{color:"red"}}>Incorrect Credentials</p>}
            </form>
            </div>}
            {patientfetch && <div>  <div>Click the Patient ID to inspect</div><Table striped bordered hover variant="dark">
              
  <thead>
    <tr>
      <th>Patient ID</th>
      <th>Patient Name</th>
    </tr>
   
  </thead>
  <tbody>
	{patients && patients.map((ele)=>{
		return (<tr onClick={(ele)=>selectpatient(ele)}>
			<td style={{"cursor":"pointer"}}>{ele.Patient_ID}</td>
			<td>{ele.Name}</td>
			</tr>);
	})}
</tbody>
      </Table></div>}
      {patientdisplay && <div> <h5 style={{"color":"#F74721 "}}>Patient Details</h5><br/><Table responsive='md'>
    <tbody>
      <tr>
        <td>Patient ID</td>
        <td><b>{patientdetails.ID}</b></td>
        </tr>
        <tr>
        <td>Name</td>
        <td style={{"color":"green"}}><b>{patientdetails.Name}</b></td>
        </tr><tr>
        <td>Records</td>
        <td><Table responsive='sm'><thead>
      <tr>
        <th>Record</th>
        <th>Written by</th>
        <th>Datetime</th>
      </tr>
    </thead>
    <tbody>
       {norecord && <tr><td></td><td style={{color:"red"}}>No Entries Created</td><td></td></tr>}
     {norecord==false && recorddata && recorddata.map((ele)=>{
		return (<tr>
			<td>{ele.Record}</td>
			<td>{ele.Doctor}</td>
            <td>{ele.Datetime}</td>
        </tr>)})}
      </tbody></Table></td>
      </tr>
      <tr><td></td>
      <td> <Popup trigger={<Button variant="success">Create Record</Button>} modal>
          <div><h1>Write Record</h1><br/>
          <InputGroup>
    <FormControl as="textarea" value={newRecord} onChange={(e)=>setnewRecord(e.target.value)} aria-label="With textarea" />
  </InputGroup><br/>
  <Button onClick={submitRecord} variant="success">Submit</Button>{successsubmit && <p style={{color:"green"}}>Successfully submitted. Click out of this box to exit</p>}</div></Popup></td></tr>
      <tr><td>Prescribed Medication</td>
      <td><Table responsive='sm'>
      {medicine1 &&<tr><td>Medicine 1</td><td><Button onClick={remove_medicine1} variant="danger" className="danger">Remove</Button></td></tr>}
      {medicine2 &&<tr><td>Medicine 2</td><td><Button onClick={remove_medicine2} variant="danger" className="danger">Remove</Button></td></tr>}
      {medicine3 &&<tr><td>Medicine 3</td><td><Button onClick={remove_medicine3}  className="danger" variant="danger">Remove</Button></td></tr>}
      {medicine4 &&<tr><td>Medicine 4</td><td><Button onClick={remove_medicine4} variant="danger" className="danger">Remove</Button></td></tr>}
      {medicine1 && medicine2 && medicine3 && medicine4 &&<tr><td>This patient has no Prescriptions</td></tr>}
      {medicinesremoved!="None" &&<tr><td style={{color:"green"}}>{medicinesremoved} Removed Successfully</td></tr>}</Table></td></tr>
      <tr>
          <td></td>
          <td><Popup trigger={<Button variant="success" >Add Prescription</Button>} modal><div><h1>Add Prescriptions</h1><br/>
          {medicine1==false && <Button variant="primary" onClick={add_medicine1}>Add Medicine 1</Button>}<br/>
          {medicine2==false && <Button variant="warning" onClick={add_medicine2}>Add Medicine 2</Button>}<br/>
          {medicine3==false && <Button variant="info" onClick={add_medicine3}>Add Medicine 3</Button>}<br/>
          {medicine4==false && <Button variant="success" onClick={add_medicine4}>Add Medicine 4</Button>}<br/>
          {medicinesadded!="None" && <p>{medicinesadded} Precribed. Prescribe more medicines or Click out of this box to exit</p>}</div></Popup></td></tr></tbody> </Table><br/><br/>
          <Button variant="danger" className="previous-page"size="lg" onClick={gotoprevious}> &lt; Previous Page</Button></div>}
         
     
</div>
        );
    }
export default Login;