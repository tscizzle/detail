import moment from 'moment';


const introduction0 =
`_detail_ is a UI`;
const introduction1 =
`1 a little more deets

ya? you like?`;
const introduction2 =
`2 medium deets

i've got a lot of stuff to say

thats all actually, kinda a lot i guess`;
const introduction3 =
`this is 3

i have many things to say

i have to say more than 2, but actually less than 4.

interesting.
i conclude.`;
const introduction4 =
`4

this is 4

i have tons of detail in 4, it's nuts how much detail i have in 4.

this is an aside, but 4 is cool. its my most natural amount that i say, since i elaborate constantly

wow, aaaanyway, getting back to it

this is 4, and i like 4

i conclude 4

just repeat it again to reiterate, and to make it mad long

4

this is 4

i have tons of detail in 4, it's nuts how much detail i have in 4.

this is an aside, but 4 is cool. its my most natural amount that i say, since i elaborate constantly

wow, aaaanyway, getting back to it

this is 4, and i like 4

i conclude 4`;

const DETAIL_INTRODUCTION_POST = {
  name: 'introduction',
  title: 'detail: an introduction',
  timePosted: moment('2017-08-19'),
  author: 'Tyler Singer-Clark',
  content: [
    introduction0,
    introduction1,
    introduction2,
    introduction3,
    introduction4,
  ],
};


export default DETAIL_INTRODUCTION_POST;