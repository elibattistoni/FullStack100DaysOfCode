# MDN Front-End developer course
https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer


--------------------------------------------------------------------------------
# 1. HTML References
--------------------------------------------------------------------------------

# HTML Introduction
https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML

# HTML Elements reference IMPORTANT
https://developer.mozilla.org/en-US/docs/Web/HTML/Element

# HTML head metadata
https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML

# Absolute vs Relative URLs
https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#absolute_versus_relative_urls

# Document and website structure
https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure

# Debugging HTML
https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML

# Images, Figures and Captions
https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML#annotating_images_with_figures_and_figure_captions

# iframe
https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies

# SVG and vector graphics
https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web

# Responsive images
https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images


--------------------------------------------------------------------------------
# 2. CSS Reference
--------------------------------------------------------------------------------

# MDN CSS
https://developer.mozilla.org/en-US/docs/Web/CSS



# CASCADE & INHERITANCE
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance
# The CSS Cascade
https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade
# CSS Specificity
https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
# CSS Inheritance
https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance
# Controlling Inheritance
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#controlling_inheritance



# CSS Selectors
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
### Pseudo Selectors or Pseudo Classes
https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
### Selectors combinators
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators



# CSS Box Model
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model





# Margin collapsing
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing

# display property
https://developer.mozilla.org/en-US/docs/Web/CSS/display

# calc() function, transform function
https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#functions

# @rules
https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#rules

# shorthands
https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured#rules

# CSS debugging
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Debugging_CSS

--------------------------------------------------------------------------------
# 3. Other notes from the course
--------------------------------------------------------------------------------
{
    padding: top right bottom left;
    margin: vertical horizontal;
    magin: all;
}

text-align: center --> centers the CONTENT inside of an element

id --> for unique elements

### Inline elements vs Block elements
https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements

top and bottom margin or padding do not work on inline elements
so you can change them by using:
display: inline-block --> it can be displyed in the same line (not in a new line like block elements) but we can apply top and bottom margins and top and bottom padding
hiwhc now affects the distance to the other elements

**margin collapsing** it happens between adjacent elements --> the larger margin wins: it happens only for vertical margins and for blocke elements

**span** is a non semantic inline element
**div** non semantic block element