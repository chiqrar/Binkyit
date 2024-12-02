import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import UseMobile from '../hooks/UseMobile';
function Search ()  {    
    const navigate = useNavigate()
    const loction = useLocation()
    const  [isMobile] = UseMobile()
  const [isSearchPage,setIsSearchPage] = useState(false)
  useEffect(()=>{
  const isSearch = loction.pathname === "/search"
  setIsSearchPage(isSearch)
  },[loction])
    
    const redirectToSearchPage  =()=>{
        navigate("/search")
    }
    console.log("search",isSearchPage)
  return (
    <div className='w-full min-w-[300px] h-11 lg:h-12 lg:min-w-[420px] rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
        <div>
  
                {
                (isMobile && isSearchPage) ? (
                    <Link to={'/'} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white  rounded-full  '>
                    <FaArrowLeft size={20} />
                    </Link>
                ):(
                <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 '>
                <IoMdSearch size={22} />
                </button> 
                )


                }
    
      </div>
      <div className='w-full h-full'>
 
{

!isSearchPage?(
    <div onClick={redirectToSearchPage} className=' w-full h-full flex items-center'>
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      'Search "milk"',
      1000, // wait 1s before replacing "Mice" with "Hamsters"
      'Search "bread"',
      1000,
      'Search "suger"',
      1000,
      'Search "paneer"',
      1000,
      'Search "chocolate"',
      1000,
      'Search "curd"',
      1000,
      'Search "rice"',
      1000,
      'Search "egg"',
      1000,
      'Search "chips"',
      1000,
    ]}
    wrapper="span"
    speed={50}

    repeat={Infinity}
  />
    </div>
):(
<div className='w-full h-full'>
    <input type="text"placeholder='search for ata dal and more' autoFocus
     className=' bg-transparent w-full h-full outline-none'/>
</div>
)



}


      </div>



     
    </div>
  )
}

export default Search

