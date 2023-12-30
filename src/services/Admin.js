import axios from 'axios'
import { Handlers } from '../utils'
import env from '../config'

const UpdateData = async() => await axios.put(env.API_URL + '/updateData')

const AdminService = {
    UpdateData: Handlers.Services(UpdateData),
}

export default AdminService
