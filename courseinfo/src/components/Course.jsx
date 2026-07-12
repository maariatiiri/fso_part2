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

export default Course