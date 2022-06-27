import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


const User = ({ userId })=> {
  const [user, setUser] = useState({});
  const [stories, setStories] = useState([]);

  /*
  useEffect(()=> {
    const load = async()=> {
      let response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
      response = await axios.get(`/api/users/${userId}/stories`);
      setStories(response.data);
    };
    load();
  }, []);
  */

  useEffect(()=> {
    const load = async()=> {
      let response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
      response = await axios.get(`/api/users/${userId}/stories`);
      setStories(response.data);
    };
    load();
  }, [ userId]);




  return (
    <div>
      Details for { user.name } ({ count })
      <p>
        { user.bio }
      </p>
      <ul>
        {
          stories.map( story => {
            return (
              <li key={ story.id }>
                { story.title }
                <p>
                { story.body }
                </p>
              </li>

            );
          })
        }
      </ul>
    </div>
  );
};
/*
class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [] 
    };
  }
  async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.userId}`);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });

  }
  async componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId){
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
      
    }
  }
  render(){
    const { user, stories } = this.state;
    console.log(stories);
    return (
      <div>
        Details for { user.name }
        <p>
          { user.bio }
        </p>
        <ul>
          {
            stories.map( story => {
              return (
                <li key={ story.id }>
                  { story.title }
                  <p>
                  { story.body }
                  </p>
                </li>

              );
            })
          }
        </ul>
      </div>
    );
  }
}
*/



export default User;
