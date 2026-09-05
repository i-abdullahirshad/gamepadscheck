---

title: "XInput vs DirectInput: What They Are and Which One You Need"
description: "XInput vs DirectInput explained simply. Learn what each one does, how to tell which your controller uses, and how to fix wrong button mapping fast."

pubDate: 2026-09-05

---

## **XInput vs DirectInput: What They Are and Which One You Need**

If your controller connects fine but the buttons land in the wrong places, or your D pad shows up as a strange decimal instead of four directions, you are looking at the difference between XInput and DirectInput.

These are the two ways Windows handles game controllers. Most modern problems with button mapping trace back to which one your controller is using, and the fix is often a switch on the pad itself.

### **What DirectInput is**

DirectInput is the older standard. It arrived when controllers had no agreed layout, so it was built to be flexible rather than consistent.

Under DirectInput, a controller simply reports a list of buttons and axes with no meaning attached. Button 1 is just button 1 Nothing tells Windows whether it sits where an A button would be, or whether it is a trigger, or a paddle on the back.

That flexibility is genuinely useful. It is why DirectInput still handles devices that do not look like a gamepad at all:

- Racing wheels with pedals and shifters  
- Flight sticks and HOTAS setups  
- Arcade sticks and fight sticks  
- Controllers with unusual button counts

The cost is that every game has to work out the layout for itself, and different games guess differently.

### **What XInput is**

XInput came later and took the opposite approach. Instead of describing whatever device is plugged in, it defines one fixed layout that every controller must match.

That layout is always the same:

- Four face buttons  
- Two bumpers  
- Two analog triggers  
- Two analog sticks that click  
- A D pad  
- Start and select style buttons

Because the layout never changes, a game written for XInput knows exactly where everything is. Press the bottom face button and it is always the same input, on every controller, in every game. That is why modern controllers work in modern games with no setup at all.

The limitation is the same as the strength. XInput only understands that one shape. A racing wheel with a full pedal set and an H shifter does not fit, so wheels and flight sticks stay on DirectInput.

### **How to tell which one you are using**

The quickest way is to look at how your controller reports itself.

Open a gamepad mapping test and check the mapping field.

**If it says standard**, your controller is being read in the modern XInput style. Buttons will be numbered in the usual order, with the face buttons at 0 to 3, bumpers at 4 and 5, analog triggers at 6 and 7, stick clicks at 10 and 11, and the D pad at 12 to 15

**If the mapping field is blank**, the controller is reporting a raw layout with no standard applied, which is what DirectInput looks like. You will usually see one or more of these signs:

- The D pad appears as a **single axis** with odd values like negative 1.000, negative 0.714 and negative 0.428, since eight directions are packed into one number  
- Both triggers share **one axis**, with one pushing it negative and the other positive, so pressing both together cancels them out  
- Button numbers match no chart you can find  
- The trigger axis rests at a value other than zero when untouched

None of that is a fault. It is a controller describing itself honestly with no translation applied.

### **The problems each one causes**



#### **Symptoms of a controller stuck in DirectInput**

- Button prompts in the game do not match what you press  
- The D pad does nothing, or moves in menus unpredictably  
- Triggers behave as one control instead of two  
- Vibration does not work  
- The game does not detect the controller at all



#### **Symptoms of a device forced into XInput**

- A racing wheel loses its clutch, handbrake or shifter  
- Pedals get combined onto one axis, so brake and accelerator fight each other  
- A flight stick loses its extra hats and switches  
- Force feedback stops working on a wheel

That second list is why XInput is not simply the better choice. It is the better choice for gamepads, and the wrong choice for anything more complicated.

### **How to switch between them**

Many controllers can do both, and switching is usually simple once you know where to look.

**Look for a physical switch.** Plenty of third party pads have a small slider marked X and D, or XInput and DInput. This is the most common method and the easiest to miss, since the switch is often on the back or underneath.

**Look for a button combination.** Some controllers change mode by holding a button while powering on, for example holding a face button and the home button together. This is usually printed in the manual, which is worth finding since the combination varies by brand.

**Check the manufacturer's software.** Some pads have a companion app that sets the mode.

**Use a wrapper on PC.** Tools like DS4Windows create a virtual XInput controller from a device Windows sees differently. This is how PlayStation controllers work in games that only support XInput.

**Use Steam Input.** Steam reads your controller and presents a virtual one to the game, which solves most mapping problems without any manual configuration.

### **Which one should you use**

**Use XInput if you have a normal gamepad.** Almost every modern game supports it, buttons land where they should, vibration works, and there is nothing to configure. This covers Xbox controllers and most third party pads.

**Use DirectInput if your device is not a gamepad.** Racing wheels, flight sticks, arcade sticks and anything with unusual controls need it, because XInput has no way to describe those inputs.

**Use DirectInput for older games.** Titles released before XInput became standard often only speak the older language. If a game predates roughly the mid 2000s and ignores your controller, switching to DirectInput is worth trying.

### **Why PlayStation controllers are a special case**

DualShock and DualSense controllers do not use XInput natively, which is why they behave inconsistently on PC.

Some games support them directly and show correct button prompts. Others see nothing at all. Many show Xbox prompts while a PlayStation pad is connected, which is the game reading a translated XInput signal without knowing what is underneath.

Your options:

- **Steam Input**, which handles PlayStation controllers well and is the easiest route for Steam games  
- **DS4Windows**, which creates a virtual XInput controller for non Steam games  
- **Native support**, which some games offer and which usually works best when available

If a PlayStation controller shows Xbox button prompts, that is normal for a translated connection rather than a fault.

### **Common problems and what to check**

**Buttons in the wrong places.** Check the mapping field. Blank means the game is guessing at a raw layout. Switch the controller to XInput if it supports it.

**D pad does nothing.** In DirectInput the D pad is often a single axis, and a game expecting four separate buttons will ignore it entirely.

**Both triggers move together.** They share one axis in DirectInput. Switching to XInput separates them into two analog controls.

**Two controllers conflict.** Windows can hand the wrong device to a game when several are connected. Disconnect anything you are not using, including wheels and flight sticks.

**Works in one game, not another.** The two games support different standards. A wrapper or Steam Input bridges the gap.

**Vibration missing.** DirectInput handles force feedback differently and many games do not implement it. XInput usually restores rumble on a gamepad.

### **The short version**

XInput is a fixed layout that guarantees consistency for standard gamepads. DirectInput is a flexible standard that describes whatever device is connected, which is what wheels and flight sticks need.

If your buttons are in the wrong places, check the mapping field first. Blank almost always means DirectInput, and a switch on the controller usually fixes it in seconds.