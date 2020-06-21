import React from "react";
import { Link } from "react-router-dom";

const Tracklist = (props) => {
  const { track } = props;
  return (
    <div key={track.track_id} className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-play"></i>Track
            </strong>
            : {track.track_name}
            <br />
            <strong>
              <i className="fas fa-compact-disc"></i>Album
            </strong>
            : {track.album_name}
          </p>
          <Link
            className="btn btn-success inline-block"
            to={`lyrics/track/${track.track_id}`}
          >
            <i className="fas fa-chevron-right"></i> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tracklist;
