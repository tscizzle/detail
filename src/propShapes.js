import { PropTypes } from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';


export const postObjShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  timePosted: momentPropTypes.momentObj.isRequired,
});
