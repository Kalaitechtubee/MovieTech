// import { Card, Footer, Header } from "../Component/index.js"; // Explicitly specify index.js
// import AllRouters from "../assets/Routers/AllRouters";
// import FeaturedCarousel from "../Component/FeaturedCarousel.jsx";

// const App = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <FeaturedCarousel />
//       <main className="pt-4">
//         <AllRouters />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;
import React from 'react';
import { Card, Footer, Header ,MovieScoreCard } from './Component';
import AllRouters from './assets/Routers/AllRouters';

const App = () => {
  return (
    <div className='bg-black'> 
      <Header />
      <MovieScoreCard/>
      <AllRouters />
    
      <Footer />
    </div>
  );
};

export default App;
