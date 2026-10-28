// Reusable quiz + recall widgets.
// Markup:
//   <div class="quiz" data-answer="2">
//     <div class="q">Question</div>
//     <button class="opt">A</button> <button class="opt">B</button> <button class="opt">C</button>
//     <div class="why">Explanation shown after answering.</div>
//   </div>
//   <div class="recall"><div class="q">Prompt</div><textarea></textarea>
//     <details><summary>对照答案</summary>...</details></div>
// data-answer is the zero-based index of the correct option.
(function () {
  function initQuiz(quiz) {
    const answer = Number(quiz.dataset.answer);
    const opts = [...quiz.querySelectorAll("button.opt")];
    opts.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        if (quiz.classList.contains("done")) return;
        quiz.classList.add("done");
        btn.classList.add(i === answer ? "right" : "wrong");
        opts[answer].classList.add("right");
        quiz.dataset.correct = String(i === answer);
        updateScore();
      });
    });
  }
  function updateScore() {
    const el = document.querySelector(".score");
    if (!el) return;
    const all = document.querySelectorAll(".quiz");
    const done = document.querySelectorAll(".quiz.done");
    const right = document.querySelectorAll('.quiz[data-correct="true"]');
    el.textContent = `已答 ${done.length}/${all.length}，答对 ${right.length}`;
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".quiz").forEach(initQuiz);
    updateScore();
  });
})();
