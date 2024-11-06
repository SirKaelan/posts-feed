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

export const getAllLocalStorageValues = <T>(): T[] => {
  const values: T[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "") as T[];
        values.push(...value);
      } catch (err) {
        console.error(
          `Could not parse value for key ${key} in local storage: `,
          err
        );
      }
    }
  }

  return values;
};
