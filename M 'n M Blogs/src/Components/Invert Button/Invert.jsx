import React, { useEffect, useState } from "react";
import './Invert.css';

export default function InvertButton(){
    const [isDark, setIsDark] = useState(false);
    
    useEffect(()=>{
        document.documentElement.classList.toggle("dark-mode"); //will be applied to the whole class list, will toggle the whole class list
    }, [isDark])
    
    
    return(
        <>
            <button className="btn-dark-mode" onClick={() => { setIsDark (!isDark) } }> {isDark ? "☀️" : "🌙"} </button>
        </>
    )
}
