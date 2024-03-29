// const jwt=require('jsonwebtoken')
// const User=require('../models/user')

// const auth=async (req, res, next) => {
//    try
//    {
//     const token=req.header('Authorization').replace('Bearer ','')
//     const decoded=jwt.verify(token,'thisismynewcourse')
//     const user=await User.findOne({_id:decoded._id,'tokens.token':token})

//     if(!user)
//     {
//         throw new Error()
//     }
//     req.token=token
//     req.user=user
//     next()
//    }catch(e)
//    {
//     res.status(401).send({error:'please authenticate'})
//    }
// }

// module.exports=auth




















require('dotenv').config();
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
       const token = req.header('Authorization').replace('Bearer ', '');
       console.log('Token:', token); // Add debug log for token
       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       console.log('Decoded:', decoded); // Add debug log for decoded token
       const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
 
       if (!user) {
          throw new Error();
       }
       
       req.user = user;
       req.token = token;
       next();
    } catch (e) {
       console.error('Authentication error:', e); // Add debug log for authentication error
       res.status(401).send({ error: 'Please authenticate' });
    }
 };
 

module.exports = auth