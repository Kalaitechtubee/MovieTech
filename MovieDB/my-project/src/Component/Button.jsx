// import React from 'react'


// export const Button = () => {

//   const [page, setPage] = useState(4);
    
//   const incrementPage = () => {
//     setPage(page + 1);
//   };

//   // Decrement function for page
//   const decrementPage = () => {
//     setPage(page - 1);
//   };
//   return (
//     <div className="mt-10 flex gap-5">
//     <h1>Counter: {page}</h1>
//     <button className="bg-red-500 rounded-lg p-5" onClick={incrementPage}>next</button>
//     <button className="bg-red-500 rounded-lg p-5" onClick={decrementPage} >Back</button>

// </div>

//   )
// }

// Button Component accepts `page` and `setPage` as props
export const Button = ({ page, setPage }) => {

  const incrementPage = () => {
    setPage(page + 1);
  };

  const decrementPage = () => {
    if (page > 1) {
      setPage(page - 1); // Prevent going below page 1
    }
  };

  const resetPage = () =>{
    setPage(1)
  }

  return (
    <div className="mt-10 flex gap-5">
      <h1>Page: {page}</h1>
      <button className="bg-red-500 rounded-lg p-5" onClick={incrementPage}>
        Next
      </button>
      <button className="bg-red-500 rounded-lg p-5" onClick={decrementPage}>
        Back
      </button>
      <button className="bg-red-500 rounded-lg p-5" onClick={resetPage}>
        Reset
      </button>
    </div>
  );
};


