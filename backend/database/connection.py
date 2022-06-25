from requests import session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://postgres:testpassword@database-1.c5vt865d06bf.us-east-1.rds.amazonaws.com:5432/postgres')

Session = sessionmaker(bind=engine)
session = Session()