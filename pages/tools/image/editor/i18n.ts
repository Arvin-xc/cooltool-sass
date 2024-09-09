export const zh = {
  common: {
    error: '错误',
    warning: '警告',
    color: {
      colorPicker: {
        hex: '十六进制',
        r: '红',
        g: '绿',
        b: '蓝',
        sliderHue: '颜色',
        sliderOpacity: '颜色不透明度'
      }
    }
  },
  mainCanvasActions: {
    buttonExport: '导出图片',
    buttonUndo: '撤销',
    buttonRedo: '重做',
    buttonClose: '关闭'
  },
  infoModals: {
    exporting: {
      heading: '正在导出...',
      body: '只需几秒钟...'
    },
    saving: {
      heading: '正在保存...',
      body: '只需几秒钟...'
    },
    loading: {
      heading: '正在加载...',
      body: '只需几秒钟...'
    },
    resizing: {
      heading: '正在调整大小...',
      body: '只需几秒钟...'
    },
    loadingFonts: {
      heading: '正在加载字体...',
      body: '只需几秒钟...'
    },
    stickerLoading: {
      heading: '正在加载贴图...',
      body: '只需几秒钟...'
    }
  },
  errorModals: {
    imageLoading: {
      headingDelimiter: '：',
      body: '无法加载图像。可能有多种原因，例如文件损坏或文件类型不受支持',
      buttonYes: '重试',
      buttonNo: '关闭'
    },
    rendering: {
      headingDelimiter: '：',
      body: '渲染图像时发生错误',
      buttonYes: '重试',
      buttonNo: '关闭'
    },
    fontLoading: {
      headingDelimiter: '：',
      heading: '无法加载字体',
      body: '以下字体无法加载：${error}',
      buttonNo: '关闭'
    },
    webcamUnavailable: {
      headingDelimiter: '：',
      body: '无法显示网络摄像头图像（错误：${error}）',
      buttonYes: '关闭'
    },
    stickerLoading: {
      headingDelimiter: '：',
      body: '无法加载贴图',
      buttonNo: '关闭'
    },
    unexpectedError: {
      headingDelimiter: '：',
      body: '发生了意外错误 ${error}',
      buttonYes: '重试',
      buttonNo: '关闭'
    }
  },
  warningModals: {
    imageResized: {
      headingDelimiter: '：',
      heading: '图像已调整大小',
      body: '您的图像超过了 ${megapixels} 百万像素的最大尺寸，并已调整为 ${width}x${height} 像素',
      buttonYes: '继续'
    },
    unsupportedSerializationVersion: {
      headingDelimiter: '：',
      body: '您的数据是从旧版本数据格式恢复的，可能会有所不同',
      buttonYes: '应用更改',
      buttonNo: '取消'
    },
    discardChanges: {
      headingDelimiter: '：',
      body: '您有未保存的更改。您确定要放弃更改吗？',
      buttonYes: '放弃更改',
      buttonNo: '保留更改'
    },
    unsavedChanges: {
      headingDelimiter: '：',
      body: '您有未保存的更改。您确定要退出吗？',
      buttonYes: '退出而不保存',
      buttonNo: '取消'
    },
    unsupportedWebGLRenderer: {
      body: '检测到浏览器中的问题可能导致加载时间过长。请尝试使用其他浏览器。',
      buttonYes: '继续'
    }
  },
  library: {
    title: '库',
    controls: {
      buttonUpload: '上传图像',
      buttonWebcamOpen: '打开网络摄像头',
      buttonWebcamClose: '关闭网络摄像头',
      placeholderSearch: '搜索库',
      noResults: '无结果',
      itemAriaLabel: '将图像替换为 ${label}'
    }
  },
  filter: {
    title: '过滤器',
    controls: {
      buttonReset: '移除过滤器',
      sliderIntensity: '过滤强度',
      itemAriaLabel: '添加${label}过滤器'
    },
    categories: {
      imgly_filter_category_duotone: '双色调',
      imgly_filter_category_bw: '黑白',
      imgly_filter_category_vintage: '复古',
      imgly_filter_category_smooth: '柔和',
      imgly_filter_category_cold: '冷色',
      imgly_filter_category_warm: '暖色',
      imgly_filter_category_legacy: '传统'
    },
    items: {
      imgly_lut_celsius: 'Inferno',
      imgly_lut_chest: 'Chestnut',
      imgly_lut_fixie: 'Fixie',
      imgly_lut_fridge: 'Fridge',
      imgly_lut_front: 'Sunny 70s',
      imgly_lut_k2: 'Flat Black',
      imgly_lut_mellow: 'Mellow',
      imgly_lut_sin: 'Hard Stuff',
      imgly_lut_texas: 'Oldtimer',
      imgly_lut_ad1920: '1920 A.D.',
      imgly_lut_ancient: 'Ancient',
      imgly_lut_bleached: 'Kalmen',
      imgly_lut_bleachedblue: 'Joran',
      imgly_lut_blues: 'Polaroid',
      imgly_lut_blueshadows: 'Zephyr',
      imgly_lut_breeze: 'Levante',
      imgly_lut_bw: '灰色',
      imgly_lut_classic: '经典',
      imgly_lut_colorful: '多彩',
      imgly_lut_cool: '爽朗',
      imgly_lut_cottoncandy: '糖果',
      imgly_lut_creamy: '奶油',
      imgly_lut_eighties: '低火',
      imgly_lut_elder: 'Colla',
      imgly_lut_evening: '日出',
      imgly_lut_fall: '苔藓',
      imgly_lut_food: '食物',
      imgly_lut_glam: '时髦',
      imgly_lut_gobblin: 'Gobblin',
      imgly_lut_highcarb: '高碳水化合物',
      imgly_lut_highcontrast: 'Hicon',
      imgly_lut_k1: 'K1',
      imgly_lut_k6: 'K6',
      imgly_lut_kdynamic: 'Pebble',
      imgly_lut_keen: 'Keen',
      imgly_lut_lenin: 'Lemon',
      imgly_lut_litho: 'Litho',
      imgly_lut_lomo: 'Lomo',
      imgly_lut_lomo100: 'Lomo 100',
      imgly_lut_lucid: 'Lucid',
      imgly_lut_neat: '整洁',
      imgly_lut_nogreen: '南瓜',
      imgly_lut_orchid: 'Solanus',
      imgly_lut_pale: '苍白',
      imgly_lut_pitched: 'Pitched',
      imgly_lut_plate: 'Weathered',
      imgly_lut_pola669: 'Green Gap',
      imgly_lut_polasx: 'Pola SX',
      imgly_lut_pro400: 'Pro 400',
      imgly_lut_quozi: 'Quozi',
      imgly_lut_sepiahigh: 'Sepia',
      imgly_lut_settled: 'Settled',
      imgly_lut_seventies: '七十年代',
      imgly_lut_soft: '柔软',
      imgly_lut_steel: '钢铁',
      imgly_lut_summer: '夏季',
      imgly_lut_sunset: '金色',
      imgly_lut_tender: '温柔',
      imgly_lut_twilight: '暮色',
      imgly_lut_winter: '柔和',
      imgly_lut_x400: 'Dusty',
      imgly_duotone_desert: '沙漠',
      imgly_duotone_peach: '桃子',
      imgly_duotone_clash: '冲突',
      imgly_duotone_plum: '李子',
      imgly_duotone_breezy: '清风',
      imgly_duotone_deepblue: '深蓝',
      imgly_duotone_frog: '青蛙',
      imgly_duotone_sunset: '日落'
    }
  },
  adjustment: {
    title: '调整',
    controls: {
      buttonReset: '重置调整'
    },
    categories: {
      basics: '基本',
      refinements: '细节'
    },
    items: {
      brightness: '亮度',
      saturation: '饱和度',
      contrast: '对比度',
      gamma: '伽马',
      sharpness: '锐度',
      clarity: '清晰度',
      exposure: '曝光',
      shadows: '阴影',
      highlights: '高光',
      whites: '白色',
      blacks: '黑色',
      temperature: '色温'
    }
  },
  focus: {
    title: '焦点',
    controls: {
      buttonReset: '移除焦点',
      sliderIntensity: '焦点强度',
      itemAriaLabel: '添加${label}焦点'
    },
    items: {
      radial: '径向',
      mirrored: '镜像',
      linear: '线性',
      gaussian: '高斯'
    },
    history: {
      focusPosition: '焦点位置',
      focusSize: '焦点大小'
    }
  },
  overlay: {
    title: '覆盖层',
    controls: {
      buttonReset: '移除覆盖层',
      sliderOpacity: '覆盖层不透明度',
      carouselBlendMode: '覆盖层混合模式',
      blendModeNormal: '普通',
      blendModeOverlay: '覆盖',
      blendModeHardLight: '强光',
      blendModeSoftLight: '柔光',
      blendModeMultiply: '正片叠底',
      blendModeDarken: '加深',
      blendModeLighten: '减淡',
      blendModeScreen: '屏幕',
      blendModeColorBurn: '颜色加深',
      tabOpacity: '不透明度',
      tabBlendMode: '混合模式',
      itemAriaLabel: '添加${name}覆盖层'
    },
    items: {
      imgly_overlay_bokeh: '浅景深',
      imgly_overlay_chop: '切割',
      imgly_overlay_clouds: '云朵',
      imgly_overlay_golden: '金色',
      imgly_overlay_grain: '颗粒',
      imgly_overlay_hearts: '心形',
      imgly_overlay_lightleak1: '光泄漏1',
      imgly_overlay_lightleak2: '光泄漏2',
      imgly_overlay_metal: '金属',
      imgly_overlay_mosaic: '马赛克',
      imgly_overlay_painting: '绘画',
      imgly_overlay_paper: '纸张',
      imgly_overlay_rain: '雨',
      imgly_overlay_vintage: '复古',
      imgly_overlay_wall1: '墙',
      imgly_overlay_wall2: '墙2',
      imgly_overlay_wood: '木头'
    }
  },
  sticker: {
    title: '贴纸',
    controls: {
      buttonUpload: '上传贴纸',
      sliderOpacity: '贴纸不透明度',
      selectColor: '贴纸颜色',
      tabColor: '颜色',
      tabOpacity: '不透明度',
      itemAriaLabel: '添加${label}贴纸'
    },
    categories: {
      imgly_sticker_emoticons: '表情',
      imgly_sticker_shapes: '形状',
      imgly_sticker_custom: '自定义'
    },
    items: {
      imgly_sticker_emoticons_alien: '外星人',
      imgly_sticker_emoticons_angel: '天使',
      imgly_sticker_emoticons_angry: '生气',
      imgly_sticker_emoticons_anxious: '焦虑',
      imgly_sticker_emoticons_asleep: '睡着',
      imgly_sticker_emoticons_attention: '注意',
      imgly_sticker_emoticons_baby_chicken: '小鸡',
      imgly_sticker_emoticons_batman: '蝙蝠侠',
      imgly_sticker_emoticons_beer: '啤酒',
      imgly_sticker_emoticons_black: '黑色',
      imgly_sticker_emoticons_blue: '蓝色',
      imgly_sticker_emoticons_blush: '脸红',
      imgly_sticker_emoticons_boxer: '拳击手',
      imgly_sticker_emoticons_business: '商务',
      imgly_sticker_emoticons_chicken: '鸡',
      imgly_sticker_emoticons_cool: '酷',
      imgly_sticker_emoticons_cry: '哭',
      imgly_sticker_emoticons_deceased: '死亡',
      imgly_sticker_emoticons_devil: '恶魔',
      imgly_sticker_emoticons_duckface: '鸭脸',
      imgly_sticker_emoticons_furious: '愤怒',
      imgly_sticker_emoticons_grin: '咧嘴笑',
      imgly_sticker_emoticons_guitar: '吉他',
      imgly_sticker_emoticons_harry_potter: '哈利波特',
      imgly_sticker_emoticons_hippie: '嬉皮士',
      imgly_sticker_emoticons_hitman: '刺客',
      imgly_sticker_emoticons_humourous: '幽默',
      imgly_sticker_emoticons_idea: '想法',
      imgly_sticker_emoticons_impatient: '不耐烦',
      imgly_sticker_emoticons_kiss: '吻',
      imgly_sticker_emoticons_kisses: '亲吻',
      imgly_sticker_emoticons_laugh: '笑',
      imgly_sticker_emoticons_loud_cry: '大哭',
      imgly_sticker_emoticons_loving: '爱',
      imgly_sticker_emoticons_masked: '带面具',
      imgly_sticker_emoticons_music: '音乐',
      imgly_sticker_emoticons_nerd: '书呆子',
      imgly_sticker_emoticons_ninja: '忍者',
      imgly_sticker_emoticons_not_speaking_to_you: '不和你说话',
      imgly_sticker_emoticons_pig: '猪',
      imgly_sticker_emoticons_pumpkin: '南瓜',
      imgly_sticker_emoticons_question: '问题',
      imgly_sticker_emoticons_rabbit: '兔子',
      imgly_sticker_emoticons_sad: '伤心',
      imgly_sticker_emoticons_sick: '生病',
      imgly_sticker_emoticons_skateboard: '滑板',
      imgly_sticker_emoticons_skull: '骷髅',
      imgly_sticker_emoticons_sleepy: '困倦',
      imgly_sticker_emoticons_smile: '微笑',
      imgly_sticker_emoticons_smoking: '吸烟',
      imgly_sticker_emoticons_sobbing: '啜泣',
      imgly_sticker_emoticons_star: '星星',
      imgly_sticker_emoticons_steaming_furious: '怒火中烧',
      imgly_sticker_emoticons_sunbathing: '日光浴',
      imgly_sticker_emoticons_tired: '疲倦',
      imgly_sticker_emoticons_tongue_out_wink: '吐舌眨眼',
      imgly_sticker_emoticons_wave: '挥手',
      imgly_sticker_emoticons_wide_grin: '咧嘴笑',
      imgly_sticker_emoticons_wink: '眨眼',
      imgly_sticker_emoticons_wrestler: '摔跤手',
      imgly_sticker_shapes_arrow_02: '箭头1',
      imgly_sticker_shapes_arrow_03: '箭头2',
      imgly_sticker_shapes_badge_01: '徽章1',
      imgly_sticker_shapes_badge_11: '徽章5',
      imgly_sticker_shapes_badge_12: '徽章6',
      imgly_sticker_shapes_badge_13: '徽章7',
      imgly_sticker_shapes_badge_15: '徽章8',
      imgly_sticker_shapes_badge_18: '徽章9',
      imgly_sticker_shapes_badge_19: '徽章10',
      imgly_sticker_shapes_badge_20: '徽章11',
      imgly_sticker_shapes_badge_28: '徽章12',
      imgly_sticker_shapes_badge_32: '徽章13',
      imgly_sticker_shapes_badge_35: '徽章14',
      imgly_sticker_shapes_badge_36: '徽章15',
      imgly_sticker_shapes_badge_04: '徽章2',
      imgly_sticker_shapes_badge_06: '徽章3',
      imgly_sticker_shapes_badge_08: '徽章4',
      imgly_sticker_shapes_spray_01: '喷漆1',
      imgly_sticker_shapes_spray_03: '喷漆2',
      imgly_sticker_shapes_spray_04: '喷漆3'
    },
    canvasActions: {
      buttonDelete: '删除',
      buttonBringToFront: '移到前面',
      buttonDuplicate: '复制',
      buttonFlipHorizontal: '水平翻转',
      buttonFlipVertical: '垂直翻转'
    },
    history: {
      add: '贴纸',
      resize: '贴纸调整大小',
      position: '贴纸位置',
      color: '贴纸颜色',
      delete: '删除贴纸',
      order: '贴纸顺序',
      opacity: '贴纸不透明度',
      flip: '贴纸翻转'
    }
  },
  text: {
    title: '文字',
    controls: {
      buttonNew: '新建文字',
      dropdownFontFamily: '字体',
      textFontSize: '字体大小',
      selectAlignment: '对齐',
      selectFontColor: '字体颜色',
      selectBackgroundColor: '背景颜色',
      sliderLineSpacing: '行间距',
      tabColor: '颜色',
      tabBgColor: '背景颜色',
      tabAlignment: '对齐',
      tabLineHeight: '行高',
      tabFontSize: '字体大小'
    },
    canvasControls: {
      placeholderText: '输入文字',
      buttonSave: '完成',
      buttonClose: '取消',
      inputText: '文字输入'
    },
    canvasActions: {
      buttonEdit: '编辑',
      buttonDelete: '删除',
      buttonBringToFront: '移到前面',
      buttonDuplicate: '复制'
    },
    history: {
      add: '添加文字',
      edit: '编辑文字',
      resize: '调整文字大小',
      position: '文字位置',
      alignment: '文字对齐',
      textColor: '文字颜色',
      backgroundColor: '文字背景颜色',
      fontFamily: '字体',
      fontStyle: '字体样式',
      lineSpacing: '行间距',
      width: '文字宽度',
      delete: '删除文字',
      order: '文字顺序'
    }
  },
  textdesign: {
    title: '文字设计',
    controls: {
      buttonNew: '新建文字设计',
      buttonShuffle: '布局混排',
      selectColor: '文字颜色',
      tabColor: '颜色',
      tabShuffle: '混排',
      itemAriaLabel: '添加 ${label} 文字设计'
    },
    canvasControls: {
      placeholderText: '用样式写点东西',
      buttonSave: '完成',
      buttonClose: '取消',
      inputText: '文字输入'
    },
    canvasActions: {
      buttonEdit: '编辑',
      buttonInvert: '反转',
      buttonDelete: '删除',
      buttonBringToFront: '移到前面',
      buttonDuplicate: '复制'
    },
    history: {
      add: '添加文字设计',
      edit: '编辑文字设计',
      resize: '调整文字设计大小',
      position: '文字设计位置',
      color: '文字设计颜色',
      shuffle: '文字设计混排',
      invert: '文字设计反转',
      padding: '文字设计内边距',
      order: '文字设计顺序',
      delete: '删除文字设计'
    }
  },
  frame: {
    title: '边框',
    controls: {
      buttonReset: '移除边框',
      sliderOpacity: '边框不透明度',
      sliderSize: '边框大小',
      selectColor: '边框颜色',
      tabColor: '颜色',
      tabOpacity: '不透明度',
      tabSize: '大小',
      itemAriaLabel: '添加 ${label} 边框'
    },
    items: {
      imgly_frame_dia: 'Dia',
      imgly_frame_art_decor: '装饰艺术',
      imgly_frame_black_passepartout: '黑色',
      imgly_frame_lowpoly_shadow: '低多边形',
      imgly_frame_wood_passepartout: '木头'
    }
  },
  brush: {
    title: '画笔',
    controls: {
      buttonReset: '移除画笔',
      sliderSize: '画笔大小',
      sliderHardness: '画笔硬度',
      selectColor: '画笔颜色',
      tabSize: '大小',
      tabHardness: '硬度',
      tabColor: '颜色'
    },
    history: {
      brushStroke: '画笔笔触'
    }
  },
  transform: {
    title: '变换',
    controls: {
      buttonReset: '恢复默认',
      checkboxKeepResolution: '保持分辨率',
      inputCropSize: '裁剪尺寸',
      inputHeight: '高',
      inputWidth: '宽',
      tabFlipAndRotate: '翻转和旋转',
      tabResolution: '分辨率',
      tabCropSize: '裁剪尺寸',
      itemAriaLabel: '应用 ${label} 裁剪',
      inputHeightAriaLabel: '裁剪高度',
      inputWidthAriaLabel: '裁剪宽度'
    },
    categories: {
      imgly_transforms_common: '常用',
      imgly_transforms_facebook: 'Facebook',
      imgly_transforms_twitter: 'Twitter',
      imgly_transforms_instagram: 'Instagram'
    },
    items: {
      imgly_transform_common_custom: '自定义',
      imgly_transform_common_square: '正方形',
      imgly_transform_common_4: '4:3',
      imgly_transform_common_16: '16:9',
      imgly_transform_common_3: '3:4',
      imgly_transform_common_9: '9:16',
      imgly_transform_facebook_profile: '个人资料',
      imgly_transform_facebook_title: '标题',
      imgly_transform_facebook_post: '帖子',
      imgly_transform_instagram_story: '故事',
      imgly_transform_instagram_landscape: '横向',
      imgly_transform_instagram_portrait: '纵向',
      imgly_transform_instagram_square: '正方形',
      imgly_transform_twitter_profile: '个人资料',
      imgly_transform_twitter_title: '标题',
      imgly_transform_twitter_post: '帖子'
    },
    transformActions: {
      buttonFlipHorizontal: '水平翻转',
      buttonFlipVertical: '垂直翻转',
      buttonRotateClockwise: '顺时针旋转',
      buttonRotateAntiClockwise: '逆时针旋转'
    }
  }
}
