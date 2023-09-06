"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Page(){
    const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        username:"",
        password:""

    });
    
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false);
    const onSignup = async()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Sucess", response.data)
            router.push("/login")
        } catch (error :any) {
            console.log("signup failed")
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
         if(user.email.length >0 && user.username.length>0 && user.password.length>0){
               setButtonDisabled(false)
         }else{
            setButtonDisabled(true)
         }
    },[user])
    return(
        <div className="form m-auto flexCenter flex-col max-w-[300px]">
           <h1 className="text-[25px]">{loading?"processing...":"Signup"}</h1>
           <input type="text" name="email" value={user.email} placeholder="Enter Eamil" className="input" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="text" name="username" value={user.username} placeholder="Enter Username" className="input" onChange={(e)=>setUser({...user,username:e.target.value})}/>
            <input type="password" name="password" value={user.password} placeholder="Enter Password" className="input" onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <button onClick={onSignup} disabled={buttonDisabled} className="btn bg-green-500 hover:bg-green-600">{buttonDisabled?"No Signup":"Signup"}</button>
          <Link href="/login" className="link">login</Link>
        </div>
    )
}