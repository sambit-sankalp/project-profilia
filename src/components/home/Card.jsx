import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateAction } from '../../store/actions/userActions';
import './ProfileCard.css';
import {
  DislikeOutlined,
  LikeOutlined,
  HeartOutlined,
  HeartFilled,
  LikeFilled,
  DislikeFilled,
} from '@ant-design/icons';

function ProfileCard({ data }) {
  const dispatch = useDispatch();

  var cardsLiked = JSON.parse(localStorage.getItem('likes'));
  var cardsDisiked = JSON.parse(localStorage.getItem('dislikes'));
  var favCards = JSON.parse(localStorage.getItem('fav'));
  const [like, setLiker] = useState(data.likes ? data.likes : 0);
  const [disLike, setdisLiker] = useState(data.dislikes ? data.dislikes : 0);
  const [likeActive, setLikeActive] = useState(
    cardsLiked ? cardsLiked.includes(data.uid) : false
  );
  const [dislikeActive, setDisLikeActive] = useState(
    cardsDisiked ? cardsDisiked.includes(data.uid) : false
  );
  const [fav, setFav] = useState(
    favCards ? favCards.includes(data.uid) : false
  );

  const currentUser = useSelector((state) => state.userDetails);
  const { loading: l, error: e, user } = currentUser;

  const userData = useSelector((state) => state.updateUser);
  const { loading, error, success } = userData;

  const dataAdmin = useSelector((state) => state.updateAdmin);
  const { loading: adLoading, error: adError, success: adSuccess } = dataAdmin;

  const setDislike = () => {
    setDisLikeActive(!dislikeActive);
    setdisLiker(dislikeActive ? disLike - 1 : disLike + 1);
    var cardLikes = JSON.parse(localStorage.getItem('dislikes'));
    if (dislikeActive) {
      var temp = cardLikes;
      const index = temp.indexOf(data.uid);
      if (index > -1) {
        temp.splice(index, 1);
      }
      if (cardLikes) {
        localStorage.setItem('dislikes', JSON.stringify(temp));
      }
    } else {
      if (cardLikes) {
        localStorage.setItem(
          'dislikes',
          JSON.stringify([...cardLikes, data.uid])
        );
      } else {
        localStorage.setItem('dislikes', JSON.stringify([data.uid]));
      }
    }
  };

  const setLike = () => {
    setLikeActive(!likeActive);
    setLiker(likeActive ? like - 1 : like + 1);

    var cardLikes = JSON.parse(localStorage.getItem('likes'));
    if (likeActive) {
      var temp = cardLikes;
      const index = temp.indexOf(data.uid);
      if (index > -1) {
        temp.splice(index, 1);
      }
      if (cardLikes) {
        localStorage.setItem('likes', JSON.stringify(temp));
      }
    } else {
      if (cardLikes) {
        localStorage.setItem('likes', JSON.stringify([...cardLikes, data.uid]));
      } else {
        localStorage.setItem('likes', JSON.stringify([data.uid]));
      }
    }
  };

  const handleLike = () => {
    if (dislikeActive) {
      setDislike();
    }
    setLike();
    window.location.reload(false);
  };

  const handleDislike = () => {
    if (likeActive) {
      setLike();
    }
    setDislike();
  };

  const handleFav = () => {
    setFav(!fav);
    if (data) {
      if (!fav) {
        var favCards = JSON.parse(localStorage.getItem('fav'));
        if (favCards) {
          localStorage.setItem('fav', JSON.stringify([...favCards, data.uid]));
        } else {
          localStorage.setItem('fav', JSON.stringify([data.uid]));
        }
      } else {
        var favCards = JSON.parse(localStorage.getItem('fav'));
        const index = favCards.indexOf(data.uid);
        if (index > -1) {
          favCards.splice(index, 1);
        }
        localStorage.setItem('fav', JSON.stringify(favCards));
      }
    }
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(userUpdateAction(data.uid, like, disLike));
  }, [like, disLike, fav, dispatch]);

  return (
    <div className="card-container">
      <header>
        <img
          src={data.image ? data.image : `https://joeschmoe.io/api/v1/random`}
          alt={data.name}
        />
      </header>
      <h1 className="bold-text">{data.name}</h1>
      <h2 className="normal-text">{data.status}</h2>
      <div className="social-container">
        <div className="followers">
          <h1 className="texticon">{like}</h1>
          {likeActive ? (
            <LikeFilled
              onClick={handleLike}
              style={{
                color: '#0044ff',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
              key="like"
            />
          ) : (
            <LikeOutlined
              onClick={handleLike}
              style={{
                color: '#0044ff',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
              key="like"
            />
          )}
        </div>
        <div className="likes">
          {fav ? (
            <HeartFilled
              onClick={handleFav}
              style={{
                color: '#ff0000',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
              key="heart"
            />
          ) : (
            <HeartOutlined
              onClick={handleFav}
              style={{
                color: '#ff0000',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
              key="heart"
            />
          )}
        </div>
        <div className="photos">
          <h1 className="texticon">{disLike}</h1>
          {!dislikeActive ? (
            <DislikeOutlined
              onClick={handleDislike}
              style={{
                color: '#000000',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
              key="dislike"
            />
          ) : (
            <DislikeFilled
              onClick={handleDislike}
              style={{
                color: '#000000',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
              key="dislike"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
