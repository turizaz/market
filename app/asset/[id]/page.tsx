"use server"
import {getAssetById} from "@/actions/asset";
import { Asset } from ".prisma/client";
import Image from "next/image";
import car from "@/public/car0.jpg";
import {notFound} from "next/navigation";
import Carousel from "@/components/Carousel";
import OrderButton from "@/components/order/OrderButton";
import {getSession} from "@/actions/session";

export default async function Asset({ params }: { params: { id: string }}) {
	const { id } = params;
	const asset: Asset  =  await getAssetById(id) as Asset
	const session = await getSession();
	if(!asset) {
		throw notFound();
	}

	const urls = asset.pictures.map((it)=> it);
	return (
		<div className={'h-full flex flex-row'}>
				<div className="absolute -z-10 inset-0">
					<Image src={car} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
				</div>
				<div className={'bg-white h-5/6 w-3/4 p-5'}>
					<Carousel urls={urls} rounded={false} />
				</div>
				<div className={'h-5/6 w-3/4 p-2 bg-amber-50'}>
					<div>
						<div className={'grid grid-cols-2 grid-flow-col gap-4'}>
							<div>
								Price
							</div>
							<div>
								{asset.price} ₴
							</div>
						</div>
					</div>
					<div className={'w-full'}>
						{asset.description}
					</div>
					<div>
						<OrderButton asset={asset} session={session}/>
					</div>
				</div>
		</div>
	)
}