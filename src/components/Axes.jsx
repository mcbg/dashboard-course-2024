export default function Axes({xScale, yScale}) {
  const [xStart, xEnd] = xScale.range()
  const [yStart, yEnd] = yScale.range()

  
  const xTicks = xScale.hasOwnProperty('ticks') ? 
    xScale.ticks() : // continuous variable
    xScale.domain() // discrete variable
  const yTicks = yScale.ticks() 

  const colour = 'black'

  return(
    <g>
      <line x1={xStart} x2={xEnd} y1={yStart} y2={yStart} stroke = {colour} />
      {
        xTicks.map(t => {
          const x = xScale(t)
          return(
            <g key={t}>
              <line x1={x} x2={x} y1={yStart} y2={yStart + 10} stroke = {colour} />
              <text
                x={x}
                y={yStart + 25}
                fill={colour}
                textAnchor="middle"
                fontSize={14} >
                  {
                    typeof(t) === 'number' ? (t).toFixed(1) : t
                }
              </text>
            </g>
          )
        })
      }
      <line x1={xStart} x2={xStart} y1={yStart} y2={yEnd} stroke = {colour} />
      {
        yTicks.map(t => {
          const y = yScale(t)
          return(
            <g key={t}>
              <line x1={xStart} x2={xStart - 10} y1={y} y2={y} stroke = {colour} />
              <text
                x={xStart - 25}
                y={y}
                fill={colour}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}>
                  {
                    typeof(t) === 'number' ? (t).toFixed(1) : t
                  }
              </text>
            </g>
          )
        })
      }
    </g>
  )
}
