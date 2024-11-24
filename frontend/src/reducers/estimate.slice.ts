import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RideEstimateDto } from '../providers/dtos/ride-estimate.dto';

export interface StoredRideEstimateDto extends RideEstimateDto {
  customerId: string;
  originString: string;
  destinationString: string;
}

const getEstimateFromLocalStorage = (): StoredRideEstimateDto | undefined => {
  const localItem = localStorage.getItem('estimate');

  if (
    localItem !== undefined &&
    localItem !== '' &&
    localItem !== 'undefined' &&
    localItem !== null
  ) {
    return JSON.parse(localItem) as StoredRideEstimateDto;
  }

  return undefined;
};

export interface EstimateSliceState {
  estimate: StoredRideEstimateDto | undefined;
}

const initialState: EstimateSliceState = {
  estimate: getEstimateFromLocalStorage(),
};

export const estimateSlice = createSlice({
  name: 'estimate',
  initialState,
  reducers: {
    setEstimate: (
      state,
      { payload }: { payload: StoredRideEstimateDto | undefined }
    ) => {
      localStorage.setItem('estimate', JSON.stringify(payload));
      return { ...state, estimate: payload };
    },
  },
});

export const { setEstimate } = estimateSlice.actions;

export const selectEstimate = (state: RootState) => state.estimate;

export default estimateSlice.reducer;
