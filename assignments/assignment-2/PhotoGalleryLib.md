# PhotoGalleryLib Documentation

## Introduction

This library contains some functions which will be helpful for completing the assignments for this course. It has functions for detecting screen size changes, creating image tables of various sizes, creating modals, etc.

The JavaScript file can be found [here](PhotoGalleryLib.js).

Simply add a `<script>` tag like the following to use this in your code:

`<script src="https://raw.githubusercontent.com/juliengs/vsp2018webapp-assignments/master/PhotoGalleryLib.js"></script>`

## Functions

- `PhotoGalleryLib.onSizeClassChange (callback)`

    This function is used for detecting screen size changes. This function takes a callback as an argument, which is called whenever the screen size is changed. One of the strings "small", "medium", or "large" will be passed as an argument to the callback function when the screen size is changed. Note that the callback function will only be called when the screen size changes from one size class to another (ex, small to medium). It will not be called repeatedly while the screen size is being changed within a particular size class like large.

- `PhotoGalleryLib.generateGrid (imageUrls, size)`

    This function is used for generating a table DOM element which can be used to display a grid of images. The `imageUrls` argument is an array of image URLs which are supposed to be displayed in the table. These can be relative URLs like './images/foo.jpg' or even http URLs. The `size` argument can be one of "small", "medium", or "large". a 1x8 grid is made for small screen sizes, a 2x4 grid is made for medium screen sizes, and a 4x2 grid is made for large screen sizes.

- `PhotoGalleryLib.createModal ()`

    This function creates a modal which can be used for presentation mode. There will be no visible effect when this function is called since the modal is closed by default. You can however inspect the DOM tree in your browser to see that a new `<div>` gets inserted into the body which has a CSS attribute `display:none`.

- `PhotoGalleryLib.initModal (closeBtnCb, previousBtnCb, nextBtnCb)`

    This function is used to register click handlers for close, previous, and next buttons in the modal. The 3 arguments of this function are callbacks which are called when close, previous, or next buttons are clicked respectively. Example usage:
    
    ```javascript
    PhotoGalleryLib.initModal(function() {
        console.log("Close button was clicked");
    }, function() {
        console.log("Previous button was clicked");
    }, function() {
        console.log("Next button was clicked");
    });
    ```

- `PhotoGalleryLib.closePresentationModal ()`

    Closes the modal (hides it)

- `PhotoGalleryLib.openPresentationModal ()`

    Opens the modal (makes it visible)
    
- `PhotoGalleryLib.setModalImgSrc (src)`

    Sets the `src` attribute of the image in the presentation modal to the given image URL
    
- `PhotoGalleryLib.addImageClickHandlers (callback)`

    This function can be used to add click handlers for the images in the grid. This function takes a callback, which is called whenever an image in the grid is clicked on. The integer index of the image is passed as an argument to the callback function.
