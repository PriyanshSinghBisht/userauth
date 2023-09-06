"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage(){
    const [token, setToken ] = useState("")
    const [verified, setVerified ] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () =>{
        try {
            await axios.post('api/users/verifyemail', {token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }
 
    useEffect(()=>{
       const urlToken = window.location.search.split("=")[1];
       setToken(urlToken || ""); 
    },[])

    useEffect(()=>{
       if(token.length > 0){
          verifyUserEmail()
       }
    },[token])


    return(
        <div className="max-w-[600px] m-auto text-center">
            <h1 className="text-4xl mb-5">Verify Email </h1>
            <h2 className="bg-purple-500 p-1 rounded mb-3">{token ? `${token}`:"no token"}</h2>

            {  verified &&(
                    <div>
                    <h2>Email Verified</h2>
                     <Link href="/login" className="text-blue-500">
                         Login
                     </Link>
                    </div>
                )}
          
          { error && (
                    <div>
                    <h2 className="bg-red-500 text-2xl">Error</h2>
                    </div>
                )}

        </div>
    )
}