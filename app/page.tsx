import Image from 'next/image'
import car0 from '@/public/car0.jpg';
import car1 from '@/public/car1.jpg';
export default function Home() {
  return (
      <>
          <div className="absolute -z-10 inset-0">
              <Image src={car1} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
          </div>
          <div>
          </div>
      </>
  )
}
