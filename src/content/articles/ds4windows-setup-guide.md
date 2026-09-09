---

title: "DS4Windows Setup Guide: Use a PS4 Controller on PC"
description: "DS4Windows setup guide for using a PS4 controller on PC. Install, pair, hide the original controller and fix doubled inputs, Bluetooth and Steam conflicts."

pubDate: 2026-09-05

---

## **DS4Windows Setup Guide: Use a PS4 Controller on PC**

PlayStation controllers do not speak the language most PC games expect. Windows uses XInput for gamepads, and DualShock 4 and DualSense pads do not use it natively. So a PS4 controller often connects fine and then gets ignored completely by games.

DS4Windows solves this. It reads your PlayStation controller and creates a virtual Xbox controller that games recognise. To the game, you are using an Xbox pad. To you, nothing changed.

Here is how to set it up properly, including the steps people usually miss.

### **Before you install anything**

Two quick checks save a lot of trouble later.

**Check whether you actually need it.** Many games now support PlayStation controllers directly, and Steam Input handles them well for Steam games. If your controller already works, adding DS4Windows introduces a layer you do not need. Test the game first.

**Check the controller works at all.** Connect it and open a [button mapping test](/button-mapping-test/). Press every button and roll both sticks.

If the tester detects the controller and buttons register, the hardware is fine and DS4Windows will work. If nothing appears, fix that first, because no software can help a controller Windows cannot see. Try a different cable, since many cables carry power only and never transfer data.

### **What you need**

- A DualShock 4 or DualSense controller  
- A micro USB cable for DS4, or USB-C for DualSense, that carries data  
- A Bluetooth adapter if you want to play wirelessly  
- Windows 10 or 11



### **Step 1: Install the requirements**

DS4Windows needs two things installed before it will run.

- **.NET Desktop Runtime.** DS4Windows tells you if it is missing and links to the download  
- **ViGEmBus driver.** This creates the virtual controller. Without it, DS4Windows runs but games see nothing

The installer usually prompts for both on first launch. Install them and restart DS4Windows afterwards.

If your controller connects but games still ignore it, ViGEmBus is the first thing to check. It is the piece that does the actual work.

### **Step 2: Download and run DS4Windows**

- Download it from the official GitHub releases page. Avoid third party download sites, which bundle unwanted software  
- Extract the folder somewhere permanent, such as your Documents folder. Do not run it from your Downloads folder, since deleting that later breaks your profiles  
- Run DS4Windows.exe  
- When asked where to save settings, choosing the program folder keeps everything together and makes backups easy

There is no installer. It runs from the folder you extract it to.

### **Step 3: Connect the controller**

**By cable**

Plug it in. DS4Windows should detect it immediately and show it in the Controllers tab.

**By Bluetooth**

- Hold the Share and PS buttons together until the light bar flashes rapidly in a double pulse  
- Open Windows Bluetooth settings and add the device  
- On a DualShock 4, if asked for a pairing code, enter 0000

If pairing fails repeatedly, remove the controller from saved Bluetooth devices and pair fresh. A stale saved entry blocks reconnection while looking perfectly normal in the list.

### **Step 4: Hide the real controller**

This is the step people skip, and it causes the most common problem.

Without it, Windows sees two controllers: your real PlayStation pad and the virtual Xbox one DS4Windows created. Games that read both will register every input twice, or behave unpredictably.

The symptoms are obvious once you know them:

- Menus jump two items per press  
- Sticks feel like they are fighting themselves  
- The game shows two controllers connected  
- Inputs fire twice

In DS4Windows, enable the setting to hide the DS4 controller. In newer versions this appears as HidHide, which is a separate small driver DS4Windows will offer to install.

If HidHide will not enable, close Steam completely and try again, since Steam can hold the controller open.

### **Step 5: Set up a profile**

DS4Windows works out of the box with the default profile, so test a game before changing anything.

When you want to customise, open the Profiles tab and create a new one.

**Worth adjusting**

- **Deadzones.** Set these from your controller's actual resting values rather than guessing. Rest the controller untouched on a flat surface, watch the stick values in a tester for a minute, and note the highest reading. Setting your deadzone slightly above that stops drift without costing more precision than necessary  
- **Light bar.** Turn it off or dim it to save battery on Bluetooth  
- **Touchpad as mouse.** Useful in games with menus designed for a mouse  
- **Button remapping.** You can easily [remap controller buttons on PC](/remap-controller-buttons-on-pc/) through the software, changing any button to any other input, including keyboard and mouse

**Per game profiles** can be set to switch automatically when a game launches, using the auto profile feature.

### **Step 6: Check it is working**

Launch a game and check the button prompts.

**If you see Xbox prompts**, it is working. The game thinks you have an Xbox controller, which is the whole point. Cross is A, Circle is B, Square is X, Triangle is Y. If you are curious why this translation is necessary, reading about [XInput vs DirectInput](/xinput-vs-directinput/) explains how Windows handles these devices differently.

**If you see PlayStation prompts**, the game has native support and is reading your controller directly. That is fine, and it means you may not need DS4Windows for that title.

**If nothing responds**, work through the troubleshooting below.

### **Common problems**



#### **The controller is detected twice**

Hiding the original controller is not enabled, or it failed. Close Steam, enable it in DS4Windows, and restart the program.

#### **Steam and DS4Windows conflict**

This is the most frequent complaint, and it happens because both create virtual controllers.

Pick one:

- **Using DS4Windows:** in Steam, go to Settings, then Controller, and disable PlayStation controller support  
- **Using Steam Input:** close DS4Windows entirely for Steam games

Running both is what produces doubled inputs and controllers that appear and disappear.

#### **It works wired but not on Bluetooth**

- Remove the controller from Bluetooth settings and pair again from scratch  
- Some cheap Bluetooth adapters handle controllers badly. Try a different adapter if you have one  
- Stay within a couple of metres, since weak signal causes dropouts  
- Disconnect Bluetooth devices you are not using, as a crowded band causes stuttering



#### **It stopped working after a Windows update**

DS4Windows ties closely into the system, so updates break it regularly.

- Update DS4Windows to the latest version  
- Reinstall ViGEmBus  
- Reinstall HidHide if hiding stopped working



#### **Anti cheat blocks it**

Some competitive online games are sensitive to virtual controller drivers. If a game refuses to launch or reports a driver problem, close DS4Windows and use the game's native support or Steam Input instead.

Check before using it in a ranked online game, rather than discovering the problem mid match.

#### **The controller disconnects randomly**

- Check the battery, since PlayStation controllers behave oddly at low power before shutting down  
- Try a different USB port, preferably on the motherboard rather than the front panel  
- Confirm the cable transfers data  
- On Bluetooth, move away from USB 3.0 ports and 2.4GHz interference sources



#### **Gyro or touchpad not working**

These need enabling in the profile. Open the profile, find the gyro or touchpad section, and assign what they should do. Neither works by default in most configurations.

### **Does DS4Windows add input lag?**

It adds a small amount, because it sits between your controller and the game. The translation itself is simple work for a modern CPU, and the cost lands close to one polling interval rather than anything dramatic.

For most players that is smaller than the difference between Bluetooth and a cable.

If you want the lowest possible delay:

- Use a USB cable rather than Bluetooth  
- Avoid running Steam Input on top of DS4Windows  
- Skip complex bindings such as long press or double press actions, which wait by design before deciding what you meant

If a game supports your controller natively, using that support avoids the layer entirely and is the fastest option. (This logic is very similar to the advice for those wondering [use a PS3 controller on PC](/use-a-ps3-controller-on-pc/), as extra software layers always carry a minor cost).

### **Quick reference**

- **Games ignore the controller:** ViGEmBus not installed  
- **Inputs registering twice:** hide the original controller  
- **Controller appears and disappears:** Steam and DS4Windows both running  
- **Works wired, fails wireless:** re-pair Bluetooth from scratch  
- **Broke after a Windows update:** update DS4Windows and reinstall ViGEmBus  
- **Game will not launch:** anti cheat. Use native support or Steam Input
