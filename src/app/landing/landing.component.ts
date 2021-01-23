import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';

declare var jQuery;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {
  }

  scrollToElement($element): void {
    this.viewportScroller.scrollToAnchor($element);
  }

  ngOnInit(): void {
    (($) => {
      'use strict';

      /* Navbar Scripts */
      // jQuery to collapse the navbar on scroll
      $(window).on('scroll load', () => {
        if ($('.navbar').offset().top > 60) {
          $('.fixed-top').addClass('top-nav-collapse');
        } else {
          $('.fixed-top').removeClass('top-nav-collapse');
        }
      });

      // jQuery for page scrolling feature - requires jQuery Easing plugin
      $(() => {
        $(document).on('click', 'a.page-scroll', (event) => {
          const $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
          }, 600, 'easeInOutExpo');
          event.preventDefault();
        });
      });

      // offcanvas script from Bootstrap + added element to close menu on click in small viewport
      $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', () => {
        $('.offcanvas-collapse').toggleClass('open');
      });

      // hover in desktop mode
      // tslint:disable-next-line:typedef
      function toggleDropdown(e) {
        // tslint:disable-next-line:one-variable-per-declaration variable-name
        const _d = $(e.target).closest('.dropdown'),
          // tslint:disable-next-line:variable-name
          _m = $('.dropdown-menu', _d);
        setTimeout(() => {
          const shouldOpen = e.type !== 'click' && _d.is(':hover');
          _m.toggleClass('show', shouldOpen);
          _d.toggleClass('show', shouldOpen);
          $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
      }

      $('body')
        .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
        .on('click', '.dropdown-menu a', toggleDropdown);


      /* Header Waves Animation */
      const WAVES = document.querySelectorAll('.wave') as any;
      const CONFIG = [{
        speed: 100,
        opacity: 0.3,
        width: 800
      },
        {
          speed: 50,
          opacity: 0.6,
          width: 800
        },
        {
          speed: 25,
          opacity: 1,
          width: 400
        }];


      const updateWave = index => () => {
        for (const key of Object.keys(CONFIG[index])) {
          WAVES[index].style.setProperty(`--${key}`, CONFIG[index][key]);
        }
      };

      WAVES.forEach((_, index) => updateWave(index)());


      /* Details Lightbox - Magnific Popup */
      $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
      });


      /* Counter - CountTo */
      let a = 0;
      $(window).scroll(() => {
        if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors
          const oTop = $('#counter').offset().top - window.innerHeight;
          if (a === 0) {
            if ($(window).scrollTop() > oTop) {
              $('.counter-value').each(function() {
                // tslint:disable-next-line:one-variable-per-declaration
                const $this = $(this),
                  countTo = $this.attr('data-count');
                $({
                  countNum: $this.text()
                }).animate({
                    countNum: countTo
                  },
                  {
                    duration: 2000,
                    easing: 'swing',
                    step: () => {
                      $this.text(Math.floor(this.countNum));
                    },
                    complete: () => {
                      $this.text(this.countNum);
                    }
                  });
              });
              a = 1;
            }
          }
        }
      });


      /* Move Form Fields Label When User Types */
      // for input and textarea fields
      $('input, textarea').keyup(() => {
        if ($(this).val() !== '') {
          $(this).addClass('notEmpty');
        } else {
          $(this).removeClass('notEmpty');
        }
      });


      /* Back To Top Button */
      // create the back to top button
      $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
      const amountScrolled = 700;
      $(window).scroll(() => {
        if ($(window).scrollTop() > amountScrolled) {
          $('a.back-to-top').fadeIn('500');
        } else {
          $('a.back-to-top').fadeOut('500');
        }
      });


      /* Removes Long Focus On Buttons */
      $('.button, a, button').mouseup(() => {
        $(this).blur();
      });

    })(jQuery);


  }

}
