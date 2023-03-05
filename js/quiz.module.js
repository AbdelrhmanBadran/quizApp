/// <reference types="../@types/jquery" />

export class Quiz{
  constructor(res){

    //*=========Global Properties===========

    this.currentQuestion = 0;
    this.score = 0;
    this.res = res
    this.correctAnswer;
    console.log(this.res);
    $('#to').text(`${this.res.length}`)
    this.displayQuestion()

    //!=========Events===========

    document.getElementById('nextQuestion').addEventListener('click' , ()=>{
      this.nextQuestion()
    })
    document.getElementById('end').addEventListener('click' ,()=>{
      location.href = './index.html'
    })
  }

  //?=======functions===============

  displayQuestion(){
    //*==== Box of number of Question =========

    $('#from').text(`${this.currentQuestion + 1}`)
    $('#questionTitle').text(`${this.res[this.currentQuestion].question}`)

    /* 
    console.log(this.res[this.currentQuestion].question , ': question');
    
    */
    console.log(this.res[this.currentQuestion].correct_answer , ': correct');
    const Answers = [...this.res[this.currentQuestion].incorrect_answers] //*==deepCopy===
    this.correctAnswer = this.res[this.currentQuestion].correct_answer
    let randomIndex = Math.ceil(Math.random() * Answers.length ) 

    Answers.splice(randomIndex , 0 ,this.correctAnswer)

    // console.log(randomIndex);
    
    //?===========Show Answers=============
    let cartoona = ''

    Answers.forEach(Answer => {
      
        cartoona +=
        `
      <li class="my-3 animate__animated animate__backInLeft animate__delay-1.5s">
          <div class="pretty p-default p-round p-smooth p-plain">
            <input type="radio" name="answer" value="${Answer}" />
            <div class="state p-success-o">
                <label> ${Answer} </label>
            </div>
          </div>
      </li>
      `
    });
    $('#questionContent').html(cartoona)
  }


  nextQuestion(){
    const cuurentAnswer = document.querySelector("[name='answer']:checked")
    
    if (this.currentQuestion < this.res.length - 1 ) {

      if (cuurentAnswer != null) {
        $('#alertCheck').slideUp(200)
        console.log(this.correctAnswer);

        this.checkAnswer(cuurentAnswer)

        this.currentQuestion++;
        this.displayQuestion()
      }else{
        $('#alertCheck').slideDown(200)
      }

    }else{
      this.checkAnswer(cuurentAnswer)
      this.finalScore(this.score)
      $('#quiz').removeClass('show')         //! ===Hide Quiz Section===
      $('#finsish').addClass('show')        //* ===Show Finsish Section===
      $('#score').text(`${this.score}`)
    }
    
  }

  checkAnswer(answer){
    if (answer.value == this.correctAnswer) {
      this.score++
      console.log(this.score);
      $('#correct').fadeIn(1000).fadeOut(1000)
    }else{
      $('#inCorrect').fadeIn(1000).fadeOut(1000)
    }
  }

  finalScore(score){
    if(score > this.res.length / 2 ){
      $('.confetti').removeClass('d-none')
      $('#aud')[0].play()
    }else{
      $('#loser')[0].play()
    }
  }



}

