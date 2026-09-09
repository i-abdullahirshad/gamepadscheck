---

title: "Controller Detected but Not Working in Game: Fixes"
description: "Controller detected but not working in game? Fix input mode problems, device conflicts, driver issues and software that blocks controller input in games."

pubDate: 2026-09-05

---

## **Controller Detected but Not Working in Game: Fixes**

Windows sees your controller. The lights are on, it shows up in settings, and testing tools register every button. Then you launch a game and it does nothing.

This is a frustrating situation because the obvious things all look correct. But detection and use are two separate steps, and the gap between them has a short list of causes.

Here is how to work through it.

### **First, find out how the game sees your controller**

Detection in Windows is not the same as detection in a game. What matters is the **format** the controller reports in, because a game reading one format will ignore a controller speaking another.

Open a [gamepad tester](/) and press every button.

Check the mapping field:

**If it says standard**, the controller is being read in the modern XInput layout. Buttons will be numbered in the order games expect, and most modern titles will work.

**If it is blank**, the controller is in a raw DirectInput mode. You will usually also see the D pad reported as a single axis with odd decimal values like negative 0.714, and both triggers sharing one axis. Most modern games do not understand this and will ignore the controller entirely, even though Windows detects it perfectly.

This is the single most common cause of a detected controller doing nothing, and it is often fixed by a switch on the pad itself.

### **Fix 1: Switch the controller to XInput**

If the mapping field was blank, this is your fix.

- **Look for a physical switch.** Many third party controllers have a small slider marked X and D, or XInput and DInput. It is often on the back or underneath, which is why it gets missed  
- **Look for a button combination.** Some pads change mode by holding a button while powering on. The combination varies by brand and is usually in the manual  
- **Check the manufacturer's app**, if the controller has one

After switching, recheck the mapping field. It should now read standard.

Note the exception: racing wheels, flight sticks and arcade sticks stay on DirectInput by design, because XInput cannot describe their extra controls. For those devices, the game itself must support DirectInput.

### **Fix 2: Disconnect other input devices**

Games usually read the first controller they find, and Windows does not always offer them the one in your hands.

- Unplug racing wheels, flight sticks and arcade sticks  
- Disconnect any second controller, including one sitting on charge  
- Turn off wireless controllers you are not using, since a paired pad in a drawer still occupies a slot  
- Check for virtual controllers created by remapping software

This explains cases where a game works fine for someone with identical hardware. They simply have fewer devices connected.

### **Fix 3: Check the game's own controller settings**

Many games require controller support to be switched on, and some reset input settings after an update.

- Open the game's settings and look for controller, input or gameplay sections  
- Confirm controller support is enabled, since some titles default to keyboard and mouse  
- Check the bindings have not been cleared  
- Look for an option that selects between input devices

If the game shows keyboard prompts and never switches when you press a controller button, this is usually the reason.

### **Fix 4: Close software that intercepts input**

Remapping tools create a virtual controller, and two layers handling the same pad produces exactly this symptom.

- **DS4Windows** and similar wrappers should be closed and tested one at a time  
- **reWASD** and other remappers do the same thing  
- **Overlays and capture software** occasionally interfere

There is a related problem worth knowing. If a wrapper is running without hiding the original controller, the game may see two devices and read the wrong one. In DS4Windows this is the option to hide the DS4 controller.

Close everything unnecessary, test, then reintroduce programs one by one.

### **Fix 5: Check whether the game supports your controller at all**

Not every controller works everywhere, and this is worth confirming before spending time on drivers.

- **PlayStation controllers** do not use XInput natively. Some games support them directly and many do not, which is why a wrapper such as DS4Windows or Steam Input is usually needed on PC  
- **Switch controllers** need translation in most games  
- **Older games** released before XInput became standard may only speak DirectInput, so a controller in XInput mode will be ignored  
- **Third party pads** vary widely, and some only work in one mode

If a controller works in most games and fails in one specific title, that game is the problem rather than your setup.

### **Fix 6: Run the game in fullscreen and check window focus**

Some games ignore controller input when their window is not active.

- Switch from borderless windowed to fullscreen  
- Click the game window before pressing anything  
- Check whether an overlay or a second monitor is stealing focus

If your [controller stopped working](/controller-stopped-working/) after you alt-tab away and back, this is the cause.

### **Fix 7: Reinstall the driver**

A controller can be detected with a partly broken driver, which produces exactly this pattern. If you need specific [Xbox controller not working on PC fixes](/xbox-controller-not-working-on-pc-fixes/), a clean driver installation is often the first step.

- Right click Start and open Device Manager  
- Find the controller under Xbox Peripherals, or under Human Interface Devices  
- Right click, choose Uninstall device, then unplug the controller  
- Restart, then reconnect so Windows reinstalls the driver

A warning icon next to the device makes this fix more likely to be the right one. Also check Windows Update, since controller drivers arrive through it rather than a separate download.

### **Fix 8: Check Steam is not involved**

If your [controller works in Steam but not in game](/controller-works-in-steam-but-not-in-game/), Steam is likely capturing the input in the background.

- Try closing Steam completely and launching the game again  
- If the controller works with Steam closed, adjust Steam's controller settings rather than leaving it closed permanently

For Steam games specifically, toggling Steam Input for that title solves most cases, and both directions work depending on the game.

### **Fix 9: Check for anti cheat blocking virtual controllers**

Some competitive online games reject virtual controller drivers.

If a game launches but ignores a controller that works everywhere else, and you are using a wrapper, that is a likely cause. Close the wrapper and use the game's native support instead.

### **Fix 10: Confirm the controller is genuinely healthy**

Worth ruling out, because a partly faulty controller can look detected and fine.

In a mapping tester:

- Press every button and confirm each one registers  
- Pull each trigger slowly and check the value climbs smoothly rather than jumping  
- Roll both sticks through their full range and watch for values that skip or stall  
- Rest the controller untouched on a flat surface for a minute and watch the stick values

A stick sitting steadily slightly off zero is a shifted centre point and normal. Values jumping around while your hands are off the controller mean worn hardware.

If a specific button never registers in a tester, that is a hardware fault, and no setting or driver will fix it.

### **Narrowing it down**

- **Mapping field blank:** DirectInput mode. Switch to XInput  
- **Works in most games, fails in one:** that game's support or settings  
- **Nothing works in any game:** driver, input mode, or a conflicting tool  
- **Inputs registering twice:** two remapping layers active  
- **Works until you alt tab:** window focus. Use fullscreen  
- **Only fails in one online game:** anti cheat rejecting a virtual controller  
- **A specific button never registers anywhere:** hardware fault



### **The two checks that solve most cases**

If you want the short version, do these first.

Check the mapping field and switch the controller to XInput if it is blank. Then disconnect every other input device, including wheels, second controllers and anything paired wirelessly.

Between them, those two steps resolve most controllers that are detected and still do nothing in games.
