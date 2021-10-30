import axios from 'axios';
import config from '../config/dev.json';

let path = '/api'
let AUTH_URL = "http://localhost:3000/api/auth";
//let user_url = config.host + path + "/user";

// if (process.env.NODE_ENV === 'production') {
//     url = config.host + path
//     //urlSecure = config.host + path + '/secure'
// }

export async function Login(user) {
    return new Promise((resolve, reject) => {
        axios
            .post(AUTH_URL + "/login", {
                email: user.email,
                password: user.password,
            })
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res.data.token);
                    resolve(res.data.user)
                }

            }).catch(error => {
                localStorage.removeItem('token')
                reject(error)
            })
    })
}
// export async function getInfoByToken(token) {
//     return new Promise((resolve, reject) => {
//         tokenHeader(token)
//         axios
//             .get(AUTH_URL + "/getInfoByToken")
//             .then((res) => {
//                 localStorage.setItem("token", token);
//                 resolve(res.data[0])
//             }).catch(error => {
//                 reject(error)
//             })
//     })
// }

export async function tokenHeader(token) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + token
}