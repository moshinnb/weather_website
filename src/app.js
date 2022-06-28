const hbs=require('hbs')
const express=require('express')
const path=require('path')
const { query } = require('express')
const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
console.log(publicDirectoryPath);
app.use(express.static(publicDirectoryPath))

const port=process.env.PORT || 3000
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const viewsPath=path.join(__dirname,'../templates/views/')

const partialPath=path.join(__dirname,'../templates/partials/')
//it is important to render out
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);




app.get('',(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:'mohsin'
    })
    
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:"About Me",
        name:"mohsin bepari"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'provide which place to search'
        })
    }

    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
           res.send({
            forecast:forecastData,
            location,
            address:req.query.address
           }) 
        })
    })
    
        
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
        error:"you must provide a search term"
    })
    }
   console.log( req.query.search);
    res.send({products:[]})
})



app.get('/help',(req,res)=>{
    res.render('help',{title:'Help Page',name:'mohsin'})
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"mohsin",
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
res.render('404',{
    title:404,
    name :"mohsin",
    errorMessage:"page not found"})
})

app.listen(port,()=>{
    console.log(`server is upto ${port}`)
})
