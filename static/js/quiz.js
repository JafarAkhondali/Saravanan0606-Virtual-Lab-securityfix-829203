const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which component is used to compile, debug and execute the java programs?',
    answers: [
      { text: 'JDK', correct: true },
      { text: 'JIT', correct: false },
      { text: 'JVM', correct: false },
      { text: 'JRE', correct: false }
    ]
  },
  {
    question: 'Which of the following is a superclass of every class in Java?',
    answers: [
      { text: 'ArrayList', correct: false},
      { text: ' String', correct: false },
      { text: 'Object class', correct: true },
      { text: 'Abstract class', correct: false }
    ]
  },
  {
    question: ' Which of the below is not a Java Profiler?',
    answers: [
      { text: 'Eclipse Profiler', correct: false },
      { text: ' JVM', correct: true },
      { text: 'JConsole', correct: false },
      { text: ' JProfiler', correct: false }
    ]
  },
  {
    question: 'Which of these keywords are used for the block to be examined for exceptions?',
    answers: [
      { text: 'check', correct: false },
      { text: ' throw', correct: false },
      { text: 'catch', correct: false },
      { text: 'try', correct: true }
    ]
  }
]