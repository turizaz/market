import Image from "next/image";

export default function Asset({title, pictures}) {
	return (
		<div>
			<h1>{title}</h1>
			{pictures?.map((it: string) => {
				return <Image width='100' height='100' src={'https://3d-market.s3.eu-west-3.amazonaws.com/'+it} alt='Asset'  />
			})}
		</div>
	)
}