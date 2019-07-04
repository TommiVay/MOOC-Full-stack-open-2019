import React from 'react';


const Course = ({ courses }) => {
    return (
        courses.map(course =>
            <div key={course.name}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )
    )
}

const Header = props =>
    <h1>{props.course}</h1>

const Total = props => {
    const total = props.parts.reduce((sum, exerc) => sum + exerc.exercises, 0)

    return <p><b>total of {total} exercises</b></p>
}

const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
    return (
        <div>
            {props.parts.map(p => <Part key={p.id} part={p} />)}
        </div>
    )
}

export default Course