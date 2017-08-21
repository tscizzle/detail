import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Markdown from 'react-markdown';
import { Throttle } from 'react-throttle';
import Moment from 'react-moment';
import _ from 'lodash';

import { POST_OBJECTS } from '../../constants/constants';
import { postObjShape } from '../../propShapes';

import NiceSlider from '../niceSlider/niceSlider';
import { DesktopOnly } from '../niceMediaQuery/niceMediaQuery';


class Main extends Component {
  state = {
    selectedPostName: POST_OBJECTS[0].name,
    selectedLevel: 0,
  }

  handleChangeLevel = ({ newLevel }) => {
    this.setState({selectedLevel: newLevel});
  }

  render() {
    const { selectedPostName, selectedLevel } = this.state;
    const selectedPost = _.find(POST_OBJECTS, {name: selectedPostName});
    const numLevels = selectedPost.content.length;
    return (
      <div className="main">
        <Post postObj={selectedPost}
              level={selectedLevel} />
        <LevelSelector numLevels={numLevels}
                       handleChangeLevelFunc={this.handleChangeLevel} />
      </div>
    );
  }
}


export default Main;


const Post = ({ postObj, level }) => {
  const { title, author, content, timePosted } = postObj;
  const text = content[level];
  return (
    <div className="post-container">
      <h1> {title} </h1>
      <div className="post-metadata">
        <div> by {author} </div>
        <div>
          <Moment date={timePosted}
                  format="MMM D, YYYY" />
        </div>
      </div>
      <Markdown source={text} />
    </div>
  )
}

Post.propTypes = {
  postObj: postObjShape.isRequired,
  level: PropTypes.number.isRequired,
}


const LevelSelector = ({ numLevels, handleChangeLevelFunc }) => {
  // setting width here because centering the absolute-positioned selector using
  // left: 0, right: 0, margin: 0 auto, requires the element to have a width and
  // NiceSlider uses width in its calculations so i don't want to handle the
  // width solely in the css where i'd have to keep it up to date with the
  // slider width
  const width = 200;
  const handleChangeSlider = newValue => handleChangeLevelFunc({newLevel: newValue})
  return (
    <div className="level-selector-container"
         style={{width: `${width}px`}}>
      <Throttle time="50" handler="handleWheel">
        <NiceSlider needleClassName="level-selector-needle"
                    numValues={numLevels}
                    width={width}
                    onChange={handleChangeSlider} />
      </Throttle>
      <DesktopOnly>
        <div className="level-selector-shortcut-tip">
          shift - scroll
        </div>
      </DesktopOnly>
    </div>
  )
}

LevelSelector.propTypes = {
  numLevels: PropTypes.number.isRequired,
  handleChangeLevelFunc: PropTypes.func.isRequired,
}
