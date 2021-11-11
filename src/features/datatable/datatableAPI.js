import axios from 'axios'

export default class DatatableAPI {

  constructor(){
    this.seed_id = 'wueuywte823787493849'
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL || "https://randomuser.me/api/"
    });
  }

  fetchUsersData(gender, query, page, per_page, sort, order){
    return new Promise((resolve, reject) => {
      this.axios.get(`?gender=${gender}&query=${query}&page=${page}&results=${per_page}&sort=${sort}&order=${order}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
  }
}