import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmails, fetchEmailBody, toggleRead } from '../redux/store';

const EmailList = () => {
  const dispatch = useDispatch();
  const { emailList, currentPage, favorites, filter, reads } = useSelector((state) => state.emails);

  const [selectedEmailId, setSelectedEmailId] = useState(null); // State to track the selected email

  useEffect(() => {
    dispatch(fetchEmails(currentPage));
  }, [dispatch, currentPage]);

  const filteredEmails = emailList.filter((email) => {
    if (filter.read && !reads.includes(email.id)) return false;
    if (filter.favorite && !favorites.includes(email.id)) return false;
    if (filter.unread && reads.includes(email.id)) return false;
    return true;
  });

  // Function to convert 24-hour time to 12-hour format
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
  

  return (
    <>
      <ul className='email-list'>
        {filteredEmails.map((email) => (
          <li
            className='email'
            key={email.id}
            onClick={() => {
              dispatch(fetchEmailBody(email.id));
              dispatch(toggleRead(email.id));
              setSelectedEmailId(email.id); // Update selected email on click
            }}
            style={{
              border: selectedEmailId === email.id ? '2px solid #88a39bf0' : 'none', // Change border color if selected
              cursor: 'pointer', // Change cursor to pointer
            }}
          >
            <article className='mail-details'>
              <div className="avatar">
                {email.from.name.charAt(0).toUpperCase()}
              </div>
              <div className='initialDetails'>
                <p>
                  From: <span style={{ fontWeight: 'bold', color: '#636363' }}>{email.from.name}</span>
                  &lt;<span style={{ fontWeight: 'bold', color: '#636363' }}>{email.from.email}</span>&gt;
                </p>

                <p>
                  Subject: <span style={{ fontWeight: 'bold', color: '#636363' }}>{email.subject}</span>
                </p>

                <p>{email.short_description}</p>
                <footer className='bottom-section'>
                    <p><p>{convertTo12HourFormat(new Date(email.date))}</p></p>
                    {/* Conditional rendering for the Favorite tag */}
                    {favorites.includes(email.id) && (
                                      <span className="favorite-tag" style={{ color: 'red', fontWeight: 'bold', marginLeft: '5px' }}>
                                        Favorite
                                      </span>
                                    )}
                </footer>
                

               
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EmailList;
