(() => {
  const config = window.LINGROO_PAGE;
  if (!config) return;

  const question = document.querySelector('[data-question]');
  const label = document.querySelector('[data-question-label]');
  const options = document.querySelector('[data-options]');
  const feedback = document.querySelector('[data-feedback]');
  const nextButton = document.querySelector('[data-next]');
  const resetButton = document.querySelector('[data-reset]');
  const scoreBox = document.querySelector('[data-score]');
  const scoreTitle = document.querySelector('[data-score-title]');
  const scoreText = document.querySelector('[data-score-text]');
  const xp = document.querySelector('[data-xp]');
  const levelPill = document.querySelector('[data-level-pill]');
  const toast = document.querySelector('[data-toast]');
  const progress = document.querySelector('[data-progress]');
  const counter = document.querySelector('[data-counter]');

  if (!question || !options || !nextButton) return;

  const sourceTasks = Array.isArray(config.taskPool) && config.taskPool.length
    ? config.taskPool
    : Array.isArray(config.tasks)
      ? config.tasks
      : [];

  const tasksPerRun = Math.max(
    1,
    Math.min(Number(config.tasksPerRun) || 3, sourceTasks.length)
  );

  let tasks = [];
  let index = 0;
  let score = 0;
  let answered = false;
  let previousSignature = '';

  const shuffle = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const selectTasks = () => {
    if (!sourceTasks.length) return [];

    let selected = shuffle(sourceTasks).slice(0, tasksPerRun);
    let signature = selected.map((task) => task.question).join('|');
    let attempts = 0;

    while (
      sourceTasks.length > tasksPerRun &&
      signature === previousSignature &&
      attempts < 5
    ) {
      selected = shuffle(sourceTasks).slice(0, tasksPerRun);
      signature = selected.map((task) => task.question).join('|');
      attempts += 1;
    }

    previousSignature = signature;
    return selected;
  };

  const render = () => {
    const task = tasks[index];
    if (!task) return;

    answered = false;
    question.innerHTML = task.question;
    if (label) label.textContent = task.label;
    if (feedback) {
      feedback.className = 'feedback';
      feedback.textContent = config.chooseText;
    }
    if (scoreBox) scoreBox.classList.remove('show');
    if (toast) toast.classList.remove('show');

    nextButton.disabled = true;
    nextButton.textContent = index === tasks.length - 1
      ? config.finishText
      : config.nextText;

    if (counter) counter.textContent = `${index + 1}/${tasks.length}`;
    if (progress) progress.style.width = `${(index / tasks.length) * 100}%`;

    options.innerHTML = '';
    task.options.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'option';
      button.type = 'button';
      button.innerHTML = `<small>${option.key}</small>${option.text}`;
      button.addEventListener('click', () => answer(option.key));
      options.appendChild(button);
    });
  };

  const answer = (key) => {
    if (answered) return;
    answered = true;

    const task = tasks[index];
    const isCorrect = key === task.correct;
    if (isCorrect) score += 1;

    [...options.children].forEach((button, optionIndex) => {
      const option = task.options[optionIndex];
      if (option.key === task.correct) button.classList.add('correct');
      if (option.key === key && !isCorrect) button.classList.add('wrong');
      button.disabled = true;
    });

    if (feedback) {
      feedback.className = `feedback ${isCorrect ? 'good' : 'bad'}`;
      feedback.innerHTML = isCorrect ? task.feedbackGood : task.feedbackBad;
    }

    nextButton.disabled = false;
    if (progress) progress.style.width = `${((index + 1) / tasks.length) * 100}%`;
  };

  const finish = () => {
    const total = tasks.length;
    const xpValue = score * 15;
    const ratio = total ? score / total : 0;

    if (scoreTitle) {
      scoreTitle.textContent = config.resultTitle
        .replace('{score}', String(score))
        .replace('{total}', String(total));
    }
    if (xp) xp.textContent = `+${xpValue} XP`;
    if (levelPill) {
      levelPill.textContent = ratio === 1
        ? config.levelC1
        : ratio >= 2 / 3
          ? config.levelB2Plus
          : config.levelB2;
    }
    if (scoreText) {
      scoreText.textContent = ratio === 1
        ? config.resultPerfect
        : ratio >= 2 / 3
          ? config.resultGood
          : config.resultStart;
    }
    if (scoreBox) scoreBox.classList.add('show');
    if (toast) {
      toast.textContent = config.toast;
      toast.classList.add('show');
    }
  };

  const startNewRun = () => {
    tasks = selectTasks();
    index = 0;
    score = 0;
    if (tasks.length) render();
  };

  nextButton.addEventListener('click', () => {
    if (!answered) return;
    if (index < tasks.length - 1) {
      index += 1;
      render();
      return;
    }
    finish();
  });

  if (resetButton) resetButton.addEventListener('click', startNewRun);
  startNewRun();
})();

(() => {
  const config = window.LINGROO_WRITING_EXAMPLES;
  if (!config || !Array.isArray(config.examples) || !config.examples.length) return;

  const tabs = [...document.querySelectorAll('[data-writing-example]')];
  const before = document.querySelector('[data-writing-before]');
  const after = document.querySelector('[data-writing-after]');
  const note = document.querySelector('[data-writing-note]');
  const signals = document.querySelector('[data-writing-signals]');

  if (!before || !after || !note) return;

  const render = (selectedIndex) => {
    const example = config.examples[selectedIndex];
    if (!example) return;

    before.textContent = example.before;
    after.textContent = example.after;
    note.textContent = example.note;

    if (signals) {
      signals.innerHTML = '';
      (example.signals || []).forEach((signal) => {
        const item = document.createElement('span');
        item.className = 'writing-signal';
        item.textContent = signal;
        signals.appendChild(item);
      });
    }

    tabs.forEach((tab, index) => {
      const active = index === selectedIndex;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => render(index));
  });

  render(0);
})();

/* Backward-compatible fallback for older language pages. */
(() => {
  if (window.LINGROO_WRITING_EXAMPLES) return;
  const config = window.LINGROO_WRITING_DEMO;
  if (!config) return;

  const input = document.querySelector('[data-writing-input]');
  const output = document.querySelector('[data-writing-output]');
  const button = document.querySelector('[data-writing-run]');
  const reset = document.querySelector('[data-writing-reset]');
  const score = document.querySelector('[data-writing-score]');
  const style = document.querySelector('[data-writing-style]');
  const structure = document.querySelector('[data-writing-structure]');

  if (!input || !output || !button) return;

  const show = () => {
    output.innerHTML = config.corrected;
    if (score) score.textContent = config.score;
    if (style) style.textContent = config.style;
    if (structure) structure.textContent = config.structure;
    button.textContent = config.doneButton;
  };

  const clear = () => {
    input.value = config.sample;
    output.innerHTML = config.empty;
    if (score) score.textContent = '—';
    if (style) style.textContent = '—';
    if (structure) structure.textContent = '—';
    button.textContent = config.button;
  };

  button.addEventListener('click', show);
  if (reset) reset.addEventListener('click', clear);
  clear();
})();
