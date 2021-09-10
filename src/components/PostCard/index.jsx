import PropTypes from 'prop-types';

export const PostCard = ({
  cover, title, body, id,
}) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-card">
      <h1>
        {title}
        {' '}
        {id}
      </h1>
      <p>{body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number
};
