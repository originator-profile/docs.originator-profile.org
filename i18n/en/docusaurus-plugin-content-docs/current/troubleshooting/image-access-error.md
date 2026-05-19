---
sidebar_position: 0
original: https://github.com/originator-profile/docs.originator-profile.org/blob/10274dc/docs/troubleshooting/image-access-error.md
---

# No image displayed

The image is not accessible. To display the image correctly, you must allow external access to the image.

## How to check

To determine why an image is failing to load, open your browser's developer tools and in the Network tab, find the request for the image that isn't being displayed. Please check the response for any error codes.

## Causes and Solutions

### CORS Errors

**Symptoms**

The following warning message appears in the console:

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at [URL].
```

**Cause**

The server serving the image does not allow cross-origin requests from OP Inspector.

**Solutions**

Please make sure to set the appropriate CORS headers on the server that is serving the image.

```
Access-Control-Allow-Origin: *
```

Alternatively, if you want to allow only specific origins, please specify the origin from which the request originates.

### Image does not exist（HTTP 404）

**Symptoms**

In the Network tab, the status code is `404 Not Found`.

**Cause**

The image file does not exist at the specified URL.

**Solutions**

- Please check for typos in the URL path or filename.
- Please check if the image file has been uploaded correctly to the specified location.

### No access permissions（HTTP 403）

**Symptoms**

In the Network tab, the status code is `403 Forbidden`.

**Cause**

The server is denying access to the image.

**Solutions**

- Please check the access permissions for the image file.
- Please check your server settings to make sure external access is allowed.

### Caching issues

**Symptoms**

I updated the image but the old image is still displayed, or no image is displayed.

**Cause**

The browser or CDN is returning a stale cached response.

**Solutions**

- Please clear your browser cache and reload the page.
- Please test with the "Disable Cache" option enabled in the "Network" tab of the Developer Tools.

### Content-Type mismatch

**Symptoms**

The network tab shows the request was successful (200), but the image is not displayed.

**Cause**

The `Content-Type` header returned by the server does not match the actual format of the image.

**Solutions**

- Please check the response header `Content-Type` in the Network tab.
- Please set the correct Content-Type for your image format.
  - PNG: `image/png`
  - JPEG: `image/jpeg`
  - SVG: `image/svg+xml`
  - WebP: `image/webp`
