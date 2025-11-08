# Api List 

authRouter
- POST /Signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST/request/sent/interested/:userId
- POST/request/send/ignored/:userId 
- POST/request/review/accepted/:requestID
- Post/request/review/rejected/:requestID

userRouter
- GET/user/Connections
- GET/user/ request/received
- GET/user/feed- gets you the profile of other users


Status: ignore interested , accepted , rejected


Patch pasword change 

1. Chek if user is logged in or not ...
2. current passoward and new password do 
3. if current password --- correct if yes (compare using bycrypt )
    3.1 -- user form request use 
        -- update password field (by converting into hash)

