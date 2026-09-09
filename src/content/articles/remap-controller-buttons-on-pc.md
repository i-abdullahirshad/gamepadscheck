---

title: How to Remap Controller Buttons on PC (Free Tools)
description: "How to remap controller buttons on PC using free tools. Compare Steam Input, Xbox Accessories and DS4Windows, and fix common remapping problems."

pubDate: 2026-09-05

---

## **How to Remap Controller Buttons on PC (Free Tools)**

Remapping controller buttons on PC is easier than it used to be, and you almost never need to pay for it. Between Steam, the Xbox app, and a couple of free utilities, you can rebind almost any controller for almost any game.

The main thing to get right is choosing the correct tool for your situation, because the wrong one either does nothing or creates conflicts. This guide covers each option, what it is good at, and when to reach for it.

### **Before you remap: check what your controller reports**

Remapping goes badly when you do not know how the game currently sees your controller. A button that appears to do nothing may not be broken. It may be arriving as something the game does not recognise.

Open a [button mapping test](/button-mapping-test/) and press every button in turn. Note which index each one reports.

Two things are worth checking:

- **The mapping field.** If it says standard, your controller is being read in the modern XInput layout and button numbers will match what games expect. If it is blank, the controller is in a raw DirectInput mode, and button numbers will match nothing  
- **Whether every button registers at all.** A button that does not appear in a tester is not a mapping problem. It is a hardware problem, and no remapping tool will fix it

If the mapping is blank, check for a physical switch on the controller first. Understanding the distinctions in [XInput vs DirectInput](/xinput-vs-directinput/) helps clarify why flipping that toggle often solves detection issues without needing custom software mappings.

### **Option 1: Steam Input**

Steam has the most capable free remapping system on PC, and it works for games you did not buy on Steam.

**What it does well**

- Remaps any button to any other button, or to keyboard and mouse inputs  
- Works with Xbox, PlayStation, Switch and most third party controllers  
- Supports gyro aiming on controllers that have it  
- Stores profiles per game, so settings follow the title  
- Lets you download layouts other players have made

**How to use it**

- Open Steam and go to Settings, then Controller, and make sure support for your controller type is enabled  
- Right click a game in your library, open Properties, then Controller, and set Steam Input to enabled  
- With the game selected, click the controller icon to open the layout editor  
- Click any button to change what it sends

**For games you did not buy on Steam**, use Add a Non-Steam Game from the Games menu. Launch it through Steam afterwards and your layout applies.

**A caution about activators.** Steam lets you bind different actions to a long press, a double press, or a release. These are powerful, but they add delay by design, because Steam has to wait to see how you pressed the button before deciding what you meant. If a remapped button feels sluggish, check whether you put an activator on it.

### **Option 2: Xbox Accessories app**

For Xbox controllers, this is the simplest option, and it has one advantage nothing else offers.

**What makes it different**

Remaps are stored **on the controller itself**. That means they apply everywhere, in every game, on every device, with no software running. Take the controller to another PC or a console and the remap comes with it.

**What it can do**

- Swap face buttons, bumpers, triggers and sticks  
- Assign the back paddles on Elite controllers  
- Adjust stick sensitivity curves and trigger travel on Elite models  
- Store multiple profiles you can switch between

**What it cannot do**

- Map controller buttons to keyboard or mouse inputs  
- Create per game profiles that switch automatically  
- Work with non Xbox controllers

**How to use it**

- Install the Xbox Accessories app from the Microsoft Store  
- Connect the controller, ideally with a cable  
- Choose Configure, then edit the button mapping

Because the remap lives on the controller, remember to undo it when you are finished. A profile set up months ago will follow the controller and cause confusion later.

### **Option 3: DS4Windows**

Built for PlayStation controllers on PC, and useful for other pads too. Following a detailed [DS4Windows setup guide](/ds4windows-setup-guide/) ensures virtual drivers and hidden controller modes are configured properly.

**What it does**

It reads your controller and creates a virtual Xbox controller that games recognise. That solves the common problem of a game not detecting a PlayStation pad at all.

**Good for**

- PlayStation controllers in games without native support  
- Non Steam games where you want detailed remapping  
- Mapping controller inputs to keyboard and mouse  
- Using the DualSense touchpad and gyro

**Things to watch**

- Close Steam Input for the same game, or both will try to handle the controller and produce doubled or missing inputs  
- Some anti cheat systems are sensitive to virtual controller drivers, so check before using it in a competitive online game  
- It needs updating after major Windows updates, since it ties closely into the system

### **Option 4: reWASD**

Worth mentioning for completeness. It is the most capable remapping tool available and it is paid, with a trial period.

Consider it only if the free options have failed and you need something specific, such as complex layered profiles or unusual device support. For most people, Steam Input covers the same ground for free.

### **Option 5: The game's own settings**

Easy to overlook, and often the best answer.

Many games have full button remapping built in. That is the cleanest route, because nothing sits between your controller and the game, so there is no extra delay and nothing to conflict with.

Check the game's controls menu before installing anything. If it offers what you need, stop there.

### **Choosing the right tool**

- **Xbox controller, same remap everywhere:** Xbox Accessories app  
- **Steam games, per game profiles:** Steam Input  
- **PlayStation controller in a game that ignores it:** DS4Windows, or Steam Input for Steam games  
- **Mapping controller buttons to keyboard keys:** Steam Input or DS4Windows  
- **Non Steam game with a normal gamepad:** add it to Steam as a non Steam game, then use Steam Input  
- **Competitive online game:** the game's own settings, to avoid anti cheat issues with virtual drivers

### **The rule that prevents most problems**

**Use one remapping layer at a time.**

The most common cause of remapping going wrong is two tools handling the same controller. Steam Input running alongside DS4Windows produces doubled inputs, missing inputs, or a controller that appears twice.

If your remap behaves strangely:

- Close every remapping tool except the one you want  
- Test the controller in the game  
- Add tools back one at a time if you need more than one

Remember the Xbox Accessories app counts as a layer too, even though nothing is running. Its remap lives on the controller, so a swap set there will stack on top of whatever Steam Input does.

### **Common problems and fixes**

**Remap works in one game only.** Your profile is per game. Steam Input applies profiles per title by design, so set it again for the other game or save it as a template.

**Controller appears twice in a game.** A virtual controller layer is running alongside the real device. In DS4Windows, enable the option to hide the original controller. In Steam, make sure only one layer is active.

**Buttons doubled or firing twice.** Two remapping tools are both active. Close one.

**Remap does nothing.** The game may be reading raw input that bypasses your remapping layer. If your [controller works in Steam but not in game](/controller-works-in-steam-but-not-in-game/), check whether the game has its own controller settings, and try toggling Steam Input on or off.

**A button feels delayed after remapping.** Check for an activator such as a long press or double press binding, which waits before resolving.

**A button still does nothing after remapping.** Test it in a mapping tester. If it does not register there, the switch has failed and this is a hardware problem.

### **A quick sanity check after remapping**

Once you have set up a layout, verify it before jumping into a match. Open your game's controls menu, or a training mode, and press through every button you changed.

Watch particularly for buttons you did not intend to change. Remapping tools often swap rather than reassign, so setting A to do B's job may leave B doing nothing at all.
