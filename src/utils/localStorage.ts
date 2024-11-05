export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (err) {
    console.error("Could not save to localStorage:", err);
  }
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue) as T;
  } catch (err) {
    console.error("Could not retrieve data from localStorage:", err);
    return null;
  }
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
