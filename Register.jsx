                import React from 'react'
                import { useState } from 'react'
                import { FaRegEyeSlash } from "react-icons/fa6";
                import { FaRegEye } from "react-icons/fa6";
                import toast, { Toaster } from 'react-hot-toast';
                import AxiosToastError from '../utils/AxiosToastError';
                import Axios from '../utils/Axios';
                import summryApi from '../comman/summryApi';
import { Link, useNavigate } from 'react-router-dom';
                const Register = () => {

                    const [showPassword ,setShowPassword] = useState(false)
                    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
                     const navigate =useNavigate()
                    const [data ,setdata] = useState({
                        name:"",
                        email:"",
                        password:"",
                        confirmPassword:"",
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
                        if (data.password !== data.confirmPassword){
                            toast.error(
                                "password and confirm password must be same"
                            )    

                        return                    
                     }
                      try {
                        const response = await Axios({
                            ...summryApi.register,  
                             data: data
                      }) 
                      if(response.data.error){
                        toast.error(response.data.message)
                      }
                      if(response.data.success){
                        toast.success(response.data.message),
                        setdata({
                            name:"",
                            email:"",
                            password:"",
                            confirmPassword:""
                        })
                        navigate("/login")
                      }
                      console.log("response",response)      

                      } catch (error) {
                        AxiosToastError(error)
                      }
                  
                    }
                 
                   
                return (
                    
                <section className='  w-full  container mx-auto px-2  '>
                    <div className='bg-white my-4 w-full max-w-lg mx-auto p-7'>
                        <p> Welcome to Binkeyit</p>
                        <form className='grid gap-4 mt-6' onSubmit={handleSubmit} >

                            <div className='grid  gap-1'>
                                <label htmlFor="name">Name :</label>
                                <input type="text"
                                id='name' 
                                autoFocus
                                 className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                                 name='name'
                                  value={data.name} 
                                  placeholder='Enter you name'
                                  onChange={handleChange} />
                            </div>

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
                            </div>

                            
                                    <div className='grid gap-1 '>
                                    <label htmlFor="confirmPassword">Confirm Password :</label>
                                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200 '>
                                        <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        id='confirmPassword' 
                                        placeholder='Enter your password' 
                                        className='w-full outline-none ' 
                                        name='confirmPassword' 
                                        value={data.confirmPassword} 
                                        onChange={handleChange} 
                                        />
                                        <div 
                                        onClick={() => setShowConfirmPassword(preve => !preve)} 
                                        className='cursor-pointer'
                                        >
                                        {showConfirmPassword ? (
                                            <FaRegEye />
                                        ) : (
                                            <FaRegEyeSlash />
                                        )}
                                        </div>
                                    </div>
                                    </div>

                        <button disabled={!vlaidValue} className={ ` ${vlaidValue? "bg-green-800  hover:bg-green-700" : "bg-gray-500"} py-2 text-white rounded font-semibold  my-3 tracking-wide`}>Register</button>

                        </form>
                        <p>Already have account ? <Link className='font-semibold text-green-700 hover:text-green-800 ' to={"/login"}>Login</Link> </p>
                    </div>
                </section>
                    
                
                )
                }

                export default Register
