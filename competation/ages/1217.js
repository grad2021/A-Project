(function() {
    var questions = [{
      question: "ما هي أعلي هضبة في العالم؟",
      choices: ["هضبة التبت", "هضبة الدكن  ", "هضبة منغوليا"],
      correctAnswer: 0
    }, {
      question: "ما هو حاصل ضرب ١٢*١٢؟ ",
      choices: [145, 144, 184],
      correctAnswer: 1
    }, {
      question: "كم عدد محافظات مصر؟ ",
      choices: [27, 17, 37],
      correctAnswer: 0
    }, {
      question: "من هو أول رئيس جمهوري لمصر؟ ",
      choices: ["جمال عبد الناصر  ", "محمد نجيب ", "محمد أنور السادات"],
      correctAnswer: 1
    }, {
      question: "من قائد الحملة الفرنسية على مصر؟ ",
      choices:  ["كليبر  ", "منيو  ", "نابليون بونابرت "],
      correctAnswer: 2
    }, {
      question: "من هو موحد القطرين؟ ",
      choices: ["مينا  ", "أحمس   ", "بيبرس "],
      correctAnswer: 0
    }, {
      question: "ما هو أطول نهر في العالم؟ ",
      choices: ["نهر النيل ", "نهر الميسيسبي", "نهر الأمازون "],
      correctAnswer: 0
    }, {
      question: "من الذي قاد خطة الخداع لصرف أنظار إسرائيل عن التجهيزات الهجومية؟ ",
      choices: [ "المشير أحمد إسماعيل", "الفريق سعد الدين الشازلي  ", "الفريق أول عبد المنعم رياض "],
      correctAnswer: 0
    }, {
      question: "ما هي أعلي قمة سلسلة جبال في العالم؟ ",
      choices: ["إيفرست ", "الهيمالايا", "الأنديز "],
      correctAnswer: 1
    },
                    {
      question: "من هي الدولة التي سمحت لليهود بدخول فلسطين؟ ",
      choices: ["إيطاليا ", "الولايات المتحدة الأمريكية  ", "بريطانيا"],
      correctAnswer: 2
    }];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('من فضلك أختر إجابة!!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>السؤال ' + (index + 1) + '</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = questions[index].choices[i];
        input += '<input type="radio" name="answer" value=' + i + ' />';
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('لقد أجبت ' + numCorrect + ' أسئلة من ' +
                   questions.length + ' بشكل صحيح');
      return score;
    }
  })();