
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../redux/store'; 

const Filters = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.emails);

  return (
    <>
      <section className='filter-component'>

      <p>Filter By;</p>
      
      <div className="filters">
        <button
          onClick={() => dispatch(toggleFilter({ filterType: 'read' }))}
          className={filter.read ? 'active' : ''}
        >
          Read

        </button>

        <button
          onClick={() => dispatch(toggleFilter({ filterType: 'favorite' }))}
          className={filter.favorite ? 'active' : ''}
        >
          Favorite
        </button>

        <button
          onClick={() => dispatch(toggleFilter({ filterType: 'unread' }))}
          className={filter.unread ? 'active' : ''}
        >
          Unread
        </button>
      </div>

      </section>
    
     
    </>
   
  );
}

export default Filters;
