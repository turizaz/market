'use client'
import Link from "next/link";
import Carousel from "@/components/Carousel";
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

type Asset = {title: string, id: number, pictures: string[], price: number}