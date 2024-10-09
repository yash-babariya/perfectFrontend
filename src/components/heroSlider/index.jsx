import React, { useState, useRef } from 'react'
import Slider from 'react-slick'
import { FiShoppingBag } from 'react-icons/fi'
import './heroSlider.scss'
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import slide1 from '../../assets/images/sliderImg/slider1.jpg'
import slide2 from '../../assets/images/sliderImg/slider2.jpg'
import slide3 from '../../assets/images/sliderImg/slider3.jpg'
import slide4 from '../../assets/images/sliderImg/slider4.jpg'
import slide5 from '../../assets/images/sliderImg/slider5.jpg'
import slide6 from '../../assets/images/sliderImg/slider6.jpg'
import slide7 from '../../assets/images/sliderImg/slider7.jpg'
import slide8 from '../../assets/images/sliderImg/slider8.jpg'
import slide9 from '../../assets/images/sliderImg/slider9.jpg'
import slide10 from '../../assets/images/sliderImg/slider10.jpg'
import slide11 from '../../assets/images/sliderImg/slider11.jpg'
import slide12 from '../../assets/images/sliderImg/slider12.jpg'
import slide13 from '../../assets/images/sliderImg/slider13.jpg'
import slide14 from '../../assets/images/sliderImg/slider14.jpg'
import slide15 from '../../assets/images/sliderImg/slider15.jpg'
import slide16 from '../../assets/images/sliderImg/slider16.jpg'
import slide17 from '../../assets/images/sliderImg/slider17.jpg'
import slide18 from '../../assets/images/sliderImg/slider18.jpg'
import slide19 from '../../assets/images/sliderImg/slider19.jpg'
import slide20 from '../../assets/images/sliderImg/slider20.jpg'
import slide21 from '../../assets/images/sliderImg/slider21.jpg'
import slide22 from '../../assets/images/sliderImg/slider22.jpg'

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderRef = useRef(null)

    const slides = [
        { id: 1, image: slide1 },
        { id: 2, image: slide2 },
        { id: 3, image: slide3 },
        { id: 4, image: slide4 },
        { id: 5, image: slide5 },
        { id: 6, image: slide6 },
        { id: 7, image: slide7 },
        { id: 8, image: slide8 },
        { id: 9, image: slide9 },
        { id: 10, image: slide10 },
        { id: 11, image: slide11 },
        { id: 12, image: slide12 },
        { id: 13, image: slide13 },
        { id: 14, image: slide14 },
        { id: 15, image: slide15 },
        { id: 16, image: slide16 },
        { id: 17, image: slide17 },
        { id: 18, image: slide18 },
        { id: 19, image: slide19 },
        { id: 20, image: slide20 },
        { id: 21, image: slide21 },
        { id: 22, image: slide22 },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        beforeChange: (current, next) => setCurrentSlide(next),

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const nextSlides = () => {
        sliderRef.current.slickNext()
    }

    const prevSlides = () => {
        sliderRef.current.slickPrev()
    }

    return (
        <div className='container'>
            <div className='hero-slider'>
                <div className="hero-slider__main">
                    <Slider ref={sliderRef} {...settings} className="hero-slider__slides">
                        {slides.map((slide) => (
                            <div className='hero-slider__slide-wrapper' key={slide.id}>
                                <div className="hero-slider__slide">
                                    <img src={slide.image} alt={`Slide ${slide.id}`} />
                                    <button className="hero-slider__basket">
                                        <FiShoppingBag />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className="hero-slider__controls">
                        <div className="hero-slider__counter">
                            <span>{currentSlide + 1}</span>
                            <span>—{slides.length}</span>
                        </div>
                        <div className="hero-slider__arrows">
                            <button onClick={prevSlides}><GoArrowLeft /></button>
                            <button onClick={nextSlides}><GoArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
