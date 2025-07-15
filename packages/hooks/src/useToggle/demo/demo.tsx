import React from 'react'
import { useToggle } from "xi-hooks";

export default () => {
    const [state, { toggle, set, setLeft, setRight }] = useToggle()
    
    return (
        <div>
            <p>Effects:{`${state}`}</p>

            <p>
                <button 
                    type="button"
                    onClick={toggle}
                >
                    Toggle
                </button>

                 <button 
                    type="button"
                    onClick={setLeft}
                    style={{margin: '0 8px'}}
                >
                    setLeft
                </button>

                 <button 
                    type="button"
                    onClick={setRight}
                >
                    setRight
                </button>
            </p>
        </div>
    )

}