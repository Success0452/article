# Interview

![Javascript](https://img.shields.io/badge/javascript-FFF000?style=for-the-badge&logo=Javascript&logoColor=0000FF)
![Express](https://img.shields.io/badge/express-999HI4?style=for-the-badge&logo=Express%20compose&logoColor=ffdd54)
![NodeJs](https://img.shields.io/badge/nodejs-%23E34F26.svg?style=for-the-badge&logo=NodeJs&logoColor=white)
![Api](https://img.shields.io/badge/api-EE36F26.svg?style=for-the-badge&logo=Api&logoColor=white)

`task` : `Create Article Api`

`Purpose of this Project`:
- This project is designed to satisfy the requirement of an interview.

`Requirements`
- Users should be able to create their own user account and sign in.
- Users should be able to write and post articles.
- Users should be able to edit and delete their own articles. 
- Users should be able to comment on other users' articles.
- The website should display all articles, with the most recently posted articles first.
- Users should be able to view a specific article in detail with it’s comments.

### Details of the project
#### Framework: NodeJS
#### Language: JavaScript
#### Database: Postgresql


#### Article Api is deployed on render.com with the following details
##### BASE URL: 'https://article-t6vi.onrender.com/api'

#### Routes Currently Available

##### USER

#### POST
##### `/users/create` `first_name(body) => required | last_name(body) => required | email(body) => required | phone(body) => required | gender(body) => required | password(body) => required | bio(body) => required`
###### Create account for the users and verification email is sent to their email

#### POST
##### `/users/verify` `email(body) => required | otp(body) => required`
###### account is verified when when the user provide the sent otp

#### POST
##### `/users/login` `email(body) => required | password(body) => required`
###### if user email is verified, then the user can login.

##### ARTICLE

#### POST
##### `/article/create` `requires token | description(body)  => required | title(body)  => required | subject(body)  => required`
###### Creates article for the user

##### POST
##### `/article/add_comment` `requires token | articleId(body)  => required | comment(body)  => required`
###### This endpoint allows you to add comment on a posted article

##### GET
##### `/article/view_comment` `requires token | commentId(params)  => required`
###### allow user to view the details of a particlar comment

##### GET
##### `/article/view_article` `requires token | articleId(params)  => required`
###### allow user to view the details of a particlar article

##### PATCH
##### `/article/edit_article` `requires token | articleId(params)  => required | description(body)  => required`
###### allow user to edit the details of a particlar article

##### DELETE
##### `/article/delete_article` `requires token | articleId(body)  => required`
###### allow user to edit the details of a particlar article

##### GET
##### `/article/view_all_article` `requires token`
###### allow user to view all the posted article and their repective comments.

### How to clone this project

Make sure you have Git installed on your computer. You can check if Git is installed by running the command git --version in a command prompt or terminal window.

Open a command prompt or terminal window and navigate to the directory where you want to clone the repository.

Use the following command to clone the repository:

Copy code
git clone `https://github.com/Success0452/article`

Once the repository is cloned, navigate into the repository directory using cd REPOSITORY

Use `npm install` command to install the dependencies for the project.

You can now use the cloned repository to run the application or make changes to the code.

You can also use ssh instead of https while cloning the repository, git clone `git@github.com:Success0452/article.git`

Please note that the above steps assume that you have an active internet connection and you have the permission to access the repository.