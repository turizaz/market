"use server"
import prisma from "@/db";
import {redirect} from "next/navigation";
import { z } from 'zod'
import { zfd } from "zod-form-data";

export async function updateUser(
	formState: { message: string },
	formData: FormData
) {
	const {isSeller, bankAccount, id} = validateUploadUser(formData);
	if(isSeller && !bankAccount) {
		return {
			message: 'If you are seller enter you bank account to receive income from your sellings'
		}
	}
	await prisma.user.update({
		where: {
			id
		},
		data: {
			isSeller: isSeller === 'on',
			bankAccount
		}
	})
	redirect('/');
}

function validateUploadUser(formData: FormData) {
	const schema =	zfd.formData({
		id: z.string(),
		isSeller: z.string(),
		bankAccount: z.string()
	});
	return schema.parse(formData);
}
