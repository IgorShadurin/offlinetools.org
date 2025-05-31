# Changelog

## [1.5.0](https://github.com/IgorShadurin/offlinetools.org/compare/desktop-v1.4.0...desktop-v1.5.0) (2025-05-31)


### Features

* add icons for macOS and Linux builds in electron-builder configuration ([6c4875d](https://github.com/IgorShadurin/offlinetools.org/commit/6c4875da9114768e57ebf2d5277c1aa1a2153ef7))
* add macOS entitlements plist and update build configuration for resource paths ([d603dd4](https://github.com/IgorShadurin/offlinetools.org/commit/d603dd4dedfbcc8c11c850d357e1d7f689fb8431))
* implement code signing and notarization for macOS builds with detailed setup instructions in README ([1e7c2f0](https://github.com/IgorShadurin/offlinetools.org/commit/1e7c2f0687ce1f3e743ab6d1308666e7e7dd78c2))
* implement Ethereum Unit Converter feature ([7bb1aaf](https://github.com/IgorShadurin/offlinetools.org/commit/7bb1aafe1996f5986e55505ba4668ea5b423e196))
* simplify artifact naming and update release configurations for Windows, macOS, and Linux ([58ef57c](https://github.com/IgorShadurin/offlinetools.org/commit/58ef57cbb96985f17b859b9231c47d7a93c9d594))
* update build scripts to clarify ad-hoc signing in development builds ([8f15a8d](https://github.com/IgorShadurin/offlinetools.org/commit/8f15a8d36053bbcdc04f22a163f04e174a1791da))
* update lucide-react to version 0.510.0 and react/react-dom to version 19.1.0 ([1292e9c](https://github.com/IgorShadurin/offlinetools.org/commit/1292e9cbaa1600b77387a5cbca1b973440407281))
* update release workflows to include detailed download instructions for macOS and enhance artifact naming ([dc9a00e](https://github.com/IgorShadurin/offlinetools.org/commit/dc9a00e189b3ee51d13961dd610dbd321e5d4c60))


### Bug Fixes

* replace page.waitForFunction with safer selector patterns to avoid CSP violations ([c27cc83](https://github.com/IgorShadurin/offlinetools.org/commit/c27cc83a93ffe4d5c78523cfc962faf26a8f53cd))
* resolve decimal precision bug and implement desktop version ([5ba6bd2](https://github.com/IgorShadurin/offlinetools.org/commit/5ba6bd20edf85277917c9183f4fa52e321ffb466))
* resolve desktop TypeScript imports and test environment issues ([a6f764e](https://github.com/IgorShadurin/offlinetools.org/commit/a6f764ed5d33283831e52820d7e6eeec6aed279b))
* restore DISPLAY environment variable for Xvfb compatibility in CI ([55b0992](https://github.com/IgorShadurin/offlinetools.org/commit/55b0992313b630e2178a782627229f2702a47710))

## [1.4.0](https://github.com/IgorShadurin/offlinetools.org/compare/desktop-v1.3.0...desktop-v1.4.0) (2025-05-31)


### Features

* add icons for macOS and Linux builds in electron-builder configuration ([6c4875d](https://github.com/IgorShadurin/offlinetools.org/commit/6c4875da9114768e57ebf2d5277c1aa1a2153ef7))
* add macOS entitlements plist and update build configuration for resource paths ([d603dd4](https://github.com/IgorShadurin/offlinetools.org/commit/d603dd4dedfbcc8c11c850d357e1d7f689fb8431))
* implement code signing and notarization for macOS builds with detailed setup instructions in README ([1e7c2f0](https://github.com/IgorShadurin/offlinetools.org/commit/1e7c2f0687ce1f3e743ab6d1308666e7e7dd78c2))
* implement Ethereum Unit Converter feature ([7bb1aaf](https://github.com/IgorShadurin/offlinetools.org/commit/7bb1aafe1996f5986e55505ba4668ea5b423e196))
* simplify artifact naming and update release configurations for Windows, macOS, and Linux ([58ef57c](https://github.com/IgorShadurin/offlinetools.org/commit/58ef57cbb96985f17b859b9231c47d7a93c9d594))
* update build scripts to clarify ad-hoc signing in development builds ([8f15a8d](https://github.com/IgorShadurin/offlinetools.org/commit/8f15a8d36053bbcdc04f22a163f04e174a1791da))
* update lucide-react to version 0.510.0 and react/react-dom to version 19.1.0 ([1292e9c](https://github.com/IgorShadurin/offlinetools.org/commit/1292e9cbaa1600b77387a5cbca1b973440407281))
* update release workflows to include detailed download instructions for macOS and enhance artifact naming ([dc9a00e](https://github.com/IgorShadurin/offlinetools.org/commit/dc9a00e189b3ee51d13961dd610dbd321e5d4c60))


### Bug Fixes

* replace page.waitForFunction with safer selector patterns to avoid CSP violations ([c27cc83](https://github.com/IgorShadurin/offlinetools.org/commit/c27cc83a93ffe4d5c78523cfc962faf26a8f53cd))
* resolve decimal precision bug and implement desktop version ([5ba6bd2](https://github.com/IgorShadurin/offlinetools.org/commit/5ba6bd20edf85277917c9183f4fa52e321ffb466))
* resolve desktop TypeScript imports and test environment issues ([a6f764e](https://github.com/IgorShadurin/offlinetools.org/commit/a6f764ed5d33283831e52820d7e6eeec6aed279b))
* restore DISPLAY environment variable for Xvfb compatibility in CI ([55b0992](https://github.com/IgorShadurin/offlinetools.org/commit/55b0992313b630e2178a782627229f2702a47710))

## [1.3.0](https://github.com/IgorShadurin/offlinetools.org/compare/desktop-v1.2.0...desktop-v1.3.0) (2025-05-01)


### Features

* add Base64 Encoder/Decoder component and update app to include it ([44d77dd](https://github.com/IgorShadurin/offlinetools.org/commit/44d77dde9458047afb1f7cfe5d4b4f61f5d056f3))
* add button, card, select, textarea, and json formatter components with responsive design ([0db3942](https://github.com/IgorShadurin/offlinetools.org/commit/0db39421d50d785a3ae7302b670418fd2fd97886))
* add Clipboard Detector and related clipboard functionality for enhanced tool suggestions ([341e21e](https://github.com/IgorShadurin/offlinetools.org/commit/341e21e2f17499af905e71ee1c0593953b7c54a5))
* add e2e test for URL Decoder with improved visibility checks and screenshot handling ([0240759](https://github.com/IgorShadurin/offlinetools.org/commit/0240759962e1e6bed4f87fcdf272c9a27f194ca4))
* add e2e tests for Base64 encoder/decoder with improved visibility checks and screenshot handling ([2c177dd](https://github.com/IgorShadurin/offlinetools.org/commit/2c177dd3c94aade4c0df5fcac24f0963eb9bf26b))
* add e2e tests for JSON formatter with improved visibility checks and error handling ([ada178c](https://github.com/IgorShadurin/offlinetools.org/commit/ada178cbf4d85c86e90f9d499bd771104c4e8592))
* add GitHub Actions workflow for desktop tests with CI configuration and improved timeout settings ([ddfad39](https://github.com/IgorShadurin/offlinetools.org/commit/ddfad39fa70a7d52921ce1623b004879ef2bcb20))
* add GitHub Actions workflow for testing desktop application ([246839a](https://github.com/IgorShadurin/offlinetools.org/commit/246839a78085a86365455a32d4e4d762fc52d4cc))
* add initial Electron app structure with auto-update functionality ([a6a2384](https://github.com/IgorShadurin/offlinetools.org/commit/a6a2384ec3870c8d9b7f2e7ae779300d5f900199))
* add screenshot functionality to e2e tests for improved visual verification ([99fe22a](https://github.com/IgorShadurin/offlinetools.org/commit/99fe22a3bfd70add7383285f61d39d0c630f117a))
* add Tabs component for improved UI navigation in Base64Codec and UrlEncoder ([6f51fc6](https://github.com/IgorShadurin/offlinetools.org/commit/6f51fc669b0684b2d13633ee86546b287e26906a))
* add Tabs component for improved UI navigation in Base64Codec and UrlEncoder ([a32ef7a](https://github.com/IgorShadurin/offlinetools.org/commit/a32ef7af13d742a91f5d7f21a5f7106c56331c52))
* add URL Encoder/Decoder component with encoding and decoding functionality ([976da9a](https://github.com/IgorShadurin/offlinetools.org/commit/976da9ad01c0416bda01897858cdab8e7edd7e73))
* enhance Base64 decoder e2e test with improved visibility checks and screenshot captures ([fc636d5](https://github.com/IgorShadurin/offlinetools.org/commit/fc636d5186b7467ee0fb4aaf3266d5628d09fb78))
* enhance CI testing setup with system dependencies, screenshot handling, and improved timeouts ([bc18720](https://github.com/IgorShadurin/offlinetools.org/commit/bc18720e50cf6c1633971503c50173c11b3fc424))
* enhance e2e tests for JSON formatter with improved visibility checks and timeout handling ([3542a97](https://github.com/IgorShadurin/offlinetools.org/commit/3542a97b5bf2f6bf118c78033451ba9b3a53dde2))
* enhance testing framework with utility functions and improve test structure for URL Encoder/Decoder ([c36cce2](https://github.com/IgorShadurin/offlinetools.org/commit/c36cce2b8e6e715af4aa621e7cb8e13a7d694b15))
* enhance URL Encoder/Decoder e2e test with improved visibility checks and input handling ([0c579da](https://github.com/IgorShadurin/offlinetools.org/commit/0c579da5d479c13d51f12cddb1d681e89870de7d))
* implement JSON formatter tool with sidebar navigation and responsive layout ([a010c67](https://github.com/IgorShadurin/offlinetools.org/commit/a010c67160606698c59c5a169241a8a4a31e190e))
* improve Base64 encoder e2e test by replacing timeouts with visibility checks and enhancing screenshot captures ([1dbe300](https://github.com/IgorShadurin/offlinetools.org/commit/1dbe30043c673deb80c041b5ed12d695d549393a))
* improve Base64 encoder/decoder e2e tests with enhanced button interactions and screenshot handling ([cf3db02](https://github.com/IgorShadurin/offlinetools.org/commit/cf3db02e28cdfeaca84c2378e2f25b92dd8ae4e1))
* improve layout by restructuring CardHeader and adjusting padding in components ([67525a8](https://github.com/IgorShadurin/offlinetools.org/commit/67525a8ca4f8ad8f82f692b8e7b9863cca4000a3))
* refactor Base64Codec component for improved readability and structure ([82a1f9c](https://github.com/IgorShadurin/offlinetools.org/commit/82a1f9c9017ee62c52d6514e697fec91a3ed2408))
* refactor e2e tests to use navigateToTool and waitForComponentTitle for improved readability and maintainability ([b2b5cac](https://github.com/IgorShadurin/offlinetools.org/commit/b2b5cac071ce9ec7113fbf715beae7c795c07e58))
* refactor e2e tests to utilize new utility functions for textarea input and output handling ([8314717](https://github.com/IgorShadurin/offlinetools.org/commit/8314717c8d0c38bb02db30dd765aff5c07601ea3))
* refactor JsonFormatter component for improved layout and structure ([52dbe62](https://github.com/IgorShadurin/offlinetools.org/commit/52dbe629abc77130a5dd4613283bf16f3b4dfaba))
* refine UI components by removing unnecessary borders and adding margin for better layout ([00ae341](https://github.com/IgorShadurin/offlinetools.org/commit/00ae3418edcb4aa4850bd966ed3ec5036c7a25d6))
* remove TrayControls component from App for cleaner UI navigation ([b9b589d](https://github.com/IgorShadurin/offlinetools.org/commit/b9b589d0c06ef3eebeb3ab429f66092f8e877c97))
* remove unnecessary text-muted-foreground class for cleaner label styling ([42e4041](https://github.com/IgorShadurin/offlinetools.org/commit/42e404115afdc3b3e61545a7841d46b14b6228c2))
* update CI screenshot handling to create mock screenshots and adjust test artifact uploads ([2c538c6](https://github.com/IgorShadurin/offlinetools.org/commit/2c538c6731f91c7473ab3326bcd0de36432f622e))
* update e2e tests for Base64 and URL encoder with improved screenshot naming and output verification ([2eb673f](https://github.com/IgorShadurin/offlinetools.org/commit/2eb673fd26a5a9fafe79861f5701a881122534c6))
* update window dimensions and modify application title in main files ([7536318](https://github.com/IgorShadurin/offlinetools.org/commit/7536318ba8a07dbba875430db162f6103616db8c))


### Bug Fixes

* adjust select component styling and update page title in e2e tests ([bc74f6d](https://github.com/IgorShadurin/offlinetools.org/commit/bc74f6d70a67630be15ec57d4bacfbcedeffd9e4))
* improve error handling and null checks in e2e tests for Electron application ([4347a9c](https://github.com/IgorShadurin/offlinetools.org/commit/4347a9c6b9a1392861e22911e625d46661a3823b))
* simplify title text verification in e2e tests for Base64 decoder ([712d589](https://github.com/IgorShadurin/offlinetools.org/commit/712d58937e62fd58b0afa063e6ec30df4adc8dd4))
* update button text in e2e tests for clarity in encoding functionality ([f9839a7](https://github.com/IgorShadurin/offlinetools.org/commit/f9839a7e7d88ab0fdf22507f2f12de9b50e3492f))
* update import statement for path module to use namespace import ([56720cc](https://github.com/IgorShadurin/offlinetools.org/commit/56720cc90455979c3b9aae3cb0144a2c4cdab8f1))
* update import statement for React plugin to use default import ([3a5aab3](https://github.com/IgorShadurin/offlinetools.org/commit/3a5aab3bdcb8339f2012a3ca335b40962e45a058))

## [1.2.0](https://github.com/IgorShadurin/offlinetools.org/compare/desktop-v1.1.0...desktop-v1.2.0) (2025-05-01)


### Features

* add Base64 Encoder/Decoder component and update app to include it ([44d77dd](https://github.com/IgorShadurin/offlinetools.org/commit/44d77dde9458047afb1f7cfe5d4b4f61f5d056f3))
* add button, card, select, textarea, and json formatter components with responsive design ([0db3942](https://github.com/IgorShadurin/offlinetools.org/commit/0db39421d50d785a3ae7302b670418fd2fd97886))
* add Clipboard Detector and related clipboard functionality for enhanced tool suggestions ([341e21e](https://github.com/IgorShadurin/offlinetools.org/commit/341e21e2f17499af905e71ee1c0593953b7c54a5))
* add e2e test for URL Decoder with improved visibility checks and screenshot handling ([0240759](https://github.com/IgorShadurin/offlinetools.org/commit/0240759962e1e6bed4f87fcdf272c9a27f194ca4))
* add e2e tests for Base64 encoder/decoder with improved visibility checks and screenshot handling ([2c177dd](https://github.com/IgorShadurin/offlinetools.org/commit/2c177dd3c94aade4c0df5fcac24f0963eb9bf26b))
* add e2e tests for JSON formatter with improved visibility checks and error handling ([ada178c](https://github.com/IgorShadurin/offlinetools.org/commit/ada178cbf4d85c86e90f9d499bd771104c4e8592))
* add GitHub Actions workflow for desktop tests with CI configuration and improved timeout settings ([ddfad39](https://github.com/IgorShadurin/offlinetools.org/commit/ddfad39fa70a7d52921ce1623b004879ef2bcb20))
* add GitHub Actions workflow for testing desktop application ([246839a](https://github.com/IgorShadurin/offlinetools.org/commit/246839a78085a86365455a32d4e4d762fc52d4cc))
* add initial Electron app structure with auto-update functionality ([a6a2384](https://github.com/IgorShadurin/offlinetools.org/commit/a6a2384ec3870c8d9b7f2e7ae779300d5f900199))
* add screenshot functionality to e2e tests for improved visual verification ([99fe22a](https://github.com/IgorShadurin/offlinetools.org/commit/99fe22a3bfd70add7383285f61d39d0c630f117a))
* add Tabs component for improved UI navigation in Base64Codec and UrlEncoder ([6f51fc6](https://github.com/IgorShadurin/offlinetools.org/commit/6f51fc669b0684b2d13633ee86546b287e26906a))
* add Tabs component for improved UI navigation in Base64Codec and UrlEncoder ([a32ef7a](https://github.com/IgorShadurin/offlinetools.org/commit/a32ef7af13d742a91f5d7f21a5f7106c56331c52))
* add URL Encoder/Decoder component with encoding and decoding functionality ([976da9a](https://github.com/IgorShadurin/offlinetools.org/commit/976da9ad01c0416bda01897858cdab8e7edd7e73))
* enhance Base64 decoder e2e test with improved visibility checks and screenshot captures ([fc636d5](https://github.com/IgorShadurin/offlinetools.org/commit/fc636d5186b7467ee0fb4aaf3266d5628d09fb78))
* enhance CI testing setup with system dependencies, screenshot handling, and improved timeouts ([bc18720](https://github.com/IgorShadurin/offlinetools.org/commit/bc18720e50cf6c1633971503c50173c11b3fc424))
* enhance e2e tests for JSON formatter with improved visibility checks and timeout handling ([3542a97](https://github.com/IgorShadurin/offlinetools.org/commit/3542a97b5bf2f6bf118c78033451ba9b3a53dde2))
* enhance testing framework with utility functions and improve test structure for URL Encoder/Decoder ([c36cce2](https://github.com/IgorShadurin/offlinetools.org/commit/c36cce2b8e6e715af4aa621e7cb8e13a7d694b15))
* enhance URL Encoder/Decoder e2e test with improved visibility checks and input handling ([0c579da](https://github.com/IgorShadurin/offlinetools.org/commit/0c579da5d479c13d51f12cddb1d681e89870de7d))
* implement JSON formatter tool with sidebar navigation and responsive layout ([a010c67](https://github.com/IgorShadurin/offlinetools.org/commit/a010c67160606698c59c5a169241a8a4a31e190e))
* improve Base64 encoder e2e test by replacing timeouts with visibility checks and enhancing screenshot captures ([1dbe300](https://github.com/IgorShadurin/offlinetools.org/commit/1dbe30043c673deb80c041b5ed12d695d549393a))
* improve Base64 encoder/decoder e2e tests with enhanced button interactions and screenshot handling ([cf3db02](https://github.com/IgorShadurin/offlinetools.org/commit/cf3db02e28cdfeaca84c2378e2f25b92dd8ae4e1))
* improve layout by restructuring CardHeader and adjusting padding in components ([67525a8](https://github.com/IgorShadurin/offlinetools.org/commit/67525a8ca4f8ad8f82f692b8e7b9863cca4000a3))
* refactor Base64Codec component for improved readability and structure ([82a1f9c](https://github.com/IgorShadurin/offlinetools.org/commit/82a1f9c9017ee62c52d6514e697fec91a3ed2408))
* refactor e2e tests to use navigateToTool and waitForComponentTitle for improved readability and maintainability ([b2b5cac](https://github.com/IgorShadurin/offlinetools.org/commit/b2b5cac071ce9ec7113fbf715beae7c795c07e58))
* refactor e2e tests to utilize new utility functions for textarea input and output handling ([8314717](https://github.com/IgorShadurin/offlinetools.org/commit/8314717c8d0c38bb02db30dd765aff5c07601ea3))
* refactor JsonFormatter component for improved layout and structure ([52dbe62](https://github.com/IgorShadurin/offlinetools.org/commit/52dbe629abc77130a5dd4613283bf16f3b4dfaba))
* refine UI components by removing unnecessary borders and adding margin for better layout ([00ae341](https://github.com/IgorShadurin/offlinetools.org/commit/00ae3418edcb4aa4850bd966ed3ec5036c7a25d6))
* remove TrayControls component from App for cleaner UI navigation ([b9b589d](https://github.com/IgorShadurin/offlinetools.org/commit/b9b589d0c06ef3eebeb3ab429f66092f8e877c97))
* remove unnecessary text-muted-foreground class for cleaner label styling ([42e4041](https://github.com/IgorShadurin/offlinetools.org/commit/42e404115afdc3b3e61545a7841d46b14b6228c2))
* update CI screenshot handling to create mock screenshots and adjust test artifact uploads ([2c538c6](https://github.com/IgorShadurin/offlinetools.org/commit/2c538c6731f91c7473ab3326bcd0de36432f622e))
* update e2e tests for Base64 and URL encoder with improved screenshot naming and output verification ([2eb673f](https://github.com/IgorShadurin/offlinetools.org/commit/2eb673fd26a5a9fafe79861f5701a881122534c6))
* update window dimensions and modify application title in main files ([7536318](https://github.com/IgorShadurin/offlinetools.org/commit/7536318ba8a07dbba875430db162f6103616db8c))


### Bug Fixes

* adjust select component styling and update page title in e2e tests ([bc74f6d](https://github.com/IgorShadurin/offlinetools.org/commit/bc74f6d70a67630be15ec57d4bacfbcedeffd9e4))
* improve error handling and null checks in e2e tests for Electron application ([4347a9c](https://github.com/IgorShadurin/offlinetools.org/commit/4347a9c6b9a1392861e22911e625d46661a3823b))
* simplify title text verification in e2e tests for Base64 decoder ([712d589](https://github.com/IgorShadurin/offlinetools.org/commit/712d58937e62fd58b0afa063e6ec30df4adc8dd4))
* update button text in e2e tests for clarity in encoding functionality ([f9839a7](https://github.com/IgorShadurin/offlinetools.org/commit/f9839a7e7d88ab0fdf22507f2f12de9b50e3492f))
* update import statement for path module to use namespace import ([56720cc](https://github.com/IgorShadurin/offlinetools.org/commit/56720cc90455979c3b9aae3cb0144a2c4cdab8f1))
* update import statement for React plugin to use default import ([3a5aab3](https://github.com/IgorShadurin/offlinetools.org/commit/3a5aab3bdcb8339f2012a3ca335b40962e45a058))

## [1.1.0](https://github.com/IgorShadurin/offlinetools.org/compare/desktop-v1.0.0...desktop-v1.1.0) (2025-05-01)


### Features

* add Base64 Encoder/Decoder component and update app to include it ([44d77dd](https://github.com/IgorShadurin/offlinetools.org/commit/44d77dde9458047afb1f7cfe5d4b4f61f5d056f3))
* add button, card, select, textarea, and json formatter components with responsive design ([0db3942](https://github.com/IgorShadurin/offlinetools.org/commit/0db39421d50d785a3ae7302b670418fd2fd97886))
* add Clipboard Detector and related clipboard functionality for enhanced tool suggestions ([341e21e](https://github.com/IgorShadurin/offlinetools.org/commit/341e21e2f17499af905e71ee1c0593953b7c54a5))
* add e2e test for URL Decoder with improved visibility checks and screenshot handling ([0240759](https://github.com/IgorShadurin/offlinetools.org/commit/0240759962e1e6bed4f87fcdf272c9a27f194ca4))
* add e2e tests for Base64 encoder/decoder with improved visibility checks and screenshot handling ([2c177dd](https://github.com/IgorShadurin/offlinetools.org/commit/2c177dd3c94aade4c0df5fcac24f0963eb9bf26b))
* add e2e tests for JSON formatter with improved visibility checks and error handling ([ada178c](https://github.com/IgorShadurin/offlinetools.org/commit/ada178cbf4d85c86e90f9d499bd771104c4e8592))
* add GitHub Actions workflow for desktop tests with CI configuration and improved timeout settings ([ddfad39](https://github.com/IgorShadurin/offlinetools.org/commit/ddfad39fa70a7d52921ce1623b004879ef2bcb20))
* add GitHub Actions workflow for testing desktop application ([246839a](https://github.com/IgorShadurin/offlinetools.org/commit/246839a78085a86365455a32d4e4d762fc52d4cc))
* add initial Electron app structure with auto-update functionality ([a6a2384](https://github.com/IgorShadurin/offlinetools.org/commit/a6a2384ec3870c8d9b7f2e7ae779300d5f900199))
* add screenshot functionality to e2e tests for improved visual verification ([99fe22a](https://github.com/IgorShadurin/offlinetools.org/commit/99fe22a3bfd70add7383285f61d39d0c630f117a))
* add Tabs component for improved UI navigation in Base64Codec and UrlEncoder ([6f51fc6](https://github.com/IgorShadurin/offlinetools.org/commit/6f51fc669b0684b2d13633ee86546b287e26906a))
* add Tabs component for improved UI navigation in Base64Codec and UrlEncoder ([a32ef7a](https://github.com/IgorShadurin/offlinetools.org/commit/a32ef7af13d742a91f5d7f21a5f7106c56331c52))
* add URL Encoder/Decoder component with encoding and decoding functionality ([976da9a](https://github.com/IgorShadurin/offlinetools.org/commit/976da9ad01c0416bda01897858cdab8e7edd7e73))
* enhance Base64 decoder e2e test with improved visibility checks and screenshot captures ([fc636d5](https://github.com/IgorShadurin/offlinetools.org/commit/fc636d5186b7467ee0fb4aaf3266d5628d09fb78))
* enhance CI testing setup with system dependencies, screenshot handling, and improved timeouts ([bc18720](https://github.com/IgorShadurin/offlinetools.org/commit/bc18720e50cf6c1633971503c50173c11b3fc424))
* enhance e2e tests for JSON formatter with improved visibility checks and timeout handling ([3542a97](https://github.com/IgorShadurin/offlinetools.org/commit/3542a97b5bf2f6bf118c78033451ba9b3a53dde2))
* enhance testing framework with utility functions and improve test structure for URL Encoder/Decoder ([c36cce2](https://github.com/IgorShadurin/offlinetools.org/commit/c36cce2b8e6e715af4aa621e7cb8e13a7d694b15))
* enhance URL Encoder/Decoder e2e test with improved visibility checks and input handling ([0c579da](https://github.com/IgorShadurin/offlinetools.org/commit/0c579da5d479c13d51f12cddb1d681e89870de7d))
* implement JSON formatter tool with sidebar navigation and responsive layout ([a010c67](https://github.com/IgorShadurin/offlinetools.org/commit/a010c67160606698c59c5a169241a8a4a31e190e))
* improve Base64 encoder e2e test by replacing timeouts with visibility checks and enhancing screenshot captures ([1dbe300](https://github.com/IgorShadurin/offlinetools.org/commit/1dbe30043c673deb80c041b5ed12d695d549393a))
* improve Base64 encoder/decoder e2e tests with enhanced button interactions and screenshot handling ([cf3db02](https://github.com/IgorShadurin/offlinetools.org/commit/cf3db02e28cdfeaca84c2378e2f25b92dd8ae4e1))
* improve layout by restructuring CardHeader and adjusting padding in components ([67525a8](https://github.com/IgorShadurin/offlinetools.org/commit/67525a8ca4f8ad8f82f692b8e7b9863cca4000a3))
* refactor Base64Codec component for improved readability and structure ([82a1f9c](https://github.com/IgorShadurin/offlinetools.org/commit/82a1f9c9017ee62c52d6514e697fec91a3ed2408))
* refactor e2e tests to use navigateToTool and waitForComponentTitle for improved readability and maintainability ([b2b5cac](https://github.com/IgorShadurin/offlinetools.org/commit/b2b5cac071ce9ec7113fbf715beae7c795c07e58))
* refactor e2e tests to utilize new utility functions for textarea input and output handling ([8314717](https://github.com/IgorShadurin/offlinetools.org/commit/8314717c8d0c38bb02db30dd765aff5c07601ea3))
* refactor JsonFormatter component for improved layout and structure ([52dbe62](https://github.com/IgorShadurin/offlinetools.org/commit/52dbe629abc77130a5dd4613283bf16f3b4dfaba))
* refine UI components by removing unnecessary borders and adding margin for better layout ([00ae341](https://github.com/IgorShadurin/offlinetools.org/commit/00ae3418edcb4aa4850bd966ed3ec5036c7a25d6))
* remove TrayControls component from App for cleaner UI navigation ([b9b589d](https://github.com/IgorShadurin/offlinetools.org/commit/b9b589d0c06ef3eebeb3ab429f66092f8e877c97))
* remove unnecessary text-muted-foreground class for cleaner label styling ([42e4041](https://github.com/IgorShadurin/offlinetools.org/commit/42e404115afdc3b3e61545a7841d46b14b6228c2))
* update CI screenshot handling to create mock screenshots and adjust test artifact uploads ([2c538c6](https://github.com/IgorShadurin/offlinetools.org/commit/2c538c6731f91c7473ab3326bcd0de36432f622e))
* update e2e tests for Base64 and URL encoder with improved screenshot naming and output verification ([2eb673f](https://github.com/IgorShadurin/offlinetools.org/commit/2eb673fd26a5a9fafe79861f5701a881122534c6))
* update window dimensions and modify application title in main files ([7536318](https://github.com/IgorShadurin/offlinetools.org/commit/7536318ba8a07dbba875430db162f6103616db8c))


### Bug Fixes

* adjust select component styling and update page title in e2e tests ([bc74f6d](https://github.com/IgorShadurin/offlinetools.org/commit/bc74f6d70a67630be15ec57d4bacfbcedeffd9e4))
* improve error handling and null checks in e2e tests for Electron application ([4347a9c](https://github.com/IgorShadurin/offlinetools.org/commit/4347a9c6b9a1392861e22911e625d46661a3823b))
* simplify title text verification in e2e tests for Base64 decoder ([712d589](https://github.com/IgorShadurin/offlinetools.org/commit/712d58937e62fd58b0afa063e6ec30df4adc8dd4))
* update button text in e2e tests for clarity in encoding functionality ([f9839a7](https://github.com/IgorShadurin/offlinetools.org/commit/f9839a7e7d88ab0fdf22507f2f12de9b50e3492f))
* update import statement for path module to use namespace import ([56720cc](https://github.com/IgorShadurin/offlinetools.org/commit/56720cc90455979c3b9aae3cb0144a2c4cdab8f1))
* update import statement for React plugin to use default import ([3a5aab3](https://github.com/IgorShadurin/offlinetools.org/commit/3a5aab3bdcb8339f2012a3ca335b40962e45a058))
