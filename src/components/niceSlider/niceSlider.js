import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Draggable from 'react-draggable';
import { FaHandGrabO, FaHandPaperO } from 'react-icons/lib/fa';


class NiceSlider extends Component {
  static propTypes = {
    numValues: PropTypes.number.isRequired,
    width: PropTypes.number,
    needleWidth: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    width: 200,
    needleWidth: 30,
  };

  state = {
    isBeingClicked: false,
  }

  handleDrag = (evt, ui) => {
    const { lastX } = ui;
    const { numValues, width, needleWidth, onChange } = this.props;
    if (onChange) {
      // |--|===========| slider at beginning
      // |===========|--| slider at end
      // |>>>>>>>>>>>|    split this distance into the number of values it must represent
      const widthPerValue = (width - needleWidth) / numValues;
      const value = Math.floor(lastX / widthPerValue);
      onChange(value);
    }
  }

  render() {
    const { width, needleWidth } = this.props;
    const { isBeingClicked } = this.state;
    const safeWidth = width - 1; // if the slider could go all the way, it could reach 1 value above the max
    return (
      <div className="nice-slider"
           style={{width: `${safeWidth-1}px`}}>
        <Draggable axis="x"
                   bounds="parent"
                   onDrag={this.handleDrag}
                   onStart={() => this.setState({isBeingClicked: true})}
                   onStop={() => this.setState({isBeingClicked: false})}>
          <div className="nice-slider-needle"
               style={{width: `${needleWidth}px`}}>
            {isBeingClicked
              ? <FaHandGrabO />
              : <FaHandPaperO />
            }
          </div>
        </Draggable>
        {/* TODO: perhaps put a large invisible div over the whole app to catch a special keyboard shortcut for zooming? */}
      </div>
    )
  }
}


export default NiceSlider;
