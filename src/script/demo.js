window.onload = function(){
  // 默认选中输入框
  const input = document.querySelector('input')
  const searchBtn = document.querySelector('.search-btn')
  const google = document.querySelector('.google')
  const bing = document.querySelector('.bing')
  const baidu = document.querySelector('.baidu')
  google.onclick = () => {
    localStorage.setItem('searchRef', 'https://www.google.com/search?q=')
    baseURL = 'https://www.google.com/search?q='
  }
  bing.onclick = () => {
    localStorage.setItem('searchRef', 'https://cn.bing.com/search?q=')
    baseURL = 'https://cn.bing.com/search?q='
  }
  baidu.onclick = () => {
    localStorage.setItem('searchRef', 'https://www.baidu.com/s?wd=')
    baseURL = 'https://www.baidu.com/s?wd='
  }
  let baseURL
  if (!localStorage.getItem('searchRef')) {
    baseURL = 'https://cn.bing.com/search?q='
    localStorage.setItem('searchRef', baseURL)
  }else{
    baseURL = localStorage.getItem('searchRef')
  }
  input.focus()
  input.onkeydown = (e) => {
    if(e.key === 'Enter'){
      // 滚到对应的网站
      const searchValue = input.value
      input.value = ''
      window.location.href= baseURL+searchValue
    }
  }
  searchBtn.onclick = () => {
    const searchValue = input.value
    input.value = ''
    window.location.href= baseURL+searchValue
  }
  
  // 获取背景
  // const bj = JSON.parse(window.localStorage.getItem('backgroundURL'))
  const img = document.createElement('img')
  const video = document.createElement('video')
  // if (bj && bj?.url && bj?.type) {
  //   if (bj.type === 'pic') {
  //     // 渲染背景图片
  //     img.src = bj.url
  //     img.classList.add('zt-bj')
  //     document.body.append(img)
  //   }else{
  //     video.src = bj.url
  //     video.autoplay = true
  //     video.loop = true
  //     video.muted = true
  //     video.classList.add('zt-bj')
  //     document.body.append(video)
  //   }
  // }

  video.src = './assets/video/1.mp4'
  video.autoplay = true
  video.loop = true
  video.muted = true
  video.classList.add('zt-bj')



  document.body.append(video)
  const dock = document.querySelector('.dock')
  // 添加初始网站至dock栏
  addStartWebsite(dock)
  // 鼠标移入, 添加事件
  const docklist = document.querySelectorAll('.dock > div')
  mouseMoveFunction(docklist)
  // 鼠标移出, 清除事件
  removeMoveFunction(dock, docklist)
  // 设置代码
  const settingImg = document.querySelector('.setting-img')
  const settingToup = document.querySelector('.setting-toup')
  settingImg.addEventListener('click',function(event) {
    // 弹出设置框
    settingToup.classList.remove('hidden-toup')
    settingToup.classList.add('on-toup')
    event.stopImmediatePropagation()
  })
  // 禁止弹出框冒泡
  settingToup.addEventListener('click', function(event) {
    event.stopImmediatePropagation()
  })
  // 点击document 隐藏弹出框
  document.addEventListener('click', () => {
    settingToup.classList.remove('on-toup')
    settingToup.classList.add('hidden-toup')
    event.stopImmediatePropagation()
  },false)
  // 监听添加dock栏目点击
  const toupurl = document.querySelector('.toupurl')
  const toupname = document.querySelector('.toupname')
  const addDock = document.querySelector('.add-dock')
  addDock.addEventListener('click',() => {
    // 获取input值
    const val1 = toupurl.value
    const val2 = toupname.value
    const length = document.querySelectorAll('.list').length + 1

    const val3 = './assets/image/'+length+'.jpg'
    // 提示文本
    const tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    tooltip.innerHTML = val2

    const divNode = document.createElement('div')
    divNode.classList.add('list')
    // 添加点击事件
    divNode.addEventListener('click', () => {
      window.location.href= val1
    })
    dock.append(divNode)
    // 重新绑定事件
    if (1) {
      divNode.append(tooltip)
      divNode.style = `background: url(${val3}) 100% 100%; background-size:100% 100%;`
    }
    const docklist = document.querySelectorAll('.dock > div')
    const arr = JSON.parse(window.localStorage.getItem('websites'))
    arr.push({val1, val2, val3})
    window.localStorage.setItem('websites',JSON.stringify(arr))
    toupurl.value = ''
    toupname.value = ''
    // 存储到localstorage中
    mouseMoveFunction(docklist)
  })
  // 获取上传的图片
  const uploadPic = document.querySelector('.img-picture')
  uploadPic.addEventListener('change',(e) => {
    // 获取到图片的真实路径且存储到localstorage中
    console.log(e.target.files);
    window.localStorage.setItem('backgroundURL', JSON.stringify({type: 'pic', url: e.target.files[0]}))
    img.classList.add('zt-bj')
    // img.src = e.target.files[0]
    // document.body.removeChild(video)
    // document.body.append(img)
  })
  // 获取上传的视频
  const uploadViodeo = document.querySelector('.img-video')
  uploadViodeo.addEventListener('change',(e) => {
    // 获取到图片的真实路径且存储到localstorage中
    window.localStorage.setItem('backgroundURL', JSON.stringify({type: 'video', url: e.target.files[0]}))
    video.autoplay = true
    video.loop = true
    video.muted = true
    // video.classList.add('zt-bj')
    // document.body?.removeChild(img)
    // document.body.append(video)
    // 删除网页垃圾
    // video.src = isURL
  })
}()