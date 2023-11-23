const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm-btn');
const alarmsList = document.getElementById('alarms-list');

let alarms =JSON.parse(localStorage.getItem('alarms')) || [];

function updateAlarms() {
    alarmsList.innerHTML = '';
    alarms.forEach(alarm => {
        const li = document.createElement('div');
        li.className = 'alarm-item';
        li.textContent = alarm;
        alarmsList.appendChild(li);
        const iconElement1 = document.createElement('i');
                iconElement1.className = 'fas fa-bell'; 
            const iconElement2 = document.createElement('i');
                iconElement2.className = 'fas fa-trash';
            // Append the icon to the button
            li.appendChild(iconElement1);
            li.appendChild(iconElement2);
            
            iconElement1.style.marginLeft="-60px";
            iconElement2.style.marginLeft="88%";
    });
}

setAlarmButton.addEventListener('click', () => {
    const alarmTime = alarmTimeInput.value;

    if (alarmTime) {
        alarms.push(alarmTime);
        localStorage.setItem('alarms', JSON.stringify(alarms));
        updateAlarms();
        alarmTimeInput.value = '';

        setAlarm(alarmTime);
    }
});

function setAlarm(alarmTime) {
    const currentTime = new Date();
    const [hours, minutes] = alarmTime.split(':');
    const alarmDateTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        parseInt(hours),
        parseInt(minutes),
        0
    );

    const timeUntilAlarm = alarmDateTime - currentTime;

    if (timeUntilAlarm > 0) {
        setTimeout(() => {
            const audio = document.getElementById('alarm-audio');
            audio.play();
            audio.onended = function() {
                alert('Alarm has finished ringing.');
            };
        }, timeUntilAlarm);
    }
}
alarmsList.addEventListener('click', event => {
    if (event.target.classList.contains('fa-trash')) {
        const alarmItem = event.target.parentElement;
        const alarmTime = alarmItem.firstChild.textContent;
        const alarmIndex = alarms.indexOf(alarmTime);
        if (alarmIndex !== -1) {
            alarms.splice(alarmIndex, 1);
            localStorage.setItem('alarms', JSON.stringify(alarms));
            updateAlarms();
        }
    }
});

updateAlarms();
