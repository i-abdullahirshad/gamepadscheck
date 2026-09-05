export class SteeringWheelEngine {
    private requestRef: number | null = null;
    private gamepadIndex: number | null = null;
    
    private lastButtonState: boolean[] = new Array(30).fill(false);
    
    // Linearity Chart History
    private historyT: number[] = [];
    private historyB: number[] = [];
    private historyC: number[] = [];
    private maxHistory = 100;

    constructor() {
        this.initListeners();
        this.initUI();
        this.drawEmptyChart();
    }

    private initUI() {
        const clearBtn = document.getElementById('clear-log-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const log = document.getElementById('event-log-container');
                if (log) log.innerHTML = '';
            });
        }
    }

    private initListeners() {
        window.addEventListener('gamepadconnected', (e) => {
            if (this.gamepadIndex === null) {
                this.gamepadIndex = e.gamepad.index;
                const statusBadge = document.getElementById('connection-status');
                if (statusBadge) {
                    statusBadge.innerText = 'Connected';
                    statusBadge.className = 'status-badge connected';
                }
                this.startPolling();
            }
        });

        window.addEventListener('gamepaddisconnected', (e) => {
            if (this.gamepadIndex === e.gamepad.index) {
                this.gamepadIndex = null;
                const statusBadge = document.getElementById('connection-status');
                if (statusBadge) {
                    statusBadge.innerText = 'Disconnected';
                    statusBadge.className = 'status-badge disconnected';
                }
                this.stopPolling();
            }
        });
    }

    private startPolling() {
        const poll = () => {
            this.updateState();
            this.requestRef = requestAnimationFrame(poll);
        };
        this.requestRef = requestAnimationFrame(poll);
    }

    private stopPolling() {
        if (this.requestRef) {
            cancelAnimationFrame(this.requestRef);
            this.requestRef = null;
        }
    }

    private logEvent(buttonIndex: number, action: 'Pressed' | 'Released') {
        const container = document.getElementById('event-log-container');
        if (!container) return;

        // Get strict HH:MM:SS.SSS timestamp
        const time = new Date().toISOString().substring(11, 23);
        
        const div = document.createElement('div');
        div.className = 'log-entry';
        
        const actionClass = action === 'Pressed' ? 'log-action-pressed' : 'log-action-released';
        
        div.innerHTML = `<span class="timestamp">${time}</span> Button ${buttonIndex} <span class="${actionClass}">${action}</span>`;
        
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;

        if (container.childElementCount > 100) {
            container.removeChild(container.firstChild as Node);
        }
    }

    private updateState() {
        if (this.gamepadIndex === null) return;
        const pad = navigator.getGamepads()[this.gamepadIndex];
        if (!pad) return;

        // 1. Wheel Rotation (Assuming standard Axis 0)
        const axis0 = pad.axes[0] || 0;
        const degrees = Math.round(axis0 * 180); // Maps -1 to 1 into -180deg to +180deg
        
        const wheelSvg = document.getElementById('wheel-group');
        const wheelText = document.getElementById('wheel-deg');
        if (wheelSvg) wheelSvg.style.transform = `rotate(${degrees}deg)`;
        if (wheelText) wheelText.innerText = `${degrees}°`;

        // 2. Pedals (Attempt to read axes 1, 2, 3 or triggers if standard gamepad)
        // Note: Racing wheels usually map pedals to axis 1, 2, 5 or similar, resting at -1. 
        // To support standard gamepads nicely in the UI too, we normalize absolute trigger values.
        let throttle = pad.buttons[7]?.value || (pad.axes[1] !== undefined ? (pad.axes[1] + 1) / 2 : 0);
        let brake = pad.buttons[6]?.value || (pad.axes[2] !== undefined ? (pad.axes[2] + 1) / 2 : 0);
        let clutch = pad.buttons[4]?.value || (pad.axes[3] !== undefined ? (pad.axes[3] + 1) / 2 : 0);

        // Cap values safely between 0 and 1
        throttle = Math.max(0, Math.min(1, throttle));
        brake = Math.max(0, Math.min(1, brake));
        clutch = Math.max(0, Math.min(1, clutch));

        this.updatePedal('throttle', throttle);
        this.updatePedal('brake', brake);
        this.updatePedal('clutch', clutch);

        // Linearity History
        this.historyT.push(throttle);
        this.historyB.push(brake);
        this.historyC.push(clutch);

        if (this.historyT.length > this.maxHistory) this.historyT.shift();
        if (this.historyB.length > this.maxHistory) this.historyB.shift();
        if (this.historyC.length > this.maxHistory) this.historyC.shift();

        this.drawChart();

        // 3. Raw Axes Display (First 4 axes)
        for (let i = 0; i < 4; i++) {
            const val = pad.axes[i] || 0;
            const textEl = document.getElementById(`axis-${i}-val`);
            const barEl = document.getElementById(`axis-${i}-bar`);
            
            if (textEl) textEl.innerText = val.toFixed(3);
            if (barEl) {
                // Map -1 -> 1 to 0% -> 100% width
                const pct = ((val + 1) / 2) * 100;
                barEl.style.width = `${pct}%`;
            }
        }

        // 4. Buttons Grid & Event Log
        const totalButtons = pad.buttons.length;
        const countEl = document.getElementById('total-buttons-count');
        if (countEl && countEl.innerText !== totalButtons.toString()) {
            countEl.innerText = totalButtons.toString();
        }

        for (let i = 0; i < totalButtons; i++) {
            const isPressed = pad.buttons[i]?.pressed;
            
            const btnEl = document.getElementById(`raw-btn-${i}`);
            if (btnEl) {
                if (isPressed) btnEl.classList.add('active');
                else btnEl.classList.remove('active');
            }

            // Event Logging
            if (isPressed && !this.lastButtonState[i]) {
                this.logEvent(i, 'Pressed');
            } else if (!isPressed && this.lastButtonState[i]) {
                this.logEvent(i, 'Released');
            }
            
            this.lastButtonState[i] = isPressed;
        }
    }

    private updatePedal(id: string, value: number) {
        const fillEl = document.getElementById(`pedal-${id}`);
        const textEl = document.getElementById(`${id}-val`);
        
        const pct = Math.round(value * 100);
        
        if (fillEl) fillEl.style.height = `${pct}%`;
        if (textEl) textEl.innerText = `${pct}%`;
    }

    private drawEmptyChart() {
        const canvas = document.getElementById('linearity-chart') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw center baseline
        ctx.strokeStyle = 'rgba(128,128,128,0.2)';
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    private drawChart() {
        const canvas = document.getElementById('linearity-chart') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const step = w / this.maxHistory;
        
        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(128,128,128,0.2)';
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        const drawLine = (historyArray: number[], color: string) => {
            if (historyArray.length === 0) return;
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            
            for (let i = 0; i < historyArray.length; i++) {
                const x = i * step;
                // Value is 0 to 1, we want 0 to be bottom (h), 1 to be top (0)
                const y = h - (historyArray[i] * h);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        };

        // Draw Clutch (Vibrant Blue)
        drawLine(this.historyC, '#3498DB');
        // Draw Brake (Crimson)
        drawLine(this.historyB, '#F43F5E');
        // Draw Throttle (Electric Gold)
        drawLine(this.historyT, '#FFD700');
    }
}