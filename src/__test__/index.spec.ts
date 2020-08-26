import { useTimeTravel } from '../index'
import { renderHook, act } from '@testing-library/react-hooks';

const reducer = (state: number, action: { type: string, payload: number }) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    case 'SUB':
      return state - action.payload;
    default:
      return state;
  }
}

test('test reducer', () => {
  const initialState: number = 2;
  const { result } = renderHook(() => useTimeTravel(
    reducer,
    initialState
  ));
  const { dispatch } = result.current;
  act(() => dispatch({ type: 'ADD', payload: 23 }))
  act(() => dispatch({ type: 'SUB', payload: 2 }))
  act(() => result.current.goToPast())
  act(() => result.current.goToFuture())
  act(() => result.current.doReset())
})