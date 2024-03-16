jest.mock('mongoose')

const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../server')

afterAll(async () => {
  await mongoose.disconnect()
})

describe('Question Controller Tests', () => {
  describe('POST /api/questions', () => {
    it('should create a new question', async () => {
      const newQuestion = {
        lessonId: 'some-lesson-id',
        content: 'What is Jest?',
        type: 'choice',
        options: ['Testing library', 'JavaScript framework'],
        correctAnswers: ['Testing library'],
        score: 5
      }

      const response = await request(app)
        .post('/api/questions')
        .send(newQuestion)

      expect(response.statusCode).toBe(201)
      expect(response.body.content).toBe(newQuestion.content)
    })
  })

  describe('GET /api/questions/byLesson/:lessonId', () => {
    it('should get all questions for a specific lesson', async () => {
      const lessonId = 'some-lesson-id'
      const response = await request(app).get(`/api/questions/byLesson/${lessonId}`)

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body)).toBeTruthy()
    })
  })

  describe('GET /api/questions/:id', () => {
    it('should get a specific question by ID', async () => {
      const questionId = 'some-question-id'
      const response = await request(app).get(`/api/questions/${questionId}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('_id', questionId)
    })
  })

  describe('PUT /api/questions/:id', () => {
    it('should update a specific question', async () => {
      const questionId = 'some-question-id'
      const updatedData = { content: 'Updated question content' }

      const response = await request(app)
        .put(`/api/questions/${questionId}`)
        .send(updatedData)

      expect(response.statusCode).toBe(200)
      expect(response.body.content).toBe(updatedData.content)
    })
  })

  describe('DELETE /api/questions/:id', () => {
    it('should delete a specific question', async () => {
      const questionId = 'some-question-id'

      const response = await request(app)
        .delete(`/api/questions/${questionId}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toContain('successfully')
    })
  })
})
