export class FightStickEngine {
    private requestRef: number | null = null;
    private gamepadIndex: number | null = null;
    
    private keys: Record<string, boolean> = {};
    private lastDirection: number = 5; 
    private lastButtonState: boolean[] = new Array(25).fill(false);
    
    private readonly BTN_MAP: Record<number, string> = {
        0: 'A', 1: 'B', 2: 'X', 3: 'Y', 
        4: 'LB', 5: 'RB', 6: 'LT', 7: 'RT'
    };

    private readonly KEY_MAP: Record<string, number> = {
        'u': 2, 'i': 3, 'o': 5, 'p': 4, 
        'j': 0, 'k': 1, 'l': 7, ';': 6  
    };

    constructor() {
        if (!navigator.getGamepads) {
            const err = document.getElementById('api-error');
            if (err) err.style.display = 'block';
            return;
        }
        this.initUI();
        this.initListeners();
        this.startPolling(); 
    }

    private initUI() {
        const btnStick = document.getElementById('mode-stick');
        const btnHitbox = document.getElementById('mode-hitbox');
        const viewStick = document.getElementById('view-stick');
        const viewHitbox = document.getElementById('view-hitbox');

        if (btnStick && btnHitbox && viewStick && viewHitbox) {
            btnStick.addEventListener('click', () => {
                btnStick.classList.add('active');
                btnHitbox.classList.remove('active');
                viewStick.style.display = 'block';
                viewHitbox.style.display = 'none';
            });
            btnHitbox.addEventListener('click', () => {
                btnHitbox.classList.add('active');
                btnStick.classList.remove('active');
                viewHitbox.style.display = 'block';
                viewStick.style.display = 'none';
            });
        }

        const clearBtn = document.getElementById('clear-history-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const hist = document.getElementById('input-history-container');
                if (hist) hist.innerHTML = '';
            });
        }
    }

    private initListeners() {
        window.addEventListener('gamepadconnected', (e) => {
            this.gamepadIndex = e.gamepad.index;
            const status = document.getElementById('connection-status');
            if (status) {
                status.innerText = `🟢 Connected: ${e.gamepad.id}`;
                status.style.color = '#F4F6F8';
            }
        });

        window.addEventListener('gamepaddisconnected', (e) => {
            if (this.gamepadIndex === e.gamepad.index) {
                this.gamepadIndex = null;
                const status = document.getElementById('connection-status');
                if (status) {
                    status.innerText = 'Press any button (or keyboard) to connect...';
                    status.style.color = '#8E96B5';
                }
            }
        });

        window.addEventListener('keydown', (e) => { this.keys[e.key.toLowerCase()] = true; });
        window.addEventListener('keyup', (e) => { this.keys[e.key.toLowerCase()] = false; });
    }

    private startPolling() {
        const poll = () => {
            this.updateState();
            this.requestRef = requestAnimationFrame(poll);
        };
        this.requestRef = requestAnimationFrame(poll);
    }

    private setElementActive(id: string, active: boolean) {
        const el = document.getElementById(id);
        if (!el) return;
        if (active) el.classList.add('active');
        else el.classList.remove('active');
    }

    private appendHistory(text: string, isArrow: boolean = false) {
        const container = document.getElementById('input-history-container');
        if (!container) return;
        
        const span = document.createElement('span');
        span.className = isArrow ? 'hist-chip arrow' : 'hist-chip';
        span.innerText = text;
        
        container.appendChild(span);
        container.scrollTop = container.scrollHeight;

        if (container.childElementCount > 100) {
            container.removeChild(container.firstChild as Node);
        }
    }

    private updateState() {
        const pad = this.gamepadIndex !== null ? navigator.getGamepads()[this.gamepadIndex] : null;

        // 1. Gather Raw Inputs
        let rawX = pad ? pad.axes[0] : 0;
        let rawY = pad ? pad.axes[1] : 0;

        const pL = (pad?.buttons[14]?.pressed || this.keys['arrowleft'] || this.keys['a']) || false;
        const pR = (pad?.buttons[15]?.pressed || this.keys['arrowright'] || this.keys['d']) || false;
        const pU = (pad?.buttons[12]?.pressed || this.keys['arrowup'] || this.keys['w'] || this.keys[' ']) || false;
        const pD = (pad?.buttons[13]?.pressed || this.keys['arrowdown'] || this.keys['s']) || false;

        if (pL) rawX = -1;
        if (pR) rawX = 1;
        if (pU) rawY = -1;
        if (pD) rawY = 1;

        // 2. Resolve Directions
        let dirX = 0, dirY = 0;
        if (rawX < -0.4) dirX = -1;
        if (rawX > 0.4) dirX = 1;
        if (rawY < -0.4) dirY = -1;
        if (rawY > 0.4) dirY = 1;

        // 3. Update Visualizers
        this.setElementActive('socd-l', pL);
        this.setElementActive('socd-r', pR);
        this.setElementActive('socd-u', pU);
        this.setElementActive('socd-d', pD);

        this.setElementActive('hb-left', pL);
        this.setElementActive('hb-right', pR);
        this.setElementActive('hb-up', pU);
        this.setElementActive('hb-down', pD);

        const stickBall = document.getElementById('stick-ball');
        if (stickBall) {
            stickBall.style.transform = `translate(${dirX * 35}px, ${dirY * 35}px)`;
        }

        // 4. Calculate SOCD Output
        let socdResult = "—";
        if (pL && pR) {
            if (dirX === 0) socdResult = "Neutral";
            else if (dirX === 1) socdResult = "Right Override";
            else if (dirX === -1) socdResult = "Left Override";
        } else if (pU && pD) {
            if (dirY === 0) socdResult = "Neutral";
            else if (dirY === -1) socdResult = "Absolute Up";
            else if (dirY === 1) socdResult = "Down Override";
        }
        const resultEl = document.getElementById('socd-result');
        if (resultEl && resultEl.innerText !== socdResult) resultEl.innerText = socdResult;

        // 5. Numpad Notation & History Logger
        let numpad = 5; 
        if (dirX === -1 && dirY === -1) numpad = 7;
        else if (dirX === 0 && dirY === -1) numpad = 8;
        else if (dirX === 1 && dirY === -1) numpad = 9;
        else if (dirX === -1 && dirY === 0) numpad = 4;
        else if (dirX === 1 && dirY === 0) numpad = 6;
        else if (dirX === -1 && dirY === 1) numpad = 1;
        else if (dirX === 0 && dirY === 1) numpad = 2;
        else if (dirX === 1 && dirY === 1) numpad = 3;

        [1, 2, 3, 4, 6, 7, 8, 9].forEach(n => this.setElementActive(`notch-${n}`, false));
        if (numpad !== 5) {
            this.setElementActive(`notch-${numpad}`, true);
        }

        const arrows: Record<number, string> = { 1: '↙', 2: '↓', 3: '↘', 4: '←', 6: '→', 7: '↖', 8: '↑', 9: '↗' };
        
        if (numpad !== this.lastDirection) {
            if (numpad !== 5) {
                this.appendHistory(arrows[numpad], true);
            }
            this.lastDirection = numpad;
        }

        // 6. Action Buttons Logic & Raw All Buttons Grid Sync
        const totalButtons = pad ? pad.buttons.length : 17;
        const countEl = document.getElementById('total-buttons-count');
        if (countEl) countEl.innerText = totalButtons.toString();

        for (let i = 0; i < totalButtons; i++) {
            const btnName = this.BTN_MAP[i] || `B${i}`;
            
            let isPressed = pad ? pad.buttons[i]?.pressed : false;
            
            const mappedKey = Object.keys(this.KEY_MAP).find(k => this.KEY_MAP[k] === i);
            if (mappedKey && this.keys[mappedKey]) {
                isPressed = true;
            }

            // Update Vewlix SVG Action Buttons
            this.setElementActive(`fs-btn-${i}`, isPressed);

            // Update All Buttons Grid Slots
            this.setElementActive(`raw-btn-${i}`, isPressed);

            if (isPressed && !this.lastButtonState[i]) {
                this.appendHistory(btnName, false);
            }
            this.lastButtonState[i] = isPressed;
        }
    }
}