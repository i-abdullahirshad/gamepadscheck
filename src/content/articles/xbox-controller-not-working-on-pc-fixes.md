---

title: Xbox Controller Not Working on PC? 12 Fixes
description: "Xbox controller not working on PC? Work through 12 fixes covering cables, drivers, Bluetooth pairing, Steam Input and game settings to get it working."

pubDate: 2026-09-05

---

## **Xbox Controller Not Working on PC? 12 Fixes**

An Xbox controller that will not work on PC is usually one of a few problems: a cable that only carries power, a battery that looks fine but is not, a driver that failed to load, or a game reading input in a way your controller is not set up for.

Work through these in order. The early fixes take seconds and solve most cases. The later ones deal with the more stubborn problems.

Before you start, it helps to know whether Windows sees the controller at all. Open an [Xbox controller test](/xbox-controller-test/) and press a button. If the controller appears and the buttons register, Windows and your hardware are fine and the problem is in the game or its settings—a classic [controller detected but not working](/controller-detected-but-not-working/) scenario. If nothing appears at all, the problem is further down the chain and the connection fixes below are where to look.

### **1 Check the cable actually carries data**

This is the most common cause and the easiest to miss.

Many USB cables, especially the ones that ship with phones and power banks, are built only for charging. They have power wires and no data wires. Plug one into a controller and the controller lights up, which makes it look connected, but the PC never sees a device.

- Try a different cable, ideally one that came with a device that transfers data  
- If the controller charges but never appears on the PC, the cable is the most likely culprit  
- Avoid long or very thin cables, which are more likely to be charge only



### **2 Try a different USB port**

Ports fail individually, and not all ports behave the same way.

- Use a port directly on the motherboard at the back of a desktop rather than a front panel port  
- Avoid USB hubs, which can fail to supply enough power or introduce problems  
- If you use a wireless dongle, try a front port or a short USB extension so the dongle is not buried behind a metal case  
- Move dongles away from USB 3.0 ports, which emit interference in the same 2.4GHz band the dongle uses



### **3 Check the batteries properly**

Xbox controllers behave oddly on low power rather than simply switching off.

A controller with weak batteries can still light up, still pair, and still disconnect randomly during play. It can also connect and then fail to register inputs correctly.

- Swap in fresh batteries rather than testing the ones already inside  
- If you use a rechargeable pack, connect a cable and let it charge for a while before testing  
- Some rechargeable packs age badly and hold a charge for only a few minutes, which looks like a connection fault



### **4 Restart the controller and the PC**

Simple, but it clears a genuine class of problem where the controller has connected in a bad state.

- Hold the Xbox button for around six seconds until the controller turns off, then press it again to turn it back on  
- Restart the PC rather than putting it to sleep, since sleep can leave USB devices in a stuck state  
- Unplug the controller before restarting and plug it back in once Windows has loaded



### **5 Update the controller firmware**

Xbox controllers receive firmware updates, and out of date firmware causes connection and pairing problems.

- Install the Xbox Accessories app from the Microsoft Store  
- Connect the controller with a cable, since firmware updates are more reliable wired  
- Open the app and install any update it offers

If the app does not detect the controller at all, that points back to the cable or port, so revisit the first two fixes.

### **6 Reinstall the controller driver**

Windows installs Xbox controller drivers automatically, but a failed or corrupted install leaves the controller half working or not detected.

- Right click the Start button and open Device Manager  
- Look under Xbox Peripherals, or under Human Interface Devices if it is not there  
- Find your controller, right click it, and choose Uninstall device  
- Unplug the controller, restart the PC, then plug it back in

Windows reinstalls the driver on reconnection. If the controller shows a warning icon in Device Manager, this fix is the right one.

### **7 Check for Windows updates**

Controller drivers arrive through Windows Update rather than a separate download.

- Open Settings, then Windows Update, and install anything pending  
- Check optional updates as well, since driver updates sometimes sit there

Note the reverse problem too. If your controller stopped working right after a Windows update, that update may be the cause. Check whether rolling back the driver in Device Manager restores it.

### **8 Fix Bluetooth pairing problems**

Not every Xbox controller supports Bluetooth. Older models require the Xbox Wireless Adapter, and no amount of pairing attempts will change that.

If yours does support Bluetooth:

- Remove the controller from your saved Bluetooth devices and pair it fresh  
- Hold the small pair button on the top of the controller until the Xbox button flashes quickly (if it flashes in strange patterns or won't pair, consult our [Xbox controller blinking fixes](/xbox-controller-blinking-fixes/) to decode the light)  
- Only pair one Xbox controller over Bluetooth at a time, since Bluetooth on these controllers is designed for a single connection  
- Disconnect Bluetooth devices you are not using, since a crowded band causes dropouts

If Bluetooth keeps failing, a cable or the official wireless adapter will be more reliable.

### **9 Close software that takes over the controller**

Several programs can intercept controller input and stop it reaching your game.

- **DS4Windows** and similar tools create virtual controllers and can conflict with a real Xbox pad. Close them completely and test again  
- **Steam** can capture controller input even outside games. Try closing Steam entirely if you are playing a non Steam game  
- **Other launchers and overlays** occasionally do the same

Close everything unnecessary, test, then reintroduce programs one at a time to find the conflict.

### **10 Check Steam Input settings**

If the controller works elsewhere but not in Steam games, Steam Input is usually involved.

- In Steam, right click the game, open Properties, then Controller  
- Try switching between enabling and disabling Steam Input for that game

Both directions can fix things. Some games need Steam Input on to see the controller at all. Others behave badly when Steam creates a virtual controller on top of a pad the game already supports.

Also check Steam's general controller settings under Settings, then Controller, and confirm Xbox controller support is enabled.

### **11 Check the game supports the controller**

Some games read only one kind of input, and the controller being detected by Windows does not guarantee the game will use it.

- Confirm controller support is enabled inside the game's own settings, since some titles default to keyboard and mouse  
- Disconnect other input devices such as a racing wheel or a second controller, which can confuse a game into reading the wrong device  
- Try the game in fullscreen rather than windowed, since some titles ignore controller input when the window is not focused

If the controller works in a gamepad tester but not in one specific game, the problem is that game rather than your hardware.

### **12 Test the controller on another device**

This tells you whether you are dealing with a faulty controller or a PC problem.

- Connect it to an Xbox console if you have one  
- Try it on another PC, or on a phone or tablet that supports controllers

If it fails everywhere, the controller itself has a fault. If it works elsewhere, the problem is on your PC and one of the fixes above is the right path.

### **Narrowing it down quickly**

A few patterns point straight to the cause:

- **Controller lights up but the PC never sees it:** cable or port  
- **Connects then disconnects randomly:** batteries, or wireless interference  
- **Works in some games but not others:** Steam Input, or the game's own settings  
- **Detected in Windows but does nothing in every game:** conflicting software such as DS4Windows  
- **Stopped working after an update:** driver rollback or a fresh driver install  
- **Buttons register but sticks behave oddly:** not a connection problem. Check resting stick values on a gamepad tester for drift

That last one catches people out. A controller that connects fine but moves the camera on its own is working correctly from the PC's point of view. The issue is stick drift, which is a hardware problem rather than a connection one.
