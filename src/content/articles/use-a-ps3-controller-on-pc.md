---

title: How to Use a PS3 Controller on PC in 2026
description: "How to use a PS3 controller on PC in 2026 Set up DsHidMini, connect by USB or Bluetooth, and fix drivers, doubled inputs and detection problems."

pubDate: 2026-09-05

---

## **How to Use a PS3 Controller on PC in 2026**

The PS3 controller is old hardware, and getting it working on PC has always been more awkward than newer pads. It predates the standards Windows uses today, official drivers were never provided, and the tools people relied on for years are no longer maintained.

It can still be done, and it is worth being clear about which parts are straightforward and which are genuinely fiddly.

### **Why it is harder than newer controllers**

Windows handles modern gamepads through XInput, a fixed layout that guarantees buttons land where games expect. Xbox controllers speak it natively.

The DualShock 3 does not. It also does not report itself the way later PlayStation controllers do, which is why tools built for the DualShock 4 do not simply work with it.

Connect one and Windows may detect a device, but games looking for a standard gamepad find nothing usable. You can see this yourself. Open a gamepad mapping test after connecting, and you will typically find a blank mapping field, meaning the controller is reporting a raw layout with no standard applied. Games ignore that.

So something has to translate it. That translation layer is the whole job.

### **What you need**

- A DualShock 3 controller  
- A mini USB cable that carries data. Note this is **mini** USB, not micro, since the DS3 uses the older larger connector  
- Administrator access on your PC  
- A Bluetooth adapter if you want to play wirelessly

The cable catches people out. Many cables sold as data cables are charge only, and a DS3 that lights up while nothing detects it usually means the cable is the problem.

### **Method 1: DsHidMini**

This is the option worth trying first in 2026 It is actively maintained, which matters a great deal here, because the older tools are not.

**Setup**

- Download DsHidMini from its official GitHub releases page. Avoid third party download sites, which bundle unwanted software  
- Install the ViGEmBus driver, which creates the virtual controller that games actually see  
- Run the installer and follow the driver setup steps  
- Connect the controller by cable and let the driver install

**Modes**

DsHidMini offers different output modes. The one you want for most modern games is the mode that presents the controller as an Xbox pad, since that is what games understand.

If games detect nothing after setup, ViGEmBus is the first thing to check. It is the piece doing the real work, and the rest of the setup runs fine without it while achieving nothing.

### **Method 2: ScpToolkit**

This was the standard solution for years, and you will find most older guides pointing to it.

It is **no longer maintained**, which brings real problems in 2026:

- It can conflict with current Windows versions  
- It installs drivers that Windows updates may reject or break  
- Security updates are not coming  
- Uninstalling it cleanly can be awkward

If DsHidMini works for you, use that instead. ScpToolkit is worth knowing about mainly because so many old guides recommend it, and because it occasionally works when nothing else does on a particular machine.

### **Method 3: Steam**

Steam has some support for PlayStation controllers, and it is the least effort route if it works for you.

- Open Steam, go to Settings, then Controller  
- Enable PlayStation controller support  
- Connect the DS3 by cable and see whether Steam detects it

Support for the DS3 specifically is inconsistent compared to newer pads. Try it before installing drivers, since it costs nothing to test, but do not be surprised if it does not detect the controller.

If it does work, launch games through Steam, since Steam Input only applies to games in your library. For anything else, add it as a non Steam game first.

### **Connecting over Bluetooth**

Wireless is possible but more fragile than a cable.

- Set the controller up **by cable first** and confirm it works  
- Pair through your driver tool rather than through Windows Bluetooth settings, since the DS3 does not pair the standard way  
- In DsHidMini, follow its pairing process, which writes your adapter address to the controller

Expect this to be less reliable than a cable. Cheap Bluetooth adapters handle the DS3 particularly badly, and the controller was designed around the PS3's own wireless implementation rather than standard PC Bluetooth.

If wireless keeps failing, a cable is a perfectly reasonable answer for a controller of this age.

### **Common problems**



#### **Controller charges but nothing detects it**

Almost always the cable. A charge only cable powers the controller and transfers no data.

Try a cable you know works for transferring files. This is the single most common cause of a DS3 that appears completely dead on PC.

#### **Games ignore the controller**

- ViGEmBus is not installed, or failed to install  
- The driver tool is not running. These tools generally need to stay open in the background  
- The output mode is set to something games do not read. Switch to the Xbox output mode



#### **The controller is a counterfeit**

Counterfeit DualShock 3 controllers are extremely common, and they behave differently from genuine ones. Many refuse to work with PC drivers entirely.

Signs to look for:

- The controller was very cheap or bought recently as new, despite the model being long discontinued  
- Buttons feel lighter or looser than expected  
- Text and moulding on the underside looks slightly off  
- It works on a PS3 but no PC driver will recognise it

If you have a counterfeit, there is often no fix. The internals differ from genuine hardware.

#### **Inputs registering twice**

Two translation layers are running at once. Close one.

If DsHidMini is handling the controller, disable PlayStation controller support in Steam. If Steam is handling it, close the driver tool.

#### **It stopped working after a Windows update**

These tools tie closely into the system and break with updates regularly.

- Update the tool to its latest version  
- Reinstall ViGEmBus  
- In Device Manager, uninstall the controller, unplug it, restart, and reconnect



#### **Sticks drift or feel loose**

Worth separating from setup problems, because this is hardware.

These controllers are well over a decade old, and the sticks have had a long life. Rest the controller untouched on a flat surface, open a mapping tester, and watch the stick values for a minute.

Steady values slightly off zero mean a shifted centre point, which is normal and can often be masked with a deadzone. Values jumping around while your hands are off the controller mean worn potentiometers, and no software fixes that.

Cleaning can help if the cause is contamination. Push the stick to one side, apply a small amount of 99% isopropyl alcohol into the gap under the rubber gate, rotate the stick through full circles about twenty times, and let it dry for fifteen minutes. Use 99%, not 70%, because the missing 30% is water.

If drift returns within days, the tracks underneath are worn rather than dirty.

### **Is it still worth using in 2026?**

Worth being honest about this.

**Reasons to bother**

- You already own one and want to use it rather than buy something  
- You are playing older games where the layout feels right  
- You want a second controller for local multiplayer and cost matters

**Reasons to move on**

- Setup takes real effort compared to a modern pad  
- Driver tools break with Windows updates  
- Batteries in a controller this old hold very little charge  
- Sticks and rubber components have aged  
- A basic modern controller works with no setup at all

If you already have one in a drawer, the setup above is worth an hour. If you are considering buying a DS3 specifically for PC use, almost any current controller will be less trouble and more reliable.

### **Quick reference**

- **Nothing detected:** check the cable is mini USB and carries data  
- **Detected but games ignore it:** ViGEmBus missing, or wrong output mode  
- **Works then stops after an update:** reinstall the tool and ViGEmBus  
- **No driver recognises it at all:** likely a counterfeit controller  
- **Inputs doubled:** two layers running at once  
- **Sticks drifting:** hardware age, not a setup problem

