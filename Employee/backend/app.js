const express=require('express')
const app=express();
const cors=require('cors');
const {Pool}=require('pg')

app.use(express.json())
app.use(cors())

const pool=new Pool({
    host:'localhost',
    password:'password',
    database:'employees',
    port:5432,
    user:'postgres'
})

//function to find age from dob
function getDobYear(dob,joinyear){
    const year=new Date().getFullYear();
    const age=year - Number(dob.slice(0,4));
    const currentexperience=year-joinyear;
    return  [age,currentexperience]
}
app.post('/',async(req,res)=>{
    const {empname,dob,job,email,mobile,gender,qualification,pastexperience,joinyear}=req.body;
    // console.log(empname,dob,job,email,mobile,gender,qualification,pastexperience,joinyear);
    const [age,currentexperience]=getDobYear(dob,joinyear);
    try {
        await pool.query('insert into employeedetails values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[empname ,dob ,job ,email ,mobile ,gender ,qualification ,pastexperience ,joinyear ,age ,currentexperience ])  
    } catch (error) {
        console.log(error);
    }
    res.json({msg:"posted data"})
})

app.get('/',async(req,res)=>{
    try {
        const r=await pool.query('select * from employeedetails');
        const rdata=r.rows;
        res.json(rdata);   
    } catch (error) {
        console.log(error);
    }
    
})
app.listen(3000,()=>{
    console.log("Server is listening tpo port 3000...");
})