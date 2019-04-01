import { action, extendObservable } from 'mobx';
import data from './data';

export default class TreeStore {
  constructor() {
    extendObservable(this, data);
  }

  findById = itemId => item => itemId === item.id;

  getWithParent(ids) {
    return ids.reduce((result, id) => {
      const item = this.db.find(this.findById(id));
      if (!result.some(this.findById(id))){
        result.push(item);
      }
      if (item.parent) {
        const parents  = this.getWithParent([item.parent]);
        parents.forEach((item) => {
          if (!result.some(this.findById(item.id))){
            result.push(item);
          }
        })
      }
      return result;
    }, []);
  }

  hasChanges() {
    return this.cache.some(item => item.edited);
  }

  loadToCache = action((itemIds) => {
    const itemsWithParents = this.getWithParent(itemIds);
    itemsWithParents.forEach((dbItem) => {
      const cachedItem = this.cache.find(this.findById(dbItem.id));
      if (cachedItem) {
        Object.assign(cachedItem, dbItem);
      } else {
        this.cache.push({...dbItem});
      }
    })
  });

  addToCache = action((value, parent) => {
    this.cache.push({
      value,
      parent,
      id: Date.now(),
      edited: true,
    })
  });

  saveCacheValue = action((value, id) => {
    const cacheItem = this.cache.find(this.findById(id));
    cacheItem.value = value;
    cacheItem.edited = true;
  });

  applyChanges = action(() => {
    const changedItems = this.cache.filter(item => item.edited);
    changedItems.forEach(item => {
      const dbItem = this.db.find(this.findById(item.id));
      if (dbItem) {
        dbItem.value = item.value;
      } else {
        this.db.push({ ...item })
      }
      item.edited = false;
    })
  });

}