# NFT Marketplace

This project is a dynamic, single-page NFT marketplace built with React and Vite. It allows users to browse, explore, and view details for various NFTs fetched from a live API.

**Live demo:** [NFT Marketplace](https://kgithub7.github.io/NFT-Marketplace/#/)


## Summary of Changes


This repository is a fork of the [original](https://github.com/hannamitri/nft-marketplace-starter) NFT Marketplace project which is a static website with hardcoded data. The primary goal of this fork was to convert the static website into a fully dynamic application. The key changes include:

  * **API Integration:** All static data (NFTs, author information) was removed and replaced with live data fetched from a mock API using `axios`.
  * **Dynamic Rendering:** Components were refactored to fetch and render data asynchronously, ensuring the content is always up-to-date.
  * **Skeleton Loading States:** Skeleton loading states were implemented to improve the user experience while data is being fetched, providing a smooth transition from a loading state to the fully rendered content.
* **Engaging Carousels:** The homepage utilizes the `react-slick` library to create dynamic, responsive carousels for showcasing "New Items" and "Hot Collections" allowing users to easily browse through multiple NFTs in a compact space.
* **Scroll Animations:** The application integrates the `aos` (Animate On Scroll) library to add subtle animations to elements as they enter the viewport, creating a more engaging and professional user experience as they scroll through the content.

## Tech stack

  - React
  - Vite
  - Axios
  - React Router DOM
  - ESLint