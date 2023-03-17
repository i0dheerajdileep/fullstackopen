import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'
function Course({courses}) {
  return (
      <div>
        <h1>Web development curriculam</h1>
      {courses.map(course =>
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )}
    </div>
  )}

export default Course
