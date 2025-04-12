## General
~ Fix bug: Clicking stops classifying, doesn't stop calling classification when doing a pose
	- It turns out that it does fire "stop clasification" but something else turns it on again.
    	- Now I have to figure out what calls it again.

- Extra bug fix: As a user, I want to unmute after muting the video using a pose
  - Extra Bug fix: After I do the some pose, I can't mannually control the same action, Because the external input keeps going.
	- Steps to reproduce
		- Do mute pose
		- Then unmute using mouse
	- Expected outcome
		- Unmutes after doing manual unmute clicking
	Current issue with current solution, I can't mute anymore after callcount is more than 10,

  ## Optional UX improvements:
  - Display a notification to the user when the webcam is not toggled on, so
    that they know that the app can't use the webcam if they haven't given
    permission or if the webcam is not available.
## Optional UX improvements:
- notification when webcam is not toggled on