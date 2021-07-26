const User = require('../models/user');

module.exports.profile = function profile(req , res){

    return res.render('user_profile' , {

        title : "User Profile"
    });
}

module.exports.signin = function(req , res){

    return res.render('user_sign_in' , {

        title : "Sign In"
    });
}

module.exports.signup = function(req , res){

    return res.render('user_sign_up' , {

        title : "Sign Up"
    });
}

//get the sign up data
module.exports.create = function(req , res){

    console.log('+++++++++++++++++++++ ' , req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }   

     User.findOne({email : req.body.email} , function(err , user){
         
            if(err){
                console.log('error in finding user in the database');
                return;
            }

            if(!user){

                User.create({
                    email : req.body.email,
                    password : req.body.password,
                    name : req.body.name
                            } , function(err , user){

                    if(err){
                        console.log("error in creating user while signing up");
                        return;
                    }
                    console.log('signup' , user);
                    return res.redirect('/users/signin');
                })
            }else{
                return res.redirect('back');
            }
     });
}

//sign in and create a session
module.exports.createSession = function(req , res){

   User.findOne({email:req.body.email},function(err , user){

         if(err){
             console.log('error in finding user in siging in');
             return;
         }
  console.log("ehy we are here !!!1");
         //handle user found

         if(user){

               if(user.password != req.body.password){
                   console.log("password does not match");
                   return res.redirect('back');
               }

               //handle session creation
               res.cookie('user_id' , user._id);

               return res.redirect('/users/profile');
         }else{
             return res.redirect('back');
         }
   });
}
