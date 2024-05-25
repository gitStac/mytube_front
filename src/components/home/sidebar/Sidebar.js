import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar_topDiv total_back w_color'>
      <div className='sidebar_contentDiv'>
        <div className='py-2'><i className="fa-solid fa-house fa-fw hide_me"></i>
          <Link to='/'>home</Link>
        </div>
        <hr />
        <div className='py-2 hide_me fw-bold'>Explore</div>
        <div className='py-2'><i className="fa-solid fa-arrow-trend-up fa-fw hide_me"></i>
          <Link to='/search/category=trending'>Trending</Link>
        </div>
        <div className='py-2'><i className="fa-solid fa-music fa-fw hide_me"></i>
          <Link to='/search/category=music'>Music</Link>
        </div>
        <div className='py-2'><i className="fa-solid fa-clapperboard fa-fw hide_me"></i>
          <Link to='/search/category=movies'>Movies</Link>
        </div>
        <div className='py-2'><i className="fa-brands fa-xbox fa-fw hide_me"></i>
          <Link to='/search/category=gaming'>Gaming</Link>
        </div>
        <div className='py-2'><i className="fa-solid fa-tv fa-fw hide_me"></i>
          <Link to='/search/category=news'>News</Link>
        </div>
        <div className='py-2'><i className="fa-solid fa-trophy fa-fw hide_me"></i>
          <Link to='/search/category=sports'>Sports</Link>
        </div>
        <div className='py-2'><i className="fa-solid fa-graduation-cap fa-fw hide_me"></i>
          <Link to='/search/category=learning'>Learning</Link>
        </div>
        <hr />
        <div className='py-2 hide_me fw-bold'>Community</div>
        <div className='py-2'><i className="fa-solid fa-circle-question fa-fw hide_me"></i>
          <Link to='/help'>Help</Link>
        </div>
        <hr />
        <p className='pb-3 copyRight hide_me fw-light'>&#169; 2023 myTube LLC</p>
      </div>
    </div>
  )
}

export default Sidebar