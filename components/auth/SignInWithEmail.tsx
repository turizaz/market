"use client";
import { signIn } from "next-auth/react";
import {useState} from "react";

export default function SignInWithEmail() {
	const [email, setEmail] = useState<null | string>(null)

	async function SignInWithEmail() {
			const signinResult = await signIn('email', {
				email: email,
				callbackUrl: `${window.location.origin}`,
				redirect: false
			})
	}
	return (
			<div className={'w-full'}>
				<form action={SignInWithEmail} className={'w-full`'}>
					<div>
						<input
							className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
							type="email"
							name='email' onChange={(e) => setEmail(e.target.value)}/>
					</div>
					<div>
						<button type="submit"
								className="
								mt-2
								w-full
								justify-center
								text-white
								bg-[#4285F4]
								hover:bg-[#4285F4]/90 focus:ring-4
								focus:outline-none
								focus:ring-[#4285F4]/50
								font-medium rounded-lg
								text-sm px-5
								py-2.5 text-center inline-flex items-center
								dark:focus:ring-[#4285F4]/55 me-2 mb-2">
							Sign in with Email
						</button>
					</div>
				</form>
			</div>
	)
}