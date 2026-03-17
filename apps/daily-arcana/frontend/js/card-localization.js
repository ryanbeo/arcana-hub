(function () {
  const deck = window.TAROT_DATABASE?.cards || [];

  const majorNamesVi = {
    "the-fool": "Kẻ Khờ",
    "the-magician": "Nhà Ảo Thuật",
    "the-high-priestess": "Nữ Tư Tế",
    "the-empress": "Hoàng Hậu",
    "the-emperor": "Hoàng Đế",
    "the-hierophant": "Giáo Hoàng",
    "the-lovers": "Những Người Yêu Nhau",
    "the-chariot": "Cỗ Xe",
    strength: "Sức Mạnh",
    "the-hermit": "Ẩn Sĩ",
    "wheel-of-fortune": "Bánh Xe Số Mệnh",
    justice: "Công Lý",
    "the-hanged-man": "Người Treo Ngược",
    death: "Cái Chết",
    temperance: "Tiết Chế",
    "the-devil": "Ác Quỷ",
    "the-tower": "Tòa Tháp",
    "the-star": "Ngôi Sao",
    "the-moon": "Mặt Trăng",
    "the-sun": "Mặt Trời",
    judgement: "Phán Xét",
    "the-world": "Thế Giới"
  };

  const majorProfiles = {
    "the-fool": {
      archetypeEn: "sacred innocence and the fearless leap into life",
      archetypeVi: "sự hồn nhiên thiêng liêng và cú nhảy không sợ hãi vào đời sống",
      giftEn: "trusting experience before overexplaining it",
      giftVi: "tin vào trải nghiệm trước khi cố giải thích mọi thứ quá sớm",
      shadowEn: "naivety, drifting, or a refusal to see consequences",
      shadowVi: "sự ngây ngô, trôi dạt, hoặc từ chối nhìn vào hệ quả",
      artEn: "The open edge, light pack, and upward sky suggest freedom, vulnerability, and the soul beginning again.",
      artVi: "Vực sáng, hành trang nhẹ, và bầu trời mở rộng gợi ra tự do, sự mong manh, và linh hồn đang bắt đầu lại.",
      workEn: "Work asks for openness, experimentation, and a willingness to begin before you feel fully ready.",
      workVi: "Công việc cần sự cởi mở, tinh thần thử nghiệm, và dám bắt đầu ngay cả khi bạn chưa thấy mình hoàn toàn sẵn sàng.",
      relationshipEn: "Connection grows through honesty, playfulness, and showing up without armor.",
      relationshipVi: "Kết nối nở ra khi bạn chân thành, nhẹ nhàng, và hiện diện mà không cần quá nhiều lớp phòng vệ.",
      moneyEn: "Money matters improve when you stay curious but still remember the basics.",
      moneyVi: "Tài chính sáng hơn khi bạn giữ được sự cởi mở nhưng vẫn nhớ những nguyên tắc nền tảng.",
      mindEn: "The mind wants wonder more than control right now.",
      mindVi: "Tâm trí lúc này cần sự ngạc nhiên trong trẻo hơn là cố kiểm soát mọi thứ."
    },
    "the-magician": {
      archetypeEn: "directed will and conscious creation",
      archetypeVi: "ý chí có định hướng và năng lực tạo tác có ý thức",
      giftEn: "bringing scattered energy into a single living channel",
      giftVi: "gom nguồn lực phân tán thành một dòng chảy sống động",
      shadowEn: "manipulation, performance, or power used without integrity",
      shadowVi: "sự thao túng, trình diễn bề ngoài, hoặc dùng quyền năng mà thiếu chính trực",
      artEn: "The raised hand and ritual tools show alignment between idea, speech, and action.",
      artVi: "Bàn tay nâng lên cùng những pháp cụ nghi lễ cho thấy sự thẳng hàng giữa ý tưởng, lời nói, và hành động.",
      workEn: "This is a card of skill, persuasion, and knowing how to turn potential into a concrete result.",
      workVi: "Đây là lá bài của kỹ năng, khả năng thuyết phục, và biết biến tiềm năng thành kết quả cụ thể.",
      relationshipEn: "Speak clearly and mean what you say; mixed signals weaken the magic here.",
      relationshipVi: "Hãy nói rõ ràng và thật lòng; tín hiệu lẫn lộn sẽ làm suy yếu năng lượng của lá bài này.",
      moneyEn: "Resources respond to planning, confidence, and thoughtful use of what you already have.",
      moneyVi: "Nguồn lực phản hồi tốt với kế hoạch rõ ràng, sự tự tin, và cách dùng khôn ngoan những gì bạn đang có.",
      mindEn: "Mental clarity comes from choosing one focus and acting on it.",
      mindVi: "Sự sáng rõ trong tâm trí đến khi bạn chọn một trọng tâm và thật sự hành động theo nó."
    },
    "the-high-priestess": {
      archetypeEn: "inner knowing, silence, and the mystery beneath appearances",
      archetypeVi: "tri thức bên trong, sự tĩnh lặng, và bí ẩn nằm dưới bề mặt",
      giftEn: "listening to what is felt before it becomes obvious",
      giftVi: "lắng nghe điều đã được cảm nhận từ trước khi nó trở nên hiển nhiên",
      shadowEn: "withdrawal, secrecy, or confusing passivity with wisdom",
      shadowVi: "sự thu mình, che giấu, hoặc nhầm lẫn giữa thụ động và minh triết",
      artEn: "The pillars and hidden veil point to threshold wisdom, where truth is sensed rather than forced.",
      artVi: "Hai cột trụ và tấm màn kín đáo gợi nên minh triết nơi ngưỡng cửa, nơi sự thật được cảm nhận chứ không bị ép buộc.",
      workEn: "Do not rush the decision. Observation, timing, and intuition are part of the work.",
      workVi: "Đừng vội quyết định. Quan sát, thời điểm, và trực giác cũng là một phần của công việc.",
      relationshipEn: "A bond may be speaking through silence, mood, and what remains unspoken.",
      relationshipVi: "Một mối quan hệ có thể đang lên tiếng qua sự im lặng, sắc thái cảm xúc, và những điều chưa được gọi tên.",
      moneyEn: "Pause before commitment and pay attention to what feels hidden or unfinished.",
      moneyVi: "Hãy chậm lại trước khi cam kết và chú ý đến những gì còn mờ, còn thiếu, hoặc chưa được nhìn hết.",
      mindEn: "The soul wants stillness, symbols, and trust in subtle perception.",
      mindVi: "Linh hồn đang cần sự yên tĩnh, biểu tượng, và niềm tin vào trực cảm tinh tế."
    },
    "the-empress": {
      archetypeEn: "fertility, embodiment, and the soul that nourishes life",
      archetypeVi: "sự sinh nở, tính hiện thân, và linh hồn biết nuôi lớn sự sống",
      giftEn: "growing what is real through warmth, patience, and presence",
      giftVi: "làm lớn điều chân thật bằng sự ấm áp, kiên nhẫn, và hiện diện",
      shadowEn: "smothering, overindulgence, or losing yourself in comfort",
      shadowVi: "sự bao bọc quá mức, nuông chiều, hoặc lạc mình trong vùng dễ chịu",
      artEn: "The fertile field and resting queen show abundance as something lived through the body and heart.",
      artVi: "Cánh đồng màu mỡ và vị nữ vương đang nghỉ ngơi cho thấy sự phong nhiêu được sống qua thân thể lẫn trái tim.",
      workEn: "Creative work thrives when the environment is supportive, resourced, and sensuous rather than strained.",
      workVi: "Công việc sáng tạo nở tốt nhất khi môi trường đủ nâng đỡ, đủ nguồn lực, và không bị thúc ép đến cạn kiệt.",
      relationshipEn: "Care is powerful here, but it should feel generous, not possessive.",
      relationshipVi: "Sự chăm sóc ở đây rất mạnh, nhưng nó cần là sự hào phóng chứ không phải níu giữ.",
      moneyEn: "Abundance grows through sustainability, self-worth, and tending what already feeds you.",
      moneyVi: "Sự sung túc lớn lên nhờ tính bền vững, giá trị bản thân, và khả năng chăm sóc điều đang thật sự nuôi mình.",
      mindEn: "Your inner world heals through softness, beauty, and remembering enoughness.",
      mindVi: "Thế giới nội tâm của bạn được chữa lành bằng sự dịu dàng, cái đẹp, và cảm giác mình đã đủ đầy."
    },
    "the-emperor": {
      archetypeEn: "order, authority, and the shaping power of structure",
      archetypeVi: "trật tự, quyền lực, và sức mạnh kiến tạo của cấu trúc",
      giftEn: "creating stability so life can move safely within clear boundaries",
      giftVi: "tạo ra sự ổn định để đời sống có thể vận hành an toàn trong những ranh giới rõ ràng",
      shadowEn: "rigidity, domination, or mistaking control for true strength",
      shadowVi: "sự cứng nhắc, áp đặt, hoặc nhầm lẫn giữa kiểm soát và sức mạnh thật sự",
      artEn: "The stone throne and mountain backdrop show rule, endurance, and the demand for responsibility.",
      artVi: "Ngai đá và dãy núi phía sau cho thấy quyền trị vì, sức bền, và lời đòi hỏi phải có trách nhiệm.",
      workEn: "This is the realm of leadership, systems, and firm decisions that reduce chaos.",
      workVi: "Đây là địa hạt của lãnh đạo, hệ thống, và những quyết định vững tay giúp giảm hỗn loạn.",
      relationshipEn: "Reliability matters, but warmth must still have a place inside the structure.",
      relationshipVi: "Sự đáng tin rất quan trọng, nhưng bên trong cấu trúc ấy vẫn phải còn chỗ cho sự ấm áp.",
      moneyEn: "Financial stability is built through discipline, planning, and long-range thinking.",
      moneyVi: "Sự ổn định tài chính được xây bằng kỷ luật, kế hoạch, và tầm nhìn dài hơi.",
      mindEn: "The mind steadies when you define what matters and stop negotiating with every distraction.",
      mindVi: "Tâm trí vững lại khi bạn xác định rõ điều gì là trọng yếu và ngừng thương lượng với mọi xao nhãng."
    },
    "the-hierophant": {
      archetypeEn: "tradition, initiation, and wisdom carried through form",
      archetypeVi: "truyền thống, sự điểm đạo, và minh triết được chuyên chở qua khuôn thức",
      giftEn: "learning from lineage, ritual, and tested understanding",
      giftVi: "học từ truyền thống, nghi thức, và những hiểu biết đã được thử thách",
      shadowEn: "dogma, empty conformity, or obedience without inner truth",
      shadowVi: "giáo điều, sự phục tùng rỗng nghĩa, hoặc tuân theo mà thiếu chân lý bên trong",
      artEn: "The formal blessing and temple setting suggest teachings that connect the personal to the sacred.",
      artVi: "Cử chỉ ban phước trong không gian linh thiêng gợi ra những giáo huấn nối điều cá nhân với điều thiêng liêng.",
      workEn: "Guidance, mentorship, and established methods can support real progress here.",
      workVi: "Sự hướng dẫn, người dẫn đường, và phương pháp đã được kiểm chứng có thể nâng đỡ tiến triển thật sự.",
      relationshipEn: "Shared values matter more than attraction alone.",
      relationshipVi: "Giá trị chung quan trọng hơn sức hút đơn thuần.",
      moneyEn: "Financial choices benefit from grounded advice and proven principles.",
      moneyVi: "Quyết định tài chính được hỗ trợ tốt hơn khi dựa trên lời khuyên vững chắc và nguyên tắc đáng tin.",
      mindEn: "The psyche wants meaning, practice, and a language for what it believes.",
      mindVi: "Tâm thức đang cần ý nghĩa, một thực hành đều đặn, và ngôn ngữ cho điều mình tin."
    },
    "the-lovers": {
      archetypeEn: "union, choice, and the truth that relationship reveals",
      archetypeVi: "sự hòa hợp, lựa chọn, và chân lý được phơi mở qua quan hệ",
      giftEn: "choosing what aligns with the heart rather than what merely pleases the moment",
      giftVi: "chọn điều thật sự hòa với trái tim thay vì điều chỉ làm vừa lòng nhất thời",
      shadowEn: "division, projection, or avoiding the cost of a real choice",
      shadowVi: "sự chia tách, phóng chiếu, hoặc né tránh cái giá của một lựa chọn thật sự",
      artEn: "The openness between the figures shows intimacy as revelation, not just romance.",
      artVi: "Khoảng mở giữa hai người cho thấy sự thân mật là một sự khai mở chứ không chỉ là tình cảm lãng mạn.",
      workEn: "Partnerships and decisions prosper when they are rooted in clear values.",
      workVi: "Hợp tác và lựa chọn sẽ thuận lợi hơn khi được neo vào những giá trị rõ ràng.",
      relationshipEn: "This card asks for honesty, emotional maturity, and conscious choosing.",
      relationshipVi: "Lá bài này đòi hỏi sự thành thật, trưởng thành cảm xúc, và lựa chọn có ý thức.",
      moneyEn: "Spend and commit in ways that reflect who you really are.",
      moneyVi: "Hãy chi tiêu và cam kết theo cách phản chiếu đúng con người thật của bạn.",
      mindEn: "Inner peace comes when desire and truth stop pulling in opposite directions.",
      mindVi: "Bình an nội tâm xuất hiện khi mong muốn và sự thật thôi kéo bạn về hai phía khác nhau."
    },
    "the-chariot": {
      archetypeEn: "directed movement, mastery, and the disciplined self",
      archetypeVi: "chuyển động có định hướng, khả năng làm chủ, và cái tôi biết kỷ luật",
      giftEn: "holding opposing drives together and guiding them toward purpose",
      giftVi: "giữ những lực kéo đối nghịch trong cùng một hướng đi có mục đích",
      shadowEn: "forcing momentum, emotional suppression, or movement without integration",
      shadowVi: "cưỡng ép đà tiến, kìm nén cảm xúc, hoặc di chuyển mà thiếu sự hợp nhất bên trong",
      artEn: "The driver between opposing forces suggests triumph through alignment rather than brute control.",
      artVi: "Người điều khiển đứng giữa hai lực đối nghịch gợi ra chiến thắng đến từ sự đồng bộ chứ không phải cưỡng ép.",
      workEn: "Progress comes from focus, strategy, and refusing to split your energy.",
      workVi: "Tiến triển đến từ tập trung, chiến lược, và việc không để năng lượng bị chia nhỏ.",
      relationshipEn: "Lead the bond with clarity rather than mixed messages or emotional drift.",
      relationshipVi: "Hãy dẫn dắt mối quan hệ bằng sự rõ ràng thay vì tín hiệu lẫn lộn hay cảm xúc trôi nổi.",
      moneyEn: "Financial momentum depends on discipline and coordinated action.",
      moneyVi: "Đà tiến tài chính phụ thuộc vào kỷ luật và hành động có phối hợp.",
      mindEn: "The mind becomes powerful when intention outruns distraction.",
      mindVi: "Tâm trí trở nên mạnh khi ý định đi nhanh hơn xao lãng."
    },
    strength: {
      archetypeEn: "inner courage, instinct, and gentle mastery over force",
      archetypeVi: "nội lực, bản năng, và sự làm chủ dịu dàng vượt lên trên cưỡng ép",
      giftEn: "meeting raw feeling with compassion instead of fear",
      giftVi: "đón lấy cảm xúc nguyên sơ bằng lòng trắc ẩn thay vì sợ hãi",
      shadowEn: "self-suppression, pride, or confusing softness with weakness",
      shadowVi: "tự kìm nén, cái tôi cứng, hoặc nhầm lẫn giữa sự mềm mại và yếu đuối",
      artEn: "The woman and lion show a power that calms because it does not panic before instinct.",
      artVi: "Người phụ nữ và sư tử cho thấy một loại sức mạnh có thể làm dịu bởi nó không hoảng sợ trước bản năng.",
      workEn: "Steady nerves, mature confidence, and emotional regulation are your greatest strengths at work.",
      workVi: "Sự bình tĩnh, tự tin chín chắn, và khả năng điều hòa cảm xúc chính là thế mạnh lớn nhất của bạn trong công việc.",
      relationshipEn: "True intimacy grows when passion is held with tenderness and self-respect.",
      relationshipVi: "Sự thân mật thật sự lớn lên khi đam mê được giữ bằng dịu dàng và lòng tự trọng.",
      moneyEn: "Patience is stronger than reactivity in money matters today.",
      moneyVi: "Trong chuyện tiền bạc hôm nay, kiên nhẫn mạnh hơn phản ứng bốc đồng.",
      mindEn: "Self-kindness helps the psyche release what force never could.",
      mindVi: "Lòng dịu với bản thân giúp tâm trí buông ra điều mà sự cưỡng ép không bao giờ làm được."
    },
    "the-hermit": {
      archetypeEn: "solitude, truth-seeking, and the light discovered within",
      archetypeVi: "sự đơn độc, hành trình tìm chân lý, và ánh sáng được tìm thấy từ bên trong",
      giftEn: "withdrawing enough to hear what is quietly true",
      giftVi: "rút vào vừa đủ để nghe điều gì đang âm thầm là sự thật",
      shadowEn: "isolation, perfectionism, or hiding from life in the name of wisdom",
      shadowVi: "cô lập, cầu toàn, hoặc trốn đời dưới danh nghĩa minh triết",
      artEn: "The lamp in the dark suggests guidance that comes one step at a time.",
      artVi: "Ngọn đèn trong bóng tối gợi ra sự dẫn lối đến theo từng bước chứ không phơi bày tất cả một lần.",
      workEn: "Research, patience, and strategic distance reveal more than hurried action.",
      workVi: "Nghiên cứu, kiên nhẫn, và khoảng lùi chiến lược sẽ hé lộ nhiều hơn là hành động vội vã.",
      relationshipEn: "Space may be necessary, but it should serve truth rather than avoidance.",
      relationshipVi: "Khoảng riêng có thể cần thiết, nhưng nó nên phục vụ cho sự thật chứ không phải né tránh.",
      moneyEn: "Simplicity and restraint give better financial guidance than urgency.",
      moneyVi: "Sự giản lược và tiết chế đem lại chỉ dẫn tài chính tốt hơn cảm giác gấp gáp.",
      mindEn: "The psyche wants less noise and more honest reflection.",
      mindVi: "Tâm thức đang cần ít nhiễu hơn và nhiều suy ngẫm thành thật hơn."
    },
    "wheel-of-fortune": {
      archetypeEn: "change, fate, and the turning of larger patterns",
      archetypeVi: "biến chuyển, số phận, và sự xoay chuyển của những chu kỳ lớn hơn",
      giftEn: "responding to change with intelligence instead of panic",
      giftVi: "đáp lại thay đổi bằng trí sáng thay vì hoảng sợ",
      shadowEn: "clinging to certainty or imagining that life can be held still",
      shadowVi: "bám víu vào sự chắc chắn hoặc tưởng rằng đời sống có thể bị giữ đứng yên",
      artEn: "The turning wheel suggests forces larger than the ego, but not outside meaning.",
      artVi: "Bánh xe chuyển động gợi ra những lực lớn hơn cái tôi cá nhân, nhưng không hề vô nghĩa.",
      workEn: "Timing matters. Adaptation may serve you better than resistance.",
      workVi: "Thời điểm là điều quan trọng. Khả năng thích nghi có thể phục vụ bạn tốt hơn sự chống cự.",
      relationshipEn: "A relationship may be entering a new cycle that cannot be met with old habits.",
      relationshipVi: "Một mối quan hệ có thể đang bước vào chu kỳ mới mà những thói quen cũ không còn đáp ứng được.",
      moneyEn: "Fortunes shift; steadiness matters more than overconfidence.",
      moneyVi: "Vận tiền có thể đổi; sự vững vàng quan trọng hơn cảm giác quá tự tin.",
      mindEn: "Let the psyche move with change rather than demanding a fixed answer from every season.",
      mindVi: "Hãy để tâm thức di chuyển cùng thay đổi thay vì đòi mọi mùa của đời phải cho cùng một đáp án."
    },
    justice: {
      archetypeEn: "truth, consequence, and the balance created by clear seeing",
      archetypeVi: "sự thật, hệ quả, và thế cân bằng được tạo ra bởi cái nhìn sáng rõ",
      giftEn: "meeting reality without distortion, excuse, or drama",
      giftVi: "đối diện thực tại mà không méo mó, không bào chữa, không kịch hóa",
      shadowEn: "harsh judgment, blame, or cutting yourself off from compassion",
      shadowVi: "sự phán xét khắc nghiệt, đổ lỗi, hoặc cắt lìa mình khỏi lòng trắc ẩn",
      artEn: "The scales and sword show discernment that is both measured and decisive.",
      artVi: "Cán cân và thanh kiếm cho thấy một sự phân định vừa cân nhắc vừa dứt khoát.",
      workEn: "This is a day for facts, fairness, and accountable choices.",
      workVi: "Đây là ngày của dữ kiện, sự công bằng, và những lựa chọn có trách nhiệm.",
      relationshipEn: "Name the truth cleanly; unclear emotional accounting only deepens imbalance.",
      relationshipVi: "Hãy gọi tên sự thật một cách sạch sẽ; những khoản nợ cảm xúc mơ hồ chỉ làm sự lệch cân sâu hơn.",
      moneyEn: "Good money decisions come through honesty with numbers and consequences.",
      moneyVi: "Quyết định tài chính tốt đến từ sự thành thật với con số và hệ quả của chúng.",
      mindEn: "Clarity is medicinal when it is truthful, not punishing.",
      mindVi: "Sự sáng rõ có tính chữa lành khi nó là sự thật chứ không phải hình phạt."
    },
    "the-hanged-man": {
      archetypeEn: "suspension, surrender, and the wisdom of reversal",
      archetypeVi: "sự treo lơ lửng, buông nhường, và minh triết đến từ góc nhìn đảo ngược",
      giftEn: "allowing a pause to transform perception",
      giftVi: "cho phép khoảng dừng biến đổi cách mình nhìn thế giới",
      shadowEn: "stagnation, martyrdom, or romanticizing powerlessness",
      shadowVi: "sự trì trệ, tâm thế hy sinh mù quáng, hoặc lãng mạn hóa sự bất lực",
      artEn: "The upside-down calm suggests revelation through surrender rather than conquest.",
      artVi: "Sự bình thản trong tư thế đảo ngược gợi ra mặc khải đến qua buông nhường chứ không phải chinh phục.",
      workEn: "A delay may contain the very perspective you need.",
      workVi: "Sự trì hoãn có thể đang chứa chính góc nhìn mà bạn cần.",
      relationshipEn: "Release the urge to force an outcome and let deeper truth surface.",
      relationshipVi: "Hãy buông nhu cầu ép ra kết quả để sự thật sâu hơn có dịp nổi lên.",
      moneyEn: "Wait, reassess, and see whether the problem is being viewed from the wrong angle.",
      moneyVi: "Hãy chờ, nhìn lại, và xem liệu bạn có đang nhìn sai góc của vấn đề tài chính hay không.",
      mindEn: "The psyche wants surrender, stillness, and a reordering of values.",
      mindVi: "Tâm thức đang muốn bạn buông, lặng, và sắp xếp lại thứ tự ưu tiên sâu bên trong."
    },
    death: {
      archetypeEn: "ending, transformation, and the stripping away of what has completed",
      archetypeVi: "kết thúc, chuyển hóa, và sự lột bỏ những gì đã đi hết vòng đời",
      giftEn: "letting go so life can become truthful again",
      giftVi: "buông điều đã hết để đời sống có thể trở nên chân thật trở lại",
      shadowEn: "clinging, fear of change, or trying to preserve what has already died",
      shadowVi: "bám víu, sợ thay đổi, hoặc cố giữ điều đã thật sự kết thúc",
      artEn: "The stark image reminds us that transformation is not decorative; it is decisive.",
      artVi: "Hình ảnh mạnh mẽ này nhắc rằng chuyển hóa không phải thứ trang trí mềm mại; nó mang tính quyết định.",
      workEn: "An old role, process, or ambition may need to end for a truer one to begin.",
      workVi: "Một vai trò, quy trình, hay tham vọng cũ có thể cần kết thúc để điều chân thật hơn được bắt đầu.",
      relationshipEn: "A bond may need release, renewal, or an honest death of the old pattern.",
      relationshipVi: "Một mối quan hệ có thể cần buông, làm mới, hoặc để mẫu hình cũ được chết đi thành thật.",
      moneyEn: "Financial renewal often starts by ending what drains life.",
      moneyVi: "Sự hồi sinh tài chính thường bắt đầu bằng việc chấm dứt điều đang hút cạn sinh lực.",
      mindEn: "The psyche is outgrowing a former identity and wants permission to change.",
      mindVi: "Tâm thức đang lớn ra khỏi một bản dạng cũ và muốn được cho phép thay đổi."
    },
    temperance: {
      archetypeEn: "integration, healing, and the alchemy of right proportion",
      archetypeVi: "sự hòa hợp, chữa lành, và phép giả kim của tỷ lệ đúng",
      giftEn: "blending opposites into a living middle path",
      giftVi: "pha trộn những đối cực thành một con đường ở giữa còn sống động",
      shadowEn: "extremes, impatience, or forcing a result before it has matured",
      shadowVi: "sự cực đoan, thiếu kiên nhẫn, hoặc cố ép kết quả khi nó chưa chín",
      artEn: "The measured pouring between vessels shows healing as process, not instant perfection.",
      artVi: "Dòng rót điều độ giữa hai chiếc bình cho thấy chữa lành là một tiến trình chứ không phải sự hoàn hảo tức thì.",
      workEn: "Pacing, collaboration, and thoughtful adjustments matter more than dramatic pushes.",
      workVi: "Nhịp độ, sự phối hợp, và những điều chỉnh tinh tế quan trọng hơn những cú gồng kịch tính.",
      relationshipEn: "Love deepens through reciprocity and emotional balance.",
      relationshipVi: "Tình cảm sâu hơn nhờ sự qua lại cân bằng và tiết độ trong cảm xúc.",
      moneyEn: "Moderation protects resources and helps sustainable growth emerge.",
      moneyVi: "Sự điều độ bảo vệ nguồn lực và mở đường cho tăng trưởng bền vững.",
      mindEn: "The mind is asking for integration, not overload.",
      mindVi: "Tâm trí đang xin sự hòa nhập chứ không phải thêm quá tải."
    },
    "the-devil": {
      archetypeEn: "bondage, desire, and the places where power becomes attachment",
      archetypeVi: "sự trói buộc, ham muốn, và những nơi quyền năng biến thành ràng buộc",
      giftEn: "seeing clearly what has power over you so you can reclaim yourself",
      giftVi: "nhìn rõ điều gì đang nắm quyền trên mình để thu hồi chính mình",
      shadowEn: "addiction, shame, compulsion, or false power",
      shadowVi: "nghiện ngập, xấu hổ, cưỡng bức nội tâm, hoặc thứ quyền lực giả tạo",
      artEn: "The chained figures show that the prison is real, but not always permanent.",
      artVi: "Hai hình người bị xích cho thấy nhà tù là có thật, nhưng không phải lúc nào cũng vĩnh viễn.",
      workEn: "Watch for burnout, ego traps, and ambition that costs too much of the soul.",
      workVi: "Hãy cảnh giác với kiệt sức, cái bẫy của bản ngã, và tham vọng đang đòi quá nhiều linh hồn của bạn.",
      relationshipEn: "Desire is strong here, but it may be mixed with fear, control, or dependence.",
      relationshipVi: "Ham muốn ở đây rất mạnh, nhưng nó có thể đang pha lẫn sợ hãi, kiểm soát, hoặc lệ thuộc.",
      moneyEn: "Money can become a mirror for scarcity fear, appetite, or self-worth wounds.",
      moneyVi: "Tiền bạc có thể trở thành tấm gương phản chiếu nỗi sợ thiếu thốn, cơn đói vô hình, hoặc vết thương giá trị bản thân.",
      mindEn: "Awareness begins the loosening of the chain.",
      mindVi: "Sự nhận biết chính là bước đầu nới lỏng sợi xích."
    },
    "the-tower": {
      archetypeEn: "rupture, revelation, and the breaking of false structures",
      archetypeVi: "đổ vỡ, khai lộ, và sự phá tung những cấu trúc giả tạo",
      giftEn: "allowing truth to strike where illusion has taken over",
      giftVi: "cho phép sự thật đánh trúng nơi ảo tưởng đã chiếm chỗ",
      shadowEn: "shock, resistance, or trying to rebuild the lie because it felt familiar",
      shadowVi: "sốc, chống cự, hoặc cố dựng lại điều giả dối chỉ vì nó quen thuộc",
      artEn: "The lightning-struck tower shows collapse not as punishment but as disclosure.",
      artVi: "Tòa tháp bị sét đánh cho thấy sự sụp đổ không chỉ là trừng phạt mà còn là phơi bày.",
      workEn: "Something unstable at work may be cracking open so it can no longer pretend to hold.",
      workVi: "Một điều bấp bênh trong công việc có thể đang nứt vỡ để không còn giả vờ vững nữa.",
      relationshipEn: "A hard truth may be arriving, but what is real can survive honesty.",
      relationshipVi: "Một sự thật khó chịu có thể đang đến, nhưng điều gì thật thì vẫn sống sót qua thành thật.",
      moneyEn: "Disruption asks for calm regrouping and a willingness to confront what no longer works.",
      moneyVi: "Xáo trộn đòi hỏi sự bình tĩnh tái lập và can đảm nhìn vào điều không còn vận hành.",
      mindEn: "The psyche may be clearing out a lie too costly to keep.",
      mindVi: "Tâm thức có thể đang quét đi một lời dối trá đã trở nên quá đắt để giữ lại."
    },
    "the-star": {
      archetypeEn: "hope, healing, and the return of trust after difficulty",
      archetypeVi: "hy vọng, chữa lành, và sự trở lại của niềm tin sau gian khó",
      giftEn: "letting sincerity and openness restore the spirit",
      giftVi: "để cho sự chân thành và cởi mở phục hồi tinh thần",
      shadowEn: "discouragement, cynicism, or fear of trusting what is gentle",
      shadowVi: "nản lòng, hoài nghi, hoặc sợ phải tin vào điều mềm sáng",
      artEn: "The naked figure under the stars shows vulnerability as a channel for renewal.",
      artVi: "Hình người trần mình dưới sao cho thấy sự mong manh có thể là con đường để tái sinh.",
      workEn: "Renewal comes by reconnecting with meaning, not only productivity.",
      workVi: "Sự tái tạo đến khi bạn chạm lại vào ý nghĩa chứ không chỉ chạy theo năng suất.",
      relationshipEn: "Gentleness and honest openness can refresh love.",
      relationshipVi: "Sự dịu dàng và cởi mở thành thật có thể làm mới tình yêu.",
      moneyEn: "Hope is useful here when it is paired with patient repair.",
      moneyVi: "Hy vọng là điều có ích ở đây khi nó đi cùng sự hàn gắn kiên nhẫn.",
      mindEn: "The soul wants rest from hardness and permission to believe again.",
      mindVi: "Linh hồn đang cần nghỉ khỏi sự chai cứng và được cho phép tin lại một lần nữa."
    },
    "the-moon": {
      archetypeEn: "dream, uncertainty, and the psychic life beneath reason",
      archetypeVi: "giấc mơ, sự mơ hồ, và đời sống tâm linh nằm dưới lý trí",
      giftEn: "moving through mystery without demanding premature certainty",
      giftVi: "đi xuyên qua bí ẩn mà không ép nó phải cho ra một sự chắc chắn quá sớm",
      shadowEn: "illusion, fear, projection, or losing the path in emotional fog",
      shadowVi: "ảo ảnh, sợ hãi, phóng chiếu, hoặc lạc đường trong lớp sương cảm xúc",
      artEn: "The moonlit path suggests that not every truth arrives in daylight language.",
      artVi: "Con đường dưới trăng cho thấy không phải mọi sự thật đều đến bằng ngôn ngữ của ban ngày.",
      workEn: "Read between the lines; what is unclear may still be meaningful.",
      workVi: "Hãy đọc giữa những dòng chữ; điều mơ hồ vẫn có thể mang ý nghĩa rất lớn.",
      relationshipEn: "Feeling runs deeper than explanation right now.",
      relationshipVi: "Cảm xúc lúc này đang đi sâu hơn lời giải thích.",
      moneyEn: "Do not commit before the fog lifts and the details sharpen.",
      moneyVi: "Đừng cam kết trước khi sương mù tan và chi tiết trở nên sắc nét hơn.",
      mindEn: "Dreams, symbols, and instinct deserve attention, but not blind surrender.",
      mindVi: "Giấc mơ, biểu tượng, và bản năng rất đáng lắng nghe, nhưng không cần đầu hàng mù quáng."
    },
    "the-sun": {
      archetypeEn: "joy, clarity, and the full radiance of life energy",
      archetypeVi: "niềm vui, sự sáng rõ, và ánh rực đầy đủ của sinh lực",
      giftEn: "allowing life to become simple, warm, and unmistakably alive",
      giftVi: "cho phép đời sống trở nên đơn giản, ấm sáng, và sống động không cần che giấu",
      shadowEn: "burnout, self-display, or fear of being seen in your true brightness",
      shadowVi: "kiệt sức, phô diễn, hoặc sợ bị nhìn thấy trong ánh sáng thật của mình",
      artEn: "The child in sunlight suggests freedom after complexity and innocence after struggle.",
      artVi: "Đứa trẻ dưới ánh mặt trời gợi ra tự do sau phức tạp và sự hồn nhiên quay về sau thử thách.",
      workEn: "Visibility, confidence, and wholehearted effort are strongly supported.",
      workVi: "Sự hiện diện rõ ràng, tự tin, và nỗ lực toàn tâm đang được nâng đỡ mạnh mẽ.",
      relationshipEn: "Warmth, openness, and uncomplicated joy can heal much.",
      relationshipVi: "Sự ấm áp, cởi mở, và niềm vui không vòng vo có thể chữa lành rất nhiều.",
      moneyEn: "Clarity brings healthier choices than fear does.",
      moneyVi: "Sự sáng rõ đem lại lựa chọn lành mạnh hơn nỗi sợ.",
      mindEn: "The psyche wants sunlight, embodiment, and relief from needless shadows.",
      mindVi: "Tâm thức đang muốn ánh sáng, sự trở về với thân thể, và được nhẹ đi khỏi những bóng tối không còn cần thiết."
    },
    judgement: {
      archetypeEn: "awakening, calling, and the soul rising to a truer life",
      archetypeVi: "thức tỉnh, tiếng gọi, và linh hồn trỗi dậy hướng về một đời sống chân thật hơn",
      giftEn: "hearing the call to become more fully who you already are",
      giftVi: "nghe được lời gọi mời bạn sống trọn hơn con người mình vốn là",
      shadowEn: "avoidance, postponement, or fear of the larger life asking to be lived",
      shadowVi: "sự né tránh, trì hoãn, hoặc sợ hãi trước đời sống rộng lớn hơn đang gọi tên bạn",
      artEn: "The rising figures suggest not punishment but an answering to deep truth.",
      artVi: "Những hình người trỗi dậy cho thấy đây không hẳn là trừng phạt mà là lời đáp lại với sự thật sâu xa.",
      workEn: "A vocation, standard, or deeper purpose may be calling for a real answer now.",
      workVi: "Một ơn gọi, một tiêu chuẩn, hay mục đích sâu hơn trong công việc có thể đang đòi bạn trả lời thật sự.",
      relationshipEn: "A relationship may be reaching a moment of reckoning and renewal.",
      relationshipVi: "Một mối quan hệ có thể đang chạm tới khoảnh khắc đối diện sự thật và làm mới.",
      moneyEn: "Awareness can reset your relationship to earning, value, and responsibility.",
      moneyVi: "Sự tỉnh thức có thể thiết lập lại cách bạn nhìn thu nhập, giá trị, và trách nhiệm tài chính.",
      mindEn: "The psyche is outgrowing an old story and wants a larger voice.",
      mindVi: "Tâm thức đang lớn khỏi một câu chuyện cũ và muốn cất lên tiếng nói rộng hơn."
    },
    "the-world": {
      archetypeEn: "completion, wholeness, and the dance of integrated life",
      archetypeVi: "sự hoàn mãn, tính toàn vẹn, và điệu múa của đời sống đã được tích hợp",
      giftEn: "recognizing the circle completed and inhabiting your fullness",
      giftVi: "nhận ra vòng tròn đã hoàn tất và thật sự sống trong sự trọn vẹn của mình",
      shadowEn: "lingering incompletion, fear of ending, or inability to receive fulfillment",
      shadowVi: "sự chưa hoàn tất kéo dài, sợ kết thúc, hoặc không thể đón nhận trạng thái viên mãn",
      artEn: "The dancer within the wreath shows movement inside completion rather than stasis.",
      artVi: "Vũ công trong vòng nguyệt quế cho thấy sự chuyển động ngay trong hoàn thành chứ không phải đứng yên.",
      workEn: "A long cycle may be landing. Honor what has matured before racing onward.",
      workVi: "Một chu kỳ dài có thể đang hạ cánh. Hãy tôn trọng điều đã chín muồi trước khi lao sang chặng mới.",
      relationshipEn: "A bond may be ready for deeper wholeness, closure, or mature integration.",
      relationshipVi: "Một mối quan hệ có thể đã sẵn sàng cho sự trọn vẹn sâu hơn, khép lại rõ ràng hơn, hoặc trưởng thành hơn.",
      moneyEn: "Completion energy favors harvesting, reviewing, and recognizing what has truly grown.",
      moneyVi: "Năng lượng hoàn tất thuận cho việc thu hoạch, nhìn lại, và nhận ra điều gì đã thật sự lớn lên.",
      mindEn: "The soul wants synthesis, gratitude, and a wider sense of belonging.",
      mindVi: "Linh hồn đang cần sự tổng hợp, lòng biết ơn, và cảm giác thuộc về trong một vòng tròn rộng hơn."
    }
  };

  const rankNamesVi = {
    Ace: "Át",
    Two: "Hai",
    Three: "Ba",
    Four: "Bốn",
    Five: "Năm",
    Six: "Sáu",
    Seven: "Bảy",
    Eight: "Tám",
    Nine: "Chín",
    Ten: "Mười",
    Page: "Tiểu Đồng",
    Knight: "Hiệp Sĩ",
    Queen: "Hoàng Hậu",
    King: "Vua"
  };

  const suitNamesVi = {
    Wands: "Gậy",
    Cups: "Cốc",
    Swords: "Kiếm",
    Pentacles: "Xu"
  };

  const keywordMapVi = {
    Leap: "Bước Nhảy",
    Beginnings: "Khởi Đầu",
    Trust: "Niềm Tin",
    Curiosity: "Tò Mò",
    Manifestation: "Hiện Thực Hóa",
    Skill: "Kỹ Năng",
    Action: "Hành Động",
    Focus: "Tập Trung",
    Intuition: "Trực Giác",
    Mystery: "Bí Ẩn",
    Stillness: "Tĩnh Lặng",
    "Inner knowing": "Hiểu Biết Bên Trong",
    Nurture: "Nuôi Dưỡng",
    Abundance: "Phong Phú",
    Care: "Chăm Sóc",
    Growth: "Phát Triển",
    Structure: "Cấu Trúc",
    Authority: "Quyền Uy",
    Stability: "Ổn Định",
    Order: "Trật Tự",
    Guidance: "Dẫn Lối",
    Tradition: "Truyền Thống",
    Teaching: "Giảng Dạy",
    Practice: "Thực Hành",
    Alignment: "Hài Hòa",
    Choice: "Lựa Chọn",
    Union: "Kết Nối",
    Truth: "Sự Thật",
    Direction: "Định Hướng",
    Willpower: "Ý Chí",
    Control: "Làm Chủ",
    Momentum: "Đà Tiến",
    Courage: "Can Đảm",
    Compassion: "Lòng Trắc Ẩn",
    Steadiness: "Vững Vàng",
    Grace: "Sự Dịu Dàng",
    Insight: "Chiêm Nghiệm",
    Reflection: "Phản Chiếu",
    Solitude: "Một Mình",
    Wisdom: "Trí Tuệ",
    Change: "Biến Chuyển",
    Cycles: "Chu Kỳ",
    Balance: "Cân Bằng",
    Surrender: "Buông Bỏ",
    Transformation: "Chuyển Hóa",
    Attachment: "Ràng Buộc",
    Disruption: "Đổ Vỡ",
    Hope: "Hy Vọng",
    Joy: "Niềm Vui",
    Awakening: "Thức Tỉnh",
    Completion: "Hoàn Thành",
    Seed: "Hạt Mầm",
    Potential: "Tiềm Năng",
    Opening: "Mở Ra",
    Exchange: "Trao Đổi",
    Expansion: "Mở Rộng",
    Expression: "Biểu Đạt",
    Foundation: "Nền Tảng",
    Containment: "Giữ Vững",
    Friction: "Va Chạm",
    Challenge: "Thử Thách",
    Instability: "Bất Ổn",
    Harmony: "Hài Hòa",
    Recovery: "Hồi Phục",
    Flow: "Dòng Chảy",
    Assessment: "Đánh Giá",
    Questioning: "Chất Vấn",
    Strategy: "Chiến Lược",
    Mastery: "Làm Chủ",
    Movement: "Chuyển Động",
    Threshold: "Ngưỡng Cửa",
    Intensity: "Cường Độ",
    "Near completion": "Gần Hoàn Tất",
    Fullness: "Trọn Vẹn",
    Ending: "Kết Thúc",
    Message: "Thông Điệp",
    Learning: "Học Hỏi",
    Exploration: "Khám Phá",
    Pursuit: "Theo Đuổi",
    Drive: "Động Lực",
    Commitment: "Cam Kết",
    Embodiment: "Hiện Thân",
    Composure: "Điềm Tĩnh",
    Wands: "Gậy",
    Cups: "Cốc",
    Swords: "Kiếm",
    Pentacles: "Xu"
  };

  function translateKeywordVi(keyword) {
    return keywordMapVi[keyword] || keyword;
  }

  function translateKeywordsVi(keywords) {
    return keywords.map(translateKeywordVi);
  }

  function translateNameVi(card) {
    if (majorNamesVi[card.key]) {
      return majorNamesVi[card.key];
    }

    if (!card.suit) {
      return card.name;
    }

    const [rank] = card.name.split(" of ");
    return `${rankNamesVi[rank] || rank} ${suitNamesVi[card.suit] || card.suit}`;
  }

  function translateArcanaLabelVi(card) {
    if (!card.suit) {
      return card.arcanaLabel.replace("Major Arcana", "Ẩn Chính");
    }

    return card.arcanaLabel.replace("Minor Arcana", "Ẩn Phụ");
  }

  function buildGenericArtworkVi(card) {
    const keywords = translateKeywordsVi(card.keywords).slice(0, 3).join(", ").toLowerCase();
    return `Biểu tượng và bố cục của lá bài gợi lên ${keywords}, nhắc bạn đọc thông điệp bằng trực giác lẫn quan sát.`;
  }

  function buildGenericSummaryVi(card, orientation) {
    const name = translateNameVi(card);
    const keyword = translateKeywordVi(card.primaryKeyword).toLowerCase();
    if (orientation === "upright") {
      return `${name} mang năng lượng ${keyword} vào trọng tâm hôm nay, mời bạn làm việc với bài học này một cách có ý thức.`;
    }

    return `${name} xuất hiện ở chiều ngược, cho thấy bài học về ${keyword} đang bị chậm lại, mắc kẹt, hoặc quay vào bên trong.`;
  }

  function buildGenericThemeVi(card, orientation, themeName) {
    const name = translateNameVi(card);
    const keyword = translateKeywordVi(card.primaryKeyword).toLowerCase();
    const upright = {
      general: `${name} đưa ${keyword} vào trung tâm trải nghiệm hôm nay. Hãy đi chậm, quan sát kỹ, và để thông điệp này dẫn đường cho bạn.`,
      work: `Trong công việc, ${name} nhấn mạnh ${keyword}. Đây là lúc ưu tiên điều quan trọng, giữ sự rõ ràng, và tiến từng bước chắc chắn.`,
      relationship: `Trong tình cảm, ${name} gợi nhắc về ${keyword}. Hãy lắng nghe chân thành và để sự kết nối được nuôi dưỡng bằng sự hiện diện thật.`,
      money: `Với tài chính, ${name} nhắc bạn đi cùng ${keyword}. Quyết định sáng suốt sẽ đến khi bạn bình tĩnh và nhìn vào thực tế.`,
      mind: `Với tâm trí, ${name} muốn bạn quay về với ${keyword}. Hãy giảm bớt nhiễu loạn và chọn điều giúp bạn cảm thấy rõ ràng hơn.`
    };
    const reversed = {
      general: `${name} ở chiều ngược cho thấy bài học về ${keyword} đang bị nghẽn. Bạn cần chậm lại trước khi ép mọi thứ phải có kết quả ngay.`,
      work: `Trong công việc, ${name} ở chiều ngược cho thấy năng lượng ${keyword} chưa đi vào dòng chảy. Hãy rà soát lại ưu tiên và tránh phản ứng vì áp lực.`,
      relationship: `Trong tình cảm, ${name} ở chiều ngược cho thấy ${keyword} chưa được biểu lộ trọn vẹn. Hãy nói chậm hơn, lắng nghe kỹ hơn, và đừng vội kết luận.`,
      money: `Với tài chính, ${name} ở chiều ngược nhắc rằng ${keyword} đang cần được nhìn lại. Tránh quyết định vội vàng và quay lại với những điều cơ bản.`,
      mind: `Với tâm trí, ${name} ở chiều ngược cho thấy ${keyword} có thể đang mắc vào một vòng lặp mệt mỏi. Hãy nghỉ, thở sâu, và đơn giản hóa suy nghĩ của mình.`
    };

    return orientation === "upright" ? upright[themeName] : reversed[themeName];
  }

  function buildMajorLocalizedEn(card, profile) {
    return {
      artwork: profile.artEn,
      summary: {
        upright: `${card.name} speaks of ${profile.archetypeEn}, with today's growth coming from ${profile.giftEn}.`,
        reversed: `${card.name} reversed highlights the shadow of ${profile.archetypeEn}: ${profile.shadowEn}.`
      },
      themes: {
        general: {
          upright: `${card.name} is moving through the day as ${profile.archetypeEn}. The invitation is ${profile.giftEn}.`,
          reversed: `${card.name} reversed suggests ${profile.shadowEn}. Slow down and let awareness come before reaction.`
        },
        work: {
          upright: profile.workEn,
          reversed: `${profile.workEn} Reversed, watch for ${profile.shadowEn}.`
        },
        relationship: {
          upright: profile.relationshipEn,
          reversed: `${profile.relationshipEn} Reversed, the deeper issue may be ${profile.shadowEn}.`
        },
        money: {
          upright: profile.moneyEn,
          reversed: `${profile.moneyEn} Reversed, be careful of ${profile.shadowEn}.`
        },
        mind: {
          upright: profile.mindEn,
          reversed: `${profile.mindEn} Reversed, the psyche may be caught in ${profile.shadowEn}.`
        }
      }
    };
  }

  function buildMajorLocalizedVi(card, profile) {
    return {
      name: majorNamesVi[card.key] || card.name,
      arcanaLabel: translateArcanaLabelVi(card),
      primaryKeyword: translateKeywordVi(card.primaryKeyword),
      keywords: translateKeywordsVi(card.keywords),
      artwork: profile.artVi,
      summary: {
        upright: `${majorNamesVi[card.key] || card.name} nói về ${profile.archetypeVi}, và bài học hôm nay nằm ở việc ${profile.giftVi}.`,
        reversed: `${majorNamesVi[card.key] || card.name} ở chiều ngược làm lộ ra bóng tối của ${profile.archetypeVi}: ${profile.shadowVi}.`
      },
      themes: {
        general: {
          upright: `${majorNamesVi[card.key] || card.name} đang đi vào ngày hôm nay như hình mẫu của ${profile.archetypeVi}. Điều lá bài mời gọi là ${profile.giftVi}.`,
          reversed: `${majorNamesVi[card.key] || card.name} ở chiều ngược cho thấy ${profile.shadowVi}. Hãy chậm lại để thấy rõ thay vì phản ứng ngay.`
        },
        work: {
          upright: profile.workVi,
          reversed: `${profile.workVi} Ở chiều ngược, bạn cần để ý tới ${profile.shadowVi}.`
        },
        relationship: {
          upright: profile.relationshipVi,
          reversed: `${profile.relationshipVi} Ở chiều ngược, gốc rễ của khó khăn có thể nằm ở ${profile.shadowVi}.`
        },
        money: {
          upright: profile.moneyVi,
          reversed: `${profile.moneyVi} Ở chiều ngược, hãy cẩn thận với ${profile.shadowVi}.`
        },
        mind: {
          upright: profile.mindVi,
          reversed: `${profile.mindVi} Ở chiều ngược, tâm thức có thể đang mắc vào ${profile.shadowVi}.`
        }
      }
    };
  }

  function buildGenericLocalizedVi(card) {
    return {
      name: translateNameVi(card),
      arcanaLabel: translateArcanaLabelVi(card),
      primaryKeyword: translateKeywordVi(card.primaryKeyword),
      keywords: translateKeywordsVi(card.keywords),
      artwork: buildGenericArtworkVi(card),
      summary: {
        upright: buildGenericSummaryVi(card, "upright"),
        reversed: buildGenericSummaryVi(card, "reversed")
      },
      themes: {
        general: {
          upright: buildGenericThemeVi(card, "upright", "general"),
          reversed: buildGenericThemeVi(card, "reversed", "general")
        },
        work: {
          upright: buildGenericThemeVi(card, "upright", "work"),
          reversed: buildGenericThemeVi(card, "reversed", "work")
        },
        relationship: {
          upright: buildGenericThemeVi(card, "upright", "relationship"),
          reversed: buildGenericThemeVi(card, "reversed", "relationship")
        },
        money: {
          upright: buildGenericThemeVi(card, "upright", "money"),
          reversed: buildGenericThemeVi(card, "reversed", "money")
        },
        mind: {
          upright: buildGenericThemeVi(card, "upright", "mind"),
          reversed: buildGenericThemeVi(card, "reversed", "mind")
        }
      }
    };
  }

  const enCards = {};
  const viCards = {};

  deck.forEach((card) => {
    if (majorProfiles[card.key]) {
      enCards[card.key] = buildMajorLocalizedEn(card, majorProfiles[card.key]);
      viCards[card.key] = buildMajorLocalizedVi(card, majorProfiles[card.key]);
    } else {
      viCards[card.key] = buildGenericLocalizedVi(card);
    }
  });

  window.TAROT_CARD_LOCALIZATION = {
    en: { cards: enCards },
    vi: { cards: viCards }
  };
})();
