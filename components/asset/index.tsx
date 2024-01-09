'use client'
import Link from "next/link";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import {s3Url} from "@/libs/s3";
import React from "react";

export default function Asset({title, pictures, id, price} : Asset) {
	const link =  `/asset/${id}`;
	const urls = Object.values(pictures);

	return (
		<div className="shadow-md h-72 mt-10">
			<Link href={link}>
				<Carousel urls={urls} rounded={true}/>
				<div className={'bg-white rounded-b-lg'}>
					<p className={'text-gray-600 text-center'}>
						{title}
					</p>
					<b className={'flex justify-center'}>
						{price} ₴
					</b>
				</div>
			</Link>
		</div>
	)
}

export function AssetGallery({pictures} : Asset) {
	return <div className={'w-2/3 flex flex-row justify-start items-start p-10'}>
		{getImage(pictures)}
	</div>
}

function getImage(pictures: Array<string>) {
	return fibPictures(pictures)
}

function fibPictures(pictures: Array<string>) {
	function innerFibPictures(i: number): React.ReactNode {
		if(i===1) {
			return 	<div className={'w-1/2'}>
				<Image className={'relative'}
					width={0}
					height={0}
					objectFit={'cover'}
					sizes='100hv'
					style={{ width: '100%', height: 'auto' }}
					src={s3Url+pictures[i]} alt={'asset'} />
			</div>
		}
	}
	return innerFibPictures(1);
}
type Asset = {title: string, id: number, pictures: string[], price: number}