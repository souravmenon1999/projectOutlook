// src/components/EmailBody.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  toggleFavorite } from '../redux/store';


const EmailBody = () => {

  const dispatch = useDispatch();

  const { favorites} = useSelector((state) => state.emails);
  const { emailBody } = useSelector((state) => state.emails);

  const convertTo12HourFormat = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Date options for formatting
    const formattedDate = date.toLocaleDateString(undefined, options); // Format the date
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    const minutesStr = minutes < 10 ? '0' + minutes : minutes; // Add leading zero for minutes if needed
    const formattedTime = `${hours}:${minutesStr} ${ampm}`; // Format the time
  
    return `${formattedDate}, ${formattedTime}`; // Combine date and time
  };
  

  if (!emailBody) return <div>Select an email to view the body</div>;

  return (
    <article className='mail-explanation'>
       <div className="avatar">
          {emailBody.name.charAt(0).toUpperCase()}
        </div> 
        <section>

          <header className='head-part'>
          <h2 style={{ margin: 0, color: '#636363' }}>{emailBody.subject}</h2>

              
                      <button 
              style={{ backgroundColor: '#E54065', color: 'white', borderRadius: '20px'  }} 
              onClick={(e) => { 
                e.stopPropagation(); 
                dispatch(toggleFavorite(emailBody.id)); 
              }}
            >
              {favorites.indexOf(emailBody.id) !== -1 ? 'Unmark Favorite' : 'Mark as Favorite'}
            </button>

          </header>

        
        <time>{convertTo12HourFormat(new Date(emailBody.date))}</time>
        <div dangerouslySetInnerHTML={{ __html: emailBody.body }} />

      </section>
     
    </article>
  );
};

export default EmailBody;
