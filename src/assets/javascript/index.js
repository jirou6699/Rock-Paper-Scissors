document.addEventListener('DOMContentLoaded', () => {
  let $playerScore = 0;
  let $computerScore = 0;

  const $playerPanel = document.querySelector('[data-score="player"]');
  const $computerPanel = document.querySelector('[data-score="computer"]');
  const $startButton = document.querySelector('.js-start-button');
  const $introScreen = document.querySelector('.js-intro-screen');
  const $mainScreen = document.querySelector('.js-main-screen');
  const $handButtons = document.querySelectorAll('a[data-hand]');
  const $playerHands = document.querySelectorAll('img[data-player]');
  const $hand = document.querySelector('.js-hand');
  const $heading = document.querySelector('.js-heading');

  const start_game = () => {
    $startButton.addEventListener('click', () => {
      $introScreen.classList.add('is-fadeOut');
      $mainScreen.classList.add('is-fadeIn');
    });
  };

  const play_match = () => {
    $handButtons.forEach(($button) => {
      $button.addEventListener('click', (e) => {
        const $playerHand = e.target.dataset.hand;
        const $computerHand = create_rand_hand();
        toggle_class_with_animation();
        $hand.addEventListener(
          'animationend',
          () => {
            set_hands([$playerHand, $computerHand]);
            match_result($playerHand, $computerHand);
            toggle_class_with_animation();
          },
          { once: true }
        );
      });
    });
  };

  const create_rand_hand = () => {
    const $handPattern = Array.from($handButtons).map((button) => button.dataset.hand);
    return $handPattern[Math.floor(Math.random() * 3)];
  };

  const toggle_class_with_animation = () => {
    $hand.classList.toggle('is-shake');
  };

  const set_hands = (hands) => {
    $playerHands.forEach((hand, index) => {
      hand.src = `assets/images/${hands[index]}.png`;
    });
  };

  const match_result = (player, computer) => {
    if (is_tie(player, computer)) {
      game_tie();
    } else if (is_win(player, computer)) {
      game_win();
    } else {
      game_lose();
    }
  };

  const is_tie = (player, computer) => {
    return player === computer;
  };

  const is_win = (player, computer) => {
    return (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'scissors' && computer === 'paper') ||
      (player === 'paper' && computer === 'rock')
    );
  };

  const game_tie = () => {
    $heading.textContent = "it's a tie!";
  };

  const game_win = () => {
    $playerPanel.textContent = ++$playerScore;
    $heading.textContent = 'You win!';
  };

  const game_lose = () => {
    $computerPanel.textContent = ++$computerScore;
    $heading.textContent = 'Computer wins!';
  };

  start_game();
  play_match();
});
