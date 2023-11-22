import axios from 'axios'
import { Handlers } from '../utils'
import MainService from './Main'
import env from '../config'

const Login     = async({payload}) => await axios.post(env.API_URL + '/addUser', payload)
const FetchData = async() => await axios.get(env.API_URL + '/getData')

const AuthService = {
    Login    : Handlers.Services(Login),
    FetchData: Handlers.Services(FetchData),

}

export default AuthService
