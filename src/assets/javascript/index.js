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
        const $matchResult = result($playerHand, $computerHand);
        toggle_class_with_animation();
        $hand.addEventListener(
          'animationend',
          () => {
            set_hands([$playerHand, $computerHand]);
            show_message($matchResult);
            update_score($matchResult);
            toggle_class_with_animation();
          },
          { once: true }
        );
      });
    });
  };

  const create_rand_hand = () => {
    const $handsPattern = Array.from($handButtons).map(($button) => {
      return $button.dataset.hand;
    });
    return $handsPattern[Math.floor(Math.random() * 3)];
  };

  const toggle_class_with_animation = () => {
    $hand.classList.toggle('is-shake');
  };

  const set_hands = ($handTypesArray) => {
    $playerHands.forEach(($hand, index) => {
      $hand.src = `assets/images/${$handTypesArray[index]}.png`;
    });
  };

  const show_message = ($key) => {
    const $results = {
      tie: "It's a tie!",
      win: 'You win!',
      lose: 'Computer wins!'
    };
    $heading.textContent = $results[$key];
  };

  const update_score = ($key) => {
    if ($key === 'win') {
      $playerScore++;
      $playerPanel.textContent = $playerScore;
    }

    if ($key === 'lose') {
      $computerScore++;
      $computerPanel.textContent = $computerScore;
    }
  };

  const result = ($playerHand, $computerHand) => {
    let $result = 'lose';
    if ($playerHand === $computerHand) {
      $result = 'tie';
    }
    if (winning_pattern($playerHand, $computerHand)) {
      $result = 'win';
    }
    return $result;
  };

  const winning_pattern = ($playerHand, $computerHand) => {
    return (
      ($playerHand === 'rock' && $computerHand === 'scissors') ||
      ($playerHand === 'scissors' && $computerHand === 'paper') ||
      ($playerHand === 'paper' && $computerHand === 'rock')
    );
  };

  start_game();
  play_match();
});
