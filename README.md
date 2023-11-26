# stickfighting-website

*Repo for the exam project for Robin Persson and Magnus Vargvinter at the Web developer course 2022-24 at YRGO, Gothenburg.*

![Bruce Lee wisdom](https://media.giphy.com/media/9WHE2bo5Na9Gg/giphy.gif)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The backend and database is handled by [Supabase](https://supabase.com/). It uses the [React big calendar](https://github.com/jquense/react-big-calendar#readme) component as a calendar, [Tiptap](https://tiptap.dev/) for editing rich text, and the [Framer motion](https://www.framer.com/motion/) library for animations.

The font used is [Work sans](https://fonts.google.com/specimen/Work+Sans?query=work+sans). It's deployed on the [Vercel Platform](https://vercel.com/).

## About

The multipage website is a (WIP) live project for a martial arts association in Gothenburg. It consists of the landing page, a calendar page, an about us page, an image gallery, and an admin page for the logged in superuser. The admin page is a small scale CMS of our own design, and every page has items that can be manipulated from it.

## Status

The site is fully functional, but is waiting for feedback from the clients.  
  
List of current tasks (will be converted to issues):

Overall
- Minor margin fixes on all pages.
- Convert News section on start page to carousel.
- More responsive calendar. Clickable events?
- Images section layout to heavy on left side. Needs to be evened out.
- More animations?

Admin page
- Larger margin and layout fixes on admin page, including clearer separation of sections.
- Video upload section will be more fleshed out.
- Convert News edit section to carousel.
- Calendar item selection on admin page to be placed in sorted views, instead of the long line now.
- Better and clearer layout in images section. Add option for removing images? Add option to increase/decrease number of images?

Code
- One more round of code cleanup.
- Some client side pages can (probably) be rewritten to SSR.
- Hide login page deeper in the structure Perhaps create a separate route layout?

Database
- Clean up table names.
- Reset ID:s?

Other
- Help client buy domain name.
- Client needs a Supabse paid subscription.


