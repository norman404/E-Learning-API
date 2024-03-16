jest.mock('mongoose')

const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../server')

afterAll(async () => {
  await mongoose.disconnect()
})

describe('API routes tests', () => {
  describe('GET /', () => {
    it('should return all courses', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
    })
  })

  describe('POST /api/courses', () => {
    it('should create a new course', async () => {
      const newCourse = { title: 'New Course', description: 'Course description' }
      const response = await request(app)
        .post('/api/courses')
        .send(newCourse)
        .expect(201)

      expect(response.body.title).toBe(newCourse.title)
    })
  })

  describe('GET /api/courses', () => {
    it('should retrieve all courses', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect(200)
      expect(Array.isArray(response.body)).toBeTruthy()
    })
  })

  describe('GET /api/courses/:id', () => {
    it('should retrieve a course by id', async () => {
      const courseId = 'someCourseId'

      const response = await request(app)
        .get(`/api/courses/${courseId}`)
        .expect(200)
      expect(response.body).toHaveProperty('_id', courseId)
    });
  });

  describe('PUT /api/courses/:id', () => {
    it('should update the course', async () => {
      const courseId = 'someCourseId'
      const courseUpdate = { title: 'Updated Course', description: 'Updated description' }

      const response = await request(app)
        .put(`/api/courses/${courseId}`)
        .send(courseUpdate)
        .expect(200)

      expect(response.body.title).toBe(courseUpdate.title)
    })
  })

  describe('DELETE /api/courses/:id', () => {
    it('should delete the course', async () => {
      const courseId = 'someCourseId'

      await request(app)
        .delete(`/api/courses/${courseId}`)
        .expect(200)
    })
  })
})