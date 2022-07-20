## Simple API and UI using serverless

For this challenge are expected on the frontend the following behaviors:

- List all cars registered
- Register a new car
- Edit an existent car
- Filter by Maker or Model
- Sort for any field
- Paginate over the data

The API should allow frontend or any other request, for example, via postman, to perform these actions.

## Running in docker

First, run the docker compose to start up the applications:

Build and run the containers:
```bash
docker-compose up --build
```

Run the containers already built:
```bash
docker-compose up -d
```

## Environment

- Docker
- Nodejs v14.12.0-alpine

## Frontend
Open [Frontend Solution](http://localhost:4200).

The frontend was created in Angular 8+ using the following packages:

- Angular Material Desing (This design system provided all components and necessary resources to allow me to create the front side system and its behavior)
- ngx-toastr (Library to create and manage toast)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Backend

I decided to create a serverless solution with azure function and nodejs.
The Azure Function was a choice because works in docker without any other simulator, library, or framework to receive HTTP request's.

- NodeJs (Http server)
- Mongoose (Connect to MongoDb)
- Mongoose Express (UI to manage and list the documents)
- Azure Function Tool (Client to work with azure functions)

This project was generated with [Azure Function Tools](https://github.com/Azure/azure-functions-core-tools)

## Request via Postman or Curl command

You can test the API just by executing any CURL below.

- List all cars already registered in our database

```bash
curl --location --request GET 'http://localhost:7071/api/search?search=BMW&offset=0&limit=10&sort=maker'
```

- Create a new car in our database

```bash
curl --location --request POST 'http://localhost:7071/api/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "maker": "BMW",
    "model_name": "Series3", 
    "year": 2021, 
    "color":"Black", 
    "monthlyPrice": 370.90, 
    "availableDate": "06/01/2021"
}'
```

- Change a specific car. **(Change the value *id* to the car id returned on create process)**  

```bash
curl --location --request PUT 'http://localhost:7071/api/change/{id}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "maker": "BMW",
    "model_name": "X1", 
    "year": 2018, 
    "color":"Rosa", 
    "monthlyPrice": 62.40, 
    "availableDate": "01/01/2022"
}'

```

## Run server or frontend locally

- Server
    - Open the backend path on the terminal and run the following commands

```bash 

npm install

npm start

```

- Frontend
    - Open the backend path on the terminal and run the following commands
    
```bash 

npm install

ng serve

```
