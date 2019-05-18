import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class GithubList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: 'test',
      // repositories is an array of objects that look like:
      //    { repoName: 'Rails', forksCount: 200, starsCount: 300, contributorsCount: 400 }
      repositories: [
        { repoName: 'test1', forksCount: 200, starsCount: 301, contributorsCount: 402 },
        { repoName: 'test2', forksCount: 201, starsCount: 302, contributorsCount: 400 },
        { repoName: 'test3', forksCount: 202, starsCount: 300, contributorsCount: 401 }
      ],
      errorMessage: '',
      successMessage: ''
    };
  }

  handleOrganizationChange = (event) => {
    let newOrganization = event.target.value;

    this.setState({ organization: newOrganization });
  }

  handleGetRepositories = (event) => {
    event.preventDefault();

    // validate this.state.organization

    this.fetchRepositories();
  }

  fetchRepositories = () => {
    const baseUrl = '/github/repositories';
    let url = baseUrl + '?organization=' + this.state.organization;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then((response) => this.handleResponse(response))
  }

  handleResponse = (res) => {
    console.log(res)
    if (res.message === 'success') {
      this.setState({
        successMessage: res.statusText + ' ' + res.details,
        respositories: res.respositories
      });
    } else {
      this.setState({
        errorMessage: res.statusText + ' ' + res.details
      });
    }
  }

  handleSort = (event) => {
    event.preventDefault();

    const sortByName = event.target.name
    const sortedRepositories = this.sortByKeyDesc(this.state.repositories, sortByName)

    this.setState({ repositories: sortedRepositories });
  }

  // Sorts any array of objects by key in descending order.
  sortByKeyDesc = (array, key) => {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
  }

  render() {
    let rows = this.state.repositories.map((repo, key) =>
      <tr key={key}>
        <td>{repo.repoName}</td>
        <td>{repo.forksCount}</td>
        <td>{repo.starsCount}</td>
        <td>{repo.contributorsCount}</td>
      </tr>
    );
    return (
      <div>
        {this.state.errorMessage &&
          <div>
            There was an error in processing: {this.state.errorMessage}
            <hr />
          </div>
        }
        {this.state.successMessage &&
          <div>
            Horray!! {this.state.errorMessage}
            <hr />
          </div>
        }
        <input name="organization" value={this.state.organization} onChange={this.handleOrganizationChange} />
        <button onClick={this.handleGetRepositories}>Get Repositories!</button>
        <hr />
        <table>
          <tbody>
            <tr>
              <th>Repository Name<button name="repoName" onClick={this.handleSort}>Sort!</button></th>
              <th>Count of Forks<button name="forksCount" onClick={this.handleSort}>Sort!</button></th>
              <th>Count of Stars<button name="starsCount" onClick={this.handleSort}>Sort!</button></th>
              <th>Count of Contributors<button name="contributorsCount" onClick={this.handleSort}>Sort!</button></th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <GithubList name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
