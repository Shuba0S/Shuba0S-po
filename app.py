from fastapi import FastAPI, Form, Request, HTTPException, UploadFile, File
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from email.message import EmailMessage
import smtplib

# from config import EMAIL_USER, EMAIL_PASSWORD, EMAIL_TO
import os

EMAIL_USER = os.environ.get("EMAIL_USER")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")
EMAIL_TO = os.environ.get("EMAIL_TO")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shuba-s.onrender.com"],  # For local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/contact")
async def contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    attachment: UploadFile = File(None),
):
    body = f"From: {name} <{email}>\n\n{message}"

    msg = EmailMessage()
    msg["Subject"] = f"New Message from {name}"
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_TO
    msg.set_content(body)
    msg.add_header("Reply-To", email)

    if attachment:
        file_data = await attachment.read()
        msg.add_attachment(
            file_data,
            maintype="application",
            subtype="octet-stream",
            filename=attachment.filename,
        )

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_USER, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return {"status": "success"}
    except Exception as e:
        print("Error:", e)
        return {"status": "error", "detail": str(e)}


app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def show_loader(request: Request):
    return templates.TemplateResponse("loader.html", {"request": request})


@app.get("/home", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/services", response_class=HTMLResponse)
def services(request: Request):
    return templates.TemplateResponse(
        "services.html", {"request": request, "no_navbar": True, "no_background": True}
    )


@app.get("/projects", response_class=HTMLResponse)
def projects(request: Request):
    return templates.TemplateResponse(
        "projects.html", {"request": request, "no_navbar": True, "no_background": True}
    )


@app.get("/education", response_class=HTMLResponse)
def education(request: Request):
    return templates.TemplateResponse(
        "education.html", {"request": request, "no_navbar": True, "no_background": True}
    )


@app.get("/contact", response_class=HTMLResponse)
def contact(request: Request):
    return templates.TemplateResponse(
        "contact.html", {"request": request, "no_navbar": True, "no_background": True}
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=FastAPI(debug=True))
