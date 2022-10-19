const myForm = document.querySelector('#my-form');
myForm.addEventListener('submit', onSubmit);
const fName = document.querySelector("#fname");
const lName = document.querySelector("#lname");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#bdate");



function onSubmit(e) {
  e.preventDefault(); 
  const divEl = document.getElementById("info");
  const info = document.createElement('div');
  info.innerHTML = `Name: ${fName.value} ${lName.value} Email: ${email.value} Birthday: ${birthDate.value}`;
  divEl.appendChild(info);
  


}