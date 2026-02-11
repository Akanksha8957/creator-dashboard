import boto3
from botocore.exceptions import NoCredentialsError
import os
from fastapi import UploadFile, HTTPException
import uuid

# AWS Configuration
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
AWS_S3_BUCKET = os.getenv("AWS_S3_BUCKET")

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

async def ensure_bucket_exists():
    try:
        s3_client.head_bucket(Bucket=AWS_S3_BUCKET)
    except s3_client.exceptions.ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == '404':
            try:
                if AWS_REGION == "us-east-1":
                    s3_client.create_bucket(Bucket=AWS_S3_BUCKET)
                else:
                    s3_client.create_bucket(
                        Bucket=AWS_S3_BUCKET,
                        CreateBucketConfiguration={'LocationConstraint': AWS_REGION}
                    )
                print(f"Created bucket {AWS_S3_BUCKET} in {AWS_REGION}")
            except Exception as e:
                print(f"Failed to create bucket: {e}")
                raise HTTPException(status_code=500, detail=f"Failed to create S3 bucket: {str(e)}")
        else:
             raise HTTPException(status_code=500, detail=f"S3 Bucket Error: {str(e)}")

async def upload_file_to_s3(file: UploadFile, folder: str = "creator-images"):
    if not AWS_S3_BUCKET:
        raise HTTPException(status_code=500, detail="AWS S3 Bucket not configured in environment")
    
    await ensure_bucket_exists()

    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{folder}/{uuid.uuid4()}.{file_extension}"
    
    try:
        s3_client.upload_fileobj(
            file.file,
            AWS_S3_BUCKET,
            unique_filename,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )
        # Construct url
        file_url = f"https://{AWS_S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{unique_filename}"
        return file_url

    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="AWS Credentials not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_presigned_url(object_key: str, expiration=3600):
    """Generate a presigned URL to share an S3 object"""
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': AWS_S3_BUCKET,
                                                            'Key': object_key},
                                                    ExpiresIn=expiration)
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return None

    return response
