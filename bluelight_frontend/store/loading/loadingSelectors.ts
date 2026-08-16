import { RootState } from "../store";

export const selectLoadingState = (state: RootState) => state.loading.isLoading;