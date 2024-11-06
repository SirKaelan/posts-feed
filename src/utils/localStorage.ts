export const saveToLocalStorage = <T>(key: string, value: T): void => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};

export const getFromLocalStorage = <T>(key: string, initialValue: T): T => {
  const serializedValue = localStorage.getItem(key);
  if (serializedValue === null) {
    saveToLocalStorage(key, initialValue);
    return initialValue;
  }
  return JSON.parse(serializedValue) as T;
};
