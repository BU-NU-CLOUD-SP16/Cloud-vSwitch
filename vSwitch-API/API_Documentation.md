Signup
----
  _The user can signup using his/her basic information such as email id and should create a new password._

* **URL**

   _'/signup/'_

* **http Request Method:**
  
   _|'POST'|_ `
  
*  **URL Parameters**
  
   {'Token'<br/>
    'user ID'<br/>
    'user'}

* **Data Parameters**

   {'user'}

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ Successfully signed up }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

Login
----
 _The user who has an account can login to the vSwitch portal using his email address and password._
 
 * **URL**

  _'/login'_

* **http Request Method:**
  
  _|'POST'|_
  
*  **URL Parameters**
 
   {'Token'<br/>
    'user ID'<br/>
    'user'}

* **Data Parameters**

*   {'user'}

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Successfully logged in }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong email or password" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`


GET User
----
  
  _The get function acquires the user information to connect to the vSwitchUI App._

* **URL**

  _'/user/' + id_

* **Method:**
  
  _|'GET'|_

  
*  **URL Params**
 
   {`id`}

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Retrieve user data using id }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`
    
UPDATE User
----
    _The get function acquires the user information to connect to the vSwitchUI App._

* **URL**

  _'/user/' + userid_

* **http Request Method:**
  
  _|'PUT'|_

*  **URL Parameters**
 
   {`userid`}

*  **Data Parameters**

    {`user`}
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "Profile updated" }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`


* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
        
ADD Organization
----
  
  _This service adds an organization to your vSwitch Portal_

* **URL**

  _'/organization'_

* **Method:**
  
  _|'POST'|_

  `GET` | `POST` | `DELETE` | `PUT`
  

*  **Data Params**

    `org`
    
* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ Organization data }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`


* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
               
Organization Adder
----
  
  _This service adds the owner to the organization in your vSwitch Portal_

* **URL**

  _'/organization/ + org.id + /members/ + userid'_

* **Method:**
  
  _|'POST'|_

  `GET` | `POST` | `DELETE` | `PUT`
  
  
*  **URL Params**  
   *org.id
   *userid
   

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ "Organization added successfully" }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`


* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

List Organization 
----
  
  _This service adds the owner to the organization in your vSwitch Portal_

* **URL**

  _'/user/ + userid + /organizations'_

* **Method:**
  
  _|'GET'|_

  `GET` | `POST` | `DELETE` | `PUT`
  
  
*  **URL Params**  
   *userid
   

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ Gets Organization data of a particular user and lists them }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`


* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
  
GET Organization
----
  
  _This service gets or retrieves organization data through id_

* **URL**

  _'/organization/ + id'_

* **Method:**
  
  _|'GET'|_

  `GET` | `POST` | `DELETE` | `PUT`
  
  
*  **URL Params**  
   *id
   
   

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ Gets organization }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`


* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
  
UPDATE Organization
----
  
  _This service gets or retrieves organization data through id_

* **URL**

  _'/organization/ + id'_

* **Method:**
  
  _|'PUT'|_

  `GET` | `POST` | `DELETE` | `PUT`
  
  
*  **URL Params**  
   *id

*  **Data Params**  
   *org   
   

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ Response : "Organization updated" }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`


* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>   
  
DELETE Organization
----
  
  _This function checks deletes an organization from your vSwitch portal_



* **Method:**
  
  _|'PUT'|_

  `GET` | `POST` | `DELETE` | `PUT`

  
* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ Response : "Organization updated" }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`


* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>   
  
  
  
