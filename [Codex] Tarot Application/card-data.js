(function () {
  const localArtworkFiles = [
    "0603205238985_00_93f05f199fe56df4354be531f1666b53.jpg",
    "0603205238985_02_5d4153da20d3d91dc0b84dd27247c1a5.jpg",
    "0603205238985_03_5c4ec1905aeae9bec5909153315e0269.jpg",
    "0603205238985_04_e8af89ff25c8ad2180e1d6b564fe1930.jpg",
    "0603205238985_05_64a833c7ec42a8634fd0bbc92a1820a3.jpg",
    "0603205238985_06_2f083cd664f6a22ef6a6bb0033183204.jpg",
    "0603205238985_07_7049a3682c6707cd661a0c92b0d4b8a0.jpg",
    "0603205238985_08_c9344575d1cfb36a722090fa6f465eda.jpg",
    "0603205238985_09_fdb39f49409ce4c2a134479f4eb457f5.jpg",
    "0603205238985_10_73075cf1cc03d23a3c959b8d3907aa8c.jpg",
    "0603205238985_11_aa5c6d94399a6c68c5ccf0938200b98d.jpg",
    "0603205238985_12_cb2452b3e455ec55a11fe96848da0f79.jpg",
    "0603205238985_13_8a692ffa7c224b4ca161439322e33f37.jpg",
    "0603205238985_14_b69ffe0fc74c305601c760be0000c7d9.jpg",
    "0603205238985_15_ad3f1fc96c2cae2a0b41441c428b6d7b.jpg",
    "0603205238985_16_3f282861b00f9fe6246cd8079fa7979e.jpg",
    "0603205238985_17_9bdf22277b1ca874d5a917140147278b.jpg",
    "0603205238985_18_6fbc854cb785a8cee939e015aa27dbf5.jpg",
    "0603205238985_19_268a5422bfd02678fbae1d39b384078c.jpg",
    "0603205238985_20_293caf99d19b4ba945159633c916d22a.jpg",
    "0603205238985_21_696ecb953297e3192d5f2c898e16b131.jpg",
    "0603205238985_22_cb000efb9912b049b4ac4b2f450880b2.jpg",
    "0603205238985_23_22ed1687f1e202dc482890610651359b.jpg",
    "0603205238985_24_573cb51379511fac771ec62bf35de19a.jpg",
    "0603205238985_25_f81b98bea89c8cba692948138ebd82df.jpg",
    "0603205238985_26_bd3ba5d3b1f11bc058249188d3a71a65.jpg",
    "0603205238985_27_6a8a0ca314e8ac55dd143a9c4042f2df.jpg",
    "0603205238985_28_a14a3ab44e937ba0de149408c8480729.jpg",
    "0603205238985_29_1b6a140aedd216e64a674cf9a6c41b58.jpg",
    "0603205238985_30_04e181abfa90d0f747c0497fe350d59b.jpg",
    "0603205238985_31_f88b72539a9a9779f8cf313cb566767c.jpg",
    "0603205238985_32_67f868802676ebce90a210d956fc0294.jpg",
    "0603205238985_33_ac2ff146e881ad7299d39cd40120a7dd.jpg",
    "0603205238985_34_06fe5991a12a0e820ca8447aa7af002f.jpg",
    "0603205238985_35_b1a791a787875aede882b7448a94a834.jpg",
    "0603205238985_36_678c7a520dc6d9f72b26966f477092dc.jpg",
    "0603205238985_37_4f17a5163b978034a5b8a841b121443f.jpg",
    "0603205238985_38_5da1301e81586bcf8c47b1d94ba468a2.jpg",
    "0603205238985_39_c50a4a2b55cdd14c62afa7bb3a8a2fcf.jpg",
    "0603205238985_40_c5bee31e1c8097c9d27b0b3851976433.jpg",
    "0603205238985_41_dbd7e4f939f2bbf0be8f4747f85a696c.jpg",
    "0603205238985_42_b90e636ae4a7bfb9be97780bf285cf4f.jpg",
    "0603205238985_43_88df5949ec785c0a52e205e8c38eec31.jpg",
    "0603205238985_44_2699f4553247ad8fd0b10062199d6173.jpg",
    "0603205238985_45_d6c490c86d283bde215abad952b920f6.jpg",
    "0603205238985_46_d684f3dfaea4ff1f3dd4a3a5bb8e77fa.jpg",
    "0603205238985_47_b883905ee3aebd3ca64c142c64972734.jpg",
    "0603205238985_48_2ed9176076924d8f685406e304a2eeed.jpg",
    "0603205238985_49_a2c774c05026e44ef20f7f62fe54326c.jpg",
    "0603205238985_50_063fba44f1a033a2093808ef2a485070.jpg",
    "0603205238985_51_9f25eaa7c24df141d7c46e7a7249540f.jpg",
    "0603205238985_52_dc83a5e1ab8670b65fa0936705cb3cc5.jpg",
    "0603205238985_53_12af23e32d659ec73b276020ddf64c56.jpg",
    "0603205238985_54_2d0e5181347701959cca210db239487b.jpg",
    "0603205238985_55_9678e102349090196462da7b876869f2.jpg",
    "0603205238985_56_2c025245d18e13aa89bce15bdb949e6a.jpg",
    "0603205238985_57_6d88d900c18809aaa1556f523d86edce.jpg",
    "0603205238985_58_d2627b0bdaf92ca202b9d578f52be080.jpg",
    "0603205238985_59_8c86e6bbff27661032b574a00b564182.jpg",
    "0603205238985_60_484c1e947ec887147750d73bebcc445f.jpg",
    "0603205238985_61_cb93169c7f120640584c2b00883308ae.jpg",
    "0603205238985_62_4fa0a11fd5c5a00edcf37ac3f74d2368.jpg",
    "0603205238985_63_f02af86ef55229b471c1d1253058b510.jpg",
    "0603205238985_64_eb7c6746fbeb4552de04798d005a36f0.jpg",
    "0603205238985_65_5018e5b72e8ce116f1376028264ff011.jpg",
    "0603205238985_66_9382be81d66ecc68554be184f491e74e.jpg",
    "0603205238985_67_ca47dcd4f58e8abc3b28f195a05e0d6a.jpg",
    "0603205238985_68_1e943fd4e127e727cb382f0a37e86547.jpg",
    "0603205238985_69_97a9f13f1c3faa0055f618793814566d.jpg",
    "0603205238985_70_21a2e3232549fb406da262e7797c90ab.jpg",
    "0603205238985_71_9c63f27770932ab0a1157e3b4451f3ff.jpg",
    "0603205238985_72_9e15c3c6db108357f05fbec114896e86.jpg",
    "0603205238985_73_539ab150d137b2806c779b2eb3d1c524.jpg",
    "0603205238985_74_c8de13051cf37f0034195c0a15fc832d.jpg",
    "0603205238985_75_efa6dbb48e298f27acdd3c04dd98e241.jpg",
    "0603205238985_76_219a1516764dd89076f68cc3fe13f06b.jpg",
    "0603205238985_77_254af0100053c750f194bd3cb5e7ff66.jpg",
    "0603205238985_78_acb14b5f1e2011ce9729ab2925e95c0c.jpg"
  ];

  function localArtworkUrl(fileName) {
    return encodeURI(`./Artwork/${fileName}`);
  }

  const majorArcana = [
    ["the-fool", "The Fool", "Major Arcana · 0", "Leap", ["Beginnings", "Trust", "Curiosity"], "A traveler stands at the edge of a bright cliff with a light pack and a wide sky, showing innocence, risk, and untapped possibility."],
    ["the-magician", "The Magician", "Major Arcana · I", "Manifestation", ["Skill", "Action", "Focus"], "A figure channels power from above to below with ritual tools on the table, showing willpower, direction, and deliberate creation."],
    ["the-high-priestess", "The High Priestess", "Major Arcana · II", "Intuition", ["Mystery", "Stillness", "Inner knowing"], "A calm guardian sits between pillars with a hidden veil behind her, showing sacred knowledge, privacy, and inner truth."],
    ["the-empress", "The Empress", "Major Arcana · III", "Nurture", ["Abundance", "Care", "Growth"], "A fertile landscape and a relaxed queen suggest softness, beauty, and the steady care that helps life grow."],
    ["the-emperor", "The Emperor", "Major Arcana · IV", "Structure", ["Authority", "Stability", "Order"], "A ruler sits on a stone throne among mountains, showing leadership, protection, and strong foundations."],
    ["the-hierophant", "The Hierophant", "Major Arcana · V", "Guidance", ["Tradition", "Teaching", "Practice"], "A spiritual teacher blesses seekers in a formal setting, showing wisdom, ritual, and trusted systems."],
    ["the-lovers", "The Lovers", "Major Arcana · VI", "Alignment", ["Choice", "Union", "Truth"], "Two figures stand in open honesty beneath a blessing, showing intimacy, values, and meaningful decisions."],
    ["the-chariot", "The Chariot", "Major Arcana · VII", "Direction", ["Willpower", "Control", "Momentum"], "A driver holds course between opposing forces, showing disciplined movement and purposeful focus."],
    ["strength", "Strength", "Major Arcana · VIII", "Courage", ["Compassion", "Steadiness", "Grace"], "A gentle figure calms a lion with ease, showing emotional mastery and soft power."],
    ["the-hermit", "The Hermit", "Major Arcana · IX", "Insight", ["Reflection", "Solitude", "Wisdom"], "A lone elder holds a lantern in the dark, showing inner guidance, patience, and quiet truth."],
    ["wheel-of-fortune", "Wheel of Fortune", "Major Arcana · X", "Change", ["Cycles", "Timing", "Turning point"], "A turning wheel surrounded by symbols shows the rise and fall of cycles and the movement of fate."],
    ["justice", "Justice", "Major Arcana · XI", "Truth", ["Balance", "Fairness", "Accountability"], "A calm judge with scales and sword shows clarity, responsibility, and clean consequence."],
    ["the-hanged-man", "The Hanged Man", "Major Arcana · XII", "Surrender", ["Pause", "Perspective", "Release"], "A suspended figure glows with peace rather than pain, showing insight gained by letting go."],
    ["death", "Death", "Major Arcana · XIII", "Transformation", ["Ending", "Release", "Renewal"], "A dark rider moves through a changed landscape, showing that endings clear the way for new life."],
    ["temperance", "Temperance", "Major Arcana · XIV", "Balance", ["Healing", "Flow", "Integration"], "An angel blends water between two cups, showing moderation, harmony, and patient alchemy."],
    ["the-devil", "The Devil", "Major Arcana · XV", "Attachment", ["Shadow", "Temptation", "Bondage"], "Chains, heat, and fixation in the image show unhealthy attachment and the need for awareness."],
    ["the-tower", "The Tower", "Major Arcana · XVI", "Disruption", ["Shock", "Truth", "Breakthrough"], "Lightning strikes a tall tower, showing sudden truth, collapse of illusion, and necessary change."],
    ["the-star", "The Star", "Major Arcana · XVII", "Hope", ["Healing", "Renewal", "Faith"], "A luminous figure pours water beneath a clear sky, showing restoration, honesty, and quiet hope."],
    ["the-moon", "The Moon", "Major Arcana · XVIII", "Mystery", ["Dreams", "Emotion", "Instinct"], "A moonlit path flanked by wild symbols shows uncertainty, intuition, and the hidden world beneath logic."],
    ["the-sun", "The Sun", "Major Arcana · XIX", "Joy", ["Clarity", "Warmth", "Vitality"], "A radiant sun shines over open life, showing truth, celebration, and full-hearted energy."],
    ["judgement", "Judgement", "Major Arcana · XX", "Awakening", ["Calling", "Release", "Renewal"], "Figures rise toward a trumpet call, showing reckoning, liberation, and a conscious new chapter."],
    ["the-world", "The World", "Major Arcana · XXI", "Completion", ["Wholeness", "Integration", "Arrival"], "A central dancing figure framed by a wreath shows closure, mastery, and a fully realized cycle."]
  ];

  const majorThemes = {
    Leap: {
      general: ["Take the first honest step without demanding total certainty.", "You may be hesitating because the path feels too undefined, but a small brave start matters more now."],
      work: ["Fresh ideas and experiments are favored, especially if you stop over-editing the beginning.", "Avoid scattered effort and begin with one simple action before trying to prove the whole plan."],
      relationship: ["Approach connection with openness and sincerity rather than overprotecting yourself.", "Immaturity or mixed signals may be clouding the bond, so say what is real in a grounded way."],
      money: ["A modest new approach to spending or earning could open a better long-term pattern.", "Be careful with impulsive choices and look twice before trusting risk that only feels exciting."],
      mind: ["Curiosity is healthier than fear today, so let wonder loosen your inner tension.", "Your mind may be restless or naive, so pair hope with a little reflection."]
    },
    Manifestation: {
      general: ["You can shape more than you think when intention and action align.", "Power is present, but it needs better direction instead of forced control."],
      work: ["Your tools are ready, so focus your skill on one concrete objective.", "Something in your execution may be scattered, so simplify and realign your effort."],
      relationship: ["Say what you mean and follow through consistently.", "Charm without honesty will weaken trust, so let actions match your words."],
      money: ["Use strategy and confidence to organize resources more deliberately.", "Review how energy or money is leaking through poor planning or overconfidence."],
      mind: ["Mental clarity grows when you choose one focus and commit to it.", "Overthinking or image-management may be pulling you away from your real power."]
    },
    Intuition: {
      general: ["Listen to the quieter truth before reacting to outer pressure.", "Something is being felt clearly inside, but you may be overriding it."],
      work: ["Observe more before you move; timing matters as much as action.", "Hidden information or inner doubt may be slowing progress, so pause and read carefully."],
      relationship: ["Sensitivity and emotional honesty matter more than quick conclusions.", "Silence, secrecy, or unspoken feelings may need gentle naming."],
      money: ["Use discernment, especially where something feels unclear or incomplete.", "Do not ignore subtle warning signs around agreements or spending."],
      mind: ["Stillness will bring more truth than mental noise today.", "Your intuition is active, but anxiety may be distorting its message."]
    },
    Nurture: {
      general: ["Growth responds to patient care and embodied presence.", "Neglected needs may be asking for gentler attention before you can keep giving."],
      work: ["Creative output improves when the environment feels supportive and resourced.", "Burnout or overgiving may be draining the quality of your work."],
      relationship: ["Offer warmth, reassurance, and sincere care without trying to control the outcome.", "Care can become smothering if you lose your own center."],
      money: ["Choose steady, sustainable abundance over quick proof or comparison.", "Comfort spending or lack of structure may be blurring what truly nourishes you."],
      mind: ["Your nervous system responds well to softness, beauty, and rest.", "You may need to mother yourself more gently instead of pushing harder."]
    },
    Structure: {
      general: ["Clear decisions and boundaries will make the day feel stronger.", "Rigidity or overcontrol may be creating more pressure than support."],
      work: ["Lead with clean priorities, deadlines, and frameworks.", "Power struggles or stubborn habits may be blocking effective progress."],
      relationship: ["Reliability matters, but warmth needs room too.", "Control, distance, or defensiveness may be replacing true connection."],
      money: ["Practical planning, discipline, and long-view thinking are favored.", "Look at where fear-based control or avoidance is shaping financial choices."],
      mind: ["Ground yourself with structure when thoughts begin to scatter.", "You may be gripping too tightly, and that tension is affecting your clarity."]
    },
    Guidance: {
      general: ["A trusted teaching or ritual can help steady you today.", "Old rules may need review if they no longer fit your actual values."],
      work: ["Learn from proven systems, mentors, or established practices.", "Blindly following structure may hold back necessary originality."],
      relationship: ["Shared values and honest agreements matter more than surface chemistry.", "Outdated expectations may be shaping the bond more than present truth."],
      money: ["Conservative decisions and practical advice can help.", "Check whether inherited beliefs about money are still useful."],
      mind: ["A grounding practice will calm mental noise and reconnect you to what matters.", "Question the inner rules that feel heavy but not helpful."]
    },
    Alignment: {
      general: ["Make the choice that sounds most honest in your own chest.", "You may be pulled between desire and truth, and avoiding the choice is its own answer."],
      work: ["Partnerships and decisions go better when they reflect shared values.", "Mixed motives or divided energy may be making work harder than it needs to be."],
      relationship: ["Connection deepens through honesty, choice, and mutual clarity.", "A disconnect between words and values may need to be addressed."],
      money: ["Spend and plan in a way that respects your real priorities.", "Financial choices may be reacting to emotion rather than alignment."],
      mind: ["Inner peace grows when your choices match your values.", "Confusion may come from trying to please two truths at once."]
    },
    Direction: {
      general: ["Momentum builds when you stop splitting your energy.", "You may be moving, but not in a unified direction yet."],
      work: ["Pick the lane, commit, and let discipline carry the rest.", "Competing demands or emotional friction may be scattering your drive."],
      relationship: ["Lead with clarity instead of mixed signals.", "Trying to force movement may create more resistance than progress."],
      money: ["Progress with money comes through deliberate choices and sustained effort.", "Impulse and lack of coordination may be weakening financial momentum."],
      mind: ["Focus is medicine for your thoughts today.", "Mental tug-of-war may be exhausting you more than the real task."]
    },
    Courage: {
      general: ["Gentle steadiness is stronger than dramatic force.", "Your inner strength is present, but it may need regulation more than pressure."],
      work: ["Use patience and composure to handle difficulty well.", "Frustration may be masking fear, so slow down and respond with maturity."],
      relationship: ["Tender honesty can heal more than dominating the moment.", "Defensiveness or suppressed feeling may be making closeness harder."],
      money: ["Steady restraint and emotional maturity support good money choices.", "Avoid spending from emotional overwhelm or hidden insecurity."],
      mind: ["Calm compassion toward yourself will settle the day.", "Inner tension may be asking for softness rather than self-criticism."]
    },
    Insight: {
      general: ["Space and quiet will reveal the deeper answer.", "Isolation may be useful, but do not disappear from what matters."],
      work: ["Research, reflection, and strategic distance can sharpen your next move.", "Withdrawal or perfectionism may be delaying necessary action."],
      relationship: ["Take space to understand your truth before speaking.", "Emotional distance may be protecting you, but it may also block repair."],
      money: ["Simple, thoughtful choices beat hurried ones today.", "Avoid making financial choices just to escape discomfort."],
      mind: ["Solitude can clear your thinking and reconnect you to yourself.", "You may be over-retreating when a grounded conversation would help."]
    },
    Change: {
      general: ["Life is turning, and flexibility will help more than resistance.", "A shift is already underway, and clinging may intensify the discomfort."],
      work: ["Timing is active, so adapt quickly where the wheel is moving.", "Uncertainty at work may feel destabilizing, but it is revealing the next cycle."],
      relationship: ["A relationship pattern is turning and needs conscious participation.", "Old loops may keep repeating if no one changes how they respond."],
      money: ["Stay responsive and avoid assuming today’s conditions are permanent.", "Financial fluctuations may call for restraint and perspective."],
      mind: ["Let yourself move with change instead of demanding total control.", "Your thoughts may be chasing certainty in a moment that asks for adaptability."]
    },
    Truth: {
      general: ["Clear honesty will simplify the day more than avoidance.", "Something needs to be faced more directly and cleanly."],
      work: ["Assess the facts, own your part, and make the fair decision.", "Bias, defensiveness, or fuzzy standards may be complicating the situation."],
      relationship: ["Speak with balance and accountability rather than blame.", "Unfair assumptions or unresolved truths may be shaping the dynamic."],
      money: ["Look at numbers, agreements, and consequences without flinching.", "Avoid rationalizing choices that do not hold up under scrutiny."],
      mind: ["Mental calm comes from truth, not from rehearsing half-answers.", "Inner judgment may be getting harsh instead of honest."]
    },
    Surrender: {
      general: ["Let a pause change your perspective before you push forward.", "Resistance may be teaching you that forcing the issue is not the answer."],
      work: ["A delay can be productive if it reveals a wiser approach.", "Feeling stuck at work may be asking for rethinking, not panic."],
      relationship: ["Stop trying to control the outcome and listen for what is actually true.", "A relational stalemate may ease when one person releases defensiveness."],
      money: ["Hold off on rushed decisions until you see the pattern more clearly.", "Financial frustration may come from trying to solve the wrong problem."],
      mind: ["Stillness can create insight that effort cannot.", "Your mind may be fighting the pause instead of learning from it."]
    },
    Transformation: {
      general: ["Something has run its course, and release will make space for renewal.", "Clinging to an old chapter may be making transition harder than it needs to be."],
      work: ["A role, system, or habit may need to end so better work can begin.", "Work stress may be tied to refusing a necessary reset."],
      relationship: ["A relationship pattern is asking to transform, not continue untouched.", "Holding on to what is already over can delay honest healing."],
      money: ["Financial renewal starts by ending what is draining or outdated.", "Fear of change may be keeping you attached to an unhealthy money pattern."],
      mind: ["You are allowed to outgrow an old identity or thought-loop.", "Mental heaviness may ease once you stop resisting change."]
    },
    Balance: {
      general: ["Choose the middle path and let things blend gradually.", "Extremes or impatience may be disturbing your natural rhythm."],
      work: ["Pacing, collaboration, and good timing matter more than intensity.", "Too much force or too many competing priorities may be diluting results."],
      relationship: ["Balanced reciprocity creates warmth and trust.", "One-sided effort or emotional extremes may be asking for correction."],
      money: ["Moderation and measured planning support your finances well today.", "Swinging between denial and urgency may be the real issue with money now."],
      mind: ["Your inner world wants integration, not overload.", "Anxious swings may soften if you return to steadier habits."]
    },
    Attachment: {
      general: ["See clearly where you are giving your power away.", "A pattern may feel gripping right now, but naming it loosens it."],
      work: ["Watch for burnout, ego traps, or unhealthy ambition.", "Work may be driven by fear, pressure, or attachment to image."],
      relationship: ["Notice where desire, fear, or control is clouding the bond.", "A relational loop may be based more on compulsion than connection."],
      money: ["Look honestly at spending, scarcity fear, or material fixation.", "Money stress may be amplified by shame or unhealthy attachment."],
      mind: ["Awareness is your first step out of the loop.", "Your thoughts may be caught in a story that feels powerful but is not fully true."]
    },
    Disruption: {
      general: ["What is unstable may be clearing space for something more honest.", "The shock is real, but so is the truth being revealed."],
      work: ["A work structure may need to break so a better one can replace it.", "Chaos at work may be exposing what was never really holding."],
      relationship: ["A hard truth in relationship may be uncomfortable but clarifying.", "Avoid rebuilding the old pattern just because it is familiar."],
      money: ["Sudden changes call for calm honesty and practical regrouping.", "A financial wake-up moment may be showing what can no longer continue."],
      mind: ["Let the truth land before you rush to numb it.", "Mental overload may follow a disruption, so simplify and stabilize first."]
    },
    Hope: {
      general: ["Healing is available when you let sincerity and softness return.", "Discouragement may be temporary, even if it feels familiar."],
      work: ["Gentle confidence and vision can restore momentum in work.", "You may need to reconnect with purpose before pushing productivity."],
      relationship: ["Kindness and honest openness can refresh connection.", "Healing in relationship may be possible, but it needs vulnerability."],
      money: ["A calmer and more hopeful money relationship is possible through steady repair.", "Do not let discouragement define your whole financial story."],
      mind: ["Hope is not denial here; it is a nervous system softening back into trust.", "Your mind may need rest from cynicism to remember what is possible."]
    },
    Mystery: {
      general: ["Move slowly and trust what your instincts are noticing.", "Uncertainty is present, and forcing certainty too soon could mislead you."],
      work: ["Read between the lines before deciding.", "Work confusion may come from incomplete information or emotional haze."],
      relationship: ["Feelings are deeper than what is being said aloud.", "Projection, fear, or mixed signals may be shaping the bond."],
      money: ["Stay cautious and avoid acting from confusion or fantasy.", "A financial situation may need more clarity before commitment."],
      mind: ["Dreams, symbols, and emotions are speaking loudly right now.", "Your mind may be amplifying fear; return to the body and the facts."]
    },
    Joy: {
      general: ["Let what is good be fully good today.", "You may be dimming your own light out of habit rather than necessity."],
      work: ["Visibility, confidence, and wholehearted effort are strongly supported.", "Self-doubt may be stopping you from standing more fully in your strengths."],
      relationship: ["Warmth, openness, and sincerity can brighten connection.", "Pride or guardedness may be interrupting a naturally positive bond."],
      money: ["Clarity and confidence help you make cleaner money choices.", "Do not let fear spoil evidence of actual progress."],
      mind: ["Your mind benefits from sunlight, directness, and simple gratitude.", "Exhaustion or self-dimming may be muting joy that is actually available."]
    },
    Awakening: {
      general: ["You are hearing a deeper call to change how you live this chapter.", "Avoid postponing a truth that has already become clear inside you."],
      work: ["A clearer calling or standard is rising in your work life.", "Staying asleep to your real direction may feel increasingly uncomfortable."],
      relationship: ["Honest reckoning can free a connection or reveal its truth.", "A relationship pattern may be asking for a wake-up rather than another repeat."],
      money: ["Greater awareness can reset the way you relate to earning and value.", "Financial avoidance may be ready for a real turning point."],
      mind: ["You are outgrowing an old inner story.", "Mental heaviness may lift once you answer what you already know."]
    },
    Completion: {
      general: ["Something is coming full circle and deserves acknowledgment.", "Rushing into the next chapter may keep you from integrating this one."],
      work: ["A work cycle is maturing, landing, or being recognized.", "Completion energy may feel oddly emotional if you do not pause to honor it."],
      relationship: ["A relational chapter is becoming clearer in its true shape.", "Closure or integration may be needed before the bond can evolve cleanly."],
      money: ["Long-term effort can begin showing a fuller result now.", "You may need to finish one financial chapter before starting the next."],
      mind: ["Wholeness grows when you recognize your own progress.", "Your mind may still be searching for lack even while something real has completed."]
    }
  };

  const suitProfiles = {
    Wands: {
      element: "Fire",
      symbol: "✦",
      palette: ["#ff9a5a", "#7a1f1f"],
      artwork: "Flame-like lines, heat, and forward motion show courage, desire, and the need to move energy instead of sitting on it.",
      nouns: ["initiative", "creative drive", "momentum"],
      general: ["This card heats up your day and asks for active movement toward what matters.", "The fire here may be blocked, scattered, or turning into frustration instead of action."],
      work: ["Work responds well to initiative, visibility, and confident effort.", "Work may feel stalled because energy is leaking into impatience or overreaction."],
      relationship: ["Passion and directness are alive, but they need emotional maturity.", "Chemistry may be present, but impatience or ego could be distorting the connection."],
      money: ["Financial growth benefits from proactive effort and willingness to create opportunity.", "Impulsive money choices or restless risk-taking need more restraint."],
      mind: ["Your mind wants courage, movement, and belief in your own spark.", "Mental restlessness may be asking for focused action instead of more spinning."]
    },
    Cups: {
      element: "Water",
      symbol: "◖",
      palette: ["#7ce5ff", "#234168"],
      artwork: "Water, vessels, and flowing shapes show emotion, intuition, closeness, and the need to feel honestly.",
      nouns: ["emotion", "connection", "heart truth"],
      general: ["This card highlights emotion, intuition, and what is moving through your heart.", "Something emotional may be overflowing, blocked, or harder to name clearly."],
      work: ["Work is influenced by morale, intuition, and emotional context more than usual.", "Work strain may be coming from unspoken feelings or lack of emotional clarity."],
      relationship: ["Relationships are the strongest lens here, inviting sincerity and emotional presence.", "Emotional confusion, withdrawal, or fantasy may be clouding the bond."],
      money: ["Money choices need emotional honesty, not mood-based reactions.", "Spending or financial fear may be more emotional than practical right now."],
      mind: ["Your inner world wants gentleness, reflection, and space to feel.", "The mind may be flooded by emotion and needs grounding before insight returns."]
    },
    Swords: {
      element: "Air",
      symbol: "✧",
      palette: ["#cfdaf8", "#344b88"],
      artwork: "Sharp lines, sky tones, and blade imagery show thought, truth, conflict, and the power of perspective.",
      nouns: ["clarity", "decision", "mental pattern"],
      general: ["This card sharpens awareness and asks you to think clearly.", "The air element may be turning into overthinking, harshness, or mental strain."],
      work: ["Communication, strategy, and decision-making are central in work today.", "Work tension may be tied to mixed messaging, pressure, or indecision."],
      relationship: ["Truthful conversation matters more than avoidance or guessing.", "Words may be hurting more than helping, so slow down and speak cleanly."],
      money: ["Good money decisions come from clear thinking and honest review.", "Fear-based thinking may be making financial questions feel harsher than they are."],
      mind: ["Your mind wants clarity, honesty, and cleaner thought patterns.", "Mental fatigue or inner criticism may be the real issue to address."]
    },
    Pentacles: {
      element: "Earth",
      symbol: "⬡",
      palette: ["#a7f0b2", "#285232"],
      artwork: "Coins, earth tones, and stable geometry show resources, body, effort, and real-world results.",
      nouns: ["stability", "resources", "practical growth"],
      general: ["This card grounds the day in what is tangible, steady, and buildable.", "The practical world may feel heavy or slow, asking for patience and realism."],
      work: ["Work benefits from consistency, craft, and sustainable progress.", "Stagnation or overattachment to security may be blocking healthy progress."],
      relationship: ["Reliability, effort, and real-life support matter more than grand words.", "A relationship may need more grounded care and less assumption."],
      money: ["Money and material stability are highlighted very directly here.", "Financial anxiety, scarcity, or inertia may need practical correction."],
      mind: ["Your mind settles when your body, space, and routines feel supported.", "Mental stress may be tied to lack of grounded structure rather than lack of ability."]
    }
  };

  const rankProfiles = [
    ["Ace", "Ace", "Seed", ["Potential", "Opening"], ["A single emblem shines at the center of the card, showing a pure beginning and concentrated potential."]],
    ["Two", "II", "Balance", ["Choice", "Exchange"], ["Paired symbols or mirrored motion suggest tension, partnership, and the need to find rhythm."]],
    ["Three", "III", "Expansion", ["Expression", "Growth"], ["Three forms create movement and expansion, showing something beginning to develop outwardly."]],
    ["Four", "IV", "Foundation", ["Stability", "Containment"], ["A square or stable arrangement signals pause, safety, and structural support."]],
    ["Five", "V", "Friction", ["Challenge", "Instability"], ["Uneven movement and tension in the imagery show conflict, discomfort, or necessary disruption."]],
    ["Six", "VI", "Harmony", ["Recovery", "Flow"], ["Balanced spacing and softer movement suggest repair, generosity, or a steadier rhythm returning."]],
    ["Seven", "VII", "Assessment", ["Questioning", "Strategy"], ["The composition feels unsettled or searching, showing reflection, tests, and inner evaluation."]],
    ["Eight", "VIII", "Momentum", ["Mastery", "Movement"], ["Repetition and direction in the image show progress through effort, rhythm, or acceleration."]],
    ["Nine", "IX", "Threshold", ["Intensity", "Near completion"], ["The card feels full and emotionally charged, showing a lesson nearing its peak."]],
    ["Ten", "X", "Completion", ["Fullness", "Ending"], ["A crowded or complete composition shows the total weight or reward of a cycle."]],
    ["Page", "Page", "Message", ["Learning", "Exploration"], ["A youthful messenger studies a symbol closely, showing curiosity and the arrival of new insight."]],
    ["Knight", "Knight", "Pursuit", ["Drive", "Commitment"], ["Forward motion dominates the image, showing commitment, urgency, and directed action."]],
    ["Queen", "Queen", "Embodiment", ["Wisdom", "Composure"], ["A calm sovereign seated in her element shows mature inner authority and deep receptivity."]],
    ["King", "King", "Mastery", ["Authority", "Direction"], ["A stable ruler fully occupies the card, showing command, responsibility, and grounded leadership."]]
  ];

  function themeSet(upright, reversed) {
    return { upright, reversed };
  }

  function createMajorCard(entry) {
    const [key, name, arcanaLabel, primaryKeyword, extraKeywords, artwork] = entry;
    const themeSource = majorThemes[primaryKeyword];
    return {
      key,
      name,
      arcanaLabel,
      primaryKeyword,
      keywords: [primaryKeyword, ...extraKeywords],
      artwork,
      palette: ["#ffcf78", "#6b2a88"],
      symbol: "☼",
      summary: {
        upright: `${name} centers today around ${primaryKeyword.toLowerCase()}, asking you to work with its wisdom consciously.`,
        reversed: `${name} appears reversed, suggesting the lesson of ${primaryKeyword.toLowerCase()} is blocked, delayed, or turning inward.`
      },
      themes: {
        general: themeSet(themeSource.general[0], themeSource.general[1]),
        work: themeSet(themeSource.work[0], themeSource.work[1]),
        relationship: themeSet(themeSource.relationship[0], themeSource.relationship[1]),
        money: themeSet(themeSource.money[0], themeSource.money[1]),
        mind: themeSet(themeSource.mind[0], themeSource.mind[1])
      }
    };
  }

  function createMinorCard(suit, rankEntry, index) {
    const profile = suitProfiles[suit];
    const [rank, numeral, primaryKeyword, extraKeywords, artworkNotes] = rankEntry;
    const noun = profile.nouns[index % profile.nouns.length];
    const name = `${rank} of ${suit}`;

    return {
      key: `${rank.toLowerCase()}-of-${suit.toLowerCase()}`,
      name,
      arcanaLabel: `Minor Arcana · ${numeral}`,
      suit,
      element: profile.element,
      primaryKeyword,
      keywords: [primaryKeyword, ...extraKeywords, suit],
      artwork: `${artworkNotes[0]} ${profile.artwork}`,
      palette: profile.palette,
      symbol: profile.symbol,
      summary: {
        upright: `${name} brings ${primaryKeyword.toLowerCase()} into focus through ${noun} and grounded daily choices.`,
        reversed: `${name} reversed suggests ${primaryKeyword.toLowerCase()} is tangled, delayed, or asking for a reset around ${noun}.`
      },
      themes: {
        general: themeSet(
          `${profile.general[0]} The ${rank.toLowerCase()} energy of ${primaryKeyword.toLowerCase()} shapes how this message lands.`,
          `${profile.general[1]} The ${rank.toLowerCase()} lesson around ${primaryKeyword.toLowerCase()} may need patience and honest adjustment.`
        ),
        work: themeSet(
          `${profile.work[0]} In work, ${name} highlights ${noun} and asks you to respond with maturity.`,
          `${profile.work[1]} In work, ${name} reversed suggests ${noun} is being blocked by poor timing, doubt, or overcorrection.`
        ),
        relationship: themeSet(
          `${profile.relationship[0]} In relationships, ${name} asks you to notice how ${primaryKeyword.toLowerCase()} is shaping closeness.`,
          `${profile.relationship[1]} In relationships, ${name} reversed suggests the emotional lesson around ${primaryKeyword.toLowerCase()} is not flowing cleanly yet.`
        ),
        money: themeSet(
          `${profile.money[0]} The practical lesson here is to handle ${noun} with steadiness and awareness.`,
          `${profile.money[1]} Reversed, this card warns that the pattern around ${noun} may need simplification before it improves.`
        ),
        mind: themeSet(
          `${profile.mind[0]} Mentally, ${name} asks for a healthier relationship with ${primaryKeyword.toLowerCase()}.`,
          `${profile.mind[1]} Mentally, ${name} reversed suggests ${primaryKeyword.toLowerCase()} may be stuck in an unhelpful loop.`
        )
      }
    };
  }

  const cards = [
    ...majorArcana.map(createMajorCard),
    ...Object.keys(suitProfiles).flatMap((suit) =>
      rankProfiles.map((entry, index) => createMinorCard(suit, entry, index))
    )
  ].map((card, index) => ({
    ...card,
    imageUrl: localArtworkFiles[index] ? localArtworkUrl(localArtworkFiles[index]) : card.imageUrl
  }));

  window.TAROT_DATABASE = {
    cards,
    byKey: Object.fromEntries(cards.map((card) => [card.key, card]))
  };
})();
