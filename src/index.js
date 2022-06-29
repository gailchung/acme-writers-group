import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';
import { deleteUser, createUser } from './api';


class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      userId: ''
    };
    this.destroyUser = this.destroyUser.bind(this);
    this.deleteAUser = this.deleteAUser.bind(this);


  }
  destroyUser(user){
    console.log(this);
    console.log(user);
    console.log('destroy on server');
    console.log('remove from state');
    if(this.state.userId){
      window.location.hash = '';
    }
  }

  async deleteAUser (user) {
    await deleteUser(user);
          const users = this.state.users.filter(_user => _user.id!== user.id);
          this.setState({users});
      }
  
  async createAUser(){
        const user = await createUser({ name: Math.random() });
        const users = [...this.state.users, user];
        this.setState({ users });
      }

  async componentDidMount(){
    try {
      console.log(this.props);
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get('/api/users');
      this.setState({ users: response.data });
      window.addEventListener('hashchange', ()=> {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      });
    }
    catch(ex){
      console.log(ex);
    }
  }


  
  render(){
    const { users, userId } = this.state;
    const { destroyUser, deleteAUser, createAUser  } = this;
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>

          <Users users = { users } userId={ userId } destroy = { destroyUser } deleteAUser = { deleteAUser } createAUser = {createAUser}/>
          {
            userId ? <User userId={ userId } /> : null
          }

        </main>
      </div>
    );
  }
}

const root = document.querySelector('#root');
render(<App/>, root);


