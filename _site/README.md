# innovate.solarwinds.io

## Prerequisites
**Ruby** - [Installation guide](https://www.ruby-lang.org/en/documentation/installation/)

**Node** - [Installation guide](https://nodejs.org/en/download/)

**Jekyll and Bundler Gems** - Once Ruby is installed, run the following command to install Jekyll and Bundler (fetches gem dependencies within Jekyll app):

```
gem install jekyll bundler
```

## Serving the Site
After cloning, install local dependencies:

```
bundle install
```

Then, you'll want to create the build for the static site:

```
npm run build
```

And then you can serve it. It will automatically watch for changes to your files, except the main _config.yml file.

```
npm run start
```