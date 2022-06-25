from sqlalchemy import Integer, Text, String, DateTime, Boolean, Column
from sqlalchemy.sql import func

from database import engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    '''User model'''

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    username = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    

Base.metadata.create_all(engine)