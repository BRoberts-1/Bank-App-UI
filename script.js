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

// moving up and down in the DOM is called DOM traversing

// Section 187 - Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d'; // colors our element bkgd
message.style.width = '120%'; // expands our box containing our element

// These styles are added as inline-styles(ie it becomes written into the HTML with the style attribute)

// Inline styles that we set manually for ourselves can be logged ie read, other styles cannot be read eg:
console.log(message.style.height); // returns: nothing b/c cannot read
console.log(message.style.backgroundColor); // returns: rgb(55, 56, 61)

// If we want to get the styles which are saved as classes or anywhere else we use getComputedStyle():
console.log(getComputedStyle(message).color); // returns: our color above. Important to note that all properties are returned, so you have to specify which property you want. Like in our case, we specified .color

// The term computedstyle means the rendered style after processing.

// Another example would be to get the height and then add height to make it bigger:
console.log(getComputedStyle(message).height); // returns: 43.6667px

// To add to it we will take it, change it to a number, because it will be a string and then add to it.
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// this adds 30px of height to our container with our message.

// CSS variable are called custom properties, you can change a value in one place and all other places where variable exist it will change. Like a dial on a machine where you change settings for whole machine.

// CSS variables are defined in the document root(ie the document.Element). In CSS it appears like this: :root{}

document.documentElement.style.setProperty('--color-primary', 'blue');
// changes our variable color to blue: name, value
// We can use this method to set all properties of any element
// Practically it is easier to just use the inline-style method

// Attributes
//eg src, alt, class, id are all attributes

// We can select them:
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //returns: Bankist logo

console.log(logo.src); // returns: the absolute url https://etc..., as opposed to the relative url we have in our HTML file.
// To get the relative url:
console.log(logo.getAttribute('src'));

// We can also get the className:
console.log(logo.className); // returns: nav__logo

console.log(logo.designer); //even if property exist, it will not return anything because it is not part of default properties on the element
// If we want to return an attribute that is not standard ie read it:
console.log(logo.getAttribute('designer'));

// We can also set attributes(ie write them):
logo.alt = 'Beautiful minimalist logo'; // changes our alt attribute
// We can also set a new attribute:
logo.setAttribute('company', 'Bankist');

// To get an attribue on a link:
const link = document.querySelector('.nav__link--btn');
console.log(link.href); // returns: absolute url
console.log(link.getAttribute('href')); // returns: # like is in HTML

// Data attributes

// A special type of attribute that begins with the word data eg data-version-number="3.0" If we write this on our HTML logo element:
// To read it:
// console.log(logo.dataset.versionNumber); // notice how we change our dashes into camelcase to read it, and we use 'dataset'. These attributes are always stored in the dataset object.

// We use data attributes alot in the UI because we need to store data in the user interface(ie HTML code).

// We can also add, remove, toggle, and check if it contains on classes:
// logo.classList.add('c', 'f');
// logo.classList.remove('c', 'f');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not .includes(), like in arrays

// Don't set a className like below line 186, instead use above methods.
// logo.className = 'jonas'; //because it overrides existing classes and only allows us to put one class on the element

//  Section 188 - Implementing Smooth Scrolling

// 1) Select the button(element) where you want the smooth scroll effect to originate(where to activate the scroll), AND also, to where you want it to scroll.

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// 2) Add event listener function to button origin activate
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); //returns:

  console.log(e.target.getBoundingClientRect()); // gives coordinates relative to viewport, not absolute to top of document

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // we need it to scroll vertically, we need a certain y-coordinate
  // We calculate it using the current coordinate + the current scroll
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, // we can get the height and width relative to our viewport, the measurements exclude scroll bar
    document.documentElement.clientWidth
  );
  // To actually implement scrolling effect
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // To improve this we can replace our above arguments with an object:
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // }); // this is still, however, the old way of implementing the smooth scroll

  // Here is the modern way(only works in modern browsers). We select our element we want to scroll to and add our .scrollIntoView() method with our object {behavior: 'smooth}
  section1.scrollIntoView({ behavior: 'smooth' });
});
