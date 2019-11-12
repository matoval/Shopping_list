import { writable } from 'svelte/store';

const lists = writable([]);

const listsStore = {
  subscribe: lists.subscribe,
  setLists: (listsArray) => {
    lists.set(listsArray);
  },
  addStore: storeData => {
    const newStore = {
      ...storeData
    };
    lists.update(items => {
      return [newStore, ...items];
    });
  },
  addItem: itemData => {
    lists.update(items => {
      const updatedStore = {...items.find(store => store.id === itemData.id)};
      updatedStore.items = [...updatedStore.items, itemData.itemValue];
      const storeIndex = items.findIndex(store => store.id === itemData.id);
      const updatedStores = [...items];
      updatedStores[storeIndex] = updatedStore;
      return updatedStores; 
    })
  },
  addStoreName: storeNameData => {
    lists.update(items => {
      const updatedStore = {...items.find(store => store.id === storeNameData.id)};
      updatedStore.storeName = storeNameData.storeName;
      const storeIndex = items.findIndex(store => store.id === storeNameData.id);
      const updatedStores = [...items];
      updatedStores[storeIndex] = updatedStore;
      return updatedStores; 
    })
  },
  removeItem: deleteData => {
    lists.update(i => {
      const updatedStore = {...i.find(store => store.id === deleteData.id)};
      const updatedItem = updatedStore.items.filter(item => item !== deleteData.item);
      if (updatedStore.items >= 1) {
        updatedStore.items = [updatedItem];
      } else {
        updatedStore.items = [];
      }
      const storeIndex = i.findIndex(store => store.id === deleteData.id);
      const updatedStores = [...i];
      updatedStores[storeIndex] = updatedStore;
      return updatedStores; 
    });
  }
}

export default listsStore;