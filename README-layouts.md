# Rslidy Layout Guide

This guide demonstrates the main layout options available in
**Rslidy**, based on provided templates. It covers title slides,
simple slide layouts and multi-column layouts.

---

## 1. Title Slide
Use the `rslidy-titleslide` class for the opening slide. Include
title, subtitle, affiliation, and licence.

**Example**:
```html
<section class="rslidy-titleslide">
  <h1>Rslidy Layouts</h1>
  <h2>Titleslide</h2>
  <h4>Graz University of Technology, Austria</h4>

  <div id="licence">
    <p>
      © Copyright 2025 by the author(s), except as otherwise
      noted.<br/>
      This work is placed under a Creative Commons Attribution
      4.0 International
      (<a href="https://creativecommons.org/licenses/by/4.0/">
      CC BY 4.0</a>) licence.
    </p>
  </div>
</section>
```








## 2. Simple Slide Layouts with Content Elements
### 2.1 Simple Bullet Points
Create a slide with an unordered bullet list.

**Example**:
```html
<section>
  <h1>Simple Bullet Points</h1>
  <ul>
    <li>Bullet Point 1</li>
    <li>Bullet Point 2</li>
    <li>Bullet Point 3</li>
    <li>Bullet Point 4</li>
    <li>Bullet Point 5</li>
  </ul>
</section>
```






### 2.2 Single Image Layout
Insert a responsive image that supports pan and zoom
interactions using the `rslidy-large-images` or `rslidy-images` class.

**Example**:
```html
<section>
  <h2>Single Image Layout</h2>
  <figure>
    <div class="rslidy-large-images">
      <img src="images/image_viewer_example_slide.png"
           alt="Rslidy Image Viewer"/>
    </div>
    <figcaption>
      The image viewer is automatically attached to every
      image.<br/>
      Pan and zoom via mouse, keyboard, or on-screen
      controls.<br/>
      <span class="credit">Screen capture taken from Rslidy.
      </span>
    </figcaption>
  </figure>
</section>
```






### 2.3 Single Video Layout
Embed a video inside a figure.

**Example**:
```html
<section>
  <h2>Single Video Layout</h2>
  <figure>
    <div class="rslidy-large-images">
      <video controls autoplay muted loop
             poster="images/all-slides.gif">
        <source src="images/image-viewer.mp4"
                type="video/mp4"/>
        <img src="images/image-viewer.gif"
             alt="All slides view preview" />
      </video>
    </div>
    <figcaption>
      Showing the image viewer as an mp4 video.<br/>
      <span class="credit">Screen capture taken from Rslidy.
      </span>
    </figcaption>
  </figure>
</section>
```





## 3. Multi-Column Layouts

### 3.1 Two-Columns Bullet Points

Divide the slide into two evenly sized columns with bullet points on 
both sides.

**Example**:
```html
<section>
  <h1>Two-Columns Bullet Points</h1>
  <div class="rslidy-columns-even">
    <div class="rslidy-left-column">
      <ul>
        <li>Left Bullet Point 1</li>
        <li>Left Bullet Point 2</li>
        <li>Left Bullet Point 3</li>
        <li>Left Bullet Point 4</li>
        <li>Left Bullet Point 5</li>
      </ul>
    </div>
    <div class="rslidy-right-column">
      <ul>
        <li>Right Bullet Point 1</li>
        <li>Right Bullet Point 2</li>
        <li>Right Bullet Point 3</li>
        <li>Right Bullet Point 4</li>
        <li>Right Bullet Point 5</li>
      </ul>
    </div>
  </div>
</section>
```






### 3.2 Bullet Points Left – Image Right

Combine text on the left with an image on the right.

**Example**:
```html
<section>
  <h1>Bullet Points Left - Image Right</h1>
  <div class="rslidy-columns-even">
    <div class="rslidy-left-column">
      <ul>
        <li>Bullet Point 1</li>
        <li>Bullet Point 2</li>
        <li>Bullet Point 3</li>
        <li>Bullet Point 4</li>
        <li>Bullet Point 5</li>
      </ul>
    </div>
    <div class="rslidy-right-column">
      <figure>
        <div class="rslidy-images">
          <img src="images/rslidy_example_slide.png"
               alt="example slide Rslidy: Example Slide"/>
        </div>
        <figcaption>Rslidy: Example slide.</figcaption>
      </figure>
    </div>
  </div>
</section>
```






### 3.3 Two Images Layout

Display images side-by-side.

**Example**:
```html
<section>
  <h1>Two Image Layout</h1>
  <div class="rslidy-columns-even">
    <div class="rslidy-left-column">
      <figure>
        <div class="rslidy-images">
          <img src="images/rslidy_example_slide.png"
               alt="Example Slide"/>
        </div>
        <figcaption>Rslidy: Example slide.</figcaption>
      </figure>
    </div>
    <div class="rslidy-right-column">
      <figure>
        <div class="rslidy-images">
          <img src="images/rslidy_example_slide.png"
               alt="Example Slide"/>
        </div>
        <figcaption>Rslidy: Example slide.</figcaption>
      </figure>
    </div>
  </div>
</section>
```







### 3.4 One Image – One Video

Mix an image on the left with a video on the right.

**Example**:
```html
<section>
  <h1>One Image - One Video</h1>
  <div class="rslidy-columns-even">
    <div class="rslidy-left-column">
      <figure>
        <div class="rslidy-large-images">
          <img src="images/rslidy_example_slide.png"
               alt="Example Slide"/>
        </div>
        <figcaption>Rslidy: Example slide.</figcaption>
      </figure>
    </div>
    <div class="rslidy-right-column">
      <figure>
        <div class="rslidy-large-images">
          <video controls autoplay muted loop
                 poster="images/all-slides.gif">
            <source src="images/image-viewer.mp4"
                    type="video/mp4"/>
            <img src="images/image-viewer.gif"
                 alt="Preview animation"/>
          </video>
        </div>
        <figcaption>
          Showing the image viewer as an mp4 video.<br/>
          <span class="credit">Screen capture taken from
          Rslidy.</span>
        </figcaption>
      </figure>
    </div>
  </div>
</section>
```


