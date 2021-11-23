let stock1=document.getElementById("stock1")
let stock2=document.getElementById("stock2")
let stock3=document.getElementById("stock3")
let stock4=document.getElementById("stock4")
let log=document.getElementById("log")
function refill_a(){
    fetch('/refill_a', {
        cache: "no-cache",
        method: 'GET',
        credentials: 'omit',
        headers: new Headers({ "content-type": "application/json" })
     })
}
function refill_b(){
    fetch('/refill_b', {
        cache: "no-cache",
        method: 'GET',
        credentials: 'omit',
        headers: new Headers({ "content-type": "application/json" })
     })
}
function refill_c(){
    fetch('/refill_c', {
        cache: "no-cache",
        method: 'GET',
        credentials: 'omit',
        headers: new Headers({ "content-type": "application/json" })
     })
}
function refill_d(){
    fetch('/refill_d', {
        cache: "no-cache",
        method: 'GET',
        credentials: 'omit',
        headers: new Headers({ "content-type": "application/json" })
     })
}
function update(){
    fetch('/update', {
        cache: "no-cache",
        method: 'GET',
        credentials: 'omit',
        headers: new Headers({ "content-type": "application/json" })
     }).then(response => response.json())
     .then(data =>{
         stock1.innerHTML=data[0]
         stock2.innerHTML=data[1]
         stock3.innerHTML=data[2]
         stock4.innerHTML=data[3]
     }
         
      );
}