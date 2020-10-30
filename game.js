const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {}

function startGame (){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange room near a jar of blue goo.",
        options:[
            {
              text: 'Take goo', 
              setState: {blueGoo: true},
              nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "Leaving the room you find yourself on a road and venture forth in search of answers when you come across a merchant.",
        options: [
            {
                text: "Trade blue goo for sword",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3           
            },
            {
                text: "Trade blue goo for shield",
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 3           
            },
            {
                text: "Ignore the merchant",
                nextText: 3           
            }
        ]
    },
    {
        id: 3,
        text: "Still unsure where you are you walk past the merchant and arrive at a crossroads. To the north a castle on a hilltop, to the west a dark forest and to the east a small village.",
        options: [
            {
                text: "Climb the hill to explore the castle",
                nextText: 4
            },
            {
                text: "Explore the forest for answers",
                nextText: 5
            },
            {
                text: "Go to the town and talk to the townspeople",
                nextText: 6
            }
        ]
    },
    {
        id: 4, 
        text: "You arrive at the castle's large black gate. Off to your right there is a guard in shiny armour, a large sword thrust into the earth in front of him and his hands resting on the pommel.",
        options: [
            {
                text: "Knock on the door",
                nextText: 7
            },
            {
                text: "Talk to the guard",
                nextText: 8
            },
            {
                text: "Attack guard",
                requiredState: (currentState) => currentState.sword || currentState.shield,
                nextText: 9
            }
        ]
    },
    {
        id: 5,
        text: "The forest is dark and swallows the light around you quickly, in just a few steps the light from the town behind you is already fading. There is a strange energy to the forest, you're sure there is something magical here.",
        options: [
            {
                text: "Keep going and try to find whatever secrets this forest holds",
                nextText: 10
            },
            {
                text: "Turn back towards the town, you don't want anything to do with this forest",
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: "The town looks ramshackled and you can't see anyone outside. From the building to your left you hear the sound of several people arguing and up ahead you can see the light coming from an inn.",
        options: [
            {
                text: "Investigate the sounds",
                nextText: 11
            },
            {
                text: "Go to the inn",
                nextText: 12
            }
        ]
    },
    {
        id: 7,
        text: "You knock on the door and it echoes seemingly endlessly through the halls. The guard does not seem bothered by you and does not move. The door slowly creaks open and an elderly man welcomes you into the hall, his long thin fingers reaching towards you.",
        options: [
            {
                text: "Go with the man into the castle",
                nextText: 13
            },
            {
                text: "Run",
                nextText: 14
            }
        ]
    },
    {
        id: 8,
        text: "The guard does not acknowledge you or your question and shows no sign of movement.",
        options: [
            {
                text: "Knock on the door",
                nextText: 7
            },
            {
                text: "Attack guard",
                requiredState: (currentState) => currentState.sword || currentState.shield,
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: "Despite being equipped for a fight you are outmatched. As you reel back to attack him the guard swings his massive sword cutting clean through your weapon and you before returning to his pose, unbothered by your and you feeble attack. You die within seconds.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: "Despite the darkness you press on through the thick forest. As what was left of the light fades away completely you hear a deep gutteral growl from behind you. Something is hunting you.",
        options: [
            {
                text: "You draw your sword and turn to face the beast",
                requiredState:(currentState) => currentState.sword,
                nextText: 15
            },
            {
                text: "You pull out your shield and turn to face the beast",
                requiredState:(currentState) => currentState.shield,
                nextText: 16
            },
            {
                text: "Run deeper into the forest",
                nextText: 17
            },
            {
                text: "Find somewhere to hide",
                nextText: 18
            }
        ]
    },
    {
        id: 11,
        text: "You move up to the door and quietly open it. Within the building you see a group of four bandits all sitting around a table arguing over their spoils. You see that at least two of the them are armed with knives.",
        options: [
            {
                text: "You draw your sword and rush in hoping to catch the bandits off guard",
                requiredState:(currentState) => currentState.sword,
                nextText: 19
            },
            {
                text: "Talk to the men, they might know why you're here",
                nextText: 20
            },
            {
                text: "Close the door again quietly and leave",
                nextText: 21
            }
        ]
    },
    {
        id: 12,
        text:"The warm light of the inn is too inviting to pass up and you walk forwards. There are two burly men in the corner drinking ale with axes at their sides, and a surly woman behind the bar.",
        options: [
            {
                text: "Sit with the men and drink with them",
                nextText: 22
            },
            {
                text: "Talk with the woman about a bed for the night",
                nextText: 23
            },
        ]
    },
    {
        id: 13,
        text: "Despite an eerie feeling you have about the man you follow him into the castle. He leads you through the hall and up the grand staircase and down a candlelit hallway as you follow him you see an open door to a room filled with treasure.",
        options: [
            {
                text: "Investigate the treasure room",
                nextText: 24
            },
            {
                text: "Continue to follow the man",
                nextText: 25
            }
        ]
    },
    {
        id: 14, 
        text: "You turn to run and begin to sprint down the hill. Before you make it very far the guard raises his large sword and throws it towards you. The blade hits you in the back and you fall to the ground, dead before you touch earth.",
        options: [
            {
                text:"Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 15,
        text: "Drawing you sword you turn but can't make out the animal against the shadows of the forest and swing wildly. You connect with the beast and it snarls, but this only makes it angrier. Before you can strike again it lunges forwards and sinks its teeth into you, the poison quickly takes hold of you and the darkness consumes you.",
        options: [
            {
                text:"Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 16,
        text: "Pulling out your shield you turn towards the sound of the growling just as the beast jumps towards you. You fall to the ground with the shield in between you and the dark beast. It swings at the shield and rips the shield to splinters you push the now splintered shield up and blood pours out onto you. The beast goes still. The sinister feeling in the forest disappears instantly and you push the body off of you, you see a pale blue light through the trees.",
        options: [
            {
                text: "Follow the light deeper into the forest",
                setState: {shield: false},
                nextText: 26
            }
        ]
    },
    {
        id: 17,
        text: "You run as fast as you can blindly going deeper into the trees. The beast hears you running and begins to give chase, getting faster and faster until you feel its claws grip your legs and its teeth sink into your neck.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 18, 
        text: "Hoping the beast's vision is as bad as your is you walk into a thick cluster of trees and hide yourself amongst a tangle of roots. You hear the beast draw nearer and then pass right by you, apparently unable to see you. You wait until you can no longer hear the footfalls and growling and try to stand. You quickly realise that these are no ordinary trees. The roots twist around your body and pull you down. The ground opens beneath you and you sink into the earth, you try to scream but the trees hold you mouth closed. Your body is gone your spirit joins the others that wander the forest.",
        options: [
            {
                text:"Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 19,
        text: "You burst through the door catching the bandits off guard and cutting down the two you saw with knives. The other two move to attack you but they don't have weapons you easily take them out and they scream. As the scream echoes out into the night and you look over the table full of spoils the door bursts open again. Two large men weilding axes storm in not asking questions you only have time to block one mans axe before the other one hits you in the chest. The men pick up the bloodsoaked treasure and leave the corpse strewn house.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 20,
        text: "You open the door and announce yourself to the bandits making it clear you want to talk to them. The nearest bandits to you turn with a sickening grin and lunge at you, knives brandished. There lust for blood and gold overtaking them.",
        options:[
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 21,
        text: "You gently close the door and wander back out to the center of the town.",
        options: [
            {
                text: "Go to the inn",
                nextText: 12
            },
            {
                text: "Head back to the crossroads",
                nextText: 3
            }
        ]
    },
    {
        id: 22, 
        text: "The large men seem jovial despite the axes at their sides and they happily ask you to join them. You learn that they are mercenaries from the Black Peak and that the town you are in is called Cliff Spire. You are a long way away from home. But the mercenaries offer a solution.",
        options: [
            {
                text: "They offer to take your sword in return for 15 gold pieces",
                requiredState:(currentState) => currentState.sword,
                setState: {sword: false, goldCoins: true},
                nextText: 27
            },
            {
                text: "Reject their offer and tell them you won't part with your sword",
                requiredState:(currentState) => currentState.sword,
                nextText: 28
            },
            {
                text: "Continue",
                nextText: 29
            }
        ]
    },
    {
        id: 23,
        text: "You approach the woman and she asks if you want to buy a room for the night",
        options: [
            {
                text: "Pay 15 gold pieces for the night",
                requiredState:(currentState) => currentState.goldCoins,
                nextText: 30
            },
            {
                text: "You can't afford it, leave the inn and head back to the crossroads",
                nextText: 3
            }
        ]
    },
    {
        id: 24, 
        text: "Unable to resist the call of the room full of treasure you walk away from the butler and towards the mounds of gold. As you touch your first coin the door behind you slams shut and the form of the old man stands between you and the exit. As you look at him his body contorts and changes as he slowly transforms into a twisted ghoul, with crimson eyes and rows of gleaming white fangs. Paralysed by fear you have no time to react before the creature devours you.",
        options:[
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 25,
        text: "You pull your gaze away from the treasure and continue to follow the man. He slowly turns his head to look over his shoulder and gives you a ghoulish grin but doesn't stop walking. Eventually he leads you to an ornate door and opens it for you to walk through. The room is an ornate bedroom that looks like its been decorated for royalty. There is a silver hand mirror on the bed, and a woman turned away from you looking into a vanity.",
        options: [
            {
                text: "Look in the mirror",
                nextText: 31
            },
            {
                text: "Talk to the woman",
                nextText: 32
            }
        ]
    },
    {
        id: 26,
        text: "The pale blue light leads you quickly through the trees and into a small clearing, at the center of the clearing is a floating ball of blue fire. The flames whisper to you, beckoning you towards them, compelling you to hold them.",
        options: [
            {
                text: "Touch the flames",
                nextText: 33
            },
            {
                text: "Try to find your way out of the forest",
                nextText: 34
            }
        ]
    },
    {
        id: 27,
        text: "You happily give your sword over to the mercenaries and have one last drink before they tell you they're heading out. You decide its probably time you got some sleep",
        options: [
            {
                text: "Speak to the woman",
                nextText: 23
            }
        ]
    },
    {
        id: 28,
        text: "Your dedication to the sword impresses the mercenaries. They tell you they're always looking for someone dedicated to join their ranks and offer you a position with them",
        options: [
            {
                text: "Accept their offer",
                nextText: 35
            },
            {
                text: "Decline their offer",
                nextText: 36
            }
        ]
    },
    {
        id: 29,
        text: "The mercenaries tell you about a campsite just outside the town you can go to in search of. You thank the men for their time and leave to go and search for the campsite. But as soon as you walk out the door you are greeted by a group of bandits who waste no time and slash you with their knives.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 30,
        text: "You pay the woman the money she asks for and she takes you up to your room upstairs. The room is very warm and homely and you quickly find yourself quickly falling asleep. In the middle of the night you wake suddenly with a sharp pain in your chest, you look down to see a knife and a ghoulish bandit smile.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 31,
        text: "You find yourself staring into the polished surface even though you don't relly remember picking it up. As you look at your reflection red letters begin to appear on the surface. 'The time is now yours. Your reflection is gone and you flesh is ours.' The letters fade and you see a blank mirror before the world goes black and you collapse.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 32,
        text: "You clear your throat and announce your presence to her. She turns slowly in her chair and looks towards you. She has pale white skin and bright red lips but her eyes are pure black. She smiles at you and tells you that you passed her tests and if you will take her hand in marriage and join her as ruler of this castle and the place beyond.",
        options: [
            {
                text: "Accept her proposal and join her",
                nextText: 37
            },
            {
                text: "Decline her offer",
                nextText: 38
            }
        ]
    },
    {
        id: 33,
        text: "You reach out and your fingers touch the flames, but they aren't hot they're cold. The cold sensation works its way into you body as the fire disappears, you understand now why you were brought here. You were brought here for this, to accept the flame, its power, its knowledge, its responsibility. The forest belongs to you now, the darkness peels away from the trees and the branches sprout fresh leaves. It is your domain now.",
        options: [
            {
                text: "Congratulations on becoming the guardian of the midnight forest, play again to find a different ending",
                nextText: -1
            }
        ]
    },
    {
        id: 34,
        text: "You try to make your way out of the forest but without the fire you cannot find your way out of the forest. Within moments the darkness surrounds you and you cannot even find you way back to the clearing with the fire. You spend the rest of your life stumbling around in the dark.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 35,
        text: "You happily accept the offer from the mercenaries to join them. They set out immediately with you in toe heading out across the land taking jobs where you can and reaping the rewards. After months of fighting side by side the mercenaries take you back home. You're not sure why someone brought you to that mysteroious room but you got lifelong friends and a small mountain of gold from it. So you're not all that worried about the why.",
        options: [
            {
                text: "Congratulations, your exploits as a mercenary are known across the land. Your renown and wealth have expanded greatly, play again for a different ending",
                nextText: -1
            }
        ]
    },
    {
        id: 36,
        text: "The mercenaries take your refusal as a personal insult, thinking you're only holding on to your sword so you can attack them once they've had too much ale. In a fit of rage the mercenaries throw you out of the inn and attack you with their axes. Slightly drunk and woefully outmatched you are defeated quickly.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 37, 
        text: "You accept the marriage proposal of the Pale Queen and immediately feel a change within yourself. Her power flows between the two of you and you feel that both of you are becoming stronger. As you look out the window you can see the world beyond changing, the sky changing to a blood red with black clouds and the land became a pale desert with colossal grey towers errupting all around. This was the place beyond and you were now its ruler, and your power is close to unstoppable.",
        options: [
            {
                text: "Congratulations, you are now the ruler of the Place Beyond you and your new wife will rule until time's end. Play again for a different ending",
                nextText: -1
            }
        ]
    },
    {
        id: 38, 
        text: "As a horrid cackle fills the room you realise you made a mistake. It was not just an offer of marriage it was an offer of life. The pale woman laughs hysterically as her fingers lengthen and turn to claws. Her flesh peels away to reveal a swirling terror the likes of which no one has seen or could imagine. You descend deep into madness.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
]

startGame()