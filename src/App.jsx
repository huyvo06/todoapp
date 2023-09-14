/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import reactLogo from './assets/react.svg'
import {React, Reflux, reactMixin} from 'react';
import './App.css'
// import Form from './Form'

function App() {
  const [subject, setSubject] = useState({});
  const [learn,setLearn] = useState( [] );
  const [searchResult, setSearchResult] = useState( [] );
  const [searchStatus, setSearchStatus] = useState({
    text: '',
    status: false,
  });

  const handleOnchange = (e, name)=> {
    setSubject(prev=> ({
      ...prev,
      [name]: e.target.value,
    }));
  }

  const handleSubmit = () => {
    if (!subject.title) {
      alert('vui lòng điền title');
      return;
    }
    if(!subject.last){
      alert('vui lòng điền last');
      return;
    }
    const todoCopy = [...learn]
    todoCopy.push({
      ...subject,
      id: uuidv4(),
      status: 'PENDING',
      color:''
    });
    setSubject({
      title: ''
    });
    localStorage.getItem('subject', JSON.stringify(todoCopy));
    setLearn(todoCopy);
  }
  

  const handleDoingOrNotDoing = (id,status) =>{
    const todoCopy = [...learn]
    const findIndex = todoCopy.findIndex((subject) => subject.id === id);
    todoCopy[findIndex].status = status;
    setLearn(todoCopy);
  }

  const handleDelete = (id,learn) =>{
    const todoCopy = [...learn]
    const filter = todoCopy.filter((subject) => subject.id !== id);
    setLearn(filter);
    setSearchStatus((prev) => ({
      ...prev,
      status: false,
    }));
    setSearchResult([]);
  }
  
  const renderColor = (status) => {
    if(status === 'PENDING'){
      return {
        color : 'blue'
      }
    }
    else if(status === 'DONE'){
      return {
        color: 'green'
      }
    }
    else if(status === 'NOTDONE'){
      return {
        color: 'red'
      }
    }  
  }

  // map, filter, includes, forEach, some, every, Math, splice, split, slice, object, array

  const handleKeyPress = (event, action) => {
    if(event.key === 'Enter'){
      if (action === 'ADD') {
        handleSubmit();
      } else if (action === 'SEARCH') {{
        if (searchStatus.text) {
          setSearchStatus((prev) => ({
            ...prev,
            status: true,
          }));
          const dataFilter = learn.filter((item) => item.title.includes(searchStatus.text.trim()) || item.last.includes(searchStatus.text.trim()));
          setSearchResult(dataFilter);
        } else {
          setSearchStatus((prev) => ({
            ...prev,
            status: false,
          }));
        }
      }}
     
    }
  }

  const handleSearchs = (event) =>{
    setSearchStatus((prev) => ({
      ...prev,
      text: event.target.value,
    }));
  }


  return (
    <> 
      <h1>TODO APP</h1>
      <input type='text' placeholder="Learn" value={subject.title || ''} onChange={(e) => handleOnchange(e, 'title')} onKeyDown={(e) => (handleKeyPress(e, 'ADD'))}/>
      <input type='text' placeholder="Learn" value={subject.last || ''} onChange={(e) => handleOnchange(e, 'last')} onKeyDown={(e) => (handleKeyPress(e, 'ADD'))}/>
      <button onClick={handleSubmit}>Add</button>
      <br />
      <input style={{margin: '30px'}} type='search' placeholder='Search' value={searchStatus.text || ''} onChange={handleSearchs} onKeyDown={(e) => (handleKeyPress(e, 'SEARCH'))}/>
        <table style={{ borderCollapse: 'collapse' }}>
        <thead>
        <tr>
          <td>STT</td>
          <th>Learn</th>
          <th>Describe</th>
          <th>Status</th>
          <th>Done</th>
        </tr> 
        </thead>
       
          <tbody>
          {(searchStatus.status ? searchResult : learn).map((subject,index) => (
            <tr key={uuidv4()}>
              <td>{index + 1}</td>
              <td>{subject.title}</td>
              <td>{subject.last}</td>
              <td style={renderColor(subject.status)}>{subject.status}</td> 
              <td>
                <button className='done' onClick={() => handleDoingOrNotDoing(subject.id,'DONE') }>Done</button>
                <button className='notDone' onClick={() => handleDoingOrNotDoing(subject.id,'NOTDONE') }>NotDone</button>
                <button className='delete' onClick={() => handleDelete(subject.id,learn)}>Delete</button>
              </td>
            </tr>
          ))} 
          </tbody>
        </table>
    </>
  )
}

export default App
