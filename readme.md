# Fetan - Delivery Service App 
An online Employer-employee link app. 

## Table of contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Setup](#setup)

## Introduction
An online Employer-employee link app. 

<!-- ![Software Developer](https://github.com/abenikeb/fetandelivery/blob/main/fetan_mock_2.png) -->
<img src="https://github.com/abenikeb/abenikeb/blob/main/DesktopV1.png" width="500" />

	
## Technologies
Project is created with:
* 🖥 JS
* 🖥 Node JS 
* 💻 Express Js
* 💻 Mongo DB

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Populate the Database

    node seed.js

### Run the Tests

You're almost done! Run the tests to make sure everything is working:

    npm test

All tests should pass.

### Start the Server

    node index.js

Open up your browser and head over to:

http://localhost:3900/api/employee

You should see the list of items. That confirms that you have set up everything successfully.

### (Optional) Environment Variables

If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

On Mac:

    export employee_jwtPrivateKey=yourSecureKey

On Windows:

    set employee_jwtPrivateKey=yourSecureKey

