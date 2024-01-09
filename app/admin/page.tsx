"use server"
import Image from "next/image";
import car0 from "@/public/car0.jpg";
import {getSession} from "@/actions/session";

export default async function Login() {
	const session = getSession();
	return (
		<>
			<div className="absolute -z-10 inset-0">
				<Image src={car0} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div>
				{ session ? ('you are logged in'): ('you are not logged in')}
			</div>
		</>
	)
}