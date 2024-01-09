'use client'
import {Asset} from ".prisma/client";

export default function OrderItem(asset: Asset) {
	return (
			<div className={'border-b-2 border-grey-500 grid grid-cols-4 gap-4'}>
				<div>{asset.title}</div>
				<div></div>
				<div></div>
				<div>{asset.price}</div>
			</div>
	)
}