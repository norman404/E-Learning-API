// __tests__/__mocks__/QuestionMock.js

const QuestionMock = function (data) {
  this.questions = []
  Object.assign(this, data)
};

QuestionMock.prototype.save = jest.fn().mockImplementation(function () {
  return Promise.resolve(this)
})

QuestionMock.findById = jest.fn().mockImplementation((id) => {
  return Promise.resolve({ _id: id, title: 'Mock Lesson', content: 'Mock Content', approvalThreshold: 80 })
})

QuestionMock.findByIdAndUpdate = jest.fn().mockImplementation((id, update, options) => {
  return Promise.resolve({ _id: id, ...update })
})

QuestionMock.findByIdAndDelete = jest.fn().mockImplementation((id) => {
  return Promise.resolve({ _id: id })
})

QuestionMock.find = jest.fn().mockImplementation((query) => {
  return Promise.resolve([
    { _id: 'mockId1', content: 'Mock Question 1', lesson: query.lesson },
    { _id: 'mockId2', content: 'Mock Question 2', lesson: query.lesson }
  ])
})

module.exports = { QuestionMock }
