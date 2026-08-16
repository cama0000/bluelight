import { setLoading } from '@/store/loading/loadingSlice';
import { useDispatch } from 'react-redux';

const useSetLoading = (isLoading: boolean) => {
  const dispatch = useDispatch();

  dispatch(setLoading({ isLoading }));
};

export default useSetLoading;