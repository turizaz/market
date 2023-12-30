/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '3d-market.s3.eu-west-3.amazonaws.com',
				port: '',
			},
		],
	},
}


module.exports = nextConfig
