import { useState,useEffect } from 'react';
import {Card,Table} from 'react-bootstrap'

import Footer from './Footer'
import './Home.css'

function Home(){
  const[A,setA]=useState(0)
  const[B,setB]=useState(0)
  const[C,setC]=useState(0)
  const[D,setD]=useState(0)
  const[stock,setstock]=useState({})
  const[stockcomplete,setstockcomplete]=useState(false)
  function checkStock(){
    fetch('http://'+window.location.hostname+':5000/checkStock').then(response=>response.json()).then(data=>{
      if(Object.keys(data).length ===0){
        setstock(false)
      }
      else{
        setstock(data)
      }
      setstockcomplete(true)
      console.log("stock fetch function")
    })

  }
  useEffect(()=>{
    Aquantity()
  },[""])
  useEffect(()=>{
    Bquantity()
  },[""])
  useEffect(()=>{
    Cquantity()
  },[""])
  useEffect(()=>{
    Dquantity()
  },[""])
  useEffect(()=>{
    console.log("Something")
    checkStock()},[""])
  function Aquantity(){
    fetch('http://'+window.location.hostname+':5000/Aquantity').then(response=>response.json()).then(data=>{
      console.log(data)
      setA(data.quantity)
    })
  }
  function Bquantity(){
    fetch('http://'+window.location.hostname+':5000/Bquantity').then(response=>response.json()).then(data=>{
      setB(data.quantity)
    })
  }
  function Cquantity(){
    fetch('http://'+window.location.hostname+':5000/Cquantity').then(response=>response.json()).then(data=>{
      setC(data.quantity)
    })
  }
  function Dquantity(){
    fetch('http://'+window.location.hostname+':5000/Dquantity').then(response=>response.json()).then(data=>{
      setD(data.quantity)
    })
  }
  function restockA(){
    fetch('http://'+window.location.hostname+':5000/restock',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({Medicine_name:"Medicine 1"})
    }).then(setA(10))
  }
  function restockB(){
    fetch('http://'+window.location.hostname+':5000/restock',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({Medicine_name:"Medicine 2"})
    }).then(setB(10))
  }
  function restockC(){
    fetch('http://'+window.location.hostname+':5000/restock',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({Medicine_name:"Medicine 3"})
    }).then(setC(10))
  }
  function restockD(){
    fetch('http://'+window.location.hostname+':5000/restock',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({Medicine_name:"Medicine 4"})
    }).then(setD(10))
  }
    return(
        <div><br></br>
          <div className="medicine-cards">
        <Card
    bg="primary"
    text="light"
    style={{ width: '18rem','left':'25px'}}
    className="mb-2"
  >
    <Card.Header onLoad={Aquantity}>Medicine 1</Card.Header>
    <Card.Body>
      <Card.Title>{A} tablets left </Card.Title>
      <Card.Text>
        <a onClick={restockA} href="#home" style={{color:'white'}}>Restock</a>
      </Card.Text>
    </Card.Body>
  </Card>
  <Card
    bg="success"
    text="light"
    style={{ width: '18rem',position:'absolute',left:'350px',top:'100px' }}
    className="mb-2"
  >
    <Card.Header  onLoad={Bquantity}>Medicine 2</Card.Header>
    <Card.Body>
      <Card.Title>{B} tablets left </Card.Title>
      <Card.Text>
        <a href="#home" onClick={restockB} style={{color:'white'}}>Restock</a>
      </Card.Text>
    </Card.Body>
  </Card>
  <Card
    bg="warning"
    text="light"
    style={{ width: '18rem',position:'absolute',left:'675px',top:'100px' }}
    className="mb-2"
  >
    <Card.Header onLoad={()=>{alert("dadasd")}}>Medicine 3</Card.Header>
    <Card.Body>
      <Card.Title>{C} tablets left </Card.Title>
      <Card.Text>
        <a href="#home" onClick={restockC} style={{color:'white'}}>Restock</a>
      </Card.Text>
    </Card.Body>
  </Card>
  <Card
    bg="info"
    text="light"
    style={{ width: '18rem',position:'absolute',left:'1000px',top:'100px' }}
    className="mb-2"
  >
    <Card.Header onLoad={Dquantity}>Medicine 4</Card.Header>
    <Card.Body>
      <Card.Title>{D} tablets left </Card.Title>
      <Card.Text>
        <a href="#home" onClick={restockD} style={{color:'white'}}>Restock</a>
      </Card.Text>
    </Card.Body>
  </Card>
  </div>

  
  <h1>Medication Consumption Log</h1>
  <Table onLoad={checkStock} striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>SI No.</th>
      <th>Medication</th>
      <th>Patient</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
  {stockcomplete && stock && stock.map((ele,index)=>{
		return (<tr>
      <td>{index+1}</td>
			<td>{ele.Medication}</td>
			<td>{ele.Patient}</td>
      <td>{ele.Time}</td>
    </tr>)})}
    
  </tbody>
</Table>
  </div>
    )
}

export default Home;