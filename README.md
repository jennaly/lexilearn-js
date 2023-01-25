# Lexi Learn Dictionary
**Deployed Link:** http://lexilearn.vercel.app/

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> About The Project</a></li>
     - <a href="#customized-study-resource"> Customized Study Resource</a><br />
     - <a href="#teaching-tool-in-language-arts">Teaching Tool in Language Arts</a><br />
     - <a href="#organized-submissions"> Organized Submissions</a>
    <li><a href="#how-its-made"> How It's Made</a></li>
    <li><a href="#lessons-learned"> Lessons Learned</a></li>
    - <a href="#customized-study-resource"> Links to early version of Lexi Learn</a>
  </ol>
</details>


## About the Project
A fun, interactive dictionary designed for young learners in elementary and intermediate schools. It accepts a user’s word search and returns the definition(s), as well as additional information such as pictures, example sentences, and emojis (when available). The application features an expressive typeface, colorful scheme, and animated elements to enhance student engagement. 
Additionally, the application serves as a tool for educators in a language arts classroom setting with the option to generate reports on students’ reading level, which can be used to gauge their progress.

### Customized study resource
With Lexi Learn, students can personalize their learning experience by saving words to their study set. These saved words are easily accessible and can be reviewed at the bottom of the application. Furthermore, students can download the contents of their study set as a .csv file, enabling them to create personalized study decks that can be imported into other learning tools such as Quizlet and Anki, or submit them to teachers for an assignment grade. The .csv file includes words saved to the study set and their corresponding definitions.

Students have the option of creating a Lexi Learn account, which allows them to access their study set from any device on log in. Alternatively, the study set can be saved and accessed locally without the need to sign up for an account.

### Teaching tool in Language Arts
Lexi Learn also provides educators with the ability to generate reports on their students' reading level. These reports can be used to gauge the level at which their students are reading and serve as a resource for lesson planning. The report can be downloaded as a .csv file and submitted on learning platforms. The file includes the words that the student has saved to their study set and the corresponding difficulty level. The criteria used to determine word difficulty can be found on the Twinword API documentation [here](https://www.twinword.com/blog/how-to-check-english-word-difficulty/).

### Organized submissions
The file names for study sets and teacher's reports will be automatically generated. The study set files will be named in the format of "YYYY-MM-DD-StudySet-StudentName" and the teacher's report files will be named in the format of "YYYY-MM-DD-Report-StudentName". This makes it easy for both students and educators to easily locate and identify their files and eliminates the need for manual naming and organization.

## How It’s Made

- Uses JSON Web Token (JWT) for user authentication and request authorization
- Utilizes React and Tailwind for the front-end
- Handles data storage with MongoDB and localStorage
- Builds the server with Node and Express in MVC pattern
-	Integrates [Owlbot API](https://owlbot.info/) for dictionary content and [Twinword Language Scoring API](https://www.twinword.com/api/language-scoring.php) for word difficulty analysis

## Lessons Learned
This is an updated version of a previous project that I built in the earlier stage of my learning. In this version, I implemented the following technologies:

-	React.JS to replace direct manipulation of the DOM for optimized rendering and better scalability through reusable components.
-	An Express server that not only serves as a proxy API, but also connects to MongoDB and utilizes JWT to support user-specific applications such as account registration, login, and in this case – saving vocabulary words to a study set that can be accessed and reviewed from anywhere. 
-	TailwindCSS to replace custom CSS for more consistent and responsive design.

The first version of Lexi Learn was built with HTML, CSS, and vanilla JavaScript. LocalStorage was used to save past word searches locally, and Owlbot was the only API integrated. The server was created primarily to proxy requests to the Owlbot API as they did not have CORS support at the time as well as to securely store the access token.


### Relevant links to the old version of Lexi Learn can be found below:

**Website:** https://lexilearn.netlify.app/

**Front-end code:**  https://github.com/jennaly/lexilearn-dictionary

**Server/Proxy API:** https://github.com/jennaly/lexilearn-proxy-api

