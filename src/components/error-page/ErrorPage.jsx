import React from 'react'
import ErrorImg from '../../assests/error-abstract-concept-illustration-error-webpage-browser-download-failure-page-found-server-request-unavailable-website-communication-problem_335657-938.avif'
const ErrorPage = () => {
    return (
        <div className='text-center justify-content-between mt-5'>
            <h1>Something! wrong here...</h1>
            <div>
                <img className='img-fluid' src={ErrorImg} alt="" />
            </div>
        </div>
    )
}

export default ErrorPage
