<div align=center>

# NextStep Fitness

#### Personalized Fitness 05/13/2020

#### By **Andrew Philpott**

[About](#About) | [Installation and Configuration](#Installation-and-Configuration) | [View URLs](#View-URLs) | [API Endpoints](#API-Endpoints) | [Bugs](#Known-Bugs) | [Technologies](#Technologies-Used) | [Contact](#Support-and-Contact-Details)

</div>

## About

A personalized fitness tracker that allows you to track your workouts, muscle fatigue and recovery.

## Installation and Configuration:

- Download .NET application version 3.1
- Download Sql Server
- Clone the repository on Github
- Open the terminal on your desktop
- \$git clone "insert your cloned URL here"
- Change directory to the api directory
- \$dotnet restore
- \$dotnet ef migrations add Initial
- \$dotnet ef database update
- \$dotnet watch run
- _api will run on localhost:5000_
- Open seperate terminal
- Change directory to the app directory
- \$npm install
- \$npm run start
- _app will run on localhost:3000_

## View URLs

| URL Path            | Purpose                                                     |
| :------------------ | :---------------------------------------------------------- |
| /                   | Landing page for BodyJournal                                |
| /login              | Form for users to log in                                    |
| /register           | Form for users to register                                  |
| /account            | Human model with color coded muscles for indicating fatigue |
| /workouts           | List of workouts                                            |
| /workouts/new       | Form to create a new workout                                |
| /workouts/edit/{id} | Form to edit a workout                                      |
| /records            | List of records                                             |

## API Endpoints

| HTTP Method | Endpoint                      | Purpose                                          |
| :---------- | :---------------------------- | :----------------------------------------------- |
| GET         | /exercises                    | Retrieve a list of exercise types                |
| GET         | /exercises/{id}               | Retrieve an exercise type                        |
| GET         | /users                        | Retrieve a list of users                         |
| POST        | /users/register               | Create a user                                    |
| POST        | /users/authenticate           | Authenticate a user                              |
| GET         | /users/{id}                   | Retrieve a user by id                            |
| PUT         | /users/{id}                   | Edit a user                                      |
| DELETE      | /users/{id}                   | Delete a user                                    |
| GET         | /users/workouts               | Retrieve a list of workouts                      |
| POST        | /users/workouts               | Create a workout                                 |
| GET         | /users/workouts/{id}          | Retrieve a workout by id                         |
| PUT         | /users/workouts/{id}          | Edit a workout                                   |
| DELETE      | /users/workouts/{id}          | Delete a workout                                 |
| GET         | /users/sessions               | Retrieve a list of sessions                      |
| POST        | /users/sessions               | Create a session                                 |
| GET         | /users/sessions/{id}          | Retrieve a session by id                         |
| PUT         | /users/sessions/{id}          | Edit a session                                   |
| DELETE      | /users/sessions/{id}          | Delete a session                                 |
| GET         | /users/records                | Retrieve a list of records                       |
| POST        | /users/records                | Create a record                                  |
| GET         | /users/records/{id}           | Retrieve a record by id                          |
| PUT         | /users/records/{id}           | Edit a record                                    |
| DELETE      | /users/records/{id}           | Delete a record                                  |
| GET         | /users/records/exercises/{id} | Retrieve a list of records by exercise type id   |
| GET         | /users/records/exercises/pr   | Retrieve personal records for each exercise type |
| GET         | /users/recoveries             | Retrieve a list of recoveries                    |
| POST        | /users/recoveries             | Create a recovery                                |
| GET         | /users/recoveries/{id}        | Retrieve a recovery by id                        |
| PUT         | /users/recoveries/{id}        | Edit a recovery                                  |

## Known Bugs

No bugs

## Support and contact details

For feedback, questions and/or ideas, please email me at <andrewphilpott92@gmail.com>

## Technologies Used

- React
- C#
- .NET Core v3.1
- Entity Framework
- Fetch
- JWT token authentication
- Sql Server
- CSS
- HTML
- Material-UI

### License

This software is licensed under the MIT license.

Copyright (c) 2020 **Andrew Philott**
