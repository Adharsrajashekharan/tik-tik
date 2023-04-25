import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleLogin,googleLogout } from '@react-oauth/google';

import {useRouter} from 'next/router'
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {IoMdAdd} from 'react-icons/io'
import Logo from '@/utils/tiktik-logo.png'
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';
const Navbar = () => {
  const user=false
  const {userprofile,addUser,removeUser}=useAuthStore()
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-50 py-2 px-4'>
      <Link href="/">
        <div className='w-[100px] md:w-[130px] md:h-[30px] h-[38px]'>

          <Image
          className='cursor-pointer'
          src={Logo}
          alt="logo"
          priority
          
          />

        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {userprofile?(<div className='flex gap-5 md:gap-10'>
          <Link href='/upload'>
          <button className='border-2 p-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
<IoMdAdd className='text-xl'/>
<span className='hidden md:block'>upload</span>
          </button>
          </Link>
          {userprofile.image &&(
 <Link href="/">
 <>
   <Image
     width={42}
     height={42}
     className="rounded-full"
     src={userprofile.image}
     alt="profile pic"
   />
 </>
</Link>          )}

<button type='button'
onClick={()=>{removeUser(),googleLogout()}}
>

  <AiOutlineLogout color='red' fontSize={21} />

</button>

        </div>):(
        <GoogleLogin onSuccess={(res)=>createOrGetUser(res,addUser)
      }
      onError={()=>console.log("error")}
      
      
      />
        
        )}
      </div>
    </div>
  )
}

export default Navbar
