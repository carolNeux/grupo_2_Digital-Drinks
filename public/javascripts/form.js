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
    
    if (firstNameValue === '') {
        setError(firstName,'Completá el campo con tu nombre')
    } else { const firstNameValue = firstName.value.trim();
        setSucces(firstName)
    }

    if (lastNameValue === '') {
        setError(lastName,'Completá el campo con tu Apellido')
     } else { const lastNameValue = lastName.value.trim();
        setSucces(lastName)
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

    if (!isEmail(emailValue)) {
        setError(email,'El email ingresado no es  valido')
    } else {
        const emailValue = email.value.trim();
        setSucces(email)
    }
    console.log(errores);

}