# E-Learning API

This API provides endpoints for managing courses, lessons, and questions for an e-learning platform.

## Installation

1. Clone this repository to your local machine.
2. Install dependencies using the command `npm install`.
3. Create a `.env` file in the root directory and provide the following values:
MONGODB_URI=URL_de_tu_base_de_datos_MongoDB
PORT=3000
4. Replace `Your_MongoDB_Database_Connection_URL` with your MongoDB database connection URL.

## Usage

1. Run the application using the command `npm start`.
2. The application will be available at `http://localhost:3000`.

## API Endpoints

### Courses

- `GET /api/courses`: Get all courses.
- `GET /api/courses/:id`: Get details of a specific course.
- `POST /api/courses`: Create a new course.
- `PUT /api/courses/:id`: Update an existing course.
- `DELETE /api/courses/:id`: Delete an existing course.

### Lessons

- `GET /api/lessons/byCourse/:courseId`: Get all lessons of a specific course.
- `GET /api/lessons/:id`: Get details of a specific lesson.
- `POST /api/lessons`: Create a new lesson.
- `PUT /api/lessons/:id`: Update an existing lesson.
- `DELETE /api/lessons/:id`: Delete an existing lesson.
- `POST /api/lessons/:lessonId/take`: Take a lesson.

### Questions

- `GET /api/questions/byLesson/:lessonId`: Get all questions associated with a specific lesson.
- `GET /api/questions/:id`: Get details of a specific question.
- `POST /api/questions`: Create a new question and associate it with a lesson.
- `PUT /api/questions/:id`: Update an existing question.
- `DELETE /api/questions/:id`: Delete an existing question.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a pull request.

## Credits

This API was developed by @Norman404 (Norman Torres).


