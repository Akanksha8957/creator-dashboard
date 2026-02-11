from fastapi import APIRouter, Depends, HTTPException
import models, schemas, crud, auth
from services import analytics_engine
from beanie import PydanticObjectId

router = APIRouter(
    prefix="/api/analytics",
    tags=["analytics"]
)

@router.get("/dashboard")
async def get_dashboard_analytics(
    current_user: models.User = Depends(auth.get_current_user)
):
    creators = await crud.get_creators(user_id=current_user.id, role=current_user.role)
    
    total_creators = len(creators)
    total_followers = 0
    total_engagement = 0
    
    creators_with_analytics = []
    
    for creator in creators:
        analytics = await crud.get_analytics(creator.id)
        if analytics:
            total_followers += analytics.followers
            total_engagement += analytics.engagement_rate
            creators_with_analytics.append({
                "name": creator.name,
                "history": analytics.historical_data
            })
            
    avg_engagement = round(total_engagement / total_creators, 2) if total_creators > 0 else 0
    
    return {
        "total_creators": total_creators,
        "total_followers": total_followers,
        "avg_engagement_rate": avg_engagement,
        "performance_data": creators_with_analytics
    }

@router.get("/creator/{creator_id}", response_model=schemas.AnalyticsResponse)
async def get_creator_analytics(
    creator_id: PydanticObjectId,
    current_user: models.User = Depends(auth.get_current_user)
):
    creator = await crud.get_creator(creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")
        
    if current_user.role != models.UserRole.ADMIN and creator.user_id != current_user.id:
         raise HTTPException(status_code=403, detail="Not authorized")
         
    analytics = await crud.get_analytics(creator_id)
    if not analytics:
        start_data = analytics_engine.get_full_analytics()
        analytics = await crud.update_analytics(creator_id, start_data)
        
    return analytics

@router.post("/refresh/{creator_id}", response_model=schemas.AnalyticsResponse)
async def refresh_analytics(
    creator_id: PydanticObjectId,
    current_user: models.User = Depends(auth.get_current_user)
):
    creator = await crud.get_creator(creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")
        
    if current_user.role != models.UserRole.ADMIN and creator.user_id != current_user.id:
         raise HTTPException(status_code=403, detail="Not authorized")
    
    new_data = analytics_engine.get_full_analytics()
    analytics = await crud.update_analytics(creator_id, new_data)
    
    return analytics
