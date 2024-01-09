import Image from "next/image";


import SigninWithGoogle from "../../components/auth/SignInWithGoogle";
import { redirect } from "next/navigation";
import car5 from "@/public/car0.jpg";
import SignInWithEmail from "@/components/auth/SignInWithEmail";
import {getSession} from "@/actions/session";

export default async function AuthRoute() {
	const session = await getSession();

	if (session) {
		return redirect("/");
	}
	return (
		<>
			<div className="absolute -z-10 inset-0">
				<Image src={car5} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div className="w-screen h-screen flex items-center justify-center">
				<div className='w-1/2 h-1/2 justify-center items-center'>
					<div className="flex justify-center items-center flex-col w-full">
						<SignInWithEmail/>
						<SigninWithGoogle />
					</div>
				</div>
			</div>
		</>
	);
}
