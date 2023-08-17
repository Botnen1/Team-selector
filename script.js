const teams = [
    { name: 'Hans', img: 'images/hans.png' },
    { name: 'Huuse', img: 'images/huuse.png' },
    { name: 'Sivert', img: 'images/sivert.png' },
    { name: 'Audun', img: 'images/audun.png' },
    { name: 'Oskar', img: 'images/oskar.png' },
    { name: 'Haugen', img: 'images/haugen.png' },
    { name: 'Narum', img: 'images/narum.png' },
    { name: 'Chris', img: 'images/chris.png' },
    { name: 'William', img: 'images/william.png' },
    { name: 'Skøg', img: 'images/skog.png' },
    { name: 'Caroline', img: 'images/caroline.png' },
    { name: 'Kasper', img: 'images/kasper.png' },

    // Add more team members here
];

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', reset);

function reset() {
    const slotContainer = document.getElementById('slotContainer');
    slotContainer.innerHTML = ''; // Clear the slotContainer
    spinButton.disabled = false; // Re-enable the spin button
    slotElementsUsed.length = 0; // Clear the used players array
}

const spinButton = document.getElementById('spinButton');
spinButton.addEventListener('click', spin);

const playerSelectionContainer = document.getElementById('playerSelection');

function createPlayerSelection() {
    teams.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = 'player';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = player.name;
        checkbox.id = player.name;
        
        const label = document.createElement('label');
        label.htmlFor = player.name;
        label.innerText = player.name;
        
        const img = document.createElement('img');
        img.src = player.img;
        
        playerElement.appendChild(checkbox);
        playerElement.appendChild(label);
        playerElement.appendChild(img);
        
        playerSelectionContainer.appendChild(playerElement);
    });
}

createPlayerSelection();

function spin() {
    const selectedTeamCount = parseInt(document.getElementById('teamCount').value);
    const selectedPlayerCount = parseInt(document.getElementById('playerCount').value);

    if (isNaN(selectedTeamCount) || isNaN(selectedPlayerCount)) {
        alert('Please select the number of teams and players per team.');
        return;
    }

    if (selectedPlayerCount < 1 || selectedPlayerCount > 5) {
        alert('Please select a valid number of players per team (1 to 5).');
        return;
    }

    if (selectedPlayerCount * selectedTeamCount > teams.length) {
        alert('Not enough players available for the selected number of teams and players per team.');
        return;
    }

    spinButton.disabled = true;
    const slotContainer = document.getElementById('slotContainer');
    slotContainer.innerHTML = '';

    const selectedPlayers = Array.from(document.querySelectorAll('.player input:checked'))
                               .map(checkbox => checkbox.value);
    const shuffledSelectedPlayers = shuffleArray(selectedPlayers.slice());

    const shuffledTeams = shuffleArray(teams.slice());

    for (let teamIndex = 0; teamIndex < selectedTeamCount; teamIndex++) {
        const teamContainer = document.createElement('div');
        teamContainer.className = 'team';

        for (let playerIndex = 0; playerIndex < selectedPlayerCount; playerIndex++) {
            if (shuffledSelectedPlayers.length > 0) {
                const player = shuffledSelectedPlayers.pop();
                const slot = createSlot(player.img);
                teamContainer.appendChild(slot);
            }
        }

        slotContainer.appendChild(teamContainer);
    }

    spinAllTeams(shuffledTeams);
}



function createSlot(imgUrl) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.style.backgroundImage = `url('${imgUrl}')`;
    return slot;
}

function spinAllTeams(shuffledTeams) {
    const slotElements = document.querySelectorAll('.slot');
    const spins = 100; // Increase the number of spins
    const spinDuration = 40; // Decrease the duration for a smoother animation
    let spinsDone = 0;
    
    const shuffledIndices = shuffleArray([...Array(shuffledTeams.length).keys()]);

    const spinInterval = setInterval(() => {
        slotElements.forEach((slot, slotIndex) => {
            const playerIndex = shuffledIndices[(slotIndex + spinsDone) % shuffledTeams.length];
            const player = shuffledTeams[playerIndex];
            slot.style.backgroundImage = `url('${player.img}')`;
        });

        spinsDone++;
        if (spinsDone === spins) {
            clearInterval(spinInterval);
            setTimeout(() => {
                spinButton.disabled = false;
            }, 2000); // Delay before re-enabling the "Spin" button (2 seconds)
        }
    }, spinDuration);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const slotElementsUsed = [];
