import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import app from "./Config";
import { getDatabase, ref, get } from "firebase/database";

function Read() {
  const { id } = useParams(); // Get ID from URL parameter
  const [data, setData] = useState(null); // State to hold the fetched data
  
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
      setData(snapshot.val());
       // Set data for the specific ID
    } else {
      // alert("Data not found for this ID");
    }
  }

  return (
    <div>
      {data && (
        <table>
          <tbody>
          {/* <tr>
              <th>Name</th>
              <td>{data.Name}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{data.Domain}</td>
            </tr> */}
            <tr>
              <th>University</th>
              <td>{data.University}</td>
            </tr>
            <tr>
              <th>Branch</th>
              <td>{data.Branch}</td>
            </tr>
            <tr>
              <th>CGPA</th>
              <td>{data.CGPA}</td>
            </tr>
           
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Read;
