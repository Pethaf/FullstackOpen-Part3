import axios from "axios"
const baseUrl = `/api/`

const getAll = () => {
  const request = axios.get(`${baseUrl}persons`);
    return returnData(request);
}

const create = (person) => {
    const request = axios.post(`${baseUrl}persons`, 
    {...person})
    return returnData(request)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}person/${id}`)
    return returnData(request);

}

const update = (person) => {
    console.log(person)
    const request = axios.put(`${baseUrl}/${person.id}`,person);
    return returnData(request)
}

const returnData = (theRequest) => {
    return theRequest.then(result => result.data);
}

export default { getAll, create, remove, update}