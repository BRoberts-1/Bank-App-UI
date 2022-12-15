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

/////////////////////////////////////////
// BUTTON SCROLLING
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
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// PAGE NAVIGATION //

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // this refers to element selected always
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); // this works fine, but we only have 3 elements here, and with our .forEach() method, that means that we are adding the eventhandler function to each of these elements. If there were 10,000 elements it would impact performance negatively.
// The better solution here would be to use event delegation. We will place the eventlistener on a common parent of all the events we are interested in. When a user clicks the event bubbles up to the parent element and then executes the handler function only once for all the child elements. Basically, it is like making a giant button to contain all the links.

// In event delegation we have two steps:
// 1) We need the parent element common to our targeted elements
// 2) Determine what element originated the event(ie what is the (event target) e.target) Use a matching strategy to see if target element has the same CLASS as the event target(e.target)

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();

  // Matching strategy is just a way to check to see if we selected correctly. It is a test before we make a mistake.
  if (e.target.classList.contains('nav__link')) {
    // console.log('LINK-WORKS-DOO');

    const id = e.target.getAttribute('href'); // this refers to element selected always
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Another important use case of event delegation is when we are working with elements that are not yet present on the page on runtime e.g. buttons that are added dynamically while using the application
///////////////////////////////////////
///////////////////////////////////////

// Section 186 - Selectng, Creating, and Deleting elements

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

// document.documentElement.style.setProperty('--color-primary', 'blue');
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

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// // 2) Add event listener function to button origin activate
// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords); //returns:

//   console.log(e.target.getBoundingClientRect()); // gives coordinates relative to viewport, not absolute to top of document

//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // we need it to scroll vertically, we need a certain y-coordinate
//   // We calculate it using the current coordinate + the current scroll
//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight, // we can get the height and width relative to our viewport, the measurements exclude scroll bar
//     document.documentElement.clientWidth
//   );
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
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// Section 189 - Types of Events and Event Handlers

// An event occurs and is logged whether we listen for the event or not.
// Event Listeners
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading.');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// // mouseenter is hover of mouse over that element
// h1.addEventListener('mouseenter', alertH1);

// h1.removeEventListener('mouseenter', alertH1);

// We can achieve same results by using a method called .onmouseenter() on our h1 element, however, this is old way, use addEventListener instead:
// h1.onmouseenter = function (e) {
//   alert(
//     'onmouseenter: Great! You are reading the heading, exactly like we planned for you to do.'
//   );
// };

// We use .addEventListener nowadays because it allows us to add multiple EventHandlers to the same event. We cannot do this on the other .onmouseenter because the 2nd function would override the first function.

// We can also REMOVE the EventHandler if we need. See above on line 238. This way the event handler only handles it one time and not every time we hover over that element.

// We can also REMOVE the EventHandler after a certain amount of time has passed:
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// A third way of handlingEvents which should NOT be used is to add an attribute to an HTML element in the HTML file eg. on the h1 element adding will look like this: <h1 onclick="alert('HTML alert')"></h1> Weird old-school JS.

// Section 190 - Event Propagation: Bubbling and Capturing

// There are three phases of an event:
// 1) Capturing Phase
// 2) Target Phase
// 3) Bubbling Phase

// When there is an eventlistener and then an event occurs, the event actually occurs in the root of the document. This is called the "Capturing Phase." The event then makes it way down the DOM Tree to the target element. When it arrives at the target element this is called the "Target Phase".  After this the event then 'bubbles' up to the Root element traveling through all the parent elements of the target element. This is called the "Bubbling Phase".

// This is important because as the event travels up and down the DOM tree it is as if the event occurs in all those elements as well. We can use this to manipulate the DOM even more.

// By default, events can only be handled in the Target Phase and the Bubbling Phase, and not the Capturing Phase, but this default can be changed to include the Capturing Phase as well.

// Most events do have the three phases, but some events only have the Target Phase.

// Because most events have all three phases: Capture, Target, and Bubbling Phase we can say that the events in JS propagate.

// Section 191 - Event Propagation in Practice

// We will give our navigation bar elements eventhandlers and then see how the same 'click' event on one link can be handled by all the parent elements as well. We will use a random number genererator and then use it to generate a random color selectin for our elements:

// rgb(255, 255, 255);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINKCHILD', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // returns: true

//   // We can stop event propagation with a method, however, not a good practice.
//   // e.stopPropagation(); // This might be used if you have a complex application with many handlers for the same event.
// });
// // e.target is where the click happened, not where the event happened.
// // e.currentTarget is where the eventhandler is attached

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINERNAVCHILD', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('PARENTOFALL', e.target, e.currentTarget);
//   } // adding a 'true' parameter here after a comma gives us the PARENTOFALL(it happens on capture phase)
// ); // 3rd parameter-if we set this parameter to true, it will use Capture parameter and will no longer listen to bubbling events and instead will handle on capture phase.

// When you click on the feature link, a random color is generated for itself and all the parent elements including the whole parent nav links container and its parent container. If you click just the parent container only the outer parent container gets a random color because only the parents get event and not the children. Meaning, if you will click on the actual like then three events happen. As you go outwards and click less events happen.

// Usually it is not useful for us to use capture phase and that is why, by default event handlers occur in the target and bubbling phase.
// However, we can do it if we want:

// The only reason capturing and bubbling exists is b/c historically browsers implemented different versions of JS.

////////////////////////////////////
// Section 192 - Event Delegation: Implementing Page Navigation

// We will implement smooth scrolling for our application for the navigation links using event delegation. See above line 76.

// Section 193 - DOM Traversing - REFERENCE

// Walking throught the DOM, ie selecting an element based on another element. This is important because sometimes you need to select a direct child or direct parent element.

// We will use the <h1></h1> element and go traversing in every direction:

const h1 = document.querySelector('h1');

// Going downwards: children

// we will select the <span></span> elements with class="highlight"
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); //returns: (9 nodes)text, comments, elements
console.log(h1.children); // returns:updated HTMLcollection of our elements(best to use this to see what elements are in h1(keep in mind only works for direct children and not nested children))
// We can use .firstElementChild and .lastElementChild to select elements within DOM tree
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'blue';
// Important!! to know .querySelector and .querySelectorAll(): those methods will select all child elements, no matter how deep they are nested in the DOM tree, of the h1 element.  Also, only the children of the h1 element with the classname 'highlight' will be selected and not just any elements on the page with same classname.

// Going upwards: parents
console.log(h1.parentNode); // direct parent - similar to .childNodes
console.log(h1.parentElement); // usually the one we want

// If we need to find a parent element that is not a direct parent, but further away in the DOM tree we use .closest() method
console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // the .closest() method is used all the time for event delegation.
h1.closest('h1').style.background = 'var(--gradient-primary)'; // the .closest() method is used all the time for event delegation.

// Going sideways: siblings

// In JS, we can only select the direct sibling(ie the previous and the next)

// We can select sibling elements or by proxy elements sibling eg:
console.log(h1.previousElementSibling); // returns: null
console.log(h1.nextElementSibling); // returns: h4

console.log(h1.previousSibling); // returns: text
console.log(h1.nextSibling); // returns: text

// If you need all the children and not just the previous or the next, then you can move up to the parent element and then read all the children from there.(ie all the siblings together)
console.log(h1.parentElement.children); // returns: an HTML collection of all children
// We can spread this collection into an array, an then loop over it and do something to each child in array
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
}); // all children of h1 are scaled down by 50% on display
