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

   {'user'}

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

  
*  **URL Parameters**
 
   {`id`}

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Retrieve user data using id }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`
    
UPDATE User
----

  _This function updates the profile information of the user_

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
        
ADD Organization
----
  
  _This service adds an organization to your vSwitch Portal_

* **URL**

  _'/organization'_

* **http Request Method:**
  
  _|'POST'|_

*  **Data Parameters**

    {`org`}
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Organization data }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`
               
Organization Adder
----
  _This service adds the owner to the organization in your vSwitch Portal_

* **URL**

  _'/organization/ + org.id + /members/ + userid'_

* **http Request Method:**
  
  _|'POST'|_
  
*  **URL Parameters**

   {'org.id'<br/>
    'userid'}
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "Organization added successfully" }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`

List Organization 
----
  _This service adds the owner to the organization in your vSwitch Portal_

* **URL**

  _'/user/ + userid + /organizations'_

* **http Request Method:**
  
  _|'GET'|_
  
*  **URL Parameters**
  
   {'userid'}
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Gets Organization data of a particular user and lists them }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`
  
GET Organization
----
  _This service gets or retrieves organization data through id_

* **URL**

  _'/organization/ + id'_

* **http Request Method:**
  
  _|'GET'|_
  
*  **URL Parameters**

   {'id'}
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ Gets organization }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`
  
UPDATE Organization
----
  _This service gets or retrieves organization data through id_

* **URL**

  _'/organization/ + id'_

* **http Request Method:**
  
  _|'PUT'|_
  
*  **URL Parameters**  
   {'id'}

*  **Data Params**  
   {'org'}   
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Response : "Organization updated" }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`
  
DELETE Organization
----
  _This function deletes an organization from your vSwitch portal_
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Permision denied", "You are not the owner" }`

DELETE Organization Helper Function 
----
  _This function sends a http request to delete an organization from your vSwitch portal_

* **http Request Method:**
  
  _|'DELETE'|_
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Response : "Organization deleted successfully" }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "There was an error" }`

  
  
  
