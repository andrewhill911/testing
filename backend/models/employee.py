from sqlalchemy import Integer, Text, String, DateTime, Boolean, Column
from sqlalchemy.sql import func

from database import engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Employee(Base):
    '''Employee model'''

    __tablename__ = 'employee'

    id = Column(Integer, primary_key=True, autoincrement="auto")
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    middle_initial = Column(String(1), nullable=False)
    date_of_birth = Column(DateTime, nullable=False)
    date_of_employment = Column(DateTime, nullable=False)
    status = Column(Boolean, nullable=False)

Base.metadata.create_all(engine)