---
title: "Restful API"
date: 2023-04-18T02:18:22+08:00
draft: true
---

## REST

### Uniform interface

The server transfers information in a standard format. The formatted resource is called a representation in REST.

1. Requests should identify resources. They do so by using a uniform resource identifier.
2. Clients have enough information in the resource representation to modify or delete the resource if they want to. The server meets this condition by sending metadata that describes the resource further.
3. Clients receive information about how to process the representation further. The server achieves this by sending self-descriptive messages that contain metadata about how the client can best use them.
4. Clients receive information about all other related resources they need to complete a task. The server achieves this by sending hyperlinks in the representation so that clients can dynamically discover more resources.

### Statelessness

The server completes every client request independently of all previous requests, which implies that the server can completely understand and fulfill the request every time.

### Layered system

In a layered system architecture, the client can connect to other authorized intermediaries between the client and server, and it will still receive responses from the server. Servers can also pass on requests to other servers.

### Cacheability

RESTful web services support caching, which is the process of storing some responses on the client or on an intermediary to improve server response time.

### Code on demand

Servers can temporarily extend or customize client functionality by transferring software programming code to the client.

For example, when you fill a registration form on any website, your browser immediately highlights any mistakes you make, such as incorrect phone numbers. It can do this because of the code sent by the server.

https://aws.amazon.com/what-is/restful-api/
