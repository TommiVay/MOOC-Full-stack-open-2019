import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = (props) => {
    if (props.all.length === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="good" value={props.good} />
                    <Statistic text="neutral" value={props.neutral} />
                    <Statistic text="bad" value={props.bad} />
                    <Statistic text="all" value={props.all.length} />
                    <Statistic text="average" value={props.average()} />
                    <Statistic text="positive" value={props.positive()} />
                </tbody>
           </table>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr><td>{text}</td>
        <td>{value}</td></tr>

    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState([])



    const handleGood = () => {
        setGood(good + 1)
        setAll(all.concat(1))
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all.concat(0))
    }

    const handleBad = () => {
        setBad(bad + 1)
        setAll(all.concat(-1))
    }

    const average = () => {
        if (all.length === 0) {
            return 0
        }
        let sum = 0
        for (let i = 0; i < all.length; i++) {
            sum += parseInt(all[i], 10)
        }
        return sum / all.length
    }
    console.log(all)

    const positive = () => {
        if (good === 0) {
            return 0
        }

        let pos = good / all.length * 100
        return pos + '%'
    }
    return (
        <div>
            <h1>give feedback</h1>
            <Button
                handleClick={handleGood}
                text='good'
            />
            <Button
                handleClick={handleNeutral}
                text='neutral'
            />
            <Button
                handleClick={handleBad}
                text='bad'
            />
            <h1>statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral}
                all={all} average={average} positive={positive} />
        </div>
    )

}

ReactDOM.render(<App />,
    document.getElementById('root')
)