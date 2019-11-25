# MyRestaurantList

## Why I need MyRestaurantList?
* Two person A and B.
    * A:" Hey, what should we eat today dinner? "
    * B:" Anything you like. "
    * A:" Cool, then we gonna have pasta tonight. "
    * B:" Pasta again? "
    * A:" Okay... what do you want? "
    * B:" Anything you like. "
    * A:" ... Maybe we should have a eatenlist. "

## Features

| Features | Details  | Routes   |
| -------- | -------- | -------- |
| Search   | Category & Name | /retaurants/search |
| Add new restaurant | Name is required | /restaurants/new |
| Edit         | Picture URL checked         | /restaurants/edit         | 
| Delete         | Confirm message          |/restaurants/delete          | 
| Sort         |  Rank        |  /restaurants/score        |
| Login & Logout     | Facebook login included     | /users/login & /users/logout    |

## Front page

![](https://i.imgur.com/fUPt2ws.jpg)


## Installation
1. Github clone

    `git clone https://github.com/ken556621/myRestaurantList.git`
    
2. Use terminal open file 'myRestaurantList'

     `cd myRestaurantList`
     
3. Use terminal add new file name '.env'

    `touch .env`
    
4. Inside the env folder type

    `FACEBOOK_ID=//your client ID`
    `FACEBOOK_SECRET=//your facebook secret`
    `FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback`
    > This is for facebook login secret key
     
5. NPM install

    `npm install`
    
6. NPM run start

    `npm run start`
    
7. Open browser 
    
    `http://localhost:3000`
    
## Testing data

|   User | Email |  password |
| -------- | -------- | -------- |
|  user1        |  user1@example.com        | 12345678         |
|  user2|user2@example.com|12345678

   
## Environment
1. Express
2. Express-session
3. Nodemon
4. Dotenv
5. Express-handlebars
6. Body-parser
7. Connect-flash
> Data base
1. Mongodb
2. Mongoose

