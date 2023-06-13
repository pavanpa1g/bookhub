import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import NavBar from '../Navbar'
import {bgColor} from '../CssConstants/constants'

import './index.css'
import SomethingWentWrong from '../SomethingWentWrong'
import LoaderComponent from '../LoaderComponent'
import BookItem from '../BookItem'
import SearchNotFound from '../SearchNotFound'
import BottomNavBar from '../BottomNavBar'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const BookShelves = () => {
  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    bookshelvesList[0].value,
  )

  const [booksData, setBooksData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [wentWrong, setWentWrong] = useState(false)

  const jwtToken = Cookies.get('jwt_token')

  const fetchBooksData = async () => {
    console.log('try-again-clicked')
    setIsLoading(true)
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${selectedCategory}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok === true) {
        setBooksData(data.books)
        setIsLoading(false)
        setWentWrong(false)
      } else {
        setWentWrong(true)
      }
    } catch (error) {
      setWentWrong(true)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBooksData()
  }, [selectedCategory])

  const SearchItem = () => {
    const onInputChange = event => {
      setSearchInput(event.target.value)
    }
    return (
      <div className="search-input-bg-container">
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          className="search-input"
          onChange={onInputChange}
        />
        <button
          type="button"
          className="search-logo-container"
          onClick={() => fetchBooksData()}
          testid="searchButton"
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  const ListCategoryItem = ({item}) => {
    const {label, value} = item
    const selectedStyle =
      value === selectedCategory ? 'selected-list-item' : 'list-item-title'
    return (
      <button
        type="button"
        className={`list-item-title ${selectedStyle}`}
        onClick={() => setSelectedCategory(item.value)}
      >
        {label}
      </button>
    )
  }

  const ListCategoryLgItem = ({item}) => {
    const {value, label} = item

    return (
      <li
        className={`lg-list-item-category ${
          value === selectedCategory ? 'lg-selected-li-item' : ''
        }`}
        onClick={() => setSelectedCategory(value)}
      >
        {label}
      </li>
    )
  }

  const ItemsComponent = () => (
    <>
      {booksData.length === 0 ? (
        <div className="search-not-found-bookshelves-container">
          <SearchNotFound searchInput={searchInput} />
        </div>
      ) : (
        <ul className="bookshelves-books-item-container">
          {booksData.map(item => (
            <BookItem key={item.id} item={item} />
          ))}
        </ul>
      )}
      <BottomNavBar />
    </>
  )

  const LoadOrItem = () => (
    <>
      {isLoading ? (
        <div className="some-thing-went-wrong-book-shelves">
          <LoaderComponent />
        </div>
      ) : (
        <ItemsComponent />
      )}
    </>
  )

  return (
    <>
      <NavBar />
      <div
        style={{backgroundColor: bgColor}}
        className="bg-bookshelves-container"
      >
        <div className="sm-search-container">{SearchItem()}</div>

        <div className="categories-container">
          <h1 className="bookshelves-head-text">Bookshelves</h1>
          <ul className="category-item-ul">
            {bookshelvesList.map(item => (
              <ListCategoryItem item={item} key={item.id} />
            ))}
          </ul>
        </div>

        <div className="lg-category-container">
          <h1 className="bookshelves-head-text">Bookshelves</h1>
          <ul className="lg-ul-list-category">
            {bookshelvesList.map(item => (
              <ListCategoryLgItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

        <div>
          <div className="lg-category-search-container">
            <h1 className="head-all-books-bookshelves">
              {selectedCategory
                .split('_')
                .map(
                  word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                )
                .join(' ')}
              {' Books'}
            </h1>
            {SearchItem()}
          </div>
          {wentWrong ? (
            <div className="some-thing-went-wrong-book-shelves">
              <SomethingWentWrong tryAgain={fetchBooksData} />
            </div>
          ) : (
            <LoadOrItem />
          )}
        </div>
      </div>
    </>
  )
}

export default BookShelves
