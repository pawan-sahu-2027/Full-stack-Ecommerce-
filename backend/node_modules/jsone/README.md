# jsone

a format to reference a node within a json object

## data

The data encoded into jsone is a sequence of keys.

## improper jsone

*Improper jsone* is a superset of *proper jsone*.

The keys are given using dot notation or square bracket notation. A key in
dot notation must be a valid JavaScript identifier. The key in bracket
notation may be an integer or a string.

Dot notation is as follows:

key             | dot notation
--------------- | ----------------------------------------------------------
`"hello"`       | `.hello`
`"helloWorld"`  | `.helloWorld`
`"hello_world"` | `.hello_world`
`"hello-world"` | Not a JavaScript identifier. Use bracket notation instead.
`1`             | Not a JavaScript identifier. Use bracket notation instead.

If a dot notation key appears first, the dot must be omitted.

Examples:

jsone           | parsed
--------------- | ----------------------------------------------------------
`name`          | `["name"]`
`location.city` | `["location", "city"]`
`.name`         | Invalid. The dot must be omitted from the first key.

In bracket notation, the name of the key is quoted, unless it's an integer,
in which case it can be unquoted. The integers are returned by `parse()` as
numbers. Examples:

jsone                        | parsed
---------------------------- | ----------------------------------------------------------
`[1]`                        | `[1]`
`['Your name']`              | `["Your name"]`
`['employees'][0]['name']`   | `["employees", 0, "name"]`
`["http://example.com/"][0]` | `["http://example.com/", 0]`

Both dot notation and bracket notation can be combined. Examples:

jsone                                     | parsed
----------------------------------------- | ----------------------------------------------------------
`[0].name`                                | `[0, "name"]`
`employees[0].name`                       | `["employees", 0, "name"]`
`urls['http://www.google.com/'].visits`   | `["employees", 0, "name"]`

## proper jsone

*Improper jsone* is perfectly fine as input, and it should be treated as 
such. However, for output, and where unambiguity is needed, *proper jsone*
should be used.

In *proper jsone*:

* a key that is a valid identifier must be given using dot notation.
* an integer identifier must not include quotes
* a non-integer identifier must be quoted using single quotes

## LICENSE

[MIT](http://bat.mit-license.org/).
