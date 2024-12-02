import bcryptjs from "bcryptjs";
import UserModel from "../Models/user.model.js";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/virfyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import generatedOtp from "../utils/generatedOtp.js"
import forgotPsswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken"

export async function registerUsercontroller(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email, name, and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already registered email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Binkeyit",
      html: verifyEmailTemplate({ name, url: VerifyEmailUrl }),
    });

    return res.json({
      message: "User registered successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateMany({ _id: code }, { verify_email: true });

    return res.json({
      message: "Verify email is done",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//  ...loginController
export async function loginController(req, res) {
  try {
    const { email, password } = req.body 

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email,   password",
        error: true,
        success: false,
      });
      }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User is not registered",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accesstoken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login is successful",
      success: true,
      error: false,
      data:{
        accesstoken,
        refreshToken
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}



// .........../logout Controller......


export async function logoutController(req,res) {

  try {
     const userid = req.userId // middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    }; 
        res.clearCookie("accesstoken",cookiesOption)
        res.clearCookie("refreshToken",cookiesOption)
 
        //////token ko data base sy remove krny ky li 
  const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
    refresh_token:" "
  })


        return res.json({
          message:"Logout successfully",
          error:false,
          success:true
        })

  } catch (error) {
     return res.status(500).json({
      message:error.message || error,
      error:true,
      success:false
     })
  }
  
}

// upload use aavatar ......

// image canot directly ...multer pakge install


export async function uploadAvatar(req,res){

  try {
    const userId = req.userId // auth middlware
    const image = req.file //multer middlware
const upload = await uploadImageClodinary(image)

const updateUser = await UserModel.findByIdAndUpdate(userId,{
  avatar : upload.url
})
 
return res.json({
  message:"upload profile",
  data :{
    _id:userId,
    avatar:upload.url
  } 
})
 
  } catch (error) {
    return res.status(500).json({
      message:error.message || error,
      error:true,
      success:false
    })
  }
}



//.............update user data.....


export async function updateUserDetails(req,res) {
  try {
    const userId = req.userId //auth middlware
    const {name , email ,mobile ,password} = req.body

     // .. convert paasword in hashtype
 let hashPassword =""
 
 if(password){
  const salt = await bcryptjs.genSalt(10);
   hashPassword = await bcryptjs.hash(password, salt);
 }




     const updateUser = await UserModel.updateOne({_id:userId},{
      ...(name && { name : name}),
      ...(email && { email : email}),
      ...(mobile && { mobile : mobile}),
      ...(password && { password : password}),
      ...(password && { password : hashPassword}),

     })
       return res.json({
        message:"updated user successfully",
        error:false,
        success:true,
        data: updateUser
       })
    
  } catch (error) {
     return res.status(500).json({
      message:error.message || error,
      error:true,
      success:false
     })
  }
}

/ /////// ...... forgot password ........... not login


  export  async function forgotPasswordController(req,res) {
    try {
       const {email} = req.body
        const user = await UserModel.findOne({email}) 


        if(!user){
           return res.json({
             message:"Email is not available",
             error : true,
              Success: false
           })
        }

        const  otp = generatedOtp()
         const expireTime = new  Date() + 60 *60 *1000  // 1hr

         const update = await UserModel.findByIdAndUpdate(user._id,{
          forgot_password_otp:otp,
          forgot_password_expiry: new Date(expireTime).toISOString()
         })
          await sendEmail({
            sendTo:email,
            subject:"Forgot password from Binkeyit",
            html:forgotPsswordTemplate({
              name: user.name, 
              otp:otp
             
            })
          })

          return res.json({
            message:"Check your Email",
            error:false,
            success:true
          })
      
    } catch (error) {
      return res.status(500).json({
        message:error.message || error,
        error:true,
        success:false
      })
    }   

  }



  //.............verify forgot password otp ....
   export async function verifyForgotPassword(req,res) {
     try {
       const {email ,otp} = req.body

       if(!email || ! otp){
        return res.status(400).json({
          message:"provide required field email ,otp.",
          error:true,
          succeess:false
        })
       }
       const user = await UserModel.findOne({email}) 

       if(!user){
          return res.json({
            message:"Email is not available",
            error : true,
             Success: false
          })
       }
 const currentTime = new Date().toISOString()
  if(user.forgot_password_expiry < currentTime){
    return res.status(400).json({
      message:"Otp is expired",
      error:true,
      success:false
    })
  }



            if(otp !== user.forgot_password_otp){
              return res.status(400).json({
                message:"Invalid otp",
                error:true,
                succeess:false
              })
            }

            // if otp is not expire 
            // otp == forgot_password_otp

            return res.json({
              message:"verfiy otp is successfully",
              error:false,
              success:true
            })





     } catch (error) {
       res.status(500).json({
        message:error.message ||error,
        error : true,
        success: false
       })
     }
   }


   /// reset the password

   export async function resetPassword(req,res) {
    try {
      const {email,newPassword,confirmPassword} = req.body 
      if(!email || !newPassword || !confirmPassword){
         return res.status(400).json({
          message:"provide required fields email,newPassword, confirmPassword",
         })
      }
    const user = await UserModel.findOne({email})

    if(!user ){
      return res.status.json({
        message:"Email is not availbale",
        error:true,
        success:false
      })
    }
    if(newPassword !== confirmPassword){
      return res.status(400).json({
        message:"newPassword and confirmPassword must be same ",
        error:true,
        success:false
      })
    }
    const salt = await bcryptjs.genSalt(10);
     const hashPassword = await bcryptjs.hash(newPassword, salt);



     const update = await UserModel.findByIdAndUpdate(user._id,{
       password:hashPassword
     })

     return res.json({
      message:"password updated  sussessfully",
      error:false,
      succeess:true
     })
       
    } catch (error) {
      return res.status(500).json({
        message:error.message || error,
        error:true,
        suucess:false
      })
    }
   }



   //....... Refresh token controller..

    export async function refreshToken(req,res) {
      try {
         const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split("")[1] //// [bearer token]
        if(!refreshToken){
          return res.status(401).json({
             message:"Inavlid token",
             error:true,
             succeess:false
          })
        }
        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verifyToken){
          return res.status(401).json({
            message:"Token is expire",
            error:true,
            succeess:false
          })
        }
   
        console.log("verifyToken",verifyToken)
        const userId = verifyToken._id



        const newAccessToken  =  await generatedRefreshToken(userId)
        
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    }
        res.cookie('acccessToken',newAccessToken,cookiesOption)

        res.json({
          message:"new Access Token generated",
          error:false,
          succeess:false,
          data:{
            acccessToken:newAccessToken

          }
        })

      } catch (error) {
         return res.status(500).json({
          message:error.message || error ,
          error: true,
          succeess:false
         })
      }
    }


    // get login user details


    export async function userDetails(req,res) {

      try {
        const userId = req.userId
        const user = await UserModel.findById(userId)


        return res.status(200).json({
          message:"user details",
          data:user,
          error:false,
          success:true
        })

      } catch (error) {
        return res.status(500).json({
          message:"something is wrong",
          error:ture ,
          succeess:false
        })
      }
      
    }