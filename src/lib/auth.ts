import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {connectDB} from "./db"
import {User} from "@/model/user.model"
import bcrypt from "bcryptjs"

const authOptions : NextAuthOptions = {
    providers: [
        //login kaise karoge
        //email , password :- credential provider
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:"text"},
                password:{label:"Password", type:"password"},
            },
            async authorize(credentials){
                let email = credentials?.email;
                let password = credentials?.password;
                if(!email || !password){
                    throw new Error("Email or Password is missing");
                }

                await connectDB();
                let user = await User.findOne({email}).select("+password");
                if(!user){
                    throw new Error("User not found");
                }
                let isPasswordCorrect = await bcrypt.compare(password , user.password);
                if(!isPasswordCorrect){
                    throw new Error("Password is incorrect");
                }
                user = await User.findById(user._id).select("-password");
                return user
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks:{
        async jwt({token , user}){
            if(user){
                token.id = user.id
                token.image = user.image
                token.name = user.name
                token.email = user.email
            }

            return token
        },

        session({session , token}){
            if(session.user && token){
                session.user.id = token.id as string
                session.user.image = token.image as string
                session.user.name = token.name
                session.user.email = token.email
            }
            return session
        }
    },
    session:{
        
    },
    pages:{

    },
    secret:"",
}
export default authOptions