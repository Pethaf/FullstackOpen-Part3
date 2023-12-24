const  FilterInput = ({callback, filterValue}) => {
    return (
    <div>
    <p>Filter shown with <input value={filterValue} onChange={(e) => {callback(e.target.value)}}/></p>
  </div>
    )
}

export { FilterInput}