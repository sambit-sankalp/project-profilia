import React from 'react';
import './ProfileCard.css';
import {
  DislikeOutlined,
  LikeOutlined,
  HeartOutlined,
} from '@ant-design/icons';

function ProfileCard(props) {
  return (
    <div className="card-container">
      <header>
        <img
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt={props.name}
        />
      </header>
      <h1 className="bold-text">Rafael Caldwell</h1>
      <h2 className="normal-text">Hi there I am using this app</h2>
      <div className="social-container">
        <div className="followers">
          <h1 className="texticon">20K</h1>
          <LikeOutlined
            style={{ color: '#0044ff', cursor: 'pointer', fontSize: '1.5rem' }}
            key="like"
          />
        </div>
        <div className="likes">
          <HeartOutlined
            style={{ color: '#ff0000', cursor: 'pointer', fontSize: '1.5rem' }}
            key="heart"
          />
        </div>
        <div className="photos">
          <h1 className="texticon">1K</h1>
          <DislikeOutlined
            style={{ color: '#000000', cursor: 'pointer', fontSize: '1.5rem' }}
            key="dislike"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
