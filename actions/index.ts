"use server"
import * as s3 from "@/libs/s3";
import {redirect} from "next/navigation";
import {db} from "@/db";

export async function uploadAsset(
	formState: { message: string },
	formData: FormData
) {
	const title = String(formData.get('title'));
	if(!title || title.length < 1) {
		return {
			message: 'name must me more than 1 char'
		}
	}
	try {
		const pictures = formData.getAll("pictures") as File[];
		const file = formData.get("file") as File;
		const Body = (await file.arrayBuffer()) as Buffer;
		await s3.upload2Bucket(file, Body);
		const res = await Promise.all(
			pictures.map(async (file) => {
				const Body = (await file.arrayBuffer()) as Buffer;
				return s3.upload2Bucket(file, Body);
			})
		);
		await db.assets.create({
			data: {
				title,
				pictures: pictures.map(it=> it.name),
				authorId: 1,
				description: String(formData.get('description')),
				file: file.name
			}
		});
	} catch (e) {
		if(e instanceof Error) {
			return {
				message: e.message
			}
		}
		return {
			message: 'Can not save image',
		};
	}
	redirect('/admin/assets');
}