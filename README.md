# The TenX Learning System
> 10 Academy is building the tenx learning platform from scratch. A full implementation of the Tenx system becomes a gate to access all components that make up the 10 Academy pipeline: talent acquisition, community building, knowledge-skill-attitiude training, centralised feedback, profile making, and job matching.

# Description of Challenge
>The challenge is to build a frontend on top of React Starter Kit using React that renders a pdf in the main window and on the right hand side of the page provides a form to accept grades based on a few breakdown. 

# Project Structure

```
common
|__App.tsx                     # It is the root component to hold all pages and components to be rendered
pages
|__homePage
  |___homePage.component.tsx   # A home page that renders the right and left panel
components
|___Display
  |____pdf.component.tsx       # A components that displays the uploaded pdf. If there is no pdf it displays an image showing that no image is displayed 
|___RightPane
  |____rightPane.component.tsx #  A component that holds all the elements of the input box from the user as well as the file upload functionality. It will then pass the uploaded file to the left panel to be displayed
  |____TextField.tsx           # A component that dispaly input textfields
  |____Toogle button group.tsx           # A component that dispaly selector for each fields
  |____rightPane.ts
|___reducers
  |____rootReducer.ts          # A function for changing multiple states
```
