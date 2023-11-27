document.addEventListener('DOMContentLoaded', () => {
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

    // 主动画函数，包含所有动画细节
    const mainAnimation = () => {
        // 重构动画，以匹配老代码的逻辑和细节
        const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
        const hbd = document.getElementsByClassName("wish-hbd")[0];

        textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span`;
        hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span`;

        const ideaTextTrans = {
            opacity: 0,
            y: -20,
            rotationX: 5,
            skewX: "15deg"
        };

        const ideaTextTransLeave = {
            opacity: 0,
            y: 20,
            rotationY: 5,
            skewX: "-15deg"
        };

        const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

        tl
        .to(".container", 0.1, {
          visibility: "visible"
        })
        .from(".one", 0.7, {
          opacity: 0,
          y: 10
        })
        .from(".two", 0.4, {
          opacity: 0,
          y: 10
        })
        .to(
          ".one",
          0.7,
          {
            opacity: 0,
            y: 10
          },
          "+=2.5"
        )
        .to(
          ".two",
          0.7,
          {
            opacity: 0,
            y: 10
          },
          "-=1"
        )
        .from(".three", 0.7, {
          opacity: 0,
          y: 10
          // scale: 0.7
        })
        .to(
          ".three",
          0.7,
          {
            opacity: 0,
            y: 10
          },
          "+=2"
        )
        .from(".four", 0.7, {
          scale: 0.2,
          opacity: 0
        })
        .from(".fake-btn", 0.3, {
          scale: 0.2,
          opacity: 0
        })
        .staggerTo(
          ".hbd-chatbox span",
          0.5,
          {
            visibility: "visible"
          },
          0.05
        )
        .to(".fake-btn", 0.1, {
          backgroundColor: "rgb(127, 206, 248)"
        })
        .to(
          ".four",
          0.5,
          {
            scale: 0.2,
            opacity: 0,
            y: -150
          },
          "+=0.7"
        )
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, {
          scale: 1.2,
          x: 10,
          backgroundColor: "rgb(21, 161, 237)",
          color: "#fff"
        })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
        .from(
          ".idea-5",
          0.7,
          {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0
          },
          "+=0.5"
        )
        .to(
          ".idea-5 .smiley",
          0.7,
          {
            rotation: 90,
            x: 8
          },
          "+=0.4"
        )
        .to(
          ".idea-5",
          0.7,
          {
            scale: 0.2,
            opacity: 0
          },
          "+=2"
        )
        .staggerFrom(
          ".idea-6 span",
          0.8,
          {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut
          },
          0.2
        )
        .staggerTo(
          ".idea-6 span",
          0.8,
          {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut
          },
          0.2,
          "+=1"
        )
        .staggerFromTo(
          ".baloons img",
          2.5,
          {
            opacity: 0.9,
            y: 1400
          },
          {
            opacity: 1,
            y: -1000
          },
          0.2
        )
        .from(
          ".lydia-dp",
          0.5,
          {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45
          },
          "-=2"
        )
        .from(".hat", 0.5, {
          x: 0,
          y: 0,
          rotation: -180,
          opacity: 0
        })
        .staggerFrom(
          ".wish-hbd span",
          0.7,
          {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5)
          },
          0.1
        )
        .staggerFromTo(
          ".wish-hbd span",
          0.7,
          {
            scale: 1.4,
            rotationY: 150
          },
          {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut
          },
          0.1,
          "party"
        )
        .from(
          ".wish h5",
          0.5,
          {
            opacity: 0,
            y: 10,
            skewX: "-15deg"
          },
          "party"
        )
        .staggerTo(
          ".eight svg",
          1.5,
          {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4
          },
          0.3
        )
        .to(".six", 0.5, {
          opacity: 0,
          y: 30,
          zIndex: "-1"
        })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(
          ".last-smile",
          0.5,
          {
            rotation: 90
          },
          "+=1"
        );
        
        return tl;
    };

    // 定义启动动画和音乐的函数
    const startAnimationAndAudio = async () => {
        await applyCustomData();
        playBackgroundAudio();
        mainAnimation();
    };

    // 为开始按钮添加事件监听器
    const startButton = document.getElementById('playButton');
    startButton.addEventListener('click', startAnimationAndAudio);

    // 如果需要重播动画的话，可以添加重播按钮的监听器
    //const replayButton = document.getElementById('replay');
    //replayButton.addEventListener('click', () => {
      //  mainAnimation().restart();
    //});
    const replyBtn = document.getElementById("replay");
     replyBtn.addEventListener("click", () => {
      tl.restart();
    });
    
});
