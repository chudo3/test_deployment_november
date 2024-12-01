from fastapi import HTTPException
import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText

import markdown2

GMAIL_USER = "Health  Spectrum  <dmitry.maxcs6440@gmail.com>"
#GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
GMAIL_APP_PASSWORD = "Klass2024!"

# Function to send email
def send_email_to_user(email_address, subject, content):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = GMAIL_USER
    msg['To'] = email_address
    html_body = markdown2.markdown(content)
    msg.set_content(MIMEText(html_body, 'html'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(GMAIL_USER.split()[-1].strip('<>'), GMAIL_APP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f'Error sending email: {e}')
        raise HTTPException(status_code=500, detail='Failed to send email')
