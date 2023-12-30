import Link from "next/link";

export default function Navigation() {
	return (
		<div className="flex text-lg  bold text-slate-200 bg-black/50 justify-between pl-10 pt-5 pb-5">
			<ul>
				<li>
					<Link href="/" >Home</Link>
				</li>
			</ul>
			<ul className="w-1/3 flex space-x-5  justify-end pr-10 text-yellow-400/80 ">
				<li>
					<Link className="hover:text-yellow-400" href="/register">Create Account</Link>
				</li>
				<li>
					<Link className="hover:text-yellow-400" href="/login">Login</Link>
				</li>
			</ul>
		</div>
	)
}