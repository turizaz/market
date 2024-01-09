import prisma from "@/db";
import {Session} from "next-auth";
export async function getUserByEmail(session: Session | null) {
	if(!session) return null;
	return prisma.user.findUnique({
		where: {
			email: session?.user?.email as string
		}
	})
}

export async function getSessionByUserId(userId: string) {
	return prisma.session.findFirst({
		where: {
			userId
		}
	})
}