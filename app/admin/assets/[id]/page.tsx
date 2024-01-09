import {getAssetById} from "@/actions/asset";
import AssetForm from "@/app/admin/assets/[id]/AsseForm"
import {Asset} from ".prisma/client"
import Image from "next/image"
import car5 from "@/public/car5.jpg"

export default async function Asset({ params }: { params: { id: string }}) {
	const asset: Asset | null = await getAssetById(params.id);
	return (
		<div>
			<div className="absolute -z-10 inset-0">
				<Image src={car5} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div>
				<AssetForm asset={asset}/>
			</div>
		</div>
	)
}