from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta, timezone

from config.data import CONTENT_USER_NOTIFICATION, SUBJECT_USER_NOTIFICATION, TIME_FOR_NOTIFY
from func.save_to_fb_db import get_users_notification_info
from func.send_email import send_email_to_user


scheduler = BackgroundScheduler()


# Function to schedule a task for a user
def schedule_email(email, registration_date, uid):
    try:
        # Calculate how much time has passed since registration
        time_since_registration = datetime.now(timezone.utc) - registration_date
        # Calculate the number of full weeks that have passed since registration
        full_time_since_registration = time_since_registration.days // TIME_FOR_NOTIFY
        # Calculate the time for the next notification
        next_notification_time = registration_date + timedelta(days=TIME_FOR_NOTIFY * (full_time_since_registration + 1))

        # If the current time is already greater than next_notification_time, recalculate
        if next_notification_time <= datetime.now(timezone.utc):
            next_notification_time = datetime.now(timezone.utc) + timedelta(minutes=60)  # Schedule for the nearest hour

        unsubscribe_link = f"https://tbd.com/{uid}"
        content = CONTENT_USER_NOTIFICATION.replace("<unsubscribe_link>", unsubscribe_link)

        scheduler.add_job(
            send_email_to_user,
            'interval',
            days=TIME_FOR_NOTIFY,
            start_date=next_notification_time,
            args=[email, SUBJECT_USER_NOTIFICATION, content],
            misfire_grace_time=60 * 60,
            id=f"email_job_{email}",
            replace_existing=True
        )
    except Exception as e:
        print(e)


def start_scheduler():
    scheduler.start()
    print("Scheduler started")


def start_notify_after_restart():
    all_users = get_users_notification_info()
    for user in all_users:
        if user["is_subscribed"]:
            reg_date_time = datetime.strptime(user["registration_date"], '%Y-%m-%d %H:%M:%S')
            reg_date_time_utc = reg_date_time.replace(tzinfo=timezone.utc)
            schedule_email(user["email"], reg_date_time_utc, user["uid"])


# Function to get information about all scheduled jobs
def get_scheduled_jobs():
    jobs = scheduler.get_jobs()
    for job in jobs:
        email = job.args[0]  # Extract email from arguments
        next_run_time = job.next_run_time  # Next job run time
        print(f"E-mail: {email}, Next run: {next_run_time}")


def remove_email_job(email: str):
    job_id = f"email_job_{email}"
    if scheduler.get_job(job_id):
        scheduler.remove_job(job_id)
        print(f"Removed job for email: {email}")
