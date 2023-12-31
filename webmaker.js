document.addEventListener('DOMContentLoaded', () => {
    const draggableElements = document.querySelectorAll('.draggable');

    draggableElements.forEach(elem => {
        elem.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            e.dataTransfer.setData('text/plain', e.target.id);
            startDrag(e.target, touch.clientX, touch.clientY);
        }, false);
        elem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    const toolbar = document.querySelector('.toolbar');

    toolbar.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, false);
toolbar.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touch = e.changedTouches[0];
        finishDrag(touch.clientX, touch.clientY);
    }, false);

    
    toolbar.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    toolbar.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const droppedElement = document.getElementById(id);
        
        createOptionsForComponent(droppedElement, e.clientX, e.clientY, toolbar);
    });
});

function startDrag(elem, x, y) {
    // 开始拖动元素的逻辑
}

function finishDrag(x, y) {
    // 完成拖动的逻辑，这里调用 createOptionsForComponent
    createOptionsForComponent(currentDraggingElement, x, y, toolbar);
}

function createOptionsForComponent(component, x, y, toolbar) {
    const options = document.getElementById('options-template').cloneNode(true);
    options.id = ''; // 清除克隆的ID
    options.style.display = 'block';
    options.style.position = 'absolute';
    options.style.left = `${x}px`;
    options.style.top = `${y}px`;

    options.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.type === 'image') {
                createImageArea(component, toolbar);
            } else if (btn.dataset.type === 'video') {
                createVideoArea(component, toolbar);
            }
            options.remove();
        });
    });

    toolbar.appendChild(options);
}

function createImageArea(component, toolbar) {
    // 创建一个新的区域用于上传或显示图片
    const imageArea = document.createElement('div');
    imageArea.classList.add('image-area');
    imageArea.textContent = '这里是图片区域';
    // 这里可以添加图片上传和显示的逻辑
    toolbar.appendChild(imageArea);
}

function createVideoArea(component, toolbar) {
    // 创建一个新的区域用于上传或显示视频
    const videoArea = document.createElement('div');
    videoArea.classList.add('video-area');
    videoArea.textContent = '这里是视频播放区';
    // 这里可以添加视频上传和播放的逻辑
    toolbar.appendChild(videoArea);
}
