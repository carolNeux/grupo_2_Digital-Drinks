const form = document.querySelector('form');
const firstName = document.querySelector('.first_name');
const lastName = document.querySelector('.last_name');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const birthday = document.querySelector('.date');
const password = document.querySelector('.password');

// console.log(form);
console.log(firstName);
console.log(lastName);
console.log(username);
console.log(email);
console.log(birthday);
console.log(password);

let errores = {};

let errores = {}
function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}    


}    
form.addEventListener('submit',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const firstNameValue =firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    
    if (firstNameValue === '') {
        setSucces(firstName)
    }

    if (lastNameValue === '') {
        setError(lastName,'Completá el campo con tu Apellido')
     } else { const lastNameValue = lastName.value.trim();
      }
        setSucces(lastName)
      }
    if (usernameValue === '') {
      setError(username,'El campo no puede estar vacio')
    }   else {
      setSucces(username)
    }

    if (userNameValue === '') {
        setError(username,'Completá el campo con tu nombre de usuraio')
     } else {const userNameValue = userName.value.trim();
        setSucces(username)
    }
    // falta validar si es mayor a 18
    if (birthday === '') {
       setError(birthday,'Completá tu fecha de nacimiento')
     } 
     else {
      const birdthday = document.querySelector('.date');
      setSucces(birdthday)
    }
        setError(birthday,'El campo no puede estar vacio')
      }   else {
        setSucces(birthday)
      }
    
    if (!isEmail(emailValue)) {
        setError(email,'El email ingresado no es  valido')
        setError(email,'El email ingresado no es valido')
    } else {
        const emailValue = email.value.trim();
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
