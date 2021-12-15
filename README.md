## Blog Website
This is an article publishing web application, a blog in which everyone can share something. You can share your post after you login with github or other known authentication services.

## Features of the web application
- responsive blog web application
- sign in, sign out
- article post, edit or delete
- share on social media (will be added)

## Structure

##### Front End - React.js - NextJs
I used React and NextJs to build the client side of the Application. NextJs is a practical React Framework with its ready to use Routing and API system.

##### Server Tier - NextJs with Prisma
I used NextJs default API system for the backend. Its like express.js, but you dont need to strugle with routing. Folder structure handles that. And for the communication with DB i used Prisma.

##### Database Tier - PostgreSQL (on Heroku)
Posts, Users and Session data is stored in a PostgreSQL database in Heroku.
User and Post data relation is determined as "one to many"

## Library, frameworks, tools etc. used

- [React](https://reactjs.org/)
- [NextJs](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.mongodb.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)

## Contribute
I will be happy to see your contributions.