
import Link from "next/link";
import Carousel from "@/components/Carousel";

export default function Asset({title, pictures, id} : Asset) {
	const link =  `/admin/assets/${id}`;
	const urls = Object.values(pictures);
	return (
			<div className="shadow-md w-full h-80 p-2 mt-8">
				<Link href={link}>
					<h1 className={'text-xl text-white font-bold'}>{title}</h1>
					<Carousel urls={urls} rounded={false}/>
				</Link>
				<button className="mt-2	 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
					Delete
				</button>
			</div>
	)
}

type Asset = {title: string, id: number, pictures: string[]}