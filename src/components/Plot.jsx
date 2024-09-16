import { useState, useCallback } from 'react'
import { schemeAccent, scaleOrdinal, scaleSequential, scaleLinear, scaleBand, extent, interpolateViridis, schemePastel1} from 'd3'
import Axes from './Axes.jsx'

// add a margin of `p` percent to the result of d3's extent function
function addMargin(x, p) {
  const d = (x[1] - x[0]) * p
  return([x[0] - d, x[1] + d])
}

function Link({label, url}) {
  return(
    <>
      { url ?
        <a className="drill__button" href={url}>{label}</a> :
        <br />
      }
    </>
  )
}
function Circle({record, r, fill, idvar, x, y, xScale, yScale, onHover, onClick}) {
  return(
    <>
      {
        record &&
          <circle cx={xScale(record[x])} cy={yScale(record[y])}
            onClick={() => onClick(record[idvar])}
            r={r} fill={fill} />
      }
    </>
  )
}

export default function Plot({data, x, y, idvar}) {
  // state
  const [selected, setSelected] = useState(null)
  const [hover, setHover] = useState(null)
  
  const onClick = id => setSelected(data.find(x => x[idvar] === id))
  const onHover = id => setHover(data.find(x => x[idvar] === id))
  const margin = { x: 40, y: 40 }
  const view = { x: 600, y: 500 }
  const viewbox = `0 0 ${view.x} ${view.y}`
  const padding = 0.05 // 5%
  const r = 6 
  const rSelected = 8

  // Scales
  const xScale = scaleLinear()
    .domain(addMargin(extent(data.map(record => record[x])), padding))
    .range([margin.x, view.x])

  const yScale = scaleLinear()
    .domain(addMargin(extent(data.map(record => record[y])), padding))
    .range([view.y - margin.y, 0])

  const circleCommonProps = { idvar, x, y, xScale, yScale, onHover, onClick}
  const drillvars = ['EntrezGeneSymbol', 'TargetFullName']
  const drillRecord = hover ?? selected

  // search
  const updateSearch = e => {
    const term = e.target.value
      .toLowerCase()
    const candidate = data.find(record => {
      const s = drillvars.map(vr => record[vr])
        .join('')
        .toLowerCase()
      return(
        s.includes(term)
      )
    })
    console.log({candidate})
    setHover(candidate)
  }
  
  const searchKeyPress = e => {
    if (e.key === 'Enter') {
      console.log('Hi')
      setSelected(hover)
    }
  }

  //return
  return(
    <>
      <div>
        <input onChange={updateSearch} onKeyDown={searchKeyPress} placeholder="Search..." />
        <br/>
        {
          drillvars.map(vr =>
            <p key={vr}>{vr}: <b>{drillRecord ? drillRecord[vr] : '-'}</b></p>)
        }
      <Link label="UniProt" url={drillRecord ? drillRecord['UniProt'] : null }/>
      </div>
      <p style={{marginTop: "1rem"}}>{y}</p>
      <svg width = "100%" viewBox={viewbox}>
        <Axes xScale={xScale} yScale={yScale} />
        <g onMouseLeave = {() => onHover(null)}>
          <g>
            {
              data.map(record => 
                <circle key={record[idvar]} cx={xScale(record[x])} cy={yScale(record[y])}
                  onClick={() => onClick(record[idvar])}
                  onMouseEnter={() => onHover(record[idvar])}
                  r={r}
                  fill="black"/>
              )
            }
          </g>
          <g>
           <Circle record={hover} r={rSelected} fill="orange" {...circleCommonProps}/>
           <Circle record={selected} r={rSelected} fill="red" {...circleCommonProps}/>
          </g>
        </g> 
    </svg>
      <p style={{textAlign: "right"}}>{x}</p>
  </>
  )
}
