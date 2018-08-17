const localStorageMock = () => {
  const store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    }
  };
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
