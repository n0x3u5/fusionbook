import { Story, notes, configs } from '../src/lib/story'
import rating from '../components/html/rating'

const ratingStory = new Story('Rating').addMetas([configs()])

ratingStory.addChapter(
  'vertical',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 0,
      'stroke-width': 5
    }
    rating(args)
  },
  [
    notes('This is the rating as it appears by default.')
  ]
)
ratingStory.addChapter(
  'horizontal',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5
    }
    rating(args)
  },
  [
    notes('This is the rating as it appears by default.')
  ]
)
ratingStory.addChapter(
  'Variable number of stars is undefined',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5
    }
    rating(args)
  },
  [
    notes('Fallback to default 5')
  ]
)

ratingStory.addChapter(
  'Variable number of stars is not a valid number',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5
    }
    rating(args)
  },
  [
    notes('Fallback to default and show warn message in console')
  ]
)
ratingStory.addChapter(
  'Variable number of stars',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5,
      'numberOfStars': 7
    }
    rating(args)
  },
  [
    notes('Fill color for rating is default')
  ]
)
ratingStory.addChapter(
  'Variable number of stars Vertical',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 0,
      'stroke-width': 5,
      'numberOfStars': 7
    }
    rating(args)
  },
  [
    notes('Display vertical')
  ]
)
ratingStory.addChapter(
  'Variable number of stars Number of stars is not a integer',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 0,
      'stroke-width': 5,
      'numberOfStars': 7.777
    }
    rating(args)
  },
  [
    notes('Display vertical')
  ]
)
ratingStory.addChapter(
  'Fill color for rating is set to fill value',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5
    }
    rating(args)
  },
  [
    notes('Fill color for rating is set to fill value')
  ]
)
ratingStory.addChapter(
  'Value for rating is whole number with user provided stars number',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'post-rating-fill-color': 'green',
      'rating': 3,
      'numberOfStars': 7
    }
    rating(args)
  },
  [
    notes('Fill color for rating is default, default is black n  white')
  ]
)
ratingStory.addChapter(
  'Value for rating is fractional number with user provided stars number rounding off',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'post-rating-fill-color': 'green',
      'rating': 3.333,
      'numberOfStars': 7
    }
    rating(args)
  },
  [
    notes('User provided rating with rounding off')
  ]
)
ratingStory.addChapter(
  'Value for rating is fractional number with user provided stars number 1 digit',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'post-rating-fill-color': 'green',
      'rating': 3.5,
      'numberOfStars': 7
    }
    rating(args)
  },
  [
    notes('User provided rating with 1 digit')
  ]
)
ratingStory.addChapter(
  'Fill color for rating is user defined',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5,
      'pre-rating-fill-color': 'green',
      'post-rating-fill-color': 'red'
    }
    rating(args)
  },
  [
    notes('Fill color for rating is user defined')
  ]
)
ratingStory.addChapter(
  'Fill color for rating is user defined just one',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5,
      'pre-rating-fill-color': 'green'
    }
    rating(args)
  },
  [
    notes('Fill color for rating is default')
  ]
)
ratingStory.addChapter(
  'Fill color for rating is user defined just one',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'fill': 'red',
      'stroke': 'blue',
      'direction': 1,
      'stroke-width': 5,
      'post-rating-fill-color': 'green'
    }
    rating(args)
  },
  [
    notes('Fill color for rating is default')
  ]
)
ratingStory.addChapter(
  'Stroke color for rating is user defined just one',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'post-rating-fill-color': 'green',
      'post-stroke-color': 'aqua'
    }
    rating(args)
  },
  [
    notes('Stroke color for rating is default')
  ]
)
ratingStory.addChapter(
  'Stroke color for rating is user defined just one',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'post-rating-fill-color': 'green',
      'pre-stroke-color': 'orange'
    }
    rating(args)
  },
  [
    notes('Stroke color for rating is default')
  ]
)
ratingStory.addChapter(
  'Stroke color for rating is user defined',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'post-rating-fill-color': 'green',
      'pre-stroke-color': 'orange',
      'post-stroke-color': 'brown'
    }
    rating(args)
  },
  [
    notes('Stroke color for rating is default')
  ]
)
ratingStory.addChapter(
  'Value for rating is whole number with default 5 stars',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'post-rating-fill-color': 'green',
      'pre-stroke-color': 'orange',
      'post-stroke-color': 'brown',
      'rating': 3
    }
    rating(args)
  },
  [
    notes('Fill color for rating is default')
  ]
)
ratingStory.addChapter(
  'Combining all',
  story => {
    let args = {
      'container': story,
      'height': '700px',
      'width': '700px',
      'direction': 1,
      'fill': 'red',
      'stroke': 'blue',
      'stroke-width': 5,
      'pre-rating-fill-color': 'red',
      'post-rating-fill-color': 'green',
      'pre-stroke-color': 'orange',
      'post-stroke-color': 'brown',
      'rating': 3.34,
      'numberOfStars': 10
    }
    rating(args)
  },
  [
    notes('Fill color for rating is default')
  ]
)

export default ratingStory
