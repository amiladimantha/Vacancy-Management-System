import React from 'react';
import { Carousel, Card } from 'antd';

const LandingPage = () => {
  const images = [    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',    'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__480.jpg',    'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__480.jpg'  ];
  

  return (
    <div style={{ textAlign: 'center' }}>
      <Carousel style={{ margin: 'auto' }}>
        {images.map(image => (
          <div key={image}>
            <img src={image} alt="carousel-image" style={{ height: '500px', objectFit: 'cover' }} />
          </div>
        ))}
      </Carousel>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '50px 0' }}>
        {[1, 2, 3, 4, 5].map(num => (
          <Card
            key={num}
            hoverable
            style={{ width: 300, margin: '0 20px 20px 20px' }}
            cover={<img alt="card-image" src={`https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg`} style={{ height: '200px', objectFit: 'cover' }} />}
          >
            <Card.Meta title={`Card ${num}`} description="Some card details here." />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;

