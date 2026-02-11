import random
from datetime import datetime, timedelta, timezone

def generate_followers():
    return random.randint(5000, 500000)

def generate_engagement_rate():
    return round(random.uniform(1.0, 10.0), 2)

def calculate_metrics(followers, engagement_rate):
    # engagement_rate is percentage, e.g. 5.5
    avg_likes = int(followers * (engagement_rate / 100))
    avg_comments = int(avg_likes * 0.05) # Assume 5% of likers comment
    return avg_likes, avg_comments

def generate_historical_data(base_followers, base_engagement):
    # Generate 30 days of data
    history = []
    current_followers = base_followers
    
    # Work backwards from today
    today = datetime.now(timezone.utc)
    
    for i in range(30):
        date = (today - timedelta(days=i)).strftime("%Y-%m-%d")
        # Fluctuation (+/- 2%)
        fluctuation = random.uniform(0.98, 1.02)
        daily_followers = int(current_followers * fluctuation)
        
        # Engagement also fluctuates
        daily_engagement = round(base_engagement * random.uniform(0.9, 1.1), 2)
        
        history.append({
            "date": date,
            "followers": daily_followers,
            "engagement_rate": daily_engagement
        })
        current_followers = daily_followers # Update for next iteration backwards
        
    return list(reversed(history)) # Return chronological order

def get_full_analytics():
    followers = generate_followers()
    engagement = generate_engagement_rate()
    likes, comments = calculate_metrics(followers, engagement)
    history = generate_historical_data(followers, engagement)
    
    return {
        "followers": followers,
        "engagement_rate": engagement,
        "avg_likes": likes,
        "avg_comments": comments,
        "historical_data": history,
        "last_updated": datetime.now(timezone.utc)
    }
