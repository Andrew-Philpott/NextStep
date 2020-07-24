<div align=center>

# NextStep Fitness

#### Personalized Fitness 05/13/2020

#### By **Andrew Philpott**

[About](#About) | [Capstone Proposal](#Capstone-Proposal) | [Installation and Configuration](#Installation-and-Configuration) | [View URLs](#View-URLs) | [API Endpoints](#API-Endpoints) | [Bugs](#Known-Bugs) | [Technologies](#Technologies-Used) | [Contact](#Support-and-Contact-Details)

</div>

## About

A personalized fitness tracker that allows you to track your workouts, muscle fatigue and recovery.

## Capstone Proposal

Project's Purpose or Goal: Track workouts, muscle fatigue, and recovery.

List the absolute minimum features the project requires to meet this purpose or goal:

- _The application will display muscle fatigue levels with a color coded body model for fast and easy identification of what muscle group(s) to workout next._
- _The application will have complete CRUD functionality of workouts, exercises, muscle fatigue, sessions (when a workout was performed), and personal records._
- _The application will utilize authentication to display information relevant to the user._

What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.

- _React for styling and conditional rendering of the user interface._
- _C# .Net Core RESTful API for data management._
- _Google Slides for component diagrams and process flow._

If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.

- _Implement health information from the Fitbit API to fine tune workout suggestions._
- _Implement statistics for workouts vs muscle fatigue, exercise vs muscle fatigue._
- _Implement premium memberships for more functionality._

What additional tools, frameworks, libraries, APIs, or other resources will these additional features require?

- _Azure Active Directory for authentication._
- _BootStrap, Material UI, and Google Charts for styling._
- _Markdown for Readme._

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
- _app will run on localhost:5000_

## View URLs

| URL Path        | Purpose                                                     |
| :-------------- | :---------------------------------------------------------- |
| /               | Landing page for BodyJournal                                |
| /login          | Form for users to log in                                    |
| /register       | Form for users to register                                  |
| /account        | Human model with color coded muscles for indicating fatigue |
| /exercises      | List of exercises                                           |
| /exercises/{id} | Exercise details                                            |
| /exercises/new  | Form to create an exercise                                  |
| /workouts       | List of workouts                                            |
| /workouts/{id}  | Workout details                                             |
| /workouts/new   | Form to create a new workout                                |
| /records        | List of records                                             |

## API Endpoints

| HTTP Method | Endpoint               | Purpose                                  |
| :---------- | :--------------------- | :--------------------------------------- |
| GET         | /exercises             | Retrieve a list of exercises             |
| GET         | /users/exercises/{id}  | Retrieve an exercise by it's id          |
| PUT         | /users/exercises/{id}  | Edit a specific exercise                 |
| POST        | /users/exercises       | Add an exercise to the list of exercises |
| GET         | /users/workouts        | Retrieve a list of workouts              |
| GET         | /users/workouts/{id}   | Retrieve a workout by it's id            |
| PUT         | /users/workouts/{id}   | Edit a specific workout                  |
| POST        | /users/workouts        | Add a workout to the list of workouts    |
| GET         | /users/recoveries      | Retrieve a list of recoveries            |
| GET         | /users/recoveries/{id} | Retrieve a recovery by it's id           |
| PUT         | /users/recoveries/{id} | Edit a recovery                          |
| POST        | /users/recoveries      | Add a recovery                           |

## Known Bugs

No bugs

## Support and contact details

For feedback, questions and/or ideas, please email me at <andrewphilpott92@gmail.com>

## Technologies Used

- React
- C#
- .NET Core v3.0
- Entity Framework
- JWT token authentication
- Sql Server
- CSS
- HTML
- Material-UI

### License

This software is licensed under the MIT license.

Copyright (c) 2020 **Andrew Philott**
