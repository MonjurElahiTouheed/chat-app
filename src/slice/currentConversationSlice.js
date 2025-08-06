import { createSlice } from '@reduxjs/toolkit'

export const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState: {
    friend: localStorage.getItem('currentChatInfo') ? JSON.parse(localStorage.getItem('currentChatInfo')) : null
  },

  reducers: {
    currentConversationInfo: (state, action) => {
        console.log(state.value);
        console.log(action.payload);
        state.friend = action.payload;
    },
  }
})

export const { currentConversationInfo } = currentConversationSlice.actions

export default currentConversationSlice.reducer