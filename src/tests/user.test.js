const request = require('supertest');
const app = require('../app')

const URL_BASE= '/users'
let TOKEN ;

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
 

test("POS -> '/URL_BASE',should return statu code 201 , res.body to be defined and res.body.firstName === user.firstName",async()=>{

    const res = await request(app)
     .post(URL_BASE) 
     .send(user)

     expect(res.status).toBe(201)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(user.firstName)

})
