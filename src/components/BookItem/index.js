/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */

import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = ({item}) => {
  const {cover_pic, author_name, rating, read_status, title,id} = item

  return (
  <li className="list-item-book-item">
    <Link className="book-item-container" to={`/books/${id}`}>
      <img src={cover_pic} alt={title} className="book-item-image" />
      <div className="books-item-description-container">
        <h1 className="book-item-title-text">{title}</h1>
        <p className="book-par author-name-text">{author_name}</p>
        <p className="book-par avg-rating-text">
          Avg Rating{" "}
          <BsFillStarFill color=" #FBBF24" />
          {/* <img
            src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686490446/Icon_1_mbp5pd.png"
            alt="star"
            className="star-icon"
          /> */}
          {" "}
          {rating}
        </p>
        <p className="book-par status-text">
          Status: <span className="read-status">{read_status}</span>
        </p>
      </div>
    </Link>
</li>
  )
}

export default BookItem
