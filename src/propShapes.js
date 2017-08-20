import { PropTypes } from 'prop-types';


export const postObjShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  timePosted: PropTypes.instanceOf(Date),
});
