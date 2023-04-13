import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const[itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const[isUpdating, setIsUpdating] = useState('');
  const[updateItemText, setUpdateItemText] = useState('');


  // add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5500/api/item', {item: itemText})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch (err) {
      console.log(err);
    }
  }

// function to fetch all items , we will use useEffect
const getItemList = async () => {
  try {
    const res = await axios.get('http://localhost:5500/api/items');
    setListItems(res.data);
  }catch (err) {
    console.log(err);
  }
}
useEffect(() => {
  getItemList();
}, [])


// update item
const updateItem = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText})
    const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating)
    setUpdateItemText('');
    setIsUpdating('');
    listItems[updatedItemIndex].item = updateItemText;
    console.log(res.data);
  }catch (err) {
   console.log(err); 
  }
}
// show input fils and ok button when we cklick on update
const renderUpdateForm = () => (

  <form className='update-form' onSubmit={e => {updateItem(e)}}>
      <input className='update-new-input' type="text" placeholder='New Item' onChange={e => {setUpdateItemText(e.target.value)}} value={updateItemText}/>
      <button className='update-new-btn' type="submit" >Update</button>
  </form>

)

// Delete Item By Clicking On Delete
const deleteItem = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
    const newListItem = listItems.filter(item => item._id !== id);
    console.log(res.data);
    setListItems(newListItem);
  }catch (err) {
    console.log(err);
  }
}
  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder="Add Todo" onChange={(e) => {setItemText(e.target.value)}} value={itemText}/>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
          {
            listItems.map(item => {
              return (
              <div className="todo-item" key={item._id}>
                {
                  isUpdating === item._id
                  ?
                  renderUpdateForm()
                  :
                  <>
                    <p className="item-content">{item.item}</p>
                    <button className="update-item" onClick={() => {setIsUpdating(item._id); setUpdateItemText(item.item)}}>Update</button>
                    <button className="delete-item" onClick={() => {deleteItem(item._id)}}>Delete</button>
                  </>
                }
              </div>
              )
            })
          }
      </div>
    </div>
  );
}

export default App;
