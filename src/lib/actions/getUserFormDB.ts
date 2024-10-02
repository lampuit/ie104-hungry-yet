
'use server'
import { db } from "@/db/db";
import { Users } from "@/db/schema";
export default async function getUserFromDB (){
    const result = await db.select().from(Users);
    console.log(result);
}