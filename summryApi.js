
export const baseUrl = "http://localhost:4507"


 export const summryApi = {
    register:{
        url:'/api/user/register',
        method:'post'
    }, 
    login:{
        url:'/api/user/login',
        method:'post'
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:'put'
    },
   forgot_password_otp_verification:{
    url:"/api/user/verify-forgot-password-otp",
    method:"put"
   } , resetPassword : {
    url : "/api/user/reset-password",
    method : 'put'
},
refreshToken: {
      url: "/api/user/refresh-token",
      method: "post"
    }
}
export default {summryApi,baseUrl}





// export const baseUrl = "http://localhost:4507";
// export const summryApi = {
//   register: {
//     url: '/api/user/register',
//     method: 'post'
//   },
//   login: {
//     url: '/api/user/login',
//     method: 'post'
//   },
//   forgot_password: {
//     url: '/api/user/forgot-password',
//     method: 'put'
//   },
//   forgot_password_otp_verification: {
//     url: "/api/user/verify-forgot-password-otp",
//     method: "put"
//   },
//   resetPassword: {
//     url: "/api/user/reset-password",
//     method: 'put'
//   },
//   refreshToken: {
//     url: "/api/user/refresh-token",
//     method: "post"
//   }
// };

// export default {summryApi,baseUrl};
