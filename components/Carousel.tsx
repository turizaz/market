"use client"

import 'swiper/css';
import 'swiper/css/pagination'
import type SwiperType from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import {s3Url} from "@/libs/s3";
import { Pagination } from 'swiper/modules';
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useState} from "react";
import {cn} from "@/libs/utils";

export default function Carousel({urls, rounded = false}: {urls: string[], rounded: boolean}) {
	const [swiper, setSwiper] = useState<null | SwiperType>(
		null
	)
	const [activeIndex, setActiveIndex] = useState(0)
	const [slideConfig, setSlideConfig] = useState({
		isBeginning: true,
		isEnd: activeIndex === (urls.length ?? 0) - 1,
	})

	useEffect(() => {
		swiper?.on('slideChange', ({ activeIndex }) => {
			setActiveIndex(activeIndex)
			setSlideConfig({
				isBeginning: activeIndex === 0,
				isEnd: activeIndex === (urls.length ?? 0) - 1,
			})
		})
	}, [swiper, urls])

	const activeStyles =
		'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-7	 w-7 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
	const inactiveStyles = 'hidden text-gray-400'

	return (
		<div className={'flex group justify-center h-full relative items-center'}>
			<div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>
				<div className={'absolute top-1/2 z-50'}>
					<button
						className={cn(activeStyles, 'left-3 transition', {
							[inactiveStyles]: slideConfig.isBeginning,
							'hover:bg-primary-300 text-primary-800 opacity-100':
								!slideConfig.isBeginning,
						})}
						onClick={(e) => {
						e.preventDefault()
						swiper?.slidePrev()
					}}>
						<ChevronLeft className={'w-4 h-4'}/>
					</button>
				</div>
				<div className={'absolute right-0 top-1/2 z-50'}>
					<button
						className={cn(
							activeStyles,
							'right-3 transition',
							{
								[inactiveStyles]: slideConfig.isEnd,
								'hover:bg-primary-300 text-primary-800 opacity-100':
									!slideConfig.isEnd,
							}
						)}
						onClick={(e) => {
						e.preventDefault()
						swiper?.slideNext()
					}}>
						<ChevronRight className={'w-4 h-4'}/>
					</button>
				</div>
			</div>

				<Swiper
					className={'h-full w-full'}
					pagination={true}
					navigation={true}
					modules={[Pagination]}
					spaceBetween={5}
					slidesPerView={1}
					onSlideChange={() => console.log('slide change')}
					onSwiper={(swiper) => setSwiper(swiper)}
				>
					{urls.map(it=> <SwiperSlide>
						<Image fill className={cn({'rounded-t-lg': rounded})} objectFit='cover' src={s3Url+it} alt={'asset'}/>
					</SwiperSlide>)}
				</Swiper>
			</div>

	)
}