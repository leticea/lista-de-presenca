import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {

  const [studentName, setStudentName] = useState(); //o estado tem 2 elementos
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddStudent() {

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]); //[sem o prevState, se torna imutável]
  }

  // [useEffect é executado assim que a interface é renderizada]
  // [é chamado de forma automática, só é necessário declarar ele]  
  // [as {} são o corpo]
  // [o array[] serve para colocar quais são os estados que o useEffect depende, 
  // se estiver vazio, será executado somente uma única vez]
  // [no useEffect não dá pra colocar async direto nele como dá numa função,
  // é necessário criar uma função async dentro dele e chamar a função no final]

  useEffect(() => {
    fetch('https://api.github.com/users/leticea')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  },[]);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)} 
      />

      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time} />) 
      }

    </div>   
  )
}