const lessonCardTitle = [];
const lessonCardData = [];
console.log(lessonCardData.length);

const loadLessonCardTitle = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  try {
    const res = await fetch(url);
    const data = await res.json();
    lessonCardTitle.push(...data.data);
  } catch (error) {}
};

const loadLessonCardData = async () => {
  const url = "https://openapi.programming-hero.com/api/words/all";
  try {
    const res = await fetch(url);
    const data = await res.json();
    lessonCardData.push(...data.data);
  } catch (error) {}
};

const lessonCardTitleContainer = document.getElementById("lesson-buttons");
const lessonCardContainer = document.getElementById("lesson_card_container");

function createLessonCardTitle() {
  lessonCardTitle.forEach((data) => {
    const button = document.createElement("button");
    button.classList.add(
      "btn",
      "btn-primary",
      "btn-outline",
      "text-sm",
      "md:text-base",
      "max-h-full",
      "py-6",
    );
    button.innerHTML = `<i class="fa-solid fa-book-open"></i>${data.lessonName}`;

    lessonCardTitleContainer.appendChild(button);
  });
}

function createLessonCard() {
  if (lessonCardData.length <= 0) {
    const card = document.createElement("div");

    card.innerHTML = `
      <div class=" w-full ">
       
        <p class=" text-[#79716B] text-xs mb-2 lg:mb-4 ">আপনি এখনো কোন Lesson Select করেন নি</p>
          <h2 class=" font-medium text-xl lg:text-3xl ">একটি Lesson Select করুন।</h2>
    
      </div>
    `;
    lessonCardContainer.appendChild(card);
  } else {
    lessonCardData.forEach((lesson) => {
      const card = document.createElement("div");

      if (lesson.level == 1) {
        card.innerHTML = `<h4>${lesson.word}</h4>`;

        lessonCardContainer.appendChild(card);
      }
    });
  }
}

const init = async () => {
  await loadLessonCardTitle();
  await loadLessonCardData();
  createLessonCardTitle();
  createLessonCard();
};

init();
