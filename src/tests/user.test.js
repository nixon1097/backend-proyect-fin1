const request = require('supertest');
const app = require('../app')

const URL_BASE= '/users'
let TOKEN ;
let userId

const user={
    firstName:"nixon",
    lastName:"Parra",
    email:"nixonandrewparra2@gmail.com",
    password: "1234nixon",
    phone:"+573026898020"
}

beforeAll(async  () => {
    const user ={
        email:"nixonandrewparra@gmail.com",
        password: "1234nixon"
    }
    const res= await request(app)
     .post(`${URL_BASE}/login`)
     .send(user)
    
    TOKEN=res.body.token
    
})

test("GET -> 'URL_BASE', should status code 200, res.body to be defined and res.body.length === 1",async()=>{
    const res= await request(app)
      .get(URL_BASE)
      .set('Authorization', `Bearer ${TOKEN}`)
          
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body.length).toBe(1)

})
 

test("POSt -> '/URL_BASE',should return statu code 201 , res.body to be defined and res.body.firstName === user.firstName",async()=>{

    const res = await request(app)
     .post(URL_BASE) 
     .send(user)
     userId=res.body.id

     expect(res.status).toBe(201)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(user.firstName)

})

test("PUT -> '/URL_BASE/:id',should return statu code 200 , res.body to be defined and res.body.firstName === send('text')",async()=>{

    const res = await request(app)
     .put(`${URL_BASE}/${userId}`) 
     .send({firstName:"fernando"})
     .set('Authorization', `Bearer ${TOKEN}`)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()

     expect(res.body.firstName).toBe("fernando")

})

test("POST -> '/URL_BASE/login',return status code 200,to be res.body defined ,res.body.user.email === user.email and res.body.token to be defined",async()=>{

  const userlogin={
    email:"nixonandrewparra2@gmail.com",
    password: "1234nixon",

  }

  const res= await request(app)
   .post(`${URL_BASE}/login`)
   .send(userlogin)
   TOKEN=res.body.token


   expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.user.email).toBe(userlogin.email)

     expect(res.body.token).toBeDefined()

})
test("POST -> 'URL_BASE/login', should return status code 401", async () => {
    const userLogin = {
        email:"nixonandrewparra2@gmail.com",
      password: 'invalid password'
    }
  
    const res = await request(app)
      .post(`${URL_BASE}/login`)
      .send(userLogin)
  
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
  })




  test("DELETE -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${URL_BASE}/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.statusCode).toBe(204)
  })