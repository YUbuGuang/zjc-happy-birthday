<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js"></script>

// 使用现代化的 GSAP 3.x
gsap.registerPlugin(TimelineLite, TweenMax);

// 主动画函数，包含所有动画细节
const mainAnimation = () => {
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  // 动画细节
  tl.from(".container", { duration: 0.1, autoAlpha: 0 })
    .from(".one", { duration: 0.7, opacity: 0, y: 10 })
    .from(".two", { duration: 0.4, opacity: 0, y: 10 }, "-=0.3")
    .to(".one", { duration: 0.7, opacity: 0, y: 10 }, "+=2.5")
    .to(".two", { duration: 0.7, opacity: 0, y: 10 }, "-=0.7")
    .from(".three", { duration: 0.7, opacity: 0, y: 10 })
    .to(".three", { duration: 0.7, opacity: 0, y: 10 }, "+=2")
    .from(".four", { duration: 0.7, scale: 0.2, opacity: 0 })
    .from(".fake-btn", { duration: 0.3, scale: 0.2, opacity: 0 }, "-=0.4")
    .to(".fake-btn", { duration: 0.1, backgroundColor: "rgb(127, 206, 248)" })
    .to(".four", { duration: 0.5, scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
    .add(ideaTextAnimation())
    .from(".baloons img", { duration: 2.5, opacity: 0.9, y: 1400, stagger: 0.2 })
    .from(".lydia-dp", { duration: 0.5, scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", { duration: 0.5, x: 0, y: 0, rotation: -180, opacity: 0 })
    .add(hbdAnimation(), "party")
    .staggerFromTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80 }, { opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
    .to(".six", { duration: 0.5, opacity: 0, y: 30, zIndex: -1 })
    .staggerFrom(".nine p", 1, { opacity: 0, y: -20, rotationX: 5, skewX: "15deg", stagger: 1.2 })
    .to(".last-smile", { duration: 0.5, rotation: 90 }, "+=1");

  return tl;
};

// 分离出的特定动画函数
const ideaTextAnimation = () => {
  const tl = gsap.timeline();
  // 添加对应的动画细节
  ["idea-1", "idea-2", "idea-3", "idea-4"].forEach((className, index) => {
    tl.from(`.${className}`, { duration: 0.7, opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(`.${className}`, { duration: 0.7, opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" }, `+=1.5`);
  });

  return tl;
};

const hbdAnimation = () => {
  const tl = gsap.timeline();
  // 添加对应的动画细节
  tl.staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
    .from(".wish h5", { duration: 0.5, opacity: 0, y: 10, skewX: "-15deg" }, "party");

  return tl;
};

// 播放背景音乐
const playBackgroundAudio = () => {
  const backgroundAudio = document.getElementById('backgroundAudio');
  if (backgroundAudio.paused) {
    backgroundAudio.play();
  } else {
    backgroundAudio.currentTime = 0;
  }
};

// 获取并应用自定义数据
const applyCustomData = async () => {
  try {
    const response = await fetch('customize.json');
    const data = await response.json();

    // 应用自定义数据到页面
    for (const key in data) {
      if (data[key] !== '') {
        const element = document.querySelector(`[data-node-name*="${key}"]`);
        if (key === 'imagePath') {
          element.setAttribute('src', data[key]);
        } else {
          element.innerText = data[key];
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch custom data:', error);
  }
};

// 启动动画和音乐
const startAnimationAndAudio = async () => {
  await applyCustomData();
  playBackgroundAudio();
  mainAnimation();
};

// 为开始按钮添加事件监听器
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startAnimationAndAudio);

// 如果需要重播动画的话，可以添加重播按钮的监听器
const replayButton = document.getElementById('replay');
replayButton.addEventListener('click', () => {
  mainAnimation().restart();
});
