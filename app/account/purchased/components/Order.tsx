"use client"
import {Order} from ".prisma/client";
import Link from "next/link";

export default function Order(order: Order) {
	return <div>
			<Link href={`/account/bought/orders/${order.id}`}>Order - {order.createdAt.toDateString()}  {order.amount} UAH</Link>
		</div>
}