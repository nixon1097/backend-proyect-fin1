const request = require('supertest');
const app = require('../app')

const URL_BASE= '/users'

const user={
    firstName:"nixon",
    lastName:"Parra",
    email:"nixonandrewparra@gmail.com",
    password: "1234nixon",
    phone:"+573026898020"
}


test("POS -> '/URL_BASE',should return statu code 201 , res.body to be defined and res.body.firstName === user.firstName",async()=>{

    const res = await request(app)
     .post(URL_BASE) 
     .send(user)

     expect(res.status).toBe(201)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(user.firstName)

})
