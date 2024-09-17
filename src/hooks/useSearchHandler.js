
export default function useSearchHandler(data, onEdit, onSubmit) {
  
  const updateSearch = e => {
    const term = e.target.value
      .toLowerCase()
    const allVariables = Object.keys(data[1])
    const candidate = data.find(record => {
      const s = allVariables.map(vr => record[vr])
        .join('')
        .toLowerCase()
      return(
        s.includes(term)
      )
    })
    onEdit(candidate)
  }
  
  const searchKeyPress = e => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return {
    onChange: updateSearch,
    onKeyDown: searchKeyPress
  }
}
