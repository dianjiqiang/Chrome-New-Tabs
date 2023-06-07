const startColor = ['#00b0ea', '#b87956', '#7ba1b1', '#e94638', '#31a650']
function mouseMoveFunction(docklist) {
  for (let i = 0; i < docklist.length; i++) {
    const element = docklist[i];
    element.addEventListener('mouseenter', () => {
      const num = i
      for (let j = 0; j < docklist.length; j++) {
        docklist[j].className = 'list'
      }
      docklist[num].className = 'docklist'
      const toolTipEl = document.createElement('span')
      toolTipEl.classList.add('tool-tip')
      toolTipEl.innerHTML = docklist[num].title
      if(docklist[num-1]){
        docklist[num-1].className = 'approach-list'
      }
      if(docklist[num-2]){
        docklist[num-2].className = 'far-list'
      }
      if(docklist[num+1]){
        docklist[num+1].className = 'approach-list'
      }
      if(docklist[num+2]){
        docklist[num+2].className = 'far-list'
      }
    })
  }
}
// 移出清除函数
function removeMoveFunction(element, docklist) {
  element.addEventListener('mouseleave',() => {
    for (let i = 0; i < docklist.length; i++) {
      docklist[i].className = 'list'
    }
  })
}
// 添加初始网站
function addStartWebsite(dock) {
  const websites = JSON.parse(window.localStorage.getItem('websites'))
  // 如果有初始网站 就渲染 没有就添加我这边初始值
  if (websites?.length) {
    websites.forEach(item => {
      //如果有的话
      const divNode = document.createElement('div')

      // 提示文本
      const tooltip = document.createElement('div')
      tooltip.classList.add('tooltip')
      tooltip.innerHTML = item.val2

      divNode.classList.add('list')
      // 添加点击事件
      divNode.addEventListener('click', () => {
        window.location.href= item.val1
      }) 
      // 如果没有图片地址 则展示默认的
      if (!item?.val3) {
        divNode.innerHTML = item.val2.slice(0,1)
        divNode.style = `background-color: ${startColor[Math.floor(Math.random() * (startColor.length - 1))]};`
      }else{
        divNode.append(tooltip)
        divNode.style = `background: url(${item.val3}) 100% 100%; background-size:100% 100%;`
      }
      dock.append(divNode)
      // 重新绑定事件
      const docklist = document.querySelectorAll('.dock > div')
      mouseMoveFunction(docklist)
    })
  }else{
    //如果没有 就造数据
    const arr = [
      {val1: 'https://www.bilibili.com', val2: 'biblibili', val3: './assets/image/1.jpg'},
      {val1: 'https://www.youtube.com', val2: 'youtube', val3: './assets/image/2.jpg'},
      {val1: 'https://www.taobao.com', val2: '淘宝', val3: './assets/image/3.jpg'},
      {val1: 'https://developer.mozilla.org/zh-CN/', val2: 'MDN', val3: './assets/image/4.jpg'},
      {val1: 'https://www.bootcdn.cn/', val2: 'CDN', val3: './assets/image/5.jpg'},
      {val1: 'https://www.w3.org/', val2: 'W3C', val3: './assets/image/6.jpg'},
      {val1: 'https://leetcode.cn/', val2: '力扣', val3: './assets/image/7.jpg'},
      {val1: 'https://juejin.cn/notification', val2: '掘金', val3: './assets/image/8.jpg'},
    ]
    // 存储到localstorage中
    window.localStorage.setItem('websites', JSON.stringify(arr))
    arr.forEach(item => {
      //如果有的话
      const divNode = document.createElement('div')
      divNode.classList.add('list')
      // 添加点击事件
      divNode.addEventListener('click', () => {
        window.location.href= item.val1
      })
      // 如果没有图片地址 则展示默认的
      if (!item?.val3) {
        // divNode.innerHTML = tooltip
        divNode.innerHTML = item.val2.slice(0,1)
        divNode.style = `background-color: ${startColor[Math.floor(Math.random() * (startColor.length - 1))]};`
      }else{
        divNode.style = `background: url(${item.val3}) 100% 100%; background-size:100% 100%;`
      }
      dock.append(divNode)
      // 重新绑定事件
      const docklist = document.querySelectorAll('.dock > div')
      mouseMoveFunction(docklist)
    })
  }
}