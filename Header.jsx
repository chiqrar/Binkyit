import React from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";
import UseMobile from '../hooks/UseMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';




function Header() {
const [isMobile] = UseMobile()

const loction = useLocation()

const isSearchPage = loction.pathname ==='/search'
 const navigate = useNavigate()

// const user = useSelector((state) => state?.user);
// if (!user) {
//   console.error("User not found in store");
// }

 const user = useSelector((state)=> state?.user)
 console.log('user from store',user)
const redrectToLoginPage = ()=>{
  navigate("/login")
}


  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
     {/* // ager ma search page pr jao to logo or login icon chala jy  */}
    {
      !(isSearchPage && isMobile)&&(
                <div className='container mx-auto flex  items-center px-2 justify-between '>
                {/* ///******logo * */}
                <div className='h-full '>
                  <Link to={"/"} className='h-full flex justify-center items-center'>
                    <img src={logo}
                      width={170}
                      height={60}
                      alt='logo' 
                      className='hidden lg:block'/>
                        <img src={logo}
                      width={120}
                      height={60}
                      alt='logo'
                      className='lg:hidden'
                      />



                  </Link>

                </div>


                {/* ///******Search */}


          <div className='hidden lg:block'>
            <Search/>
          </div>


                {/* ///******Login */}
              
              <div>
                  {/* this ico part mobile version  */}

                <button className='text-neutral-600 lg:hidden'>
                <BiUserCircle size={26}/>
                </button>
                {/* this part of desktopl */}
              <div className='hidden lg:flex  items-center gap-10' >
               <button onClick={redrectToLoginPage} className='text-lg px-2' >Login</button>
               <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white '>
                <div>
                <BsCart4  size={28} className='animate-bounce'/>
                </div>
                <div>
                <p>My Cart</p>
              
                </div>
               </button>
              </div>
              </div>


              </div>
      )
    }
   

    
    <div className='container mx-auto px-2  lg:hidden'>
      <Search/>
    </div>
    </header>
  )
}

export default Header
