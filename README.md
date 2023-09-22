# Social Postify
With the increasing presence of companies on social media, having an efficient tool to schedule, manage and track posts on various social media platforms has become indispensable. In this sense, Social Postify comes as a solution for content creators, allowing them to create and schedule posts for different social networks. This allows them to create custom posts with images, titles, text, and choose precise dates and times for each post. The system also provides a clear overview of scheduled posts.

This repository corresponds to the backend of this web application.

## Technologies

  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Medias
- To indicate on which social media platforms the posts will be made, use the `/medias` route.
- The body should have the format:

<img src="https://github.com/dayanelaura/social-postify/raw/main/Captura%20de%20tela%20de%202023-09-22%2015-56-41.png" alt="MediaBody" width="600" height="110">

## Posts
- To post content on the selected social media platforms, use the `/posts` route.
- The body should have the format:

<img src="https://github.com/dayanelaura/social-postify/raw/main/Captura%20de%20tela%20de%202023-09-22%2015-57-15.png" alt="PostsBody" width="600" height="110">

## Publications
- To schedule a post, use the `/publications` route.
- The body should have the format:
  
<img src="https://github.com/dayanelaura/social-postify/raw/main/Captura%20de%20tela%20de%202023-09-22%2015-57-56.png" alt="PublicationsBody" width="600" height="110">
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
