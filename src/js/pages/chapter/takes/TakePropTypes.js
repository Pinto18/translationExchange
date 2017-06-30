import PropTypes from "prop-types";

var TakePropTypes = PropTypes.shape(
    {
        id: PropTypes.number.isRequired,
        audioSource: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired
    }
).isRequired;

export default TakePropTypes;