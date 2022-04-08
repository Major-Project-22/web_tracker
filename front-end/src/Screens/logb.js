import React,{ useState,useEffect } from "react";
import {Table} from 'react-bootstrap'
function LOGB(){
const[fetchcomplete,setfetchcomplete]=useState(false)
const[stockB,setstockB]=useState({})
function stock(){
    fetch('http://'+window.location.hostname+':5000/fetchB').then(response=>response.json()).then(data=>{
        if(Object.keys(data).length ===0){
            setstockB(false)
          }
          else{
            setstockB(data)
          }
          setfetchcomplete(true)
          console.log(data)
    
    })
}
useEffect(()=>{
    stock()
  },[""])
return(<div>
    <h1>Medication Consumption Log - Medication B</h1>
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
      {!stockB &&<tr><td colSpan={"4"} style={{color:"red",backgroundColor:"lavender"}}>This Medication has not been consumed yet</td></tr>}
  {fetchcomplete && stockB && stockB.map((ele,index)=>{
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
export default LOGB;