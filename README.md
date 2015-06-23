# HappyAuth

Application for authentication and authorization

## Physical tiers and deployment ##

OAuth server
Subdomain name: auth.example.com

REST server
Subdomain name: api.example.com

## Translations ##

+ [Español](/assets/translations/README_es_CO.md) - [Documentación](/assets/docs/ES/)

## Folder structure ##

+ assets | Here are stored the files relevant to API operation
    * docs | Documentation of every entity, router, imports, package or libraries that was created by us.

+ models | Data persistence layer (aka entities | databases documents )

+ routes | Contains the logic, procedures and functions

//Note: server.js  Web service entry point ( executable )

## General conventions ##

### Coding ###

The names of the folders and files are going lowercase
Variables: camelCase, varUser, CONSTANTAUTH
Classes:
Methods:
Functions:

### Database ###


### URL endpoints ###

+ Every endpoint in lowercase and the noun in plural ( nouns )

+ prifix: /v0 (Last release version )

> /v0/entity/nouns

Example:

> + [GET] /v1/users/1
> + [POST] /v1/users/1
> + [PUT] /v1/users/1
> + [DELETE] /v1/users/1

### Documentation ###

[Users](/assets/users.md)


## Allowed HTTP methods ##

| Methods        | description                              |
| ------------- | ----------------------------------------- |
| `GET`         | Get a resource                            |
| `POST`        | Create a resource                         |
| `PUT`         | Update a resource / Disable               |
| `DELETE`      | Delete a resource                         |


## Status codes / Allowed HTTP response ##

| Methods        | description                                                  |
| ------------- | ------------------------------------------------------------- |
| `200`         | Success - OK                                                  |
| `201`         | Success - Created new resource                                |
| `204`         | Success - There is no content to answer                       |
| `400`         | Bad request - your request can not be assessed                |
| `401`         | Unauthorized - user in this authenticated for this feature    |
| `404`         | Not found - Resource doesn't exists                           |
| `422`         | unprocessable entity - validation errors                      |
| `429`         | Exceeded usage limits, try later                              |
| `500`         | Server error                                                  |
| `503`         | Service not available                                         |
