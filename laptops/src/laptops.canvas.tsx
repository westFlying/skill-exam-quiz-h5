import {
  Callout,
  CollapsibleSection,
  H1,
  H2,
  Link,
  Pill,
  Row,
  Stack,
  Table,
  Text,
  useState,
} from "cursor/canvas";

type Model = {
  id: string;
  short: string;
  name: string;
  role: string;
  os: string;
  cpu: string;
  gpu: string;
  npu: string;
  ai: string;
  ram: string;
  ssd: string;
  screen: string;
  eye: string;
  battery: string;
  ports: string;
  body: string;
  price: string;
  priceNote: string;
  pros: string[];
  cons: string[];
  fit: string;
  skip: string;
};

const models: Model[] = [
  {
    id: "air14",
    short: "小新 Air 14",
    name: "联想 小新 Air 14 2026",
    role: "稳妥首选：价格余量最大，Copilot+ 级 NPU，1kg 出头",
    os: "Windows 11",
    cpu: "酷睿 Ultra 5 226V（Lunar Lake）：8 核 8 线程，最高 4.5GHz，整机稳定功耗 28W",
    gpu: "Arc 130V 核显（GPU 峰值约 53 TOPS）",
    npu: "40 TOPS，达到 Copilot+ 门槛",
    ai: "联想天禧 AI",
    ram: "16GB LPDDR5X-8533，板载不可换",
    ssd: "512GB PCIe 4.0（QLC，2242 规格），另有空闲 M.2 2280 槽可加盘",
    screen:
      "OLED 版：2.8K（2880×1800）120Hz，100% DCI-P3，ΔE<1，HDR 峰值 1100nits（评测实测 SDR 最亮约 400nits）。柔光 LCD 版：2.5K（2560×1600）120Hz，防眩光雾面，峰值 400nits，100% sRGB",
    eye: "LCD 版：全亮度 DC 调光。OLED 版：评测提到亮度调低时为 960Hz PWM，较高亮度为类 DC 调光",
    battery: "65Wh；65W USB-C 充电器（约 170g）",
    ports: "3×USB-C，没有 HDMI 和 USB-A，接投影、U 盘需要转接",
    body: "OLED 版 1.06kg / 11.9mm；柔光 LCD 版 1.14kg / 12.9mm；柔光版配色：深空、海盐",
    price: "LCD 版约 5100；OLED 版约 5300–5800",
    priceNote:
      "LCD 版：京东官旗 9/23，标价 5999，国补后 5099。OLED 版：京东 7/22 标价 6499 → 5524，8/20 标价 6299（PLUS）→ 5327；10/23 天猫有标价 6799 的同配置挂牌，85 折为 5779。",
    pros: [
      "价格余量最大，比 a豆14 Air、荣耀便宜约 500–900 元",
      "Lunar Lake 平台能效高，评测称日常使用噪音较低",
      "NPU 40 TOPS，达到 Copilot+ 门槛",
      "1.06kg（OLED）/ 1.14kg（LCD），65W 小充电器，通勤负担小",
      "OLED 与柔光 LCD 两种屏幕可选",
    ],
    cons: [
      "只有 3 个 USB-C，无 HDMI、USB-A，开会投屏、插 U 盘要带转接头",
      "16GB 板载不能升级；512GB 为 QLC 硬盘，偏小",
      "高负载时键盘区域偏热（评测）",
      "16GB 只适合 7B–8B 级的本地小模型",
    ],
    fit: "通勤多、办公为主、想把预算压在 5500 左右的人",
    skip: "常接投影或 U 盘又不想带转接头的人；想本地跑 14B 级模型的人",
  },
  {
    id: "adou",
    short: "a豆14 Air",
    name: "华硕 a豆14 Air 2026",
    role: "最轻最强：0.99kg + 50 TOPS NPU + 1TB，价格贴着 6000",
    os: "Windows 11",
    cpu: "锐龙 AI 9 H 465：10 核 20 线程（Zen 5 / Zen 5c），最高 5.0GHz，TDP 45W",
    gpu: "Radeon 880M（RDNA 3.5，12 个 CU），IT之家称强于 226V 核显",
    npu: "50 TOPS（XDNA 2）",
    ai: "豆叮 AI 助手（端云一体）：AI PPT、断网可用、本地知识库、文件搜索",
    ram: "16GB LPDDR5X，板载不可换（32GB 版 6799，超预算）",
    ssd: "1TB PCIe SSD，预留 M.2 扩展位",
    screen: "2.8K 120Hz OLED，HDR 峰值 1100nits，100% DCI-P3，ΔE<1，对比度 100 万:1",
    eye: "SGS、TÜV 双认证，硬件级低蓝光，带黑白阅读模式",
    battery: "70Wh；厂商数据：PCMark 10 办公续航约 18.8 小时，本地 1080P 视频约 29.6 小时",
    ports: "USB4 + 全功能 USB-C 3.2 + 2×USB-A + HDMI 2.1 + 3.5mm",
    body: "0.99kg / 14.9mm（镁铝合金）；配色：风信子蓝、鸢尾花紫（贵 100 元）",
    price: "约 5950",
    priceNote:
      "IT之家 10/20：标价 7299，首发立减 300，国补后 5949；另有报道称 6034（标价 7399）。首发优惠结束后可能回到 6000 以上。",
    pros: [
      "全场最轻，0.99kg / 14.9mm",
      "NPU 50 TOPS，核显也强于 226V",
      "1TB 起步，接口齐全（USB4、USB-A、HDMI 2.1）",
      "厂商标称办公续航约 18.8 小时",
      "豆叮 AI 助手支持 AI PPT、断网可用、本地知识库",
    ],
    cons: [
      "16GB 板载不能升级，32GB 版 6799 超预算",
      "5949 是首发优惠价，贴着 6000 线，活动结束后可能超预算",
      "OLED 屏：长时间静态界面有残影风险，低亮度可能有 PWM 调光",
    ],
    fit: "要最轻、1TB、AI 平台强，且预算用满的人",
    skip: "预算严格卡在 6000 以内、又想要 32GB 的人",
  },
  {
    id: "honor",
    short: "荣耀 MagicBook 14",
    name: "荣耀 MagicBook 14 2026",
    role: "32GB + 92Wh：续航和本地 AI 容量最强，机身偏重",
    os: "Windows 11",
    cpu: "酷睿 Ultra 5 336H（Panther Lake，Intel 18A）：12 核 12 线程（4P + 4E + 4 低功耗 E），最高 4.6GHz，基础功耗 25W",
    gpu: "Intel Graphics，仅 4 个 Xe3 核心（GPU 峰值 37 TOPS），规格较低",
    npu: "47 TOPS（Intel 官方规格）",
    ai: "荣耀 YOYO（含 YOYO Claw）",
    ram: "32GB LPDDR5X-8533，板载",
    ssd: "1TB，双 M.2 2280 插槽",
    screen: "2.8K（2880×1800）120Hz IPS 雾面屏，430nits，100% sRGB",
    eye: "莱茵低蓝光、无频闪认证；LCD，无烧屏顾虑",
    battery: "92Wh；100W 氮化镓充电器，可与手机共用；官方称真实续航约 15.6 小时",
    ports: "2×USB-C + 2×USB-A + HDMI 2.1",
    body: "1.39kg / 16.5mm",
    price: "约 5700–6250",
    priceNote:
      "京东 4–8 月报价：5849（4/20）、5799（5/24）、6163（7/24）、6093（8/7）、6247（约 8/20，PLUS）；天猫超市 8/30 叠券 5694。10 月未查到新报价；京东另有 16GB/1TB 版，价格未查到。",
    pros: [
      "32GB + 1TB + 92Wh，同价位少见",
      "官方称真实续航约 15.6 小时",
      "双 M.2 插槽，接口齐全，100W 氮化镓充电器可与手机共用",
      "IPS 雾面屏，有莱茵低蓝光、无频闪认证，无烧屏顾虑",
    ],
    cons: [
      "1.39kg / 16.5mm，是五款里偏重的一档",
      "核显规格较低（4 个 Xe3 核心），本地模型速度一般，优势主要是 32GB 容量",
      "价格在 5700–6250 间波动，可能略超 6000",
      "屏幕 430nits、100% sRGB，色彩和亮度不如 OLED",
    ],
    fit: "想本地跑小模型、常出差要长续航、不介意 1.4kg 的人",
    skip: "每天通勤、对重量敏感的人；预算严格卡 6000 的人",
  },
  {
    id: "mate14w",
    short: "MateBook 14（Windows）",
    name: "华为 MateBook 14 酷睿 Ultra（Windows 版）",
    role: "质感与华为生态：3:2 触控 OLED、70Wh、接口够用；平台是 2023 年的老款，NPU 仅 11 TOPS",
    os: "Windows 11 家庭版。华为商城默认选中的是 Linux V20 版，要 Windows 须认“Windows 版 / 预装 Windows 版”，部分店铺标注“未激活”",
    cpu: "酷睿 Ultra 5 125H（Meteor Lake，2023 年 12 月发布）：14 核 18 线程（4P + 8E + 2 低功耗 E），最高 4.5GHz；华为称整机约 40W 性能释放",
    gpu: "Intel Arc 核显（7 个 Xe 核心，GPU 峰值 18 TOPS）",
    npu: "11 TOPS（Intel AI Boost），整平台总算力 33 TOPS；达不到 Copilot+ 的 40 TOPS",
    ai: "华为电脑管家的 AI 空间：会议概要、AI 纪要、实时字幕翻译（需联网，部分为限时尝鲜，后期可能收费）；超级终端、华为分享，与华为手机、平板互联",
    ram: "16GB / 24GB / 32GB 可选，板载焊接，买后不能加",
    ssd: "1TB PCIe NVMe SSD",
    screen:
      "14.2 英寸 3:2，2880×1920 OLED 触控屏（10 点触控），120Hz，典型 450nits（Notebookcheck 实测 SDR 约 370nits、HDR 约 500nits），100% sRGB / 100% DCI-P3 / 95% Adobe RGB；整面玻璃盖板，光面，反光明显（Notebookcheck）",
    eye: "华为：莱茵 Eye Comfort 认证，低亮度下 1920Hz 高频 PWM 调光。Notebookcheck 对 2024 款的实测：亮度 100% 及以下检测到 238Hz 闪烁（幅度 57%），低亮度另有约 1kHz 闪烁，称敏感用户可能不适",
    battery:
      "70Wh；65W USB-C 充电器（线与充电头一体，不可拆，约 202g）；华为标称本地 1080P 视频约 19 小时。实测：Wi-Fi 网页浏览约 12.6 小时（Notebookcheck），400nits 下浏览约 9 小时 10 分（GSMArena，Ultra 7 版）",
    ports: "1×USB-C（USB 3.2 Gen1，DP 1.2，关机时可对外供电 40W）+ 2×USB-A + HDMI 1.4b + 3.5mm；没有雷电 / USB4；Wi-Fi 6、蓝牙 5.1",
    body: "1.31kg / 14.5mm（最厚处 15.9mm）；配色：原野绿、皓月银、深空灰",
    price: "约 5500–6000（估算，10 月无可靠新价）",
    priceNote:
      "华为商城默认选中 Linux V20 版：Ultra 5 / 16GB / 1TB 标价 6799，32GB / 1TB 标价 7599（CNMO 3/16），国补后约 5779 / 6459；页面另有 Windows 选项，价格和是否预激活以页面为准。深圳门店活动：Linux 版立减 350 元后叠国补约 5482，门店可免费代装 Windows（需预约）。京东店铺“预装 Windows 版（未激活）”：5/27 标价 6739，国补后约 5999；2–5 月曾见 5799 标价、国补后约 4929。10 月没查到可靠的新报价。",
    pros: [
      "3:2 触控 OLED（2880×1920），网页、文档、表格能多显示几行；金属机身，1.31kg / 14.5mm，做工质感好",
      "接口比小新 Air 14 实用：USB-C + 2×USB-A + HDMI，接 U 盘、投影不用转接头",
      "70Wh 电池，实测 Wi-Fi 网页浏览约 12.6 小时（Notebookcheck）",
      "华为手机、平板互联成熟（碰传、多屏协同、超级终端），这是它区别于其他品牌的地方",
      "国补后约 5500–6000，在预算内；电源键带指纹",
    ],
    cons: [
      "平台偏旧：酷睿 Ultra 5 125H 是 2023 年底的第一代酷睿 Ultra，NPU 11 TOPS，非 Copilot+，语音聚焦等功能用不了",
      "系统要看清：华为商城默认选中 Linux V20；要 Windows 须选 Windows 版或第三方店铺的“预装 Windows 版”，有的标“未激活”。自己装 Windows 要自购激活码，且不能双系统（华为官网）",
      "光面触控屏，反光明显；Notebookcheck 在 2024 款上测到 238Hz 闪烁，对频闪敏感的人不友好",
      "只有 1 个 USB-C，没有雷电 / USB4，HDMI 为 1.4b，无线为 Wi-Fi 6",
      "前置摄像头 200 万像素，画质一般，没有红外人脸识别；充电器线与头一体，不可拆",
      "内存板载，16GB 版长期用偏紧；32GB 版标价 7599，超预算",
      "1.31kg，比小新 Air 14 OLED 版重约 250g，厚约 2.6mm",
    ],
    fit: "用华为手机或平板、想要 3:2 触控屏、常接 U 盘和投影的人",
    skip: "要 Copilot+ 级端侧 AI、对频闪和反光敏感、不想纠结系统版本的人",
  },
  {
    id: "mate14h",
    short: "MateBook 14 鸿蒙版",
    name: "华为 MateBook 14 鸿蒙版（麒麟 X90）",
    role: "24GB + 21 小时标称续航 + 华为生态；系统是 HarmonyOS，不是 Windows",
    os: "HarmonyOS 6.1（不是 Windows，不能直接装 .exe 软件）",
    cpu: "麒麟 X90（华为自研）；稳态性能对应热设计功耗 40W",
    gpu: "集成核显，华为官网未列规格",
    npu: "华为官网未标注 TOPS；系统自带“本地 AI 模型管理”，可下载 DeepSeek、Qwen 等开源模型，经 Chatbox、Cherry Studio 等应用调用",
    ai: "小艺（慧记、深度研究、深度解题、知识闪卡，需联网）；豆包鸿蒙电脑版 10 月上线；小艺 Work 内测中；Kimi、DeepSeek 等可用网页版（原生版上架情况没查到）",
    ram: "24GB（32GB 版标价 8599，超预算）",
    ssd: "512GB（24GB + 1TB 版标价 7599）",
    screen:
      "14.2 英寸 3:2，2880×1920 OLED 触控屏（10 点触控），120Hz；标准版为抗反射屏，典型 450nits / 峰值 500nits；柔光版典型 500nits / 峰值 600nits；100% sRGB + P3，ΔE<1",
    eye: "华为标称：低亮度下 1920Hz 高频 PWM 调光；柔光版（云晰柔光屏）另有漫反射减反光设计，仅柔光版支持",
    battery:
      "70Wh；华为标称本地 1080P 视频约 21 小时、爱奇艺约 20 小时、腾讯语音会议约 15 小时；关机状态可对外反向快充（最高 66W）",
    ports: "1×USB-C（USB 3.2 Gen1，DP 1.2）+ 2×USB-A + HDMI 2.1 + 3.5mm；Wi-Fi 7+",
    body: "1.33kg（圆键盘）/ 1.32kg（方键盘），14.5mm；配色：原野绿、樱粉金、深空灰",
    price: "约 5600（标价 6599）",
    priceNote:
      "24GB + 512GB 标价 6599（IT之家 4/28 开售），按 15% 国补约 5609。华为双 11 口径：国补 15% 叠加 300 元教育优惠，到手 5355（IT之家 10/23，需教育优惠资格）。柔光版 7399，国补后约 6289，超预算。",
    pros: [
      "24GB 内存 + 70Wh，华为标称本地视频续航约 21 小时",
      "3:2 触控 OLED，1.33kg / 14.5mm；USB-C + 2×USB-A + HDMI 2.1，接口够用",
      "WPS、微信、企业微信、钉钉、飞书、腾讯会议已有鸿蒙电脑版；豆包 10 月上线",
      "系统自带本地 AI 模型管理，可下载 DeepSeek、Qwen 等开源模型离线使用",
      "与华为手机、平板碰传、多屏协同；国补后约 5609，在预算内",
    ],
    cons: [
      "不能直接装 Windows 软件；要用 Windows 专业软件得靠铠大师等虚拟机",
      "Adobe 全家桶、AutoCAD 等暂无原生鸿蒙版；预装的是 WPS 和中望 CAD，没有 Microsoft Office",
      "512GB 起步；1TB 版 7599、柔光版 7399，都超预算",
      "Windows 端侧 AI（Copilot+ 等）用不了；NPU 算力没有公开数据，本地大模型的速度要看实测",
      "公司内部系统、U 盾、打印机等外设是否可用，需要先向公司 IT 或华为客服确认",
    ],
    fit: "用华为手机或平板，日常软件集中在 WPS、微信 / 企业微信、浏览器、豆包这类的人",
    skip: "公司要求 Windows 专用软件、微软 Office 宏，或需要 Adobe、AutoCAD 的人",
  },
  {
    id: "hp",
    short: "星Book Pro Air 14",
    name: "惠普 星Book Pro Air 14",
    role: "接口全、轻薄、价格低；AI 平台是短板",
    os: "Windows 11",
    cpu: "酷睿 Ultra 5 225H（Arrow Lake-H）：14 核 14 线程（4P + 8E + 2 低功耗 E），最高 4.9GHz，18MB 缓存；性能释放 45W（厂商）",
    gpu: "Arc 130T 核显（GPU 峰值约 63 TOPS）",
    npu: "13 TOPS，非 Copilot+（宣传的 83 TOPS 是 CPU + GPU + NPU 总和）",
    ai: "惠小微 AI：本地化 AI 与实时同声传译（惠普口径）",
    ram: "16GB LPDDR5X，板载不可换",
    ssd: "512GB（另有 1TB 版），备用 M.2 2242 槽",
    screen: "2.8K 120Hz OLED，HDR 峰值 1100nits，100% DCI-P3",
    eye: "HP Eye Ease 护眼；中关村在线称高频 PWM 调光",
    battery: "60Wh；100W 氮化镓充电器（约 197g）",
    ports: "2×USB-C + 2×USB-A + HDMI 2.1",
    body: "1.09kg / 12.75mm",
    price: "约 5070–5830",
    priceNote:
      "京东：标价 6499，国补后 5524（10/17 标价仍为 6499）；9/30 叠券 + PLUS 曾到 5071（已过期）；7 月标价 6998 时约 5834。",
    pros: [
      "1.09kg / 12.75mm，轻薄",
      "接口全：2×USB-C、2×USB-A、HDMI 2.1",
      "100W 氮化镓充电器仅约 197g",
      "2.8K OLED，价格在五款里偏低",
    ],
    cons: [
      "NPU 仅 13 TOPS，非 Copilot+，语音聚焦等功能用不了",
      "16GB 板载不能升级",
      "60Wh 电池较小",
      "宣传的 83 TOPS 是总算力，容易误导",
    ],
    fit: "常接投影或 U 盘、AI 主要用云端、预算偏紧的人",
    skip: "看重端侧 AI 功能、希望几年后仍不落伍的人",
  },
  {
    id: "pro14",
    short: "小新 Pro 14（H 350）",
    name: "联想 小新 Pro 14 AI 元启版（锐龙 AI 7 H 350）",
    role: "预算内的 32GB 备选：内存可扩展，但是 2025 款、1.39kg",
    os: "Windows 11",
    cpu: "锐龙 AI 7 H 350：8 核 16 线程（Zen 5），最高 5.0GHz，最大功耗约 53W",
    gpu: "Radeon 860M",
    npu: "50 TOPS（XDNA 2）",
    ai: "联想天禧智能体“小天”",
    ram: "32GB DDR5-5600，双插槽，可扩到 96GB",
    ssd: "1TB PCIe 4.0，另有 2280 槽，最大 6TB",
    screen:
      "2.8K（2880×1800）120Hz（30–120Hz VRR）OLED，HDR 峰值 1100nits（典型 500nits），100% DCI-P3，ΔE<1，DisplayHDR True Black 1000",
    eye: "莱茵低蓝光；联想 OLED CARE 防烧屏保护，并提供烧屏保修",
    battery: "60Wh",
    ports: "2×全功能 USB-C + 2×USB-A 3.2 + HDMI 2.0 + TF 读卡器 + 3.5mm",
    body: "1.39kg / 16.9mm",
    price: "约 5270（估算）",
    priceNote:
      "联想知识库 10/21 参考价 6199，按 85 折估算；历史：京东 1/26 为 5524，4/30 为 5515，天猫 5/7 为 4759（含教育优惠）。需以下单页为准。",
    pros: [
      "32GB 内存可扩到 96GB，硬盘可扩到 6TB",
      "NPU 50 TOPS，接口最全（含 TF 读卡器、3.5mm）",
      "OLED 带防烧屏保护和烧屏保修",
      "约 5270（估算），是 ≤6000 里少数的 32GB 选择",
    ],
    cons: [
      "2025 款，仍在售但平台偏旧",
      "1.39kg / 16.9mm，偏重",
      "60Wh 电池偏小，续航不如荣耀",
      "价格靠估算，需到结算页确认",
    ],
    fit: "必须 ≤6000 又要 32GB、想自己加内存或硬盘的人",
    skip: "追求轻便、追求新平台的人",
  },
];

const specRows: { label: string; get: (m: Model) => string; strong?: boolean }[] = [
  { label: "定位", get: (m) => m.role, strong: true },
  { label: "操作系统", get: (m) => m.os },
  { label: "处理器", get: (m) => m.cpu },
  { label: "核显", get: (m) => m.gpu },
  { label: "NPU", get: (m) => m.npu },
  { label: "预装 AI 助手", get: (m) => m.ai },
  { label: "内存", get: (m) => m.ram },
  { label: "硬盘", get: (m) => m.ssd },
  { label: "屏幕", get: (m) => m.screen },
  { label: "护眼与调光", get: (m) => m.eye },
  { label: "电池 / 充电", get: (m) => m.battery },
  { label: "接口", get: (m) => m.ports },
  { label: "重量 / 厚度", get: (m) => m.body },
  { label: "含国补参考价（元）", get: (m) => m.price, strong: true },
  { label: "价格依据", get: (m) => m.priceNote },
];

const mateNotes: { version: string; why: string; good: string; check: string }[] = [
  {
    version: "Windows 版（酷睿 Ultra 5 125H）",
    why: "平台是 2023 年底的第一代酷睿 Ultra，NPU 只有 11 TOPS，达不到 Copilot+；国补后约 5500–6000，比小新 Air 14 柔光 LCD 版（约 5100）贵几百元，平台却更旧；2026 款在华为商城默认选中 Linux V20，要 Windows 得认对版本。",
    good: "3:2 触控 OLED、金属机身 1.31kg、70Wh、USB-A + HDMI 接口、与华为手机 / 平板互联。",
    check: "商品页写明 Windows 版，并问清是否已激活、是否赠激活密钥；32GB 版标价 7599，超预算；对频闪、反光敏感的人先看实物。",
  },
  {
    version: "鸿蒙版（麒麟 X90）",
    why: "系统是 HarmonyOS，不能直接装 Windows 软件；Microsoft Office、Adobe、AutoCAD 没有原生版本；NPU 没有公开算力数据。",
    good: "24GB 内存、标称 21 小时续航；WPS、微信、企业微信、钉钉、飞书、腾讯会议已有鸿蒙电脑版，豆包 10 月上线，系统自带本地 AI 模型管理；国补后约 5609。",
    check: "她每天用的软件、公司内部系统、U 盾、打印机能否在鸿蒙上用；512GB 起步，1TB 版 7599、柔光版 7399 都超预算。",
  },
];

const bests: { dim: string; winner: string; basis: string }[] = [
  {
    dim: "最轻",
    winner: "华硕 a豆14 Air",
    basis: "0.99kg / 14.9mm；其后是小新 Air 14 OLED 版 1.06kg、星Book 1.09kg",
  },
  {
    dim: "价格余量最大",
    winner: "小新 Air 14（柔光 LCD 版）",
    basis: "约 5100（9/23），比 6000 线低约 900 元；星Book 最近为 5524，小新 Pro 14 估算 5270",
  },
  {
    dim: "电池容量最大",
    winner: "荣耀 MagicBook 14",
    basis: "92Wh，官方称真实续航约 15.6 小时；a豆14 Air 为 70Wh，MateBook 14 两个版本均为 70Wh",
  },
  {
    dim: "标称办公续航最长",
    winner: "华硕 a豆14 Air",
    basis:
      "PCMark 10 约 18.8 小时（厂商数据；各家测试口径不同，不能直接比较）；鸿蒙版 MateBook 14 标称本地视频 21 小时，口径是视频播放，同样不能直接比较",
  },
  {
    dim: "NPU 最强",
    winner: "a豆14 Air、小新 Pro 14",
    basis: "均为 50 TOPS；荣耀 47，小新 Air 14 为 40，星Book 为 13，MateBook 14（Windows 版）为 11；鸿蒙版官网未标注",
  },
  {
    dim: "内存最大",
    winner: "荣耀、小新 Pro 14",
    basis: "均为 32GB；小新 Pro 14 是可扩展的插槽内存（最大 96GB）；鸿蒙版 MateBook 14 为 24GB",
  },
  {
    dim: "接口最全",
    winner: "小新 Pro 14",
    basis: "2×USB-C + 2×USB-A + HDMI 2.0 + TF + 3.5mm；a豆14 Air 有 USB4 + HDMI 2.1",
  },
  {
    dim: "3:2 触控屏 / 华为生态",
    winner: "华为 MateBook 14（Windows 版、鸿蒙版）",
    basis: "14.2 英寸 3:2、2880×1920 OLED 触控屏；与华为手机、平板碰传、多屏协同",
  },
  {
    dim: "最适合怕频闪、怕反光",
    winner: "小新 Air 14（柔光 LCD 版）",
    basis: "防眩光雾面 + 全亮度 DC 调光；荣耀为 IPS 雾面屏，有莱茵认证",
  },
  {
    dim: "32GB 且 ≤6000 更稳",
    winner: "小新 Pro 14",
    basis: "约 5270（估算）；荣耀 5700–6250 浮动，可能略超",
  },
];

const glossary: { term: string; what: string; impact: string }[] = [
  {
    term: "NPU 与 TOPS",
    what: "NPU 是专门跑 AI 的小芯片，TOPS 是算力单位。微软 Copilot+ PC 要求 NPU 达到 40 TOPS 以上，并有 16GB 内存、256GB 存储。",
    impact:
      "背景虚化、自动取景等基础特效有 NPU 即可，语音聚焦需要 40 TOPS 以上。豆包、Kimi、DeepSeek 等云端 AI 基本不受影响。惠普 225H 宣传的 83 TOPS 是 CPU + GPU + NPU 总和，NPU 本体只有 13 TOPS；MateBook 14（Windows 版）的 125H 为 11 TOPS，同样不到门槛。",
  },
  {
    term: "板载内存与插槽内存",
    what: "LPDDR5X 焊在主板或封装上，带宽高、省电，但买后不能换；SO-DIMM 是可插拔的内存条。",
    impact:
      "板载机型买时就要定容量。16GB 够日常办公和云端 AI，本地跑 14B 级模型要 32GB；小新 Pro 14 的内存可自己扩展。",
  },
  {
    term: "OLED 与柔光 LCD",
    what: "OLED 色彩和对比度好、能 HDR，但有烧屏和低亮度 PWM 的问题；柔光 LCD 防反光、无烧屏。",
    impact:
      "每天长时间看白底文档、办公室灯光反光多，优先柔光 LCD（小新 Air 14 柔光版、荣耀）；爱追剧修图选 OLED。",
  },
  {
    term: "PWM 与 DC 调光",
    what: "屏幕调低亮度的两种方式：PWM 靠高速闪烁，DC 直接降低电流。PWM 频率越高越不易察觉。",
    impact:
      "对频闪敏感的人优先 DC 调光或高频 PWM。小新 Air 14 柔光版为全亮度 DC 调光；OLED 版评测提到低亮度档为 960Hz PWM。MateBook 14 的厂商标称是低亮度 1920Hz，但 Notebookcheck 对 2024 款测到 238Hz 闪烁。",
  },
  {
    term: "烧屏",
    what: "OLED 长时间显示固定内容（任务栏、浏览器标签栏）可能留下残影。",
    impact: "开深色模式、自动隐藏任务栏、设置屏保；小新 Pro 14 提供防烧屏保护和烧屏保修。",
  },
  {
    term: "国家补贴（国补）",
    what: "电脑类 15% 补贴，单件最高 1500 元，在京东、天猫或官方商城结算页直接抵扣。",
    impact: "额度和地区有限，先到先得；部分渠道不能与教育优惠、以旧换新叠加；最终以结算页为准。",
  },
  {
    term: "鸿蒙电脑与 Windows 电脑",
    what: "鸿蒙电脑运行华为的 HarmonyOS，装的是鸿蒙版应用，不能直接安装 Windows 的 .exe 软件；要用 Windows 软件，得通过铠大师等虚拟机。",
    impact:
      "WPS、微信、企业微信、钉钉、飞书、腾讯会议已有鸿蒙电脑版，豆包 10 月上线；Microsoft Office、Adobe 全家桶、AutoCAD 没有原生版本。买之前把她每天用的软件和公司内部系统列出来，逐个确认。",
  },
  {
    term: "Linux V20 版与预装 Windows 版",
    what: "2026 款华为笔记本在华为商城默认选中预装 Linux（统信 UOS）V20 的版本；第三方店铺有“预装 Windows 版”，有的标注“未激活”。",
    impact:
      "要 Windows 就认“预装 Windows 版”，并问清是否赠激活密钥；自己装 Windows 要自购激活码，且不能双系统；Linux 版不支持华为分享一碰传、F10 一键还原、指纹开机（华为官网）。",
  },
];

const tips: string[] = [
  "同名机型有 OLED / LCD、16GB / 32GB、512GB / 1TB 多个版本，差价几百到上千元；注意标题里是“2026 款”还是旧款。",
  "小新 Air 14、a豆14 Air、荣耀、星Book、MateBook 14（Windows 版）的内存都是板载，不能升级，买时就要定容量。",
  "华为 MateBook 14 同配置常有 Linux V20、预装 Windows、鸿蒙三种链接，价差几百元；下单前看清商品页写的系统。",
  "OLED 机型开深色模式、自动隐藏任务栏；对频闪敏感优先柔光 LCD。",
  "京东 10/30 开门红、11/10–11/11 是大促高点；存储涨价背景下，价格大概率不会比现在低很多，目标机型已在预算内就不必死等。",
  "收货后 7 天内检查坏点、漏光、风扇声和键盘，并保留结算页截图。",
];

const sources: { label: string; href: string }[] = [
  { label: "小新 Air 14 首发（IT之家，6/10）", href: "https://www.ithome.com/0/962/517.htm" },
  { label: "小新 Air 14 柔光版发布（IT之家，7/10）", href: "https://www.ithome.com/0/975/054.htm" },
  { label: "小新 Air 14 柔光版国补价 5099（中关村在线，9/23）", href: "https://nb.zol.com.cn/1252/12522488.html" },
  { label: "小新 Air 14 OLED 版 7/22 价格（逛丢）", href: "http://b.guangdiu.com/detail.php?id=28559031" },
  { label: "小新 Air 14 OLED 版评测（重量、充电器、PWM 说明）", href: "http://www.bangzhongren.com/95307.html" },
  { label: "a豆14 Air 16GB+1TB 版（IT之家，10/20）", href: "https://www.ithome.com/1/015/490.htm" },
  { label: "a豆14 Air 接口与续航（太平洋科技，10/9）", href: "https://notebook.pconline.com.cn/2183/21833121.html" },
  { label: "荣耀 MagicBook 14/16 2026 发布（IT之家，4/16）", href: "https://www.ithome.com/0/939/926.htm" },
  { label: "荣耀 MagicBook 14 8/7 报价（中关村在线）", href: "https://nb.zol.com.cn/1227/12278453.html" },
  { label: "荣耀 MagicBook 14 7/24 报价（逛丢）", href: "https://guangdiu.com/detail.php?id=28599564" },
  {
    label: "Intel 酷睿 Ultra 5 336H 规格（Intel）",
    href: "https://www.intel.com/content/www/us/en/products/sku/245533/intel-core-ultra-5-processor-336h-18m-cache-up-to-4-60-ghz/specifications.html",
  },
  { label: "华为 MateBook 14 酷睿 Ultra 规格参数（华为官网）", href: "https://consumer.huawei.com/cn/laptops/matebook-14-2024/specs/" },
  {
    label: "华为 MateBook 14 酷睿 Ultra Linux V20 版商品页（华为商城）",
    href: "https://www.vmall.com/product/comdetail/index.html?prdId=10086627212823&sbomCode=2801010174919",
  },
  { label: "华为 2026 款笔记本换用 Linux V20 并涨价（CNMO，3/16）", href: "https://m.cnmo.com/news/805522.html" },
  { label: "Linux（UOS）版笔记本常见问题（华为官网）", href: "https://consumer.huawei.com/cn/support/content/zh-cn16038929/" },
  { label: "MateBook 14 酷睿 Ultra 购买要点：系统、接口、价格（什么值得买，8/6）", href: "https://post.smzdm.com/p/a3mon6k5/" },
  { label: "深圳门店 MateBook 14 Linux 版优惠与代装 Windows（ZOL 问答）", href: "https://ask.zol.com.cn/x/34507043.html" },
  { label: "MateBook 14 国补后 5999 元（中关村在线，5/27）", href: "https://nb.zol.com.cn/1187/11879369.html" },
  {
    label: "Intel 酷睿 Ultra 5 125H 规格（Intel）",
    href: "https://www.intel.com/content/www/us/en/products/sku/236848/intel-core-ultra-5-processor-125h-18m-cache-up-to-4-50-ghz/specifications.html",
  },
  {
    label: "MateBook 14 (2024) 评测：PWM、续航、屏幕、摄像头（Notebookcheck）",
    href: "https://www.notebookcheck.net/Huawei-MateBook-14-2024-laptop-with-a-3-2-screen-review-Let-down-by-some-minor-issues.846456.0.html",
  },
  { label: "MateBook 14 2024 评测：散热与续航（GSMArena）", href: "https://www.gsmarena.com/huawei_matebook_14_2024_review-news-64766.php" },
  { label: "MateBook 14 鸿蒙版规格参数（华为官网）", href: "https://consumer.huawei.com/cn/harmonyos-computer/matebook-14-harmonyos-version/specs/" },
  { label: "MateBook 14 鸿蒙版开售与价格（IT之家，4/28）", href: "https://www.ithome.com/0/944/252.htm" },
  { label: "华为双 11 办公产品选购指南（IT之家，10/23）", href: "https://www.ithome.com/1/016/865.htm" },
  { label: "MateBook 14 鸿蒙版选购解读（京东消费决策中心，10/15）", href: "https://dir.jd.com/guide/jd-geo-detail-hua-wei-matebook-14-v1" },
  { label: "鸿蒙电脑应用突破 19000 款（BigSaaS，10/6）", href: "https://www.bigsaas.com/article-1058.html" },
  { label: "豆包登陆鸿蒙电脑（凤凰网，10/8）", href: "https://tech.ifeng.com/c/8x3YNVDTt39" },
  { label: "鸿蒙电脑“本地 AI 模型管理”（华为官网）", href: "https://consumer.huawei.com/cn/support/content/zh-cn16070843/" },
  { label: "星Book Pro Air 14 价格记录（什么值得买）", href: "https://www.smzdm.com/p/183138756/" },
  { label: "星Book Pro Air 14 选购指南（IT之家，9/17）", href: "https://www.ithome.com/1/003/478.htm" },
  { label: "小新 Pro 14 AI 元启版参考价（联想知识库，10/21）", href: "https://www.lenovo.com.cn/wiki/product-1044216.html" },
  { label: "小新 Pro 14 锐龙版参数（什么值得买）", href: "https://post.smzdm.com/p/a0z6d9x0/" },
  {
    label: "酷睿 Ultra 200 系列 NPU 与总算力规格表（Intel 规格表转载）",
    href: "https://i-teh.com/upload/iblock/f0e/ew0h0l2zrc4oiujsze3t77drxqzc50oo.pdf",
  },
  {
    label: "Windows Studio Effects 的 NPU 要求（Microsoft Learn）",
    href: "https://learn.microsoft.com/en-us/windows/ai/cards/windows-studio-effects-application-card",
  },
  {
    label: "Copilot+ PC 的 40+ TOPS 要求（Microsoft 支持）",
    href: "https://support.microsoft.com/en-us/surface/drivers-firmware/learn-more-about-copilot-pcs-and-windows-11-pcs-from-surface",
  },
];

function Label({ text }: { text: string }) {
  return (
    <Text size="small" weight="semibold" style={{ minWidth: 88 }}>
      {text}
    </Text>
  );
}

function Cell({ text, width = 176, strong = false }: { text: string; width?: number; strong?: boolean }) {
  return (
    <Text size="small" weight={strong ? "semibold" : "normal"} style={{ minWidth: width }}>
      {text}
    </Text>
  );
}

function Bullets({ items, width }: { items: string[]; width: number }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 16, minWidth: width }}>
      {items.map((t) => (
        <li key={t} style={{ marginBottom: 4 }}>
          <Text size="small">{t}</Text>
        </li>
      ))}
    </ul>
  );
}

export default function LaptopComparison() {
  const [selected, setSelected] = useState<string[]>(models.map((m) => m.id));
  const shown = models.filter((m) => selected.includes(m.id));

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    if (next.length > 0) setSelected(next);
  };

  return (
    <Stack gap={28}>
      <Stack gap={4}>
        <H1>14 寸轻薄本对比：办公为主、能跑 AI、含国补 ≤6000 元</H1>
        <Text size="small" tone="tertiary">
          整理于 2026-10-27，并补充了华为 MateBook 14（Windows 版与鸿蒙版）。价格为含 15% 国补的公开报价（IT之家、中关村在线、什么值得买、逛丢、联想知识库），不是实时下单页，最终以结算页为准。
        </Text>
      </Stack>

      <Callout tone="info" title="结论（按含国补到手价 ≤6000 元、14 寸、办公为主、能跑 AI 筛选）">
        <Stack gap={4}>
          <Text size="small">1. 联想 小新 Air 14 2026：稳妥首选，价格余量最大，NPU 40 TOPS，1kg 出头。</Text>
          <Text size="small">2. 华硕 a豆14 Air 2026：最轻（0.99kg）、NPU 50 TOPS、1TB，但价格贴着 6000 线。</Text>
          <Text size="small">3. 荣耀 MagicBook 14 2026：32GB + 92Wh，续航和本地模型容量最强，偏重，价格在 6000 上下。</Text>
          <Text size="small">
            备选：华为 MateBook 14（Windows 版：屏幕、做工、华为生态好，价格在预算内，但 125H 平台 NPU 仅 11 TOPS，还要认准“预装 Windows 版”；鸿蒙版：24GB、续航长，但系统不是 Windows）；惠普 星Book Pro Air 14（接口全、价格低，NPU 仅 13 TOPS）；联想 小新 Pro 14（锐龙 H 350，32GB 可扩展，2025 款）。
          </Text>
          <Text size="small" weight="semibold">
            怎么选：不想纠结选 1；要最轻且预算用满选 2；要 32GB 或长续航选 3；用华为手机 / 平板、想要 3:2 触控屏看 MateBook 14；常接投影、U 盘且 AI 只用云端看惠普；必须 ≤6000 又要 32GB 看小新 Pro 14。
          </Text>
        </Stack>
      </Callout>

      <Stack gap={12}>
        <H2>华为 MateBook 14 为什么没排进前三</H2>
        <Table
          headers={["版本", "没排进前三的原因", "它的强项", "下单前要确认"]}
          rows={mateNotes.map((n) => [
            <Cell key="v" text={n.version} width={140} strong />,
            <Cell key="why" text={n.why} width={320} />,
            <Cell key="good" text={n.good} width={260} />,
            <Cell key="check" text={n.check} width={260} />,
          ])}
        />
      </Stack>

      <Stack gap={12}>
        <H2>配置对比</H2>
        <Text size="small" tone="secondary">
          点击机型名称可显示或隐藏对应列；窄屏时建议只保留 2–3 款。
        </Text>
        <Row gap={8} wrap>
          {models.map((m) => (
            <Pill key={m.id} active={selected.includes(m.id)} onClick={() => toggle(m.id)}>
              {m.short}
            </Pill>
          ))}
        </Row>
        <Table
          striped
          headers={["项目", ...shown.map((m) => m.name)]}
          rows={specRows.map((r) => [
            <Label key="label" text={r.label} />,
            ...shown.map((m) => <Cell key={m.id} text={r.get(m)} strong={r.strong} />),
          ])}
        />
      </Stack>

      <Stack gap={12}>
        <H2>优劣势</H2>
        <Table
          headers={["机型", "优势", "劣势", "适合 / 不适合"]}
          rows={shown.map((m) => [
            <Stack key="name" gap={2} style={{ minWidth: 150 }}>
              <Text size="small" weight="semibold">
                {m.name}
              </Text>
              <Text size="small" tone="tertiary">
                {m.price}
              </Text>
            </Stack>,
            <Bullets key="pros" items={m.pros} width={230} />,
            <Bullets key="cons" items={m.cons} width={230} />,
            <Stack key="fit" gap={6} style={{ minWidth: 190 }}>
              <Text size="small">
                <Text size="small" weight="semibold">
                  适合：
                </Text>
                {m.fit}
              </Text>
              <Text size="small" tone="secondary">
                <Text size="small" weight="semibold">
                  不适合：
                </Text>
                {m.skip}
              </Text>
            </Stack>,
          ])}
        />
      </Stack>

      <Stack gap={12}>
        <H2>单项最优</H2>
        <Table
          headers={["维度", "第一名", "依据"]}
          rows={bests.map((b) => [
            <Cell key="dim" text={b.dim} width={130} strong />,
            <Cell key="winner" text={b.winner} width={170} />,
            <Cell key="basis" text={b.basis} width={380} />,
          ])}
        />
      </Stack>

      <Stack gap={8}>
        <H2>配置怎么看</H2>
        <CollapsibleSection title="通俗解释与对你的影响" count={glossary.length} defaultOpen>
          <Table
            headers={["配置项", "通俗解释", "对你的影响"]}
            rows={glossary.map((g) => [
              <Cell key="term" text={g.term} width={130} strong />,
              <Cell key="what" text={g.what} width={300} />,
              <Cell key="impact" text={g.impact} width={380} />,
            ])}
          />
        </CollapsibleSection>
      </Stack>

      <Stack gap={12}>
        <H2>选购提示</H2>
        <Callout tone="warning" title="价格口径">
          <Text size="small">
            表中价格来自公开报价，不是实时下单页。荣耀 MagicBook 14 最近一次报价是 8 月；小新 Pro 14 是按联想官方参考价 6199 估算；a豆14 Air 的 5949 是首发优惠价；MateBook 14（Windows 版）10 月没查到可靠新价，是按官方标价 6799 的 85 折和 5–6 月的京东、门店价估算；鸿蒙版是按标价 6599 的 85 折估算。下单前一律以结算页为准。
          </Text>
        </Callout>
        <Stack gap={6}>
          {tips.map((t) => (
            <Text key={t} size="small">
              {t}
            </Text>
          ))}
        </Stack>
      </Stack>

      <CollapsibleSection title="来源" count={sources.length}>
        <Stack gap={6}>
          {sources.map((s) => (
            <Text key={s.href} size="small">
              <Link href={s.href}>{s.label}</Link>
            </Text>
          ))}
        </Stack>
      </CollapsibleSection>
    </Stack>
  );
}
