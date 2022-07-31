const Header = ({ course }) => (
  <h1>
    {course}
  </h1>
)

const Part = ({part, exercise}) => (
  <p>
    {part} {exercise}
  </p>
)

const Content = ({courses}) => (
  <div>
    <Part part={courses[0].part} exercise={courses[0].exercise} />
    <Part part={courses[1].part} exercise={courses[1].exercise} />
    <Part part={courses[2].part} exercise={courses[2].exercise} />
  </div>
)

const Total = ({courses}) => (
  <p>Number of exercise {courses[0].exercise + courses[1].exercise + courses[2].exercise}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  const courses = [
    {
      part: 'Fundamentals of React',
      exercise: 10
    },
    {
      part: 'Using props to pass data',
      exercise: 7
    },
    {
      part: 'State of a component',
      exercise: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total courses={courses} />
    </div>
  )
}

export default App