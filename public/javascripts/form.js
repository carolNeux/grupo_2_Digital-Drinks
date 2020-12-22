const form = document.querySelector('form');
const username = document.querySelector('#username');
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const birthday = document.querySelector('#dateInput');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

let errores = {}
function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}    
form.addEventListener('submit',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }  
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const firstNameValue =firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    
    if (firstNameValue === '') {
        setError(firstName,'El campo no puede estar vacio')
      }   else {
        setSucces(firstName)
      }
      if (lastNameValue === '') {
        setError(lastName,'El campo no puede estar vacio')
      }   else {
        setSucces(lastName)
      }
    if (usernameValue === '') {
      setError(username,'El campo no puede estar vacio')
    }   else {
      setSucces(username)
    }
    if (birthday === '') {
        setError(birthday,'El campo no puede estar vacio')
      }   else {
        setSucces(birthday)
      }
    
    if (!isEmail(emailValue)) {
        setError(email,'El email ingresado no es valido')
    } else {
        setSucces(email)
    }

    if (passwordValue === '') {
        setError(password,'El campo no puede estar vacio')
      }   else {
        setSucces(password)
      }

    console.log(errores);

}

function setError(input ,message){
    let box = input.parentElement
    let small = box.querySelector('small')
    
    small.innerText = message
    box.className = 'box error'
    errores[input.name] = message 
 
}

function setSucces(input) {
    let box = input.parentElement
    let small = box.querySelector('small')
    
    box.className = 'box succes'
    small.innerText = ''
    
    delete errores[input.name] 
}