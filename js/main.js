var $ = jQuery.noConflict();

(function ($) {
     "use strict";

     var width = $(window).width();
     var height = $(window).height();

     /*-------------------------------------------------*/
     /* =  Mobile Hover
        /*-------------------------------------------------*/
     var mobileHover = function () {
          $("*")
               .on("touchstart", function () {
                    $(this).trigger("hover");
               })
               .on("touchend", function () {
                    $(this).trigger("hover");
               });
     };

     mobileHover();
     /*-------------------------------------------------*/
     /* =  loader
        /*-------------------------------------------------*/
     Pace.on("done", function () {
          $("#myloader .reveal-first").addClass("is-active");
          $("#myloader .reveal-second").addClass("is-active");
          setTimeout(function () {
               $("#myloader .reveal-first, #myloader .reveal-second").fadeOut(500);
          }, 1000);
          setTimeout(function () {
               $("#grid .grid-line").addClass("hey");
          }, 1000);
     });
     /*-------------------------------------------------*/
     /* =  Sticky menu
        /*-------------------------------------------------*/
     $(window).on("scroll", function () {
          var scroll = $(window).scrollTop();
          var height = $(window).height();

          var texttop = $("#intro .text-top");
          var textbottom = $("#intro .text-bottom");
          var social = $("#wrap-social");
          var cookiebanner = $("#intro .cookie-banner");

          if (scroll >= 500) {
               cookiebanner.fadeOut();
          }

          if (width > 991) {
               if (scroll >= 1500) {
                    social.fadeOut();
               } else if (scroll <= height) {
                    social.fadeIn();
               } else {
                    social.fadeIn();
               }
          }
     });


     var cursor = {
          delay: 8,
          _x: 0,
          _y: 0,
          endX: window.innerWidth / 2,
          endY: window.innerHeight / 2,
          cursorVisible: true,
          cursorEnlarged: false,
          $dot: document.querySelector(".cursor-dot"),
          $outline: document.querySelector(".cursor-dot-outline"),

          init: function () {
               // Set up element sizes
               this.dotSize = this.$dot.offsetWidth;
               this.outlineSize = this.$outline.offsetWidth;

               this.setupEventListeners();
               this.animateDotOutline();
          },

          setupEventListeners: function () {
               var self = this;

               // Anchor hovering
               document.querySelectorAll("a").forEach(function (el) {
                    el.addEventListener("mouseover", function () {
                         self.cursorEnlarged = true;
                         self.toggleCursorSize();
                    });
                    el.addEventListener("mouseout", function () {
                         self.cursorEnlarged = false;
                         self.toggleCursorSize();
                    });
               });

               // Click events
               document.addEventListener("mousedown", function () {
                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
               });
               document.addEventListener("mouseup", function () {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
               });

               document.addEventListener("mousemove", function (e) {
                    // Show the cursor
                    self.cursorVisible = true;
                    self.toggleCursorVisibility();

                    // Position the dot
                    self.endX = e.pageX;
                    self.endY = e.pageY;
                    self.$dot.style.top = self.endY + "px";
                    self.$dot.style.left = self.endX + "px";
               });

               // Hide/show cursor
               document.addEventListener("mouseenter", function (e) {
                    self.cursorVisible = true;
                    self.toggleCursorVisibility();
                    self.$dot.style.opacity = 1;
                    self.$outline.style.opacity = 1;
               });

               document.addEventListener("mouseleave", function (e) {
                    self.cursorVisible = true;
                    self.toggleCursorVisibility();
                    self.$dot.style.opacity = 0;
                    self.$outline.style.opacity = 0;
               });
          },

          animateDotOutline: function () {
               var self = this;

               self._x += (self.endX - self._x) / self.delay;
               self._y += (self.endY - self._y) / self.delay;
               self.$outline.style.top = self._y + "px";
               self.$outline.style.left = self._x + "px";

               requestAnimationFrame(this.animateDotOutline.bind(self));
          },

          toggleCursorSize: function () {
               var self = this;

               if (self.cursorEnlarged) {
                    self.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
                    self.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
               } else {
                    self.$dot.style.transform = "translate(-50%, -50%) scale(1)";
                    self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
               }
          },

          toggleCursorVisibility: function () {
               var self = this;

               if (self.cursorVisible) {
                    self.$dot.style.opacity = 1;
                    self.$outline.style.opacity = 1;
               } else {
                    self.$dot.style.opacity = 0;
                    self.$outline.style.opacity = 0;
               }
          }
     };

     cursor.init();

     /*-------------------------------------------------*/
     /* =  Animation
        /*-------------------------------------------------*/
     window.sr = ScrollReveal();
     //    sr.reveal('[data-animation="reveal"]', {
     //        duration: 1000,
     //        scale: 1,
     //        delay: 0,
     //        distance: 0,
     //        origin: 'bottom',
     //        opacity: 0.1,
     //        viewFactor: 0.0,
     //    });

     if (width < 992) {
          $(".moove").removeClass("moove");
          //var rellax = new Rellax('.moove-mobile');
     }
     if (width > 991) {
          var rellax = new Rellax(".moove");
          //$(".moove-mobile").removeClass("moove-mobile");
     }
     $(window).resize(function () {
          var currentwidth = $(window).width();

          if (currentwidth < 992) {
               rellax.destroy();
          }
          if (currentwidth > 992 && currentwidth != 1024 && currentwidth != 1366) {
               location.reload();
          }
     });
     $(window).on("orientationchange", function () {
          location.reload();
     });
     /*-------------------------------------------------*/
     /* =  Share
        /*-------------------------------------------------*/
     try {
          $("#share-this").click("a", function () {
               $("#banner-share").addClass("is-open");
               $("body").addClass("no-scroll");
          });
          $(".close-button").click("a", function () {
               $("#banner-share").removeClass("is-open");
               $("body").removeClass("no-scroll");
          });
     } catch (err) {}
})(jQuery);