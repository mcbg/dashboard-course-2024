import { useState, useEffect, useMemo, memo, useCallback} from 'react'
import Plot from './components/Plot.jsx'

// json hook
function useJSON(url) {
  const [data, setData] = useState() 
  const [loaded, setLoaded] = useState(false) 

  useEffect(() => {
    fetch(url)
      .then(response => {
        response
          .json()
          .then(x => {
            setData(x)
            setLoaded(true)
          })
      })
  }, [url])
  return({loaded, data})
}

export function App ({jsonfile, ...rest}) {
  const {loaded, data} = useJSON(jsonfile)
  return(
    <>
    { loaded
      ? <Plot data={data} {...rest}/>
      : <p className="loading-text">Loading...</p>
    }
    </>
  )
}


function Loading() {
}



export default App
