
const request=require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=2&access_token=pk.eyJ1IjoibW9zaGlubmIiLCJhIjoiY2w0dXl1dThzMTRzajNkbzZjeHRrejJrNCJ9.LvZ2obnbsnMSmTKzwQMM4Q';
    request({url:url, json:true},(error,response)=>
     {if (error){
         callback('Unable to connect to location',undefined);
 
     }
     else if(response.body.features.length===0)
     {
         callback('Unable to find location ,Try another search.',undefined);
 
     }
     else{
         callback(undefined,{
             latitude:response.body.features[0].center[1],
             longitude:response.body.features[0].center[0],
             location:response.body.features[0].place_name
 
         })
     }
 
     })
 
 
 }   

 module.exports=geocode
//  geocode('India ',(error,data)=>
//  {console.log('Error',error);
//  console.log('Data',data);
 
//  })