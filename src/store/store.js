import { configureStore } from '@reduxjs/toolkit'
import matrixReducer from '../store/matrix'

export default configureStore({
  reducer: {
    matrix: matrixReducer,
  },
})