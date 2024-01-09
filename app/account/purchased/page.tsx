"use server"

import Image from "next/image";
import car from "@/public/car0.jpg";
import {getUserByEmail} from "@/actions/user";
import {getOrdersByUserId} from "@/actions/order";
import {Order} from ".prisma/client";
import OrderItem from "@/app/account/purchased/components/Order";
import { getSession } from "@/actions/session";

export default async function Purchased() {
	const session = await getSession();
	const user = await getUserByEmail(session);
	const orders: Order[] = await getOrdersByUserId(user.id);
	return (
		<div>
			<div className="absolute -z-10 inset-0">
				<Image src={car} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div className='items-center justify-center flex mt-20 '>
				<div className={'bg-white w-5/6 rounded-2xl p-5'}>
					<h1 className={'text-xl mb-5'}>You purchased this already</h1>
					{orders.map(order=> <OrderItem {...order}/>)}
				</div>
			</div>
		</div>
	)
}