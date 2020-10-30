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
        text: "You venture forth in search of answers and come across a merchant.",
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
        text: "Still unsure where you are you walk past the merchant and arrive at a crossroads. To the north a castle on a hilltop, to the east a dark forrest and to the east a small village.",
        options: [
            {
                text: "Climb the hill to explore the castle",
                nextText: 4
            },
            {
                text: "Explore the forrest for answers",
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
        text: "The forrest is dark and swallows the light around you quickly, in just a few steps the light from the town behind you is already fading. There is a strange energy to the forrest, you're sure there is something magical here.",
        options: [
            {
                text: "Keep going and try to find whatever secrets this forrest holds",
                nextText: 10
            },
            {
                text: "Turn back towards the town, you don't want anything to do with this forrest",
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
        text: "Despite the darkness you press on through the thick forrest. As what was left of the light fades away completely you hear a deep gutteral growl from behind you. Something is hunting you.",
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
                text: "Run deeper into the forrest",
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
]

startGame()