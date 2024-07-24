import React from 'react'
import './App.css'

import InvertButton from './Components/Invert Button/Invert'
import MainComponent from './Components/MainComponent/MainComponent.jsx'
import { PostProvider } from './Hook/usePosts'

function App() {
  return (
    <>

      <PostProvider>
        <MainComponent />
      </PostProvider>

    </>
  )
}

export default App
