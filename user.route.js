import {Router} from "express"
import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js"
import {forgotPasswordController, loginController, logoutController, refreshToken, registerUsercontroller,resetPassword,updateUserDetails,uploadAvatar,userDetails,verifyEmailController, verifyForgotPassword} from "../Controller/user.Controller.js"
 
const userRouter = Router()

userRouter.post ("/register",registerUsercontroller)
userRouter.post ("/verify_email",verifyEmailController)
userRouter.post ("/login",loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put("/upload_avatar",auth,upload.single('avatar'),uploadAvatar)
 userRouter.put('/update-user',auth,updateUserDetails)
 userRouter.put('/forgot-password',forgotPasswordController)
 userRouter.put ('/verify-forgot-password-otp',verifyForgotPassword)
 userRouter.put('/reset-password',resetPassword)
 userRouter.post('/refresh-token',refreshToken)
userRouter.get("/user-details",auth ,userDetails)

 export default userRouter