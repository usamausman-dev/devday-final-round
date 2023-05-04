import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";
import { compare } from 'bcryptjs'


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => res.json({ error: "Connection failed" }))

                const result = await Users.findOne({ email: credentials.email })

                if (!result) {
                    throw new Error("No User Exists")
                }


                const checkPassword = await compare(credentials.password, result.password)

                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username/Password Mismatch")

                }

                return result;
            }

        })
    ]

})