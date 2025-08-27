class SteampunkClock {
    constructor() {
        this.isDigitalView = true;
        this.is24Hour = false;
        this.alarms = [];
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.startClock();
        this.loadAlarms();
        // Ensure modal starts hidden
        this.alarmModal.classList.add('hidden');
    }

    bindElements() {
        this.toggleBtn = document.getElementById('toggleView');
        this.digitalClock = document.getElementById('digitalClock');
        this.analogClock = document.getElementById('analogClock');
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        this.dateEl = document.getElementById('date');
        this.hourHand = document.getElementById('hourHand');
        this.minuteHand = document.getElementById('minuteHand');
        this.secondHand = document.getElementById('secondHand');
        
        // Gear buttons
        this.alarmGear = document.getElementById('alarmGear');
        this.formatGear = document.getElementById('formatGear');
        
        // Modal elements
        this.alarmModal = document.getElementById('alarmModal');
        this.alarmTimeInput = document.getElementById('alarmTime');
        this.setAlarmBtn = document.getElementById('setAlarm');
        this.cancelAlarmBtn = document.getElementById('cancelAlarm');
        this.activeAlarmsEl = document.getElementById('activeAlarms');
    }

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggleView());
        
        // Gear button events
        this.alarmGear.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openAlarmModal();
        });
        
        this.formatGear.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleTimeFormat();
        });
        
        // Modal button events
        this.setAlarmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setAlarm();
        });
        
        this.cancelAlarmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeAlarmModal();
        });
        
        // Modal backdrop click
        this.alarmModal.addEventListener('click', (e) => {
            if (e.target === this.alarmModal) {
                e.preventDefault();
                e.stopPropagation();
                this.closeAlarmModal();
            }
        });
        
        // Prevent modal content clicks from closing modal
        const modalContent = this.alarmModal.querySelector('.modal-content');
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    startClock() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        this.updateDigitalClock(hours, minutes, seconds, now);
        this.updateAnalogClock(hours, minutes, seconds);
    }

    updateDigitalClock(hours, minutes, seconds, date) {
        let displayHours = hours;
        if (!this.is24Hour) {
            displayHours = hours % 12;
            if (displayHours === 0) displayHours = 12;
        }
        
        this.hoursEl.textContent = this.padZero(displayHours);
        this.minutesEl.textContent = this.padZero(minutes);
        this.secondsEl.textContent = this.padZero(seconds);
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.dateEl.textContent = date.toLocaleDateString('en-US', options);
        
        // Check alarms
        this.checkAlarms(hours, minutes);
    }

    updateAnalogClock(hours, minutes, seconds) {
        const hourAngle = (hours % 12) * 30 + (minutes * 0.5);
        const minuteAngle = minutes * 6;
        const secondAngle = seconds * 6;

        this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        this.secondHand.style.transform = `rotate(${secondAngle}deg)`;
    }

    toggleView() {
        this.isDigitalView = !this.isDigitalView;
        
        if (this.isDigitalView) {
            this.digitalClock.classList.remove('hidden');
            this.analogClock.classList.add('hidden');
            this.toggleBtn.textContent = 'Switch to Analog';
        } else {
            this.digitalClock.classList.add('hidden');
            this.analogClock.classList.remove('hidden');
            this.toggleBtn.textContent = 'Switch to Digital';
        }
    }

    toggleTimeFormat() {
        this.is24Hour = !this.is24Hour;
        const icon = this.formatGear.querySelector('.gear-icon');
        icon.textContent = this.is24Hour ? '24' : '12';
        localStorage.setItem('is24Hour', this.is24Hour);
    }

    openAlarmModal() {
        this.alarmModal.classList.remove('hidden');
        this.renderActiveAlarms();
    }

    closeAlarmModal() {
        this.alarmModal.classList.add('hidden');
        this.alarmTimeInput.value = '';
    }

    setAlarm() {
        const timeValue = this.alarmTimeInput.value;
        if (!timeValue) return;

        const [hours, minutes] = timeValue.split(':').map(Number);
        const alarmId = Date.now();
        
        this.alarms.push({
            id: alarmId,
            hours,
            minutes,
            time: timeValue
        });

        this.saveAlarms();
        this.renderActiveAlarms();
        this.alarmTimeInput.value = '';
        this.closeAlarmModal();
    }

    deleteAlarm(alarmId) {
        this.alarms = this.alarms.filter(alarm => alarm.id !== alarmId);
        this.saveAlarms();
        this.renderActiveAlarms();
    }

    renderActiveAlarms() {
        this.activeAlarmsEl.innerHTML = '';
        
        this.alarms.forEach(alarm => {
            const alarmDiv = document.createElement('div');
            alarmDiv.className = 'alarm-item';
            alarmDiv.innerHTML = `
                <span class="alarm-time">${alarm.time}</span>
                <button class="alarm-delete" onclick="clock.deleteAlarm(${alarm.id})">×</button>
            `;
            this.activeAlarmsEl.appendChild(alarmDiv);
        });
    }

    checkAlarms(currentHours, currentMinutes) {
        this.alarms.forEach(alarm => {
            if (alarm.hours === currentHours && alarm.minutes === currentMinutes) {
                this.triggerAlarm(alarm);
            }
        });
    }

    triggerAlarm(alarm) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px;
            background: linear-gradient(135deg, #B8860B, #8B6914);
            border: 3px solid #B87333; border-radius: 15px;
            padding: 1rem; color: #1a1a1a;
            font-family: 'Cinzel', serif; font-weight: bold;
            z-index: 2000; box-shadow: 0 0 30px #B8860B;
        `;
        notification.innerHTML = `⏰ Alarm: ${alarm.time}`;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    saveAlarms() {
        localStorage.setItem('alarms', JSON.stringify(this.alarms));
    }

    loadAlarms() {
        const saved = localStorage.getItem('alarms');
        if (saved) this.alarms = JSON.parse(saved);
        
        const saved24Hour = localStorage.getItem('is24Hour');
        if (saved24Hour) {
            this.is24Hour = saved24Hour === 'true';
            const icon = this.formatGear.querySelector('.gear-icon');
            icon.textContent = this.is24Hour ? '24' : '12';
        }
    }

    padZero(num) {
        return num.toString().padStart(2, '0');
    }
}

let clock;
document.addEventListener('DOMContentLoaded', () => {
    clock = new SteampunkClock();
});
