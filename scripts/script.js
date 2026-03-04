const lessonCardTitle = [];
const lessonCardData = [];

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
    button.id = `${data.level_no}`;
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

function createLessonCard(lessonLevel) {
  // Clear container first

  lessonCardContainer.innerHTML = "";
  // Check if there are any lessons
  if (!lessonCardData || lessonCardData.length <= 0) {
    const card = document.createElement("div");

    card.innerHTML = `
      <div class=" w-full ">
       
        <p class=" text-[#79716B] text-xs mb-2 lg:mb-4 ">আপনি এখনো কোন Lesson Select করেন নি</p>
          <h2 class=" font-medium text-xl lg:text-3xl ">একটি Lesson Select করুন।</h2>
    
      </div>
    `;
    lessonCardContainer.appendChild(card);
    return;
  }

  //   Filtered Lesson By Level
  const filteredLesson = lessonCardData.filter(
    (lesson) => lesson.level == lessonLevel,
  );
  // If no lessons match the level

  if (filteredLesson.length <= 0) {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class=" w-full ">
       
        <p class=" text-[#79716B] text-xs mb-2 lg:mb-4 ">আপনি এখনো কোন Lesson Select করেন নি</p>
          <h2 class=" font-medium text-xl lg:text-3xl ">একটি Lesson Select করুন।</h2>
    
      </div>
    `;
    lessonCardContainer.appendChild(card);
    return;
  } else {
    // lessonCardContainer.innerHTML = "";
    filteredLesson.forEach((lesson) => {
      const card = document.createElement("div");
      card.classList.add(
        "bg-white",
        "p-6",
        "rounded-xl",
        "shadow-md",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "w-64",
        "lg:w-80",
        "min-h-72",
        "transition",
        "duration-300",
        "hover:shadow-xl",
        "hover:-translate-y-1",
      );
      card.innerHTML = `<div class=" flex rounded-2xl flex-col justify-center items-center gap-2">
    <h2 class="card-title font-bold text-3xl ">
     ${lesson.word}
    </h2>
    <p class=" leading-5 ">Meaning/Pronunciation</p>
    <p class="font-bangla font-semibold text-2xl ">"${lesson.meaning} / ${lesson.pronunciation}"</p>
    <div class="card-actions justify-between w-full items-end ">
<span class=" bg-gray-200 rounded-full p-2 ">     <i class="fa-solid fa-circle-info"></i></span>
<span class=" bg-gray-200 rounded-full p-2 ">     <i class="fa-solid fa-volume-high"></i></span>

    </div>

</div>
      `;
      lessonCardContainer.appendChild(card);
    });
  }
}

const init = async () => {
  await loadLessonCardTitle();
  await loadLessonCardData();
  createLessonCardTitle();
  createLessonCard(1);
};

init();

lessonCardTitleContainer.addEventListener("click", (event) => {
  let selectedLevel;

  if (event.target.classList.contains("fa-book-open")) {
    selectedLevel = event.target.parentNode.id;
  } else {
    selectedLevel = event.target.id;
  }
  createLessonCard(selectedLevel);
});
