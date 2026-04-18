import "./ImageSlideShow.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import img1 from '../images/carousel/img1.jpg'
import img2 from '../images/carousel/img2.jpg'
import img3 from '../images/carousel/img3.jpg'
import img4 from '../images/carousel/img4.jpg'
import img5 from '../images/carousel/img5.jpg'

function ImageSlideShow(){
    const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
    };
    return(
        <div className="slideContainer">
        <Carousel responsive={responsive}>
        <div className='card'>
            <img src={img1} alt="image1" />
        </div>
        <div className='card'>
            <img src={img2} alt="image2" />
        </div>
        <div className='card'>
            <img src={img3} alt="image3" />
        </div>
        <div className='card'>
            <img src={img4} alt="image4" />
        </div>
        <div className='card'>
            <img src={img5} alt="image5" />
        </div>
        </Carousel>
        </div>
    )
}
export default ImageSlideShow;