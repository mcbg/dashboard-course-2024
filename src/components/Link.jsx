
export default function Link({label, url}) {
  return(
    <>
      { url ?
        <a className="drill__button" href={url}>{label}</a> :
        <br />
      }
    </>
  )
}
