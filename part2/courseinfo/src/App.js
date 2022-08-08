const Header = ({ course }) => (
  <h1>
    {course.name}
  </h1>
)

const Part = ({name, exercise}) => (
  <p>
    {name} {exercise}
  </p>
)

const Content = ({course}) => (
  <div>
    <Part name={course.parts[0].name} exercise={course.parts[0].exercises} />
    <Part name={course.parts[1].name} exercise={course.parts[1].exercises} />
    <Part name={course.parts[2].name} exercise={course.parts[2].exercises} />
  </div>
)

const Total = ({course}) => (
  <p>Number of exercise {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
)

const App = () => {

  // EXERCISE 1.5
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App