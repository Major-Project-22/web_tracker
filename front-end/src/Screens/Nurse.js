import { useState } from "react";
import {Table} from 'react-bootstrap'
import './Login.css'
function Nurse(){
    const [nurseWard,setnurseWard]=useState("")
    const [nurseName,setnurseName]=useState("")
    const [nurseID,setnurseID]=useState("")
    const [nurseAlreadyUse,setnurseAlreadyUse]=useState(false)
    const [nursePatientFetch,setnursePatientFetch]=useState(false)
    const [nursePatients,setnursePatients]=useState({})
    function fetchpatients(){
        fetch('http://'+window.location.hostname+':5000/nursepatients').then(response=>response.json()).then(data=>{
            setnursePatients(data)
            setnursePatientFetch(true)
        })
    }
    function handleNurseLogin(e){
        e.preventDefault();
        fetch('http://'+window.location.hostname+':5000/nurselogin',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({Name:nurseName,ID:nurseID})
            }).then(response=>response.json()).then(data=>{
                if(Object.keys(data).length ===0)
                {
                     setnurseAlreadyUse(true)
                    console.log("hit")
                }
                else{
                    console.log(data)
                    setnurseWard(data.ward)
                    setnurseAlreadyUse(false)
                    fetchpatients() 
                }
        
    })}
    return(<div>
        {nurseWard=="" && <div>
            <form onSubmit={handleNurseLogin}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={nurseName} onChange={(e)=>setnurseName(e.target.value)} className="form-control" placeholder="Enter your ID" />
                </div> <br />
                <div className="form-group">
                    <label>ID</label>
                    <input type="password" value={nurseID} onChange={(e)=>setnurseID(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit"  className="btn btn-success btn-block">Submit</button>
                {nurseAlreadyUse && <p style={{color:"red"}}>Incorrect Credentials</p>}
                <p className="forgot-password text-right password">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>}
            {nursePatientFetch && <div>  <Table striped bordered hover variant="dark">
              
  <thead>
    <tr>
      <th>Patient ID</th>
      <th>Patient Name</th>
      <th>Medicine_1</th>
      <th>Medicine_2</th>
      <th>Medicine_3</th>
      <th>Medicine_4</th>
    </tr>
   
  </thead>
  <tbody>
	{nursePatients && nursePatients.map((ele)=>{
		return (<tr>
			<td>{ele.Patient_ID}</td>
			<td>{ele.Name}</td>
            <td>{ele.Medicine_1 && <span>X</span>}</td>
            <td>{ele.Medicine_2 && <span>X</span>}</td>
            <td>{ele.Medicine_3 && <span>X</span>}</td>
            <td>{ele.Medicine_4 && <span>X</span>}</td>
            </tr>);
	})}
</tbody>
      </Table></div>}

    </div>

    );

}
export default Nurse;