// 父元素悬停时，子元素添加下划线
function addBottomAnimation(elFather, elChild) {
    // 创建下划线元素
    const underline = document.createElement('span');

    // 设置下划线初始样式
    Object.assign(underline.style, {
        position: 'absolute',
        height: '1px',
        backgroundColor: '#ffffff',
        bottom: '-1px',
        left: '0',
        transition: 'width 0.3s ease',
        width: '0'
    });

    // 添加下划线到span中
    elChild.appendChild(underline);

    // 鼠标悬停事件
    elFather.addEventListener('mouseenter', function () {
        underline.style.width = '100%';
    });

    // 鼠标离开事件
    elFather.addEventListener('mouseleave', function () {
        underline.style.width = '0';
    });
}

// 当页面加载完成时触发
document.addEventListener('DOMContentLoaded', function () {
    // 获取元素
    const btn = document.querySelector('.home-btn');
    const btnSpan = btn.querySelector('span');

    addBottomAnimation(btn, btnSpan)
});