'use client'
import car5 from "@/public/car5.jpg";
import Image from "next/image";
import { uploadAsset } from "@/actions/asset";
import { useFormState } from 'react-dom';
import {useState} from "react";
import Spinner from "@/components/Spiner";
export default function NewPage() {
	const [loading, setLoading] = useState(false)

	const [formState, action] = useFormState(uploadAsset, {
		message: ''
	});
	const saving = () => {
		setLoading(true);
	}
	const handleSubmit =  (e: FormData) => {
		action(e);
		setLoading(false);
	}

	const inputStyle = 'p-2 w-full text-black bg-cyan-100/50 rounded'
	return (
		<>
			<div className="absolute -z-10 inset-0">
				<Image src={car5} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<form action={handleSubmit}>
				{ formState?.message ? <div onClick={close} className='p-4 text-white bg-red-600 rounded border-red-700'>{formState.message}</div>: null }
				<div className='flex flex-col justify-center m-20 items-center'>
					<div className='w-1/2'>
						<label htmlFor="title" className='text-white font-bold'>Title</label>
						<input type="text" name='title' className={inputStyle}/>
					</div>
					<div className='w-1/2'>
						<label htmlFor="pictures" className='text-white font-bold'>Images (intro cover)</label>
						<input type="file" name='pictures' multiple className={inputStyle}/>
					</div>
					<div className='w-1/2'>
						<label htmlFor="file" className='text-white font-bold'>File</label>
						<input type="file" name='file' multiple className={inputStyle}/>
					</div>
					<div className='w-1/2'>
						<label htmlFor="description" className='text-white font-bold'>Description</label>
						<textarea id='description' name='description' className={inputStyle}/>
					</div>
					<div className='w-1/2'>
						<label htmlFor="price" className={'text-white font-bold'}>Price</label>
						<input id='price' type={'number'} name='price' className={inputStyle}/>
					</div>
					<div className='w-1/2 mt-5'>
						<button onClick={saving} type='submit' className='p-2 bg-sky-500/50 hover:bg-sky-500/40 text-white rounded font-bold'>
							save { loading && <Spinner /> }
						</button>
					</div>
				</div>
			</form>
		</>
	)
}