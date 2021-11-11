import React, { Component } from 'react';
import DataTable from 'react-data-table-component'
import DatatableAPI from "./datatableAPI";
import _ from 'lodash'

export class Datatable extends Component{
  
  constructor(props){
    super(props)
    this.api = new DatatableAPI()
    this.fetchUsersData = _.debounce(this.fetchUsersData.bind(this), 300)
    this.columns = [
      {
        name: 'Username',
        selector: row => row.login.username,
        sortable: true,
      },
      {
        name: 'Name',
        selector: row => `${row.name.title}. ${row.name.first} ${row.name.last}`,
        sortable: true,
      },
      {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
      },
      {
        name: 'Gendre',
        selector: row => row.gender,
        sortable: true,
      },
      {
        name: 'Register Date',
        selector: row => row.registered.date,
        sortable: true,
      },
    ];
    this.state = {
      users: [],
      filterUsers: [],
      gender: '',
      search: '',
      pending: false,
      sort: null, 
      order: null,
      page: 1,
      perPage: 10,
      totalRow: 100
    }
  }

  fetchUsersData(){
    this.setState({pending: true})
    this.api.fetchUsersData(
      this.state.gender, 
      this.state.search, 
      this.state.page, 
      this.state.perPage, 
      this.state.sort, 
      this.state.order
    ).then(res => {
      this.setState({users: res.results, filterUsers: res.results, pending: false})
    })
  }

  handlePageChange = (page) => {
    this.setState({page: page}, () => this.fetchUsersData())
	};

	handlePerRowsChange = (newPerPage, page) =>{
    this.setState({perPage: newPerPage, page: page}, () => this.fetchUsersData())
	};

  handleSort = (column, sortDirection) =>{
    this.setState({sort: column.name, order: sortDirection}, () => this.fetchUsersData())
  }

  handleSearchChange = (event) => {
    this.setState({search: event.target.value}, () => this.fetchUsersData())
  }

  handleGenderChange = (event) => {
    this.setState({gender: event.target.value}, () => this.fetchUsersData())
  }

  handleResetFilter = () => {
    this.setState({gender: '', search: ''}, () => this.fetchUsersData())
  }

  componentDidMount(){
    this.fetchUsersData()
  }

  render(){
    return (
      <div>
        <div class="title">Ajaib Test Web Engineering : Fathul Kirom</div>
        <div class="filter-container">
          <div class="mr-10">
            <label>Gender</label>
            <select id="Gender" class="select" value={this.state.gender} onChange={this.handleGenderChange}>
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="mr-10">
            <label>Search</label>
            <input type="text" value={this.state.search} onChange={this.handleSearchChange}/>
          </div>
          <div class="mr-10">
            <button class="button" type="button" onClick={this.handleResetFilter}>Reset Filter</button>
          </div>
        </div>
        <DataTable
          title="User Data"
          columns={this.columns}
          data={this.state.filterUsers}
          pagination
			    paginationServer
          sortServer
          progressPending={this.state.pending}
			    paginationTotalRows={this.state.totalRow}
          onChangeRowsPerPage={this.handlePerRowsChange}
          onSort={this.handleSort}
			    onChangePage={this.handlePageChange}
        />
      </div>
    )
  }
}