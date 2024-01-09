"use server"
import AccountForm from "@/app/account/AccountForm";
import {redirect} from "next/navigation";
import {User} from ".prisma/client";
import {getSession} from "@/actions/session";
import prisma from "@/db";

export default async function Register() {
	const session = getSession();
	if(!session) {
		return redirect("/");
	}
	const user: User = await prisma.user.findFirstOrThrow({
		where: {
			email: session.user?.email
		}
	}) as User

	return (
		<AccountForm user={user}/>
	)
}