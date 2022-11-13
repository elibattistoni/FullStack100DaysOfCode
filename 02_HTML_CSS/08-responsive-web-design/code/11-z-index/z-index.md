# Lecture 180: z-index

Introducing the "z-index" Property [Day 24]
The z-index - What & Why?

We learned about the document flow and how to change the default positioning of HTML elements with the position property.

By changing the default element position, you might come across a situation were one element is overlapping the other one and where you want to control, which element is positioned above the other.

For such cases, the z-index is required.

How does it work

The z-index , a CSS property, defines the z-order of a positioned element (i.e. an element with the position property applied with a value different than static). The z-order refers to the z-axis, so it controls how elements are stacked above it each other if applicable.

The default value for HTML elements is set to auto, which is aquivalent to 0. Positioned elements with a higher z-index are positioned above elements with a lower value for the z-index.

Code example

HTML

    <body>
        <div id="first">Element 1</div>
        <div id="second">Element 2</div>
    </body>

CSS

    div {
        width: 200px;
        height: 200px;
        text-align: center;
        color: white;
    }
     
    #first {
        background-color: rgb(55, 117, 209);
    }
     
    #second {
        background-color: rgb(233, 137, 59);
    }

By default, both elements follow the document flow, element 1 is displayed first, element 2 is displayed second, one after another.

Now add the following code to #second:

        position: absolute;
        top: 0;
        left: 0;

Element 2 is taken out of the document flow and displayed on top of element 1.

Adding z-index: 1 to #first does not change the order of the elements along the z-axis, as the z-index only has an impact on positioned elements, excluding the default value position: static.

Adding position: relative to #first, will display element 1 above element 2 again.