import { useState, useEffect } from 'react';

const Clock = () => {

    const [currentTime, setTime] = useState(new Date().toLocaleTimeString()); 
    const [currentDate, setDate] = useState(new Date().toLocaleDateString());

    useEffect(()=> {
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        },1000);
    });

    return (
        <div className="time">
			Дата:
			<br />
			<span>{ currentDate }</span>
			<br />
			Время:
			<br />
			<span>{ currentTime }</span>
		</div>
    );
}

export default Clock;