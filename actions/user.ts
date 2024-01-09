import prisma from "@/db";
import {Session} from "next-auth";
export async function getUserByEmail(session: Session | null) {
	return prisma.user.findUniqueOrThrow({
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