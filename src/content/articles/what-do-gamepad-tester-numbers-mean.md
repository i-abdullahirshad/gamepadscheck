---

title: What Do Gamepad Tester Numbers Mean?
description: "What do gamepad tester numbers mean? Understand axis values, button readings, mapping and drift so you can check your controller with confidence."

pubDate: 2026-09-05

---

## **What Do Gamepad Tester Numbers Mean?**

You plug in your controller, open a gamepad tester, and see a screen full of decimals. One axis reads negative 0.02. Another sits at 0.01. A trigger shows 0.00 until you squeeze it. Somewhere there is a line that says standard, and a long string with vendor and product codes in it.

Nothing is labelled in plain English, so most people guess. This guide explains what each number is, where it comes from, and which values mean your controller is healthy versus worn.

Open our [gamepad tester](/) in another tab and follow along. The numbers make far more sense when you can move a stick and watch them react.

### **Where the numbers come from**

Every browser based controller tester reads the same source, which is the Gamepad API built into Chrome, Edge, Firefox and Safari. Your controller reports its state to Windows, Windows passes it to the browser, and the browser shows it as a simple list of axes and buttons.

Two things follow from that.

- **These are the same values your games receive.** A tester is not simulating anything. If it shows drift, your game sees that drift too.  
- **They are not raw hardware readings.** The data has already passed through the controller firmware and your system driver. A tester cannot see inside the stick module, only the final number.



### **Axis values and the negative 1 to positive 1 scale**

Each analog stick reports two axes, and every axis is a decimal between negative 1.00 and positive 1.00.


| Axis   | What it controls        | Left or up | Centre | Right or down |
| ------ | ----------------------- | ---------- | ------ | ------------- |
| Axis 0 | Left stick sideways     | −1.00      | 0.00   | 1.00          |
| Axis 1 | Left stick up and down  | −1.00      | 0.00   | 1.00          |
| Axis 2 | Right stick sideways    | −1.00      | 0.00   | 1.00          |
| Axis 3 | Right stick up and down | −1.00      | 0.00   | 1.00          |




#### **Why up shows as a negative number**

Push the stick up and the vertical axis goes toward negative 1.00, not positive. This surprises almost everyone the first time.

It is not a bug or an inverted setting. It follows screen coordinates, where the starting point is the top left corner and the number grows as you move down. Almost all 2D graphics systems work this way. Your controller is not backwards, the axis is simply measured the way screens are measured.

#### **Why your stick never quite reaches 1.00**

Push a stick fully right and you often see 0.96 or 0.98 rather than a clean 1.00. Push it diagonally and both axes might show around 0.71 instead of 1.00 each.

Both are normal.

A stick moves in a circle, but the number space is a square. The corners of that square cannot be reached. When you push fully on a diagonal, the circle meets the diagonal at roughly 0.707 on each axis. That is geometry, not a fault, and it happens on every controller ever made—a key concept when evaluating [circularity error](/circularity-error/).

A slightly short reading in a straight direction, somewhere between 0.95 and 0.99, is usually just factory calibration. It only matters if the two sides do not match. Left reaching negative 0.98 while right stops at 0.85 points to a worn or misaligned stick.

### **Button values and what they should look like**

Buttons report two things at once. A pressed state, which is either true or false, and a value between 0.00 and 1.00.

For face buttons, bumpers and stick clicks this is simple. The value is 0.00 when released and 1.00 when held, because those are basic on and off switches.

**Triggers are different.** On most modern controllers the triggers are analog. Pull one slowly and the value should climb smoothly through readings like 0.15, 0.40 and 0.72.

A trigger that jumps straight from 0.00 to 1.00 with nothing in between is either a digital only trigger, which is common on cheap and mobile controllers, or a sign the analog sensor has failed.

#### **Standard button numbers**

When the tester says the mapping is standard, buttons are numbered the same way on every controller.


| Number    | Xbox                        | PlayStation                     |
| --------- | --------------------------- | ------------------------------- |
| 0 to 3    | A, B, X, Y                  | Cross, Circle, Square, Triangle |
| 4 and 5   | LB, RB                      | L1, R1                          |
| 6 and 7   | LT, RT (analog)             | L2, R2 (analog)                 |
| 8 and 9   | View, Menu                  | Create, Options                 |
| 10 and 11 | Left and right stick click  | L3, R3                          |
| 12 to 15  | D pad up, down, left, right | D pad up, down, left, right     |
| 16        | Xbox button                 | PS button                       |




### **The mapping field: standard or blank**

Somewhere on the tester there is a mapping value. It either says standard or it is empty.

**Standard** means the browser recognised your controller and arranged it into the layout above. Everything sits where you expect.

**Blank** means the browser did not recognise it and is passing through the raw layout the controller reports. This is where things look strange.

- The D pad may show as a **single axis** with values like negative 1.000, negative 0.714 and negative 0.428, because eight directions are packed into one number  
- Both triggers may share **one axis**, with one pushing it negative and the other positive, so pressing both together cancels them out  
- Button numbers will match no chart, because there is no standard being applied

A blank mapping is not a fault. It usually means the controller is in DirectInput mode instead of XInput. Many pads have a small switch or a button combination to change modes, and switching to XInput normally fixes it straight away.

### **Reading resting values: is this drift?**

This is what most people came to check.

Rest the controller on a flat surface, take your hands off completely, and watch the axis values for a full minute.


| Resting value  | What it means                                                               |
| -------------- | --------------------------------------------------------------------------- |
| 0.00 to 0.02   | Normal. Every stick has a tiny offset                                       |
| 0.03 to 0.08   | Small offset. Usually hidden by game deadzones, and calibration often helps |
| 0.09 to 0.15   | Real drift. Expect unwanted movement in games with low deadzones            |
| 0.16 and above | Severe. This will affect almost every game, requiring a [controller drift fix](/controller-drift-fix/)      |


These are practical guide bands rather than a diagnosis. If your resting value falls into the "Real drift" or "Severe" range, setting an appropriate [inner vs outer deadzone](/inner-vs-outer-deadzone/) can mask the issue, but two details matter more than the number itself.

**Is it steady or jumping?** A stick sitting calmly at 0.06 has a shifted centre point. The sensor is still reading cleanly, so calibration can help. A stick flickering between 0.02, 0.19 and negative 0.07 while untouched has electrical noise from worn contacts. That is hardware, and calibration will not fix it.

**Does it return to the same place?** Push the stick fully in one direction, release it, and see where it lands. A healthy stick returns to within about 0.01 of where it started. If it settles somewhere different each time, the centring spring is tired.

### **The other fields on the page**

**Index.** Just a slot number. The first controller connected is 0, the second is 1 It says nothing about your hardware.

**ID string.** Something like Xbox Wireless Controller with vendor and product codes attached. Those four character codes identify the exact device. This is genuinely useful when a controller sold as an Xbox pad turns out to report a different vendor entirely.

**Timestamp.** Updates whenever the controller reports new state. If it freezes while you are pressing buttons, the connection has dropped.

**Axis count.** Most modern pads report 4, meaning two sticks. Six or more usually means triggers are exposed as axes too, which is common on DirectInput devices and normal on racing wheels and flight sticks.

### **What a browser tester cannot tell you**

Being clear about this matters, because it separates a useful reading from a misleading one.

A browser reads controller state on the animation frame, which ties it to your display refresh. That is roughly every 16 milliseconds at 60Hz. So a tester shows your input values accurately, but it **cannot verify a 1000Hz polling rate**, and it cannot measure true input lag, because it has no idea when your finger physically touched the button.

It also cannot see inside the controller. Stick type, cable quality and internal timing are all invisible in the numbers.

What it is reliable for is detecting drift, finding dead or sticking buttons, confirming triggers work across their full range, checking stick range and symmetry, and confirming the system recognises the controller correctly.

### **Quick reference**

- Axes run from negative 1.00 to positive 1.00, and **up is negative**  
- Diagonals stopping near 0.71 is geometry, not a fault  
- Triggers should climb smoothly rather than jump  
- Mapping says standard when the browser knows your pad, and blank usually means DirectInput  
- At rest, **under 0.02 is healthy**. Steady means calibration, jumping means worn hardware  
- Push, release, and check it returns to the same centre
