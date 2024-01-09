'use server'
import Link from "next/link";
import Logout from './Logout';
import Cart from "@/components/cart/Cart";
import {getOrders} from "@/actions/order";
import {Asset, Order} from ".prisma/client";
import {getSession} from "@/actions/session";

export default async function Navigation() {

	const session = await getSession();

	const { assets, order } : { assets: Asset[] | null , order: Order | null } = await getOrders(session);

	return (
		<div className="flex text-lg font-bold text-lime-900 bold bg-white/40 justify-between pl-10 pt-5 pb-5">
			<ul>
				<li>
					<Link className={'hover:text-black'} href="/" >3d market / </Link>
				</li>
			</ul>
			<ul className="w-1/3 flex space-x-5  justify-end pr-10 ">
				<li>
					{ session && <Link className={' hover:text-black'} href="/account">Account</Link> }
				</li>
				{ session ? logoutButton : loginButton }
				{ order && <div>
						{ <Link  className={'flex'} href={'/account/cart'} > {assets?.length}  <Cart/> </Link> }
					</div>
				}
			</ul>
		</div>
	)
}

const loginButton = <li><Link className={'hover:text-black'} href="/login">Login</Link></li>
const logoutButton = <li><Logout/></li>