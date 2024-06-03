// import logo from './logo.svg';
import React,{useState,useEffect} from 'react'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import CalendarController from './components/CalendarController';
import './App.css';

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setAllTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [completedTodos,setCompletedTodos]=useState([]);
  const [currentEdit,setCurrentEdit]=useState("");
  const [currentEditedItem,setCurrentEditedItem]=useState("")
  const [zoomLevel, setZoomLevel] = useState(100);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState([]);

  // to add todo list 
  const handlAddToDo=()=>
    {
      let newTodoItem={
        title:newTitle,
        description:newDescription
      }
      let updatedTodoArr=[...allTodos];
      updatedTodoArr.push(newTodoItem);
      setAllTodos(updatedTodoArr);
      localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
    } 
   
    // ToDO Delete 
    const handlDeleteTodo=(index)=>
      {
      let reducedTodo=[...allTodos];
      reducedTodo.splice(index,1);
      setAllTodos(reducedTodo);
      localStorage.setItem('todolist', JSON.stringify(reducedTodo));
      }

      // completed Todos 

      const handlCompletedtodos=(index)=>
        {
          let now=new Date();
          let dd=now.getDate();
          let mm=now.getMonth()+1;
          let yyyy=now.getFullYear();
          let hh = now.getHours();
          let min = now.getMinutes();
          let sec=now.getSeconds();
          let completedOn=dd+'-'+mm+'-'+yyyy+' at '+hh+':'+min+':'+sec;

          let filtredItems={
            ...allTodos[index],
            completedOn:completedOn
          }
          let updatedCompletedArr=[...completedTodos];
          updatedCompletedArr.push(filtredItems);
          setCompletedTodos(updatedCompletedArr);
          handlDeleteTodo(index);
          localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
        }
        
        // delete completed todos 
        const handlCompletedDeleteTodo=(index)=>
          {
         
            let reducedTodo=[...completedTodos];
      reducedTodo.splice(index,1);
      setCompletedTodos(reducedTodo);
      localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));

          }

          // edit todos 
          const handlEdit=(index,item)=>
            {
              setCurrentEdit(index);
              setCurrentEditedItem(item);
            }

            
            const handleUpdateTitle=(value)=>{
                  setCurrentEditedItem((prev)=>
                  {
                    return {...prev,title:value}
                  })
            }
            const handleUpdateDescription=(value)=>{
              setCurrentEditedItem((prev)=>
                {
                  return {...prev,description:value}
                })
            }
            const handlUpdtaeToDo=()=>
              {
                 let newTodo=[...allTodos];
                 newTodo[currentEdit]=currentEditedItem;
                 setAllTodos(newTodo);
                 setCurrentEdit("");
              }

              // function to ZoomIn and ZoomOut 
              const zoomIn = () => {
                if (zoomLevel < 200) {
                  setZoomLevel(zoomLevel + 10);
                }
              };
            
              
              const zoomOut = () => {
                if (zoomLevel > 70) {
                  setZoomLevel(zoomLevel - 10);
                }
              };

              useEffect(() => {
                let savedTodo=JSON.parse(localStorage.getItem('todolist')); //todolist is a key
                let svaedCompletedTodos=JSON.parse(localStorage.getItem('completedTodos'))
                  if(savedTodo)
                    {
                    setAllTodos(savedTodo);
                  }
                  if(svaedCompletedTodos)
                    {
                      setCompletedTodos(svaedCompletedTodos)
                    }
              },[])

              // calendar 
              const handleDateChange = (date) => {
                setSelectedDate(date);
              };
          

  return (
    <div className="App" style={{ zoom: `${zoomLevel}%` }}>
      <h1>My To Do List</h1>
      <div className='todo-wrapper'>
        
      <div className="calendar-icon" onClick={toggleCalendar}>
          <FiCalendar />
        </div>
        {isCalendarVisible && (
          <div className="calendar-container">
            <CalendarController handleDateChange={handleDateChange} />
          </div>
        )}

        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=> setNewTitle(e.target.value)}placeholder="what's the task name" />
          </div>

          <div className='todo-input-item'>
            <label>Discription</label>
            <input type="text" value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} placeholder="what's the task Discription" />
          </div>

          <div className='todo-input-item'>
          <button type='button' onClick={handlAddToDo}className='primaryBtn'>Add Task</button>
          </div>

        </div>

        <div className='btn-area'> 
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=> setIsCompleteScreen(false)}>ToDo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=> setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          
          {isCompleteScreen===false && allTodos.map((item,index)=>
          {
            
              if(currentEdit===index)
                {
                  return(
                  <div className='edit-wrapper' key={index}>
                    <input placeholder='updated' onChange={(e)=> handleUpdateTitle(e.target.value)} value={currentEditedItem.title} />

                    <textarea rows={2} placeholder='updated' onChange={(e)=> handleUpdateDescription(e.target.value)} value={currentEditedItem.description} />

                    <button type='button' onClick={handlUpdtaeToDo}className='primaryBtn'>Update</button>
                    </div>
                  )
                }
              else{
            return(
              <div className='todo-list-item'key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            
            <div>
           <AiOutlineDelete className='icon' onClick={()=>handlDeleteTodo(index)} title='want to delete'/>
          <BsCheckLg  className='check-icon'onClick={()=> handlCompletedtodos(index)} title='completed?'/>
          <AiOutlineEdit className='check-icon'onClick={()=> handlEdit(index,item)} title='Edit?'/>
           </div>
          </div>
            )
          }
          })}
          
            {isCompleteScreen===true && completedTodos.map((item,index)=>
          {
            return(
              <div className='todo-list-item'key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>completed On:{item.completedOn}</small></p>
            </div>
            
            <div>
           <AiOutlineDelete className='icon' onClick={()=>handlCompletedDeleteTodo(index)} title='want to delete'/>
         
           </div>
          </div>
            )
          })}
          
          
        </div>
        <div className="zoom-buttons">
          <button onClick={zoomIn}>+</button>
          <button onClick={zoomOut}>-</button>
        </div>
        <div>
        <CalendarController handleDateChange={handleDateChange} />
        <div className="completed-tasks">
        <h2>Completed Tasks for {selectedDate.toDateString()}</h2>
      </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
