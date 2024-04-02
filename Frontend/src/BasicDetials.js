
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import app from "./Config";
import { getDatabase, ref, get } from "firebase/database";

function Basic() {
  const { id } = useParams(); // Get ID from URL parameter
  const [data, setData] = useState(null); // State to hold the fetched data
  
  useEffect(() => {
    if(id) {
      fetchData(); // Fetch data only when ID exists
    }
  }, [id]); // Dependency array with 'id' ensures useEffect runs whenever 'id' changes

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `user/${id}`);
    const snapshot = await get(dbRef);
  
    if (snapshot.exists()) {
      setData(snapshot.val());
  
      // Set data for the specific ID
      const currentDate = new Date();
      const fetchedDateString = snapshot.val().Date;
      const fetchedDate = new Date(fetchedDateString);
      
      console.log("Current Date:", currentDate);
      console.log("Fetched Date:", fetchedDate);
      console.log("Is Current Date greater than Fetched Date?", currentDate > fetchedDate);
  
      if (currentDate > fetchedDate) {
        alert("Your resume may be outdated. Please update it.");
        window.location.href = 'https://deerajats.streamlit.app/';
      }
    } else {
      handleRedirect();
    }
  }

  const handleRedirect = () => {
    alert("You may be a new user, so register your resume at the new redirecting page.");
    window.location.href = 'https://deerajats.streamlit.app/'; // Redirect to Streamlit App
  };

  return (
    <div className="basic">
      {data && (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{data.Name}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{data.Domain}</td>
            </tr>
            <tr>
              <th>Email Id</th>
              <td>{data.Email}</td>
            </tr>
            <tr>
              <th>Contact No</th>
              <td>{data.Contact}</td>
            </tr>
            <tr>
              <th>ID</th>
              <td>{data.id}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Basic;
