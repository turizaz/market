import { PutObjectCommand } from '@aws-sdk/client-s3'
import AWS from 'aws-sdk'
const s3 = new AWS.S3({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY
})

export {
	s3,
	PutObjectCommand
}