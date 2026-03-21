import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {User} from "@/model/user.model";
import bcrypt from "bcryptjs";

export async function POST(request : NextRequest) {
    let {name , email , password} = await request.json();
    await connectDB();
    if(!name){
        return NextResponse.json({error : "name is required"});
    }
    if(!email){
        return NextResponse.json({error : "email is required"});
    }
    if(!password){
        return NextResponse.json({error : "password is required"});
    }

    const alreadyExists = await User.findOne({email});
    if(alreadyExists){
        return NextResponse.json({error : "email already exists"} , {status : 400});
    }

    if(password.length < 6){
        return NextResponse.json({error : "password must be at least 6 characters"} , {status : 400});
    }

    const hashedPassword = await bcrypt.hash(password , 10);
    let user = await User.create({name , email , password : hashedPassword});

    if(!user){
        return NextResponse.json({error : "something went wrong"} , {status : 500});
    }

    user = await User.findById(user._id).select("-password");

    return NextResponse.json(user , {status : 201});
    
}