import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Draggable from 'react-draggable';
import { FaHandGrabO, FaHandPaperO } from 'react-icons/lib/fa';
import classNames from 'classnames';


class NiceSlider extends Component {
  static propTypes = {
    numValues: PropTypes.number.isRequired,
    width: PropTypes.number,
    needleWidth: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
    needleClassName: PropTypes.string,
  };

  static defaultProps = {
    width: 200,
    needleWidth: 40,
  };

  state = {
    isBeingClicked: false,
    xPosition: 0,
  }

  totalScrollEvents = 0
  scrollBeginning = null

  componentDidMount() {
    window.addEventListener('wheel', this.handleWheel);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const oldXPosition = prevState.xPosition;
    const newXPosition = this.state.xPosition;
    const { onChange } = this.props;
    if (onChange) {
      const oldValue = this.valueFromPosition({xPosition: oldXPosition});
      const newValue = this.valueFromPosition({xPosition: newXPosition});
      if (newValue !== oldValue) {
        onChange(newValue);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel);
  }

  handleWheel = evt => {
    if (evt.shiftKey) {
      evt.preventDefault(); // don't scroll the page
      this.setState((prevState, props) => {
        const { width, needleWidth } = props;
        const oldXPosition = prevState.xPosition;
        // wheel up yields negative evt.deltaY but should make the needle move positive x
        // also, slow it down by dividing, or else re-renders can't keep up and it gets too jumpy
        const xMove = -evt.deltaY / 20;
        const newXPosition = oldXPosition + xMove;
        const minXPosition = 0;
        const maxXPosition = width - needleWidth;
        const isInBounds = minXPosition <= newXPosition && newXPosition <= maxXPosition;
        return isInBounds ? {xPosition: newXPosition} : {};
      });
    }
  }

  handleDrag = (evt, ui) => {
    const { lastX } = ui;
    this.setState({xPosition: lastX});
  }

  valueFromPosition = ({ xPosition }) => {
    const { numValues, width, needleWidth } = this.props;
    // |--|===========| slider at beginning
    // |===========|--| slider at end
    // |>>>>>>>>>>>|    split this distance into the number of values it must represent
    const widthPerValue = (width - needleWidth) / numValues;
    let value = Math.floor(xPosition / widthPerValue);
    // if the slider is in the furthest position, the value is 1 above max, so bring it back down to the max
    value = Math.min(value, numValues-1);
    return value;
  }

  render() {
    const { width, needleWidth, className, needleClassName } = this.props;
    const { isBeingClicked, xPosition } = this.state;
    const sliderClasses = classNames('nice-slider', {
      [className]: Boolean(className),
    });
    const sliderNeedleClasses = classNames('nice-slider-needle', {
      [needleClassName]: Boolean(needleClassName),
    });
    const position = {
      x: xPosition,
      y: 0,
    };
    return (
      <div className={sliderClasses}
           style={{width: `${width}px`}}>
        <Draggable axis="x"
                   bounds="parent"
                   onDrag={this.handleDrag}
                   onStart={() => this.setState({isBeingClicked: true})}
                   onStop={() => this.setState({isBeingClicked: false})}
                   position={position}>
          <div className={sliderNeedleClasses}
               style={{width: `${needleWidth}px`}}>
            {isBeingClicked
              ? <FaHandGrabO className="nice-slider-needle-icon" />
              : <FaHandPaperO className="nice-slider-needle-icon" />
            }
          </div>
        </Draggable>
      </div>
    )
  }
}


export default NiceSlider;
