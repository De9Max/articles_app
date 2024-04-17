
---

## Backend

### Technologies Used:
- [FastAPI](https://fastapi.tiangolo.com/): Web framework for building APIs with Python 3.7+.
- [Pydantic](https://pydantic-docs.helpmanual.io/): Data validation.
- [SQLAlchemy](https://www.sqlalchemy.org/): ORM library.
- [PostgreSQL](https://www.postgresql.org/): Database.
- [JWT Auth](https://jwt.io/): JSON Web Tokens (JWT) for authentication.

## Frontend

### Technologies Used:
- [Next.js](https://nextjs.org/): React framework for building server-side rendered and statically generated web applications.
- [Formik](https://formik.org/): Library for building forms with validation and other things.
- [Redux](https://redux.js.org/): State container/controller.
- [Material-UI](https://mui.com/): UI framework for building beautiful application.


## Code Quality Tools:
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Full Line Code Completion](https://plugins.jetbrains.com/plugin/14823-full-line-code-completion)

### Run instruction
- Prepare [PostgreSQL](https://www.postgresql.org/) and new database
- Setup `.env` ( each folder (front/back) has `.env.example` )
- Run backend
- `cd back`
- `pip3 install -r requirement.txt`
- `python3 main.py` _# Create/recreate DB models_
- `python3 -m uvicorn main:app --port 5050`
- Run frontend
- `cd front`
- `npm i`
- `npm run build`
- `npm run start`
- Scrape new records from RSS
- `cd back/modules`
- `python3 scrapper.py`
---