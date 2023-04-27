// import React, { useState } from 'react';
// import { Polygon, Image, Stage, Layer } from 'react-konva';

// function SidebarImage () {



// const PolygonHighlight = ({ points, fill, onMouseEnter, onMouseLeave }) => (
//   <Polygon
//     points={points}
//     fill={fill}
//     onMouseEnter={onMouseEnter}
//     onMouseLeave={onMouseLeave}
//   />
// );

// const ImageWithPolygonHighlight = ({ image, polygonPoints, highlightFill }) => {
//   const [fill, setFill] = useState('transparent');

//   const handleMouseEnter = () => {
//     setFill(highlightFill);
//   };

//   const handleMouseLeave = () => {
//     setFill('transparent');
//   };

//   return (
//     <>
//       <Image image={image} />
//       <PolygonHighlight
//         points={polygonPoints}
//         fill={fill}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       />
//     </>
//   );
// }
// }

// export default SidebarImage;
