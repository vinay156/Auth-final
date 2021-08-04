Description
Endpoints

• Home:

    Home page -
    URI: GET /
    Status: 200
    Response: index.ejs

• Authentication:

    Sign Up -
      URI: GET /sign-up
      Status: 200
      Response: signup.ejs

      URI: POST /sign-up
      Status: 200
      Request: {
                    username,
                    password,
                }
      Response: redirect("/")

    Log In -
      URI: GET /log-in
      Status: 200
      Response: login.ejs

      URI: POST /log-in
      Request: {
                    username,
                    password,
                }
      Status: 200
      Response: redirect("/")

    Log Out -
      URI: GET /log-out
      Status: 200
      Response: redirect("/")

• Message:

    Create Message -
      URI: GET /create-message
      Status: 200
      Response: create-message.ejs

      URI: POST /create-message
      Request: {
                    title,
                    note,
                }
      Status: 200
      Response: redirect("/")

Database schema
User
username: String
password: String
status: member

Message
title: String
note: String
date: Date
user: User

virtual-
createdAt: Date

Tests
Automated test cases added
• None
Manual test cases run
• Creates sample test data
• Checks all the endpoints

Project Link:
https://membersonly789.herokuapp.com/
