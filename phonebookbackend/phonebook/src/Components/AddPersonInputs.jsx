const AddPersonInput = ({setNewName, setPhoneNumber, newName, phoneNumber: phoneNumber}) => {
    return (
    <><div>
            name: <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />

        </div>
        <div>number: <input type="text" value={phoneNumber} onChange={e => { setPhoneNumber(e.target.value) } } /></div><div>
                <button type="submit">add</button>
        </div>
    </>
        )
}

export {AddPersonInput}