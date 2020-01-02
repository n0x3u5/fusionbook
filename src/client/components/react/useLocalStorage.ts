import { useEffect, useState } from 'react';
import { isClient, noOp } from './utils';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T, Dispatch<SetStateAction<T>>] => {
  if (!isClient) {
    return [initialValue as T, noOp];
  }

  const [state, setState] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(
          key,
          JSON.stringify(initialValue)
        );
        return initialValue;
      } else {
        return JSON.parse(localStorageValue || 'null');
      }
    } catch {
      // localStorage may throw a SecurityException when the request violates a
      // policy decision, or the origin is not a valid scheme/host/port tuple
      // (this can happen if the origin uses the file: or data: scheme, for
      // example). For example, a user may have their browser configured to
      // deny permission to persist data for the specified origin.
      //
      // JSON.parse and JSON.stringify could also throw.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch {
      // localStorage may throw a SecurityException when the request violates a
      // policy decision, or the origin is not a valid scheme/host/port tuple
      // (this can happen if the origin uses the file: or data: scheme, for
      // example). For example, a user may have their browser configured to
      // deny permission to persist data for the specified origin.
      //
      // JSON.stringify could also throw.
    }
  }, [state]);

  return [state, setState];
};

export default useLocalStorage;
