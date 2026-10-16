/* ==========================================================================
   ACADEMIC PORTFOLIO JAVASCRIPT
   Clean, beginner-friendly vanilla JavaScript without any libraries or frameworks.

   TABLE OF CONTENTS:
   1. MOBILE MENU TOGGLE
   2. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   3. CLOSE MOBILE MENU ON LINK CLICK
   ========================================================================== */


// ==========================================================================
// 1. MOBILE MENU TOGGLE
// Controls opening and closing the navigation menu on mobile phones and tablets.
// ==========================================================================

// Get references to the hamburger button and navigation menu by their IDs
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

/**
 * toggleMobileMenu()
 * Toggles the 'is-open' class on the menu and 'is-active' on the hamburger button.
 * Also updates the aria-expanded attribute for screen-reader accessibility.
 */
function toggleMobileMenu() {
  // Check if menu is currently expanded
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

  // Toggle the classes to trigger CSS display and animation
  navMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-active");

  // Update accessibility attribute (true if open, false if closed)
  navToggle.setAttribute("aria-expanded", !isExpanded);
}

// Listen for a click event on the hamburger button
if (navToggle && navMenu) {
  navToggle.addEventListener("click", toggleMobileMenu);
}


// ==========================================================================
// 2. CLOSE MOBILE MENU ON LINK CLICK
// When a user taps a navigation link on mobile, automatically close the menu.
// ==========================================================================

// Select all links inside the navigation menu
const navLinks = document.querySelectorAll(".nav-link, .nav-btn");

/**
 * closeMenuOnLinkClick()
 * Automatically closes the dropdown menu after navigating to the target section.
 */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Only close if the menu is currently open on mobile
    if (navMenu.classList.contains("is-open")) {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});


// ==========================================================================
// 3. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
// Highlights the current section's link in the top navbar as the user scrolls.
// ==========================================================================

// Select all sections on the page that have an id attribute
const sections = document.querySelectorAll("section[id]");

/**
 * highlightActiveNavLink()
 * Checks the user's scroll position against each section's offset on the page.
 */
function highlightActiveNavLink() {
  // Get current scroll position with a slight offset for the sticky header (100px)
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    // Check if the current scroll position falls within this section's boundaries
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove 'active' class from all links first
      navLinks.forEach((link) => {
        link.classList.remove("active");
        // Add 'active' class to the link matching this section's ID
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Run the highlight function every time the user scrolls
window.addEventListener("scroll", highlightActiveNavLink);
