import { useRef, useState, useEffect } from 'react';
import { HomeNav } from './HomeNav';
import { UserNav } from './UserNav';
import MenuBar from './MenuBar';
import { UserTableData } from './UserTableData';
import { ProfileNav } from './ProfileNav';
import { v4 as uuidv4, v4 } from 'uuid';
import { useData } from '../../SalesAnalysis/useData';
import images from './images.jpeg';


export const UserProfile = ({userLog, dept, logID, topFiveRevenue}) => {
  const [salesAchieved, setSalesAchieved] = useState([]);
  const [percentage, setPercentage] = useState([])

    console.log('here', userLog)
    const ref = Math.random();
    const width = 100;
    const height = 100;

    
  const salesAchievedData = useData();


  useEffect(() => {
    if (Array.isArray(salesAchievedData)) {
      
      const sales2023Values = salesAchievedData.map(d => +d['Revenue 2023']);
      const salesRevenue = sales2023Values.slice().sort((a, b) => b - a);
     
      const mySales = salesRevenue.slice(0, 1);
      const targetPercentage = (15/100) * mySales[0];

      setSalesAchieved(mySales);
      setPercentage(targetPercentage)
    } else {
      console.log('Revenue data not found');
      console.log(percentage)
    }
  }, [salesAchievedData]);

  return (
    <>
      <ProfileNav 
        userLog={userLog}
        dept={dept}
        logID={logID}
        topFiveRevenue={topFiveRevenue}
      />
      <div className='profile-box'>
      <div className='side-bar'> 
        <div className='user-profile'>
          <div className='user-profile-data'>
            <h4>User Data</h4>
              <div className='lists'>
              <p>{userLog}</p>
              <p>{logID}</p>
              <p>{dept}</p>
              <p>ref# : {ref} </p>
              </div>
          </div>
        </div>
        <div className='user-profile'>
          <div className='user-profile-data'>
            <h4>User Stats</h4>
            <div className='lists'>
              <p>{userLog}</p>
              <p>emp #: {logID}</p>
                {salesAchieved.map((values)=> (
                  <p>Sales Achieved: {values}</p>
                ))}
             
                <p>Profit Margin {percentage}%</p>
            </div>
          </div>
        </div>
        <div className='user-profile'>
        <div className='user-profile-data'>
            <h4>Messages</h4>
            <div className='lists'>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
            </div>
          </div>
        </div>
        <div className='user-profile'>
        <div className='user-profile-data'>
            <h4>Options</h4>
            <div className='lists'>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
            </div>
          </div>
        </div>
        <div className='user-profile'>
        <div className='user-profile-data'>
            <h4>Pending</h4>
            <div className='lists'>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
            </div>
          </div>
        </div>
        <div className='user-profile'>
        <div className='user-profile-data'>
            <h4>Department</h4>
            <div className='lists'>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
              <p>Listed</p>
            </div>
          </div>  
        </div>
      </div>
      <div className='header-name'><h1>{userLog}</h1>
      
      </div>
      <div className='data-table'>
        <UserTableData 
          userLog={userLog}
          dept={dept}
          logID={logID}
          topFiveRevenue={topFiveRevenue}
        />
      </div>
      </div>
    </>
  )
}