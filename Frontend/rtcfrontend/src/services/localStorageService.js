export default class LocalStorage {
  static setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  static getItem = (key) => {
    const data = localStorage.getItem(key);
    return data;
  };
}
