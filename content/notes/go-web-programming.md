---
title: "Go Web Programming"
date: 2023-04-12T13:54:21+08:00
draft: true
---

This note is taken when reading the book *Go Web Programming*.

# Intro

## HTTP request

HTTP request consists of:
1. request-line
2. zero or more request header
3. an empty line
4. the message body (optional)

```http
GET /Protocols/rfc2616/rfc2616.html HTTP/1.1
Host: www.w3.org
User-Agent: Mozilla/5.0 
(empty line)
```

## HTTPS

SSL (Secure Socket Layer) is a protocol that provides data encryption and authentication between two parties, usually a client and a server, using Public Key Infrastructure (PKI). SSL was originally developed by Netscape and was later taken over by the Internet Engineering Task Force (IETF), which renamed it TLS.

HTTPS, or HTTP over SSL, is essentially just that—HTTP layered over an SSL/TLS connection.
### request-line

Request-line consists of:
1. request method
2. the Uniform Resource Identifier (URI)
3. the version of HTTP

#### request methods

Request method defines the action requested by the calling client.

- GET: Tells the server to return the specified resource. 
- HEAD: The same as GET except that the server must not return a message body.
- POST: Tells the server that the data in the message body should be passed to the resource identified by the URI.
- PUT: Tells the server that the data in the message body should be the resource at the given URI.
- DELETE: Tells the server to remove the resource identified by the URI.

Type of request methods:
- safe: it doesn't change the state of the server (GET, HEAD).
- idempotent: state of the server doesn't change the second time the method is called with the same data (PUT, DELETE, GET, HEAD).

### request header

Information on the request or the client is placed in HTTP request headers

Request headers are colon-separated name-value pairs in plain text, terminated by a carriage return and line feed.

- Accept: Content types that are acceptable by the client as part of the HTTP response.
- Authorization: This is used to send Basic Authentication credentials to the server.

## HTTP response

1. a status line
2. zero or more response headers
3. an empty line
4. the message body (optional)

### response status code

- 1XX: Informational. The server has already received the request and is processing it.
- 2XX: Success
- 3XX: Redirection
- 4XX: Client Error
- 5XX: Server Error

### response header

The response headers are the means for the server to tell the client more about the response and what the server wants.

### URI

```text
<scheme name> : <hierarchical part> [ ? <query> ] [ # <fragment> ]
```

Only the scheme name and the hierarchical parts are mandatory. The query, which starts with `?`, is optional and contains other information that's not hierarchical in nature. The query is often organized as a sequence of key-value pairs, separated by `&`.

Another optional part is the fragment, which is an identifier to a secondary resource that's part of the URI that's defined. The fragment starts after the `#`. If a URI has a query, the fragment will follow the query.

## web app

A web application:
1. Takes input through HTTP from the client in the form of an HTTP request message
2. Processes the HTTP request message and performs necessary work
3. Generates HTML and returns it in an HTTP response message

### handler

A handler receives and processes the HTTP request sent from the client. It also calls the template engine to generate the HTML and finally bundles data into the HTTP response to be sent back to the client. 

### template engine

A template engine generates the final HTML using templates and data.

# HTTP requests

Creating a server is trivial and can be done with a call to `ListenAndServe()`, with the network address as the first parameter and the handler that takes care of the requests the second parameter

```go
func ListenAndServe(addr string, handler Handler) error
```

- If the network address is an empty string, the default is all network interfaces at port 80.
- If the handler parameter is nil, the default multiplexer, `DefaultServeMux`, is used. 

example:
```go
package main

import (
  "net/http"
)

func main() {
  http.ListenAndServe("", nil)
}
```

more configuration:
```go
package main

import (
  "net/http"
)

func main() {
  server := http.Server{
    Addr: "127.0.0.1:8080",
    Handler: nil,
  }
  server.ListenAndServe()
}
```

## handler

A handler is an interface that has a method named `ServeHTTP`:
```go
type Handler interface {
  ServeHTTP(ResponseWriter, *Request)
}
```

- Q: Why the default handler is a multiplexer?
- A: A `ServeMux` is also an instance of the `Handler` struct.

## multiple handlers

Handle registers the handler for the given pattern in the `DefaultServeMux`.
```go
func Handle(pattern string, handler Handler)
```
## handler function

Handler functions are functions that behave like handlers. Handler functions have the same signature as the `ServeHTTP` method; that is, they accept a `ResponseWriter` and a pointer to a Request.

In other words, handler functions are merely convenient ways of creating handlers.
```go
func HandleFunc(pattern string, handler func(ResponseWriter, *Request))
```

## multiplexer

`ServeMux` is an HTTP request multiplexer. It accepts an HTTP request and redirects it to the correct handler according to the URL in the request.

ServeMux is a struct with a map of entries that map a URL to a handler. `ServeMux`’s `ServeHTTP` method finds the URL most closely matching the requested one and calls the corresponding handler’s `ServeHTTP`

`DefaultServeMux` is an instance of `ServeMux`


# HTTP response

## request

The Request struct represents an HTTP request message sent from the client.

Some important parts of Request are:
- URL
- Header
- Body
- Form, PostForm, and MultipartForm

### request url

The URL field is a pointer to the `url.URL` type, which is a struct with a number of fields:
```go
type URL struct {
  Scheme   string
  Opaque   string    
  User     *Userinfo 
  Host     string    
  Path     string
  RawQuery string 
  Fragment string 
}
```

general form:
```text
scheme://[userinfo@]host/path[?query][#fragment]
```
URLs that don’t start with a slash after the scheme are interpreted as:
```text
scheme:opaque[?query][#fragment]
```

### request header

Request and response headers are described in the `Header` type, which is a map representing the key-value pairs in an HTTP header.

### request body

Body field consists of a `Reader` interface and a `Closer` interface. A `Reader` is an interface that has a `Read` method that takes in a slice of bytes and returns the number of bytes read and an optional error.

```go
func handler(w http.ResponseWriter, r *http.Request) {
  len := r.ContentLength
  body := make([]byte, len)
  r.Body.Read(body)
  fmt.Fprintln(w, string(body))
}
```

### POST request

Most often, POST requests come in the form of an HTML form. The HTML form data is always sent as name-value pairs.

The format of the name-value pairs sent through a POST request is specified by the content type of the HTML form. This is defined using the `enctype` attribute:
```html
<form action="/process" method="post" enctype="application/x-www-form-urlencoded">
  <input type="text" name="first_name"/>
  <input type="text" name="last_name"/>
  <input type="submit"/>
</form>
```

The default value for `enctype` is `application/x-www-form-urlencoded`, which is same as URL encoding.

If you set `enctype` to `multipart/form-data`, each name-value pair will be converted into a MIME message part

If you’re sending simple text data, the URL encoded form is better—it’s simpler and more efficient and less processing is needed. If you’re sending large amounts of data, such as uploading files, the multipart-MIME form is better.

### GET request

GET requests have no request body:
```html
<form action="/process" method="get">
  <input type="text" name="first_name"/>
  <input type="text" name="last_name"/>
  <input type="submit"/>
</form>
```

## form

The functions in Request that allow us to extract data from the URL and/or the body revolve around the `Form`, `PostForm`, and `MultipartForm` fields.

1. Call `ParseForm` or `ParseMultipartForm` to parse the request.
2. Access the Form, `PostForm`, or `MultipartForm` field accordingly.

```go
func process(w http.ResponseWriter, r *http.Request) {
  r.ParseForm()
  fmt.Fprintln(w, r.Form)
}
```

If the form and the URL have the same key, both of them will be placed in a slice, with the form value always prioritized before the URL value.

### PostForm

`PostForm` field provides key-value pairs only for the form and not the URL.

### MultipartForm

```go
r.ParseMultipartForm(1024)
fmt.Fprintln(w, r.MultipartForm)
```

This is because the `MultipartForm` field contains only the form key-value pairs but not the URL key-value pairs.

The `FormValue` method lets you access the key-value pairs just like in the Form field, except that it’s for a specific key and you don’t need to call the `ParseForm` or `ParseMultipartForm` methods beforehand—the `FormValue` method does that for you.

```go
fmt.Fprintln(w, r.FormValue("hello")
```

### Files

## ResponseWriter

The `ResponseWriter` interface has three methods:
- Write
- WriteHeader
- Header

### Write

The Write method takes in an array of bytes, and this gets written into the body of the HTTP response.

If the header doesn't have a content type by the time Write is called, the first 512 bytes of the data are used to detect the content type.

```go
func writeExample(w http.ResponseWriter, r *http.Request) {
  str := `<html>
         <head><title>Go Web Programming</title></head>
         <body><h1>Hello World</h1></body>
         </html>`
  w.Write([]byte(str))
}
```

### WriteHeader

The WriteHeader method takes an integer that represents the status code of the HTTP response and writes it as the return status code for the HTTP response.

```go
func writeHeaderExample(w http.ResponseWriter, r *http.Request) {
  w.WriteHeader(501)
  fmt.Fprintln(w, "No such service, try next door")
}
```

### Header

The Header method returns a map of headers that you can modify. The modified headers will be in the HTTP response that’s sent to the client.

```go
func headerExample(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Location", "http://google.com")
  w.WriteHeader(302)
}
```

### Writing JSON output

```go
func jsonExample(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  post := &Post{
    User: "Max Shen",
    Threads: []string{"first", "second", "third"},
  }
  json, _ := json.Marshal(post)
  w.Write(json)
}
```

## Cookies

Cookie struct:
```go
type Cookie struct {
  Name       string
  Value      string
  Path       string
  Domain     string
  Expires    time.Time
  RawExpires string
  MaxAge     int
  Secure     bool
  HttpOnly   bool
  Raw        string
  Unparsed   []string 
}
```

If the Expires field isn't set, then the cookie is a session or temporary cookie. Session cookies are removed from the browser when the browser is closed.

### Sending cookies

Cookie has a `String` method that returns a serialized version of the cookie for use in a Set-Cookie response header. Let’s take a closer look.

```go
func setCookie(w http.ResponseWriter, r *http.Request) {
  c1 := http.Cookie{
    Name: "first_cookie",
    Value: "Go Web Programming",
    HttpOnly: true,
  }
  c2 := http.Cookie{
    Name: "second_cookie",
    Value: "Manning Publications Co",
    HttpOnly: true,
  }
  http.SetCookie(w, &c1)
  http.SetCookie(w, &c2)
}
```

### Getting cookies

```go
func getCookie(w http.ResponseWriter, r *http.Request) {
  c1, err := r.Cookie("first_cookie") // get single cookie
  if err != nil {
    fmt.Fprintln(w, "Cannot get the first cookie")
  }
  cs := r.Cookies() // get multiple cookies
  fmt.Fprintln(w, c1)
  fmt.Fprintln(w, cs)
}
```

# Storing data

Relational databases and SQL are also the most commonly used means of storing data in a scalable and easy-to-use way.
