from fastapi import FastAPI, Request, UploadFile, File, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from jinja2.utils import missing 
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import smtplib,os

load_dotenv()

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_TO = os.getenv("EMAIL_TO")

app = FastAPI()


templates=Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/",response_class="HTMLResponse")
async def home(request:Request):
    return templates.TemplateResponse("home.html",{"request":request})

@app.get("/zomato-data-analysis-by-shuba",response_class="HTMLResponse")
async def firstpro(request:Request):
    return templates.TemplateResponse("firstpro.html",{"request":request})

@app.get("/blood-bank-ms-by-shuba",response_class="HTMLResponse")
async def secondpro(request:Request):
    return templates.TemplateResponse("secondpro.html",{"request":request})

@app.get("/shuba-portfolio",response_class="HTMLResponse")
async def portfoliopro(request:Request):
    return templates.TemplateResponse("portfoliopro.html",{"request":request})

@app.get("/Journey-Quest-Travel-Guide-by-shuba",response_class="HTMLReponse")
async def thirdpro(request:Request):
    return templates.TemplateResponse("thirdpro.html",{"request":request})

@app.get("/geniegobot-shuba",response_class="HTMLResponse")
async def fourthpro(request:Request):
    return templates.TemplateResponse("fourthpro.html",{"request":request})

@app.get("/contact",response_class="HTMLResponse")
async def contact(request:Request):
    return templates.TemplateResponse("contact.html",{"request":request})

@app.post("/contact", response_class=HTMLResponse)
async def send_message(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    file: UploadFile = File(None)
):
    body = f"From: {name} <{email}>\n\n{message}"

    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_TO
        msg["Subject"] = f"[Portfolio] {subject} - sent by - {name}"
        msg.attach(MIMEText(body, "plain"))

        # Handle file upload
        if file is not None:
            file_bytes = await file.read()
            if file_bytes:
                attachment = MIMEApplication(file_bytes, Name=file.filename or "attachment")
                attachment["Content-Disposition"] = f'attachment; filename="{file.filename or "attachment"}"'
                msg.attach(attachment)

        # --- FIX: Ensure correct connection method ---
        EMAIL_PORT_INT = int(EMAIL_PORT)

        if EMAIL_PORT_INT == 465:  # SSL
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT_INT, timeout=30) as server:
                server.login(EMAIL_USER, EMAIL_PASS)
                server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string())

        else:  # STARTTLS (usually port 587)
            with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT_INT, timeout=30) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(EMAIL_USER, EMAIL_PASS)
                server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string())

        return templates.TemplateResponse("contact.html", {"request": request, "success": True})

    except Exception as e:
        return templates.TemplateResponse("contact.html", {"request": request, "error": f"{type(e).__name__}: {e}"})



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app=FastAPI)
