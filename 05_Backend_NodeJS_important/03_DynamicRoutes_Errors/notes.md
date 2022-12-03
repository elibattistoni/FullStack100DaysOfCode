List of HTTP status codes https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

# Route Parameters vs Query Parameters

Query Parameters vs Route Parameters [Day 53]

## Route Parameters in "Dynamic Routes"

In this section, you learned about "dynamic routes" that utilize route parameters to extract dynamic values from the URL path.

For example:

    router.get('/restaurants/:id', ...)

In this example, id is a route parameter that will hold different values when this URL / path is visited. For example, if a user enters /restaurants/r1, id will be equal to r1.

Route parameters are super useful as they allow us to use one single route to load different data based on the concrete route parameter value.

It is important to understand that the route parameter (:id in the above example) is a key part of the URL path. Just /restaurants would NOT be handled by the above route for example - because it's missing a value for the route parameter.

## Query Parameters

We also learned about a concept called "query parameters" in this section.

It's easy to mix up "query parameters" and "route parameters" but these are fundamentally different concepts that solve different problems.

Where "route parameters" (see above) are NOT optional and a key part of the route definition (i.e. the load won't become active if no value is provided for the route parameter), "query parameters" are totally optional!

"Query parameters" are typically used to add extra information to a URL path.

For example:

    /restaurants?order=asc

Here the "order" query parameter is added with a value of "asc" (query parameters are always separated from the "main path" via the ? symbol).

Out of the box, a query parameter does nothing! 

Visitors of a website can add as many of them as you want. You can add them via links or by submitting a form via a GET request as shown in the previous lecture (as a side-note: Instead of a GET form, we could've also constructed a link with a query parameter in the previous lecture - but I did want to introduce the idea of hidden input fields).

It's up to you, the developer, to add code that might handle such an optional query parameter to do some extra work on the server-side - for example, you could change the ordering of the items in an array (as shown in the last lecture), you could filter items or do anything else.
Route Parameters vs Query Parameters

As explained above, query parameters are optional and NOT a key part of the route path, route parameters on the other hand are!

Route parameters are used to determine which route should become active and then they can be parsed inside of the route to get the concrete value for the route parameter (e.g. a restaurant id).

Query parameters on the other hand are optional and you typically don't use them for determining which route should be executed - instead they can be used for attaching extra information to a loaded route / URL.