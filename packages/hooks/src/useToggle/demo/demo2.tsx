import React from 'react'
import { useToggle } from "xi-hooks";

export default () => {
    const [state, { toggle, set, setLeft, setRight }] = useToggle('hello', 'world')
    
    return (
        <div>
            <p>Effects:{state}</p>

            <p>
                <button 
                    type="button"
                    onClick={toggle}
                >
                    Toggle
                </button>

                 <button 
                    type="button"
                    onClick={()=>{
                       set('hello') 
                    }}
                    style={{margin: '0 8px'}}
                >
                    set
                </button>
                <button 
                    type="button"
                    onClick={setLeft}
                >
                    setLeft
                </button>
                 <button 
                    type="button"
                    onClick={setRight}
                    style={{margin: '0 8px'}}
                >
                    setRight
                </button>
            </p>
        </div>
    )

}