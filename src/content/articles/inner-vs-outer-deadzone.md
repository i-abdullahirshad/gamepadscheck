---

title: "Inner vs Outer Deadzone: What Each One Actually Does"
description: "Inner vs outer deadzone explained simply. Learn what each setting changes, what it costs you, and how to set both using your own controller readings."

pubDate: 2026-09-05

---

## **Inner vs Outer Deadzone: What Each One Actually Does**

Most games give you one slider called deadzone and no explanation. Some give you two. A few give you separate settings for each stick.

The usual advice is to set your deadzone as low as possible. That is right about half the time and actively harmful the other half.

Inner and outer deadzones solve opposite problems at opposite ends of your stick's travel. They are not two versions of the same setting.

### **How your stick output works**

Your stick reports a value from 0.00 at rest to 1.00 at full push. Games rarely use that full range directly. They cut a piece off each end first, then stretch what remains back out to fill 0.00 to 1.00 again.

That stretching is the part people miss. Deadzone settings do not simply ignore input. They change how your whole remaining range maps to movement in the game.

### **Inner deadzone**

**What it does.** It ignores everything below a certain value near the centre. With an inner deadzone of 0.10, any stick reading under 0.10 counts as exactly zero.

**What it is for.** Stopping drift. If your stick rests at 0.04 instead of 0.00, the game sees constant input and your camera creeps. An inner deadzone above that resting value makes the game ignore it.

**What it costs you.** Your slowest movements disappear. Small adjustments, like nudging your aim a few pixels onto a distant target or making a tiny steering correction, all happen in that low range. An inner deadzone of 0.20 means the first fifth of your stick travel does nothing at all.

There is a second problem. Most games do not fade in gently from the deadzone edge. They jump. Cross the 0.20 line and your input snaps from nothing to whatever 0.20 maps to. That produces the sticky then sudden feel people describe as loose aim.

**How to set it.** Measure your real resting drift first. Rest the controller untouched on a flat surface and watch the axis values on a gamepad tester for a full minute. Note the **highest** value you see, not the average, because you are setting a floor above the worst case.

Then set your inner deadzone to roughly **1.5 times that peak**.

- Peak drift of 0.03 gives you about 0.05  
- Peak drift of 0.06 gives you about 0.09  
- A stick genuinely reading 0.00 can often run at 0.02 or lower

The extra margin matters because drift is not perfectly constant. Temperature and stick position both move it slightly, so a deadzone set exactly at your measured peak will let occasional inputs slip through.

### **Outer deadzone**

**What it does.** It treats everything above a certain value as full input. With an outer deadzone of 0.95, anything from 0.95 upward counts as 1.00.

**What it is for.** Making sure you can actually reach maximum. Many sticks never quite reach 1.00. Push fully right and you might see 0.96. Without an outer deadzone, that controller can never sprint at full speed or turn at maximum rate, so you are permanently capped below your own hardware.

**The bigger reason is diagonals.** This is where outer deadzone earns its place, and most players do not realise they have the problem.

Sticks move in a circle. The number space is a square. Push fully right and one axis reaches 1.00. Push fully on a diagonal and each axis reaches only about 0.71, because that is where the circle meets the diagonal. The corners of the square cannot be reached on any controller ever made.

In games that read each axis separately, this means diagonal movement can be slower than straight movement. Strafing at an angle ends up worse than strafing straight. An outer deadzone pushes the reachable circle outward so diagonals register closer to full.

**What it costs you.** Fine control at the top of your range. With an outer deadzone of 0.85, everything from 0.85 to 1.00 feels identical, and the last part of your stick travel does nothing. In a racing game that means a hard turn and a maximum turn become the same thing.

**How to set it.** Push each stick fully in all four straight directions and note the **lowest** maximum you see. If your worst direction reaches 0.94, set the outer deadzone around 0.95.

Then check for imbalance. If left reaches negative 0.98 but right stops at 0.85, that is not something to compensate for. That is a worn or misaligned stick, and setting your outer deadzone to 0.85 makes the good direction mushy just to rescue the bad one.

### **The two settings side by side**


|                   | Inner deadzone                             | Outer deadzone                      |
| ----------------- | ------------------------------------------ | ----------------------------------- |
| Where it acts     | Near the centre                            | Near maximum                        |
| Problem it solves | Drift and unwanted input                   | Unreachable maximum, weak diagonals |
| Set too high      | Small adjustments vanish, aim feels sticky | Fine control at full push vanishes  |
| Set too low       | Camera moves on its own                    | Cannot reach full sprint or turn    |
| Depends on        | How worn your sticks are                   | Your stick range and geometry       |




### **Anti deadzone, the third setting**

Some tools offer anti deadzone, including Steam Input and DS4Windows. It exists because of a stacking problem.

Many games apply their own hidden deadzone that you cannot see or turn off. If you already set a deadzone in Steam Input, the game applies its own on top of your processed output. The two stack, and the combined dead area is larger than either number suggests.

Anti deadzone scales your output so it starts just above the game's hidden threshold, cancelling the second one out.

It is only worth touching when you are running a system level layer **and** a game with its own fixed deadzone. On a single layer it does nothing useful, and setting it anyway creates a jump at centre.

### **Your two sticks want different settings**

Where a game lets you set them separately, do it.

**Left stick, movement.** You mostly push it all the way. Walking slowly matters in some games but rarely decides anything. A slightly larger inner deadzone is cheap here, and an outer deadzone helps diagonal strafing.

**Right stick, aiming.** Small adjustments are the entire job. Keep the inner deadzone as low as your drift allows, because every extra 0.01 costs precision on distant targets. Outer deadzone matters less, since you rarely need maximum turn speed to be exact.

This is why a single shared slider is always a compromise. Tune it for aiming and movement drift slips through. Tune it for movement and your aim goes blunt.

### **The order to work in**

- Measure your resting values and full push range in a tester before touching any slider  
- If the resting values jump around rather than sitting steady, stop. That is worn hardware, and deadzone settings only hide it while it gets worse  
- Set the inner deadzone to about 1.5 times your peak drift, per stick  
- Set the outer deadzone just below your worst straight direction maximum  
- Test in game and adjust in steps of 0.01, since deadzone changes feel much bigger in play than the numbers suggest

If you find yourself needing an inner deadzone above roughly 0.15 to stop drift, no setting will save that controller. At that point you are choosing between cleaning it, replacing the stick module, or buying a new pad.