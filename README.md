## 1. README

A live version of this website can be found [here](https://inst-final.herokuapp.com/menus).

This is Group 25's Campus Dining Hall application that allows user to place orders around the current menu. The app is adaptive and will respond with menu items that are only available during the specific time of the day. This is targeted for desktop browser using React when developing the components.


## 2. Developer Manual

To set up this repository you will need to make sure you have [NodeJS installed](https://nodejs.org/en/). After cloning the respotory be sure to install the dependencies prior to starting the application.
<br></br>

### 2.1 Getting started

Running the following command will launch the application in development mode. This mode will consistently build the website.

```bash
npm run develop
```
If you would like to server the website statically, will need to run the build and serve command
```bash
npm run build
npm install -g serve
serve -s build
```
### 2.2 Testing & Future Implementation

Implementing a state manager like Redux would aid in the trasition from page to page and unluck more features. For instance, the current app stores the user data and order information to local storage. When needed, the information and queries up and this action turns into a repetitive task throughout the application. At certain times, say if a user were to cancel an order and navigate off the page. Another page will still have access to the past order. There is no gaurantee that the asynchronous call was successful. 


### 2.3 Data and Endpoints

This application utilizes an external MySQL database outside the immediate domain of this app. Uitilizing SQL, select data is queried and processed by the controller and presented to specific endpoints of the API route.

#### /Hours[/:day]

The hours endpoint provides the hours for each hall on a given day. If no day is provided, the server will interpret the current day.

#### /Meals[/:hall_id]

The meals endpoint provides the meals for a given hall. If no hall id is provided, a list of meals for all halls will be provided.

#### /Signin

In order to place an order, a user must have an account and sign in.

#### /Signup

The signup endpoint allows users to create an account.

#### /Hall/:id

The hall endpoint is restricted to those who have signed in. Signing in allows users to more detail about a given hall and the current menu.

#### /order[/:id]

After placing an order, you can review your order details or cancel an order.