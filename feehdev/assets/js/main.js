/**Seletor Function */

const select = (el, all = false) => {
    el = el.trim()
    if(all) {
        return [...document.querySelector(el)]
    } else {
        return document.querySelector(el)
    }
}

/**Event Listener */

const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if(selectEl) {
        if(all) {
            selectEl.foreach(e => e.addEventlistener(type, listener))
        } else {
            selectEl.addEventlistener(type, listener)
        }
    }
}

/**Scroll Event */

const onscroll = (el, listener) => {
    el.addEventlistener('scroll', listener)
}

/**Navbar Links Active Scroll */

let navbarlinks = select('#navbar .scrollto', true)
const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.foreach(navbarlink => {
        if(!navbarlink.hash)
        return
        let section = select(navbarlink.hash)
        if(!section)
        return 
        if(position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navbarlink.classList.add('active')
        } else {
            navbarlink.classList.remove('active')
        }
    })
}

window.addEventListener('load', navbarlinksActive)
onscroll(document, navbarlinksActive)

/**Scroll to Element */

const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollto({
        top: elementPos,
        behavior: 'smoth'
    })
}

/**Back To top Button */

let backtotop = select('.back-to-top')
if(backtotop) {
    const toggleBacktotop = () => {
        if(window.scrollY > 100) {
            backtotop.classList.add('active')
        } else {
            backtotop.classList.remove('active')
        }
    }

    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
}

/**Mobile NavToggle*/

on('click', '.scrollto', function(e) {
    if(select(this.hash)) {
        e.preventDefault()
        let body = select('body')
        if(body.classList.contains('mobile-nav-active')) {
            body.classList.remove('mobile-nav-active')
            let navbarToggle = select('.mobile-nav-toggle')
            navbarToggle.classList.toggle('bi-list')
            navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
    }
}, true)

