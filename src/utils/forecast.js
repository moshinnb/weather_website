const request=require('request');


const forcast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=f95cdc92966a0065d12da786e52b0ee3&query='+longitude+','+latitude+'&units=f';
    request({url:url,json :true},(error,res)=>
    {if(error){
        callback('Unable to connect services',undefined);
    }
    else if(res.body.error){
        callback('unable to find location',undefined);
    }
    else{
        callback(undefined,"It's currently "+ res.body.current.temperature +' Fahrenheit out .there is a ' +res.body.current.feelslike+"% chance of raining");
    }
    
    })



}
module.exports=forcast;