jest.mock('mongoose')

const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../server')

afterAll(async () => {
  await mongoose.disconnect();
});

describe('API routes tests', () => {
  describe('GET /api/lessons/:id', () => {
    it('should return a specific lesson by ID', async () => {
      const response = await request(app).get('/api/lessons/some-lesson-id')
      expect(response.statusCode).toBe(200)
    })
  })

  describe('POST /api/lessons', () => {
    it('should create a new lesson', async () => {
      const newLesson = {
        courseId: 'some-course-id',
        title: 'Lección de pruebas',
        content: 'Esta es una lección de prueba',
        approvalThreshold: 80
      }

      const response = await request(app)
        .post('/api/lessons')
        .send(newLesson)
        .expect(201)

      expect(response.body.title).toBe(newLesson.title)
      expect(response.body.content).toBe(newLesson.content)
    })
  })

  describe('PUT /api/lessons/:id', () => {
    it('should update an existing lesson', async () => {
      const lessonId = 'mockedLessonId'
      const updatedLessonData = {
        title: 'Updated Lesson Title',
        content: 'Updated content here',
        approvalThreshold: 85
      };
  
      const response = await request(app)
        .put(`/api/lessons/${lessonId}`)
        .send(updatedLessonData)
        .expect(200)
  
      expect(response.body._id).toBe(lessonId)
      expect(response.body.title).toBe(updatedLessonData.title)
      expect(response.body.content).toBe(updatedLessonData.content)
      expect(response.body.approvalThreshold).toBe(updatedLessonData.approvalThreshold)
    })
  })
  
  describe('DELETE /api/lessons/:id', () => {
    it('should delete an existing lesson', async () => {
      const lessonId = 'mockedLessonIdToDelete';
  
      const response = await request(app)
        .delete(`/api/lessons/${lessonId}`)
        .expect(200)
  
      expect(response.body.message).toEqual(expect.any(String))
    })
  })
})
