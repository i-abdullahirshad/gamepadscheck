---

title: What Is a Good Controller Polling Rate?
description: "What is a good controller polling rate? Learn what 125Hz, 500Hz and 1000Hz really mean, when higher stops helping, and how to check your own rate."

pubDate: 2026-09-05

---

## **What Is a Good Controller Polling Rate?**

Polling rate is how often your computer or console asks your controller for a fresh reading. It is measured in hertz. A controller running at 125Hz is checked 125 times a second, which works out to one reading every 8 milliseconds.

Controller makers have started printing polling rate numbers on boxes, and the numbers keep climbing. 250Hz. 500Hz. 1000Hz. Some now advertise 8000Hz. So it is fair to ask what a good controller polling rate actually is, and at what point the number stops meaning anything.

### **How polling rate works**

Your controller does not push data whenever you press something. It waits to be asked. The host device sends a request, the controller replies with its current state, and that cycle repeats at a fixed pace.

The polling interval sets the worst case delay before your input is noticed:

- **125Hz** is one check every 8ms  
- **250Hz** is one check every 4ms  
- **500Hz** is one check every 2ms  
- **1000Hz** is one check every 1ms

If you press a button just after a check happens, it waits until the next one. At 125Hz that wait can be up to 8ms. At 1000Hz it can be up to 1ms.

That is the whole benefit. A higher polling rate shortens how long your input can sit waiting to be collected.

### **What counts as a good polling rate**

Here is the practical picture.

**125Hz** is the old USB default and is still what many controllers use. It is fine for single player games, story games and anything where timing is relaxed. It is the weakest link if you play competitively.

**250Hz to 500Hz** is the sweet spot for most people. Moving from 125Hz to 500Hz removes up to 6ms of waiting, which is a genuine improvement you can measure. This range covers most modern wired controllers and good 2.4GHz dongles.

**1000Hz** is a reasonable target for competitive play. Going from 500Hz to 1000Hz saves up to another 1ms. It is real, but it is small.

**8000Hz** saves a fraction of a millisecond over 1000Hz. The interval drops from 1ms to 0.125ms. For context, a single frame at 60fps lasts about 16ms, so the saving is a tiny slice of one frame.

The short version: **the jump from 125Hz to 500Hz is worth caring about. Everything above 1000Hz is marketing more than performance.** If you are wondering whether [is 8000Hz controller polling worth it](/8000hz-controller-polling/), the math shows the returns diminish rapidly.

### **Why the gains shrink so fast**

The numbers double but the benefit does not, because you are dividing rather than adding.

- 125Hz to 250Hz saves up to 4ms  
- 250Hz to 500Hz saves up to 2ms  
- 500Hz to 1000Hz saves up to 1ms  
- 1000Hz to 2000Hz saves up to 0.5ms  
- 2000Hz to 8000Hz saves under 0.4ms in total

Each doubling gives you half of what the last one gave. By the time you reach four figures, you are chasing amounts that your monitor cannot even display separately.

### **What actually limits you**

Polling rate is only one link in the chain, and it is rarely the weakest.

**Your frame rate.** Every frame of render delay lasts 1000 divided by your frames per second. At 60fps that is about 16ms per frame. Going from 60fps to 120fps saves around 8ms, which is more than moving from 125Hz to 1000Hz.

**Your display.** A TV in standard picture mode can add tens of milliseconds of processing. Turning on game mode usually saves more time than any polling rate change available to you.

**Your connection type.** Bluetooth adds scheduling delay that a high polling rate cannot undo, because the bottleneck happens before polling matters.

**Your controller's own sensors.** The pad has to read its buttons and sticks and prepare the data. If the hardware only updates its internal state at a certain pace, polling it faster just returns the same value repeatedly, and a fluctuating internal state is exactly what causes [controller jitter](/controller-jitter/).

That last point is important with very high advertised rates. A controller can be polled 8000 times a second and still only produce new information a fraction of that often.

### **Wireless polling rates**

Wireless works differently and the labels can mislead.

**2.4GHz dongles** often support high polling rates because the manufacturer controls both ends of the link. A good dongle can land close to wired performance.

**Bluetooth** does not really have a user facing polling rate. It uses connection intervals, with a floor of 7.5ms for Bluetooth Low Energy and often more in practice. That places Bluetooth in roughly the same territory as 125Hz polling, and no setting on your side changes it.

So if you are on Bluetooth and worried about polling rate, the useful change is switching to a cable or a dongle, a point central to the [wired vs wireless controller](/wired-vs-wireless-controller/) decision.

### **Should you overclock your polling rate?**

Tools exist on PC that force a controller to be polled faster than its default. Before trying one, know the trade offs.

**Reasons people do it**

- It can lift an older 125Hz controller to a much higher rate for free  
- The 125Hz to 500Hz gain is the largest available, and it is real

**Reasons to be careful**

- Some of these tools need unsigned drivers or test signing mode, and **anti cheat systems in competitive games may flag that**. If you play anything with kernel level anti cheat, this alone is a good reason to skip it  
- Higher polling slightly increases CPU load  
- Older systems can develop USB instability or audio crackling  
- Settings sometimes reset after a reboot or a Windows update  
- Console players cannot do this at all

If you decide to try it, test everything afterwards and be ready to undo it.

### **How to check your polling rate**

A browser based tool can give you a useful indication, with one honest limitation worth understanding.

Browsers read controller state on the animation frame, which is tied to your display refresh. At 60Hz that is roughly every 16ms. So a browser sees a limited window into what your controller is doing, and it cannot confirm a 1000Hz rate on a 60Hz screen.

**What you can check in a browser**

Open a [latency tester](/latency-test/), hold a stick steadily in one direction, and watch how often the reported value changes. Compare that behaviour across connections. A wired connection against Bluetooth will usually show a visible difference in how smoothly values update.

This is a comparison, not a certified measurement. Any tool claiming to verify 8000Hz polling from inside a browser is overstating what the browser can see.

**For a more accurate reading**, dedicated desktop polling rate utilities sit closer to the driver and report interval timing more directly.

### **What to prioritise instead**

If your goal is a controller that feels fast, work through this list in order:

- **Use a cable or a 2.4GHz dongle** rather than Bluetooth  
- **Turn on game mode** on your TV or monitor  
- **Raise your frame rate**, and keep it stable rather than fluctuating  
- **Set your deadzones properly**, since a badly set deadzone feels like lag even when nothing is delayed  
- **Then** think about polling rate

A controller at 125Hz on a wired connection with game mode enabled will feel far better than an 8000Hz pad on a TV in standard picture mode.

### **The bottom line**

A good controller polling rate for most players is **500Hz to 1000Hz**. That range removes almost all the waiting time polling can remove, and it is common on modern wired controllers and decent dongles.

If you are stuck at 125Hz, that is the one upgrade worth pursuing. If you are already at 1000Hz, higher numbers are competing for a slice of a millisecond while your display and frame rate are costing you ten times as much.

Buy the controller with better sticks, better buttons and a connection that suits your setup. Treat polling rate above 1000Hz as a spec sheet feature rather than a reason to choose one pad over another.
