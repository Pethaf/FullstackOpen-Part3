const Person = ({name, phoneNumber, deletePerson}) => {
    return <><p>{name} {phoneNumber}
    <button onClick={(e) => {e.preventDefault(); deletePerson();}}>X</button>
    </p></>
}

export {Person}