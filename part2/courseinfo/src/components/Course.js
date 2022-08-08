
// 完成练习2.5
// 将组件从App.js中提取出来，组成单独的模块

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({ course }) => {
    const parts = course.parts
    return(
        parts.map( part => <Part key={part.id} part={part} /> )
    )
}

const Part = ({ part }) => (<p>{part.name} {part.exercises}</p>) 


// 练习2.2 
// 输出课程练习数的总和（利用的是循环的方式来实现）

// const Total = ({ course }) => {
//     const parts = course.parts
//     let sum = 0
//     for (let x = 0; x < parts.length; x++ ){
//         sum = sum + parts[x].exercises
//     }
//     return(
//         <p><b>total of {sum} exercises</b></p>
//     )
// }


// 练习2.3
// 输出课程练习数的总和 （利用reduce函数）
const Total = ({ course }) => {
    const parts = course.parts
    const sum = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default Course