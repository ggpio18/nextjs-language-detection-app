import * as fp from "fingerpose";

const aslGestures = {};

// ASL "A" Gesture (Fist)
aslGestures.a = new fp.GestureDescription("A");
aslGestures.a.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl);
aslGestures.a.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl);
aslGestures.a.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl);
aslGestures.a.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl);
aslGestures.a.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl);

// ASL "B" Gesture (Flat Hand)
aslGestures.b = new fp.GestureDescription("B");
aslGestures.b.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
aslGestures.b.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
aslGestures.b.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
aslGestures.b.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl);
aslGestures.b.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl);

// ASL "Hello" Gesture (Open Palm)
aslGestures.hello = new fp.GestureDescription("Hello");
aslGestures.hello.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
aslGestures.hello.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
aslGestures.hello.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
aslGestures.hello.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl);
aslGestures.hello.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl);

export { aslGestures };
