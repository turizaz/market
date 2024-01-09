'use client'
import { signOut } from "next-auth/react"
export default function () {
	return (
		<button className={'hover:text-black'} onClick={() => signOut()}>Logout</button>
	)
}