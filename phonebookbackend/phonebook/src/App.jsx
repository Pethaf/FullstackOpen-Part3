import personService from './Services/Person';
import { useState, useEffect } from 'react'
import { FilterInput } from './Components/FilterInput'
import { AddPersonInput } from './Components/AddPersonInputs'
import { FilteredPhoneList } from './Components/FilteredPhoneList'
import { Notification } from './Components/Notification';
import { Error } from './Components/Error';
import './index.css'
const App = () => {
  useEffect(
    () => {
      personService.getAll().then(initialPeople => { setPersons(initialPeople) });
    }, [])
  const [persons, setPersons] = useState([])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [newName, setNewName] = useState('')
  const [filterTerm, setFilterTerm] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const addPerson = () => {
    const person = persons.find(person => person.name == newName);
    if (!person) {
      const newPerson = { name: `${newName}`, phoneNumber: `${phoneNumber}` }
      personService.create(newPerson).then(response => {
        setPersons([...persons, { ...response }])
        setNumber("");
        setNewName("");
        displayNotification(`Added ${newPerson.name}`)
      }).catch(error => {displayError(error.message)}
      )
    }
    else {
      const confirmUpdatePerson = confirm(`${person.name} is already added to phonebook, replace old number with new one?`)
      if(confirmUpdatePerson){
        const newPerson = {...person, number}
        personService.update(newPerson).then(
          response => {
            const indexOfPerson = persons.findIndex(person => person.id == newPerson.id);
            let newPersons = [...persons]
            newPersons[indexOfPerson] = {...newPerson}
            setPersons(newPersons);
            displayNotification(`Updated ${newPerson.name}`)
          }  
        ).catch(error =>{
          displayError(error.message)
        })
      }
      setNewName("")
      setNumber("")
    }
  }

  const deletePerson = (id) => {
    const userToDelete = persons.find(person => person.id == id)
    const confirmDeleteUser = confirm(`Really delete ${userToDelete.name}`)
    if (confirmDeleteUser) {
      personService.remove(id).then(
        (_) => {
          setPersons(persons.filter(person => person.id != id))
          displayNotification(`Deleted ${userToDelete.name}`)
        }
      )
    }
  }
  const displayNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {setNotificationMessage("")},2000);
  }

  const displayError =(message) => {
    setErrorMessage(message)
    setTimeout(() => {setNotificationMessage(""),2000});
  }
  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage && <Notification message={notificationMessage} />}
      {errorMessage && <Error message={errorMessage}/>}
      <form onSubmit={e => {
        e.preventDefault();
        addPerson();
      }}>
        <FilterInput callback={setFilterTerm} filterValue={filterTerm} />
        <AddPersonInput newName={newName} phoneNumber={phoneNumber} setNewName={setNewName} setPhoneNumber={setPhoneNumber} />
        <FilteredPhoneList people={persons} filterTerm={filterTerm} deletePerson={deletePerson} />
      </form>

    </div>
  )
}

export default App