import moment from 'moment';


const introduction0 =
`what is it
----------

_detail_ is a UI concept that lets readers see more or less detail on a text post by "zooming" in or out.

Adjust the detail level of this post using the slider at the bottom, or shift + scroll.

_Comment on HackerNews with any thoughts on the concept. Looking forward to discussing them!_`;

const introduction1 =
`what is it
----------

_detail_ is a UI concept that lets readers see more or less detail on a text post by "zooming" in or out.

Use the slider at the bottom to adjust the detail level of this post.

This is about a UI idea, nothing about programmatically summarizing text. The publisher needs to write the piece in a special way for _detail_.

why does it exist
-----------------

For a given topic, different audiences prefer different amounts of detail.

what is to come
---------------

I'd like to try applying _detail_ to various types of text posts.

On the publisher side, there is a way to make the creation of _detail_-friendly posts not require the duplication of work.

***

_Please comment on HackerNews with any thoughts on the concept. Looking forward to discussing them!_`;

const introduction2 =
`what is it
----------

_detail_ is a UI concept that lets readers see more or less detail on a text post by "zooming" in or out.

Use the slider at the bottom to adjust the detail level of this post.

This is about a UI idea, nothing about programmatically summarizing text. The publisher needs to write the piece in a special way for _detail_.

why does it exist
-----------------

For a given topic, different audiences prefer different amounts of detail. The tradeoff between brevity and depth has always frustrated me.

what is to come
---------------

There are a bunch of areas to which I'd like to try applying _detail_, including but not limited to textbooks, tutorials, and blog posts.

There is a publisher experience that goes hand in hand with this reader experience. Taking advantage of the writing process of starting with an outline, and iteratively fleshing out sections with more and more detail, a publisher can write 1 version as they already do, but yield the ~5 versions necessary to enable _detail_'s reader experience without any extra work.

***

_Please comment on HackerNews with any thoughts on the concept. Looking forward to discussing them!_`;

const introduction3 =
``;

const introduction4 =
``;

const DETAIL_INTRODUCTION_POST = {
  name: 'introduction',
  title: 'detail: an introduction',
  timePosted: moment('2017-08-19'),
  author: 'Tyler Singer-Clark',
  content: [
    introduction0,
    introduction1,
    introduction2,
    // introduction3,
    // introduction4,
  ],
};


export default DETAIL_INTRODUCTION_POST;
