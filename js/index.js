
//----------------------------------------
//          Variable declarations
//----------------------------------------
const passingScore = 80;
const passingMessage = "Congratulations!<br>You've passed the assessment. Click the Certificate button to view your certificate.";
const failingMessage = "Sorry, you failed.<br>Click the Retake Assessment button to retake the assessment.";
const notStartedIco = "fa-regular fa-circle";                     
const startedIco = "fa-solid fa-circle-half-stroke";
const completedIco = "fa-solid fa-circle";
const incorrectFeedback = "This is not the correct answer. Please try again.";
const incorrectFeedback2 = "This is not the correct answer.";
const continueFeedback = "<br><br>Click the Next Slide button to proceed.";
const continueFeedback2 = "<br><br>Click the Continue button to proceed.";
const alertCorrectClass = "alert-success";
const alertIncorrectClass = "alert-danger";

let scorm;
let isLmsConnected = false;
let debugMode = true;
let username = "";
let autoPlayVideo = false;
let videoPlayer;
let current;
let totalSlides = 0;
let score = 0; 
let finalScore = 0;
let testIndex = 0;
let activeMenuId = 0;
let userProgress;
let menuLocked = false;

//Stores the menu data, including the slide id, title, and media associated with the slide
const menuData = [
    
    //Overview
    {
        id : "OVER",
        title : "Overview",
        type : "",
        data : [
            {
                id : "OVER_000",
                subtitle : "Overview",
                type : "video",
                media : "PHN3guaiLL4"
            },
            {
                id : "OVER_001",
                subtitle: "Self Reflection Questions",
                type : "reflection",
                media : "ref_000"
            }
        ]
    },

    //Lesson 1 
    {     
        id : "L01",
        title : "Lesson 1",
        type : "",
        data : [
            {
                id : "L01_000",
                subtitle: "Exploring the Origins and Influences of Implicit Biases",
                type : "video",
                media : "vGs8t1wQq-E"
            },
            {
                id : "L01_001",
                subtitle: "Self Reflection Questions",
                type : "reflection",
                media : "ref_001"
            },
            {
                id : "L01_002",
                subtitle: "Knowledge Check 1",
                type : "quiz",
                media : "lsn_0_question_0"
            },
            {
                id : "L01_003",
                subtitle: "Knowledge Check 2",
                type : "quiz",
                media : "lsn_0_question_1"
            },
            {
                id : "L01_004",
                subtitle: "Knowledge Check 3",
                type : "quiz",
                media : "lsn_0_question_2"
            },
          
        ]        
    },

    //Lesson 2
    {     
        id : "L02",
        title : "Lesson 2",
        type : "",
        data : [
            {
                id : "L02_000",
                subtitle: "Recongizing Types of Implicit Biases",
                type : "video",
                media : "iedDxBLd8Lw"
            },
            {
                id : "L02_001",
                subtitle: "Self Reflection Questions",
                type : "reflection",
                media : "ref_002"
            },
            {
                id : "L02_002",
                subtitle: "Knowledge Check 1",
                type : "quiz",
                media : "lsn_1_question_0"
            },
            {
                id : "L02_003",
                subtitle: "Knowledge Check 2",
                type : "quiz",
                media : "lsn_1_question_1"
            },
            {
                id : "L02_004",
                subtitle: "Knowledge Check 3",
                type : "quiz",
                media : "lsn_1_question_2"
            },
            {
                id : "L02_005",
                subtitle: "Knowledge Check 4",
                type : "quiz",
                media : "lsn_1_question_3"
            }          
        ]        
    },


    //Lesson 3
    {     
        id : "L03",
        title : "Lesson 3",
        type : "",
        data : [
            {
                id : "L03_000",
                subtitle: "Strategies for Confronting Personal Biases",
                type : "video",
                media : "KNPBO81Nq5c"
            },
            {
                id : "L03_001",
                subtitle: "Self Reflection Questions",
                type : "reflection",
                media : "ref_003"
            },
            {
                id : "L03_002",
                subtitle: "Knowledge Check 1",
                type : "quiz",
                media : "lsn_2_question_0"
            },
            {
                id : "L03_003",
                subtitle: "Knowledge Check 2",
                type : "quiz",
                media : "lsn_2_question_1"
            },
            {
                id : "L03_004",
                subtitle: "Knowledge Check 3",
                type : "quiz",
                media : "lsn_2_question_2"
            } 
        ]        
    },

    //Summary
    {
        id : "SUMM",
        title: "Summary",
        type : "",
        data : [
            {                
                id : "SUMM_000",                
                subtitle: "Summary",
                type : "video",
                media : "jVg0pVU4_ak"
            },
            {
                id : "SUMM_001",                
                subtitle: "Final Assessment",        
                type : "test",
                media : ""
            } 
        ]
    }
];    

//Stores the quiz questions, answers, and feedback text
const quizQuestions = 
[

    //Lesson 1
    {
        id : "lsn_0_question_0",
        question : "What role does the amygdala play in influencing biases?",
        answers : 
        [
            "It helps us consciously categorize threats.",
            "It triggers the \"fight or flight\" response based on past experiences.",
            "It regulates decision-making processes.",
            "It does not influence biases."
        ],
        correctIndex : 1,
        correctFeedback : "The amygdala plays a role in triggering the \"fight or flight\" response based on past experiences. This is a key function of the amygdala in processing emotional responses.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_1",
        question : "How do social and cultural influences contribute to the formation of biases?",
        answers : 
        [
            "They have no impact on biases.",
            "They reinforce stereotypes and norms from an early age.",
            "They solely shape positive biases.",
            "They mainly affect biases in professional settings."
        ],
        correctIndex : 1,
        correctFeedback : "Social and cultural influences contribute to the formation of biases by reinforcing stereotypes and norms from an early age. These influences shape our perceptions and attitudes toward different individuals.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_2",
        question : "What is one way the neocortex helps mitigate biases?",
        answers : 
        [
            "By strengthening biases.",
            "By triggering automatic responses.",
            "By overriding automatic responses with rational thought.",
            "By increasing emotional responses."
        ],
        correctIndex : 2,
        correctFeedback : "One way the neocortex helps mitigate biases is by overriding automatic responses with rational thought. This involves the brain's higher cognitive functions, including critical thinking and logical reasoning.",
        incorrectFeedback : incorrectFeedback
    },

    //Lesson 2
    {
        id : "lsn_1_question_0",
        question : "What type of bias are you demonstrating if you attribute someone's success based on their luck rather than their abilities?",
        answers : 
        [
            "Confirmation bias",
            "Attribution bias",
            "Availability bias",
            "In-group bias"
        ],
        correctIndex : 1,
        correctFeedback : "Attribution bias is demonstrated when attributing someone's success based on luck, rather than their abilities.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_1_question_1",
        question : "What type of bias are you demonstrating when you perceive someone as more competent because they belong to the same social group as you?",
        answers : 
        [
            "Halo effect",
            "Horn effect",
            "Attribution bias",
            "In-group bias"
        ],
        correctIndex : 3,
        correctFeedback : "In-group bias is demonstrated when you perceive someone as more competent because they belong to the same social group.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_1_question_2",
        question : "What type of bias are you exhibiting when you believe that a positive characteristic, such as someone's appearance, implies their overall intelligence and competence?",
        answers : 
        [
            "Confirmation bias",
            "Halo effect",
            "Availability bias",
            "Attribution bias"
        ],
        correctIndex : 1,
        correctFeedback : "The halo effect is demonstrated when you automatically assume that an individual's positive traits influence the overall perception of an individual.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_1_question_3",
        question : "What type of bias are you demonstrating if you often seek information that only confirms your pre-existing beliefs?",
        answers : 
        [
            "Confirmation bias",
            "Halo effect",
            "Availability bias",
            "Attribution bias"
        ],
        correctIndex : 0,
        correctFeedback : " Confirmation bias is demonstrated when seeking information that only confirms pre-existing beliefs while dismissing or ignoring contradictory evidence.",
        incorrectFeedback : incorrectFeedback
    },

    //Lesson 3
    {
        id : "lsn_2_question_0",
        question : "What strategy involves actively challenging stereotypes and replacing biased thoughts with more accurate assessments of individuals?",
        answers : 
        [
            "Perspective-taking",
            "Increasing contact",
            "Stereotype replacement",
            "Ignoring biases"
        ],
        correctIndex : 2,
        correctFeedback : "Stereotype replacement aims to consciously recognize and challenge stereotypes and replace them with more accurate thoughts of individuals.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_2_question_1",
        question : "What strategy involves making a conscious effort to understand situations from someone else's point of view?",
        answers : 
        [
            "Educating and raising awareness",
            "Perspective-taking",
            "Increasing contact",
            "Stereotype replacement"
        ],
        correctIndex : 1,
        correctFeedback : "Perspective-taking involves actively considering and empathizing with the perspectives, feelings, and experiences of others.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_2_question_2",
        question : "What strategy involves engaging in meaningful interactions with diverse individuals to diminish prejudice and increase understanding?",
        answers : 
        [
            "Stereotype replacement",
            "Perspective-taking",
            "Increasing contact",
            "Educating and raising awareness"
        ],
        correctIndex : 2,
        correctFeedback : "Increasing contact with others involves promoting positive and meaningful interactions between individuals from different social groups to reduce stereotypes, prejudice, and discrimination.",
        incorrectFeedback : incorrectFeedback
    },
];

//Stores the test questions, answers, and feedback text
const testQuestions = [
        {
            id : "test_question_0",
            question : "What region of the brain plays a pivotal role in triggering the \"fight or flight\" response based on past experiences?",
            answers : 
            [
                "Neocortex",
                "Cerebellum",
                "Amygdala",
                "Hippocampus"
            ],
            correctIndex : 2,
            correctFeedback : "The amygdala is the region of the brain that plays a pivotal role in triggering the \"fight or flight\" response based on past experiences.",
            incorrectFeedback : incorrectFeedback2
        },    
        
        {
            id : "test_question_1",
            question : "What region of the brain is responsible for rational thought processes and enables us to consciously adapt and unlearn ingrained thought patterns?",
            answers : 
            [
                "Neocortex",
                "Cerebellum",
                "Amygdala",
                "Hippocampus"
            ],
            correctIndex : 0,
            correctFeedback : "The neocortex is the region of the brain responsible for rational thought processes and enabling us to consciously adapt and unlearn ingrained thought patterns.",
            incorrectFeedback : incorrectFeedback2
        },
   
        {
            id : "test_question_2",
            question : "How do social and cultural influences contribute to the formation of biases?",
            answers : 
            [
                "By reinforcing attitudes, norms, and values from an early age.",
                "By stimulating logical thinking processes.",
                "By suppressing emotional responses.",
                "By activating the neocortex."
            ],
            correctIndex : 0,
            correctFeedback : "Social and cultural influences contribute to the formation of biases by reinforcing attitudes, norms, and values from an early age.",
            incorrectFeedback : incorrectFeedback2
        },
     
        {
            id : "test_question_3",
            question : "A person instinctively feels a surge of fear when encountering a spider, even though they have never been harmed by one. What is the underlying cause of this reaction?",
            answers : 
            [
                "Psychological processes",
                "Socialization",
                "Social and cultural influences",
                "Personal experiences"
            ],
            correctIndex : 0,
            correctFeedback : "Psychological processes drive an instinctive fear response. The amygdala helps us quickly react to potential threats, even if those threats have never harmed us personally.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_4",
            question : "What type of bias is demonstrated when an individual avoids eating certain types of food because they had a bad experience with it in the past?",
            answers : 
            [
                "Psychological processes",
                "Socialization",
                "Social and cultural influences",
                "Personal experiences"
            ],
            correctIndex : 3,
            correctFeedback : "Past personal experience is the bias demonstrated in this scenario. The individual's avoidance of certain foods is due to a bad experience that shaped their current behavior and decisions.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_5",
            question : "What type of bias is demonstrated when a person assumes that individuals who speak with an accent are less intelligent, despite having no evidence to support this belief?",
            answers : 
            [
                "Psychological processes",
                "Socialization",
                "Social and cultural influences",
                "Personal experiences"
            ],
            correctIndex : 2,
            correctFeedback : "Social and cultural influences is the bias demonstrated in this scenario. This assumption is influenced by societal norms, stereotypes, and cultural attitudes toward accents and intelligence.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_6",
            question : "What type of bias is demonstrated when a person feels uncomfortable around people with disabilities because they have been taught by their family that they should be treated differently? ",
            answers : 
            [
                "Psychological processes",
                "Socialization",
                "Social and cultural influences",
                "Personal experiences"
            ],
            correctIndex : 1,
            correctFeedback : "Socialization is the bias demonstrated in this scenario. The individual's discomfort around people with disabilities stems from the teachings of their family.",
            incorrectFeedback : incorrectFeedback2
        },
        
        {
            id : "test_question_7",
            question : "What are the key factors contributing to implicit biases?",
            answers : 
            [
                "Psychological processes, cultural norms, and personal experiences",
                "Physical health, environmental factors, and genetic predispositions",
                "Economic status, educational background, and technological advancements",
                "Political affiliations, religious beliefs, and dietary preferences"
            ],
            correctIndex : 0,
            correctFeedback : "The key factors contributing to implicit biases include psychological processes, cultural norms, and personal experiences. These elements play a significant role in shaping individuals' unconscious attitudes, beliefs, and behaviors toward others.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_8",
            question : "What type of bias is demonstrated when a manager consistently praises ideas proposed by a particular team member, attributing them to exceptional creativity and insight, while dismissing similar suggestions from others?",
            answers : 
            [
                "Confirmation bias",
                "Halo effect",
                "Horn effect",
                "In-group bias"
            ],
            correctIndex : 1,
            correctFeedback : "The halo effect is the bias depicted in this scenario. This bias occurs when positive qualities of an individual influence perceptions of their overall character or abilities, leading to an overestimation of capabilities.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_9",
            question : "What type of bias is demonstrated when a marketing team selectively focuses on positive comments from a small group of supporters and disregards negative feedback?",
            answers : 
            [
                "Affinity bias",
                "Confirmation bias",
                "Attribution bias",
                "In-group bias"
            ],
            correctIndex : 1,
            correctFeedback : "Confirmation bias is the bias depicted in this scenario. Confirmation bias occurs when individuals selectively focus on information that confirms their existing beliefs while ignoring contradictory evidence.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_10",
            question : "What type of bias is demonstrated when a manager prefers to promote employees from their own department over equally qualified candidates from other departments?",
            answers : 
            [
                "Affinity bias",
                "Confirmation bias",
                "Attribution bias",
                "In-group bias"
            ],
            correctIndex : 3,
            correctFeedback : "In-group bias is the bias depicted in this scenario. In-group bias occurs when individuals prefer others who are perceived as part of the same group.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_11",
            question : "What type of bias is demonstrated when team members consistently dismiss ideas proposed by a quieter colleague, attributing them to lack of experience, while readily accepting suggestions from more outspoken members?",
            answers : 
            [
                "Affinity bias",
                "Halo effect",
                "Horn effect",
                "In-group bias"
            ],
            correctIndex : 2,
            correctFeedback : "The horn effect is the bias depicted in this scenario. The horn effect occurs when a negative trait or action overshadows all other positive qualities of an individual.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_12",
            question : "What type of bias is demonstrated when a group of friends regularly engages in political discussions on social media, but they only follow accounts and share articles that align with their own beliefs, ignoring content from opposing viewpoints?",
            answers : 
            [
                "Affinity bias",
                "Confirmation bias",
                "Halo effect",
                "In-group bias"
            ],
            correctIndex : 1,
            correctFeedback : "Confirmation bias is the bias depicted in this scenario. Confirmation bias occurs when individuals selectively focus on information that confirms their existing beliefs while ignoring contradictory evidence.",
            incorrectFeedback : incorrectFeedback2
        },
    
    
        {
            id : "test_question_13",
            question : "What type of strategy is demonstrated when you don't automatically associate a certain profession with a particular gender, such as men being engineers?",
            answers : 
            [
                "Stereotype replacement",
                "Perspective-taking",
                "Increasing contact",
                "Raising awareness"
            ],
            correctIndex : 0,
            correctFeedback : "Stereotype replacement is demonstrated in this scenario. Stereotype replacement involves consciously recognizing stereotypes and actively replacing them with more accurate assessments of individuals.",
            incorrectFeedback : incorrectFeedback2
        },
    
        {
            id : "test_question_14",
            question : "What type of strategy is demonstrated when you actively challenge assumptions made about a colleague based on their age? ",
            answers : 
            [
                "Stereotype replacement",
                "Perspective-taking",
                "Increasing contact",
                "Raising awareness"
            ],
            correctIndex : 1,
            correctFeedback : "Perspective-taking is the strategy demonstrated in this scenario. Perspective-taking involves making a conscious effort to understand situations from someone else's point of view, considering their unique perspectives, experiences, and challenges.",
            incorrectFeedback : incorrectFeedback2
        },

        {
            id : "test_question_15",
            question : "What type of strategy is demonstrated when a company encourages employees from diverse backgrounds to collaborate on projects and participate in team-building activities?",
            answers : 
            [
                "Stereotype replacement",
                "Perspective-taking",
                "Increasing contact",
                "Raising awareness"
            ],
            correctIndex : 2,
            correctFeedback : "Increasing contact is the strategy demonstrated in this scenario. By encouraging employees from diverse backgrounds to work together and engage in team-building activities, the company fosters better understanding and reduces biases through meaningful interactions.",
            incorrectFeedback : incorrectFeedback2
        },

        {
            id : "test_question_16",
            question : "What type of strategy is demonstrated when an organization conducts workshops and training sessions to educate employees about unconscious biases and the importance of inclusivity in the workplace?",
            answers : 
            [
                "Stereotype replacement",
                "Perspective-taking",
                "Increasing contact",
                "Raising awareness"
            ],
            correctIndex : 3,
            correctFeedback : "Raising awareness is the strategy demonstrated in this scenario. The organization is proactively educating employees about unconscious biases and the value of inclusivity, helping to create a more informed and equitable workplace.",
            incorrectFeedback : incorrectFeedback2
        },

];

//Stores the resource information
const resourcesData = [
    {
        title : "Course Transcript",
        media : "resources/Implicit_Biases_Awareness_Training_Transcript.pdf"
    },
    {
        title : "Job Aid",
        media : "resources/Recognizing_Implicit_Biases_Job_Aid.pdf"
    },
    {
        title : "Implicit Biases Explained",
        media : "http://perception.org/research/implicit-bias"
    },
    {
        title : "How to Combat Unconscious Bias at Work",
        media : "http://forbes.com/sites/carolinecastrillon/2023/04/02/how-to-combat-unconscious-bias-at-work/"
    },
    {
        title : "Responding to Microaggressions and Unconscious Bias",
        media : "http://nationalequityproject.org/responding-to-microaggressions-and-unconscious-bias?gad_source=1"
    },
    {
        title : "Examples of Implicit Bias at Work",
        media : "http://managebetter.com/blog/examples-of-implicit-bias-at-work"
    }
];

//Stores the glossary information
const glossaryData = [
    {
        term : "Amygdala",
        definition : "A region of the brain involved in processing emotions/assessing threats, and playing a role in the unconscious categorization of stimuli which trigger automatic responses (i.e. \"fight or flight\" response)."
    },
    {
        term : "Confirmation bias",
        definition : "The tendency to seek out or interpret information in a way that confirms one's preexisting beliefs, without considering other viewpoints that may contradict one's thoughts."
    },
    {
        term : "Cultural influences",
        definition : "Cultural influences shape societal norms, attitudes, and values regarding race, ethnicity, gender, sexuality, and religion."
    },
    {
        term : "Implicit biases",
        definition : "Implicit biases are also referred to as unconscious biases. These biases are attitudes or stereotypes that influence our understanding and behaviors without a conscious awareness."
    },
    {
        term : "Increasing contact",
        definition : "The process of engaging in meaningful interactions with those from diverse backgrounds to gain a better understanding of them and their culture."
    },
    {
        term : "Neocortex",
        definition : "The region of the brain that is responsible for rational thought processes and reasoning. This region can help individuals unlearn ingrained thought patterns or implicit biases."
    },
    {
        term : "Perspective-taking",
        definition : "The practice of empathizing with others by considering their viewpoints."
    },
    {
        term : "Socialization",
        definition : "The process in which individuals learn societal norms, values, and behaviors through interactions with family, peers, and media."
    },
    {
        term : "Stereotype",
        definition : "A widely held, oversimplified, and often inaccurate belief about a particular group of people."
    },
    {
        term : "Stereotype replacement",
        definition : "A strategy to actively challenge stereotypes and replace biased thoughts with fair assessments of individuals."
    }
];

//Stores the reflection questions
const reflectionQuestions = [
    {
        id: "ref_000",
        data : 
        [
            "How do you define implicit bias?",
            "What role do you believe implicit biases play in your daily life?",
            "Why do you think is it important for individuals and organizations to address implicit biases?"
        ]
    },

    {
        id: "ref_001",
        data : 
        [
            "Reflect on the concepts discussed in the video. What did you find most interesting or thought-provoking?",
            "Were there any concepts or ideas in the video that you found challenging to grasp or disagree with?",
            "Write down examples of socialization and cultural influences that have shaped your personal biases. How have these factors influenced your perceptions or behaviors?",
            "Think of a situation where you observed or experienced an automatic \"fight-or-flight\" response. What triggered this response, and how did it manifest?"
        ]
    },

    {
        id: "ref_002",
        data : 
        [
            "Reflect on the concepts discussed in the video. What did you find most interesting or thought-provoking?",
            "Were there any concepts or ideas in the video that you found challenging to grasp or disagree with?",
            "Can you think of examples of biases you've witnessed or experienced that weren't explicitly mentioned in the video? How did these biases manifest?",
            "In what ways do you think biases contribute to inequity and discrimination beyond the examples mentioned in the video?"
        ]
    },

    {
        id: "ref_003",
        data : 
        [
            "Reflect on the concepts discussed in the video. What did you find most interesting or thought-provoking?",
            "Were there any concepts or ideas in the video that you found challenging to grasp or disagree with?",
            "How how do you currently address your own biases in everyday situations? Have you ever used any of the strategies mentioned in the video?",
            "Can you think of a recent situation where you successfully challenged a bias or stereotype? What did you learn from that experience?",
            "What obstacles have you face when trying to implement bias mitigation strategies? How do you think you can overcome them?"
        ]
    }
];

//----------------------------------------
//             Document init
//----------------------------------------
//Methods called once the page is loaded
$(document).ready(function () {
    
    $('#sidebarCollapse').on('click', function () {
        
        if(menuLocked){return;}

        $('#sidebarContainer').toggleClass('active');

        if($(window).width() <= 770){
            if($('#sidebarContainer').hasClass("active") == false){
                $(".backdrop").addClass('show');
            }else{
                $(".backdrop").removeClass('show');
            }
        }
    });


    $("#helpModal").on("hidden.bs.modal", function () {
        var video = $("#helpVideo").get(0); 
        if (video) {
          video.pause();
          video.currentTime = 0; 
        }
      });

    
    setTimeout(function(){
        checkScreenWidth();
        getTotalSlides();
        getUserData();
        generateMenu();
        enableCertificateBtn();
        showExitBtn();
        generateGlossary();
        generateResources();
        unloadEventListener();

        $(".courseOverlay").addClass("hidden");
    }, 1000);
});

//Check for screen resize
$(window).resize(function() {
    checkScreenWidth();
});

//Checks the current screen width
function checkScreenWidth() {   
    if ($(window).width() >= 770) {
        $(".backdrop").removeClass("show");
    }else{
        if($('#sidebarContainer').hasClass("active") == false){
            $(".backdrop").addClass("show");
        }
    }
}

//Keyboard shortcut functionality
$(document).keydown(function(e) {
    if (e.ctrlKey && e.altKey) {
        if (e.which === 190) {
            if(!$("#nextSlideBtn").prop("disabled")){
                $("#nextSlideBtn").click();
            }
        }
        else if (e.which === 188) {
            if(!$("#previousSlideBtn").prop("disabled")){
                $("#previousSlideBtn").click();
            }
        }
    }
});

$(".backdrop").on("click", function(){
    $("#sidebarCollapse").click();
});

function getTotalSlides(){
    let ctr = 0;
    menuData.forEach(function(element){
        const data = element.data;
        for(var j = 0; j < data.length; j++){
            ctr++;
        }        
    });

    totalSlides = ctr;
}

//Dynamically generate the sidebar menu
function generateMenu(){

    let str = "";
    let i=0;
    let ctr=0;

    $("#menuButtons").empty();

    menuData.forEach(function(element){

        const title = element.title;
        const subtitle = element.subtitle;
        const type = element.type;
        const data = element.data;
        
        let listItem, spanProgress, spanTxt, divMenuBtn, link;
        let progressIcon = "";  
        let subProgressIcon = "";

        //Lesson Titles        
        if(!element.hasOwnProperty("data")){

            listItem = $("<li>");

            divMenuBtn = $("<div>", {
                class : "menuBtn",
                id : "slide_" + ctr
            });

            divMenuBtn.attr("ref-id", element.id);
            ctr++;

            spanTxt = $("<span>", {
                class : "menuBtnTxt",
                html : "<a href='#' class='singleItem'>" + subtitle + "</a>",
                title : subtitle            
            });

            spanProgress = $("<span>", {
                class : "menuBtnProgress"
             }).append($('<i>', {
                class: progressIcon
            }));           

            listItem.append(divMenuBtn);
            divMenuBtn.append(spanProgress, spanTxt);
              
        }else{

            listItem = $("<li>");

            link = $("<a>", {
                class : "dropdown-toggle",
                text : title,
                href : "#quizItem_" + i,
            });

            link.attr("data-bs-toggle", "collapse");
            link.attr("aria-expanded", "true");

            var ul = $("<ul>", {
                class : "list-unstyled show collapse",
                id : "quizItem_" + i
            });

            var localList =  $("<li>");
            listItem.append(link, ul);
            ul.append(localList);

            for(var j = 0; j < data.length; j++){

                const subtitle2 = data[j].subtitle;
                const progress = userProgress[ctr];

                if(progress === 0){
                    progressIcon = notStartedIco;
                }else if(progress === 1){
                    progressIcon = startedIco;
                }else if(progress === 2){
                    progressIcon = completedIco;
                }

                divMenuBtn = $("<div>", {
                    class : "menuBtn",
                    id : "slide_" + ctr
                });
                divMenuBtn.attr("ref-id", data[j].id);

                ctr++;

                spanTxt = $("<span>", {
                    class : "menuBtnTxt",
                    html : "<a href='#'>" + subtitle2 + "</a>",
                    title : subtitle2            
                });

                spanProgress = $("<span>", {
                    class : "menuBtnProgress"
                 }).append($('<i>', {
                    class: progressIcon
                }));

                localList.append(divMenuBtn);
                divMenuBtn.append(spanProgress, spanTxt);
            }
        }

        
        $("#menuButtons").append(listItem);
        current = $(".menuBtn").first();
        checkDisableBtns();
        i++;
    });
        
    setTimeout(function(){
        $("#slide_0").click();
    },50);
}

function enableCertificateBtn(){
    if(finalScore >= passingScore){
        $(".viewCertificate").removeClass("disabled");
    }
}

function showExitBtn(){
    if(isLmsConnected){
        $(".exitCourse").removeClass("hidden");
    }
}

//Update the css styling of the links upon click
$("body").on("click", "#sidebar ul li a", function(event) {
    event.preventDefault();

    const parentLink = $(this).closest("ul").prev("a");
    $('#sidebar ul li a').removeClass('active');

    if (parentLink.length) {
        parentLink.addClass("active");
        $(this).addClass("active");
    } else{
        $(this).addClass("active");
    }   
});


$("#nextSlideBtn").on("click", function(){
    let next = current.next(".menuBtn");
    $(this).blur();

    if (next.length === 0) {
        let nextList = current.closest("ul").parent().next("li").find(".menuBtn").first();
        updateCurrent(nextList);
    } else {
        updateCurrent(next);
    }
});

$("#previousSlideBtn").on("click", function(){
    let prev = current.prev(".menuBtn");
    $(this).blur();

    if (prev.length === 0) {
        let prevList = current.closest("ul").parent().prev("li").find(".menuBtn").last();
        updateCurrent(prevList);
    } else {
        updateCurrent(prev);
    }
});

// Pause the YouTube video when any modal is shown
$(".modal").on("shown.bs.modal", function () {
    if (videoPlayer && videoPlayer.pauseVideo) {
        videoPlayer.pauseVideo();
    }
});

//Toggle sidebar
$("#toggleSidebar").click(function(){
    $("#sidebar").toggleClass("active");
    $("#content").toggleClass("active");
});

//Hide the remediation upon clicking a new input field
$(document).on("change" , ".form-check-input", function(){
    hideRemediation();
});

//Handles the submit button for a quiz item
$(document).on("click" , "#startAssessment", function(){

    score = 0;
    testIndex = 0;

    disableNavbarTopBtns();
    hideMediaDivs();
    lockMenuNavigation();
    disableNavBtns();
    generateQuestion(`test_question_${testIndex}`);    
    $("#quizQuestions").removeClass("hidden");
});

$(document).on("click" , ".quizSubmitBtn", function(){

    const menuObj = getMenuData();
    const media = menuObj.media;
    const obj = getQuestion(media, false);
    const selectedOption =  $(".form-check-input:checked");
    const isCorrectAnswer = (Number(selectedOption.attr("correct")) === 1);
    const correctFeedback = obj.correctFeedback;
    const incorrectFeedback = obj.incorrectFeedback;

    if (selectedOption.length === 0) {
        showRemediation("error", "You must make a selection.");
    }else{
        if(isCorrectAnswer){
            showRemediation("correct", correctFeedback + continueFeedback);
            setSlideComplete();
            $(this).prop("disabled", true);
        }else{
            showRemediation("error", incorrectFeedback);
        }
    }
});

//Handles the submit button for the test
$(document).on("click" , ".testSubmitBtn", function(){

    const obj = getQuestion(`test_question_${testIndex}`, true);
    const selectedOption =  $(".form-check-input:checked");
    const isCorrectAnswer = (Number(selectedOption.attr("correct")) === 1);
    const correctFeedback = obj.correctFeedback;
    const incorrectFeedback = obj.correctFeedback;

    if (selectedOption.length === 0) {
        showRemediation("error", "You must make a selection.");
    }else{
        
        if(isCorrectAnswer){        
            score++;
            showRemediation("correct", correctFeedback + continueFeedback2);                 
        }else{
            showRemediation("error", incorrectFeedback + continueFeedback2);
        }

        $(".continueBtn").prop("disabled", false);
        $(this).prop("disabled", true);        
    }
});

//Handles the continue button for the test
$(document).on("click", ".continueBtn", function(){    

    hideMediaDivs();

    if(testIndex < testQuestions.length-1){
        testIndex++;
        generateQuestion(`test_question_${testIndex}`);
        $("#quizQuestions").removeClass("hidden");
    }
    else{                
        showSummary();
    }
});

//Handles showing the certificate upon passing
$(".viewCertificate").click(function(){
    window.open(`certificate.html?username=${username};`, "Certificate of Completion", "width=500,height=500");
});

$(document).on("click" , ".retakeAssessment", function(){
    const last = $(".menuBtn").last().attr("id");
    $(`#${last}`).click();
});

$(document).on("click" , "#exitAssessment", function(){
    $('#exitAssessmentModal').modal("show");
});

$(document).on("click" , "#exitTestYes", function(){
    $('#exitAssessmentModal').modal("hide");
    $("#previousSlideBtn").prop("disabled", false);
    unlockMenuNavigation();    
    enableNavbarTopBtns();

    const last = $(".menuBtn").last().attr("id");
    $(`#${last}`).click();
});

$(document).on("click" , "#exitTestNo", function(){
    $('#exitAssessmentModal').modal("hide");
});

$(document).on("click" , "#exitCourseYes", function(){
    parent.window.close();    
});

$(document).on("click" , "#exitCourseNo", function(){
    $('#exitModal').modal("hide");
});

//Handles the logic for what content to display upon clicking a menu item
$(document).on("click" , ".menuBtn", function(){

    activeMenuId = Number($(this).attr("id").split("_")[1]);
    const icon = $(this).find(".menuBtnProgress > i");
    const menuObj = getMenuData();
    const type = menuObj.type;
    const media = menuObj.media;

    //Specify the button is active
    $(".menuBtn").removeClass("active");
    $(this).addClass("active");
    current = $(this);

    //Additional helper functions
    checkDisableBtns();
    updateSlideIndicator();
    updateSlideTitle();
    hideMediaDivs();
    clearVideoPlayer();
    setSlideInProgress();

    switch(type){
        case "video":
            $("#videosContainer").removeClass("hidden");
            loadVideo(media);
        break;
        case "reflection":
            $("#reflectionQuestions").removeClass("hidden");
            generateReflectionQuestions();
            setSlideComplete();
        break;
        case "quiz":
            $("#quizQuestions").removeClass("hidden"); 
            generateQuestion(media);
        break;   
        case "test":
            $("#testOverview").removeClass("hidden"); 
            generateTestOverview();
        break;
        default:
            throw Error("Cannot determine the media type.");
    }
});

//----------------------------------------
//          Function Handlers
//----------------------------------------
function hideRemediation(){
    const feedback = $("div .alert");
    feedback.addClass("hidden");
    feedback.removeClass(alertIncorrectClass);
    feedback.removeClass(alertCorrectClass);
    feedback.html("");
}

function showRemediation(type, str){

    const feedback = $("div .alert");

    feedback.removeClass("hidden");
    feedback.removeClass(alertIncorrectClass);
    feedback.removeClass(alertCorrectClass);

    if(type === "error"){
        feedback.addClass(alertIncorrectClass);
        str = "<b>Incorrect</b><br>" + str;
    }else if(type ===  "correct"){
        feedback.addClass(alertCorrectClass);
        str = "<b>Correct</b><br>" + str;
    }else{
        throw Error("The remediation type is undefined");
    }

    feedback.html(str);
}

function generateTestOverview(){
    
    $("#testOverview").empty();

    const completedInstructions = `Congratulations! You've passed the assessment.`;
    const assessment = "Start Assessment";
    const instructions = `Click the ${assessment} button to begin. You can retake the test as many times as as needed. Only your highest score will be recorded.<br><br>Once you start, course navigation <span>will be disabled</span> until the assessment is complete or if you click the Exit Assessment button, which becomes available after starting the assessment.`;

    let p = $("<p>", {
        html : instructions
    });
    
    let scores = $("<span>", {
        text : `Highest Score: ${finalScore}%`
    });

    let startAssessment = $("<button>", {
        class : "btn btn-secondary submitBtn",
        text : assessment,
        id: "startAssessment"
    });
 
    $("#testOverview").append(p, "<hr>", scores, startAssessment);

    if(finalScore >= passingScore){
        $("#printCertificate").prop("disabled", false);
    }else{
        $("#printCertificate").prop("disabled", true);
    }    
}

//Used to update the slide indicator number
function updateSlideIndicator(){

    let index = Number($(current).attr("id").split("_")[1]) + 1;
    let str = "Slide " + index + " of " + totalSlides; 
    $("#slideIndicator").html(str);
}

//Used to update the slide's title
function updateSlideTitle(){

    const parent = $(`#slide_${activeMenuId}`).closest("ul").siblings("a.dropdown-toggle");
    const menuObj = getMenuData();

    $("#slideTitle").html(parent.text());
    $("#slideSubtitle").html(menuObj.subtitle);
}

//Used to dynamically generate the glossary
function generateGlossary(){    
    let table = $("<table>", {
        class : "table table-bordered"
    });

    let tHead =  $("<thead>");
    let tr =  $("<tr>");
    let th1 = $("<th>", {
        text : "Term"
    });
    let th2 = $("<th>", {
        text : "Definition"
    });

    th1.attr("scope", "col");
    th2.attr("scope", "col");

    table.append(tHead);
    tHead.append(tr);
    tr.append(th1, th2);

    let tbody = $("<tbody>");
    glossaryData.forEach(function(element){
        const term = element.term;
        const definition = element.definition;

        let tr = $("<tr>");
        let td = $("<td>", {
            text : term
        });
        let td2 = $("<td>", {
            text : definition
        });

        tr.append(td, td2);
        tbody.append(tr);
    });

    table.append(tbody);

    $("#glossaryContent").append(table);
}

//Used to dynamically generate the resources
function generateResources(){

    let internalResources = $("<div>");
    let externalResources = $("<div>");

    let p1 = $("<p>", {
        html : "<h6>Local Resources</h6>"
    });

    let hr = $("<hr>");

    let p2 = $("<p>", {
        html : "<h6>External Resources</h6>"
    });

    resourcesData.forEach(function(element){

        const title = element.title;
        const media = element.media;

        let pdfIco = $("<i>", {class: "fa-solid fa-file-pdf"});
        let linkIco = $("<i>", {class: "fa-solid fa-link"});
        let ul =  $("<ul>");
        let li =  $("<li>");
        let link =  $("<a>", {
            text : title + " ",
            title : title,
            target : "_blank",
            class : "link",
            href : media
        });

        ul.append(li);
        li.append(link);

        if(getExtension(media) === "pdf"){
            link.append(" (", pdfIco, ")");
            internalResources.append(ul)
        }else{
            link.append(" (", linkIco, ")" );
            externalResources.append(ul);
        }
    });

    $("#resourcesContent").append(p1, internalResources, hr, p2, externalResources);
}

//Used to get an extension of a media file to determine what type of media to display
function getExtension(str){
    if (str.lastIndexOf(".") !== -1) {
        return str.substring(str.lastIndexOf(".") + 1);
    } else {
        return "";
    }
}

//Used to dynamically generate the reflection questions based on the active slide
function generateReflectionQuestions(){
    $("#reflectionQuestions").empty();

    const menuObj = getMenuData();
    const reflectionQuestions =  getReflectionQuestion(menuObj.media);

    let p = $("<p>",{
        html : `Take a moment to answer these self reflection questions.
                These questions are not graded and are meant for your personal growth and understanding. 
                When you're done, click the Next Slide button to proceed.<hr>`
    });    

    let ol = $("<ol>");

    reflectionQuestions.data.forEach(function(element){
        let li = $("<li>", {
            text : element,
            class : "reflection-li"
        });

        ol.append(li);
    });

    $("#reflectionQuestions").append(p, ol);
}

//Helper function that returns the reflection question object
function getReflectionQuestion(id){

    let obj = {};

    reflectionQuestions.forEach(function(element){
        const currentId = element.id;
        if(currentId === id){
            obj =  element;
        }
    });

    return obj;
}

//Used to generate a single quiz or test question based on the specified slide ID
//The last slide in the course is treated as the final assessment
function generateQuestion(id){

    $("#quizQuestions").empty();

    const isFinalAssessment = (id.indexOf("test")>=0);
    const obj = getQuestion(id, isFinalAssessment);
    const randomizedQuestions = shuffleAnswers(obj);
    const correctIndex = randomizedQuestions.correctIndex;
    
    let span;
    let testDiv;
    let continueBtn; 
    let i = 0;
    let quizQuestionDiv = $("<div>", {
        class : "quizQuestion active",
        id : id
    });

    let introP = $("<span>", {
        text : "Select the correct answer and then click the Submit button."
    });

    let p = $("<p>", {
        text : obj.question
    });
    
    if(isFinalAssessment){
        span = $("<span>",{
            text : `Question ${getTestIdIndex(id)} of ${testQuestions.length}`
        }).css("float", "right");        
    }

    quizQuestionDiv.append(introP,span, $("<hr>"),p);

    randomizedQuestions.answers.forEach(function(element){

        let formDiv = $("<div>",{
            class : "form-check"
        });

        let input = $("<input>", {
            class : "form-check-input",
            type : "radio",
            name : "question",
            id : "question_" + i,
            value : "option_" + i
        });

        if(i === correctIndex){
            input.attr("correct", 1);
        }else{
            input.attr("correct", 0);
        }

        let label = $("<label>", {
            class : "form-check-label",
            type : "radio",
            for : "question_" + i,
            text : element
        });

        formDiv.append(input,label);
        quizQuestionDiv.append(formDiv);
        i++;
    });

    let alert = $("<div>", {
        class : "alert hidden"
    });

    alert.attr("role", "alert");

    let submitBtn = $("<button>",{
        class : `btn btn-secondary ${isFinalAssessment ? "testSubmitBtn" : "quizSubmitBtn"}`,
        type : "button",
        text : "Submit"
    });

    testDiv = $("<div>", {
        class : "assessmentBtnContainer"
    });

    let quitBtn =  $("<button>",{
        class : `btn btn-secondary`,
        id : "exitAssessment",
        type : "button",
        text : "Exit Assessment"
    });    

    if(isFinalAssessment){
        continueBtn = $("<button>", {
            class : "btn btn-secondary continueBtn",
            text: "Continue"
        }).css("margin-right", "5px").prop("disabled", true);

        testDiv.append(continueBtn, submitBtn, quitBtn);
    }else{
        testDiv.append(submitBtn);
    }

    $("#quizQuestions").append(quizQuestionDiv, $("<br>"), testDiv, $("<br>"), alert );
}

//Get the index of the current test ID
function getTestIdIndex(id){
    let index = 0;
    let i = 0;

    testQuestions.forEach(function(element){
        if(element.id === id){
           index = i; 
        }
        i++;
    });

    return index + 1;
}

function getUserData(){

    try{
        scorm = pipwerks.SCORM;
    }catch(e){
        scorm = null;
    }

    //Running inside a LMS
    if(scorm.init()){

        const lmsUserProgress = scorm.get("cmi.suspend_data");        
        const completionStatus = scorm.get("cmi.completion_status");
        let lmsSessionScore = scorm.get("cmi.score.raw");
        
        if(completionStatus === "incomplete" && lmsSessionScore === ""){
            lmsSessionScore = 0;
            scorm.set("cmi.score.raw", 0);
            console.log('reset sessions score to 0');
        }

        username = scorm.get("cmi.learner_name");        
        isLmsConnected = true;                

        //Get course progress
        if (lmsUserProgress !== null && lmsUserProgress !== undefined) {
            if(lmsUserProgress.length <= 5){
                userProgress = new Array(totalSlides).fill(0);
            }else{
                let lmsTmpUserProgress = lmsUserProgress.split(",");
                userProgress = lmsTmpUserProgress.map(function(str) {
                    let num = Number(str);
                    return isNaN(num) ? 0 : num; 
                });
            }
        }else{
            userProgress = new Array(totalSlides).fill(0);
        }

        //console.log(userProgress)

        //Get test score
        if (lmsSessionScore !== null && lmsSessionScore !== undefined) {
            finalScore = isNaN(lmsSessionScore) ? 0 : lmsSessionScore;
        }else{
            finalScore = 0;
        }
    
        //To ensure that the course remains completed
        if(finalScore >= passingScore){
            scorm.set("cmi.success_status", "passed");
            scorm.set("cmi.completion_status", "completed");
        }

        scorm.save();
    }

    //Running outside a LMS
    else{
        const sessionProgress = sessionStorage.getItem("progress");
        const sessionScore = sessionStorage.getItem("score");
        
        //Get progress
        if (sessionProgress !== null && sessionProgress !== undefined) {
            let tmpUserProgress = sessionProgress.split(",");
            userProgress = tmpUserProgress.map(function(str) {
                let num = Number(str);
                return isNaN(num) ? 0 : num; 
              });
        }else{
            userProgress = new Array(totalSlides).fill(0);
        }
        
        //Get test score
        if (sessionScore !== null && sessionScore !== undefined) {
            finalScore = isNaN(sessionScore) ? 0 : sessionScore;
        }else{
            finalScore = 0;
            
         
        }
    }
}

//Handles saving progress data
function saveProgressData(value){

    userProgress[activeMenuId] = value;

    if(isLmsConnected){
        scorm.set("cmi.suspend_data", userProgress);
        scorm.save();
    }else{
        sessionStorage.setItem("progress", userProgress);
    }
}

//Handles saving score data
function saveScoreData(){    

    if(isLmsConnected){
        scorm.set("cmi.score.raw", finalScore);
        if(finalScore >= passingScore){
            scorm.set("cmi.success_status", "passed");
            scorm.set("cmi.completion_status", "completed");
        }
        scorm.save();
    }else{
        sessionStorage.setItem("score", finalScore);
    }
}

function getMenuData(){

    const activeSlide = $(`#slide_${activeMenuId}`);
    const referenceId = activeSlide.attr("ref-id");

    let obj = {};

    menuData.forEach(function(element){
        const currentId = element.id;

        if(element.hasOwnProperty("data")){
            element.data.forEach(function(element2){
                const currentId2 = element2.id;
                if(currentId2 === referenceId){
                    obj =  element2;
                }
            });
        }
        else{
            if(currentId === referenceId){
                obj =  element;
            }
        }
    });

    return obj;
}

//Handles loading a specified Youtube video based on a specified video ID
function loadVideo(videoId){

    clearVideoPlayer();

    $(".loading-icon").show();
    videoPlayer = new YT.Player("videos", {
            height : "360",
            width : "640",
            videoId : videoId,
            playerVars: {
                "showinfo" : 0,
                "rel" : 0,
                "modestbranding" : 1,
                "disablekb" : 1 
            },
            events : {
                "onReady" : onPlayerReady,
                "onStateChange" : onPlayerStateChange
            }
   });
}

//Helper function that clears the video player div
function clearVideoPlayer(){
    if (videoPlayer) {
      videoPlayer.destroy();
      videoPlayer = null;
    }
      $('#videos').empty();
  }


function getQuestion(id, isFinalAssessment){
    let obj = {};

    if(isFinalAssessment){
        testQuestions.forEach(function(element){
            const currentId = element.id;
            if(currentId === id){
                obj = element;
            }
        });
    }
    else{
        quizQuestions.forEach(function(element){
            const currentId = element.id;
            if(currentId === id){
                obj = element;
            }
        });
    }

    return obj;
}

function shuffleAnswers(question) {

    let indexes = question.answers.map((_, index) => index);

    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    
    const shuffledAnswers = indexes.map(index => question.answers[index]);
    const newCorrectIndex = indexes.indexOf(question.correctIndex);
    
    return {
        answers: shuffledAnswers,
        correctIndex: newCorrectIndex
    };
}

function onPlayerReady(event) {
    
    if(autoPlayVideo){
        setTimeout(() => {
              event.target.playVideo();
        }, 500); 
    }
    $(".loading-icon").hide();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      setSlideComplete();
    }
}

//Hides the video, quiz, and test divs
function hideMediaDivs(){
  $("#videosContainer").addClass("hidden");
  $("#reflectionQuestions").addClass("hidden");
  $("#testOverview").addClass("hidden");
  $("#quizQuestions").addClass("hidden");
  $("#summary").addClass("hidden");
}

//Method that handles slide in progress
function setSlideInProgress(){

    const slide = $(`#slide_${activeMenuId}`);
    const icon = slide.find("span > i");

    if(icon.hasClass(notStartedIco)){
        icon.removeClass();
        icon.addClass(startedIco);
        saveProgressData(1);
    }
}

//Method handles slide completion
function setSlideComplete(){

    const slide = $(`#slide_${activeMenuId}`);
    const icon = slide.find("span > i");

    if(icon.hasClass(startedIco)){
        icon.removeClass();
        icon.addClass(completedIco);
        saveProgressData(2);
    }
}

//Locks the sidebar menu
function lockMenuNavigation(){

    if(!$("#sidebarContainer").hasClass("active")){
        $("#sidebarCollapse").click();
    }
    $("#sidebarCollapse").addClass("menuDisabled");
    menuLocked = true;
}

//Unlocks the sidebar menu
function unlockMenuNavigation(){

    $("#sidebarCollapse").removeClass("menuDisabled");
    menuLocked = false;

    if($("#sidebarContainer").hasClass("active")){
        $("#sidebarCollapse").click();
    }       
}


//Shows the summary for the test
function showSummary(){

    hideMediaDivs();
    $("#summary").empty();
    $("#summary").removeClass("hidden");
    unlockMenuNavigation();
    $("#previousSlideBtn").prop("disabled", false);
    enableNavbarTopBtns();

    const currentScore = Math.round((score / testQuestions.length) * 100);
    let str = "";
    let tryAgain;
    let scores = $("<span>", {
        text : `Previous Score: ${finalScore}% | Current Score: ${currentScore}% | Passing Score: ${passingScore}%`
    });
    
    if(currentScore >= passingScore){
        str = passingMessage;
        $(".viewCertificate").removeClass("disabled");
        setSlideComplete();
    }else{
        $(".viewCertificate").addClass("disabled");
        str = failingMessage;
        tryAgain = $("<button>", {
            text: "Retake Assessment",
            class : "submitBtn retakeAssessment btn btn-secondary"
        });
    }

    if(finalScore >= passingScore){
        $(".viewCertificate").removeClass("disabled");
    }

    let div = $("<div>", {
        html: str
    });
    
    if(currentScore > finalScore){
        finalScore = currentScore;
    }

    saveScoreData();

    $("#summary").append(div, $("<hr>"),scores, tryAgain);
}

//Helper that updates the currently clicked button
function updateCurrent(newCurrent) {
    if (newCurrent.length) {
        current = newCurrent;
        $(current).click();
    }
}

//Used to check if buttons are disabled or enabled
function checkDisableBtns(){

    const first = $(".menuBtn").first().attr("id");
    const last = $(".menuBtn").last().attr("id");
    const current1 = current.attr("id");

    if(current1 === first){
        $("#previousSlideBtn").prop("disabled", true);
    }else if(current1 === last){
        $("#nextSlideBtn").prop("disabled", true);
        
    }else{
        $("#previousSlideBtn").prop("disabled", false);
        $("#nextSlideBtn").prop("disabled", false);
    }
}

//Disables the navigaiton butons
function disableNavBtns(){
    $("#previousSlideBtn").prop("disabled", true);
    $("#nextSlideBtn").prop("disabled", true);
}

//Disables the top bar butons
function disableNavbarTopBtns(){
    $(".navbarBtn").addClass("disabled");
}

//Enables the navbar buttons
function enableNavbarTopBtns(){
    $(".navbarBtn").removeClass("disabled");

    if(finalScore >= passingScore){
        $(".viewCertificate").removeClass("disabled");
    }else{
        $(".viewCertificate").addClass("disabled");
    }
}

//For debugging purposes
function trace(msg){
    if(debugMode){
        console.log(msg);
    }
}

//Unload SCORM if applicable
function unloadEventListener(){
    if(isLmsConnected){
        window.addEventListener("unload", function() {
            exitCourseHandler();
        });
    }
}

function exitCourseHandler(){
    scorm.set("cmi.suspend_data", userProgress);
    scorm.set("cmi.score.raw", finalScore);
    scorm.save();

    console.log('saving data to lms!'); //TODO::            

    //scorm.quit();
}

function clearStorageData(){
    sessionStorage.clear();
}