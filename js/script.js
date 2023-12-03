document.addEventListener("DOMContentLoaded", function() {
    const enterButton = document.getElementById('enter-button');
    const optionsSection = document.getElementById('options');

    enterButton.addEventListener('click', function() {
        enterButton.style.display = 'none';
        optionsSection.innerHTML = '';

        const singlePlayerButton = document.createElement('button');
        singlePlayerButton.textContent = 'Jogar sozinho';

        const twoPlayersButton = document.createElement('button');
        twoPlayersButton.textContent = 'Jogar com dois jogadores';

        optionsSection.appendChild(singlePlayerButton);
        optionsSection.appendChild(twoPlayersButton);

        optionsSection.style.display = 'block';
    });
});
