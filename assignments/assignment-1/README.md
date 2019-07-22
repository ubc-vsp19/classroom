# Assignment 1

## Introduction

**Over the course of the whole project (over the four assignments)**, you are going to build a photo gallery which will download a list of images from a server and display them in a dynamically resizing grid. You will be able to click on any image to enter a presentation mode, and view other images using "previous" and "next" buttons. You will also eventually implement an auto slideshow mode, where images will automatically change after a certain period of time.

**_Specifically, for assignment 1_, you need to the following:**:

To help you get started, you will need to structure your project into the following way for the assignments. Submission instructions are given in the end of this document.

- Root folder
    - css
        - (all stylesheets go in this folder)
    - js
        - (all JavaScript files go in this folder)
    - libs
        - (library files provided by us in this folder)
    - images
        - (all images go in this folder)
    - index.html
        - (this should be the entry point to your website)

For this particular assignment, you will write some basic HTML and CSS to build the homepage for the web app. There is no JavaScript required for this assignment, so you will be penalized if you use JavaScript for this assignment.

The file [layout.png](layout.pdf) provides a wireframe of what the user interface should look like. You are free to choose colours and fonts of your own choice.

## Tasks

1. [HTML] Create the HTML layout that will be required to generate the web page provided in the screenshot. Your homepage should include the following elements:
    - Div (id=mainBody)
        - Heading
        - Table (id=imagesGrid)
            - Row 1
                - Cell 1
                    - Image 1
                - Cell 2
                    - Image 2
                - Cell 3
                    - Image 3
                - Cell 4
                    - Image 4
            - Row 2
                    - ...

    - Notes:
        - You can find all 8 images in the `images` folder.
        - The images will likely be too big to fit on the screen, but that's OK, since that will be fixed in the next task.

2. [CSS] Create a CSS stylesheet to add relevant styles that would help you design the layout for the web page. A few things to keep in mind:
    - The width of the content within the website (mainBody) should be 1000px.
    - The content (mainBody) should be centered within the web page.
    - Make sure that all 8 images fit nicely inside the table. That is, they do not overflow outside the table. (Hint: You need to modify the width of the images inside the table).
    - Add a shadow to the images when hovered over.
    - Make the border of the images rounded on the edges when hovered over.

Note that you do not need to setup any server to host the webpage you are creating. Simply open the html page with any browser, and the webpage will be displayed.


##Marking

1. Task 1: 5 Points
2. Task 2:
    1. A: 2 Points
    2. B: 2 Points
    3. C: 2 Points
    4. D: 2 Points
    5. E: 2 Points


## Submission Instructions
- For each assignment, create a branch called assignment-, for ex: assignment-1, assignment-2, etc. **For this assignment, your branch name should be assignment-1.**
- Make sure you push your changes to that branch before midnight (11:59 PM) on the date of the assignment deadline (**July 23, 2018 11:59 PM**).
