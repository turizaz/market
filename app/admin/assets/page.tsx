import car5 from "@/public/car5.jpg";
import Image from "next/image";
import prisma from '@/db';
import Link from "next/link";
import Asset from "@/components/admin/Asset";
export default async function Assets() {
	const assets = await prisma.asset.findMany();
	return (
		<>
			<div className="absolute -z-10 inset-0">
				<Image src={car5} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div className='grid grid-cols-4 gap-4'>
				{assets.map(it=> <Asset {...it }/>)}
			</div>
			<div>
				<Link href={'/admin/assets/new'} className='absolute left-0 bottom-0'>
					<button className='p-2 bg-sky-500/50 hover:bg-sky-500/40 text-white rounded font-bold'>add new</button>
				</Link>
			</div>
		</>
	)
}