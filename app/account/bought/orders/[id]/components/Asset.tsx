import {Asset} from ".prisma/client";
import Link from "next/link";
import {s3Url} from "@/libs/s3";
import {Download} from "lucide-react";

export default function Asset(asset: Asset) {
	return <div className='grid grid-cols-2 gap-2'>
		<div>{asset.title}</div>
		<div className='flex'>
			<Link className='flex' href={s3Url + asset.file}><Download/> asset file</Link>
		</div>
	</div>
}