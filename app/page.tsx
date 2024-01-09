"use server"
import Image from 'next/image'
import car1 from '@/public/car1.jpg';
import Asset from "@/components/asset";
import prisma from "@/db";
export default async function Home() {
    const assets = await prisma.asset.findMany({
       where: {
           verified: true
       }
    });
  return (
      <>
          <div className="fixed -z-10 inset-0">
              <Image src={car1} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
          </div>
          <div className="grid
                grid-cols-1
                sm:grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-4
                gap-8 p-10 pt-0">
              {assets?.map(it=> <Asset {...it} />)}
          </div>
      </>
  )
}
