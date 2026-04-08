export interface CollectibleItem {
  id: string;
  tag: string;
  name: string | null;
  desc: string;
}

export interface Section {
  name: string;
  items: CollectibleItem[];
}

export interface Chapter {
  chapter: string;
  video: string;
  sections: Section[];
}

const guide: Chapter[] = [
  {
    chapter: "Chapter 2: The Quarantine Zone",
    video: "http://youtu.be/cPW4xqVxR3U",
    sections: [
      {
        name: "20 Years Later",
        items: [
          {
            id: "c2-1",
            tag: "CONV",
            name: "Newspaper Stand Couple",
            desc: "Follow Tess out towards the street, and when you get to a clearing, a large armored vehicle will approach and stop. Look to the right by the newspaper stands for a couple to speak to.",
          },
        ],
      },
      {
        name: "Beyond the Wall",
        items: [
          {
            id: "c2-2",
            tag: "ART",
            name: "Boston Q.Z. Map",
            desc: "You get this once Joel picks up his backpack.",
          },
          {
            id: "c2-3",
            tag: "ART",
            name: "Military Pamphlet",
            desc: "You get this once Joel picks up his backpack.",
          },
          {
            id: "c2-4",
            tag: "CONV",
            name: "Pizza Shop Chat",
            desc: "When you emerge into a Pizza Shop from the underground tunnels, Tess will stop at the entrance and give you an opportunity to converse.",
          },
          {
            id: "c2-5",
            tag: "FF",
            name: "Bedroom Table Pendant",
            desc: "Once you emerge from the Quarantine Zone, find a ladder to enter a house on the 2nd floor. Before heading down the stairs with Tess, explore the bedroom to find a firefly pendant on a table.",
          },
          {
            id: "c2-6",
            tag: "ART",
            name: "Note to Brother",
            desc: "After encountering the Runners, go upstairs and there is an office to the left. On the right side is a table with the note.",
          },
          {
            id: "c2-7",
            tag: "FF",
            name: "Alley Tree Pendant",
            desc: "Following Tess through some alleyways, you'll go under a broken railing into the next clearing. There is a tree here that has a pendant you'll need to knock down with a bullet, bottle, or brick.",
          },
        ],
      },
      {
        name: "The Slums",
        items: [
          {
            id: "c2-8",
            tag: "ART",
            name: "Drafting Notice",
            desc: "Walking through the Slums, you'll come aboard a bus. Before going through the gate, look to your left near some tables to find the notice.",
          },
          {
            id: "c2-9",
            tag: "ART",
            name: "Wanted Poster",
            desc: "A few feet in front of the Drafting Notice, on a wall is another artifact.",
          },
          {
            id: "c2-10",
            tag: "ART",
            name: "Warehouse Key",
            desc: "You get this artifact automatically from an enemy.",
          },
          {
            id: "c2-11",
            tag: "ART",
            name: "Shipping Manifest",
            desc: "When you get to the Shipping Yard where Robert is, head right next to a dumpster with a No Fishing sign.",
          },
          {
            id: "c2-12",
            tag: "ART",
            name: "Docks Note",
            desc: "Up ahead of the last artifact, behind a dumpster. Stay to the right and you should find it on the ground.",
          },
        ],
      },
      {
        name: "The Cargo",
        items: [
          {
            id: "c2-13",
            tag: "FF",
            name: "Street Bodies Pendant",
            desc: "When Joel and Ellie head off for the first time, you'll find 3 dead bodies in the streets. The one closest to the newspaper stands has a pendant near him.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 3: The Outskirts",
    video: "http://youtu.be/KSTWIXz_7A4",
    sections: [
      {
        name: "Outside",
        items: [
          {
            id: "c3-1",
            tag: "CONV",
            name: "Window Chat with Tess",
            desc: "At the very beginning, talk to Tess at the window.",
          },
          {
            id: "c3-2",
            tag: "ART",
            name: "Tess' List",
            desc: "After Tess comes back from checking the guns, once you get control of Joel, turn around and on an end table with a lantern will be the artifact.",
          },
          {
            id: "c3-3",
            tag: "ART",
            name: "Patrol Routes Map",
            desc: "After starting the generator to ride the lift down, Tess will tell Ellie to stay close. On the far right brick wall will be the artifact next to a pallet.",
          },
        ],
      },
      {
        name: "Downtown",
        items: [
          {
            id: "c3-4",
            tag: "ART",
            name: "Evacuation Leaflet",
            desc: "You will reach downtown, with some giant buildings. Look on the ground once you reach the intersection, next to a pole for the leaflet.",
          },
          {
            id: "c3-5",
            tag: "FF",
            name: "Boylstone Overlook Pendant",
            desc: "Before entering the Boylstone Building, go all the way to the end past the building's sign to an overlook. A firefly pendant can be found to the left on a tree.",
          },
          {
            id: "c3-6",
            tag: "CONV",
            name: "Boylstone Dead Soldier",
            desc: "Once inside the Boylstone Building, talk about the dead soldier in the hallway.",
          },
          {
            id: "c3-7",
            tag: "ART",
            name: "Field Ops Log",
            desc: "Artifact is next to the dead body in the Goldstone building, after the first flight of stairs before level 5.",
          },
          {
            id: "c3-8",
            tag: "SHIV",
            name: "Post-Clicker Room Door",
            desc: "After being attacked by the Clicker and saved by Tess, go left of the room Tess and Ellie are in, and ahead will be a door that you can open with a shiv.",
          },
          {
            id: "c3-9",
            tag: "ART",
            name: "Firefly Map",
            desc: "After finding a dead Firefly member and getting the Molotovs, walk up ahead and up some nearby stairs to another dead Firefly agent. Near him on the floor is the artifact.",
          },
          {
            id: "c3-10",
            tag: "ART",
            name: "Note to Derek",
            desc: "When you reach the Orange Line, head left into Minute Pick store. Behind the counter in a drawer is the artifact.",
          },
        ],
      },
      {
        name: "Museum",
        items: [
          {
            id: "c3-11",
            tag: "ART",
            name: "Medical Pamphlet",
            desc: "After moving a big desk to climb over a semi-truck, turn around and go search inside. The artifact is lying on the ground, next to a melee weapon.",
          },
          {
            id: "c3-12",
            tag: "FF",
            name: "Museum Display Pendant",
            desc: "Inside the old museum, when you ascend to the next floor by walking on the caved-in flooring, stay on the left and climb up on the wall/ledge. Shimmy over to find the pendant on a broken display case.",
          },
          {
            id: "c3-13",
            tag: "SHIV",
            name: "Museum Rubble Door",
            desc: "Once Joel gets separated from Tess and Ellie, he'll crawl through the rubble. Head left and look for a door that requires a shiv.",
          },
          {
            id: "c3-14",
            tag: "CONV",
            name: "Museum Window Chat",
            desc: "After Ellie is mobbed by Infected in the Museum, save her and proceed to the window. Conversations for Tess first, then Ellie.",
          },
        ],
      },
      {
        name: "The Capitol Building",
        items: [
          {
            id: "c3-15",
            tag: "ART",
            name: "Firefly Orders",
            desc: "After using a plank to cross the rooftops, come down and proceed down two sets of stairs. At ground floor, turn and look at the side of the stairs. Next to the body is the artifact.",
          },
          {
            id: "c3-16",
            tag: "FF",
            name: "Gazebo Pendant",
            desc: "Going through the flooded street with green murky water, before entering the Capitol Building, climb up the gazebo directly across from it.",
          },
          {
            id: "c3-17",
            tag: "ART",
            name: "Smuggler's Note",
            desc: "When swimming in the underground subway tunnel, you'll separate with Ellie. When you rejoin her on a platform, there should be a dead body nearby with an artifact.",
          },
          {
            id: "c3-18",
            tag: "FF",
            name: "Subway Shelf Pendant",
            desc: "After rejoining Ellie in the subway tunnel, beyond the artifact is an area you can access by diving underneath the rubble. On one of the shelves is a pendant.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 4: Bill's Town",
    video: "http://youtu.be/Tw40c2gN7mI",
    sections: [
      {
        name: "The Woods",
        items: [
          {
            id: "c4-1",
            tag: "ART",
            name: "Pills Note",
            desc: "When you get to an area that has two Clickers, enter the building and find some desks. On the floor between the two desks is the artifact.",
          },
          {
            id: "c4-2",
            tag: "SHIV",
            name: "Fence Building Door",
            desc: "Before going beyond the fence to the main street, look on the left side for a building that has a door to use a shiv on.",
          },
          {
            id: "c4-3",
            tag: "CONV",
            name: "Arcade Machine Chat",
            desc: "Once on the main road, across the street is Anthony's Pizzas and Subs. Go inside, and Ellie will remark about the arcade machine, The Turning.",
          },
          {
            id: "c4-4",
            tag: "FF",
            name: "Jazz Club Pendant",
            desc: "In front of Mary's Famous Jazz Club is a mobile home that rammed a sheriff's car. Climb the car to the roof of the mobile home for the pendant.",
          },
          {
            id: "c4-5",
            tag: "ART",
            name: "Perimeter Note",
            desc: "Inside the Marquis Music Store, find an artifact in the back room next to a printer.",
          },
          {
            id: "c4-6",
            tag: "ART",
            name: "Note to Bob",
            desc: "Past the Marquis Music Store is a blockade. On some barbed wire is an artifact.",
          },
          {
            id: "c4-7",
            tag: "SHIV",
            name: "Music Store Alley Door",
            desc: "In the back alley of the Marquis Music Store, you'll run into Bill's wire traps. There is a door that can be opened with a shiv.",
          },
          {
            id: "c4-8",
            tag: "ART",
            name: "Note to Rachel",
            desc: "After avoiding Bill's tripwire trap, open the banging door and go up the stairs. In the kitchen area, on a wall will be the name Rachel with an arrow pointing downward.",
          },
        ],
      },
      {
        name: "Safehouse",
        items: [
          {
            id: "c4-9",
            tag: "ART",
            name: "Bill's Map",
            desc: "Once you meet up with Bill, turn around to grab his map.",
          },
          {
            id: "c4-10",
            tag: "MAN",
            name: "Shivs Upgrade #1 (Sharpening)",
            desc: "Once you meet up with Bill, on the bar right near him is the first training manual.",
          },
          {
            id: "c4-11",
            tag: "ART",
            name: "Fences Note",
            desc: "Go into Bill's backroom. On a small table is the artifact.",
          },
          {
            id: "c4-12",
            tag: "CONV",
            name: "Chess Board Chat",
            desc: "Walk up ahead and look to your left towards the booths. On one of the tables is a chess board.",
          },
          {
            id: "c4-13",
            tag: "ART",
            name: "Hunters Note",
            desc: "When Bill leads you out of the bar area, go up the stairs. At the top, turn around and go into the back room to find an artifact on a round table.",
          },
          {
            id: "c4-14",
            tag: "FF",
            name: "Hardtail Hank's Pendant",
            desc: "After Bill leads you out his bar towards the Graveyard, after the Infected attack, search the far end of the street for Hardtail Hank's. On the electric pole is the hanging pendant.",
          },
        ],
      },
      {
        name: "Graveyard",
        items: [
          {
            id: "c4-15",
            tag: "TOOL",
            name: "Graveyard Toolbox",
            desc: "After Bill gives you the shotgun, follow him and make a left. There will be a metal shelf with a toolbox.",
          },
          {
            id: "c4-16",
            tag: "ART",
            name: "Bombs Note",
            desc: "When Bill leads you to the Church area, go into the room on the right (Bill's bedroom). On a table is the artifact.",
          },
          {
            id: "c4-17",
            tag: "FF",
            name: "Laundry Room Pendant",
            desc: "At a fork where infected face away from you, find a house surrounded by a wooden fence. Inside, a small room has a washing machine and dryer with a Pendant on top.",
          },
          {
            id: "c4-18",
            tag: "ART",
            name: "Boy's Diary",
            desc: "You'll reach a house with a treehouse and swimming pool. Go upstairs into the boy's room to find the artifact.",
          },
          {
            id: "c4-19",
            tag: "CONV",
            name: "Boy's Room Chat",
            desc: "In the boy's room where you found Boy's Diary, Ellie will prompt you for a conversation.",
          },
        ],
      },
      {
        name: "High School Escape",
        items: [
          {
            id: "c4-20",
            tag: "ART",
            name: "Note from Frank",
            desc: "At Frank's house, search the far end for a room. Inside is an artifact on a table.",
          },
          {
            id: "c4-21",
            tag: "CONV",
            name: "Ellie in Driver's Seat",
            desc: "At Frank's house, speak to Ellie when she's in the driver's seat.",
          },
          {
            id: "c4-22",
            tag: "CONV",
            name: "Bill at the Car",
            desc: "After finding the Note from Frank, speak to Bill in front of the car.",
          },
          {
            id: "c4-23",
            tag: "ART",
            name: "Note from Frank (2)",
            desc: "Pick up the note again when Bill crumples it up.",
          },
          {
            id: "c4-24",
            tag: "ART",
            name: "Siphon Hose",
            desc: "You get this automatically when Bill gives it to you.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 5: Pittsburgh",
    video: "http://youtu.be/GuLaVRaODu0",
    sections: [
      {
        name: "Alone and Forsaken",
        items: [
          {
            id: "c5-1",
            tag: "COMIC",
            name: "Cutscene Comic",
            desc: "You get this automatically during the cutscene.",
          },
          {
            id: "c5-2",
            tag: "CONV",
            name: "Truck Crash Chat",
            desc: "After crashing the truck, lift the heavy metal grate. After viewing the 'gnarly stuff', Ellie will pause for conversation.",
          },
          {
            id: "c5-3",
            tag: "ART",
            name: "Tourist Manifest",
            desc: "In the same room, find an artifact on a toppled movable shelf storage cart.",
          },
          {
            id: "c5-4",
            tag: "TOOL",
            name: "Shutter Door Toolbox",
            desc: "In the same room, find a toolbox on a metal shelf next to the metal shutter door.",
          },
          {
            id: "c5-5",
            tag: "MAN",
            name: "Health Kit Upgrade #1 (Splinting)",
            desc: "Up the stairs where the enemies slept, a metal shelf has a training manual on the bottom shelf.",
          },
          {
            id: "c5-6",
            tag: "ART",
            name: "Ambush Map",
            desc: "Beyond the area where the enemies slept, in a room with a workbench. Check the wall beside the door.",
          },
          {
            id: "c5-7",
            tag: "COMIC",
            name: "Yellow Bridge Bus",
            desc: "When heading to the yellow bridge, jump down to an area with a large bus. The comic is on the bus. If 3 enemies appear, you've gone too far.",
          },
          {
            id: "c5-j1",
            tag: "JOKE",
            name: "Ellie's Jokes #1",
            desc: "After three Hunters appear and leave, Ellie will say you can climb the bus. Wait a bit and she'll pull out her joke book. Listen to all jokes for the 'That's all I got' Gold Trophy.",
          },
          {
            id: "c5-8",
            tag: "CONV",
            name: "Roadside Corpses",
            desc: "After going around the bus with the comic, stick right and look down at corpses.",
          },
          {
            id: "c5-9",
            tag: "CONV",
            name: "Checkpoint Wall Writing",
            desc: "After climbing on top of the bus to the empty checkpoints, Ellie reads writing on the wall about rations.",
          },
          {
            id: "c5-10",
            tag: "ART",
            name: "Lost Hill Note",
            desc: "At the empty checkpoints, look into the far right checkpoint booth.",
          },
          {
            id: "c5-11",
            tag: "ART",
            name: "Traitors Flyer",
            desc: "After taking out the 3 enemies in the tented area, look for a flyer pinned on a wall inside the tent.",
          },
          {
            id: "c5-12",
            tag: "FF",
            name: "Kingston Alley Pendant",
            desc: "After the checkpoint area, before entering the Kingston Bookstore, check the furthest alleyway for a pendant behind a toppled bookshelf.",
          },
          {
            id: "c5-13",
            tag: "ART",
            name: "Applicant Checklist",
            desc: "Inside the Kingston Bookstore, look underneath the staircase on the ground floor.",
          },
          {
            id: "c5-14",
            tag: "ART",
            name: "Abandoned Zone Note",
            desc: "From the Applicant Checklist, proceed deeper into the bookstore. On the desk is the artifact.",
          },
          {
            id: "c5-15",
            tag: "SHIV",
            name: "Rivers Cafe Door",
            desc: "On the 2nd floor of Kingston's Bookstore, Rivers Cafe. To the right of this restaurant is a shiv door.",
          },
          {
            id: "c5-16",
            tag: "ART",
            name: "Lost Areas Map",
            desc: "Inside the shiv door at Rivers Cafe on the 2nd floor.",
          },
          {
            id: "c5-j2",
            tag: "JOKE",
            name: "Ellie's Jokes #2",
            desc: "After killing all enemies in the bookstore, wait around for a couple of minutes. Ellie will lighten the mood with some jokes.",
          },
          {
            id: "c5-17",
            tag: "SHIV",
            name: "Regal Apartments Door",
            desc: "After leaving Kingston Bookstore, turn to Regal Apartments on your right (purple rain-cover entry). Inside this shiv door is also Mother's Letter.",
          },
          {
            id: "c5-18",
            tag: "ART",
            name: "Mother's Letter",
            desc: "Inside the Regal Apartments shiv door.",
          },
          {
            id: "c5-19",
            tag: "CONV",
            name: "Girl Poster Comment",
            desc: "After the Regal Apts shiv, head away from the bridge. Ellie comments on the girl on the poster.",
          },
          {
            id: "c5-j3",
            tag: "JOKE",
            name: "Ellie's Jokes #3",
            desc: "At the flooded streets, go opposite the bridge to a dead end. Ellie will comment on a poster. Wait here and she'll patrol the perimeter, then tell a few more jokes.",
          },
          {
            id: "c5-20",
            tag: "ART",
            name: "Stash Note",
            desc: "When Joel swims to grab a pallet, look left to the River Cafe. Enter through the back of a truck, head to the 2nd floor.",
          },
        ],
      },
      {
        name: "Hotel Lobby",
        items: [
          {
            id: "c5-21",
            tag: "CONV",
            name: "Hotel Bar Coffee Maker",
            desc: "Inside the Hotel Grand, head left to find a bar. Joel converses with himself at the coffee maker.",
          },
          {
            id: "c5-22",
            tag: "ART",
            name: "Note to Staff",
            desc: "After using the ladder to climb up a floor, head to the other side of the building across the debris. Find an artifact in an opened suitcase.",
          },
          {
            id: "c5-23",
            tag: "MAN",
            name: "Shiv Upgrade #2 (Blade Reinforcement)",
            desc: "After finding the 2nd floor artifact with the combination, go back to the lobby and open the safe behind the counter.",
          },
          {
            id: "c5-j4",
            tag: "JOKE",
            name: "Ellie's Jokes #4",
            desc: "After grabbing the safe contents, head back up the ladder. Once you've climbed up, wait here for Ellie to tell more jokes.",
          },
          {
            id: "c5-24",
            tag: "CONV",
            name: "Rooftop Bathtub Bodies",
            desc: "On a rooftop area, after clearing Hunters, proceed until you go up a floor. Inside a bathroom is a bathtub with dead bodies.",
          },
          {
            id: "c5-25",
            tag: "ART",
            name: "Hotel KeyCard",
            desc: "After Joel gets separated from Ellie and goes underground with the gas mask. Search the upper floor for a security room.",
          },
          {
            id: "c5-26",
            tag: "COMIC",
            name: "Hotel Shimmy Bar",
            desc: "Once you reunite with Ellie and climb the ladder, before dropping down look left for a bar area. Shimmy over to find the comic on a table.",
          },
          {
            id: "c5-27",
            tag: "FF",
            name: "Women's Restroom Pendant",
            desc: "After dropping down, find bathrooms on the left wall. In the Women's room, far stall has a pendant on the ground.",
          },
          {
            id: "c5-28",
            tag: "MAN",
            name: "Melee Weapon Upgrade #2 (Knots)",
            desc: "Past the bathrooms, on some tables in front of you.",
          },
          {
            id: "c5-29",
            tag: "CONV",
            name: "Piano Stage Backdrop",
            desc: "In the big room with a piano on stage, go to the camera and oceanic backdrop in the corner. Ellie has 3 conversations back-to-back.",
          },
        ],
      },
      {
        name: "Financial District",
        items: [
          {
            id: "c5-30",
            tag: "CONV",
            name: "Hung Hunter Tree",
            desc: "After Joel gives Ellie her gun, examine the hung hunter by the tree.",
          },
          {
            id: "c5-31",
            tag: "ART",
            name: "Fireflies Note",
            desc: "After eliminating enemies, go into Don Fiocchi Subs on the right. In the back room are 3 corpses with an artifact.",
          },
          {
            id: "c5-32",
            tag: "ART",
            name: "Final Attack Note",
            desc: "After taking out two Hunters, look in an area with lots of desks. At the far end, an artifact on the floor by a chair.",
          },
          {
            id: "c5-33",
            tag: "ART",
            name: "Mob Attack Note",
            desc: "Near 'Schmidt Surplus Outfitter' lettering. In one of the backrooms behind the desk.",
          },
          {
            id: "c5-34",
            tag: "ART",
            name: "Truck Note",
            desc: "Inside the HS&L Credit Union, on a counter.",
          },
          {
            id: "c5-35",
            tag: "SHIV",
            name: "Credit Union Door",
            desc: "Inside the HS&L Credit Union.",
          },
          {
            id: "c5-36",
            tag: "CONV",
            name: "Dead Soldiers Graffiti",
            desc: "Outside HS&L Credit Union, graffiti says 'Death for Freedom' next to the fire escape. Ellie stands by three dead soldiers.",
          },
          {
            id: "c5-37",
            tag: "CONV",
            name: "Military Prep School",
            desc: "Past a concrete wall, on the right is a Military Prep School gate. Ellie has something to say.",
          },
          {
            id: "c5-38",
            tag: "CONV",
            name: "Wolf Billboard",
            desc: "Further from the Military school, a big billboard with a Wolf movie advertisement.",
          },
        ],
      },
      {
        name: "Escape the City",
        items: [
          {
            id: "c5-39",
            tag: "MAN",
            name: "Molotov Upgrade #1 (1.5x radius)",
            desc: "After meeting Henry and Sam, search the kitchen in this apartment for a manual.",
          },
          {
            id: "c5-40",
            tag: "SHIV",
            name: "Stairwell Floor Door",
            desc: "Heading down stairs after meeting Henry and Sam, a shiv door on one of the floors. Comic inside too.",
          },
          {
            id: "c5-41",
            tag: "COMIC",
            name: "Stairwell Shiv Room",
            desc: "Inside the shiv door while heading down stairs after meeting Henry and Sam.",
          },
          {
            id: "c5-42",
            tag: "FF",
            name: "Suite 3000 Bathroom Pendant",
            desc: "Before heading into Suite 3000, explore the left side area to find a bathroom. On top of a toilet tank is a pendant.",
          },
          {
            id: "c5-43",
            tag: "ART",
            name: "Trial Note",
            desc: "Inside Suite 3000, go into the 302 Conference room. In the corner is an artifact.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 6: The Suburbs",
    video: "http://youtu.be/257baoIHPTQ",
    sections: [
      {
        name: "Sewers",
        items: [
          {
            id: "c6-1",
            tag: "FF",
            name: "Beached Ship Pendant",
            desc: "Explore the beached ship at the start. Crouch through the hole on the side to find a pendant in the nets.",
          },
          {
            id: "c6-2",
            tag: "COMIC",
            name: "Ship Cabin Comic",
            desc: "On the beach, search the nearby ship's cabin for a comic.",
          },
          {
            id: "c6-3",
            tag: "ART",
            name: "Ship Note",
            desc: "In the ship's cabin on the beach.",
          },
          {
            id: "c6-4",
            tag: "FF",
            name: "Sewer Waterway Pendant",
            desc: "After entering the sewers, look right for water draining into the current area. Climb up into the waterway for a pendant.",
          },
          {
            id: "c6-5",
            tag: "ART",
            name: "Sewer Note",
            desc: "Joel and Ellie split from Henry and Sam taking the right path. Ellie can go through a small gate. Artifact on a table.",
          },
          {
            id: "c6-6",
            tag: "FF",
            name: "Sunken Car Pendant",
            desc: "When Joel can swim and dive, dive where the light shines through the broken roof. Next to a sunken car is a pendant.",
          },
          {
            id: "c6-7",
            tag: "ART",
            name: "Trading Note",
            desc: "In the sewer area near the pallet, a door nearby has two Clickers inside. In this room is an artifact.",
          },
          {
            id: "c6-8",
            tag: "TOOL",
            name: "Generator Room Tools",
            desc: "After Ellie starts the generator, hug the left wall to find an equipment storage room with tools.",
          },
          {
            id: "c6-9",
            tag: "MAN",
            name: "Nail Bomb Upgrade #1 (Proximity 1.5x radius)",
            desc: "After triggering the sound alarm, proceed forward. Past the Shorty gun, on another shelf.",
          },
          {
            id: "c6-10",
            tag: "ART",
            name: "Rain Catcher Note",
            desc: "After being ambushed by Infected, head right into the makeshift laundry room. Artifact on a table.",
          },
          {
            id: "c6-11",
            tag: "ART",
            name: "Cornered Note",
            desc: "Past the laundry room, pay attention to the left wall. Door leads to corpses with an artifact.",
          },
          {
            id: "c6-12",
            tag: "ART",
            name: "Kid's Drawing",
            desc: "When Joel and Sam reach a makeshift classroom. On a bookshelf is the artifact.",
          },
        ],
      },
      {
        name: "Suburbs",
        items: [
          {
            id: "c6-13",
            tag: "ART",
            name: "Looting Note",
            desc: "At Waverly Township, enter the first house on the right. Head upstairs for the artifact.",
          },
          {
            id: "c6-14",
            tag: "CONV",
            name: "Kitchen Cave-in Chat",
            desc: "At the curve in the road, a caved-in house reveals a kitchen. Henry has a conversation.",
          },
          {
            id: "c6-15",
            tag: "CONV",
            name: "Warning Sign Chat",
            desc: "Opposite the kitchen, the house with 'Will Shoot On Sight' written on it. Henry has something to say.",
          },
          {
            id: "c6-16",
            tag: "CONV",
            name: "Ice Cream Truck Chat",
            desc: "Ice Cream truck conversation with Ellie, hard to miss.",
          },
          {
            id: "c6-17",
            tag: "MAN",
            name: "Melee Weapon Upgrade #2",
            desc: "At the Ice Cream Truck house, 2nd floor, have Ellie boosted into the roof crawlspace for a manual.",
          },
          {
            id: "c6-18",
            tag: "ART",
            name: "Father's Note",
            desc: "At the Ice Cream Truck, the house on the left with a fence. Upstairs in a bedroom.",
          },
          {
            id: "c6-19",
            tag: "ART",
            name: "Survivor's Note",
            desc: "In the next house, 2nd floor bedroom desk below a poster of 'The Bash'.",
          },
          {
            id: "c6-20",
            tag: "ART",
            name: "Matchbook",
            desc: "In the same house, on the 3rd floor.",
          },
          {
            id: "c6-21",
            tag: "COMIC",
            name: "Bathroom Comic",
            desc: "In the next house, 2nd floor bedroom has an adjoining bathroom with a comic.",
          },
          {
            id: "c6-22",
            tag: "CONV",
            name: "Dart Game Chat",
            desc: "Inside the house at the dead end, go upstairs and come back down. Ellie and Sam play darts. Throw a dart when prompted.",
          },
          {
            id: "c6-j5",
            tag: "JOKE",
            name: "Ellie's Jokes #5",
            desc: "After triggering conversations about the kitchen BBQ, 'Will Shoot On Sight' house, Ice Cream truck, and the red Firefly symbol at the dead end, wait for Ellie to tell her last jokes. The 'That's all I got' Gold Trophy unlocks here. Sam will tell a joke of his own.",
          },
          {
            id: "c6-23",
            tag: "FF",
            name: "Backyard Tree Pendant",
            desc: "At the dead end, search the backyard for small child-houses. In the tree above is the pendant.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 7: Tommy's Dam",
    video: "http://youtu.be/TWeCXcvqRS4",
    sections: [
      {
        name: "Hydroelectric Dam",
        items: [
          {
            id: "c7-1",
            tag: "COMIC",
            name: "Riverbed Rock Comic",
            desc: "Down the riverbed, before reaching the bridge, climb rocks on the right for a comic.",
          },
          {
            id: "c7-2",
            tag: "SHIV",
            name: "Power Plant Door",
            desc: "At the hydroelectric power plant, shiv the door near the running water.",
          },
          {
            id: "c7-3",
            tag: "CONV",
            name: "Teddy Bear Grave Chat",
            desc: "After crossing the running water, head left down the bank. Hop over a log to find a grave with a teddy bear.",
          },
          {
            id: "c7-4",
            tag: "ART",
            name: "Power Plant Map",
            desc: "Crouch under a fallen log, past the bulldozer on the left. Inside a brick outpost ahead.",
          },
          {
            id: "c7-5",
            tag: "CONV",
            name: "Horse Stable Chat",
            desc: "Enter the power plant. Ellie spots horses. Conversation after she talks about riding one.",
          },
          {
            id: "c7-6",
            tag: "CONV",
            name: "Catwalk Patrol Chat",
            desc: "After Tommy offers you a picture, on the metal catwalk head right to find a woman on patrol with a rifle.",
          },
          {
            id: "c7-7",
            tag: "MAN",
            name: "Smoke Bomb Upgrade #2",
            desc: "After petting the dog Buckley, in the main turbine room. On the console behind the two geniuses.",
          },
          {
            id: "c7-8",
            tag: "FF",
            name: "Turbine Room Pendant",
            desc: "Following Tommy to the Turbines, head left instead. Down the stairs, enter a small room. Inside a cabinet is the pendant.",
          },
          {
            id: "c7-9",
            tag: "ART",
            name: "Plant Schematics",
            desc: "When the power plant is under attack, fight back to where the two geniuses were.",
          },
        ],
      },
      {
        name: "Ranch House",
        items: [
          {
            id: "c7-10",
            tag: "FF",
            name: "Golden Pines Pendant",
            desc: "Enter the Golden Pines Corral house. In the back rooms on a desk is the pendant.",
          },
          {
            id: "c7-11",
            tag: "COMIC",
            name: "Board Game Room Comic",
            desc: "Upstairs in the house, first room on the left. A comic by a window near board games.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 8: The University",
    video: "http://youtu.be/HZ9inU0tdG8",
    sections: [
      {
        name: "Go Big Horns",
        items: [
          {
            id: "c8-1",
            tag: "COMIC",
            name: "Car Hood Comic",
            desc: "Before entering the University, turn the horse around. At the end on the hood of a car is the comic.",
          },
          {
            id: "c8-2",
            tag: "ART",
            name: "Sniper's Nest Log",
            desc: "Beyond the main gate, on the right where the flamethrower is. Go up the stairs to the top level.",
          },
          {
            id: "c8-3",
            tag: "CONV",
            name: "Football Building Chat",
            desc: "Past the main gate, jump over a barrier and look at the large building on the left. Conversation about football.",
          },
          {
            id: "c8-4",
            tag: "FF",
            name: "Science Building Tree Pendant",
            desc: "Before heading inside the caved-in buildings, look opposite the Science building for a tree with a pendant.",
          },
          {
            id: "c8-5",
            tag: "ART",
            name: "Wall Panel Note",
            desc: "Head towards the Science Building through the caved-in wall and gates. Next to the wall panel powering a gate.",
          },
          {
            id: "c8-6",
            tag: "FF",
            name: "Dumpster Building Pendant",
            desc: "After opening the first gate with the generator, explore the right side for a dumpster to climb into a side building.",
          },
          {
            id: "c8-7",
            tag: "MAN",
            name: "Health Kit Upgrade #2 (33% stronger)",
            desc: "After jumping the barrier and encountering monkeys, head right. Climb the roof and enter an open window.",
          },
          {
            id: "c8-8",
            tag: "CONV",
            name: "Firefly Symbol Chat",
            desc: "Riding with Ellie past monkeys, look for a Firefly symbol spray painted on a building wall.",
          },
          {
            id: "c8-9",
            tag: "ART",
            name: "UEC Campus Map",
            desc: "At another gate needing a generator, crouch under furniture in the adjoining building. Artifact on the desk.",
          },
          {
            id: "c8-10",
            tag: "ART",
            name: "Student's Journal",
            desc: "2nd floor of the dormitory, Room 202. Inside a drawer.",
          },
          {
            id: "c8-11",
            tag: "FF",
            name: "Dorm Bloater Pendant",
            desc: "In the spore-infested dorms area, kill the Bloater to reveal a pendant.",
          },
          {
            id: "c8-12",
            tag: "ART",
            name: "Newspaper Clipping",
            desc: "After the Bloater in the dorm, back to the 2nd floor. Go right into room 209.",
          },
          {
            id: "c8-13",
            tag: "FF",
            name: "Perimeter Tent Pendant",
            desc: "At the Science Building perimeter, inside one of the tents in the corner of this area.",
          },
        ],
      },
      {
        name: "Science Building",
        items: [
          {
            id: "c8-14",
            tag: "SHIV",
            name: "Lecture Room Door",
            desc: "Room 104, Lecture Room at the end of the hall. Shiv Door with manual and tools inside.",
          },
          {
            id: "c8-15",
            tag: "TOOL",
            name: "Lecture Room Tools",
            desc: "Inside the Room 104 Shiv Door.",
          },
          {
            id: "c8-16",
            tag: "MAN",
            name: "Molotov Upgrade #2 (2x radius)",
            desc: "Inside Room 104, Lecture Room (Shiv Door) at the end of the hall.",
          },
          {
            id: "c8-17",
            tag: "CONV",
            name: "Medical Clipboard Chat",
            desc: "Before using stairs to head up, examine the luggage for Joel to review the medical clipboard.",
          },
          {
            id: "c8-18",
            tag: "ART",
            name: "Office Recorder",
            desc: "Level 3, left rooms. Room 101 Storage room, in front of a picture of a woman with her dog.",
          },
          {
            id: "c8-19",
            tag: "ART",
            name: "Fungal X-Rays",
            desc: "Through a tented area on the 3rd floor, in a room on a counter.",
          },
          {
            id: "c8-20",
            tag: "ART",
            name: "Lab Recorder",
            desc: "In the area with the monkeys, on a table on the edge.",
          },
          {
            id: "c8-21",
            tag: "FF",
            name: "Monkey Lab Pendant",
            desc: "In the monkey area, on the far wall on a shelf.",
          },
          {
            id: "c8-22",
            tag: "ART",
            name: "Firefly Recorder",
            desc: "Obtained automatically.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 9: Lakeside Resort",
    video: "http://youtu.be/zBQ-9xu1koY",
    sections: [
      {
        name: "The Hunt",
        items: [
          {
            id: "c9-1",
            tag: "ART",
            name: "No Pun Intended",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-2",
            tag: "ART",
            name: "No Pun Intended: Volume Too",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-3",
            tag: "ART",
            name: "To Get to the Other Side",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-4",
            tag: "ART",
            name: "Riley's Pendant",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-5",
            tag: "ART",
            name: "Sam's Robot",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-6",
            tag: "ART",
            name: "Walkman",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-7",
            tag: "ART",
            name: "Note from Mom",
            desc: "Examine Ellie's backpack. Need to FLIP the note for it to count!",
          },
          {
            id: "c9-8",
            tag: "ART",
            name: "Switchblade",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-9",
            tag: "ART",
            name: "Joel & Sarah Photo",
            desc: "Examine Ellie's backpack.",
          },
          {
            id: "c9-10",
            tag: "COMIC",
            name: "Deer Trail Cabin Comic",
            desc: "When Ellie follows the deer's blood trail into a cabin, head left into a room. Comic inside the desk drawer.",
          },
          {
            id: "c9-11",
            tag: "FF",
            name: "Clicker Room Pendant",
            desc: "When Ellie gets a boost for a ladder, a Clicker is in a small room. On top of a crate is the pendant.",
          },
          {
            id: "c9-12",
            tag: "CONV",
            name: "Dead Corpses Chat",
            desc: "The old man tells Ellie to watch her language. Inside the next area, near two dead corpses triggers a conversation.",
          },
          {
            id: "c9-13",
            tag: "FF",
            name: "Gazebo Pendant",
            desc: "After separating from your horse and clearing a cabin, directly right is a small gazebo with a pendant.",
          },
          {
            id: "c9-14",
            tag: "COMIC",
            name: "Nature Path Comic",
            desc: "On the Nature Path, after crawling through a small tunnel, look left to an area with green benches.",
          },
        ],
      },
      {
        name: "Cabin Resort",
        items: [
          {
            id: "c9-15",
            tag: "ART",
            name: "Lake Resort Map",
            desc: "Obtained automatically when interrogating the Hunters.",
          },
          {
            id: "c9-16",
            tag: "SHIV",
            name: "Blizzard Motel Door",
            desc: "As Joel in the snowy blizzard, take shelter in a Motel. Out the bathroom window, turn left for a shiv door.",
          },
          {
            id: "c9-17",
            tag: "MAN",
            name: "Smoke Bomb Upgrade #2 (20 seconds longer)",
            desc: "Inside the shiv door in the Motel.",
          },
          {
            id: "c9-18",
            tag: "ART",
            name: "Ellie's Backpack",
            desc: "Joel gets this automatically through the story.",
          },
          {
            id: "c9-19",
            tag: "ART",
            name: "Meat Ledger",
            desc: "Next to where you got Ellie's backpack, look right.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 10: Bus Depot",
    video: "http://youtu.be/AGUxsoYQhFU",
    sections: [
      {
        name: "Highway Exit",
        items: [
          {
            id: "c10-1",
            tag: "CONV",
            name: "Guitar Lesson Chat",
            desc: "Spring time. Joel will talk about teaching Ellie six-string guitar.",
          },
          {
            id: "c10-2",
            tag: "ART",
            name: "Family Photo",
            desc: "On the left side, an RV with an open door and a corpse on the steps. Inside is an artifact.",
          },
          {
            id: "c10-3",
            tag: "CONV",
            name: "Airline Dreams Chat",
            desc: "After grabbing items in the RV, Ellie is in front of an airline advertisement. Speak about her dreams.",
          },
          {
            id: "c10-4",
            tag: "FF",
            name: "School Bus Pendant",
            desc: "Off the Freeway Exit, a school bus on the left. Go around to where the wall ends, find orange barrels.",
          },
          {
            id: "c10-5",
            tag: "ART",
            name: "Note to Wife",
            desc: "Inside the bus station where you get the ladder, opposite the ladder is luggage with a note.",
          },
          {
            id: "c10-6",
            tag: "CONV",
            name: "Bus Station Ladder Chat",
            desc: "Joel and the ladder inside the bus station.",
          },
          {
            id: "c10-7",
            tag: "CONV",
            name: "Giraffe Encounter Chat",
            desc: "Interact with the giraffe.",
          },
          {
            id: "c10-8",
            tag: "CONV",
            name: "Giraffe Overlook Chat",
            desc: "When Ellie watches the landscape with giraffes, interact for a conversation and cutscene.",
          },
          {
            id: "c10-9",
            tag: "COMIC",
            name: "Restroom Comic",
            desc: "After viewing the giraffes, go right instead of left down the stairs. Inside the Men's restroom is the comic.",
          },
          {
            id: "c10-10",
            tag: "TOOL",
            name: "Triage Tent Tools",
            desc: "At the triage area, inside the tents.",
          },
          {
            id: "c10-11",
            tag: "FF",
            name: "Triage Light Stand Pendant",
            desc: "At the triage area, stick left near the tents. Before going through the bus, find a giant light stand with the pendant.",
          },
          {
            id: "c10-12",
            tag: "ART",
            name: "Salt Lake Q.Z. Map",
            desc: "In the triage area, far corner workbench area. On a table.",
          },
          {
            id: "c10-13",
            tag: "CONV",
            name: "Ellie Photo Chat",
            desc: "At the bus in the triage area. Ellie gives you a photo.",
          },
        ],
      },
      {
        name: "Underground Tunnel",
        items: [
          {
            id: "c10-14",
            tag: "FF",
            name: "Tunnel Entrance Pendant",
            desc: "Before going into the tunnel, search the front of the bus at the entrance.",
          },
          {
            id: "c10-15",
            tag: "MAN",
            name: "Nail Bomb Upgrade #2 (1.5x radius)",
            desc: "In the dark area with Infected and Clickers, climb atop a truck.",
          },
          {
            id: "c10-16",
            tag: "COMIC",
            name: "Ventilation Shaft Comic",
            desc: "After setting up the ladder for Ellie, a ventilation shaft on the left. Go to the end.",
          },
          {
            id: "c10-17",
            tag: "SHIV",
            name: "Workbench Corridor Door",
            desc: "Past the workbench, go right instead of left. At the end is a shiv door.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 11: The Firefly Lab",
    video: "http://youtu.be/IMOYoZgrkbU",
    sections: [
      {
        name: "The Hospital",
        items: [
          {
            id: "c11-1",
            tag: "ART",
            name: "Surgeon's Recorder",
            desc: "On the 6th floor, right at the counter in front as you enter.",
          },
          {
            id: "c11-2",
            tag: "ART",
            name: "Marlene's Recorder 1",
            desc: "On the 6th floor, turn right and enter the small room. On the counter.",
          },
          {
            id: "c11-3",
            tag: "SHIV",
            name: "Hospital 6th Floor Door",
            desc: "On the 6th floor, a room requiring a shiv. Firefly pendant inside.",
          },
          {
            id: "c11-4",
            tag: "FF",
            name: "Hospital Shiv Room Pendant",
            desc: "Inside the 6th floor shiv door room.",
          },
          {
            id: "c11-5",
            tag: "ART",
            name: "Marlene's Journal",
            desc: "On the 6th floor, in a quarantine area with tents. Search one for an artifact.",
          },
          {
            id: "c11-6",
            tag: "ART",
            name: "Marlene's Recorder 2",
            desc: "After barricading a door with a blue cart, look right down the hallway. Enter room 608.",
          },
        ],
      },
    ],
  },
  {
    chapter: "Chapter 12: Jackson",
    video: "http://youtu.be/dPB-mnTYBfc",
    sections: [
      {
        name: "Epilogue",
        items: [
          {
            id: "c12-1",
            tag: "COMIC",
            name: "Field Broken Car Comic",
            desc: "After climbing between the barbed wire, walk through fields with Joel. Veer right to find a broken down car.",
          },
        ],
      },
    ],
  },
];

export default guide;
