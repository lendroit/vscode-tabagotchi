# tabagochi README

This extension was inspired by this chrome extension [tabagoshi](http://tabagotchi.com/). It prevents you from openning too many tabs (e.g. it helps you realise you are completely lost in your 15 tabs of Stack Overflow and you need to take a 5 min break)

## Features

This extensions warns you when you have too many files open in your workspace.

![Clean your workspace indo](images/example.gif)

## Extension Settings

Soon you'll be able to configure the threshold of the warnings.

## Known Issues

At launch, the tabs that are already open are not counted. The counter starts at 0 if you don't have any open tab, or 1. If you visit your tabs though, they will be counted.

## Release Notes

### 1.0.0

Initial release:

- An error message and an info message are displayed when you open a file while more than 10 files where already open.

## Coming soon

Count the real number of open tab at launch.
Allow user to set the number of tabs before the tabagoshi warns you.
Implement an actual tabagoshi that will loose life if you have too many tabs, or will level up if you keep your workspace cleen.
