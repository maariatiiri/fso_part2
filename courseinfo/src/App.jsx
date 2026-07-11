
const Course = (props) => {
  const {course} = props
  return (
  <div key={course.id}>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
  </div>
)
}

const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => {
  const {parts} = props
  return (
    <div>
      {parts.map(pt => <Part part={pt} key={pt.id}/>)}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>




const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App