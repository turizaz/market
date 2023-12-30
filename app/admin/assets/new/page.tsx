'use client'
import car5 from "@/public/car5.jpg";
import Image from "next/image";
import { uploadAsset } from "@/actions";
import { useFormState } from 'react-dom';
export default function NewPage() {
	const [formState, action] = useFormState(uploadAsset, {
		message: ''
	});
	return (
		<>
			<div className="absolute -z-10 inset-0">
				<Image src={car5} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<form action={action}>
				{ formState?.message ? <div onClick={close} className='p-4 text-white bg-red-600 rounded border-red-700'>{formState.message}</div>: null }
				<div className='flex flex-col justify-center m-20 items-center'>
					<div className='w-1/2'>
						<label htmlFor="title" className='text-white font-bold'>Title</label>
						<input type="text" name='title' className='p-2 w-full text-black bg-cyan-100/50 rounded'/>
					</div>
					<div className='w-1/2'>
						<label htmlFor="pictures" className='text-white font-bold'>Images (intro cover)</label>
						<input type="file" name='pictures' multiple className='p-2 w-full text-black bg-cyan-100/50 rounded'/>
					</div>
					<div className='w-1/2'>
						<label htmlFor="file" className='text-white font-bold'>File</label>
						<input type="file" name='file' multiple className='p-2 w-full text-black bg-cyan-100/50 rounded'/>
					</div>
					<div className='w-1/2'>
						<label htmlFor="description" className='text-white font-bold'>Description</label>
						<textarea name='description' className='p-2 w-full text-black bg-cyan-100/50 rounded'/>
					</div>
					<div className='w-1/2 mt-5'>
						<button type='submit' className='p-2 bg-sky-500/50 hover:bg-sky-500/40 text-white rounded font-bold'>save</button>
					</div>
				</div>
			</form>
		</>
	)
}