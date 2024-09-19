import { memo } from 'react'
import Circle from './Circle.jsx'
// MemoPoints is only redrawn is one of its props are changed
// This means 
const MemoPoints = memo(({data, fill, r, idvar, x, y, xScale, yScale, onHover, onClick}) => {
  console.log('========= POINTS REDRAW ==========')
  return(
  <g>
    {
      data.map(record =>
        <Circle key={record[idvar]} record={record} r={r}
         fill={fill} idvar={idvar} x={x} y={y} xScale={xScale} yScale={yScale} 
         onHover={onHover} onClick={onClick}/>
      )
    }
  </g>
  )
})

export default MemoPoints
