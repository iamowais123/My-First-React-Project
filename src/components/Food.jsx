import React, { useEffect, useState } from 'react'

const Food = () => {

  const [foodData, setFoodData] = useState([]);
  const [area, setArea] = useState("Indian");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((res) => res.json())
      .then((data) =>
        setFoodData(data.meals))
  }, [area])

  const submitHandler = async (e) => {
    e.preventDefault();
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
    );
    const data = await api.json();
    setFoodData(data.meals);
    setInputData(" ");
  };

  return (
    <>
      <div className="main w-full min-h-screen bg-black-500 pt-1">
        <div className="button w-full mt-6 flex items-center justify-center gap-x-12">
          <button onClick={() => setArea("indian")} className='px-5 py-2 bg-blue-600 rounded-lg'>
            Indian
          </button>
          <button onClick={() => setArea("canadian")} className='px-5 py-2 bg-blue-600 rounded-lg'>
            Canadian
          </button>
          <button onClick={() => setArea("Americans")} className='px-5 py-2 bg-blue-600 rounded-lg'>
            American
          </button>
          <button onClick={() => setArea("thai")} className='px-5 py-2 bg-blue-600 rounded-lg'>
            Thai
          </button>
          <button onClick={() => setArea("british")} className='px-5 py-2 bg-blue-600 rounded-lg'>
            British
          </button>
          <button onClick={() => setArea("russian")} className='px-5 py-2 bg-blue-600 rounded-lg'>
            Russian
          </button>
        </div>
        <div className="search mt-5 w-screen flex justify-center">
          <form onSubmit={(submitHandler)}>
            <input type="text"
              placeholder='search food by name'
              className='w-80'
              onChange={(e) => setInputData(e.target.value)}
            />
          </form>
        </div>
        <div className="container mx-auto mt-6 flex flex-wrap gap-5 justify-center">
          {foodData.map((el, index) => (
            <div key={index} className="card w-56 rounded-lg shadow-lg overflow-hidden">
              <div className='w-full h-64 overflow-hidden'>
                <img
                  src={el.strMealThumb}
                  alt="food photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-white text-center p-2 text-sm font-semibold">
                {el.strMeal}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  )

}

export default Food