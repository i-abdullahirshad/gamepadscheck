---

title: "Circularity Error: What Is a Good Value?"
description: "Circularity error explained. Find out what a good value is, how to read the shape your stick draws, and how to improve an uneven stick reading."

pubDate: 2026-09-05

---

## **Circularity Error: What Is a Good Value?**

If you have run a controller test that draws your stick movement as a shape, you have probably seen a number called circularity error. It usually shows as a percentage, and there is rarely any explanation of what counts as good.

Circularity error measures how round your stick's movement actually is. Roll the stick all the way around its edge and a perfect stick would trace a perfect circle. Real sticks do not. Circularity error is how far your stick strays from that ideal shape.

### **What the test is actually measuring**

When you rotate a stick fully around its outer edge, the tester records the distance from centre at every point.

- On a perfect stick, that distance would be identical all the way around  
- On a real stick, the distance changes as you rotate  
- Circularity error is the size of that variation

A lower number means a rounder, more consistent stick. A higher number means the shape is uneven, and your stick reaches further in some directions than others.

### **What counts as a good circularity error**

There is no official standard here, so treat these as practical bands rather than certified grades.


| Circularity error | What it means                                    |
| ----------------- | ------------------------------------------------ |
| Under 5%          | Excellent. Better than most controllers          |
| 5% to 10%         | Good. Normal for a healthy modern controller     |
| 10% to 15%        | Acceptable. Usually unnoticeable in most games   |
| 15% to 20%        | Noticeable. You may feel it in precise aiming    |
| Above 20%         | Poor. Likely wear, damage or a low quality stick |


Most controllers in good condition land somewhere in the 5% to 15% range. Chasing a very low number is not worth stress, because plenty of other things affect your aim far more.

The shape matters as much as the number. A stick that is slightly out of round everywhere behaves differently from one that is perfect except for a single flat spot.

### **Reading the shape, not just the number**

The drawn shape tells you more than the percentage does.

**A smooth, slightly oval shape.** Normal. Most sticks are marginally stronger in one direction than another, and this is nothing to worry about.

**A squared off shape with flattened corners.** Often the plastic gate limiting movement, not the sensor. Common and usually harmless.

**A shape with one flat section.** Something is restricting movement in that direction, whether dirt in the gate, a worn spot, or physical damage.

**A jagged, spiky outline.** The sensor is reading inconsistently as you rotate. This points to a worn or dirty track and is the pattern most worth acting on.

**A shape that is clearly off centre.** Your resting position has shifted, which is drift rather than circularity. Check your resting values separately to see [what do gamepad tester numbers mean](/what-do-gamepad-tester-numbers-mean/) in your specific case.

If you are unsure what your stick is doing, rotate it slowly on a [gamepad tester](/) and watch the numbers change rather than watching the drawing. Values should climb and fall smoothly. Skipping, stalling or bouncing means the sensor is struggling.

### **Why the corners can never be reached**

This is the part that confuses people most, and it is not a fault.

Your stick moves in a circle. The number space it reports into is a square, running from negative 1.00 to positive 1.00 on each axis.

Push fully right and you reach about 1.00 on one axis. Push fully on a diagonal and each axis reaches only about 0.71, because that is where the circle meets the diagonal line.

So a perfectly round stick still cannot fill the square. The corners are geometrically unreachable on every controller ever made. That is not circularity error, that is simply how circles and squares relate.

Circularity error measures whether your circle is a good circle, not whether it fills the square.

### **Why circularity matters in games**

The practical effect shows up in diagonal movement and in precise aiming.

**Diagonal movement can feel slower.** In games that read each axis separately, a diagonal push delivers around 0.71 per axis rather than 1.00. Strafing at an angle can be measurably slower than strafing straight, which matters in shooters.

**Aim speed changes with direction.** If your stick reaches 0.98 in one direction and 0.85 in another, your camera moves faster one way than the other at the same physical push. Your hands try to compensate and never quite settle.

**Circle movements feel uneven.** In racing and flight games, or anywhere you sweep the stick smoothly, an uneven shape produces uneven output.

That said, be realistic about the scale of this. A controller at 12% circularity error is not the reason you lost a match. Drift, deadzone settings, frame rate and display processing all matter more.

### **How to improve it**

#### **Clean the stick**

Dirt in the gate or on the track is a common cause of an uneven shape, especially a flat spot.

Push the stick to one side, apply a small amount of 99% isopropyl alcohol into the gap under the rubber cover, rotate the stick in full circles about twenty times, then repeat for each direction. Let it dry for at least fifteen minutes.

Use 99%, not 70%, because the missing 30% is water.

#### **Check for physical obstruction**

Look at the plastic ring around the stick. A cracked gate, a piece of debris, or a thumbstick cap sitting slightly wrong can all restrict movement in one direction.

Remove and refit the thumbstick cap if your controller allows it, since a cap not seated fully can cause a flat spot on its own.

#### **Recalibrate**

Calibration sets the range as well as the centre. If your stick reaches noticeably further in one direction than another, recalibrating can even it out.

On Switch, use System Settings, then Controllers and Sensors, then Calibrate Control Sticks. On Windows, the joy.cpl wizard handles DirectInput devices, though note it does not affect Xbox controllers in games, since those use XInput and games read those values directly.

#### **Adjust the outer deadzone**

If your stick cannot reach full value in some directions, an [inner vs outer deadzone](/inner-vs-outer-deadzone/) adjustment treats everything above a threshold as maximum.

Set it just below your worst straight direction reading. If your weakest direction reaches 0.94, an outer deadzone around 0.95 works.

Be careful when your stick is badly uneven. Setting the outer deadzone low enough to rescue a weak direction makes every other direction mushy.

#### **Replace the stick module**

If cleaning helps for a few days and the problem returns, or the shape is jagged rather than simply uneven, the track underneath is worn. A module replacement is the only real [controller drift fix](/controller-drift-fix/), and Hall effect replacements remove the wear mechanism entirely.

### **What circularity error will not tell you**

It measures shape, and shape only. It says nothing about:

- **Drift.** Check your resting values separately, with your hands off the controller for a full minute  
- **Response speed.** Circularity is about where the stick goes, not how fast the input arrives  
- **Button health.** Test those individually  
- **Whether the sensor is noisy.** A stick can trace a decent shape while still producing jumpy readings

Run circularity alongside a resting value check rather than instead of one. Together they give you a much better picture than either alone.

### **The practical takeaway**

- **Under 10% is good** and typical of a healthy controller  
- **10% to 15% is fine** and rarely noticeable in play  
- **Above 20% suggests** wear, dirt or damage worth investigating  
- **The shape tells you more than the number.** A flat spot points to an obstruction, a jagged outline points to a worn sensor  
- **Corners are unreachable by design**, and that is geometry rather than a fault

If your number sits in the normal range, stop worrying about it and go check your resting values and deadzone settings instead. Those two things affect how a controller feels far more than a few percentage points of circularity.
