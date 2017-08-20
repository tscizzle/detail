import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Draggable from 'react-draggable';


class NiceSlider extends Component {
  static defaultProps = {
    width: 200,
    draggableWidth: 30,
  }

  handleDrag = (evt, ui) => {
    const { lastX } = ui;
    const { numValues, width, draggableWidth, onChange } = this.props;
    if (onChange) {
      // |--|===========| slider at beginning
      // |===========|--| slider at end
      // |>>>>>>>>>>>|    split this distance into the number of values it must represent
      const widthPerValue = (width - draggableWidth) / numValues;
      const value = Math.floor(lastX / widthPerValue);
      onChange(value);
    }
  }

  render() {
    const { width, draggableWidth } = this.props;
    const safeWidth = width - 1; // if the slider could go all the way, it could reach 1 value above the max
    return (
      <div className="nice-slider"
           style={{width: `${safeWidth-1}px`}}>
        <Draggable axis="x"
                   bounds="parent"
                   onDrag={this.handleDrag}>
          <div className="nice-slider-draggable"
               style={{width: `${draggableWidth}px`}}>
            Drag Me
          </div>
        </Draggable>
      </div>
    )
  }
}

NiceSlider.propTypes = {
  numValues: PropTypes.number.isRequired,
  width: PropTypes.number,
  draggableWidth: PropTypes.number,
  onChange: PropTypes.func,
}


export default NiceSlider;
