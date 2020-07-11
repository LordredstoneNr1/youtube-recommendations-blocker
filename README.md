# Youtube Recommendations Blocker
_A tool to filter out certain words from your Youtube recommendations._

 * **Manual install**
 
   I don't think I'll publish this to the Chrome Web Store, so you'll have to install the unpacked extension manually.
     
 1. Download the code, either pick a release on the right side or use "Code -> Download ZIP".
 2. Unpack the archive somewhere, e.g. "Documents", "Downloads", or in a special "Extensions" folder in Chrome.
 3. Fill in "blacklist.txt"
 4. Go to chrome://extensions/ and turn on Developer Mode in the top right corner.
 5. Click "Add unpacked extension" and specify the folder you unpacked the archive in.
 
 &nbsp;
 
 * **How it works**
   * Every line in the blacklist file is treated as one phrase to filter. The comparison is _case-insensitive_ since everything is converted to lower case before the comparison. Currently, only the title of the video is used to block videos.
   * Matching videos are then hidden with the "display: none !important;" style rule, rendering them invisible.
   * The extension considers every video recommendation that is loaded when the code runs, and sets up an observer to catch new recommendations that are added when scrolling down.
   * The blacklist is loaded once and kept in the background to speed up load times when opening multiple tabs. Thus, you'll have to reload the extension (at chrome://extensions/) if you updated the blacklist.
