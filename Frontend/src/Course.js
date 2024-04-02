import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './course.css'

function Course() {
  const { value } = useParams(); // Get keyword from URL parameter
  const [courses, setCourses] = useState([]);
  let keyword = value.trim();
  
  // Adjust keywords
  if (keyword === "fullstackdeveloper") {
    keyword = "fullstack";
  } else if (keyword === "webdeveloper") {
    keyword = "web";
  }else if (keyword === "fullstackwebdeveloper") {
    keyword = "fullstack";
  } else if (keyword === "androiddeveloper") {
    keyword = "android";
  }else if (keyword === "reactdeveloper") {
    keyword = "react";
  }else if (keyword === "datascience") {
    keyword = "data science";
  }else if (keyword === "machinelearning") {
    keyword = "machine";
  }else if (keyword === "deeplearning") {
    keyword = "deep";
  }
  else if (keyword === "testing") {
    keyword = "test";
  }
  
  
  const handleFetchData = async () => {
    try {
      if (keyword.trim() !== '') {
        const response = await fetch(`http://localhost:5000/recommend/${keyword}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Sort courses by rating
        const sortedCourses = data.courses.sort((a, b) => b.Rating - a.Rating);
        // Get only the top 20 courses
        const topCourses = sortedCourses.splice(0,50)
        setCourses(topCourses);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  if (courses.length===0){
    keyword="programming";
  }
  useEffect(() => {
    if (keyword) {
      handleFetchData(); // Fetch data only when keyword exists
    }
  }, [keyword]); // Dependency array with 'keyword' ensures useEffect runs whenever 'keyword' changes

  return (
    <div>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Rating</th>
            <th>Difficulty Level</th>
            <th>Course URL</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length > 0 && courses.map((course, index) => (
            <tr key={`${course['Course Name']}-${index}`}>
              <td>{course['Course Name']}</td>
              <td>{course['Rating']}</td>
              <td>{course['Difficulty Level']}</td>
              <td><a href={course['Course URL']}>Course URL</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Course;
