<script>
  import lists from './list-store.js';
  import Topbar from './UI/Topbar.svelte';
  import Bottombar from './UI/Bottombar.svelte';

  let store = "";
  let item = [];
  let storeNames = "";
  let storedList = "";
  let items = "";
  let isLoading = false;
  let addItems = ""; 
  let itemValue = "";
  let newStoreName = "";

  window.addEventListener('load', () => {
    if (storedList.length !== null) {
      storedList = JSON.parse(localStorage.getItem('storedList'));
      lists.setLists(storedList);
      loadList();
    }
  })

  function storeData() {
     localStorage.setItem('storedList', JSON.stringify(storedList));
  }

  function loadList () {
    lists.subscribe(items => {
      storedList = items;
      if(storedList >= 1) {
        storeData();
      }
    });
  }
  
  function add() {
     const listData = {
      id: Math.floor(Math.random() * 100000),
      storeName: store,
      items: item
     }
    lists.addStore(listData);
    loadList();
  }

  function addStoreName() {
    const storeNameData = {
      id: parseInt(event.target.value),
      storeName: newStoreName
    }
    lists.addStoreName(storeNameData);
    storeData();
  }

  function addItem() {
    const itemData = {
      id: parseInt(event.target.value),
      itemValue: itemValue
    } 
    lists.addItem(itemData);
    storeData();
  }

  function removeAll() {
    lists.setLists("");
    storeData();
  }

  function deleteItem() {
    const item = event.target.previousSibling.data;
    const id = parseInt(event.target.value);
    const deleteData = {
      item: item,
      id: id
    }
    lists.removeItem( deleteData);
    storeData();
  }

  function deleteList() {
    const id = event.target.value;
    lists.removeList(id);
    storeData();
  }

</script>

<style>
  header {
    margin: 0;
	  padding: 0;
  }

  main {
    max-height: 100vh;
    max-width: 100vw;
    display: block;
    padding-top: 50px;
  }

  .top-btn {
    position: fixed;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: darkred;
    color: rgb(216, 213, 197);
    font-size: 20px;
    text-shadow: 2px 2px 3px rgb(46, 46, 46);
    font-weight: bold;
  }
  #remove-all {
    margin-right: 30px;
  }

  input {
    border-radius: 5px;
    margin: 4px;
    border: 2px solid rgb(98, 0, 0);
  }

  button {
    margin: 10px;
    background-color: rgb(65, 81, 110);
    color: rgb(216, 213, 197);
    border: 2px solid rgb(65, 81, 110);
    border-radius: 5px;
    box-shadow: 2px 2px 3px rgb(46, 46, 46);
  }

  li {
    list-style: none;
  }

  .list {
    display: block;
    margin: 10px;
    margin-top: 75px;
    padding: 10px;
    background-color: darkred;
    border-radius: 5px;
    color: rgb(216, 213, 197);
    font-size: 20px;
  }

  .delete-btn {
    margin: 10px;
    font-size: 8px;
    background-color: rgb(65, 81, 110);
    color: rgb(216, 213, 197);
    border: 2px solid rgb(65, 81, 110);
    border-radius: 5px;
    box-shadow: 2px 2px 3px rgb(46, 46, 46);
  }

</style>

<header>
  <Topbar></Topbar>
</header>

<main>
  <div class="top-btn">
    <button id="add-list" on:click={add}>Add New List</button>
    <button id="remove-all" on:click={removeAll}>Remove All Lists</button>
  </div>
  {#if storedList.length >= 1}
    {#each storedList as listOfItems}
      <div class="list" id={listOfItems.id}>
        <div class="store">
        {#if listOfItems.storeName === ""}
          <button value="{listOfItems.id}" on:click={deleteList}>Delete List</button>
          <label for="store-name">Store Name:<input type="text" name="store-name" on:input={event => (newStoreName = event.target.value)} ><button value="{listOfItems.id}" on:click={addStoreName}>Add</button></label>
        {:else}
           <button value="{listOfItems.id}" on:click={deleteList}>Delete List</button>
          <h3>{listOfItems.storeName}</h3>
        {/if}
          <label for="add-item">Add Item:<input type="text" name="add-item" on:input={event => (itemValue = event.target.value)} ><button value="{listOfItems.id}" on:click={addItem}>Add</button></label>
        
          <ul>
            {#each listOfItems.items as items}
              <li><input type="checkbox">{items}<button class="delete-btn" value="{listOfItems.id}" on:click={deleteItem}>X</button><hr></li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  {/if}
</main>

<footer>
  <Bottombar></Bottombar>
</footer>