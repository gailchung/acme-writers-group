import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';

const App = ()=> {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  useEffect(()=> {
    const load = async()=> {
      const userId = window.location.hash.slice(1);
      setUserId(userId);
      const response = await axios.get('/api/users');
      setUsers(response.data);
      window.addEventListener('hashchange', ()=> {
        const userId = window.location.hash.slice(1);
        setUserId(userId);
      });
    };
    load();

  }, []);
  return (
    <div>
      <h1>Acme Writers Group ({ users.length })</h1>
      <main>
        <Users users = { users } userId={ userId }/>
        {
          userId ? <User userId={ userId } /> : null
        }
      </main>
    </div>
  );
};
/*
class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      userId: ''
    };
  }
  async componentDidMount(){
    try {
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
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>
          <Users users = { users } userId={ userId }/>
          {
            userId ? <User userId={ userId } /> : null
          }
        </main>
      </div>
    );
  }
}
*/

const root = document.querySelector('#root');
render(<App />, root);


