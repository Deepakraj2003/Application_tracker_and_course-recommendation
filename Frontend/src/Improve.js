
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import app from "./Config";
import { getDatabase, ref, get } from "firebase/database";
import './Container.css'; // Import CSS file for styling


function Improve() {
  const { id } = useParams(); // Get ID from URL parameter
  const [skills, setSkills] = useState([]); // State to hold the split skills
  
  useEffect(() => {
    if(id) {
      fetchData(); // Fetch data only when ID exists
    }
  }, [id]); // Dependency array with 'id' ensures useEffect runs whenever 'id' changes

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `user/${id}`); // Reference specific ID
    const snapshot = await get(dbRef);
    
    if(snapshot.exists()) {
      const data = snapshot.val();
      setSkills(splitSkills(data.Areatoimprove)); // Split skills and update state
    } else {
      // alert("Data not found for this ID");
    }
  }

  function splitSkills(data) {
    if (data) {
      const sortedSkills = data.split('. ');
      return sortedSkills;
    }
    return [];
  }

  return (
    <div>
      <ul >
        {skills.map((skill, index) => (
          <li key={index}>{skill}.</li>
        ))}
      </ul>
    </div>
  );
}

export default Improve;
