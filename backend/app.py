import os, sys
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from models import Employee, User
from database import session
from datetime import datetime
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/employees/add', methods=['POST'])
@cross_origin()
def add_employee():
    #get the data from the request
    first_name = request.json['firstName']
    last_name = request.json['lastName']
    middle_initial = request.json['middleInitial']
    date_of_birth = request.json['dateOfBirth']
    #date_of_birth to datetime
    date_of_birth = datetime.strptime(date_of_birth, '%d/%m/%Y')
    date_of_employment = request.json['dateOfEmployment']
    #date_of_employment to datetime
    date_of_employment = datetime.strptime(date_of_employment, '%d/%m/%Y')
    status = request.json['active']
    #create an employee object
    emp = Employee(first_name=first_name, last_name=last_name, middle_initial=middle_initial, date_of_birth=date_of_birth, date_of_employment=date_of_employment, status=status)
    #add the employee to the database
    session.add(emp)
    #commit the changes to the database
    session.commit()
    #return a message to the user
    return 'Employee added successfully!'

@app.route('/employees', methods=['GET'])
@cross_origin()
def get_employees():
    #get all employees from the database
    employees = session.query(Employee).all()
    #create a list to store the employees
    employee_list = []
    #loop through all employees
    for employee in employees:
        #create a dictionary to store the employee data
        employee_dict = {
            'id': employee.id,
            'firstName': employee.first_name,
            'lastName': employee.last_name,
            'middleInitial': employee.middle_initial,
            'dateOfBirth': datetime.strftime(employee.date_of_birth, '%d/%m/%Y'),
            'dateOfEmployment': datetime.strftime(employee.date_of_employment, '%d/%m/%Y'),
            'active': employee.status
        }
        #add the employee to the list
        employee_list.append(employee_dict)
    #return the list of employees jsonified
    return jsonify(employee_list)
    
#make route for editing employees
@app.route('/employees/edit', methods=['POST'])
@cross_origin()
def edit_employee():
    #get the data from the request
    id = request.json['id']
    employee = session.query(Employee).filter_by(id=id).first()
    employee.first_name = request.json['firstName']
    employee.last_name = request.json['lastName']
    employee.middle_initial = request.json['middleInitial']
    employee.date_of_birth = request.json['dateOfBirth']
    employee.date_of_employment = request.json['dateOfEmployment']
    if request.json['active'] == 'true':
        employee.status = True
    else:
        employee.status = False
    #commit the changes to the database
    session.commit()
    #return a message to the user
    return 'Employee edited successfully!'



#make route for adding users
@app.route('/login', methods=['POST'])
@cross_origin()
def add_user():
    
    #get the data from the request
    username = request.json['username']
    password = request.json['password']
    user = check_user(username, password)
    if user:
        return jsonify({'status': 'success'})
    else:
        #create an user object
        user = User(username=username, password=password)
        #add the user to the database
        session.add(user)
        #commit the changes to the database
        session.commit()
        #return a message to the user
        return jsonify({'message': 'User added successfully!', 'status': 'success'})


def check_user(username, password):
    #check if the user exists
    user = session.query(User).filter_by(username=username, password=password).first()
    return user

if __name__ == '__main__':
    app.run()
    