import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {S3} from "aws-sdk";

const region = String(process.env.AWS_REGION);
const accessKeyId = String(process.env.S3_ACCESS_KEY);
const secretAccessKey = String(process.env.S3_SECRET_KEY);
const Bucket = '3d-market';

const s3Client = new S3Client({
	region,
	credentials: {
		accessKeyId,
		secretAccessKey
	}
});

const s3 = new S3({
	accessKeyId,
	secretAccessKey,
	region
})


const upload2Bucket = (file: File, Body: Buffer) => {
	return s3Client.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
}

export {
	upload2Bucket,
	s3Client,
	s3
}