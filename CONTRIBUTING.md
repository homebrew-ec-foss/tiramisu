# Contributing to the HSP site

* [Contribution Guide](#contribution-guide)
    * [Git Commit Message Guidelines](#git-commit-message-guidelines)
    * [Guide for members list](#guide-for-members-list)
    * [Guide for design posts](#guide-for-design-posts)

## Contribution Guide

To make yourselves familiar with the [static site generator](https://en.wikipedia.org/wiki/Static_site_generator),
while working with layouts, we recommend going through the [documentation](https://anna-docs.netlify.app/docs)

> A guide to install and use "anna", the custom static-site generator used to build this site, can be found [here](https://anna-docs.netlify.app/quick-start).

## Setting up Git

> Skip this if you know how to clone and push to GitHub

The easiest way to setup git and ssh is to use the official `gh-cli` app

1. Sign up for a GitHub account.
2. Install the cli app from: [here](http://github.com/cli/cli#installation)
3. Open your terminal and run: `gh auth login` to login to your GitHub account
4. Follow the prompts. Select `SSH` as the preferred option and let it generate an SSH key.
6. Visit: https://github.com/homebrew-ec-foss/tiramisu/ and fork this repo
5. To test, clone the forked repo using `gh repo clone yourusername/tiramisu`

---

### Git Commit Message Guidelines

Refer to the following
[article](https://www.conventionalcommits.org/en/v1.0.0/) regarding writing
conventional git commit messages to make it easier for the maintainers to
understand the PRs and progress.

Posts can be written normally in markdown
to the CommonMark markdown specifications
found [here](http://commonmark.org)

---

### Guide for members list

> This is only for HSP Members

To add your name to the list of members section of the site, follow these steps

Make a copy of the sample `FirstLastName.md.example` `markdown` file to
`site/content/members`.

**Note**

`SocialsName` could either be `Linkedin`, `Github`, `Instagram`, `X`, etc. If
you would like to link any other social account, add the key name, and also
save an svg of the icon to that social provider at `/static/icons/SocialsName.svg`,
otherwise there wouldn't be any icons available to display.

Feel free to look at the other member's `.md` posts for ref.

---

### Guide for posts

-   Any small writeup on the inspiration, thought process behind the designs would be appreciated
-   Design posts can be added under `site/content/design/EVENT_NAME.md` and must follow the following frontmatter template

```yaml
---
title: EVENT NAME
date: "YYYY-MM-DD"
tags: [TAG-1, TAG-2]
collections: [design]
description: ...
authors: ["Author Name 1", "Author Name 2"]
previewimage: path to a square preview image
layout: design
---
```

-   Inorder to include _grid based images_ similar to what is on display in the `/gallery` page of the site,
    place all images inside a div in the markdown file as follows

```md
// snip of a blog

<div class="img-grid">

![alt text for image - necessary](path_to_image)

![alt text for image - necessary](path_to_image)

![alt text for image - necessary](path_to_image)

</div>
```

> Do keep in mind the mandatory spaces between each of the image lines!
