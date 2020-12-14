const form = document.querySelector('form');
const firstName = document.querySelectorAll('.first_name');
const lastName = document.querySelectorAll('.last_name');
const userName = document.querySelectorAll('.user_name');
const birdthday = document.querySelector('.date'); /*la validacion aqui sería si la fecha actual, menos la fecha ingresada es mayor a 18 entonces puede ingresar*/
const email = document.querySelector('email');
/**El password no se si se valida solo en el back */


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
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const userNameValue = userName.value.trim();
   
    const emailValue = email.value.trim();
    
    if (firstNameValue === '') {
        setError(firstName,'Completá el campo con tu nombre')
    }   else {
        setSucces(firstName)
    }

    if (lastNameValue === '') {
        setError(lastName,'Completá el campo con tu Apellido')
    }   else {
        setSucces(lastName)
    }

    if (usernameValue === '') {
        setError(userName,'Completá el campo con tu nombre de usuraio')
    }   else {
        setSucces(username)
    }
    
/* AQUI FALTA ARMAR si es mayor de 18*/ 
if (birdthday === '') {
    setError(birdthday,'Completá tu fehca de nacimiento')
}   else {
    setSucces(birdthday)
}

/*  */ 

    if (!isEmail(emailValue)) {
        setError(email,'El email ingresado no es valido')
    } else {
        setSucces(email)
    }
    console.log(errores);

}