import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [voted, setVoted] = useState(0)
    const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))
    const [mostPoints, setMostpoints] = useState(0)
    const handleRandom = () => setSelected(Math.floor(Math.random() * 6))
    const handleVote = () => {
        const copy = { ...points }
        copy[selected] += 1
        setPoints(copy)

        if (copy[selected] > mostPoints) {
            setMostpoints(copy[selected])
           setVoted(selected)
        }
    }

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                {props.anecdotes[selected]}
            </div>
            <div>
                has {points[selected]} votes
            </div>
            <div>
                <Button handleClick={handleVote} text="vote" />
                <Button handleClick={handleRandom} text="next anacdote" />
                <h1>Anacdote with most points</h1>

                {props.anecdotes[voted]}
                <div>
                    has {mostPoints} votes
                </div>
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)