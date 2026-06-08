import * as React from 'react';

export function useControlledState(props) {
  const { value, defaultValue, onChange } = props;

  const [state, setInternalState] = React.useState(value !== undefined ? value : (defaultValue));

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (value !== undefined) setInternalState(value);
  }, [value]);

  const setState = React.useCallback((next, ...args) => {
    setInternalState(next);
    onChange?.(next, ...args);
  }, [onChange]);

  return [state, setState];
}
