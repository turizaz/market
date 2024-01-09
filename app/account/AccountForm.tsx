'use client'
import Image from "next/image";
import car0 from "@/public/car0.jpg";
import {User} from ".prisma/client";
import {useState} from "react";
import {redirect} from "next/navigation";
import {useFormState} from "react-dom";
import {updateUser} from "@/app/account/actions";
import Spinner from "@/components/Spiner";
import Link from "next/link";

export default function AccountForm (props: { user: User } ) {
	if(!props.user) {
		redirect('/');
	}

	const [loading, setLoading] = useState(false);
	const [formState, action] = useFormState(updateUser, {
		message: ''
	});
	const handleSubmit = async (e: FormData) => {
		setLoading(true)
		action(e)
	}
	const [user, setUser] = useState<User>(props.user);
	return (
		<div className="justify-center content-center flex">
			<div className="absolute -z-10 inset-0">
				<Image src={car0} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div className="w-6/12 mt-20">
				{formState?.message && <div className={'bg-red-400 p-2 justify-center mb-2 text-white'}>{formState.message}</div>}
				<form action={handleSubmit}>
				<input type="hidden" name='id' value={user.id}/>
				<div className='bg-white text-black rounded p-2'>
					{user?.name}
				</div>
				<div className='h-2'></div>
				<div className='bg-white text-black rounded p-2 flex'>
					<div>Become a seller</div>
					<div className='pl-2 '>
						<input
							type={'checkbox'}
							name='isSeller'
							checked={user?.isSeller} onChange={() => {
								setUser({...user, isSeller: !user.isSeller})
							}
						}/>
					</div>
				</div>
				{ user.isSeller && <div className='bg-white text-black rounded p-2 flex mt-2 '>
					<div className={'flex-col'}>
							<label className={'flex'}>Bank account, where you will receive income for your selling</label>
							<input
								name={'bankAccount'}
								className={'shadow-sm border-2 w-3/4'}
								value={user.bankAccount as string}
								onChange={(e)=> {
									setUser({...user, bankAccount: e.target.value})
								}
							}/>
					</div>
					</div>
				}
				<button className={'bg-amber-700 p-2 mt-2 rounded'}>Update {loading && <Spinner/> }</button>
				</form>
				{ user.isSeller &&
					<div className={'mt-4'}>
						<Link className={'bg-amber-700 p-2 rounded'} href='/admin/assets'>Go to admin</Link>
					</div>
				}
				<div className={'mt-8'}>
					<Link className={'bg-amber-700 p-2 rounded'} href='/account/purchased'>Go to previously purchased</Link>
				</div>
			</div>
		</div>
	)
}