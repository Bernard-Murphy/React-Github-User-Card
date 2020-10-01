import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/bernard-murphy')
    .then( response => {
      this.setState({
        name: response.data.name,
        bio: response.data.bio,
        url: response.data.html_url,
        id: response.data.id,
        location: response.data.location,
        image: response.data.avatar_url,
        login: response.data.login,
      });
    })
    .catch( err => {
        console.log(err);
    })
    axios.get('https://api.github.com/users/bernard-murphy/followers')
    .then( response => {
      console.log(response.data[0].login);
      this.setState({
        followers: response.data.map((follower) => {
          return follower.login
        }),
        loaded: true
      })
    })
    .catch( err => {
        console.log(err);
    })

  }

  cardCreate(){
    return (
        
      <div className="container">
        <div className="cards">
          <div className="card">
            <h3 className="name">{this.state.name}</h3>
            <p className="username">{this.state.login}</p>
            <p>Location: {this.state.location}</p>
            <p>Profile: <a href={this.state.url}>{this.state.url}</a></p>
            <p>Bio: {this.state.bio}</p>
            <p>Followers: {"\n" + this.state.followers.map((follower) => {return follower + "\n"})}</p>
          </div>
        </div>
      </div>
      
    
    )
  }
  

  render() {
    return (
      <div className="App">
       {
         (this.state.loaded === true) ? this.cardCreate() : ""
       }
      </div>
    )
  }
}

export default App;
