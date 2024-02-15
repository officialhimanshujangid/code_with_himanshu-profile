'use strict';
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window



const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////
///////////////////
///////////////////////////////
/////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////event deligation

//1. add eventlistener to common parent
// determine what elemnt originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  //matching startgy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href')
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////dom traversing

const h1 = document.querySelector('h1');

// // goingdownwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'rgb(100,0,20)'

// going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////tabbed componenet

tabsContainer.addEventListener('click', function (e) {
  console.log(e.target);
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //guard class
  if (!clicked) return;
  // active tab
  tabs.forEach(t => t.classList.remove('.operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))


  clicked.classList.add('.operations__tab--active')
  console.log(clicked.dataset.tab);
  // active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})
///// scroling after learn more
document.querySelector('.btn--scroll-to').addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' })
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////menu fade animation
const handelHover = function (e) {
  // console.log(this, e.target);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const sivlings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(sivlings);
    const logo = link.closest('.nav').querySelector('img')
    sivlings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}


nav.addEventListener('mouseover', handelHover.bind(0.5))
nav.addEventListener('mouseout', handelHover.bind(1))



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////sticky navigation
const header = document.querySelector('.header')
const navheight = nav.getBoundingClientRect(nav).height
// console.log(navheight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// revealing sections
const headerObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: `-${navheight}px` });
headerObserver.observe(header)

////reveal
const allSection = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  // console.log(entries);
  // console.log(observer);
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}


const sectionObserver = new IntersectionObserver(revealSection, { root: null, threshold: 0.1 })
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////lazy Loading
const imgTargets = document.querySelectorAll('img[data-src]');

const loadimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}

const imgOBERVER = new IntersectionObserver(loadimg, { root: null, threshold: 0, rootMargin: '-200px' })

imgTargets.forEach(img => imgOBERVER.observe(img))



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////implementing slides
const slider = function () {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')


  let curruntSlide = 0;
  let maxSlide = slides.length



  ///////////// all functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)

    })
  }

  const gotoSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
  }
  const activateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }

  // next slide
  const nextSlide = function () {
    if (curruntSlide === maxSlide - 1) {
      curruntSlide = 0;
    }
    else {
      curruntSlide++;
    }

    gotoSlide(curruntSlide)
    activateDots(curruntSlide)
  }
  const preSlide = function () {
    if (curruntSlide === 0) {
      curruntSlide = maxSlide - 1;
    }
    else {
      curruntSlide--;
    }

    gotoSlide(curruntSlide)
    activateDots(curruntSlide)
  }

  const init = function () {
    createDots();
    gotoSlide(0);
    activateDots(0)
  }
  init()

  // eventHandlers in dots
  btnRight.addEventListener('click', nextSlide)

  btnLeft.addEventListener('click', preSlide)

  document.addEventListener('keydown', function (e) {
    e.preventDefault();
    console.log(e);
    if (e.key === 'ArrowLeft') preSlide();
    e.key === 'ArrowRight' && nextSlide();

  })
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide)
      activateDots(slide)
    }
  })
};
slider();



























////////////////////// sticky navigation
// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// })

//////////////// sticky navigation using intersection observer ApI
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const obsOptions = {
//   root: null,
//   threshold: 0.1
// }
// const obersver = new IntersectionObserver(obsCallBack, obsOptions);
// obersver.observe(section1)




// // console.log(document.documentElement);
// // console.log(document.head);
// // console.log(document.body);
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section')


// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button')
// // console.log(allButtons);
// // console.log(document.getElementsByClassName('btn'))

// // // creating and inserting element
// // //.innerAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
// // header.append(message);
// header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);


// // delete element
// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   //message remove
//   message.parentElement.removeChild(message)
// })

// // styles
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%'
// console.log(message.style);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'
// console.log(getComputedStyle(message).height);
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// //attribute
// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// logo.alt = 'beautiful'

// // not-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'bankist')

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn')
// console.log(link.href);
// console.log(link.getAttribute('href'));


// // data attributes
// console.log(logo.dataset.versionNumber);

// //////// classes
// logo.classList.add('c', 'j')
// logo.classList.remove('c', 'j')
// logo.classList.toggle('c')
// logo.classList.contains('c')


// // //don't use
// // logo.clasName = 'jnas'




///////////////////////////////////////////////////////////////////////////////working in viewport////////////////////////////////////////////////////////////////////////////////////////////////////



// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('currunt x/y', window.pageXOffset, pageYOffset);

//   console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);

// scrolling
///// type 1
// window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)


///// type 2
// // window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth'
// })
////////// modern type
// section1.scrollIntoView({ behavior: 'smooth' });

/////////////////// page navigation
/////////
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })



// // going sideways
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('you are reading h1')
// })
// const aler1 = function (e) {
//   alert('you are reading h1')


// }
// h1.onmouseenter = function (e) {
//   alert('you are reading h1')

// }
// h1.onclick = function (e) {
//   alert('you are reading h1')

// }
// h1.addEventListener('mouseenter', aler1)
// setTimeout(() => h1.removeEventListener('mouseenter', aler1), 3000)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// rgb(255,255,255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
// })


// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
//   e.stopPropagation()
// })

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('lnav', e.target, e.currentTarget);
// })

//////////////////////////////////////////////////////////////////////////////////////



/////////////dom content  loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML, Parsed and DOM tree buld', e);
})
window.addEventListener('load', function (e) {
  console.log('pagefully LOaded', e);
})

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
})