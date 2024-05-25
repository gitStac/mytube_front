import React, { useEffect, useState } from "react";
import "./videoComp.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";

function VideoOne() {
  const video = useLocation().state;
  const userData = useSelector((state) => state.info.user);
  const navigate = useNavigate();
  const videoId = useParams().id;
  const [eInfo, seteInfo] = useState();
  const [err, setErr] = useState();
  const [jchange, setjChange] = useState(false);

  const clickLike = async () => {
    let userId = userData._id;
    if (userData._id) {
      await axios
        .put(
          `${process.env.REACT_APP_secret_backEnd}/video/vidlike_update/${video._id}`,
          { user_id: userId }
        )
        .then(() => {
          setErr("");
          setjChange((prev) => !prev);
        })
        .catch(() => setErr("something went wrong, please try again"));
    } else {
      navigate("/signin");
    }
  };

  const clickDislike = async () => {
    let userId = userData._id;
    if (userData._id) {
      await axios
        .put(
          `${process.env.REACT_APP_secret_backEnd}/video/vidislike_update/${video._id}`,
          { user_id: userId }
        )
        .then(() => {
          setErr("");
          setjChange((prev) => !prev);
        })
        .catch(() => setErr("something went wrong, please try again"));
    } else {
      navigate("/signin");
    }
  };

  const clickSub = async () => {
    let userId = userData._id;
    if (userData._id) {
      await axios
        .put(
          `${process.env.REACT_APP_secret_backEnd}/channel/chasub_update/${video.channel_id._id}`,
          { user_id: userId }
        )
        .then(() => {
          setErr("");
          setjChange((prev) => !prev);
        })
        .catch(() => setErr("something went wrong, please try again"));
    } else {
      navigate("/signin");
    }
  };

  const clickUnsub = async () => {
    let userId = userData._id;
    if (userData._id) {
      await axios
        .put(
          `${process.env.REACT_APP_secret_backEnd}/channel/chaunsub_update/${video.channel_id._id}`,
          { user_id: userId }
        )
        .then(() => {
          setErr("");
          setjChange((prev) => !prev);
        })
        .catch(() => setErr("something went wrong, please try again"));
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_secret_backEnd}/video/videoextra_get/${videoId}`,
          {
            channel_id: video.channel_id._id,
            user_id: userData._id || "",
          }
        )
        .then((res) => {
          seteInfo(res.data);
          setErr("");
        })
        .catch(() => {
          setErr("difficulty in fetching info");
        });
    };
    fetchData();
  }, [videoId, video.channel_id._id, userData._id, jchange]);

  return (
    <div className="videoOne_topDiv w_color">
      <div className="video_container">
        {/* <iframe src={video.video_video} title="video" allowFullScreen /> */}
        <video src={video.video_video} controls />
      </div>
      {err && <p className="text-danger my-2">{err}</p>}
      <h5 className="mt-2">{video.title}</h5>
      <div className="videoOne_timeNlike">
        <p className="mb-0 w_mute">{moment(video.createdAt).fromNow()}</p>
        <div className="videoOne_likesDiv">
          <span>
            <i
              className="fa-regular fa-thumbs-up fa-lg"
              onClick={clickLike}
              style={{ color: eInfo && eInfo.like && "blue" }}
            ></i>
          </span>
          <span>
            <i
              className="fa-regular fa-thumbs-down fa-lg"
              onClick={clickDislike}
              style={{ color: eInfo && eInfo.dislike && "blue" }}
            ></i>
          </span>
        </div>
      </div>
      <div className="videoOne_channelDiv">
        <div>
          <img src={video.channel_id.image} className="bg-light" alt="img" />
          <ul className="px-3 mb-0" style={{ fontWeight: "500" }}>
            <li>{video.channel_id.name}</li>
            <li>{eInfo && eInfo.sub_num} subscribers</li>
          </ul>
        </div>
        {eInfo && eInfo.sub ? (
          <button
            className="btn btn-danger rounded-pill px-3"
            onClick={clickUnsub}
          >
            unsubscribe
          </button>
        ) : (
          <button
            className="btn btn-danger rounded-pill px-3"
            onClick={clickSub}
          >
            subscribe
          </button>
        )}
      </div>
      <div className="videoOne_desc">
        <p className="mb-0 w_mute">{video.views} views</p>
        <p>{video.desc}</p>
      </div>
      <hr />
    </div>
  );
}

export default VideoOne;
