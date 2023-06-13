import './index.css'

const SearchNotFound = ({searchInput}) => (
  <div className="search-not-found-container">
    <img
      src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686496027/Group_x8q5t4.png"
      alt="no books"
      className="search-not-found-image"
    />
    <p className="search-not-found-para">
      Your search for {searchInput} did not find any matches.
    </p>
  </div>
)

export default SearchNotFound
