const express = require('express');
const app = express();

app.use(express.static(__dirname +'/public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/login.html')
});

app.get('/registro', (req,res)=>{
    res.sendFile(__dirname + '/register.html')
});

app.get('/productos', (req,res)=>{
    res.sendFile(__dirname + '/productDetail.html')
});

app.get('/carrito', (req,res)=>{
    res.sendFile(__dirname + '/productCart.html')
});

app.get('*', (req, res)=>{
    res.sendFile(__dirname + '/error.html')
})

app.listen(3000, ()=>console.log('Corriendo el servidor')
);
