import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";

export default class Lyrics extends Component {
  state = {
    lyrics: {},
    track: {},
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_KEY}`
      )
      .then((res) => {
        //console.log(res.data);
        this.setState({
          lyrics: res.data.message.body.lyrics,
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_KEY}`
        );
      })
      .then((res) => {
        //console.log(res.data);
        this.setState({
          track: res.data.message.body.track,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-primary btn-sm mb-4">
            Go back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
              </div>
              <ul className="list-group mt-3">
                  <li className="list-group-item">
                      <strong>Album ID</strong>:{track.album_id}
                  </li>
              </ul>
        </React.Fragment>
      );
    }
  }
}
