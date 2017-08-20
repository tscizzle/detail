import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Markdown from 'react-markdown';
import Moment from 'react-moment';
import _ from 'lodash';

import { POST_OBJECTS } from '../../constants';
import { postObjShape } from '../../propShapes';

import NiceSlider from '../niceSlider/niceSlider';


class Main extends Component {
  state = {
    selectedPostName: POST_OBJECTS[0].name,
    selectedLevel: 0,
  }

  setSelectedLevel = level => {
    this.setState({selectedLevel: level});
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
                       setSelectedLevelFunc={this.setSelectedLevel} />
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


const LevelSelector = ({ numLevels, setSelectedLevelFunc }) => (
  <div className="level-selector-container">
    {/* TODO: put a tip about the keyboard shortcut above the slider */}
    <NiceSlider numValues={numLevels}
                onChange={val => setSelectedLevelFunc(val)} />
  </div>
)

LevelSelector.propTypes = {
  numLevels: PropTypes.number.isRequired,
  setSelectedLevelFunc: PropTypes.func.isRequired,
}
