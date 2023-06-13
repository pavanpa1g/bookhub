/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import NavBar from '../Navbar'
import SomethingWentWrong from '../SomethingWentWrong'
import LoaderComponent from '../LoaderComponent'

import './index.css'
import { bgColor } from '../CssConstants/constants'
import BottomNavBar from '../BottomNavBar'

const DetailedBookItem = () => {
    const history = useHistory()
    const { location } = history
    const { pathname } = location
    const id = pathname.split('/')[2]

    const [bookDetail, setBookDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [wentWrong, setWentWrong] = useState(false)

    const token = Cookies.get('jwt_token')

    const fetchBookDetailData = async () => {
        setIsLoading(true)
        setWentWrong(false)
        const url = `https://apis.ccbp.in/book-hub/books/${id}`
        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        }

        try {
            const respone = await fetch(url, options)
            const data = await respone.json()

            if (respone.ok === true) {
                setIsLoading(false)
                setBookDetail(data.book_details)
            } else {
                setIsLoading(false)
                console.log('something wrong')
                setWentWrong(true)
            }
        } catch (error) {
            setWentWrong(true)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBookDetailData()
    },[])

    const LoadOrBookDetails = () => (
        <>
            {isLoading ? (
                <LoaderComponent />
            ) : (
                    <div className="detailed-book-container">
                    <div className="lg-detailed-bg-container">
                    <div className="detail-image-discp-container">
                        <img
                            src={bookDetail.cover_pic}
                            alt={bookDetail.title}
                            className="detailed-img"
                        />
                        <div className='lg-detail-descp-container'>
                        <h1 className="book-detail-title-head bg-detail-title-text-lg">{bookDetail.title}</h1>
                        <p className="book-detail-para-text book-detail-author-name-text bg-detail-text-lg">
                            {bookDetail.author_name}
                        </p>
                        <p className="book-detail-para-text book-details-rating-text bg-detail-text-lg">Avg Rating{" "}
                        <BsFillStarFill color=" #FBBF24" />
                            {/* <img src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686490446/Icon_1_mbp5pd.png"
                                alt="logo"
                                className="star-icon" /> */}
                            {" "}
                            {bookDetail.rating}
                        </p>
                        <p className="book-detail-para-text book-detail-status bg-detail-text-lg">
                            Status:  <span className="span-book-details-status">{bookDetail.read_status}</span>
                        </p>
                        </div>
                        </div>

                        <hr className="horizontal-line" />
                        <h1 className="about-author-text">About Author</h1>
                        <p className="about-author-para">{bookDetail.about_author}</p>
                        <h1 className="about-author-text">About Book</h1>
                        <p className="about-author-para last-para">{bookDetail.about_book}</p>
                        </div>
                        <BottomNavBar />
                    </div>
                )}
        </>
    )

    return (
        <>
            <NavBar />
            <div style={{ backgroundColor: bgColor, minHeight: '91vh' }}>
                {wentWrong ? (
                    <SomethingWentWrong tryAgain={fetchBookDetailData}  />
                ) : (
                        <LoadOrBookDetails />
                    )}
            </div>
        </>
    )
}

export default DetailedBookItem
