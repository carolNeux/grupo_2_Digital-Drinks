const axios = require ('axios');
const {url,timeout} = require('./defaults');

module.exports ={
getAll(){
    return axios({
        timeout,
        method: 'GET',
        url: url
    })
} ,
getOne(id){
    return axios({
        timeout,
        method: 'GET',
        url: url + id
    })  
}
}
