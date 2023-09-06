"use client"

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

export default function Page(){
    const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        password:""
    });
    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false);
    
    const onLogin = async()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data)
            router.push("/profile")
        } catch (error : any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0)
           setButtonDisabled(false)
        else  
            setButtonDisabled(true)

    },[user])
    return(
        <div className="m-auto flexCenter flex-col max-w-[300px] form">
           <h1 className="text-[25px]">{loading?"processing...":"login"}</h1>
            <input type="text" name="username" value={user.email} placeholder="Enter Email" className="input" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="password" name="password" value={user.password} placeholder="Enter Password" className="input" onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <button onClick={onLogin} className="btn bg-blue-600"  disabled={buttonDisabled} >{buttonDisabled?"NO login":"login"}</button>
          <Link href="/signup" className="link">signup</Link>
        </div>
    )
}