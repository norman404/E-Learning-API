// __tests__/__mocks__/mongooseConfig.js

const mongoose = jest.createMockFromModule('mongoose')

mongoose.connect = jest.fn().mockResolvedValue('Conexión simulada a MongoDB')

mongoose.model = jest.fn().mockImplementation((name) => {
  switch (name) {
    case 'Course':
      const { CourseMock } = require('./CourseMock')
      return CourseMock
    case 'Lesson':
      const { LessonMock } = require('./LessonMock')
      return LessonMock
    case 'Question':
      const { QuestionMock } = require('./QuestionMock')
      return QuestionMock
    default:
      return function () {}
  }
});

module.exports = mongoose
