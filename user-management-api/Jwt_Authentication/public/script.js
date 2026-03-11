async function register(){

const firstName=document.getElementById("name").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

await fetch("/user/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({firstName,email,password})

});

alert("User Registered");

}


async function login(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const res=await fetch("/user/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({email,password})

});

const data=await res.json();

localStorage.setItem("token",data.token);

window.location.href="dashboard.html";

}


async function loadUsers(){

const token=localStorage.getItem("token");

const res=await fetch("/user",{

headers:{
Authorization:token
}

});

const users=await res.json();

const div=document.getElementById("users");

users.forEach(u=>{
div.innerHTML+=`<p>${u.firstName} - ${u.email}</p>`;
});

}

if(window.location.pathname.includes("dashboard")){
loadUsers();
}