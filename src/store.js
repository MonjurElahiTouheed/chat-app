import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import currentConversationSlice from './slice/currentConversationSlice'


export default configureStore({
  reducer: {
    userInfo: userSlice,
    currentConversationInfo: currentConversationSlice
  }
})