import React from 'react';
import styled from 'styled-components';

const DateBar = () => {
    const dates = getDates();

    function getDates() {
        let dates = [];

        for (let i = 0; i < 7; i++) {
            // Offset the current day with the product number of the number of milliseconds in a day and i 
            let date = new Date(Date.now() + 24 * 60 * 60 * 1000 * i);
            // Track the date in human readable format and the milliseconds since epoch
            dates.push([(date.getMonth() + 1) + "/" + date.getDate(), date]);
        }

        return dates;
    }

    return (
        <DateWrapper>
            { dates.map((date, index) => (<h4 key={index}>{date[0]}</h4>)) }
        </DateWrapper>
    )
}

const DateWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 9vh;
  height: 91vh;
  background: #151515;
  padding-top: 7vh;
  padding-bottom: 5vh;
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

export default DateBar;