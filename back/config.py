from dotenv import dotenv_values, load_dotenv

load_dotenv()
dotenv_values(".env")

origins = [
    "http://localhost:3000",
]
