import React from 'react';
import { useSelector } from 'react-redux';
import EmailList from './EmailList';
import EmailBody from './EmailBody';
import Filters from './Filters';
import Pagination from './Pagination';

const EmailLayout = () => {
  const { emailBody } = useSelector((state) => state.emails);

  return (
    <div className="app-layout">

      <header className="list">
        <Filters/>
        <Pagination />
      </header>

      <main className='main-part'>
        <section className='email-mapping'>
          <EmailList />
        </section>
        
        {emailBody && (
          <section className="email-body">
            <EmailBody />
          </section>
        )}
      </main>
      
    </div>
  );
};

export default EmailLayout;
