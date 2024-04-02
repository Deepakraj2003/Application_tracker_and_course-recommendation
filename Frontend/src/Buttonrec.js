import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import app from "./Config";
import { getDatabase, ref, get } from "firebase/database";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export default function Buttonrec() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL parameter
  const [data, setData] = useState(null); // State to hold the fetched data
  const [value, setValue] = useState(null); // State to hold the
  
  useEffect(() => {
    if (id) {
      fetchData(); // Fetch data only when ID exists
    }
  }, [id]); // Dependency array with 'id' ensures useEffect runs whenever 'id' changes

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `user/${id}`); // Reference specific ID
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      const userData = snapshot.val();
      setData(userData);
      setValue(userData?.Domain?.replace(/\s+/g, '').toLowerCase()); // Remove spaces and convert to lowercase
    } else {
      // alert("Data not found for this ID");
    }
  }

  return (
    <>
      <Button 
        variant="contained" 
        onClick={() => {
          navigate(`/course/${value}`);
          console.log(value);
        }} 
        startIcon={<AutoStoriesIcon />} 
        endIcon={<DoubleArrowIcon />}
      >
        Course Recommendation 
      </Button>
    </>
  )
}
