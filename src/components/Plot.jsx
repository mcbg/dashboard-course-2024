import { useState, memo, useMemo, useCallback } from 'react'
import { schemeAccent, scaleOrdinal, scaleSequential, scaleLinear, scaleBand, extent, interpolateViridis, schemePastel1} from 'd3'
import Circle from './Circle.jsx'
import Link from './Link.jsx'
import Axes from './Axes.jsx'

// add a margin of `p` percent to the result of d3's extent function
function addMargin(x, p) {
  const d = (x[1] - x[0]) * p
  return([x[0] - d, x[1] + d])
}

// MemoPoints is only redrawn is one of its props are changed
// This means 
const MemoPoints = memo(({data, idvar, x, y, r, xScale, yScale, onHover, onClick}) => {
  console.log('========= POINTS REDRAW ==========')
  return(
  <g>
    {
      data.map(record =>
        <Circle key={record[idvar]} record={record} r={r}
         fill="black" idvar={idvar} x={x} y={y} xScale={xScale} yScale={yScale} 
         onHover={onHover} onClick={onClick}/>
      )
    }
  </g>
  )
})


// Scales are only computed if data, x, or y are changed
const useScales = (data, x, y) => {
  const scales = useMemo(() => {
    console.log('scales computed')
    // config
    const margin = { x: 40, y: 40 }
    const view = { x: 600, y: 500 }
    const padding = 0.05 // 5%
    const viewbox = `0 0 ${view.x} ${view.y}`

    // Scales
    const xScale = scaleLinear()
      .domain(addMargin(extent(data.map(record => record[x])), padding))
      .range([margin.x, view.x])

    const yScale = scaleLinear()
      .domain(addMargin(extent(data.map(record => record[y])), padding))
      .range([view.y - margin.y, 0])

    return({xScale, yScale, viewbox})
  }, [data, x, y])

  return scales 
}

const useAction = () => {
}

export default function Plot({data, x, y, idvar, drillvars}) {
  // state
  const [selected, setSelected] = useState(null)
  const [hover, setHover] = useState(null)
  const {xScale, yScale, viewbox} = useScales(data, x, y)

  const circleCommonProps = { idvar, x, y, xScale, yScale, 
    onHover: setHover, onClick: setSelected}
  const drillRecord = hover ?? selected

  // config 
  const r = 6 
  const rSelected = 8

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
    setHover(candidate)
  }
  
  const searchKeyPress = e => {
    if (e.key === 'Enter') {
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
        <g onMouseLeave = {() => setHover(null)}>
          <MemoPoints data={data} r={r} {...circleCommonProps} />
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
