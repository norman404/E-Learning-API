// __tests__/__mocks__/LessonMock.js

const LessonMock = function (data) {
  this._id = data._id || 'mockedId'
  this.questions = data.questions || []
  Object.assign(this, data)
}

LessonMock.prototype.save = jest.fn().mockImplementation(function () {
  return Promise.resolve(this)
})

LessonMock.findById = jest.fn().mockImplementation((id) => {
  return Promise.resolve(new LessonMock({ _id: id, questions: [] }))
})

LessonMock.findByIdAndUpdate = jest.fn().mockImplementation((id, update, options) => {
  const updatedLesson = new LessonMock({ _id: id, ...update })
  return Promise.resolve(updatedLesson)
})

LessonMock.findByIdAndDelete = jest.fn().mockImplementation((id) => {
  return Promise.resolve(new LessonMock({ _id: id }))
})

module.exports = { LessonMock }
