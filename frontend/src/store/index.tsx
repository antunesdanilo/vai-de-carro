import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import estimateReducer from '../reducers/estimate.slice';

export const store = configureStore({
  reducer: {
    estimate: estimateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
