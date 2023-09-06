import connect from '@/utils/mongoDB'
import {User} from '@/utils/model/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest){
    try {
         const reqBody = await request.json()
         const {email , password} = reqBody;
         console.log(reqBody)

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"User does not exist"},
              {status:400}
                )
        }
        const validPassword = await bcrypt.compare(password , user.password)

        if(!validPassword){
            return NextResponse.json({error:"Invalid data"},
              {status:400}
                )
        }    

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log(tokenData.id)

        const token = await jwt.sign(tokenData,
            process.env.TOKEN_SECRET!, { expiresIn: "1d" })

         const response = NextResponse.json({
            message: "Logggin successful",
            success: true,
         })
           
         response.cookies.set("token", token,{httpOnly:true})

         return response;
         
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}