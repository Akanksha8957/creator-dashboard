from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from typing import List, Optional
from .. import models, schemas, crud, auth
from ..services import s3_service
from beanie import PydanticObjectId

router = APIRouter(
    prefix="/api/creators",
    tags=["creators"]
)

@router.post("/", response_model=schemas.CreatorResponse)
async def create_creator(
    name: str = Form(...),
    platform: str = Form(...),
    username: str = Form(...),
    image: Optional[UploadFile] = File(None),
    current_user: models.User = Depends(auth.get_current_user)
):
    image_url = None
    if image:
        if image.content_type not in ["image/jpeg", "image/png", "image/webp"]:
            raise HTTPException(status_code=400, detail="Invalid image type. Allowed: JPEG, PNG, WEBP")
        
        image_url = await s3_service.upload_file_to_s3(image)

    creator_data = schemas.CreatorCreate(
        name=name,
        platform=platform,
        username=username,
        profile_image_url=image_url
    )
    
    # We don't sign it immediately on create, but we could.
    # The frontend will likely reload the list or use the returned object.
    # For consistency, let's return the signed URL in the response if possible, 
    # but the stored URL in DB is the permanent one (without query params).
    
    return await crud.create_creator(creator=creator_data, user_id=current_user.id)

@router.get("/", response_model=List[schemas.CreatorWithAnalytics])
async def read_creators(
    skip: int = 0, 
    limit: int = 100, 
    current_user: models.User = Depends(auth.get_current_user)
):
    creators = await crud.get_creators(user_id=current_user.id, role=current_user.role, skip=skip, limit=limit)
    
    
    # Sign request URLs and fetch analytics
    results = []
    for creator in creators:
        # Sign URL
        if creator.profile_image_url:
            try:
                if ".com/" in creator.profile_image_url:
                    key = creator.profile_image_url.split(".com/")[1]
                    signed_url = s3_service.create_presigned_url(key)
                    if signed_url:
                        creator.profile_image_url = signed_url
            except Exception as e:
                print(f"Failed to sign URL for creator {creator.id}: {e}")
        
        # Fetch Analytics
        analytics = await crud.get_analytics(creator_id=creator.id)
        
        # Convert to response model with analytics
        creator_dict = creator.dict(by_alias=True)
        creator_dict["analytics"] = analytics
        results.append(creator_dict)
                
    return results

@router.get("/{creator_id}", response_model=schemas.CreatorWithAnalytics)
async def read_creator(
    creator_id: PydanticObjectId, 
    current_user: models.User = Depends(auth.get_current_user)
):
    creator = await crud.get_creator(creator_id=creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")
    
    if current_user.role != models.UserRole.ADMIN and creator.user_id != current_user.id:
         raise HTTPException(status_code=403, detail="Not authorized to view this creator")

    # Sign request URLs
    if creator.profile_image_url:
        try:
             if ".com/" in creator.profile_image_url:
                key = creator.profile_image_url.split(".com/")[1]
                signed_url = s3_service.create_presigned_url(key)
                if signed_url:
                    creator.profile_image_url = signed_url
        except Exception as e:
            print(f"Failed to sign URL for creator {creator.id}: {e}")

    return creator

@router.delete("/{creator_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_creator(
    creator_id: PydanticObjectId,
    current_user: models.User = Depends(auth.get_current_user)
):
    creator = await crud.get_creator(creator_id=creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")
    
    if current_user.role != models.UserRole.ADMIN and creator.user_id != current_user.id:
         raise HTTPException(status_code=403, detail="Not authorized to delete this creator")
    
    await crud.delete_creator(creator_id=creator_id)
    return None
