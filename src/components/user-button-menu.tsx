"use client"
import React from "react"
import Image from "next/image"
import { Session } from "next-auth"
import profilePic from "../assets/profilePic.png"
import { signIn, signOut } from "next-auth/react"

interface UserMenuButtonProps{
  session : Session | null
}

export default function UserMenuButton({session}:UserMenuButtonProps){
  const user = session?.user
  return(
   <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
      {user ? (
      <Image src={user.image || profilePic} alt="profile pic" width={40} height={40} className="w-10 rounded-full"/>
      ):(
      <span className="loading loading-dots"/>
      )}
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow">
        <li>
          {user ? <button onClick={()=>signOut({callbackUrl:"/"})}>Sign Out</button>
            :
            <button onClick={()=>signIn()}>Sign In</button>
          }
        </li>
      </ul>
    </div>
  )
}
