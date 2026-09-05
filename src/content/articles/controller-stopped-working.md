---

title: Controller Stopped Working After a Windows Update?
description: "Controller stopped working after a Windows update? Fix it with driver reinstalls, rollbacks, Bluetooth re-pairing and Steam Input checks that actually work."

pubDate: 2026-09-05

---

## **Controller Stopped Working After a Windows Update?**

A controller that worked yesterday and stopped after a Windows update is almost always a driver problem, not a hardware one. Windows updates replace controller drivers, reset settings, and occasionally change how devices are handled. Your controller is usually fine.

The useful part is that this narrows things down. You are not hunting a random fault, you are looking at a short list of things the update touched.

Work through these in order.

### **First, confirm the controller still works**

Before changing drivers, find out what Windows currently sees.

Open a gamepad tester and press a button.

**If the controller appears and buttons register**, Windows and your hardware are fine. The problem is in a game or in software sitting between the two, so skip to the sections on Steam Input and game settings.

**If nothing appears at all**, Windows is not seeing the device and the driver fixes below are where to look.

**If it appears but behaves oddly**, for example buttons mapped to the wrong places or the D pad reading as an axis, the controller has fallen back to a different input mode. The mapping section covers that.

This single check decides which half of the guide you need.

### **1 Reinstall the controller driver**

This is the most common fix, because updates frequently leave a driver half installed.

- Right click the Start button and open Device Manager  
- Look under Xbox Peripherals, or under Human Interface Devices if it is not there  
- Find your controller, right click it, and choose Uninstall device  
- Unplug the controller, restart the PC, then plug it back in

Windows reinstalls the driver on reconnection. A warning icon next to the device in Device Manager makes this fix even more likely to be the right one.

If the controller does not appear anywhere in Device Manager, try a different cable first. Many cables carry power only, so the controller lights up while the PC never sees a device.

### **2 Roll the driver back**

If reinstalling gives you the same broken driver, go backwards instead.

- Open Device Manager and find the controller  
- Right click it, choose Properties, then the Driver tab  
- Click Roll Back Driver if the option is available

This restores the previous version, which is exactly what you want when a new one caused the problem. The option is only available for a limited time after the update, so try it sooner rather than later.

If the button is greyed out, Windows has no earlier version stored and you will need the other fixes.

### **3 Check for a newer update**

Sometimes the fix is forward rather than backward, since Microsoft often patches a bad driver quickly.

- Open Settings, then Windows Update, and install anything pending  
- Check Optional updates as well, because driver updates frequently sit there rather than installing automatically

Controller drivers arrive through Windows Update rather than a separate download, so this is where the fix will appear.

### **4 Update the controller firmware**

Windows updates occasionally change how the system talks to controllers, and older firmware can struggle with those changes.

- Install the Xbox Accessories app from the Microsoft Store for Xbox controllers  
- Connect with a cable that carries data, since firmware updates are more reliable wired  
- Install any update offered

For PlayStation controllers, connect by USB and check for a device update through the PlayStation app or a console.

### **5 Re-pair Bluetooth from scratch**

Updates can leave saved Bluetooth pairings in a broken state that still looks normal in your device list.

- Open Windows Bluetooth settings and **remove** the controller rather than just disconnecting it  
- Restart the PC  
- Put the controller into pairing mode and add it fresh

For Xbox controllers, hold the small pair button on top until the light flashes quickly. Only pair one Xbox controller over Bluetooth at a time.

If Bluetooth keeps failing after an update, test with a cable. Working wired and failing wireless tells you the problem is in the Bluetooth stack rather than the controller.

### **6 Check the controller has not switched input modes**

This causes confusing symptoms. The controller connects, buttons register, but nothing lands where it should.

Windows handles controllers in two ways. **XInput** is the modern standard and gives correct button positions automatically. **DirectInput** is the older method, and in that mode the D pad can appear as a single axis, triggers can share one axis, and button numbers match nothing you recognise.

- Check for a physical switch on the controller, since many third party pads have one for XInput and DirectInput  
- Check for a button combination that changes mode, which is common on third party controllers and usually documented in the manual  
- In a gamepad tester, look at the mapping field. If it says **standard**, Windows recognises the controller correctly. If it is blank, the controller is in a raw mode

Updates can reset this on some devices, so it is worth checking even if you never changed it.

### **7 Check Steam Input**

If the controller works in a tester but not in Steam games, Steam is involved.

- Right click the game in Steam, open Properties, then Controller  
- Try switching Steam Input on and then off, since both directions fix different setups  
- Check Settings, then Controller, and confirm support for your controller type is enabled

Steam also updates itself, and a Steam update landing near a Windows update makes it easy to blame the wrong one. Test with Steam fully closed to separate the two.

### **8 Close software that intercepts input**

Remapping tools tie themselves closely to the system, so updates break them regularly.

- **DS4Windows and similar tools** may need updating after a Windows update, and an outdated version can block a controller completely  
- Close these programs entirely and test again  
- If the controller returns, update the tool rather than reinstalling Windows drivers

Overlays and capture software can cause the same problem, so test with everything unnecessary closed, then reintroduce programs one at a time.

### **9 Check power management settings**

Windows can turn USB devices off to save power, and updates sometimes re-enable this.

- Open Device Manager and expand Universal Serial Bus controllers  
- Right click each USB Root Hub, choose Properties, then Power Management  
- Uncheck the option allowing the computer to turn the device off to save power

This is worth doing when the controller works and then disconnects after a period of inactivity.

### **10 Try a different port and cable**

Simple, and worth doing before anything drastic.

- Use a port directly on the motherboard at the back of a desktop rather than a front panel port  
- Avoid USB hubs  
- Use a cable you know transfers data  
- For dongles, use a front port or short extension, and keep them away from USB 3.0 ports which cause interference



### **If nothing works: uninstall the update**

This is a last resort, since it also removes any security fixes the update included.

- Open Settings, then Windows Update, then Update history  
- Choose Uninstall updates  
- Remove the update that matches when the problem started

Pause updates afterwards so it does not reinstall immediately, and check for a newer version in a week or two.

### **Narrowing it down quickly**

- **Nothing detected at all:** driver, cable, or port  
- **Detected but games ignore it:** Steam Input or conflicting software  
- **Buttons in the wrong places:** input mode has changed  
- **Works wired, fails wireless:** Bluetooth pairing needs rebuilding  
- **Works then disconnects after a while:** USB power management  
- **Broke at the same time as a Steam update:** test with Steam closed before blaming Windows

Most cases end at the first fix. Uninstalling the driver, restarting, and reconnecting resolves the majority of controllers that stop working after a Windows update.