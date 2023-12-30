import car5 from "@/public/car5.jpg";
import Image from "next/image";
import { db } from '@/db';
import Link from "next/link";
import Asset from "@/components/Asset";
export default async function Assets() {
	const assets = await db.assets.findMany();

	console.log(assets);


	return (
		<>
			<div className="absolute -z-10 inset-0">
				<Image src={car5} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div>
				{assets.map(it=> <Asset {...it }/>)}
				<Link href={'/admin/assets/new'} className='absolute left-0 bottom-0'>
					<button className='p-2 bg-sky-500/50 hover:bg-sky-500/40 text-white rounded font-bold'>add new</button>
				</Link>
			</div>
		</>
	)
}