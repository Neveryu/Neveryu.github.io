<li class="menu-item"> <a title="把这个链接拖到你的工具栏中,任何网页都可以High" href='javascript:(
/*
 * Copyright (C) 2016 Never_yu (Neveryu.github.io) <React.dong.yu@gmail.com>
 * Sina Weibo (http://weibo.com/Neveryu)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function go() {

var songs = [
  "{{ theme.high_high.song1 }}",
  "{{ theme.high_high.song2 }}",
  "{{ theme.high_high.song3 }}",
  ""
];

function c() {
  var e = document.createElement("link");
  e.setAttribute("type", "text/css");
  e.setAttribute("rel", "stylesheet");
  e.setAttribute("href", f);
  e.setAttribute("class", l);
  document.body.appendChild(e)
}

function h() {
  var e = document.getElementsByClassName(l);
  for (var t = 0; t < e.length; t++) {
    document.body.removeChild(e[t])
  }
}

function p() {
  var e = document.createElement("div");
  e.setAttribute("class", a);
  document.body.appendChild(e);
  setTimeout(function() {
    document.body.removeChild(e)
  }, 100)
}

function d(e) {
  return {
    height : e.offsetHeight,
    width : e.offsetWidth
  }
}

function v(i) {
  var s = d(i);
  return s.height > e && s.height < n && s.width > t && s.width < r
}

function m(e) {
  var t = e;
  var n = 0;
  while (!!t) {
    n += t.offsetTop;
    t = t.offsetParent
  }
  return n
}

function g() {
  var e = document.documentElement;
  if (!!window.innerWidth) {
    return window.innerHeight
  } else if (e && !isNaN(e.clientHeight)) {
    return e.clientHeight
  }
  return 0
}

function y() {
  if (window.pageYOffset) {
    return window.pageYOffset
  }
  return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
}

function E(e) {
  var t = m(e);
  return t >= w && t <= b + w
}

function S() {
  var e = document.getElementById("audio_element_id");
  if(e != null){
    var index = parseInt(e.getAttribute("curSongIndex"));
    if(index > songs.length - 2) {
      index = 0;
    } else {
      index++;
    }
    e.setAttribute("curSongIndex", index);
    N();
  }

  e.src = i;
  e.play()
}

function x(e) {
  e.className += " " + s + " " + o
}

function T(e) {
  e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)]
}

function N() {
  var e = document.getElementsByClassName(s);
  var t = new RegExp("\\b" + s + "\\b");
  for (var n = 0; n < e.length; ) {
    e[n].className = e[n].className.replace(t, "")
  }
}

function initAudioEle() {
  var e = document.getElementById("audio_element_id");
  if(e === null){
    e = document.createElement("audio");
    e.setAttribute("class", l);
    e.setAttribute("curSongIndex", 0);
    e.id = "audio_element_id";
    e.loop = false;
    e.bgcolor = 0;
    e.addEventListener("canplay", function() {
      setTimeout(function() {
        x(k)
      }, 500);
      setTimeout(function() {
        N();
        p();
        for (var e = 0; e < O.length; e++) {
          T(O[e])
        }
      }, 15500)
    }, true);
    e.addEventListener("ended", function() {
      N();
      h();
      go();
    }, true);
    e.innerHTML = " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
    document.body.appendChild(e);
  }
}

initAudioEle();
var e = 30;
var t = 30;
var n = 350;
var r = 350;

var curSongIndex = parseInt(document.getElementById("audio_element_id").getAttribute("curSongIndex"));
var i = songs[curSongIndex];

var s = "mw-harlem_shake_me";
var o = "im_first";
var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
var a = "mw-strobe_light";

/* harlem-shake-style.css，替换成你的位置，也可以直接使用：//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css */
var f = "//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";

var l = "mw_added_css";
var b = g();
var w = y();
var C = document.getElementsByTagName("*");
var k = null;
for (var L = 0; L < C.length; L++) {
  var A = C[L];
  if (v(A)) {
    if (E(A)) {
      k = A;
      break
    }
  }
}
if (A === null) {
  console.warn("Could not find a node of the right size. Please try a different page.");
  return
}
c();
S();
var O = [];
for (var L = 0; L < C.length; L++) {
  var A = C[L];
  if (v(A)) {
    O.push(A)
  }
}
})()'><i class="menu-item-icon fa fa-music fa-fw"></i> High一下</a></li>