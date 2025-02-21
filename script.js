const imagesToPreload = [
    "images/b.png",
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/e.png"
];

let preloadedImages = [];

function preloadImages() {
    imagesToPreload.forEach((src) => {
        let img = new Image();
        img.src = src;
        preloadedImages.push(img);
    });
}

// 在页面加载完成后立即执行预加载
window.addEventListener("load", preloadImages);

let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

let clickCount = 0;  // 记录点击 No 的次数
let generatedYesCount = 0; // 记录已生成的“可以”按钮数量
let intervalTime = 1000; // 初始间隔时间 1 秒
let stopGeneration = false; // 控制生成的开关

// No 按钮的文字变化
const noTexts = [
    "？你认真的吗…", 
    "要不再想想？", 
    "不许选这个！ ", 
    "我会很伤心…", 
    "不行:("
];

// No 按钮点击事件
noButton.addEventListener("click", function() {
    clickCount++;

    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + (clickCount * 1.05);
    yesButton.style.transform = `scale(${yesSize})`;

    // 挤压 No 按钮，每次右移 100px
    let noOffset = clickCount * 35;
    noButton.style.transform = `translateX(${noOffset}px)`;

    // **新增：让图片和文字往上移动**
    let moveUp = clickCount * 25; // 每次上移 20px
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    // 图片变化（前 5 次变化）
    if (clickCount === 1) mainImage.src = "images/1.png"; // 震惊
    if (clickCount === 2) mainImage.src = "images/2.png";   // 思考
    if (clickCount === 3) mainImage.src = "images/3.png";   // 生气
    if (clickCount === 4) mainImage.src = "images/4.png";  // 哭
    if (clickCount >= 5) mainImage.src = "images/5.png";  // 之后一直是哭
    
    if (clickCount >= 6) {
        noButton.style.display = "none"; // 隐藏“不要”按钮
        generateYesButtons(); // 生成新的“可以”按钮
    }
});

// 生成多个 "可以" 按钮
function generateYesButtons() {
    if (stopGeneration || generatedYesCount >= 70) return; // 限制最多生成 30 个

    let yesClone = document.createElement("button");
    yesClone.innerText = "可以";
    yesClone.classList.add("yes-random");

    yesClone.style.position = "absolute";
    yesClone.style.left = Math.random() * (window.innerWidth - 100) + "px";
    yesClone.style.top = Math.random() * (window.innerHeight - 50) + "px";

    yesClone.addEventListener("click", function() {
        stopGeneration = true; // **点击“可以”后停止生成**
        yesButton.click(); // 触发原“可以”按钮的逻辑
    });

    document.body.appendChild(yesClone);
    generatedYesCount++; // 计数+1

    // 逐渐加快生成速度
    intervalTime *= 0.9; // 每次生成的时间减少 10%
    setTimeout(generateYesButtons, intervalTime); // 递归调用
}

// Yes 按钮点击后，进入表白成功页面
yesButton.addEventListener("click", function() {
    document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text">!!!喜欢你!! ( >᎑<)♡︎ᐝ</h1>
            <img src="images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;

    document.body.style.overflow = "hidden";
});