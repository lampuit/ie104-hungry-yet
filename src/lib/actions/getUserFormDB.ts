
'use server'
import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
export async function getUserFromDB (){
    const result = await db.select().from(usersTable);
    console.log(result);
}