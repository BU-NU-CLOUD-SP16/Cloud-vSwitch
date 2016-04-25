This file documents the vSwitch RESTful API in detail.

# HOW TO READ

Each vSwitch API call has an entry containing:

- an HTTP method(i.e. POST or GET), an URL path, and a possible ```<parameters>``` as arguments.
- A summary of the response body for a successful request.
- Reported error code.

Normally, error codes vSwitch may reponse are:
- 400 if mal-formatted.
- 404 if the api call references an object that does not exist.

# Core API Specification

## User
### user_signup
```POST /signup```   

Request body:   

```
{
    email: "<email>",
    password: "<password>",
    confirmPassword: "<confirmPassword>",
    name: "<name>",
    lastname: "<lastname>"
}
```   

This api call will create a new user, which is the first step to use Cloud vSwitch.

Authorization requirements:

+ No special access.

Possible errors:

* 409 if:
  * <name> already exists.
  * <confirmPassword> does not match <password>.
  * <email> is not email address formatted. 


### user_login
```POST /login```   

Request body:   

```
{
    email: "<email>",
    password: "<password>"
}
```   

User login. This api call allows user login and manipulate the resources in the setup cloud environment.

Authorization requirements:
* No special access.

Possible errors:
* 409 if 
  * <email> not exits.
  * <password> not match.

### user_profile

```GET /user/user_id```

Get user profile. This api call will retrieve the user profile.

Authorization requirements:
* No special access.

Possible errors:
* 404 if user not exists.

### user_update 

```PUT /user/user_id```

Update user. User use this api call to update his information.

Authorization requirements:
* No special access.

Possible errors:
* 404 if user not exists.


### show_user_organization

```GET /user/:id/organizations```   

View details about organizations that current user is in.


Authorization requirements:

* No special access.

### user_invite

```POST /invite```   

Request body:   

```
{
    email: [],
    password: "<password>"
}
```   

User invite. This api call will invite another user to join this organization.


Authorization requirements:

* No special access.

Possible errors:

* <password> not match.


## Organization

### organization_create

```POST /organization```   

Request body:   

```
{
    name: "<name>",
    ou: "<ou>",
    email: "<email>",
    country: "<country>",
    province: "<province>",
    city: "<city>"
}
```   

Organization create. 


Authorization requirements:
- No special access.

Possible errors:
- 409 if the name of this organization already exists.

### organization_add_member

```POST /organization/:id/members/:user```   

Organization add member. 

Authorization requirements:
- No special access.

### organization_delete_member

```DELETE /organization/:id/members/:user```   

Organization delete member. 

Authorization requirements:
- No special access.


### organization_delete

```DELETE /organization/:id```   
 
Organization delete. This api call will delete this organization.

Authorization requirements:
- Ownership required.

Possible errors:
- 409 if not creator of this organization.

### organization_show

```GET /organization/:id```   

View the information about this organization.

Authorization requirements:
- No special access.


### organization_update

```PUT /organization/:id```   

Request body:   

```
{
    name: "<name>",
    ou: "<ou>",
    email: "<email>",
    country: "<country>",
    province: "<province>",
    city: "<city>"
}
```   

Authorization requirements:

* Ownership of this of this organization required.

Possible errors:

* 409 if <name> already exists.


### organization_show_details

```GET /organization/:id/details```   

Authorization requirements:
* Membership of the organization is required.

Possible errors:
* 404 no details about the organization.


## Instances 

### instance_create 

```POST /instance```

Request body:

```
{
    name: "<name>"
}
```

Authorization requirements:
* No special access.

Possible errors:
* 409 if <name> already exists.

### instance_addto_organization

```POST /organization/:id/instance/:id```

Authorization requirements:
* No special access.

Possible errors:
* 409 if <name> already exists.


### instance_update

```PUT /instance/:id```

Request body:

```
{
    name: "<name>"
}
```

Authorization requirements:
* No special access.

Possible errors:
* 409 if <name> already exists.


### instance_start

```POST /instance/start```

Request body:
```
{
    id: "<id>"
}
```

Authorization requirements:
* No special access.

Possible errors:
* 404 if <id> not exists.

### instance_list 

```GET /organization/:id/instances```


Authorization requirements:
* No special access.

Possible errors:
* 404 if <id> not exists.


### instance_stop

```POST /instance/stop```

Request body:
```
{
    id: "<id>"
}
```

Authorization requirements:
* No special access.

Possible errors:
* 404 if <id> not exists.


### instance_delete
    
```DELETE /instance/:id```

Authorization requirements:
* No special access.

Possible errors:
* 404 if <id> not exists.


## Else

### image_show
```GET /images```

Authorization requirements:
* No special access.

Possible errors:
* 404 if no images exist.


### flavors_show

```GET /flavors```

Authorization requirements:
* No special access.

Possible errors:
* 404 if no exist.
