---
sidebar_position: 3
original: https://github.com/originator-profile/docs.originator-profile.org/blob/8ac37ee/docs/faq/pa-image-format.md
---

# PA Image format

Please prepare the Profile Annotation (PA) image (`credentialSubject.image`) so that it meets the following requirements.
This image is separate from your organization's logo image ([Logo image format](/faq/logo-format/)).

## Requirements for submitted images

- Aspect ratio: 3:2
- Dimensions: 180px width × 120px height or more
  Keep a 3:2 ratio when scaling (e.g. 360px width × 240px height).
- Image format: One of the following
  - PNG
  - JPEG
  - WebP
- Background: Treated as white (`#fff`).
  Images with transparent backgrounds are displayed composited against a white background.
- Margins: Ensure a margin of at least 10% of the image height on each side (e.g., 12px or more for a 180px × 120px image).
- Logo size: Set the logo height to 78–80% of the image height, or the logo width to 128–130% of the image height (for a 180px × 120px image, this would be a height of 94–96px or a width of 154–156px).
  Place the logo within the margin area, and extend either its vertical or horizontal dimension to fill the available space within those margins.

The following diagram shows the margins and the area for the logo on an image measuring 180px in width by 120px in height.
The light red band represents the minimum margin, and the area inside the red dashed line is where the logo should be placed.

![An image with a width of 180px and a height of 120px. There is a 12px margin on each side, and the logo should be placed within the dashed-line area inside that margin.](./assets/pa-image-margin.ja.svg)

If an organization has its own isolation requirements (specifying the clear space to be maintained around its logo), please compare these with the current requirements and adhere to the one that mandates the larger amount of clear space.

## Display in the OP Extension

In the OP extension, PA images are displayed within a 60px (width) × 40px (height) area, with their aspect ratio preserved.
The minimum dimensions for submitted images (180px width × 120px height) are three times the size of this display area.

- Images smaller than the display area are centered and shown at their original size.
- Images larger than the display area are scaled down while maintaining their aspect ratio.
- If no image is specified, a placeholder image is displayed.

For information on how to validate images, please refer to the [`image` data type](/opb/context/#the-image-datatype).
