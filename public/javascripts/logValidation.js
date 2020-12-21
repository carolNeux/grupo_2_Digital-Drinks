const form = document.querySelector('form');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

let errores = {}
   
form.addEventListener('submit',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }  
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    
    if (usernameValue === '') {
      setError(username,'El campo no puede estar vacio')
    }   else {
      setSucces(username)
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