'use client'
import Spinner from "@/components/Spiner";
import {useState} from "react";
import {useFormState} from "react-dom";
import {updateAsset, deletePicture as deletePictureAction, deleteFile as deleteFileAction} from "@/actions/asset";
import {s3Url} from "@/libs/s3";
import {Trash} from "lucide-react";
import {Asset} from ".prisma/client";

export default function AssetForm({ asset } : { asset: Asset | null}) {
	if(!asset) {
		return;
	}
	const [title, setTitle] = useState<string>(asset.title)
	const [description, setDescription] = useState<string>(asset.description)
	const [pictures, setPictures] = useState<string[]>(asset.pictures)
	const [file, setFile] = useState<string | null>(asset.file)
	const [price, setPrice] = useState<number | null>(asset.price)
	const [loading, setLoading] = useState(false)
	const [formState, action] = useFormState(updateAsset, {
		message: ''
	});
	const saving = () => {
		setLoading(true);
	}
	const deletePicture = async (it: string) => {
		setLoading(true);
		setPictures(pictures.filter((p) => p !== it));
		await deletePictureAction(it, asset.id);
		setLoading(false);
	}
	const deleteFile = async () => {
		setLoading(true);
		await deleteFileAction(asset.file, asset.id);
		setLoading(false)
		setFile(null);
	}
	const handleSubmit = (e: FormData) => {
		setLoading(true)
		action(e)
	}
	const inputStyle = 'p-2 w-full text-black bg-cyan-100/50 rounded'
	return (
		<form action={handleSubmit}>
			{ formState?.message ? <div onClick={close} className='p-4 text-white bg-red-600 rounded border-red-700'>{formState.message}</div>: null }
			<div className='flex flex-col justify-center m-20 items-center'>
				<input type={'hidden'} name={'id'} value={asset.id}/>
				<div className='w-1/2'>
					<label htmlFor="title" className='text-white font-bold'>Title</label>
					<input onChange={e => setTitle(e.target.value)} value={title} type="text" name='title' className={inputStyle}/>
				</div>
				<div className={'flex bg-white/20 m-3'}>
					{pictures.map((it, i)=>
						<div key={i} className={'flex justify-center flex-col items-center p-2'}>
							<img className={'p-3'} width={100} height={100} src={s3Url + it} alt={'asset'}/>
							<div className={'cursor-pointer'}>
								<Trash onClick={() => deletePicture(it)}></Trash>
							</div>
						</div>
					)}
				</div>
				<div className='w-1/2'>
					<label htmlFor="pictures" className='text-white font-bold'>Images (intro cover)</label>
					<input type="file" name='pictures' multiple className={inputStyle}/>
				</div>
				{ file && <div className={'bg-white/30 p-3 m-3 flex flex-col items-center'}>
					<div>{file}</div>
					<div onClick={deleteFile}>
						<Trash className={'cursor-pointer'}></Trash>
					</div>
				</div> }
				{!file && <div className='w-1/2'>
					<label htmlFor="file" className='text-white font-bold'>File</label>
					<input type="file" name='file' multiple className={inputStyle}/>
				</div> }
				<div className='w-1/2'>
					<label htmlFor="description" className='text-white font-bold'>Description</label>
					<textarea value={description} onChange={e=> setDescription(e.target.value)} name='description' className='p-2 w-full text-black bg-cyan-100/50 rounded'/>
				</div>
				<div className='w-1/2'>
					<label htmlFor="price" className={'text-white font-bold'}>Price</label>
					<input name='price' value={price?.toString()} onChange={e=> setPrice(Number(e.target.value))} className={inputStyle}/>
				</div>
				<div className='w-1/2 mt-5'>
					<button onClick={saving} type='submit' className='p-2 bg-sky-500/50 hover:bg-sky-500/40 text-white rounded font-bold'>
						save { loading && <Spinner /> }
					</button>
				</div>
			</div>
		</form>
	)
}
