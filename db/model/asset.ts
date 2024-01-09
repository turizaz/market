import prisma from "@/db";

export default {
	create: (data: createAssetDto) => {
		return prisma.asset.create({
			data
		});
	}
}

export type createAssetDto = {
		title: string,
		pictures: string[]
		authorId: number,
		description: string
		file: string,
		price: number
}