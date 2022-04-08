import React,{ useState,useEffect } from "react";
import {Table} from 'react-bootstrap'
function LOGC(){
const[fetchcomplete,setfetchcomplete]=useState(false)
const[stockC,setstockC]=useState({})
function stock(){
    fetch('http://'+window.location.hostname+':5000/fetchC').then(response=>response.json()).then(data=>{
        if(Object.keys(data).length ===0){
            setstockC(false)
          }
          else{
            setstockC(data)
          }
          setfetchcomplete(true)
          console.log(data)
    
    })
}
useEffect(()=>{
    stock()
  },[""])
return(<div>
    <h1>Medication Consumption Log - Medication C</h1>
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
      {!stockC &&<tr><td colSpan={"4"} style={{color:"red",backgroundColor:"lavender"}}>This Medication has not been consumed yet</td></tr>}
  {fetchcomplete && stockC && stockC.map((ele,index)=>{
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
export default LOGC;