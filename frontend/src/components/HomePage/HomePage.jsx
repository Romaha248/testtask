import React, { useState, useEffect } from 'react'
import { getAllHeroes } from '../../services/heroServices'

function HomePage() {

  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllHeroes(page).then((response) => {
      console.log(response.data.heroes);
    });
  }, [page]);



  return (
    <div>
      <h2>Current Page: {page}</h2>
      <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  )
}

export default HomePage
