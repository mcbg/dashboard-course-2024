import {useMemo} from 'react'
import { schemeAccent, scaleOrdinal, scaleSequential, scaleLinear, scaleBand, extent, interpolateViridis, schemePastel1} from 'd3'

// Scales are only computed if data, x, or y are changed
export default function useScales(data, x, y) {
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

// add a margin of `p` percent to the result of d3's extent function
function addMargin(x, p) {
  const d = (x[1] - x[0]) * p
  return([x[0] - d, x[1] + d])
}
