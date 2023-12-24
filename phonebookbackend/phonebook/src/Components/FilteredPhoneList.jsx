import { Person } from "./Person"
const FilteredPhoneList = ({people,filterTerm, deletePerson}) => {
    return <><h2>Numbers</h2>
    {people.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase())).map(
        person => <Person {...person} key={person.id} deletePerson={() => deletePerson(person.id)}/>)}
        </>
}

export { FilteredPhoneList}