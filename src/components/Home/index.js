import {useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

import NavBar from '../Navbar'
import {bgColor} from '../CssConstants/constants'
import BottomNavBar from '../BottomNavBar'
import LoaderComponent from '../LoaderComponent'
import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

const Home = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [wentWrong, setWentWrong] = useState(false)

  const history = useHistory()

  const fetchData = async () => {
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }

    try {
      setIsLoading(true)
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        setIsLoading(false)
        setWentWrong(false)
        setBooks(data.books)
      } else {
        setIsLoading(false)
        setWentWrong(true)
      }
    } catch (error) {
      setIsLoading(false)
      setWentWrong(true)
      console.log('something went wrong')
    }

    // console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const SliderComponent = () => (
    <Slider {...settings}>
      {books.map(eachLogo => (
        <Link
          to={`/books/${eachLogo.id}`}
          className="li-item-slick slick-item"
          key={eachLogo.id}
        >
          <div className="slick-item item-logo-container">
            <img
              className="logo-image"
              src={eachLogo.cover_pic}
              alt={eachLogo.title}
            />
            <h1 className="home-book-title">{eachLogo.title}</h1>
            <p className="home-para-text">{eachLogo.author_name}</p>
          </div>
        </Link>
      ))}
    </Slider>
  )

  return (
    <>
      <NavBar />
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div style={{backgroundColor: bgColor}} className="hm-bg-container">
          <h2 className="hm-text-head">Find Your Next Favorite Books?</h2>
          <p className="hm-para-text">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>

          <button
            type="button"
            className="find-books-hm-button"
            onClick={() => history.push('/shelf')}
          >
            Find Books
          </button>
          <div className="slick-bg-container">
            <div className="bg-top-rated-books-button">
              <h3 className="top-books-head-text">Top Rated Books</h3>
              <button
                type="button"
                className="find-books-bg-hm-button"
                onClick={() => history.push('/shelf')}
              >
                Find Books
              </button>
            </div>
            {wentWrong ? (
              <SomethingWentWrong tryAgain={fetchData} />
            ) : (
              <div className="slick-container">{SliderComponent()}</div>
            )}
          </div>
          <BottomNavBar />
        </div>
      )}
    </>
  )
}

export default Home
