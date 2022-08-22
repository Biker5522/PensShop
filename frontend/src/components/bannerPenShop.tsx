import Carousel from 'react-bootstrap/Carousel';
import '../stylesheets/banner.css'
function BannerPensShop() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.reynolds-pens.com/wp-content/uploads/2021/08/Reynolds-Product-Listing-Banner-Fountain-Pen-2.jpg"
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://www.intentionpen.com/wp-content/uploads/2022/05/Intention-Pen-Banner.jpg?x74444"
          alt="Second slide"
        />

      
      </Carousel.Item>
      
    </Carousel>
  );
}

export default BannerPensShop;