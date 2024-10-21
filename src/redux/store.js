// src/redux/store.js
import { configureStore, createSlice,createAsyncThunk } from '@reduxjs/toolkit';


// Async thunk to fetch the email body
export const fetchEmailBody = createAsyncThunk(
  'emails/fetchEmailBody',
  async (id, { getState }) => {
    // Fetch the email body from the API
    const response = await fetch(`${import.meta.env.VITE_EMAIL_API_URL}/?id=${id}`);
    const data = await response.json();

    // Use getState to access the current Redux state
    const state = getState();
    
    // Retrieve the emailList from the state
    const emailList = state.emails.emailList;

    // Find the email with the matching id from the emailList
    const email = emailList.find((email) => email.id === id);

    if (!email) {
      throw new Error('Email not found');
    }



    // Combine email details (subject, date) with the fetched body
     const combinedEmail = {
      id: email.id,
      name: email.from.name,
      subject: email.subject,
      date: email.date,
      body: data.body,  // API body content
    };

    // Return the combined object
    return combinedEmail;
  }
);
const emailSlice = createSlice({
  name: 'emails',
  initialState: {
    emailList: [],
    emailBody: null,
    currentPage: 1,
    totalEmails: 0,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    reads: JSON.parse(localStorage.getItem('reads')) || [],
    filter: {
      read: false,
      favorite: false,
      unread: false,
    },
  },
  reducers: {
    setEmails: (state, action) => {
      state.emailList = action.payload.emails;
      state.totalEmails = action.payload.total;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    toggleRead: (state, action) => {
      const id = action.payload;
      if (state.reads.includes(id)) {
        return;
      } else {
        state.reads.push(id);
      }
      localStorage.setItem('reads', JSON.stringify(state.reads));
    },
    toggleFilter: (state, action) => {
      const { filterType } = action.payload;
      state.filter[filterType] = !state.filter[filterType];
    },
  },
  extraReducers: (builder) => {
    // Handle the async thunk for fetching email body
    builder
      .addCase(fetchEmailBody.pending, (state) => {
        state.loadingEmailBody = true;
        state.error = null;  // Clear previous errors if any
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.loadingEmailBody = false;
        state.emailBody = action.payload;
          // Set the fetched email body
      })
      .addCase(fetchEmailBody.rejected, (state, action) => {
        state.loadingEmailBody = false;
        state.error = 'Failed to load email body';  // Set an error message
      });
  },
});

export const { setEmails,  setPage, toggleFavorite, toggleFilter , toggleRead, reads } = emailSlice.actions;

export const fetchEmails = (page = 1) => async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_EMAIL_API_URL}/?page=${page}`);
  const data = await response.json();
  dispatch(setEmails({ emails: data.list, total: data.total }));
};

const store = configureStore({
  reducer: {
    emails: emailSlice.reducer,
  },
});

export default store;
