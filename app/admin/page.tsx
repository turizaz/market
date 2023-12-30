import Image from "next/image";
import car0 from "@/public/car0.jpg";

export default function Login() {
	return (
		<>
			<div className="absolute -z-10 inset-0">
				<Image src={car0} alt={'Lets go'} fill style={{ objectFit: 'cover'}} />
			</div>
			<div>
			</div>
		</>
	)
}