import { useState, useMemo, useCallback } from 'react'
import Circle from './Circle.jsx'
import MemoPoints from './MemoPoints.jsx'
import Link from './Link.jsx'
import Axes from './Axes.jsx'
import useScales from '../hooks/useScales.js'
import useSearchHandler from '../hooks/useSearchHandler.js'


export default function Plot({data, x, y, idvar, drillvars}) {
  // state
  const [selected, setSelected] = useState(null)
  const [hover, setHover] = useState(null)
  const {xScale, yScale, viewbox} = useScales(data, x, y)

  const circleCommonProps = { idvar, x, y, xScale, yScale, 
    onHover: setHover, onClick: setSelected}
  const drillRecord = hover ?? selected

  // search
  const searchHandler = useSearchHandler(data, setHover, () => setSelected(hover))

  // config 
  const r = 6 
  const rSelected = 8

  //return
  return(
    <>
      <div>
        <input placeholder="Search..." {...searchHandler}/>
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
          <MemoPoints data={data} fill="black" r={r} {...circleCommonProps} />
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
