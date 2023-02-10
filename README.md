# Lexi Learn Dictionary

Welcome to version 2.0 of Lexi Learn! With this update, I've focused on providing a better personal learning experience for students and a promising teaching aid for educators. To see how Lexi Learn has grown and the new features that have been added, checkout the [Project Evolution](#project-evolution) section in this README!

**Deployed Link:** http://lexilearn.vercel.app/

**Demo account:** 

email: nghily@lexilearn.com

password: abcABC123!

<img width="1440" alt="Screen Shot 2023-01-29 at 3 45 53 PM" src="https://user-images.githubusercontent.com/106183040/215362853-66b96271-2a44-445c-9531-db8767c93c07.png">

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#optimizations"> Optimizations</a></li>
    <li><a href="#project-evolution">Project Evolution</a></li>
    - <a href="#customized-study-resource"> Links to early version of Lexi Learn</a>
    <li><a href="#using-lexi-learn">Using Lexi Learn</a></li>
  </ol>
</details>


## About the Project
Lexi Learn is a fun, interactive dictionary designed for young learners in elementary and intermediate schools. With its user-friendly interface, students can easily search for words and get access to definitions, pictures, example sentences, and emojis. The application is designed with an expressive typeface, colorful scheme, and animated elements to engage students and make the learning experience more interactive. It also allows students to personalize their learning by saving words to a study set, which can be accessed within the app, downloaded as a .csv file, and used in other learning tools. Additionally, students can generate and submit reports on their reading level to their teachers, providing a way for teachers to track their progress.

## Features

### Customized Study Resource
With Lexi Learn, students can personalize their learning experience by saving words to their study set. These saved words are easily accessible and can be reviewed at the bottom of the application. Furthermore, students can download the contents of their study set as a .csv file, enabling them to create personalized study decks that can be imported into other learning tools such as Quizlet and Anki, or submit them to teachers for an assignment grade. The .csv file includes words saved to the study set and their corresponding definitions.

Students have the option of creating a Lexi Learn account, which allows them to access their study set from any device on log in. Alternatively, the study set can be saved and accessed locally without the need to sign up for an account.

### Teaching Aid in Language Arts
Lexi Learn also provides a feature for students to generate reports on their own reading level, which can be downloaded as a .csv file and submitted to educators. These reports can be used to gauge the level at which their students are reading and serve as a resource for lesson planning. The file includes the words that the student has saved to their study set and the corresponding difficulty level. The criteria used to determine word difficulty can be found on the Twinword API documentation [here](https://www.twinword.com/blog/how-to-check-english-word-difficulty/).

### Organized Submissions
The file names for study sets and teacher's reports will be automatically generated. The study set files will be named in the format of "YYYY-MM-DD-StudySet-StudentName" and the teacher's report files will be named in the format of "YYYY-MM-DD-Report-StudentName". This makes it easy for both students and educators to easily locate and identify their files and eliminates the need for manual naming and organization. 

#### Example of Study Set and Teacher's Report .csv files
![image](https://user-images.githubusercontent.com/106183040/216186390-72d2aafb-2408-44f6-b2be-3f6ef2ce7866.png)


## Tech Stack
- Uses JSON Web Token (JWT) for user authentication and request authorization
- Utilizes React and Tailwind for the front-end
- Handles data storage with MongoDB and localStorage
- Builds the server with Node and Express in MVC pattern
-	Integrates [Owlbot API](https://owlbot.info/) for dictionary content and [Twinword Language Scoring API](https://www.twinword.com/api/language-scoring.php) for word difficulty analysis

## Optimizations
### User Experience
The Sign Up form was updated to include a field for the user's name, which allows the server to store and the user's name in the database and returns it to the client.
This was done to include the student's name in all downloaded files for improved organization, as outlined in the [Organized submissions](#organized-submissions) feature. To support this new feature, changes were made to the client-side code to handle the scenario in which the user is not logged in. An additional logic was added to prompt the user to enter their name when they need to download files if they are not logged in. This ensures that the file name is always formatted to include the user's name.

## Project Evolution
This is version 2.0 of a previous project that I built in the earlier stage of my learning. In this version, I implemented the following technologies:

-	React.JS to replace direct manipulation of the DOM for optimized rendering and better scalability through reusable components.
-	An Express server that not only serves as a proxy API, but also connects to MongoDB and utilizes JWT to support user-specific applications such as account registration, login, and in this case – saving vocabulary words to a study set that can be accessed and reviewed from anywhere. The contents of the study set can also be easily modified.
-	TailwindCSS to replace custom CSS for more consistent and responsive design across different screen sizes and devices.

In comparison, the first version of Lexi Learn was built with HTML, CSS, and vanilla JavaScript. LocalStorage was used to save past word searches locally, and Owlbot was the only API integrated. The server was created primarily to secure the Owlbot access key API as well as to proxy requests to said API as they did not have CORS support at the time. 

### Relevant links to the old version of Lexi Learn can be found below:

**Website:** https://lexilearn.netlify.app/

**Front-end code:**  https://github.com/jennaly/lexilearn-dictionary

**Server/Proxy API:** https://github.com/jennaly/lexilearn-proxy-api

## Using Lexi Learn
### Register as a new user or login to account
![login:signup](https://user-images.githubusercontent.com/106183040/214964996-8168b9a7-4d06-4887-af88-a8058c55387f.gif)

### Look up words and save them or review from your study set
![searchWords](https://user-images.githubusercontent.com/106183040/214966122-d6e7516f-53e7-441c-92e7-f3656d14d331.gif)

### Remove words from your study set
![removeWords](https://user-images.githubusercontent.com/106183040/214966326-22075ea5-50b1-40cd-a0c8-868482165d91.gif)

### Downloading files as .csv 
![downloadFiles](https://user-images.githubusercontent.com/106183040/214966405-425d11fb-f1db-4c33-90a5-4d997dbc4c70.gif)

### Downloading files when not logged in
![noLoggedIn](https://user-images.githubusercontent.com/106183040/214966505-67e205c1-beaa-43b1-8a63-625cd237bf04.gif)

