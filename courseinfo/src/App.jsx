
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
  const init = 0
  const total = parts.reduce((acc, curr) => acc+curr.exercises, init)
  return (
    <div>
      {parts.map(pt => <Part part={pt} key={pt.id}/>)}
      <strong>total of {total} excercises</strong>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div>
    {courses.map(course => <Course course={course} key={course.id}/>)}
  </div>
  )
}

export default App