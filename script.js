const images = [
    "images/top1.gif",
    "images/top2.jpg",
    "images/top3.gif",
    "images/top4.gif",
    "images/top5.gif",
    "images/top6.gif",
    "images/top7.jpg",
    "images/top8.gif",
    "images/top9.gif",
    "images/top10.gif",
    "images/top11.gif",
    "images/top12.gif",
    "images/top13.png",
    "images/top14.gif",
];

let index = 0;

const imgFront = document.getElementById("slider-img");      // 上の画像（フェードする）
const imgBack = document.getElementById("slider-img-back");  // 下の画像（次の画像を先に表示）

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");

// 画像プリロード
const preloadImages = () => {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};
preloadImages();

// スライド表示（ちらつき防止版）
function showImage() {
    // 下に次の画像をセット
    imgBack.src = images[index];

    // 上をフェードアウト
    imgFront.style.opacity = 0;

    // フェード完了後に上の画像を差し替える
    imgFront.addEventListener("transitionend", function handler() {
        imgFront.removeEventListener("transitionend", handler);

        // 上の画像を差し替え
        imgFront.src = images[index];

        // モーダル表示中も同期
        if (modal.style.display === "flex") {
            modalImg.src = images[index];
        }

        // 再び表示
        imgFront.style.opacity = 1;
    });
}

function nextImage() {
    index = (index + 1) % images.length;
    showImage();
}

function prevImage() {
    index = (index - 1 + images.length) % images.length;
    showImage();
}

// モーダル開く
function openModal() {
    modal.style.display = "flex";
    modalImg.src = images[index];

    modalImg.style.opacity = 0;
    setTimeout(() => {
        modalImg.style.opacity = 1;
    }, 10);
}

// モーダル閉じる
function closeModal() {
    modalImg.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}
