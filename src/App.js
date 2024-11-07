import { useState } from 'react';
import './index.css'
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 2, packed: false }
];






export default function App() {

  const [items,setItem] = useState(initialItems)

  function handleAddNewItem(item){
    setItem(items=>[...items,item])
  }

  function handleDeleteItem(id){
    setItem(items=>items.filter(item=>item.id !== id))
  }

  function handleToggleItem(id){
    setItem((items)=>items.map(item=>item.id===id?{...item,packed : !item.packed}:item))
  }

  function handleclearList(){
    const confirmed = window.confirm('are you sure about this decision')
    if(confirmed) setItem([])
  }

  return <div className='app'>
    <Logo />
    <Form onAddItem={handleAddNewItem}/>
    <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleclearList}/>
    <Stats items={items}/>
  </div>
}


function Logo(){
  return <h1>Far Away</h1>
}


function Form({onAddItem}){
  const [description,setDescription] = useState("")
  const [quantity,setQuantity] = useState(1)



  function handleForm(e){
    e.preventDefault()
    if(!description) return
    const newItem = {description, quantity, packed : false, id : Date.now()}
    console.log(newItem)
    onAddItem(newItem)

    setDescription("")
    setQuantity(1)


  }
  return <form className="add-form" onSubmit={handleForm}>
    <h3>What Do You Need For Your Trip</h3>
    <select name="" id="" value={quantity} onChange={(e)=>setQuantity (Number(e.target.value))}>
      {Array.from({length:20},(_,i)=>i+1).map(num => <option value={num} key={num}>{num}</option>)}
    </select>
    <input type="text" placeholder='item..' value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button>Add</button>
  </form>
}


function PackingList({items , onDeleteItem, onToggleItem, onClearList}){
  const [sortBy, setSortBy] = useState("input")
  let sortedItems;
  if(sortBy === 'input') sortedItems = items
  if(sortBy === 'description') sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description))
  if(sortBy === 'packed') sortedItems = items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
  

  return <div className='list'>
    <ul>
      {sortedItems.map(item=><Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>)}
    </ul>
    <div className='actions'>
      <select name="" id="" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
        <option value="input">sort by input</option>
        <option value="description">sort by description</option>
        <option value="packed">sort by packed</option>
      </select>
      <button onClick={onClearList}>clear list</button>
    </div>
  </div>
}


function Item({item, onDeleteItem, onToggleItem}){
  return <li><input type='checkbox' value={item.packed} onChange={()=>{onToggleItem(item.id)}} /><span style={item.packed ? {textDecoration : 'line-through'} : {}}>{item.quantity} {item.description}</span>
  <button onClick={()=>onDeleteItem(item.id)}>❌</button>
  </li>
}


function Stats({items}){
  if(!items.length) return <p className='footer'><em>start packing items</em></p>
  const numItems = items.length
  const numPacked = items.filter(item=>item.packed).length
  const percentage = Math.round(numPacked/numItems*100)
  return <footer className='stats'>
   <em>{percentage===100 ? 'you are ready to go' : `You have ${numItems} items on your list and you already packed ${numPacked} ${percentage}%`}</em>
  </footer>
}

