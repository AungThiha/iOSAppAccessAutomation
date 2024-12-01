
# iOS App Access Automation

## Background

Apple restricts devices from installing and using apps from outside its official app market, App Store, without establishing a form of trust between the device and the app’s developer through the Apple Developer Program. Firebase simplifies this process.

However, even with Firebase, allowing users to download an iOS app from Firebase is still a very complicated process. When a user registers their device with Firebase to request access to the app, it can take up to 24 hours for developers to complete the necessary work to allow the users to download the app, especially when there’s a timezone difference.

This project aims to solve this problem by automating the work required on the developer’s side to grant access to the app after a user registers their device with Firebase.

## How It Works for Users

Once this project is functional, users will only need to wait approximately 1 hour after registering their device with Firebase, after which a redacted version of their email address will appear on the project's website to indicate they're ready to download the app.

## Status

- This project will start on **16 Dec 2024**.
- Expected completion date will posted on **18 Dec 2024**. That is the not the date the project will complete. That's the date when updated plan will be posted.

## Website
[https://iosappaccessautomation-9db62b5fb979.herokuapp.com/](https://iosappaccessautomation-9db62b5fb979.herokuapp.com/)

## Resources

- Firebase allows developers to subscribe to device list changes programmatically, including new device registration. [https://firebase.google.com/docs/app-distribution/register-additional-devices](https://firebase.google.com/docs/app-distribution/register-additional-devices)
- Apple offers an API that allows developers to programmatically add a new device in their Apple Developer Account. [https://developer.apple.com/documentation/appstoreconnectapi/post-v1-devices](https://developer.apple.com/documentation/appstoreconnectapi/post-v1-devices)
- Apple offers an API to download provisioning profiles programmatically. [https://developer.apple.com/documentation/appstoreconnectapi/get-v1-profiles](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-profiles)
- Apple allows building a release iOS build from a command line. [https://developer.apple.com/library/archive/technotes/tn2339/_index.html#//apple_ref/doc/uid/DTS40014588-CH1-HOW_DO_I_BUILD_MY_PROJECTS_FROM_THE_COMMAND_LINE_](https://developer.apple.com/library/archive/technotes/tn2339/_index.html#//apple_ref/doc/uid/DTS40014588-CH1-HOW_DO_I_BUILD_MY_PROJECTS_FROM_THE_COMMAND_LINE_)
- Firebase offers an API to upload an iOS build from a command line. [https://firebase.google.com/docs/app-distribution/ios/distribute-cli](https://firebase.google.com/docs/app-distribution/ios/distribute-cli)

## Author
Aung Thiha