
export default function Circle({record, r, fill, idvar, x, y, xScale, yScale, onHover, onClick}) {
  return(
    <>
      {
        record &&
          <circle cx={xScale(record[x])} cy={yScale(record[y])}
            onMouseEnter={() => onHover(record)}
            onClick={() => onClick(record)}
            r={r} fill={fill} />
      }
    </>
  )
}
