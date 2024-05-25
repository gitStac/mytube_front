import React from "react";
import Comments from "./commentComp/Comments";
import Related from "./relatedComp/Related";
import VideoOne from "./videoComp/VideoOne";
import { Col, Row } from "react-bootstrap";

function VideoCombine() {
  window.scrollTo({ top: 0 });
  return (
    <div className="total_back">
      <Row>
        <Col md={7}>
          <VideoOne />
          <Comments />
        </Col>
        <Col md={5}>
          <Related />
        </Col>
      </Row>
    </div>
  );
}

export default VideoCombine;
