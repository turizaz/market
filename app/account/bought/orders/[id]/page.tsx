'use server'
import Image from "next/image";
import car from "@/public/car0.jpg";
import { getOrdersById, OrderInterface } from "@/actions/order";
import AssetRow from "./components/Asset";
import { getSession } from '@/actions/session'
import {Asset} from ".prisma/client";
export default async function BoughtOrders({ params }: { params: { id: string }}) {
	const session = await getSession();
	const order: OrderInterface = await getOrdersById(params.id, session)
	return (
		<div>
			<div className="absolute -z-10 inset-0">
				<Image src={car} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div className='items-center justify-center flex mt-20 '>
				<div className={'bg-white w-5/6 rounded-2xl p-5'}>
					{ order.assets.map((asset: Asset)=> <AssetRow {...asset}/>)}
				</div>
			</div>
		</div>
	)
}

