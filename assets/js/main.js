/**
* Template Name: Personal - v4.9.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

})()
const form = document.querySelector('#enquiry-form');
const username = document.querySelector('#name');
const emailid = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');
form.addEventListener('submit', (event)=>{
  event.preventDefault();

  validateForm();
});
function validateForm(){
  //name
  if(username.value.trim()==''){
    setError(username, 'Name cannot be empty');
  }else if(username.value.trim().length < 2){
    setError(username, 'Name should be atleast two characters');
  }else{
    setSuccess(username);
  }
  //email
  if(emailid.value.trim()==''){
    setError(emailid, 'Email cannot be empty');
  }else if(isEmailValid(emailid.value)){
    setSuccess(emailid);
  }else{
    setError(emailid, 'Please provide a valid email')
  }
  //subject
  if(subject.value.trim()==''){
    setError(subject, 'Subject cannot be empty');
  }else{
    setSuccess(subject);
  }
  //message
  if(message.value.trim()==''){
    setError(message, 'Message cannot be empty');
  }else{
    setSuccess(message);
  }
}
function setError(element, errorMessage){
  const parent = element.parentElement;
  if(parent.classList.contains('success')){
    parent.classList.remove('success');
  }
  parent.classList.add('error');
  const paragraph = parent.querySelector('p');
  paragraph.textContent = errorMessage;
}
function setSuccess(element){
  const parent = element.parentElement;
  if(parent.classList.contains('error')){
    parent.classList.remove('error')
  }
  parent.classList.add('success');
}
function isEmailValid(email){
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}