  import React from 'react'
  import { useState } from 'react'
  import { FaRegEyeSlash } from "react-icons/fa6";
  import { FaRegEye } from "react-icons/fa6";
  import toast, { Toaster } from 'react-hot-toast';
  import AxiosToastError from '../utils/AxiosToastError';
  import Axios from '../utils/Axios';
  import summryApi from '../comman/summryApi';
  import { Link, useNavigate } from 'react-router-dom';
  const Login = () => {

      const [showPassword ,setShowPassword] = useState(false)

      const navigate =useNavigate()
      const [data ,setdata] = useState({
        
          email:"",
          password:"",
        
      });
      const handleChange = (e)=>{
  const {name ,value} = e.target
  setdata((preve)=>{
      return{
          ...preve,
          [name]:value
      }
  })
      }
      const vlaidValue = Object.values(data).every(el => el)
      const handleSubmit = async(e)=>{
          e.preventDefault()
       
        try {
          const response = await Axios({
              ...summryApi.login,  
              data: data
        }) 
        if(response.data.error){
          toast.error(response.data.message)
        }
        if(response.data.success){
          toast.success(response.data.message),
          localStorage.setItem('accesstoken',response.data.data.accesstoken)
          localStorage.setItem('refreshToken',response.data.data.refreshToken)

          setdata({
              email:"",
              password:"",
          })
          navigate("/", { replace: true });
        }
        console.log("response",response)      

        } catch (error) {
          AxiosToastError(error)
        }
    
      }
  
    
  return (
      
  <section className='  w-full  container mx-auto px-2  '>
      <div className='bg-white my-4 w-full max-w-lg mx-auto p-7'>
          <form className='grid gap-4 py-4' onSubmit={handleSubmit} >
              <div className='grid  gap-1'>
                  <label htmlFor="email">Email :</label>
                  <input type="email"
                  id='email' 
                  className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                  name='email'
                  placeholder='Enter you email'
                    value={data.email} 
                    onChange={handleChange} />
              </div >
              <div className='grid  gap-1 '>
                  <label htmlFor="password">Password :</label>
                  <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200  '>
                  <input type={showPassword ?"text" :"password"}
                  id='password' 
                  autoFocus
                  placeholder='Enter you password'
              className='w-full outline-none  '
                  name='password'
                    value={data.password} 
                    onChange={handleChange} />



      <div onClick={()=>setShowPassword(preve=>!preve)}className='cursor-poiter'>
          {
              showPassword ? (
                  < FaRegEye/>
              ):(
                  <FaRegEyeSlash/>
              )
          }
          </div>
        
      </div>
      <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot Password?</Link>
              </div>

              
                      

          <button disabled={!vlaidValue} className={ ` ${vlaidValue? "bg-green-800  hover:bg-green-700" : "bg-gray-500"}
           py-2 text-white rounded font-semibold  my-3 tracking-wide`}>Login</button>

          </form>
          <p>Don't have  account? <Link className='font-semibold text-green-700 hover:text-green-800 ' 
          to={"/register"}>Register</Link> </p>
      </div>
  </section>
      

  )
  }

  export default Login
