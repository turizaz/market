"use server"
import * as s3 from "@/libs/s3";
import {redirect} from "next/navigation";
import prisma from "@/db";
import {Asset, Prisma} from ".prisma/client";
import assetModel from '@/db/model/asset';
import { z } from 'zod'
import { zfd } from "zod-form-data";


export async function uploadAsset(
	formState: ErrorSignature,
	formData: FormData
) {
	try {
		const data = validateUploadAsset(formData);
		
		const file = await uploadFile(formData) as File;
		const pictures = await uploadPictures(formData);

		await assetModel.create({
			...data,
			price: Number(data.price),
			authorId: 1,
			file: file.name,
			pictures: pictures.map(it=>it.name)
		});
	} catch (e) {
		if(e instanceof Error) {
			return {
				message: e.message
			}
		}
		return {
			message: 'Can not save image'
		};
	}
	redirect('/admin/assets');
}
function validateUploadAsset(formData: FormData) {
	const schema = zfd.formData({
		title: z.string().min(2),
		pictures: z.array(z.instanceof(File)),
		description: z.string(),
		file: z.instanceof(File),
		price: z.custom(d => Number(d))
	});
	return schema.parse(formData);
}
// function validateUploadAsset(formData: FormData) {
// 	const title = String(formData.get('title'));
// 	const file = formData.get('file') as File;
// 	const pictures =  formData.getAll("pictures") as File[]
// 	if(!title || title.length < 1) {
// 		return {
// 			message: 'name must have more than 1 char'
// 		}
// 	}
// 	if(!file.size) {
// 		return {
// 			message: 'should have a file'
// 		}
// 	}
// 	if(!pictures[0].size) {
// 		return {
// 			message: 'should have at least one picture'
// 		}
// 	}
// 	return null;
// }
export async function updateAsset(
	formState: { message: string },
	formData: FormData
) {
	const id = formData.get('id');
	const title = String(formData.get('title'));
	const description = String(formData.get('description'));
	const price = Number(formData.get('price'));
	const file = await uploadFile(formData);
	if(!id) {
		return {
			message: 'Corrupted data'
		}
	}
	const asset: Asset | null = await getAssetById(String(id));
	const pictures = await uploadPictures(formData);
	pictures.forEach(it=> asset?.pictures.push(it.name))
	await prisma.asset.update({
		where: {
			id: Number(id)
		},
		data: {
			...asset,
			description,
			price,
			title,
			file: file?.name
		}
	})
	redirect('/admin/assets');
}
async function uploadFile(formData: FormData) {
	const file = formData.get("file") as File;
	if(!file?.size) {
		return null;
	}
	const Body = (await file.arrayBuffer()) as Buffer;
	await s3.upload2Bucket(file, Body);
	return file
}
async function uploadPictures(formData: FormData) {
	let pictures = formData.getAll("pictures") as File[]
	pictures = pictures.filter(it=> it.size)
	await Promise.all(
		pictures.map(async (file) => {
			const Body = (await file.arrayBuffer()) as Buffer
			return s3.upload2Bucket(file, Body)
		})
	);
	return pictures
}
export async function getAssetById(id:string) {
	return prisma.asset.findFirst({
		where: {
			id: parseInt(id)
		}
	})
}
export async function deletePicture(name: string, id: number) {
	const { pictures, ...rest } = await prisma.asset.findFirstOrThrow({
		where: { id }
	});
	await prisma.asset.update({
		where: {id},
		data: {
			...rest,
			pictures: pictures.filter(p => name !== p)
		},
	})
}
export async function deleteFile(name: string | null, id: number) {
	return await prisma.asset.update({
		where: {
			id
		},
		data: {
			file: null
		}
	})
}
export async function getAllAssets(aurthorId: number) {
	return prisma.$queryRaw(Prisma.sql`select * from assets where authorId = ${aurthorId}`);
}

interface ErrorSignature { message: string }