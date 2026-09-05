---

title: Controller Works in Steam but Not in Game?
description: "Controller works in Steam but not in game? Fix it with Steam Input toggles, device conflicts, input mode checks and settings that cause this exact problem."

pubDate: 2026-09-05

---

## **Controller Works in Steam but Not in Game?**

This is one of the most confusing controller problems on PC. Steam shows the controller connected. You can navigate Big Picture mode with it. The controller settings page responds to every button. Then you launch a game and nothing works.

The controller is almost certainly fine. What is happening is that Steam and the game are reading input in different ways, and something is breaking between the two.

Here is how to find out which link is failing.

### **First, confirm what the controller actually reports**

Steam detecting your controller tells you Steam can see it. It does not tell you what a game outside Steam sees, because Steam has its own input layer.

Close Steam completely, then open a gamepad mapping test and press every button.

**If the tester detects the controller and buttons register**, your hardware and drivers are fine. The problem is between Steam and the game, and the fixes below apply.

**If the tester shows nothing with Steam closed**, the controller only works because Steam is translating it. That is normal for PlayStation and Switch pads, and it means the game needs Steam Input running to see anything.

**Check the mapping field too.** If it says standard, the controller is being read in the modern XInput layout. If it is blank, the controller is in a raw DirectInput mode, and many games will simply ignore it.

That single check tells you which half of this guide you need.

### **Fix 1: Toggle Steam Input for that game**

This is the most common fix, and it works in both directions depending on the game.

- Right click the game in your Steam library  
- Open Properties, then Controller  
- Change the setting between Enable Steam Input and Disable Steam Input  
- Launch the game and test

**Why both directions work**

Some games have no controller support of their own and rely entirely on Steam Input to translate your pad into something they understand. Turn it off and they see nothing.

Other games have their own controller support and get confused when Steam creates a virtual controller on top. They end up seeing two devices, or reading the wrong one, and ignore your input.

There is no universal correct setting. Try one, test, then try the other.

### **Fix 2: Check the game is launched through Steam**

Steam Input only applies to games launched from Steam.

If you start the game from a desktop shortcut, another launcher, or the game's own executable, Steam is not involved and its controller settings do nothing.

- Always launch from your Steam library  
- For non Steam games, use Add a Non-Steam Game from the Games menu, then launch it through Steam  
- Watch for games that launch through a second launcher after starting from Steam, since some titles hand off in a way that breaks the connection



### **Fix 3: Check the game's own controller settings**

Easy to overlook, and it catches people regularly.

Some games default to keyboard and mouse and require you to enable controller support manually. Others reset their input settings after an update.

- Open the game's settings and look for a controller, input or gameplay section  
- Confirm controller support is enabled  
- Check the button bindings have not been cleared  
- Look for an option that switches between input devices

If the game shows keyboard prompts and never switches when you press a controller button, this is usually why.

### **Fix 4: Disconnect other input devices**

Games often read only the first controller they find, and Windows does not always hand them the one you are holding.

- Disconnect racing wheels, flight sticks and arcade sticks  
- Unplug any second controller, including one sitting charging  
- Turn off wireless controllers you are not using, since a paired pad in a drawer still counts

This is a common cause when a game works for someone else with identical hardware. They simply have fewer devices connected.

### **Fix 5: Close software that intercepts the controller**

Remapping tools create virtual controllers, and two layers fighting over the same pad produces exactly this symptom.

- **DS4Windows** running alongside Steam Input is the classic conflict. Pick one. If using DS4Windows, disable PlayStation controller support in Steam settings. If using Steam Input, close DS4Windows entirely  
- **reWASD and similar tools** cause the same problem  
- **Overlays and capture software** occasionally interfere

Close everything unnecessary, test the game, then add programs back one at a time if you need them.

### **Fix 6: Check Steam's general controller settings**

Separate from per game settings, and worth confirming.

- In Steam, open Settings, then Controller  
- Make sure support is enabled for your controller type, whether Xbox, PlayStation, Switch or generic  
- If you use a PlayStation pad with DS4Windows, this should be **disabled**, since DS4Windows is already handling it

A mismatch here explains controllers that work in Steam's own interface and nowhere else.

### **Fix 7: Run the game in fullscreen**

Some games ignore controller input when their window is not the active one.

- Switch from borderless windowed to fullscreen  
- Click on the game window before pressing anything  
- Check whether an overlay or second monitor is stealing focus

If the controller works and then stops when you alt tab away and back, this is the cause.

### **Fix 8: Check the controller is not in the wrong input mode**

If your mapping field showed blank rather than standard, the controller is reporting a raw layout that most modern games do not understand.

- Look for a physical switch on the controller marked X and D, or XInput and DInput. Many third party pads have one, often on the back  
- Look for a button combination that changes mode, usually printed in the manual  
- Switch to XInput and test again

In DirectInput mode you will often see the D pad reported as a single axis with odd decimal values, and both triggers sharing one axis. Modern games expect neither.

### **Fix 9: Verify game files**

If the game recently updated or crashed, its input configuration may be damaged.

- Right click the game in Steam  
- Open Properties, then Installed Files  
- Choose Verify integrity of game files

This replaces damaged files without affecting your saves.

### **Fix 10: Check for anti cheat blocking virtual controllers**

Some competitive online games reject virtual controller drivers.

If a game launches but ignores a controller that works everywhere else, and you are using DS4Windows or another wrapper, that is a likely cause.

- Close the wrapper and use the game's native controller support  
- Or use Steam Input, which is more widely accepted



### **Working out which fix you need**

- **Works in Steam menus, dead in every game:** Steam Input setting, or a conflicting tool  
- **Works in some games, not others:** those games support different input standards  
- **Only works with Steam running:** normal for PlayStation and Switch pads. The game needs Steam Input on  
- **Stopped after a Windows update:** driver problem rather than a Steam one  
- **Works until you alt tab:** window focus. Use fullscreen  
- **Inputs registering twice:** two remapping layers running at once  
- **Nothing registers even with Steam closed in a tester:** hardware or driver, not Steam

That last row matters. If the controller does not appear in a mapping test with Steam closed, no Steam setting will help, and you are looking at a cable, driver or hardware problem instead.

### **The two settings that solve most cases**

If you want the short version, try these before anything else.

Toggle Steam Input for the specific game, testing both on and off. Then disconnect every input device except the controller you are using.

Between them, those two steps resolve the majority of controllers that work in Steam and not in games.