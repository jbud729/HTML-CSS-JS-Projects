function animatedForm() {
  //get all the arrows 
  const arrows = document.querySelectorAll(".fa-arrow-down");
  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      // previousElementSibling shows the previous element of the current one
      // Ex. in this case it would be <input> for each <i> tag for arrow-down.
      const input = arrow.previousElementSibling;
      //Need parent for shake animation 
      const parent = arrow.parentElement;
      const nextForm = parent.nextElementSibling;
        if(input.type === "text" && validateUser(input)){
          nextSlide(parent, nextForm);
        } else if(input.type === 'email' && validateEmail(input)){
          nextSlide(parent, nextForm);
        } else if(input.type === 'password' && validateUser(input)) {
          nextSlide(parent,nextForm);
        } else{
          parent.style.animation = "shake 0.5s ease";
        }

        // get rid of animation 
        parent.addEventListener("animationend", () => {
          parent.style.animation = "";
        });
    });
  });

}

function validateUser(user) {
  if(user.value.length < 6) {
    console.log('Not enough characters');
    error('rgb(189,87,87)');
  } else{
    error('rgb(87,189,130)');
    return true;
  }
}


function validateEmail(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(validation.test(email.value)){
    error('rgb(87,189,130)');
    return true;
  }else {
    error('rgb(189,87,87)');
  }
}


function nextSlide(parent, nextForm) {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  nextForm.classList.add('active');
}

function error(color) {
  //Make sure to add .style before appropriate property to display the change
  // Ex. ... .body.style....
  document.body.style.backgroundColor = color;
}


animatedForm();
