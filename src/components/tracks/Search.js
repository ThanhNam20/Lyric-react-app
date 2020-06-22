import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

export default class Search extends Component {
  state = {
    trackTitle: " ",
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  findTrack = (dispatch,e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_KEY}`
      )
      .then((res) => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
  
       this.setState({ trackTitle:'' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search A Song
              </h1>
              <p className="lead text-center">Get the Lyrics of any song</p>
              <form onSubmit={this.findTrack.bind(this,dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search the Lyrics..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className=" btn btn-primary btn-block mb-2"
                  type="submit"
                >
                  Get The Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}