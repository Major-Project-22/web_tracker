import React,{ useState,useEffect } from "react";
import {Table} from 'react-bootstrap'
function LOGA(){
const[fetchcomplete,setfetchcomplete]=useState(false)
const[stockA,setstockA]=useState({})
function stock(){
    fetch('http://'+window.location.hostname+':5000/fetchA').then(response=>response.json()).then(data=>{
        if(Object.keys(data).length ===0){
            setstockA(false)
          }
          else{
            setstockA(data)
          }
          setfetchcomplete(true)
    
    })
}
useEffect(()=>{
    stock()
  },[""])
return(<div>
    <h1>Medication Consumption Log - Medication A</h1>
  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>SI No.</th>
      <th>Medication</th>
      <th>Patient</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
  {!stockA &&<tr><td colSpan={"4"} style={{color:"red"}}>This Medication has not been consumed yet</td></tr>}
  {fetchcomplete && stockA && stockA.map((ele,index)=>{
		return (<tr>
      <td>{index+1}</td>
			<td>{ele.Medication}</td>
			<td>{ele.Patient}</td>
      <td>{ele.Time}</td>
    </tr>)})}
    
  </tbody>
</Table>
</div>)
}
export default LOGA;