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
        this.alarmGear.addEventListener('click', () => this.openAlarmModal());
        this.formatGear.addEventListener('click', () => this.toggleTimeFormat());
        this.setAlarmBtn.addEventListener('click', () => this.setAlarm());
        this.cancelAlarmBtn.addEventListener('click', () => this.closeAlarmModal());
        this.alarmModal.addEventListener('click', (e) => {
            if (e.target === this.alarmModal) this.closeAlarmModal();
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

    padZero(num) {
        return num.toString().padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SteampunkClock();
});
