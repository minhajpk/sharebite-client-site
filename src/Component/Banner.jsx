import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // ✅ Uncommented to apply styles
import BannerImage1 from '../assets/banner1.png';
import BannerImage2 from '../assets/banner2.png'; 
import BannerImage3 from '../assets/banner3.png';

const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto lg:mt-10 mb-10">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                stopOnHover={false}
                showArrows={true}
            >
                <div >
                    <img src={BannerImage1} className='lg:rounded-2xl' alt="Banner 1" />
                </div>
                <div>
                    <img src={BannerImage2} className='lg:rounded-2xl' alt="Banner 2" />
                </div>
                <div>
                    <img src={BannerImage3} className='lg:rounded-2xl' alt="Banner 3" />
                </div>
              
                
            </Carousel>
        </div>
    );
};

export default Banner;
