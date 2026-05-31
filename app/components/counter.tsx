'use client'

import { useState } from "react"

export default function Counter(){
    const [count, setCount] = useState(0)

    return (
        <div>
            <h1 className="font-bold">Counter function</h1>
            <button onClick={()=>setCount(count + 1)}>+</button>
            <button onClick={()=>setCount(count - 1)}>-</button>
            <p>Value: {count}</p>
        </div>
    )

} 