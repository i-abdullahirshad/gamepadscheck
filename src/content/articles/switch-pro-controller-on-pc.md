---

title: "Switch Pro Controller on PC: Setup & Fixes"
description: "Switch Pro Controller on PC setup guide. Connect by USB or Bluetooth, fix wrong button prompts, gyro, rumble and doubled inputs with simple steps."

pubDate: 2026-09-05

---

## **Switch Pro Controller on PC: Setup & Fixes**

The Switch Pro Controller works well on PC once it is set up, but it does not work the way an Xbox controller does. Windows does not have built in support for it, so games rarely see it on their own.

The fix is straightforward. Something has to translate the controller into a format games understand, and Steam does this better than anything else for most people.

Here is how to set it up, plus the problems that come up most often.

### **Why it needs setup at all**

Windows handles gamepads through XInput, a fixed layout that guarantees every button lands where games expect. Xbox controllers speak it natively. The Switch Pro Controller does not.

So when you connect one, Windows detects a device, but games looking for an XInput controller find nothing. The controller is fine. It is simply speaking a language the game does not read.

You can check this yourself. Connect the controller and open a [button mapping test](/button-mapping-test/) with Steam closed. You will usually see the controller appear with a blank mapping field, meaning it is reporting a raw layout with no standard applied. That is exactly why games ignore it.

### **Method 1: Steam (recommended)**

Steam handles the Pro Controller well and requires almost no work.

**Set it up**

- Open Steam and go to Settings, then Controller  
- Enable Nintendo Switch controller support  
- Enable the option to use Nintendo button layout if you want prompts to match your controller

**Connect by cable**

Plug in a USB-C cable that carries data. Many cables supplied with phones and power banks only carry power, so the controller charges while nothing detects it.

**Connect by Bluetooth**

- Hold the small round sync button on the top of the controller, next to the USB-C port, until the lights run back and forth  
- Open Windows Bluetooth settings and add the device  
- It appears as Pro Controller

**Then launch games through Steam.** Steam Input only applies to games launched from your Steam library. For anything else, use Add a Non-Steam Game from the Games menu, then launch it through Steam.

That is the whole setup for most people.

### **Method 2: Without Steam**

If you would rather not use Steam, you need something else to do the translation.

**BetterJoy** is the common free option. It creates a virtual Xbox controller from your Switch pad, supports the Pro Controller and Joy-Cons, and handles gyro and rumble.

**DS4Windows** supports Switch controllers in recent versions too, and works the same way by creating a virtual Xbox controller. Following a complete [DS4Windows setup guide](/ds4windows-setup-guide/) will ensure the required drivers are properly installed.

Both need the **ViGEmBus driver** installed, which is the piece that actually creates the virtual controller. If games still ignore your pad after installing either tool, ViGEmBus is the first thing to check.

Either way, remember the rule that prevents most problems: **run one translation layer at a time.** Steam Input and BetterJoy both handling the same controller will produce doubled inputs or a controller that appears twice.

### **Method 3: Native game support**

A growing number of games support the Pro Controller directly. If a game shows correct Nintendo button prompts without anything running, it has native support and you need no setup for that title.

Test the game first before installing anything. Adding a translation layer you do not need only introduces something else to go wrong.

### **Common problems and fixes**



#### **Button prompts are wrong**

This is the most reported issue and it is usually cosmetic rather than broken.

Because the controller is translated into an Xbox controller, games show Xbox prompts. The layout is also physically swapped compared to Xbox: A and B are reversed, and X and Y are reversed.

So the game says press A, and the button in that position on your Pro Controller is labelled B.

**Fixes**

- In Steam, enable the Nintendo button layout option, which corrects prompts in many games  
- Check the game's own settings for a controller icon or prompt style option  
- If you want custom bindings across all titles, learn how to [remap controller buttons on PC](/remap-controller-buttons-on-pc/) using Steam Input or external software
- Otherwise, learn the swap. It takes a session to get used to



#### **The controller is not detected at all**

- **Check your cable.** A charge only cable is the most common cause. The controller charges and nothing appears  
- **Enable Switch support in Steam settings.** Without it, Steam ignores the controller  
- **Try a different USB port**, preferably on the motherboard rather than the front panel  
- **Restart Steam** after changing controller settings



#### **Bluetooth will not pair or keeps dropping**

- Remove the controller from saved Bluetooth devices and pair fresh, since a stale entry blocks reconnection while looking normal  
- Press the sync button on the controller, not the Home button  
- The Pro Controller connects to one device at a time. If it is still paired to a Switch, it may try to reconnect there. Turn the Switch off or put it in sleep during setup  
- Stay within a couple of metres, and disconnect Bluetooth devices you are not using  
- Move any wireless dongles away from USB 3.0 ports, which cause interference in the same band



#### **Inputs registering twice**

Two translation layers are running. Close one.

If you use BetterJoy or DS4Windows, disable Nintendo Switch controller support in Steam settings. If you use Steam, close the other tool completely.

#### **Gyro aiming does not work**

Gyro needs to be set up rather than working automatically.

In Steam, open the controller layout for the game and configure gyro under the stick or gyro settings. You usually want it bound as a mouse input, with an activation button so it only tracks when you are aiming.

Without configuration, the gyro sensor is detected and does nothing.

#### **Rumble is missing**

- Rumble often works over USB and behaves inconsistently over Bluetooth  
- Check the game has vibration enabled in its own settings  
- HD Rumble is a Switch specific feature, so expect standard vibration on PC rather than the finer effects



#### **The controller works in Steam but not in games**

If your [controller works in Steam but not in game](/controller-works-in-steam-but-not-in-game/):

- Make sure you are launching the game **through Steam**, since Steam Input does not apply otherwise  
- For a non Steam game, add it to your library first  
- Try toggling Steam Input for that specific game, since both on and off fix different titles



#### **It stopped working after a Windows update**

- Reinstall ViGEmBus if you use BetterJoy or DS4Windows  
- Update the tool itself, since these tie closely into the system and break with updates  
- In Device Manager, uninstall the controller, unplug it, restart, and reconnect



#### **Battery drains while not in use**

The Pro Controller stays awake while it holds a connection. If your PC sleeps rather than shutting down, the controller can keep searching for it.

Hold the Home button to bring up the controller menu on Switch, or simply disconnect it from Windows Bluetooth when you finish playing.

### **Checking the controller itself**

If something feels wrong beyond connection issues, test the hardware directly.

Open a mapping tester and:

- Press every button and confirm each registers  
- Roll both sticks through their full range, watching for values that skip or stall  
- Pull each trigger and check it returns to zero  
- Rest the controller untouched on a flat surface for a minute and watch the stick values

Steady values slightly off zero mean a shifted centre point, which is normal. Values jumping around while your hands are off the controller mean worn sticks, and that is a hardware problem no setup will fix.

### **Quick reference**

- **Not detected:** cable, or Switch support not enabled in Steam  
- **Wrong button prompts:** normal. Enable Nintendo layout in Steam  
- **Works in Steam, not in games:** launch the game through Steam  
- **Inputs doubled:** two translation layers running  
- **Gyro does nothing:** needs configuring in the Steam layout  
- **Bluetooth keeps dropping:** re-pair fresh, and check the Switch is off  
- **Broke after a Windows update:** reinstall ViGEmBus and update your tool
