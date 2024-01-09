'use server'
import prisma from "@/db";
import {notFound, redirect} from "next/navigation";
import {Asset, Order, Session} from ".prisma/client";
import {Session as SessionNextAuth} from "next-auth";
import {getUserByEmail, getSessionByUserId} from "@/actions/user";


export async function makeOrder({asset, session}: {asset: Asset, session: SessionNextAuth }) {
	const order = await orderStrategy(asset, session);
	await prisma.asset.update({
		where: {
			id: asset.id
		},
		data: {
			...asset,
			orderId: order.id
		}
	});

	redirect(`/asset/${asset.id}`)
}

export async function getOrdersById(id: string, session: SessionNextAuth) {
	const user = await getUserByEmail(session);
	if (!user) {
		throw notFound();
	}
	const sessionRecord: Session = await getSessionByUserId(user.id) as Session;
	if(!sessionRecord) {
		throw notFound();
	}
	const order = await prisma.order.findFirst({
		where: {
			id: Number(id),
			sessionId: sessionRecord.id
		}
	});
	if(!order) {
		throw notFound();
	}
	const assets = await prisma.asset.findMany({
		where: {
			orderId: Number(id),
		}
	})
	return {order, assets};
}
export async function getOrdersByUserId(userId: string) {
	return prisma.order.findMany({
		where: {
			userId
		}
	})
}
export async function getOrders(session: SessionNextAuth) {
	const user = await getUserByEmail(session);
	if(!user) {
		return {
			assets: null,
			order: null
		}
	}
	const sessionRecord = await getSessionByUserId(user.id);
	const sessionId = sessionRecord?.id;
	const order = await prisma.order.findFirst({
		where: {
			sessionId
		}
	}) as Order;
	if(!order) {
		return {
			assets: null,
			order: null
		}
	}
	const assets = await prisma.asset.findMany({
		where: {
			orderId: order.id
		}
	}) as Asset[]

	return {
		assets,
		order
	}
}

async function orderStrategy(asset: Asset, session: SessionNextAuth) {
	const user = await getUserByEmail(session);
	if(!user) {
		throw notFound();
	}
	const sessionRecord = await getSessionByUserId(user.id);
	const sessionId = sessionRecord?.id;
	const order = await prisma.order.findFirst({
		where: {
			sessionId
		}
	});
	if(order) {
		return updateOrder(order, asset)
	}
	return createOrder(asset, session);
}

async function createOrder(asset: Asset, session: SessionNextAuth) {
	const user = await getUserByEmail(session);
	if(!user) {
		throw notFound();
	}
	const sessionRecord = await getSessionByUserId(user.id);
	const sessionId = sessionRecord?.id;
	return prisma.order.create({
		data: {
			userId: user.id,
			amount: asset.price,
			sessionId: sessionId!
		}
	});
}

async function updateOrder(order: Order, asset: Asset) {
	return prisma.order.update({
		where: {
			id: order.id
		},
		data: {
			...order,
			amount: order.amount + asset.price
		}
	})
}

export interface OrderInterface {order: Order, assets: Asset[]}