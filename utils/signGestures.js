import * as fp from "fingerpose";

const helloGesture = new fp.GestureDescription("hello");
helloGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
helloGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
helloGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
helloGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
helloGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

const thumbsUpGesture = new fp.GestureDescription("thumbs_up");
thumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thumbsUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
thumbsUpGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
thumbsUpGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
thumbsUpGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

export const signGestures = {
  hello: helloGesture,
  thumbs_up: thumbsUpGesture,
};
