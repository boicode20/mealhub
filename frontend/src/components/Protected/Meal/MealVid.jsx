import React from 'react'

const MealVid = ({meal}) => {
   const getEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <div>
      {meal.strYoutube && (
            <div>
              <h3 className='text-[#4b9769] font-semibold'>Video Tutorial:</h3>
              <iframe
                width="100%"
                height="450"
                src={getEmbedUrl(meal.strYoutube)}
                title="Meal Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
    </div>
  )
}

export default MealVid
