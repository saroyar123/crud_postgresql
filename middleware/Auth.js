const jwt = require('jsonwebtoken');
const pool=require('../pgConnect')


exports.auth=(req,res,next)=>{
  try {

    const {token}=req.cookies;
    const {email}=jwt.verify(token,process.env.key);
    console.log(email)

    pool.query('SELECT * FROM users WHERE email=$1', [email], (error, results) => {
        if (error) {
          return res.status(404).json({
            sucess:false,
            message:error.message
          })
        }
        next();
      })


    next();
    
  } catch (error) {
    res.status(400).json({
        success:false,
        message:error.message
    })
  }
}