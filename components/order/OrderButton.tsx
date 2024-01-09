'use client'

import {Asset} from ".prisma/client";
import {Session} from "next-auth";
import {redirect} from "next/navigation";
import { makeOrder } from "@/actions/order";

export default function OrderButton({asset, session } : {asset: Asset, session: Session | null}) {
	if(!session) {
		redirect('/login');
	}
	return (
		<form action="">
			<button
				onClick={()=> {makeOrder({asset, session})}}
				type='submit'
				className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
				Order
			</button>
		</form>
	)
}