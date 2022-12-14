'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// This is same code as above, but below is outdated option.
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// Selecting elements
// For the below special elements we don't have to write any selector
console.log(document.documentElement); //selects the entire DOM
console.log(document.head); // selects entire head element
console.log(document.body); // selcets entire body element

// We can also use .querySelector('.element')
const header = document.querySelector('.header'); // returns first element with this name

// If we want to select many elements with the same name we use .querySelectorALL()
const allSections = document.querySelectorAll('.section'); // returns all the many elements with name
console.log(allSections); // returns: node list that contains all the elements

// The above methods are also available not just on the document, but also on all the child elements

// Can also select elements by id with .getElementByID()
document.getElementById('section--1'); // returns the element with this Id

// Can also grab collections of elements:

// Also can grab all elements with a tag name and get a HTMLcollection eg:
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //returns: a HTMLcollection with all elements with tag, can delete an element manually from this list in devtools

// Also can select by classname and get an HTMLcollection
console.log(document.getElementsByClassName('btn')); // returns collection

// Mostly will use the .querySelector() and the .querySelectorALL

// Creating and inserting elements

// .insertAdjacentHTML - done in Bankist app, see notes there.

// To create an element programmatically from scratch:
// We save it to a variable and then can reuse it
const message = document.createElement('div'); // creates a div element
message.classList.add('cookie-message'); // adds a class to our created element(see how variable is useful) This class was already created in the CSS of this project.
// message.textContent =
//   'We use cookies for improved functionality and analytics.'; // .textContent adds text to our element.
// we can also insert HTML and not just text to our element eg:
// We can use both .textContent() and .innerHTML() to READ and SET content
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // adds a button with 'Got it!' string
// header.prepend(message); // variable 'header' is saved at top(it selects the header), then we use .prepend() to add this element as the first child of header element, it is saved in variable 'message' to it.
// header.append(message); // adds it as last child of header element
// the message can only be in one place at a time so it takes the last instance in order of code

// If we want to have multiple copies of the same element appear on page then:
// header.append(message.cloneNode(true)); // this will display the same cookie message at beginning and end of header element

// Can also insert elements outside of elements(ie as siblings, not as children) using .before() and .after()

header.before(message); // inserts as sibling before header element
// header.after(message); // inserts as sibling after heading element

// Deleting elements

// Let's delete the message button we created when the user clicks on it:
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove(); // this is a new method
    // it used to be you had to select parent element first then child to delete it.
    message.parentElement.removeChild(message);
  });

// moveing up and down in the DOM is called DOM traversing
