export class GamepadEngine {
    private requestRef: number | null = null;
    private gamepadIndex: number | null = null;
    private connectedPads: boolean[] = [false, false, false, false];

    private buttonHistory: string[] = [];
    private lastButtonState: boolean[] = new Array(20).fill(false);
    
    // Only keeping the Circularity paths now!
    private lsCircPath: ({x: number, y: number} | null)[] = [];
    private rsCircPath: ({x: number, y: number} | null)[] = [];

    private lsOuterRadii: number[] = [];
    private rsOuterRadii: number[] = [];
    private deadzone: number = 0.10;
    
    private vibTimeout: number | null = null;
    private infiniteVibInterval: number | null = null;

    private frames = 0;
    private lastHzUpdate = performance.now();

    constructor() {
        new MicTester();

        if (!this.checkApiSupport()) return;
        this.initListeners();
        this.initVibration();
        this.initControls();
        this.initPlayerSelector();
    }

    private checkApiSupport(): boolean {
        if (!navigator.getGamepads) {
            const errorEl = document.getElementById('api-error');
            if (errorEl) errorEl.style.display = 'block';
            return false;
        }
        return true;
    }

    private initPlayerSelector() {
        const buttons = document.querySelectorAll('.player-btn');
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (this.connectedPads[index]) {
                    this.gamepadIndex = index;
                    this.updatePlayerUI();
                }
            });
        });
    }

    private updatePlayerUI() {
        const buttons = document.querySelectorAll('.player-btn');
        buttons.forEach((btn, index) => {
            btn.classList.remove('active', 'connected');
            if (this.connectedPads[index]) btn.classList.add('connected');
            if (this.gamepadIndex === index) btn.classList.add('active');
        });
    }

    private initControls() {
        const clearAction = () => {
            // Only clear the circularity tracking
            this.lsCircPath = [];
            this.rsCircPath = [];
            this.lsOuterRadii = [];
            this.rsOuterRadii = [];
            
            const lsErr = document.getElementById('ls-error');
            const rsErr = document.getElementById('rs-error');
            if (lsErr) lsErr.innerText = '0.0%';
            if (rsErr) rsErr.innerText = '0.0%';
        };

        const resetBtn = document.getElementById('reset-sticks-btn');
        if (resetBtn) resetBtn.addEventListener('click', clearAction);
        window.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'p') clearAction();
        });

        const dzSlider = document.getElementById('deadzone-slider') as HTMLInputElement;
        const dzValue = document.getElementById('deadzone-value');
        
        if (dzSlider && dzValue) {
            dzSlider.addEventListener('input', (e) => {
                this.deadzone = parseFloat((e.target as HTMLInputElement).value);
                dzValue.innerText = this.deadzone.toFixed(2);
            });
        }
    }

    private triggerVibration(strong: number, weak: number, time: number) {
        if (this.gamepadIndex === null) return;
        const pad = navigator.getGamepads()[this.gamepadIndex];
        if (!pad || !(pad as any).vibrationActuator) return;

        (pad as any).vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0, duration: time, weakMagnitude: weak, strongMagnitude: strong
        }).catch(() => {});
    }

    private initVibration() {
        const buttons = document.querySelectorAll('.vib-btn:not(.mic-btn)');
        const visualizer = document.getElementById('vib-visualizer');
        const infiniteToggle = document.getElementById('infinite-vib-toggle') as HTMLInputElement;

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (infiniteToggle && infiniteToggle.checked) {
                    infiniteToggle.checked = false;
                    if (this.infiniteVibInterval) clearInterval(this.infiniteVibInterval);
                }

                const type = (e.target as HTMLElement).innerText;
                let strong = 0, weak = 0, time = 0;

                if (type === 'Heavy') { strong = 1.0; weak = 0; time = 500; }
                else if (type === 'Light') { strong = 0; weak = 1.0; time = 500; }
                else if (type === 'Burst') { strong = 1.0; weak = 1.0; time = 100; }
                else if (type === 'Pulse') { strong = 0.3; weak = 0.8; time = 800; }

                if (visualizer) {
                    visualizer.className = 'vib-visualizer'; 
                    visualizer.classList.add(`vib-active-${type.toLowerCase()}`);
                }

                if (this.vibTimeout) clearTimeout(this.vibTimeout);
                this.vibTimeout = window.setTimeout(() => {
                    if (visualizer) visualizer.className = 'vib-visualizer';
                }, time);

                this.triggerVibration(strong, weak, time);
            });
        });

        if (infiniteToggle) {
            infiniteToggle.addEventListener('change', (e) => {
                const isChecked = (e.target as HTMLInputElement).checked;
                
                if (isChecked) {
                    if (visualizer) {
                        visualizer.className = 'vib-visualizer vib-active-heavy';
                    }
                    this.triggerVibration(0.8, 0.8, 1000); 
                    this.infiniteVibInterval = window.setInterval(() => {
                        this.triggerVibration(0.8, 0.8, 1000);
                    }, 900);
                } else {
                    if (this.infiniteVibInterval) clearInterval(this.infiniteVibInterval);
                    if (visualizer) visualizer.className = 'vib-visualizer';
                    this.triggerVibration(0, 0, 0);
                }
            });
        }
    }

    private initListeners() {
        window.addEventListener('gamepadconnected', (e) => {
            const index = e.gamepad.index;
            if (index < 4) this.connectedPads[index] = true;
            
            if (this.gamepadIndex === null) {
                this.gamepadIndex = index;
                const statusEl = document.getElementById('connection-status');
                if (statusEl) {
                    statusEl.innerText = `🟢 Connected: ${e.gamepad.id}`;
                    statusEl.style.color = '#F4F6F8';
                }
                this.startPolling();
            }
            this.updatePlayerUI();
        });

        window.addEventListener('gamepaddisconnected', (e) => {
            const index = e.gamepad.index;
            if (index < 4) this.connectedPads[index] = false;

            if (this.gamepadIndex === index) {
                const nextIndex = this.connectedPads.findIndex(connected => connected);
                if (nextIndex !== -1) {
                    this.gamepadIndex = nextIndex;
                } else {
                    this.gamepadIndex = null;
                    const statusEl = document.getElementById('connection-status');
                    if (statusEl) {
                        statusEl.innerText = 'Press any button to connect...';
                        statusEl.style.color = 'var(--text-muted)';
                    }
                    this.stopPolling();
                }
            }
            this.updatePlayerUI();
        });
    }

    private startPolling() {
        this.lastHzUpdate = performance.now();
        this.frames = 0;
        
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
        const hzDisplay = document.getElementById('hz-display');
        if (hzDisplay) hzDisplay.innerText = '0';
    }

    private calculateError(radiiArray: number[], axisX: number, axisY: number, errorElementId: string) {
        const magnitude = Math.sqrt(axisX * axisX + axisY * axisY);
        
        if (magnitude > 0.8) {
            radiiArray.push(magnitude);
            if (radiiArray.length > 500) radiiArray.shift();
        }

        if (radiiArray.length > 0) {
            const sum = radiiArray.reduce((a, b) => a + b, 0);
            const avg = sum / radiiArray.length;
            const error = Math.abs(1.0 - avg) * 100;
            
            const errEl = document.getElementById(errorElementId);
            if (errEl) {
                errEl.innerText = `${error.toFixed(1)}%`;
                errEl.style.color = error > 10 ? '#E74C3C' : '#2ECC71';
            }
        }
    }

    private drawCircularity(canvasId: string, axisX: number, axisY: number, pathArray: ({x: number, y: number} | null)[], strokeColor: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const currentX = (axisX + 1) / 2 * w;
        const currentY = (axisY + 1) / 2 * h;

        const magnitude = Math.sqrt(axisX * axisX + axisY * axisY);

        if (magnitude > 0.85) {
            const lastPoint = pathArray[pathArray.length - 1];
            if (!lastPoint || Math.abs(currentX - lastPoint.x) > 0.5 || Math.abs(currentY - lastPoint.y) > 0.5) {
                pathArray.push({ x: currentX, y: currentY });
            }
            if (pathArray.length > 500) pathArray.shift();
        } else {
            if (pathArray.length > 0 && pathArray[pathArray.length - 1] !== null) {
                pathArray.push(null);
            }
        }

        ctx.clearRect(0, 0, w, h);

        if (pathArray.length > 0) {
            ctx.beginPath();
            ctx.strokeStyle = strokeColor; 
            ctx.lineWidth = 2;
            
            let isDrawing = false;
            for (let i = 0; i < pathArray.length; i++) {
                const pt = pathArray[i];
                if (pt === null) {
                    isDrawing = false; 
                } else {
                    if (!isDrawing) {
                        ctx.moveTo(pt.x, pt.y); 
                        isDrawing = true;
                    } else {
                        ctx.lineTo(pt.x, pt.y); 
                    }
                }
            }
            ctx.stroke();
        }
    }

    // Completely gutted to ONLY draw the red deadzone shading
    private drawDeadzone(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const r = w / 2;

        ctx.clearRect(0, 0, w, h);

        if (this.deadzone > 0) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(231, 76, 60, 0.25)';
            ctx.arc(r, r, r * this.deadzone, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    private updateState() {
        const now = performance.now();
        this.frames++;
        if (now - this.lastHzUpdate >= 1000) {
            const hz = Math.round((this.frames * 1000) / (now - this.lastHzUpdate));
            const hzDisplay = document.getElementById('hz-display');
            if (hzDisplay) hzDisplay.innerText = hz.toString();
            this.frames = 0;
            this.lastHzUpdate = now;
        }

        if (this.gamepadIndex === null) return;
        const pad = navigator.getGamepads()[this.gamepadIndex];
        if (!pad) return;

        const lsData = document.getElementById('ls-data');
        if (lsData) lsData.innerText = `${pad.axes[0].toFixed(2)}, ${pad.axes[1].toFixed(2)}`;
        const rsData = document.getElementById('rs-data');
        if (rsData) rsData.innerText = `${pad.axes[2].toFixed(2)}, ${pad.axes[3].toFixed(2)}`;
        
        const lsDot = document.getElementById('ls-dot');
        if (lsDot) lsDot.style.transform = `translate(calc(-50% + ${pad.axes[0] * 45}px), calc(-50% + ${pad.axes[1] * 45}px))`;
        
        const rsDot = document.getElementById('rs-dot');
        if (rsDot) rsDot.style.transform = `translate(calc(-50% + ${pad.axes[2] * 45}px), calc(-50% + ${pad.axes[3] * 45}px))`;

        this.calculateError(this.lsOuterRadii, pad.axes[0], pad.axes[1], 'ls-error');
        this.calculateError(this.rsOuterRadii, pad.axes[2], pad.axes[3], 'rs-error');

        const ltData = document.getElementById('lt-data');
        const ltBar = document.getElementById('lt-bar');
        if (pad.buttons[6]) {
            const val = pad.buttons[6].value;
            if (ltData) ltData.innerText = val.toFixed(2);
            if (ltBar) ltBar.style.height = `${val * 100}%`;
        }

        const rtData = document.getElementById('rt-data');
        const rtBar = document.getElementById('rt-bar');
        if (pad.buttons[7]) {
            const val = pad.buttons[7].value;
            if (rtData) rtData.innerText = val.toFixed(2);
            if (rtBar) rtBar.style.height = `${val * 100}%`;
        }

        // Draw ONLY Deadzones
        this.drawDeadzone('ls-canvas');
        this.drawDeadzone('rs-canvas');
        
        // Draw Circularity Outer Bounds
        this.drawCircularity('ls-circ-canvas', pad.axes[0], pad.axes[1], this.lsCircPath, '#3498DB'); 
        this.drawCircularity('rs-circ-canvas', pad.axes[2], pad.axes[3], this.rsCircPath, '#2ECC71'); 

        let historyChanged = false;
        pad.buttons.forEach((btn, index) => {
            if (btn.pressed && !this.lastButtonState[index]) {
                this.buttonHistory.unshift(`B${index}`);
                if (this.buttonHistory.length > 12) this.buttonHistory.pop();
                historyChanged = true;
            }
            this.lastButtonState[index] = btn.pressed;
        });

        if (historyChanged) {
            const histEl = document.getElementById('button-history-container');
            if (histEl) {
                histEl.innerHTML = this.buttonHistory.map(b => 
                    `<span style="background: rgba(255,255,255,0.1); border: 1px solid var(--border-color); color: var(--text-main); padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 500;">${b}</span>`
                ).join('');
            }
        }

        const rawContainer = document.getElementById('raw-buttons-container');
        if (rawContainer) {
            const activeButtons = pad.buttons
                .map((btn, index) => btn.pressed ? `B${index}` : null)
                .filter(b => b !== null);
            
            if (activeButtons.length > 0) {
                rawContainer.innerHTML = activeButtons.map(b => 
                    `<span style="background: #F4F6F8; color: #0A0F2C; padding: 4px 8px; border-radius: 4px; font-weight: 600;">${b}</span>`
                ).join(' ');
            } else {
                rawContainer.innerText = 'Waiting for input...';
            }
        }

        pad.buttons.forEach((btn, index) => {
            const svgBtn = document.getElementById(`btn-${index}`);
            if (svgBtn) {
                svgBtn.style.color = btn.pressed ? '#FFFFFF' : 'var(--border-color)';
            }
        });

        const mainStickL = document.getElementById('btn-10');
        if (mainStickL) mainStickL.style.transform = `translate(${pad.axes[0] * 12}px, ${pad.axes[1] * 12}px)`;

        const mainStickR = document.getElementById('btn-11');
        if (mainStickR) mainStickR.style.transform = `translate(${pad.axes[2] * 12}px, ${pad.axes[3] * 12}px)`;
    }
}

// --- MICROPHONE TESTER LOGIC ---
class MicTester {
    private mediaRecorder: MediaRecorder | null = null;
    private audioChunks: Blob[] = [];
    private isRecording = false;
    private hasPermission = false;

    constructor() {
        this.initMicUI();
    }

    private async initMicUI() {
        const recordBtn = document.getElementById('start-recording-btn') as HTMLButtonElement;
        const selectEl = document.getElementById('mic-input-select') as HTMLSelectElement;

        await this.populateMicList();

        if (recordBtn) {
            recordBtn.addEventListener('click', async () => {
                if (!this.isRecording) {
                    if (!this.hasPermission) {
                        try {
                            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                            this.hasPermission = true;
                            stream.getTracks().forEach(track => track.stop()); 
                            await this.populateMicList(); 
                        } catch (e) {
                            const statusEl = document.getElementById('mic-status');
                            if (statusEl) statusEl.innerText = '⚠️ Microphone access denied.';
                            return; 
                        }
                    }

                    this.startRecording(selectEl.value);
                } else {
                    this.stopRecording();
                }
            });
        }
    }

    private async populateMicList() {
        const selectEl = document.getElementById('mic-input-select') as HTMLSelectElement;
        if (!selectEl) return;

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioInputs = devices.filter(device => device.kind === 'audioinput');

            selectEl.innerHTML = '';
            
            if (audioInputs.length === 0) {
                const option = document.createElement('option');
                option.text = "No microphones found";
                option.disabled = true;
                selectEl.appendChild(option);
                return;
            }

            audioInputs.forEach((device, index) => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.text = device.label || `Default Microphone (Requires Permission)`;
                selectEl.appendChild(option);
            });
            
            const statusEl = document.getElementById('mic-status');
            if (statusEl && !this.isRecording) {
                statusEl.innerText = this.hasPermission ? '✅ Microphones loaded. Ready to test.' : 'Press "Start Recording" to begin...';
            }
        } catch (e) {
            console.error("Error enumerating devices", e);
        }
    }

    private async startRecording(deviceId: string) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: deviceId ? { deviceId: { exact: deviceId } } : true
            });

            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) this.audioChunks.push(e.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const playbackEl = document.getElementById('audio-playback') as HTMLAudioElement;
                const containerEl = document.getElementById('audio-playback-container');
                
                if (playbackEl && containerEl) {
                    playbackEl.src = audioUrl;
                    containerEl.style.display = 'block';
                }
                
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.isRecording = true;

            const btn = document.getElementById('start-recording-btn');
            const statusEl = document.getElementById('mic-status');
            const containerEl = document.getElementById('audio-playback-container');
            
            if (containerEl) containerEl.style.display = 'none'; 
            if (btn) {
                btn.innerText = '⏹️ Stop Recording';
                btn.classList.add('recording');
            }
            if (statusEl) statusEl.innerText = '🔴 Recording in progress...';

        } catch (e) {
            console.error("Error accessing microphone", e);
        }
    }

    private stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }
        this.isRecording = false;

        const btn = document.getElementById('start-recording-btn');
        const statusEl = document.getElementById('mic-status');
        if (btn) {
            btn.innerText = 'Start Recording';
            btn.classList.remove('recording');
        }
        if (statusEl) statusEl.innerText = '✅ Recording saved. Play it below.';
    }
}