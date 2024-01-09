'use server'
import Image from "next/image";
import car from "@/public/car0.jpg";
import {getOrders} from "@/actions/order";
import {Asset, Order} from ".prisma/client";
import OrderItem from "@/app/account/cart/components/OrderItem";
import {notFound} from "next/navigation";
import {getSession} from "@/actions/session";


export default async function Cart() {
	const session = await getSession();
	const { assets, order } : { assets: Asset[] | null , order: Order | null }  = await getOrders(session);
	if(!assets || !order) {
		throw notFound()
	}
	return (
		<div>
			<div className="absolute -z-10 inset-0">
				<Image src={car} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div className='items-center justify-center flex mt-20 '>
				<div className={'bg-white w-5/6 rounded-2xl p-5'}>
					<div>
						{ assets.map((asset : Asset)=> <OrderItem {...asset} />)}
					</div>
					<div className={'border-b-2 border-grey-500 grid grid-cols-4 gap-4'}>
						<div>Total</div>
						<div></div>
						<div></div>
						<div>{order.amount} UAH</div>
					</div>
					<div className={'grid grid-cols-4 gap-4'}>
						<div></div>
						<div></div>
						<div></div>
						<div className={'mt-5'}>
							<button
								className="bg-orange-500 hoverclassNamelue-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
								Complete order
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}