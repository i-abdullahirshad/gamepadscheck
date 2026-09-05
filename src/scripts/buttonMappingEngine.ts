export class ButtonMappingEngine {
    private requestRef: number | null = null;
    private gamepadIndex: number | null = null;
    private lastButtonState: boolean[] = new Array(30).fill(false);
    
    // Mapping of index to standard button names for the log
    private readonly BTN_NAMES: Record<number, string> = {
        0: 'A', 1: 'B', 2: 'X', 3: 'Y', 
        4: 'LB', 5: 'RB', 6: 'LT', 7: 'RT',
        8: 'Back/View', 9: 'Start/Menu', 10: 'LS Click', 11: 'RS Click',
        12: 'D-Up', 13: 'D-Down', 14: 'D-Left', 15: 'D-Right',
        16: 'Home/Guide', 17: 'Share/Capture'
    };

    constructor() {
        this.initListeners();
        this.initUI();
    }

    private initUI() {
        const clearBtn = document.getElementById('clear-log-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const log = document.getElementById('event-log-container');
                if (log) log.innerHTML = '<div class="empty-state">Waiting for button events...</div>';
            });
        }
    }

    private initListeners() {
        window.addEventListener('gamepadconnected', (e) => {
            if (this.gamepadIndex === null) {
                this.gamepadIndex = e.gamepad.index;
                const statusBadge = document.getElementById('connection-status');
                if (statusBadge) {
                    statusBadge.innerText = 'Controller Connected';
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
                this.resetAxes();
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

    private formatTime(): string {
        // Returns strictly [HH:MM:SS.mmm]
        const now = new Date();
        return `[${now.toISOString().substring(11, 23)}]`;
    }

    private logEvent(buttonIndex: number, action: 'PRESSED' | 'Released') {
        const container = document.getElementById('event-log-container');
        if (!container) return;

        // Remove empty state message if it exists
        const emptyState = container.querySelector('.empty-state');
        if (emptyState) emptyState.remove();

        const time = this.formatTime();
        const btnName = this.BTN_NAMES[buttonIndex] ? `(${this.BTN_NAMES[buttonIndex]})` : '';
        
        const div = document.createElement('div');
        div.className = 'log-row';
        
        const stateClass = action === 'PRESSED' ? 'state-pressed' : 'state-released';
        
        // Wrapped the inner content in a log-row-content div to prevent wrapping and utilize flex gap
        div.innerHTML = `
            <div class="log-row-content">
                <span class="log-time">${time}</span> 
                <span style="color: #ccc;">Button</span> 
                <span class="log-btn">${buttonIndex}</span> 
                <span style="color: #666; font-size: 0.75rem;">${btnName}</span>
            </div>
            <div class="log-state ${stateClass}">${action}</div>
        `;
        
        // Prepend to show newest at the top
        container.insertBefore(div, container.firstChild);

        // Keep log from getting too massive
        if (container.childElementCount > 100) {
            container.removeChild(container.lastChild as Node);
        }
    }

    private resetAxes() {
        for (let i = 0; i < 4; i++) {
            const valEl = document.getElementById(`ax-${i}-val`);
            const barEl = document.getElementById(`ax-${i}-bar`);
            if (valEl) valEl.innerText = "0.00000";
            if (barEl) barEl.style.left = `50%`;
        }
    }

    private updateState() {
        if (this.gamepadIndex === null) return;
        const pad = navigator.getGamepads()[this.gamepadIndex];
        if (!pad) return;

        // 1. Process Buttons & Update SVG / Event Log
        for (let i = 0; i < pad.buttons.length; i++) {
            const isPressed = pad.buttons[i]?.pressed;
            
            // Update SVG Visualizer
            const svgBtn = document.getElementById(`btn-${i}`);
            if (svgBtn) {
                if (isPressed) svgBtn.classList.add('active');
                else svgBtn.classList.remove('active');
            }

            // Log edge detections
            if (isPressed && !this.lastButtonState[i]) {
                this.logEvent(i, 'PRESSED');
            } else if (!isPressed && this.lastButtonState[i]) {
                this.logEvent(i, 'Released');
            }
            
            this.lastButtonState[i] = isPressed;
        }

        // 2. Process Raw Axes (0 through 3)
        for (let i = 0; i < 4; i++) {
            const val = pad.axes[i] || 0;
            
            const valEl = document.getElementById(`ax-${i}-val`);
            const barEl = document.getElementById(`ax-${i}-bar`);
            
            if (valEl) {
                // Show 5 decimal places for raw precision testing
                valEl.innerText = val.toFixed(5);
            }
            if (barEl) {
                // Map -1.0 to 1.0 -> 0% to 100% position
                const pct = ((val + 1) / 2) * 100;
                barEl.style.left = `${pct}%`;
            }
        }
    }
}