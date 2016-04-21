This file documents the vSwitch RESTful API in detail.

# HOW TO READ

Each vSwitch API call has an entry containing:

- an HTTP method(i.e. POST or GET) and URL path
- A summary of the response body for a successful request.
- Reported error code.

Normally, error codes vSwitch may reponse are:
- 404
- 402


# Core API Specification

## User

### User signup

```POST /signup```   

Request body:   

```
{
    email: "...",
    password: "...",
    confirmPassword: "...",
    name: "...",
    lastname: "..."
}
```   

Authorzation requirements:
-
-

Possible errors:
-
-


## ...
