# tabagotchi README

(ᵔᴥᵔ) <- This is your Tabagotchi, take care of it, it gets annoyed when you have too many tabs open.

This extension prevents you from opening too many tabs in your workspace.
When you are dealing with compexe issues you tend to try to do multiple things at a time, or you struggle to understand a behaviour, You end up having all the files of your project open.
This is when you need a five minute break.

Think of the equivalent situation when you have 15 tabs open in your browser, 3 of them are the same stack overflow issue and you are lost between documentation and github issues, that is the moment when you need to clean your environment. This extension was inspired by [tabagotchi](http://tabagotchi.com/) a chrome extension that I strongly recommend.

## Features

This extensions warns you when you have too many files open in your workspace.
When you reach the threshold the tabagotchi starts to dance.

![dancing tabagotchi](images/tabagotchi_dancing.gif)
![Clean your workspace indo](images/example.gif)

## Extension Settings

Default settings:

```JSON
{
  "tabagotchi.tabThreshold": 5,
  "tabagotchi.displayMessage": true,
}
```

## Known Issues

At launch, the extensions tracks your open tabs by switching on each of them. I am waiting for [this VSCode issue](https://github.com/Microsoft/vscode/issues/15178) to be solved.

## Release Notes

### 0.0.1

Initial release:

- An error message and an info message are displayed when you open a file while more than 10 files where already open.

### 0.2.0

- Configuration setting to set the tab threshold before warnings appear (default value is 5).

## Coming soon

Implement an actual tabagoshi that will loose life if you have too many tabs, or will level up if you keep your workspace cleen.

This extension was developped at LEndroit.

<img src="https://raw.githubusercontent.com/lendroit/vscode-tabagotchi/master/lendroit-logo.jpeg" alt="drawing" width="200"/>
