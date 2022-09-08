# RQA demos in a web browser

This is a simple implementation of Recurrence Quantification Analysis (RQA) which can be run in a web browser. RQA is a powerful non-linear time series analysis technique, which allows to find the characteristics of an attractor of a dynamical system producing the time series. If you want to learn more about RQA, I recommend to start from the introduction on this page: http://www.recurrence-plot.tk/

The application comes as a static webpage with a simple GUI. It allows non-technical people to play with RQA without the need to learn any programming language or install additional packages. You can find the hosted version here: https://hill.psych.uw.edu.pl/rqa_js/ Alternatively, you may want to host your own version or use it locally.

## Installation

The application is implemented using React.js. You will need Node.js installed on your system to compile it easily.

To update the dependencies run:

> npm update

To create production build run:

> npm run build

Afterwards, you will find all the files of the static website in "build" folder.
