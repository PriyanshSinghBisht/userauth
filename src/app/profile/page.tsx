"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"


export default function Page(){
    const router = useRouter();
    const [data , setData] = useState(null)

    const logout = async()=>{
       try {
        const response = await axios.get('/api/users/logout')
        toast.success('Logout successful')
         router.push('/login')
       } catch ( error: any) {
          console.log(error.message)
          toast.error(error.message)
       }
    }

    const getUserDetails = async()=>{
        const res = await axios.get('/api/users/me')
        console.log(res)
        setData(res.data.data._id);
    }
    return(
        <div className="flexCenter flex-col gap-y-4">
            <h1 className="text-[25px]">Profile</h1>
            <p>profile  page</p>
            <h2 className="p-1 rounded bg-green-500">{data===null?"Nothing": <Link 
              href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <button 
             onClick={logout}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 
            text-white font-bold rounded">Logout</button>

            <button
             onClick={getUserDetails}
             className="px-4 py-2 bg-purple-500 hover:bg-purple-700 
             text-white font-bold rounded">Get User Detail</button>

        </div>
    )
}