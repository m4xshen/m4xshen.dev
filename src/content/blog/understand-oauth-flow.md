---
title: "Understand OAuth 2.0 flow"
pubDate: 2024-02-17
description: "Discover the essentials of OAuth 2.0, from setting up your application to securing user data with access tokens and PKCE. This beginner's guide simplifies the flow, ensuring your web applications are secure and user-friendly."
newsletter: true
---

If you're developing a web application that relies on a third-party API, chances are you're using OAuth 2.0, a protocol provided by the service. You might not completely understand what this is or how it works, though. In this post, I'm going to make it clear and explain the whole OAuth 2.0 flow to you.

## Setting up your application

Before you start working with OAuth 2.0, you first need to sign up your application on the service provider's website. Take Google's APIs as an example; you must register on the Google API Console.

You'll be asked for some simple details about your application, like its name, website, and logo. You'll also need to provide a `redirect_uri`, which I'll explain in more detail later.

After this, you'll get a `client_id` and `client_secret`. These are important because you'll use them in the OAuth 2.0 process.

## Complete OAuth 2.0 flow

Once you've set up your application, you're ready to start using OAuth 2.0. Here's what the complete process looks like:

1. Request authorization and get authorization code.
2. Exchange authorization code for access token.
3. Use access token to get user resource through API.

Let's dive into each step, using Google OAuth 2.0 as example.

### 1. Request authorization and get authorization code

The first step of the web flow is to request authorization from the user. This is accomplished by creating an authorization request link (a GET request) for the user to click on.

![authorization request link](/images/authorization_request_link.png)

```
GET https://example-service.com/login/oauth/authorize
```

This endpoint usually takes the following input parameters.

- `client_id`: This is your app's unique identifier, which you receive after registering your app with the service.
- `response_type`: This should be set to code, indicating that you're asking for an authorization code in response.
- `state`: This acts as a security measure and should be a random value for each request. When the user is redirected back to your app, you should verify that the state value matches what you originally sent.
- `redirect_uri` (optional): The URI where you want the user to be redirected after the authorization is complete. This must match the redirect URI that you have previously registered with the service.
- `scope` (optional): Here, you can ask for different levels of access by including one or more scope values (separated by spaces). The specific values depend on the service you're using.

Following the link leads the user to a sign in page:

![signin page](/images/signin_page.png)

When the user signs in, the service presents a page detailing your request, including the name of your application, what access you're asking for, etc.

![signin confirm page](/images/signin_confirm_page.png)

If the user agrees to proceed by clicking **Continue**, the service redirects them back to `redirect_uri`, including `code` (authorization code) and the same `state` parameter you specified, in the query string.

Here's a flowchart that outlines this first step:

![step 1 diagram](/images/step_1_diagram.png)

### 2. Exchange authorization code for access token

The second phase involves exchanging the authorization code you've received for an access token. This is done by making a POST request to the service's authorization server:

```
POST https://example-service.com/login/oauth/access_token
```

This endpoint usually takes the following input parameters.

- `grant_type`: This should be set to "authorization_code".
- `code`: The authorization code that you received.
- `client_id`: The unique identifier for your app, provided when you registered with the service.
- `client_secret`: A secret key you received upon registering your app, meant to authenticate your request.
- `redirect_uri` (optional): If you included a redirect URL in the initial authorization request, it must also be included here and match exactly.

The service's response to this POST request will include the `access_token` you'll use in the final step.

Here's a flowchart summarizing this step:

![step 2 diagram](/images/step_2_diagram.png)

### 3. Use access token to get user resource through API

Once you have the access_token, you might save it for later to make API calls. Include it in your request headers like this:

```javascript
Authorization: `Bearer ${access_token}`
```

This informs the resource server that you are authorized to access the user's information.

Here's a flowchart illustrating this step:

![step 3 diagram](/images/step_3_diagram.png)

Now that you understand the basic OAuth 2.0 flow, let's review everything with a diagram showing the full process:

![step 3 diagram](/images/complete_diagram.png)

## PKCE

The basic authorization flow works well, but it has a vulnerability: if an attacker manages to intercept the `code`, they can exchange it for an `access_token`. This poses a serious security risk, potentially allowing the attacker to access protected resources as the user.

This is where PKCE (Proof Key for Code Exchange) comes into play. PKCE is an extension to the basic authorization flow to prevent this kind of attack.

To implement PKCE, the application must first:

1. creates a `code_verifier`. This is a cryptographically random string.
2. use `code_verifier` to generate the `code_challenge` by performing a SHA256 hash. If the application cannot perform a SHA256 hash, it should use the plain `code_verifier` as the `code_challenge`.

Next, you'll include additional parameters in the previous steps to integrate PKCE:

### 1. Request authorization and get authorization code

When requesting authorization, include these additional parameters:

- `code_challenge=XXXXXXXXX`: The code challenge generated as previously described
- `code_challenge_method=S256`: This can be either plain or S256, indicating whether the challenge is the plain `code_verifier` string or a SHA256 hash of it.

The authorization server will associate `code_challenge` and `code_challenge_method` with the `code` it generates.

### 2. Exchange authorization code for access token

When exchanging the authorization code for an access token, add the following parameter:

- `code_verifier`: The code verifier for the PKCE request, that the app originally generated before the authorization request.

Since the `code_challenge` and `code_challenge_method` were associated with the `code` initially, the server should already know which method to use to verify the `code_verifier`.

- For the plain method, the authorization server simply verifies that the provided `code_verifier` matches the previously stored `code_challenge`.
- For the S256 method, the authorization server will hash the provided `code_verifier` using SHA256 and then compare it to the stored `code_challenge`.

If the verification is successful and the values match, the server issues an access_token. If they don't match, the request is denied.

This mechanism ensures that even if an attacker intercepts the authorization code, they cannot exchange it for an `access_token` without the `code_verifier`.

## Conclusion

In summary, mastering OAuth 2.0 is essential for securely managing user data in web applications. This guide has walked you through setting up your application, obtaining authorization, securing access tokens, and using PKCE to protect against interception attacks. By adhering to these steps, you ensure your application's security and maintain user trust.
