import React, { Component } from 'react';
import axios from 'axios';
import { deleteStory } from './api';


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
  async deleteAStory (story) {
    await deleteStory(story);
          const stories = this.state.stories.filter(_story => _story.id!== _story.id);
          this.setState({stories});
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
                  <button onClick={()=> deleteAStory(story)}>Delete Story</button>

                  <p>
                  { story.body }
                  </p>
                </li>

              );
            })
          }
          <Stories stories = {stories} storyId={storyId} deleteAStory = {deleteAStory}/>
          {
            storyId ? <Story storyId={ storyId } /> : null
          }
        </ul>
      </div>
    );
  }
}



export default User;
