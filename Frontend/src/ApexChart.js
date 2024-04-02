import ReactApexChart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import app from "./Config";
import { getDatabase, ref, get } from "firebase/database";

function ApexChart() {
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
  };

  let value = parseInt(data?.Rating)*10; // Ensure data is not null before accessing Rating

  const chartState = {
    series: [value],
    options: {
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -15,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: function(val) {
                return parseInt(val);
              },
              color: '#222',
              fontSize: '36px',
              fontFamily: 'Helvetica Neue',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Rating'],
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <div id="card">
        <div id="chart">
          <h3>Your Resume Rating</h3>
          <ReactApexChart options={chartState.options} series={chartState.series} type="radialBar" height={250} />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexChart;
