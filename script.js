'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

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
// const header = document.querySelector('.header'); // returns first element with this name

// If we want to select many elements with the same name we use .querySelectorALL()
// const allSections = document.querySelectorAll('.section'); // returns all the many elements with name
// console.log(allSections); // returns: node list that contains all the elements

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
// const message = document.createElement('div'); // creates a div element
// message.classList.add('cookie-message'); // adds a class to our created element(see how variable is useful) This class was already created in the CSS of this project.
// message.textContent =
//   'We use cookies for improved functionality and analytics.'; // .textContent adds text to our element.
// we can also insert HTML and not just text to our element eg:
// We can use both .textContent() and .innerHTML() to READ and SET content
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // adds a button with 'Got it!' string
// header.prepend(message); // variable 'header' is saved at top(it selects the header), then we use .prepend() to add this element as the first child of header element, it is saved in variable 'message' to it.
// header.append(message); // adds it as last child of header element
// the message can only be in one place at a time so it takes the last instance in order of code

// If we want to have multiple copies of the same element appear on page then:
// header.append(message.cloneNode(true)); // this will display the same cookie message at beginning and end of header element

// Can also insert elements outside of elements(ie as siblings, not as children) using .before() and .after()

// header.before(message); // inserts as sibling before header element
// header.after(message); // inserts as sibling after heading element

// Deleting elements

// Let's delete the message button we created when the user clicks on it:
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove(); // this is a new method
//     // it used to be you had to select parent element first then child to delete it.
//     message.parentElement.removeChild(message);
//   });

// moving up and down in the DOM is called DOM traversing

// Section 187 - Styles, Attributes and Classes

// Styles
// message.style.backgroundColor = '#37383d'; // colors our element bkgd
// message.style.width = '120%'; // expands our box containing our element

// // These styles are added as inline-styles(ie it becomes written into the HTML with the style attribute)

// // Inline styles that we set manually for ourselves can be logged ie read, other styles cannot be read eg:
// console.log(message.style.height); // returns: nothing b/c cannot read
// console.log(message.style.backgroundColor); // returns: rgb(55, 56, 61)

// If we want to get the styles which are saved as classes or anywhere else we use getComputedStyle():
// console.log(getComputedStyle(message).color); // returns: our color above. Important to note that all properties are returned, so you have to specify which property you want. Like in our case, we specified .color

// // The term computedstyle means the rendered style after processing.

// // Another example would be to get the height and then add height to make it bigger:
// console.log(getComputedStyle(message).height); // returns: 43.6667px

// // To add to it we will take it, change it to a number, because it will be a string and then add to it.
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
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
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'blue';
// Important!! to know .querySelector and .querySelectorAll(): those methods will select all child elements, no matter how deep they are nested in the DOM tree, of the h1 element.  Also, only the children of the h1 element with the classname 'highlight' will be selected and not just any elements on the page with same classname.

// Going upwards: parents
console.log(h1.parentNode); // direct parent - similar to .childNodes
console.log(h1.parentElement); // usually the one we want

// If we need to find a parent element that is not a direct parent, but further away in the DOM tree we use .closest() method
// console.log(h1.closest('.header'));
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // the .closest() method is used all the time for event delegation.
// h1.closest('h1').style.background = 'var(--gradient-primary)'; // the .closest() method is used all the time for event delegation.

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
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// }); // all children of h1 are scaled down by 50% on display

// Section 194 - Building a Tabbed Component

// Two compoments:
// 1) Tabs
// 2) Content changes(is revealed) as you click on different tabs

// The entire component on our site has classname="operations"
// Then there is the tab container(each tab is a button with a few classes")that has the three tabs classname="operations__tab-container"
// Below that we have our content. It is actually three seperate contents(1 for each tab)
// Effect occurs because as you click on one tab to display content, you hide the other content automatically. We will toggle classes on and off to switch from hidden to revealed. Each content div has a data-tab attribute which will help us select it later.

// To build our Tabbed Component

// 1) Select all of our components and save to variables
// use .querySelectorAll when there is more than one element to select
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// 2) Add event handlers to the buttons
// Don't do this:
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// Use event delegation instead:
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // we want the closest parent element to the elements with the class "operations__tab". We need this because we have siblings inside of the buttons(a span element and the button element)
  console.log(clicked);

  // Now we must ignore any clicks where the result is null, because it throws an error. It throws an error because JS is trying to execute the .add() code seen below.

  // We make a guard clause:
  if (!clicked) return; // if clicked does not equal above then return, else next code.
  // this guard clause could be written like this, but the above is more modern.
  // if (clicked) {
  //   clicked.classList.add('operations__tab--active')
  // }
  // In order to have only one tab raised up, then we just code the class that makes them raise up be removed before we add the class to the one button that is clicked.
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active'); // we add this class when clicked to change the position of the button to a little upward, relative to the other buttons.

  // Now we have to active the content area with the click of the tab button:
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); //this works because in our CSS file the --active class has all the styling while the other classes have just display: none;
});

// Menu fade animation

// mouseover bubbles while mouseenter does not
// We pass arguments into event handlers by using the .bind() method and the 'this' keyword

// First we select our parent element which has the children we want to have an eventlistener on: const nav = document.querySelector(".nav");
// Then we add our eventListener on top of it.
// Then, we check if our target element contains our links
// Then, we save our target into a variable
// We save our sibling links into variables by first going to parent then selecting all the children using the .closest() method
// We do the same for our logo image, our selector is for any image tag as you see it doesn't have a dot in front of it.
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     // we check the siblings, and if they are NOT, the current target link, then we want to change the opacity to be lower, default is 1 (ie less clear)
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5; // add opacity to logo as well to block out
//   }
// });
// // our 'mouseout' portion of function will reset our effect. When put our mouse away from the navigation- we just change opacity to 1 to make it not see through. (opaque means not see-through)
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     // we check the siblings, and if they are NOT, the current target link, then we want to change the opacity to be higher(ie less clear)
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// The above code, however is repetitive. DRY principle.
// So we refactor and include both variations in one function.
// We just need to keep what is the same in both, and make the differences dynamic.(ie changeable)
// So we will take the opacity, which is different in both, and then change it to argument that we will pass into function.

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // we set it equal to opacity
    });
    logo.style.opacity = this; // we set it equal to opacity
  }
};

// .addEventListener() expects a function, so how do we call handleHover() function inside our .addEventListener?
// We could put an event handler function inside and manually pass our event and opacity into it like this and it would work.
// nav.addEventListener('mouseover', function(e) {
//   handleHover(e, 0.5)
// })
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// })

// However, we can do better and remove anonymous callback functions by using .bind() method. The .bind() method creates a copy of the function, and when called sets it 'this' keyword to it to the value provided. So in our case upon hovering the 'this' keyword will show either 0.5 or 1 depending on where your mouse is hovering. Usually, the 'this' = current target, but  here we set the 'this' keyword manually using the .bind() method and it's argument. We can then set our opacity equal to 'this' which is either 0.5 or 1 based on location of moouse hover. See handleHover function above in siblings check.

// It is impossible to pass another argument besides e, into and event handler function. If you want to pass something beside event, then you must use the .bind() method. If you want to pass multiple values into the event handler then you would set the argument of the .bind() method as an array or an object.
nav.addEventListener('mouseover', handleHover.bind(0.5)); // we need opacity of 0.5 here
nav.addEventListener('mouseout', handleHover.bind(1)); // we need opacity of 1 here

// Section 196 - Implementing a Sticky Navigation: The Scroll Event

// Sticky Navigation
// Scroll event available on the window:
// Scroll Event is not efficient, because any scrolling activates it and creates a bunch of events
// first, we cl to find position of our scroll event on the y-axis: 0 is top of page, and as we scroll it changes.
// For the nav-bar to be "sticky", we need to add 'sticky' class, and then decide where the nav bar should start being sticky.(Ans: the beginning of the 1st section-we need to calculate this dynamically because the viewport size determines ie changes where the 1st section will start.):
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// //this gives us all of our coordinates in an object which we then manipulate

// // then we take our vertical axis scroll coordinates which occur as scroll event. Once we scroll past the initialCoords.top for the 1st section of our page selector(variable stored above on section of button scrolling) ie. window.scrollY > initialCoords.top, then we will add our 'sticky' class to our 'nav' element (we selected and stored it in a variable above. See top of file.), and if this condition is not met then, else remove the 'sticky' class.
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// The above way works, but it is not the best way. We will do the best way next.

// Section 197 - A Better Way: The Intersection Observer API

// It is exactly as the name implies: once you hit an intersection of two elements the event is triggered.

// Start by creating a new Intersectional Observer:
// We pass in a callback function and an object of objects.
// We store it in a variable and then have it observe a certain target by using the method .observer()
// We create a callback function saved in a variable(here it is obsCallBack) as well as an object saved into a variable(here it is called obsOptions)
// Put those variables as arguments into our function
// We need a 'root' property for our object. This root property has a value that is the element that we want the target to intersect. Or does intersect?
// Next property is 'threshold' which is the percentage of the intersection at which the callback function will be called.(it is a percentage eg 0.1 is 10%)
// You can have multiple thresholds(ie an array as a value)
// So the callback function is triggered everytime our observed element(ie target element)crosses with the root element at the threshold we defined. Here our root element in the viewport, so when viewport sees 10% of section1(ie when 10% comes into viewport screen), it triggers the callback function
// The callback function gets called with two parameters. 1) the entries(ie the intersectionobserver entries) and 2) the observer
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry); //this loop logs all of our entries
//   });
// };
// // const obsCallback = function (entries, observer) {};

// const obsOptions = {
//   root: null, // null here means the viewport
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// We want our navigation to appear and be 'sticky' when our header or hero section is completely out of our viewport

// We will create a new observer below based on our header.

// So we start by selecting our header element:
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // our height property on our nav element
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; //destructoring our entries into an array
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // null is viewport. also default is viewport if not specified
  threshold: 0, // 0 here means when header is no longer visible(ie 0 percent of our header in viewport, here we went the opposite way as above)
  rootMargin: `-${navHeight}px`, // adds a margin to our navbar height to allow it to appear exactly in the space where the header section is disappearing
});

// finally we call our observer function
headerObserver.observe(header);

// Section 198 - Revealing elements on Scrolling

// Sections will appear to have a slide-into-view effect
// We accomplish this by adding a class using the intersectionalobserver API to trigger it.

// We have a selector in CSS file called .section-hidden, the opacity is 0(which means completely invisible-not seen at all). The class also has a transformY of 8rem which will move the elements a little bit downward from the top of the page to start off with. So we will add this class to all the elements we want to hide and slide.

// The animation will set the opacity to 1 and the translateY back to 0rem.

////////// The reveal sections effect
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries; // destructoring into an array
  // console.log(entry);
  // in order to get only the section we cross and not all the sections we have an observer on, we grab entry.target and then manipulate the classList

  // we will put a 'guard clause' for the first section because it is already revealed due to the other observer
  if (!entry.isIntersecting) return; //if not, then return else, exe below code
  entry.target.classList.remove('section--hidden');
  // we then need to unobserve our entry.target, otherwise it keeps creating events. We use .unobserve() This will improve performance.
  observer.unobserve(entry.target);
  //once it reveals, it stays revealed unless user reloads page
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // 15% to allow a delay as we enter viewport, 0 is right away
});
allSections.forEach(function (section) {
  sectionObserver.observe(section); // we are putting our observer on each section
  // section.classList.add('section--hidden'); // we add this class to all the sections in order to hide the section
});

// Section 199 - Lazy loading images effect

// Image loading has a major impact upon website performance and therefore very important to optimize images.

// To accomplish the lazy loading of the images we need a very low resolution image and a high resolution image. In the HTMl file in the 'features' class you will see an image which is 200X120 and is 16kB, while the high resolution is approx. 1/2MB(ie 500KB)

// We load our low resolution with page so img with src=pathway, and we use the "data-src" attributeto reference our high resolution image

// We also have to have a class on the original image that blurs the image. It is simply has filter: blur(20px)

// We then replace our original image with our high resolutin image and then remove the class from the image that blurs the image.

// LAZY LOADING IMAGES
// we need to select our targets to observe. we will use all images that have the 'data-src' attribute because that is unique to the ones we want. we can select for elements that contain 'data-src' property in CSS. See below:
const imgTargets = document.querySelectorAll('img[data-src]');

// we will need our callback function:

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // again we will use a guard clause
  if (!entry.isIntersecting) return;
  // else, we want to  replace the src attribute with the data-src attribute. We do this by setting src equal to data-src
  entry.target.src = entry.target.dataset.src;
  // the way to remove the lazy class is to wait for the high-resolution image to load, and then when it finishes loading an event is created called a load-event. On the 'load event' we can put an eventListener.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // to stop the observer from slowing down performance
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px', // delays loading or increases loading depending if positive or negative
});

// we need to attach observer to all of our target elements
imgTargets.forEach(img => imgObserver.observe(img));

// Section 200 - Building Slider Component part 1

// A slider component that slides on arrow clicks or on selection of dots at bottom of page. When it gets to the last slide it just starts over at the first slide.

// Slider content is already set side by side. We use a translateX to move the elements as we click, the overflow: hidden. So translateX is 0% for seen slide the previous slide is -100% and the next slide is 100% for translateX. We program this to be dynamic for all these settings. See below:

// we first select our elements with the name 'slide'. We don't care about our content within, just about our slide container.

// Slider

// We then wrap a function around all of our functions and make a function call on this container.

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // we will loop through our slides (s) for slide, (i) for index of slide and set the style of transform: translateX
  // the width of our box is 100% so we set our four boxes(here images) to 0%, 100%, 200%, 300%. We can do this by using the index numbers to calculate the numbers we need to set dynamically. So, we multiply by 100% for each index number. 0 * 100% = 0, 1 * 100% = 100, etc.

  // We start with storing our 0 value in a mutable variable curSlide, and then just increment up to update it.
  let curSlide = 0;
  // We have to have our slider stop advancing or it will just keep on going.
  // what we do is define the end in a variable;
  const maxSlide = slides.length; // we can read length of node list like on an array

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // the above code is already in the goToSlide function below, but we just need to set the beginning slide to 0 to start with. See line below: goToSlide(0)

  // For click to next slide
  // We add our eventListener on our button:
  // btnRight.addEventListener('click', function () {
  //   if (curSlide === maxSlide - 1) {
  //     //length is not zero based, so we subtract 1 to make it zero based
  //     // if our current slide equals the length of all the slides we have(ie the end of the slides) then set..
  //     curSlide = 0; // this returns us back to beginning of slides
  //   } else {
  //     // else, increase the current slide by 1
  //     curSlide++;
  //   }

  //   slides.forEach(
  //     // this allows dynamic transition of placment position as we click on our button
  //     (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  //   );
  // });

  // creating a new function for the dots:
  // the dots are marked up with div and class="dots" for container and within are button elements <button></button> with the class="dots__dot" and data attribute data-slide=""
  // we want to create one element for each of the slides, so we loop over them and adding the element using 'beforeend' which adds it as the last child always. With the data attribute dynamically changes for each element. Then don't forget to call the function createDots:

  // Here are all of our functions below:

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // We put the function call for createDots in an init() function -see below

  // We now have to create a function that will show which dot is active by adding a special class to the dot which is selected. We can then call that function in all of our 'click' events. So, like the other section above, we implement this by adding the class to all the dots, and taking it away from all, before we add the active class to one:

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    //now we must select the dot element we want and add the active class back to it by using the data attribute and checking if it has a certain value(which value? ans: the value of slide)with that data attribute
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  // We must call this function right-away to show the active dot on the page, We use the 0 to start it off in the 0 index?

  // We put the function call into another function called init() see below

  // We can then refactor the code to have the slides update into its own function.
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // we originally called this goToSlide() function here, but then we made an init function where we call all of the functions into this function container

  // btnRight.addEventListener('click', function () {
  //   if (curSlide === maxSlide - 1) {
  //     curSlide = 0;
  //   } else {
  //     curSlide++;
  //   }

  //   goToSlide(curSlide);
  // });

  // We can refactor a little more by taking a step and putting it into it's own function and then calling it in the other function as an argument.
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      // if we are at the origin slide(ie the 1st slide), then we need set our curSlide variable to the length of our slides minus one to make it a zero base. See below:
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  // to stop the slider from going past the first slide(ie to limit it like we did for the other direction, we add a conditional to our preSlide function

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();
  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // then we need to add an eventlistener for the left button and add a function for that direction. We just need to decrement the slide with curSlide --;

  // Section 201 Building a Slider Component: Part 2

  // Implementing same funcitonality with the dots below and the keyboard arrow keys
  // We attach an event handler to a keyboard event:
  // we log event to see what pushing the arrow key is called. It is called 'ArrowRight' and 'ArrowLeft'
  document.addEventListener('keydown', function (e) {
    // console.log(e);

    // can choose from two options below: 1) if statements 2) short-circuiting
    //1) if statements
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
    // 2) short-circuiting
    // e.key === 'ArrowLeft' && prevSlide();
    // e.key === 'ArrowRight' && nextSlide();
  });

  // Here we attach our button dots to their respective slides using the dataset attribute with the slide number
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //destructuring into an object this dataset with value slide from our event target
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider(); // we could then pass in an object which contains options or whatever else we wanted to pass into it.

// We can then refactor by putting all of our function calls to initialize this in its own function. Then we can put all of those functions into its own function as well so as not to pollute the global name space.

// Section 202 - Lifecycle DOM Events

// Lifecycle is defined as when page is first accessed right until user leaves the page

// DOMcontentloaded event occurs as soon as the HTML is parsed(ie the HTML has been downloaded and converted to the DOM tree)

// NOTE: All scripts(ie JS etc) must be downloaded and executed before the DOMContentLoaded event can happen. It does not wait for images or other external resources to load only for HTML and JS.

// Let's take a look at this event in the console:
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// You want the HTML and DOM tree built and loaded first before executing JS
// We can put our <script></script> tag right at the end of the body of our HTML in order to load and execute our JS. This means we don't have to listen for the DOMContentLoaded event and then execute our JS because it is already at the end.

// The next event we will look at is called the LoadEvent, which is triggered by the window and occurs after everything has been loaded and all scripts executed even external resources.

// To log the Load event:
window.addEventListener('load', function (e) {
  console.log('Page fully loaded!', e);
});

// Last event to know about is the beforeunload event which occurs right before the user leaves the page. It is triggered by the user closing the window and is logged.

// We we log this event, some browsers need you to add the e.preventDefault() function:
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''; //must put this to see the event. this is from historical(legacy JS) reasons
// });

// Section 203 - Efficient Script Loading: defer and async

// Ways to add JS tag to HTML:
// 1) <script src="script.js"></script> added to the end of body element
// 2) <script async src="script.js"></script>
// 3) <script defer src="script.js"></script>

// We can add the <script></script> tag to the <head></head> or to the <body></body> of the HTML

// If you put script tag in head: then HTML begins to parse, then it fetches the script and executes it and only then finishing parsing the HTML. This is very bad for pages performance. And also, the script needs to execute after the DOM is ready and not before. DON'T DO THIS OPTION.

// Instead if you put script tag at the end of the body of HTML, then it will parse and build DOM tree completely and only then fetch and execute the JS. This is fine, but not ideal because the script could have been fetched and only executed after the DOM tree was built.

// So the next option is using the 'async' attribute with the script tag in the head. However, here the HTML begins to be parsed, then the script is fetched and executed immediately asynchronously, and only after does the HTML finish to load. Again not ideal.

// The last option is to put the 'defer' attribute into the script tag at the head of the HTML. This is most used because it begins to parse the HTML AND fetches the script, finishes the DOM and only afterwards executes the script.

// There is not such thing to put the defer and async in the body because it would be the same as only executing the script after the HTML has finished parsing.

// With 'async' the DOMContentLoaded event does NOT wait for the async sciprt, even though usually it waits for all scripts to execute first. So if you have a big script to run, the HTML will finish parsing, the DOMContentLoaded event will fire and only then will the script run or finish running. Also, 'async' does not guarantee that the scripts will be executed in order.

// With the 'defer' attribute scripts are fetched asynchronously and only executed after the HTML is completely parsed. The DOMContentLoaded event fires only after the script is executed. And scripts are executed in order guaranteed.

// So the best option is the 'defer' attribute in the head tag. Also, any libraries that your code depends on should be used with defer before your own JS if you JS depends on it. However, any scripts that you own code doesn't need to depend on or interact with you can use the 'async' attribute eg google analytics.

// Only modern browsers recognize 'async' and 'defer', so for old browsers you must put your scripts at the end of the body tag in HTML.
