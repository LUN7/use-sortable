import React from 'react'

import { useMyHook } from 'use-sortable'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
