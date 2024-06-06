import React, { useEffect, useState } from "react";
import "./videobar.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loading from "../../loading/Loading";
import { changeIsLoading } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";

function Videobar() {
  const dispatch = useDispatch();
  const [vid, setVid] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_secret_backEnd}/video/video_get`)
        .then((res) => {
          dispatch(changeIsLoading(false));
          setVid(res.data);
          setErr("");
        })
        .catch(() => {
          dispatch(changeIsLoading(true));
          setErr("something went wrong, please try again");
        });
    };
    dispatch(changeIsLoading(true));
    fetchData();
  }, [dispatch]);

  return (
    <div className="videobar_topDiv total_back">
      <Loading />
      <div>
        <Row>
          {vid.length > 0 ? (
            vid.map((v) => {
              return (
                <Col key={v._id} className="p-2 my-1 colDIV" md={4} sm={6}>
                  <Link to={`/video/${v._id}`} state={v}>
                    <div className="videobar_videoDiv ratio ratio-16x9">
                      <img src={v.video_image} alt="img" loading="lazy" />
                    </div>
                    <div className="videobar_videoInfoDiv">
                      <div className="videobar_imageDiv">
                        <img
                          className="bg-light"
                          src={v.channel_id.image}
                          alt="img"
                        />
                      </div>
                      <div className="videobar_contentDiv">
                        <div className="videobar_vDesc w_color">{v.title}</div>
                        <div className="m-0 font_style w_mute">
                          {v.channel_id.name}
                        </div>
                        <div className="m-0 font_style w_mute">
                          <span>{v.views} views</span>
                          <span className="m-3">
                            {moment(v.createdAt).fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })
          ) : (
            <div className="showError_div">
              <>
                {err ? (
                  <p style={{ color: "red" }}>{err}</p>
                ) : (
                  <h4 className="w_color">No Video Found</h4>
                )}
              </>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Videobar;
