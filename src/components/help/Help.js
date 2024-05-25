import React from 'react'
import './help.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion';

function Help() {
    return (
        <div className='help_topDiv total_back w_color'>
            <h4 className='px-3'>Get help as a myTube user</h4>
            <Row>
                <Col sm={6} className='p-3'>
                    <div className='help_box'>
                        <p><b>myTube Help Center</b></p>
                        faucibus nisl tincidunt eget. Nullam vehicula ipsum a arcu cursus vitae
                        congue. Donec ultrices tincidunt arcu non sodales. Nulla facilisi
                        nullam vehicula ipsum. At auctor urna nunc id. Arcu felis bibendum ut
                        tristique et. Risus ultricies tristique nulla aliquet enim tortor at.
                        Sapien et ligula ullamcorper malesuada proin libero nunc. Ut ornare
                        lectus sit amet est placerat.
                        <p className='help_link'>
                            <Link to='/'>https://somelink.nolink/where.abbcde</Link>
                        </p>
                    </div>
                </Col>
                <Col sm={6} className='p-3'>
                    <div className='help_box'>
                        <p><b>myTube Help video channels</b></p>
                        faucibus nisl tincidunt eget. Nullam vehicula ipsum a arcu cursus vitae
                        congue. Donec ultrices tincidunt arcu non sodales. Nulla facilisi
                        nullam vehicula ipsum. At auctor urna nunc id. Arcu felis bibendum ut
                        tristique et. Risus ultricies tristique nulla aliquet enim tortor at.
                        Sapien et ligula ullamcorper malesuada proin libero nunc. Ut ornare
                        lectus sit amet est placerat.
                        <p className='help_link'>
                            <Link to='/'>https://somelink.nolink/where.abbcde</Link>
                        </p>
                    </div>
                </Col>
                <Col sm={6} className='p-3'>
                    <div className='help_box'>
                        <p><b>Policy questions</b></p>
                        faucibus nisl tincidunt eget. Nullam vehicula ipsum a arcu cursus vitae
                        congue. Donec ultrices tincidunt arcu non sodales. Nulla facilisi
                        nullam vehicula ipsum. At auctor urna nunc id. Arcu felis bibendum ut
                        tristique et. Risus ultricies tristique nulla aliquet enim tortor at.
                        Sapien et ligula ullamcorper malesuada proin libero nunc. Ut ornare
                        lectus sit amet est placerat.
                        <p className='help_link'>
                            <Link to='/'>https://somelink.nolink/where.abbcde</Link>
                        </p>
                    </div>
                </Col>
                <Col sm={6} className='p-3'>
                    <div className='help_box'>
                        <p><b>Copyright questions</b></p>
                        faucibus nisl tincidunt eget. Nullam vehicula ipsum a arcu cursus vitae
                        congue. Donec ultrices tincidunt arcu non sodales. Nulla facilisi
                        nullam vehicula ipsum. At auctor urna nunc id. Arcu felis bibendum ut
                        tristique et. Risus ultricies tristique nulla aliquet enim tortor at.
                        Sapien et ligula ullamcorper malesuada proin libero nunc. Ut ornare
                        lectus sit amet est placerat.
                        <p className='help_link'>
                            <Link to='/'>https://somelink.nolink/where.abbcde</Link>
                        </p>
                    </div>
                </Col>
            </Row>
            <div className='p-1 m-md-2'>
                <h4 className='my-3'>Most Common Questions User Asked</h4>
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How do I start creating on myTube?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>How do I grow my channel?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>How do I fix a copyright strike?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>How do Trending videos happen?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>How do I make edits to my channel?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>How do I promote my videos?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}

export default Help