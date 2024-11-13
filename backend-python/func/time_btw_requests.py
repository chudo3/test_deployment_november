from datetime import timedelta
import redis

from config.data import MIN_TIME_BETWEEN_REQUESTS


# Initialize Redis client
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

def set_request_timestamp(uid: str, module_name: str):
    """Sets a key in Redis with an expiration time of x minutes."""
    key = f"{uid}:{module_name}"
    redis_client.setex(key, timedelta(minutes=MIN_TIME_BETWEEN_REQUESTS), value="requested")

def check_request_timestamp(uid: str, module_name: str) -> bool:
    """Checks if a key exists in Redis."""
    key = f"{uid}:{module_name}"
    return redis_client.exists(key) == 1