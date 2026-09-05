export class LatencyEngine {
    private requestRef: number | null = null;
    private gamepadIndex: number | null = null;
    
    private isPaused: boolean = false;
    private usingWebHID: boolean = false;
    private activeHIDDevice: HIDDevice | null = null;

    private lastTimestamp: number = 0;
    private deltas: number[] = [];
    private maxHistory: number = 100; // Increased sample size for 1000Hz smoothness
    private chartHistory: number[] = []; 
    private maxChartHistory: number = 60;

    constructor() {
        this.initListeners();
        this.initWebHID();
        this.drawEmptyChart();
    }

    private initListeners() {
        // Pause Button Logic
        const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement;
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.isPaused = !this.isPaused;
                const iconPause = document.getElementById('icon-pause');
                const iconPlay = document.getElementById('icon-play');
                
                if (this.isPaused) {
                    pauseBtn.classList.add('paused');
                    if (iconPause) iconPause.style.display = 'none';
                    if (iconPlay) iconPlay.style.display = 'block';
                } else {
                    pauseBtn.classList.remove('paused');
                    if (iconPause) iconPause.style.display = 'block';
                    if (iconPlay) iconPlay.style.display = 'none';
                    this.lastTimestamp = 0; 
                }
            });
        }

        // Standard Gamepad API Events
        window.addEventListener('gamepadconnected', (e) => {
            if (this.usingWebHID) return; // Ignore if WebHID is already running
            if (this.gamepadIndex === null) {
                this.gamepadIndex = e.gamepad.index;
                this.updateConnectionUI(true, e.gamepad.id, false);
                this.lastTimestamp = 0;
                this.deltas = [];
                this.startPolling();
            }
        });

        window.addEventListener('gamepaddisconnected', (e) => {
            if (this.usingWebHID) return;
            if (this.gamepadIndex === e.gamepad.index) {
                this.gamepadIndex = null;
                this.updateConnectionUI(false, '', false);
                this.stopPolling();
                this.resetStats();
            }
        });
    }

    private initWebHID() {
        const hidBtn = document.getElementById('webhid-btn') as HTMLButtonElement;
        
        // Hide button if browser doesn't support WebHID (e.g., Firefox, Safari)
        if (!('hid' in navigator)) {
            const container = document.getElementById('webhid-container');
            if (container) container.style.display = 'none';
            return;
        }

        hidBtn.addEventListener('click', async () => {
            try {
                // Prompt user to select ANY HID device
                const devices = await navigator.hid.requestDevice({ filters: [] });
                if (devices.length === 0) return;

                this.activeHIDDevice = devices[0];
                await this.activeHIDDevice.open();
                
                // Disconnect standard Gamepad polling
                this.stopPolling();
                this.usingWebHID = true;
                this.gamepadIndex = null; 
                this.lastTimestamp = 0;
                this.deltas = [];
                this.chartHistory = [];
                
                hidBtn.innerText = "✅ WebHID Active (1000Hz Ready)";
                hidBtn.classList.add('active');

                // Extract Hex strings for UI
                const vId = this.activeHIDDevice.vendorId.toString(16).padStart(4, '0');
                const pId = this.activeHIDDevice.productId.toString(16).padStart(4, '0');
                
                this.updateConnectionUI(true, this.activeHIDDevice.productName || 'Custom HID Controller', true, vId, pId);

                // Listen to raw hardware packets directly
                this.activeHIDDevice.addEventListener("inputreport", (event) => {
                    this.handleWebHIDPacket(performance.now());
                });

                // Listen for unexpected disconnects
                navigator.hid.addEventListener('disconnect', (e) => {
                    if (e.device === this.activeHIDDevice) {
                        this.usingWebHID = false;
                        this.activeHIDDevice = null;
                        hidBtn.innerText = "⚡ Unlock 1000Hz (WebHID)";
                        hidBtn.classList.remove('active');
                        this.updateConnectionUI(false, '', false);
                        this.resetStats();
                    }
                });

            } catch (error) {
                console.error("WebHID Error:", error);
            }
        });
    }

    // Handles the raw packet timing for WebHID
    private handleWebHIDPacket(now: number) {
        if (this.isPaused) return;

        if (this.lastTimestamp !== 0) {
            const delta = now - this.lastTimestamp;
            
            // WebHID can push 1ms packets. Filter out sleep spikes over 100ms
            if (delta > 0 && delta < 100) {
                this.deltas.push(delta);
                if (this.deltas.length > this.maxHistory) this.deltas.shift();
                
                this.chartHistory.push(delta);
                if (this.chartHistory.length > this.maxChartHistory) this.chartHistory.shift();

                this.calculateAndRender();
            }
        }
        this.lastTimestamp = now;
    }

    private updateConnectionUI(connected: boolean, name: string, isWebHID: boolean, rawVendor?: string, rawProduct?: string) {
        const statusBadge = document.getElementById('connection-status');
        const deviceName = document.getElementById('device-name');
        const vendorId = document.getElementById('vendor-id');
        const productId = document.getElementById('product-id');
        const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement;

        if (pauseBtn) {
            pauseBtn.disabled = !connected;
            if (!connected) {
                this.isPaused = false;
                pauseBtn.classList.remove('paused');
                const iconPause = document.getElementById('icon-pause');
                const iconPlay = document.getElementById('icon-play');
                if (iconPause) iconPause.style.display = 'block';
                if (iconPlay) iconPlay.style.display = 'none';
            }
        }

        if (statusBadge) {
            if (connected) {
                statusBadge.innerText = isWebHID ? 'WebHID Active' : 'Connected';
                statusBadge.className = `status-badge ${isWebHID ? 'webhid' : 'connected'}`;
            } else {
                statusBadge.innerText = 'Disconnected';
                statusBadge.className = 'status-badge disconnected';
            }
        }

        if (deviceName && vendorId && productId) {
            if (connected) {
                if (isWebHID && rawVendor && rawProduct) {
                    vendorId.innerText = `0x${rawVendor.toUpperCase()}`;
                    productId.innerText = `0x${rawProduct.toUpperCase()}`;
                    deviceName.innerText = name || "HID Gamepad";
                } else {
                    const vendorMatch = name.match(/Vendor:\s*([a-fA-F0-9]+)/i);
                    const productMatch = name.match(/Product:\s*([a-fA-F0-9]+)/i);
                    vendorId.innerText = vendorMatch ? `0x${vendorMatch[1].toUpperCase()}` : 'UNKNOWN';
                    productId.innerText = productMatch ? `0x${productMatch[1].toUpperCase()}` : 'UNKNOWN';
                    deviceName.innerText = name.split('(')[0].trim() || "Standard Gamepad";
                }
            } else {
                deviceName.innerText = 'Waiting for connection...';
                vendorId.innerText = '----';
                productId.innerText = '----';
            }
        }
    }

    private resetStats() {
        const elements = ['main-latency', 'main-hz', 'stat-avg', 'stat-jitter', 'stat-min', 'stat-max', 'stat-hz'];
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerText = id.includes('hz') ? '-- Hz' : '--';
        });
        
        const arc = document.getElementById('gauge-arc');
        if (arc) arc.style.strokeDashoffset = '502';
        
        this.drawEmptyChart();
    }

    // Standard Gamepad API Polling (used only if WebHID is inactive)
    private startPolling() {
        const poll = () => {
            if (!this.usingWebHID) this.updateState();
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

    private updateState() {
        if (this.isPaused) return; 
        if (this.gamepadIndex === null) return;
        
        const pad = navigator.getGamepads()[this.gamepadIndex];
        if (!pad) return;

        if (pad.timestamp !== this.lastTimestamp && this.lastTimestamp !== 0) {
            const delta = pad.timestamp - this.lastTimestamp;
            
            if (delta > 0 && delta < 100) {
                this.deltas.push(delta);
                if (this.deltas.length > this.maxHistory) this.deltas.shift();
                
                this.chartHistory.push(delta);
                if (this.chartHistory.length > this.maxChartHistory) this.chartHistory.shift();

                this.calculateAndRender();
            }
        }
        this.lastTimestamp = pad.timestamp;
    }

    private calculateAndRender() {
        if (this.deltas.length < 5) return; 

        const sum = this.deltas.reduce((a, b) => a + b, 0);
        const avg = sum / this.deltas.length;

        const min = Math.min(...this.deltas);
        const max = Math.max(...this.deltas);

        let jitterSum = 0;
        for (let i = 1; i < this.deltas.length; i++) {
            jitterSum += Math.abs(this.deltas[i] - this.deltas[i-1]);
        }
        const jitter = jitterSum / (this.deltas.length - 1);

        const hz = Math.round(1000 / avg);

        this.setText('main-latency', avg.toFixed(2)); // Show 2 decimals for precision
        this.setText('main-hz', `${hz} Hz`);
        this.setText('stat-avg', avg.toFixed(2));
        this.setText('stat-jitter', jitter.toFixed(2));
        this.setText('stat-min', min.toFixed(2));
        this.setText('stat-max', max.toFixed(2));
        this.setText('stat-hz', hz.toString());

        const arc = document.getElementById('gauge-arc');
        if (arc) {
            const cappedAvg = Math.min(avg, 20);
            const percentage = cappedAvg / 20; 
            const offset = 502 - (502 * percentage);
            arc.style.strokeDashoffset = offset.toString();
        }

        this.drawChart();
    }

    private setText(id: string, text: string) {
        const el = document.getElementById(id);
        if (el && el.innerText !== text) {
            el.innerText = text;
        }
    }

    private drawEmptyChart() {
        const canvas = document.getElementById('latency-chart') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(128,128,128,0.2)';
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 1);
        ctx.lineTo(canvas.width, canvas.height - 1);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    private drawChart() {
        const canvas = document.getElementById('latency-chart') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const barWidth = w / this.maxChartHistory;
        
        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(128,128,128,0.2)';
        ctx.beginPath();
        ctx.moveTo(0, h - 1);
        ctx.lineTo(w, h - 1);
        ctx.stroke();

        for (let i = 0; i < this.chartHistory.length; i++) {
            const delta = this.chartHistory[i];
            
            const cappedDelta = Math.min(delta, 25); 
            const barHeight = (cappedDelta / 25) * h;
            
            const x = i * barWidth;
            const y = h - barHeight;

            if (delta <= 5) ctx.fillStyle = '#2ECC71'; 
            else if (delta <= 8) ctx.fillStyle = '#F3C300'; 
            else ctx.fillStyle = '#E74C3C'; 

            ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
        }
    }
}