# SWAPI API Docs

## Clone

    git clone

## Create .env file

```sh
    cp .env.example .env
```

## Install

```sh
    yarn
```

or

```sh
    npm install
```

## Run the app

```sh
  yarn start
```

or

```sh
    npm run start
```

# REST API

The REST API to the example app is described below.

## Get list of Movie

### Request

`GET /api/v1/movie`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/v1/movie/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        success:true,
        message:successful,
        data:{
            count:number,
            next:string,
            prev:string,
            result:[
                {
                    title:sting,
                    opening_crawl:string,
                    release_date:string,
                    commentCount:number
                }
            ]
        }
    }

### You Can Sort by passing the following parameter as query strings

| Key   | Value        |
| ----- | ------------ |
| sort  | release_date |
| order | asc, desc    |

## Get List Of Character For a movie

### Request

`GET /api/v1/movie/:id/character`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/v1/movie/1/character

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        success:true,
        message:successful,
        data:{
            count:number,
            next:string,
            prev:string,
            totalHeightInCm: 2095,
            totalHeightInFeet: 68feet 9inches,
            result:[
                {
                    name": "Luke Skywalker",
                    "height": "172",
                    "mass": "77",
                    "hair_color": "blond",
                    "skin_color": "fair",
                    "eye_color": "blue",
                    "birth_year": "19BBY",
                    "gender": "male",
                }
            ]
        }
    }

### You Can Sort by passing the following parameter as query strings

| Key   | Value                |
| ----- | -------------------- |
| sort  | name, gender, height |
| order | asc, desc            |

### You Can Also Filter by passing the following parameter as query strings

| Key    | Value                              |
| ------ | ---------------------------------- |
| gender | male, female, and any other gender |

## Create Anonymous comment for a movie

### Request

`POST /api/v1/movie/:id/comment`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/v1/movie/1/comment

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        "success": true,
        "message": "Request Successful",
        "data": {
            "comment": "jvhlksfigukhdjlfgisdfksd",
            "movieId": "2",
            "commenterIpAddress": "::1",
            "id": 5,
            "created_at": "2021-11-10T02:01:50.118Z"
    }

}

## Get Anonymous comment for a movie in reverse chronological order

### Request

`GET /api/v1/movie/:id/comment`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/v1/movie/1/comment

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
    "success": true,
    "message": "Request Successful",
    "data": [
        {
            "id": 5,
            "movieId": 2,
            "comment": "jvhlksfigukhdjlfgisdfksd",
            "commenterIpAddress": "::1",
            "created_at": "2021-11-10T02:01:50.118Z"
        },
        {
            "id": 4,
            "movieId": 2,
            "comment": "jvhlksfigukhdjlfgisdfksd",
            "commenterIpAddress": "::1",
            "created_at": "2021-11-10T01:04:25.861Z"
        },
        {
            "id": 3,
            "movieId": 2,
            "comment": "jvhlksfigukhdjlfgisdfksd",
            "commenterIpAddress": "::1",
            "created_at": "2021-11-10T01:04:24.467Z"
        },
        {
            "id": 2,
            "movieId": 2,
            "comment": "jvhlksfigukhdjlfgisdfksd",
            "commenterIpAddress": "::1",
            "created_at": "2021-11-10T01:04:22.315Z"
        },
        {
            "id": 1,
            "movieId": 2,
            "comment": "jvhlksfigukhdjlfgisdfksd",
            "commenterIpAddress": "::1",
            "created_at": "2021-11-10T01:03:59.653Z"
        }
    ]

}

### You Can Sort by passing the following parameter as query strings

| Key   | Value                |
| ----- | -------------------- |
| sort  | name, gender, height |
| order | asc, desc            |

### You Can Also Filter by passing the following parameter as query strings

| Key    | Value                              |
| ------ | ---------------------------------- |
| gender | male, female, and any other gender |
