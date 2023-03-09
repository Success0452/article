# Interview

![Javascript](https://img.shields.io/badge/javascript-FFF000?style=for-the-badge&logo=Javascript&logoColor=0000FF)
![Express](https://img.shields.io/badge/express-999HI4?style=for-the-badge&logo=Express%20compose&logoColor=ffdd54)
![NodeJs](https://img.shields.io/badge/nodejs-%23E34F26.svg?style=for-the-badge&logo=NodeJs&logoColor=white)
![Api](https://img.shields.io/badge/api-EE36F26.svg?style=for-the-badge&logo=Api&logoColor=white)

`task` : `Create Article Api`

`Purpose of this Project`:
- This project is designed to satisfy the requirement of an interview.

`Requirements`
● Users should be able to create their own user account and sign in.
● Users should be able to write and post articles.
● Users should be able to edit and delete their own articles. 
● Users should be able to comment on other users' articles.
● The website should display all articles, with the most recently posted articles first.
● Users should be able to view a specific article in detail with it’s comments.

### Details of the project
#### Framework: NodeJS
#### Language: JavaScript
#### Database: Postgresql


#### Article Api is deployed on render.com with the following details
##### BASE URL: ''

#### Routes Currently Available

##### USER

#### POST
##### `/users/create` `first_name => required | last_name => required | email => required | phone => required | gender => required | password => required | bio => required`
###### Create account for the users and verification email is sent to their email

#### POST
##### `/users/verify` `email => required | otp => required`
###### account is verified when when the user provide the sent otp

#### POST
##### `/users/login` `email => required | password => required`
###### if user email is verified, then the user can login.

#### POST
##### `/article/create` `requires token`
###### Creates article for the user

