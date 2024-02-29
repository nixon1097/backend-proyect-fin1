require('../models')
const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');

const URL_BASE_USERS='/users'
const  URL_BASE='/products'
let TOKEN
let porductId
let category
let product



beforeAll(async()=>{
    // clogin de usuario 
    const user ={
      email:"nixonandrewparra@gmail.com",
      password: "1234nixon"
  }
   const res= await request(app)
   .post(`${URL_BASE_USERS}/login`)
   .send(user)
  
  TOKEN=res.body.token
  // creacion de la categoria 
   category= await Category.create({name:'category test'})

   product={
    title: "lorem20",
    description: "lorenn200",
    price: "20.5",
    categoryId: category.id
}

   
})
test("POST -> '/URL_BASE',should return status 201, res.body  and to be defined , res.body.title=== product.title  ",async()=>{
 const  res = await request(app)
 .post(URL_BASE)
 .send(product)
 .set("Authorization", `Bearer ${TOKEN}`)
  
  porductId = res.body.id


 expect(res.status).toBe(201)
 expect(res.body).toBeDefined()
 expect(res.body.title).toBe(product.title)
})

test("GET -> 'URL_BASE', should return status 200, res.body to be defined , res.body.length===1 , res.body.category.length ===1 and to be defined",async()=>{
   
  const res = await request(app)
  .get(URL_BASE)

  expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body).toHaveLength(1)

expect(res.body[0].category).toBeDefined()
expect(res.body[0].category.id).toBe(category.id)



})


test("GET -> 'URL_BASE', should return status code 200, res.body to be defined, and res.body.length ==== 1, res.body[0].categoryId === category.id , and res.body[0].category.id === category.id", async () => {
    const res = await request(app)
      .get(`${URL_BASE}?category=${category.id}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].categoryId).toBeDefined()
    expect(res.body[0].categoryId).toBe(category.id)
  
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
  
  
  })
test("GET ONE -> '/URL_BASE/:id', shoudl return status 200, res.body to be defined, res.body.title=== product.title",async()=>{

    const res= await request(app)
    .get(`${URL_BASE}/${porductId}`)
 

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("PUT ->'/URL_BASE/:id', should return status 200, res.body to be Defined and res.body.title===send('text')", async () => {   
    const res = await request(app)
    .put(`${URL_BASE}/${porductId}`)
    .send({title:'audifonos B'})
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe('audifonos B')
})

test("DELETE ->'/url_base/:id', should return 204",async()=>{
    const res = await request(app)
    .delete(`${URL_BASE}/${porductId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
    await category.destroy()
})