// __tests__/__mocks__/CourseMock.js

const CourseMock = function (data) {
  Object.assign(this, data)
}

CourseMock.prototype.save = jest.fn().mockImplementation(function () {
  return Promise.resolve(this)
})

CourseMock.find = jest.fn().mockImplementation(() => {
  return {
    populate: jest.fn().mockImplementation(() => {
      return Promise.resolve([
        { _id: 'mockedId1', title: 'Course 1', description: 'Description 1', lessons: [] },
        { _id: 'mockedId2', title: 'Course 2', description: 'Description 2', lessons: [] }
      ])
    })
  }
})

CourseMock.findById = jest.fn().mockImplementation((id) => {
  return {
    populate: jest.fn().mockImplementation(() => {
      return Promise.resolve({ _id: id, title: 'Mock Course', description: 'Mock Description', lessons: [] })
    })
  }
})

CourseMock.findByIdAndUpdate = jest.fn().mockImplementation((id, update, options) => {
  return {
    populate: jest.fn().mockImplementation(() => {
      return Promise.resolve({ _id: id, ...update })
    })
  }
})

CourseMock.findByIdAndDelete = jest.fn().mockImplementation((id) => {
  return Promise.resolve({ _id: id, title: 'Deleted Course', description: 'This course has been deleted' })
})

module.exports = { CourseMock }
