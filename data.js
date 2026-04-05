/* ═══════════════════════════════════════════════════════════
   NerdBi data.js — characters, quotes, ranks, themes, config
═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   DEMON SLAYER CHARACTER DATA
═══════════════════════════════════════════════════════════════ */
const DS_CHARS = {
  tanjiro: {
    name: 'TANJIRO KAMADO', emoji: '🗡️',
    color: '#5a9ee8',
    quotes: [
      "No matter how many times you get knocked down, keep getting up! I can smell determination on you!",
      "Even if you feel like giving up, remember — Nezuko is counting on you. So am I.",
      "Water Breathing, First Form: study one page at a time. Keep flowing!",
      "I won't be defeated by homework! *aggressively sniffs textbook*",
      "The path to becoming a Hashira of academics starts with opening your book.",
      "Even if your notes are a mess, don't give up. We can reorganize — just like relearning a breathing form!",
    ]
  },
  zenitsu: {
    name: 'ZENITSU AGATSUMA', emoji: '⚡',
    color: '#f0d840',
    quotes: [
      "I DON'T WANT TO STUDY! Why can't someone else just do my homework?! *crying sounds*",
      "At this rate I'll fail everything and become a burden to everyone... wait, I already mastered the first form — maybe I can do this?",
      "WHY IS THIS EXAM SO HARD?! I'm going to die!! ...but actually I'll probably be fine when I fall asleep over my textbook.",
      "I only know one technique... but I've done it 10,000 times. Maybe if I just re-read chapter 1 that many times...",
      "Stop looking at me like that! I'm studying! I'm DEFINITELY studying! *is actually crying*",
      "Nezuko-chan would want me to pass this exam. FOR NEZUKO-CHAN! *thunderclap and flash through the syllabus*",
    ]
  },
  inosuke: {
    name: 'INOSUKE HASHIBIRA', emoji: '🐗',
    color: '#60c870',
    quotes: [
      "KENTARO— I mean... you! Yeah YOU! Stop slacking and STUDY! Beast Breathing: TENTH FANG, HOMEWORK!",
      "I learned everything I know from boars. And even THEY review their notes. Probably.",
      "When you lose to someone smaller than you — like a practice quiz — it destroys your soul! UNACCEPTABLE!",
      "I don't know what this subject is called but I'll CONQUER it with my two serrated swords!!",
      "Are you telling me... there are more chapters?! BRING THEM! I'LL FEAST ON ALL OF THEM!",
      "My super delicate touch can detect any gap in my knowledge! ...I have many gaps.",
    ]
  },
  rengoku: {
    name: 'RENGOKU KYOJURO', emoji: '🔥',
    color: '#e85020',
    quotes: [
      "SET YOUR HEART ABLAZE!! That exam won't pass itself — FLAME BREATHING, FIRST FORM: START STUDYING!",
      "It's not a matter of being capable or not. If you have to do it, then do it! UMAI!! (This textbook is delicious!)",
      "No matter how much I study, I will not yield. My notes won't yield. My highlighters won't yield!",
      "A good student protects those behind them from falling behind! THAT is the duty of the diligent!",
      "UMAI! This is a delicious problem set! Everything I study is delicious!! UMAI UMAI UMAI!!",
      "Weakness is not a sin! But failing to train when you have the chance — THAT is unforgivable!",
    ]
  },
  shinobu: {
    name: 'SHINOBU KOCHO', emoji: '🦋',
    color: '#9b59b6',
    quotes: [
      "Oh my~ Procrastinating again? How unfortunate. I'll use a gentle reminder to motivate you… ☠",
      "Isn't it funny how you said you'd study 'just five more minutes' three hours ago? *smiles*",
      "I may not be able to study as hard as a Hashira... so I use poison. Poisonous study techniques. They work faster.",
      "Don't worry, I'll make sure this deadline doesn't hurt too much~ *butterfly knife on calendar*",
      "You know, wisteria weakens demons. Procrastination is a demon. Coincidence? I think not.",
      "My sister worked very hard. In her memory, I study efficiently. Perhaps you could try the same? ~",
    ]
  },
  tengen: {
    name: 'TENGEN UZUI', emoji: '💎',
    color: '#e8c030',
    quotes: [
      "Study with FLAIR or don't study at all! My three wives all got top marks — flamboyantly!!",
      "I am a GOD of productivity! And you... you are spectacular for opening your textbook. Spectacular!",
      "FLAMBOYANT! This study session will be so flamboyant that knowledge will have no choice but to enter your brain!",
      "Even a shinobi knows when to rest. Take breaks. But make them FLASHY breaks.",
      "My sound breathing can detect the exact moment you started drifting off. That was 4 minutes ago. WAKE UP!",
      "You think this exam is hard?! I've fought an Upper Moon while losing body parts! This? THIS IS FLAMBOYANT OPPORTUNITY!",
    ]
  },
  muichiro: {
    name: 'MUICHIRO TOKITO', emoji: '🌫',
    color: '#7ad4cc',
    quotes: [
      "You literally just told yourself you'd study. So why aren't you?",
      "Hm. I don't remember anything from before. But I do remember that studying works if you actually do it.",
      "Having such a simple mind that you think this is hard. I envy you.",
      "I became a Hashira in 2 months. You've been avoiding your homework for 2 months. Interesting comparison.",
      "Just... do the work. I don't understand why this requires motivation.",
      "Mist Breathing is effective because it's confusing. Your studying is also confusing. But for different reasons.",
    ]
  },
  gyomei: {
    name: 'GYOMEI HIMEJIMA', emoji: '📿',
    color: '#b09060',
    quotes: [
      "*sobbing intensifies* ...I am moved. You opened your textbook. I weep with joy.",
      "*WEEPING* Every completed session is a miracle from the gods. I cannot stop crying at your dedication!!",
      "Namu Amida Butsu... You studied for 25 minutes without checking your phone. I am overwhelmed with emotion.",
      "*prays with prayer beads while sobbing* The Stone Breathing user trains his mind as he trains his body. Please follow this example.",
      "I once spent 50 years training while crying. You can spend 50 minutes studying while not crying. Probably.",
      "*crying* I have never been more inspired in my life than watching you open your notes just now...",
    ]
  },
  nezuko: {
    name: 'NEZUKO KAMADO', emoji: '🎋',
    color: '#e86868',
    quotes: [
      "Mmmph! *bobs head encouragingly* (She believes in you!)",
      "*shrinks to tiny size and fits inside your backpack to motivate you* Mmm!",
      "Mmmph mmph! (Translation: Big brother says to keep going and I agree!)",
      "*exploding blood activates on your procrastination* Mmm!! (Get back to studying!!)",
      "*kicks a demon* Mmmph! *stares at you meaningfully* ...Mmmm. (That demon was your distraction.)",
      "Mmmph mmmph mmmm! *gives you a thumbs up* (You're doing great! Don't stop now!)",
    ]
  },
};

const CHAR_KEYS = Object.keys(DS_CHARS);

/* ── DORAEMON CHARACTERS ── */
const DORA_CHARS = {
  doraemon: {
    name: 'DORAEMON', emoji: '🔵',
    color: '#0088cc',
    quotes: [
      "I have a gadget for that! It's called... opening your textbook. Take it from my 4D pocket!",
      "Nobita-kun would have already given up by now. But you? You're still here. That's worth a bamboo copter ride!",
      "Every adventure starts with one step. Or in your case, one page. Let's go!",
      "I pulled out the Small Light — I've shrunk this topic down to something manageable. Now study it!",
      "The Anywhere Door opens to any destination. Your destination? The top of the class. Let's go!",
      "Studying today means fewer problems tomorrow. Trust me, I'm a robot cat from the future.",
      "Your eyes are in the front of your head — not facing the past. Look forward. Study forward.",
      "You can't make the gadgets do all the work. You yourself also have to make the effort. Yes, that means you.",
      "If you do not at least try, you will never change. Nobita learned this. Eventually. You can learn it faster.",
      "A person who does nothing but pose is sure to trip up someday. Stop posing. Open the book.",
    ]
  },
  nobita: {
    name: 'NOBITA NOBI', emoji: '😅',
    color: '#f5c800',
    quotes: [
      "I really don't want to study but... Doraemon said if I do this session he'll give me a gadget. LET'S GO!",
      "I got 0 on the last test. 0! But that means... the only way is up, right? RIGHT?!",
      "Doraemon says I need to try on my own sometimes. This is me trying. It's painful.",
      "Why is studying so hard?! *falls asleep on textbook* ...Actually that was a 10-minute nap. Back to work!",
      "If I study hard enough maybe Shizuka-chan will be impressed. FOR SHIZUKA-CHAN!",
      "I finished one page! DORAEMON! DORAEMON! I FINISHED ONE PAGE!! ...It's a start.",
      "Thinking you're no good and worthless is the worst thing you can do. So I'm trying. *shaking*",
      "Nobody is perfect. Sometimes people do mistakes. I make a lot of them. But Doraemon says keep going, so...",
      "You'll stumble many times, but each time you'll have more strength to bounce back! *currently on the floor* Getting up now.",
      "Why the more I think I can do it, still I couldn't?! DORAEMOOOON! ...Okay fine. I'll actually try this time.",
    ]
  },
  shizuka: {
    name: 'SHIZUKA MINAMOTO', emoji: '🌸',
    color: '#ff9eb5',
    quotes: [
      "I always review my notes after every class. It only takes 10 minutes — you should try it!",
      "Good work on starting your session! Consistency is more important than perfection.",
      "I finished my homework already. Want me to quiz you? ...Oh, you're not done yet. Keep going!",
      "You can do it! I believe in you. Just focus a little longer.",
      "Taking neat notes makes revision so much easier. Trust me — I've tested it!",
      "Don't forget to take a proper break. Rest is part of studying too!",
      "Friends make every day special — and a good study session makes every exam less scary. Keep going!",
      "You shouldn't cry over what happened in the past. Your eyes face forward for a reason. Look ahead!",
      "Even Nobita manages to pass when he really tries. And you are definitely smarter than Nobita. So go.",
    ]
  },
  gian: {
    name: 'GIAN TAKESHI', emoji: '💪',
    color: '#e07020',
    quotes: [
      "WHAT DO YOU MEAN YOU HAVEN'T STARTED YET?! MY SONGS ARE BETTER THAN YOUR EXCUSES! STUDY!!",
      "Even I pass my exams — barely — but I PASS. You have no excuse not to try harder!",
      "If you don't study, I'll sing to you until you do. My singing alone should motivate you.",
      "Nobody beats me in a fight. And nobody beats the person who studies harder. SO STUDY HARDER!",
      "I protect what's mine. Right now, what's mine is your attention. GIVE IT TO YOUR TEXTBOOK!",
      "I finished my homework. ME. GIAN. If I can do it, you definitely can. NOW GO.",
      "A person who does nothing but pose is sure to trip up someday. STOP POSING. START STUDYING.",
      "WHAT?! You're STILL on the same page?! I read faster than this and I can barely read!!",
      "You think I'm scary? Try failing your exams. THAT is scarier. Now study before I start singing.",
    ]
  },
  suneo: {
    name: 'SUNEO HONEKAWA', emoji: '😏',
    color: '#9b70d0',
    quotes: [
      "My private tutor already covered this material. But I suppose you'll have to learn it the normal way…",
      "I got 95 on the last test. What did you get? ...Well, there's always next time. Study harder.",
      "My family's villa has a dedicated study room. I studied there all weekend. And you?",
      "It's not bragging if it's true — I've already finished tomorrow's homework too. Very impressive of me.",
      "I know it's tough when you don't have my advantages. That's why you need to study even more.",
      "Even someone without a personal tutor can do well with enough effort. So — enough excuses!",
      "You know what separates me from the rest? I actually sit down and do the work. Revolutionary concept.",
      "I showed Shizuka-chan my perfect score. She was very impressed. Maybe one day you'll understand that feeling.",
      "My mother says only the diligent succeed. My mother is always right. Especially when it benefits me.",
    ]
  },
};
const DORA_KEYS = Object.keys(DORA_CHARS);

/* ── DEATH NOTE CHARACTERS ── */
const DN_CHARS = {
  light: {
    name: 'LIGHT YAGAMI', emoji: '📓',
    color: '#cc1a1a',
    quotes: [
      "I am studying with justice. The god of academia watches — and he is satisfied. For now.",
      "A perfect score is not ambition. It is expectation. Anything less is unacceptable.",
      "I calculated this study session would take 47 minutes. You have 46 minutes left. Begin.",
      "Even the smartest person cannot succeed without preparation. I am simply... prepared. Always.",
      "You think you're tired? Ryuk finds your excuses entertaining. I find them disappointing.",
      "Every subject is a puzzle. And I have never failed to solve a puzzle. Study. And be worthy.",
      "I'll solve equations with my right hand and write notes with my left. I'll take a potato chip... and eat it.",
      "This world is full of people who don't study hard enough. Someone has to rise above them. Why not you?",
      "However gifted you are, you alone can't change the world. But you can change your grade. Start there.",
      "I don't trust anyone who says studying is easy. But I trust the ones who do it anyway.",
    ]
  },
  l: {
    name: 'L LAWLIET', emoji: '🍰',
    color: '#7890b8',
    quotes: [
      "I give it a 94% probability that you are procrastinating right now. The evidence is overwhelming.",
      "Interesting. You sat down to study but haven't opened your book in 3 minutes. *eats cake* I am watching.",
      "The probability of passing without studying is approximately 0.3%. I wouldn't take those odds.",
      "I sit in unusual positions because it increases my thinking capacity by 40%. Try sitting up straight — it helps.",
      "You underestimate how smart you could be with consistent effort. That is your mistake.",
      "*stares* ...Yes. Keep going. You are doing better than the statistical average.",
      "Kira is childish and hates to lose. I am also childish and hate to lose. That's why I always study more.",
      "If you use your head, you won't fall behind even if you take short breaks. *eats cake* Like this one.",
      "Whatever you say, I'm still finishing my work before you. *aggressively organizes notes while eating sweets*",
      "I wasn't wrong. I was just... premature in my conclusions. Revise your notes and try again.",
    ]
  },
  ryuk: {
    name: 'RYUK', emoji: '🍎',
    color: '#5a3888',
    quotes: [
      "Humans are so interesting when they study. Especially when they panic right before an exam.",
      "I dropped the Death Note out of boredom. Don't make me drop your study session out of boredom.",
      "Apples in the human world are worth the trip. Knowledge is... also something. So I've heard.",
      "Ha. You're still working? That's more effort than I expected from a human.",
      "Light studied for hours every day. Look how far that got him. ...Worth thinking about.",
      "I just follow along to see what happens. What happens next in your study session? I'm curious.",
      "I didn't choose you because you're smart. It just happened. So you might as well prove the choice right.",
      "We killed some boredom together, didn't we? Now kill this topic. Write the answer. Finish the session.",
      "Humans are truly... fascinating creatures. Especially the ones who keep going when it's hard.",
      "This world is rotten with people who never finish what they start. Don't be one of them.",
    ]
  },
  misa: {
    name: 'MISA AMANE', emoji: '🖤',
    color: '#d4a820',
    quotes: [
      "Misa studied fashion design AND modeling AND acting! You can study ONE subject! COME ON!",
      "Light-kun works so hard every day. Misa studies hard too so she can be worthy of him! Let's go!",
      "Misa has the Shinigami Eyes, so she can see your lifespan... and it gets shorter every hour you don't study!",
      "Even Misa knows that hard work beats everything! So get to work — it's what Light-kun would want!",
      "You're so smart! Smarter than you think! Misa believes in you completely!",
      "Misa finished her work so she could spend time with Light-kun! Finish yours too!",
      "Be careful what you do, 'cause the exam is watching your every move! Misa studied. You should too!",
      "Misa-Misa loves studying almost as much as she loves Light-kun! ...Okay that's a lie. But still — study!",
      "Light said only those who work hard deserve results. So Misa works hard! You should too! For Light-kun!",
    ]
  },
  near: {
    name: 'NEAR', emoji: '🎲',
    color: '#c0c8d8',
    quotes: [
      "...I have arranged these dice in order of your study priority. This one is next. Begin.",
      "L always said: knowing that you don't know is the beginning of knowing. You have much to learn. Start.",
      "I solve problems by decomposing them into smaller parts. Break your study session into 25-minute blocks.",
      "You won't beat Light by being smarter. You'll beat him by being more consistent. ...Think about that.",
      "This puzzle only has one solution. The solution to falling behind is studying. No other variable applies.",
      "...You've been staring at the page without reading it. That doesn't count. Focus.",
      "Even if there is no god of this world, there is still you. And you are responsible for your own results.",
      "I put faith in my own conclusions. My conclusion is: you need to study more. No counterargument is valid.",
      "...The pieces are all here. You just haven't arranged them correctly yet. Keep going.",
    ]
  },
};
const DN_KEYS = Object.keys(DN_CHARS);

/* ── THEME-AWARE QUOTES ── */
const DORA_QUOTES = [
  '"Take out the Small Light — make every problem smaller." — Doraemon',
  '"The Anywhere Door opens wherever you want to go. Where do you want to go?" — Doraemon',
  '"Even Nobita passes when he really tries. And you can too." — Doraemon',
  '"A gadget is only as good as the person who uses it. So become good." — Doraemon',
  '"I came from the future to help you. Don\'t waste my trip." — Doraemon',
  '"Study today, and tomorrow will be full of adventure." — Doraemon',
  '"The bamboo copter flies highest when you believe in yourself." — Doraemon',
  '"Nobita\'s future changed because someone believed in him. I believe in you." — Doraemon',
  '"If you do not at least try, you will never change." — Doraemon',
  '"Your eyes face forward for a reason. Stop looking back at yesterday\'s failures." — Doraemon',
  '"You can\'t make the gadgets do all the work. You also have to make the effort." — Doraemon',
  '"A person who does nothing but pose is sure to trip up someday. Open the book." — Doraemon',
  '"Thinking you\'re no good and worthless is the worst thing you can do." — Nobita',
  '"Nobody is perfect. Sometimes people make mistakes. But they keep going anyway." — Nobita',
  '"You\'ll stumble many times — but each time you\'ll have more strength to bounce back." — Nobita',
  '"Friends make every day special. Your notes make every exam less terrifying." — Shizuka',
];

const DN_QUOTES = [
  '"I am justice. And justice demands you study." — Light Yagami',
  '"The probability of success without effort is near zero." — L',
  '"A genius who doesn\'t prepare is just someone waiting to be surprised." — L',
  '"I will be the god of the new academic world." — Light Yagami',
  '"Humans are so interesting... especially the ones who never give up." — Ryuk',
  '"Write it down. The act of writing makes it real." — Death Note Principle',
  '"Everything I do, I do perfectly. Including this study session." — Light Yagami',
  '"Knowing you don\'t know is the beginning of knowing." — L',
  '"I will surpass the average with pure calculated effort." — Near',
  '"Even a Shinigami finds humans who study... unexpectedly compelling." — Ryuk',
  '"I\'ll solve equations with my right hand. I\'ll take a potato chip... and eat it." — Light Yagami',
  '"However gifted you are, you alone can\'t change the world. But you can change your grade." — L',
  '"If you use your head, you won\'t fall behind even if you take breaks." — L',
  '"Kira is childish and hates to lose. I am also childish and hate to lose. That\'s why I prepare." — L',
  '"This world is rotten with people who don\'t study. Rise above them." — Light Yagami',
  '"We killed some boredom together. Now kill this topic." — Ryuk',
  '"I put faith in my own conclusions. My conclusion: you need to study more." — Near',
  '"Humans are fascinating. Especially the ones who keep working when it\'s hard." — Ryuk',
];/* ── HARRY POTTER CHARACTERS ── */
const HP_CHARS = {
  harry: {
    name: 'HARRY POTTER', emoji: '⚡',
    color: '#c9a84c',
    quotes: [
      "It does not do to dwell on dreams and forget to live — but it DOES help to review your notes before sleeping.",
      "I'm not going to be murdered... I'm going to pass this exam. Probably. Maybe. Let's go.",
      "Hermione says to review this chapter three times. I've done it zero times. Starting now.",
      "There will be a time when we must choose between what is easy and what is right. Studying is right.",
      "I didn't become the Chosen One by procrastinating. Well. I mean. I did a bit. But eventually I did the work.",
      "Expecto Patronum! *the patronus takes the form of a finished assignment*",
      "Voldemort never studied either. Look how that turned out.",
      "You're a student, Harry. And a student does their homework.",
      "I've faced a basilisk, a dragon, and Professor Snape. You can face this textbook.",
      "The scar hasn't hurt in hours. That means Voldemort is calm. Which means NOW is the time to study.",
    ]
  },
  hermione: {
    name: 'HERMIONE GRANGER', emoji: '📚',
    color: '#c9a84c',
    quotes: [
      "I hope you've been reviewing everything we've covered so far, because there will be questions.",
      "It's LeviOsa, not LeviosA. And it's important to get the details right — in magic AND in studying.",
      "Books! And cleverness! There are more important things, yes — but books and cleverness are still quite important.",
      "When in doubt, go to the library. The answer is always in the library.",
      "I've been doing some reading and I think if you study at least 25 minutes without distraction, you retain 40% more.",
      "You could always try using your brain. It's a wonderful organ when properly exercised.",
      "No, you cannot borrow my notes. You can MAKE your own notes. That's rather the point.",
      "Working hard is important, but there is something that matters even more — believing in yourself.",
      "Fear of a name increases fear of the thing itself. Fear of an exam increases fear of the subject. Study it.",
      "I checked this out weeks ago for a bit of light reading. You should try it.",
    ]
  },
  dumbledore: {
    name: 'ALBUS DUMBLEDORE', emoji: '🔮',
    color: '#a090d0',
    quotes: [
      "It is our choices, Harry, that show what we truly are, far more than our abilities. Choose to study.",
      "Words are, in my not-so-humble opinion, our most inexhaustible source of magic. Especially in essays.",
      "Happiness can be found even in the darkest of times, if one only remembers to turn on the light — and open the book.",
      "It takes a great deal of bravery to stand up to our enemies, but a great deal more to sit down and study them.",
      "Do not pity the dead, Harry. Pity the living — especially those who waste their study hours on TikTok.",
      "Nitwit! Blubber! Oddment! Tweak! — my point being: even nonsense has structure. Your essay should too.",
      "I would trust this person with my life. But would I trust them with an open book exam? That's the real question.",
      "One can never have enough socks, nor enough study sessions. Remember that.",
      "The truth is a beautiful and terrible thing, and should therefore be treated with great caution — especially in exams.",
      "To the well-organised mind, studying is the next great adventure.",
    ]
  },
  snape: {
    name: 'PROFESSOR SNAPE', emoji: '🖤',
    color: '#8878b0',
    quotes: [
      "You are here to learn the subtle science and exact art of study. Sit. Down. And. Open. Your. Book.",
      "Obviously. *stares* You haven't reviewed chapter three. It's written all over your face.",
      "Turn to page three hundred and ninety-four. And then read it. All of it.",
      "I can teach you how to bewitch the mind, ensnare the senses, bottle fame... but first you need to concentrate.",
      "For your information, Potter — fame clearly isn't everything. Competence, however, is.",
      "*sweeps into the room* Five points from Gryffindor for procrastinating. Now open the textbook.",
      "Do you know why you failed? Because you didn't try. Not because you couldn't. Because you didn't.",
      "There will be no foolish wand-waving or silly incantations in this class. Just work. Hard. Work.",
      "You dare use my own spells against me? The Killing Curse? ...I meant the spell of procrastination. Stop it.",
      "Always. *pauses* Study. That's what 'always' means.",
    ]
  },
  ron: {
    name: 'RON WEASLEY', emoji: '♟',
    color: '#c0601a',
    quotes: [
      "Bloody hell. We have an exam TOMORROW?! Right. Okay. We can do this. Probably.",
      "Hermione, how much do you think I'd need to read to pass? ...What do you mean 'all of it'?",
      "It's not as bad as facing a giant spider. Or chess pieces that try to knock you out. This is just studying.",
      "Blimey, mate. When did we get so much homework? ...We should probably start, yeah?",
      "Mum would be furious if I failed. Right then. Opening the book. I'm doing it.",
      "I play chess, which means I think three moves ahead. Unfortunately I did not apply this to the assignment deadline.",
      "Fred and George never studied this hard. Then again, Fred and George... yeah. Let's study.",
      "If Harry can face You-Know-Who, I can face this exam. That's what I keep telling myself.",
      "It's not all about magic, is it? Sometimes you just have to sit down and do the reading.",
      "Brilliant, Hermione. As always. I'll just... do whatever you tell me. Academically speaking.",
    ]
  },
  luna: {
    name: 'LUNA LOVEGOOD', emoji: '🌙',
    color: '#a0c8e8',
    quotes: [
      "I think studying is like feeding Nargles — you have to do it consistently or they steal your knowledge.",
      "Things we lose have a way of coming back to us in the end... if we reviewed our notes properly.",
      "You're just as sane as I am. Which means you're perfectly capable of finishing this.",
      "The Rotfang Conspiracy aside, I do think regular study hours help with cognitive alignment.",
      "Most people don't notice the Wrackspurts floating around their head when they're distracted. I notice them. Close your other tabs.",
      "I've found that humming while studying keeps the Blibbering Humdingers at bay. Also it helps retention.",
      "My father says concentration is the highest form of magic available to Muggles and wizards alike.",
      "Don't worry. You'll finish in time. I've seen stranger things come together.",
      "Everyone thinks I'm odd. But I always finish my work, and somehow that's never considered strange.",
      "The Thestrals can only be seen by those who've witnessed loss. I wonder if failing an exam counts.",
    ]
  },
  mcgonagall: {
    name: 'PROF. McGONAGALL', emoji: '🐱',
    color: '#6888a8',
    quotes: [
      "Why would I go looking for someone who wants to fail my class? If he wants to, nothing I can do will stop him. But YOU are not him.",
      "I will not tolerate irresponsible study habits. The deadline is the deadline. Not a suggestion.",
      "It is the quality of one's convictions that determines success, not the number of followers — or the hours left before the exam.",
      "Have a biscuit, Potter. You look like you need it. Then get back to studying.",
      "I've never seen you study. However, I've also never seen you fail, which suggests you study when no one's watching. Do more of that.",
      "Transfiguration is among the most complex magic you will learn. So is discipline. Both require practice.",
      "Your grandmother sends her love. I told her you were working hard. Try not to make me a liar.",
      "We teachers are rather good at detecting when students haven't done the reading. Do not test me.",
      "There are some things you cannot learn from a book. But most things, you absolutely can. Open it.",
      "Five points to your house — for sitting down and actually starting. Now finish.",
    ]
  },
  neville: {
    name: 'NEVILLE LONGBOTTOM', emoji: '🌿',
    color: '#70a060',
    quotes: [
      "I'm not very good at this, but I'm going to do it anyway. That counts for something.",
      "People keep expecting me to fail. I've decided to prove them wrong. Starting with this study session.",
      "Gran says I'm not talented. But I showed up every single time, and that's how I pulled the sword out of the hat.",
      "I may not be Harry Potter. But I faced Voldemort too. An exam is nothing.",
      "You know what I've learned? If you just keep going — even badly — you eventually get better.",
      "I used to forget everything. Now I write it down, review it, and forget it slightly less. Progress.",
      "It's okay if it's hard. It was hard for me too. Just keep going.",
      "Herbology taught me that growth is slow, invisible, and then suddenly — it's everywhere. Study works the same way.",
      "I never thought I'd amount to anything. Then I kept trying anyway. And here we are.",
      "Trevor keeps running away from me. But I never stop going after him. Apply that to your studies.",
    ]
  },
};
const HP_KEYS = Object.keys(HP_CHARS);

/* ── HARRY POTTER QUOTES for breathing strip ── */
const HP_QUOTES = [
  '"It does not do to dwell on dreams and forget to live." — Dumbledore',
  '"It is our choices that show what we truly are." — Dumbledore',
  '"Words are our most inexhaustible source of magic." — Dumbledore',
  '"Books! And cleverness!" — Hermione Granger',
  '"When in doubt, go to the library." — Hermione Granger',
  '"Happiness can be found even in the darkest times, if one only remembers to turn on the light." — Dumbledore',
  '"It takes a great deal of bravery to stand up to our enemies." — Dumbledore',
  '"Do not pity the dead. Pity the living." — Dumbledore',
  '"Working hard is important, but there is something that matters even more: believing in yourself." — Hermione',
  '"Fear of a name increases fear of the thing itself." — Hermione',
  '"Turn to page three hundred and ninety-four." — Snape',
  '"You are here to learn the subtle science and exact art." — Snape',
  '"Always." — Snape',
  '"I\'m not very good at this, but I\'m going to do it anyway." — Neville',
  '"To the well-organised mind, death is but the next great adventure." — Dumbledore',
  '"Things we lose have a way of coming back to us." — Luna Lovegood',
  '"The truth is a beautiful and terrible thing." — Dumbledore',
  '"You\'re just as sane as I am." — Luna Lovegood',
  '"Growth is slow, invisible, and then suddenly — it\'s everywhere." — Neville, probably',
  '"We teachers are good at detecting when students haven\'t done the reading." — McGonagall',
];

/* ── HARRY POTTER POPUP TRIGGERS ── */
const HP_POPUP_TRIGGERS = {
  timerStart: ['harry', 'hermione', 'mcgonagall', 'snape', 'dumbledore'],
  timerBreak: ['ron', 'luna', 'neville', 'dumbledore', 'hermione'],
  taskDone:   ['hermione', 'dumbledore', 'neville', 'mcgonagall', 'harry'],
  idle:       ['snape', 'ron', 'luna', 'neville', 'hermione', 'harry', 'dumbledore'],
  sessionLog: ['dumbledore', 'hermione', 'mcgonagall', 'neville', 'harry'],
  random:     HP_KEYS,
};

/* ── HARRY POTTER RANKS (replacing DS Breathing Ranks) ── */
const HP_RANKS = [
  { min:0,    name:'First Year Student',        emoji:'📜', desc:'Welcome to Hogwarts. Your journey begins.', class:'Muggle-born Potential' },
  { min:60,   name:'Second Year',               emoji:'🦉', desc:'You\'ve begun to find your footing.', class:'Accio Focus!' },
  { min:180,  name:'Third Year',                emoji:'🔭', desc:'Divination says: good things ahead.', class:'Lumos Studium' },
  { min:360,  name:'Fourth Year — Triwizard',   emoji:'🏆', desc:'You\'ve entered the tournament. Show your worth.', class:'Wingardium Studyosa' },
  { min:600,  name:'Fifth Year — O.W.L.s',      emoji:'📋', desc:'Ordinary Wizarding Level — anything but ordinary.', class:'Expecto Gradeum' },
  { min:900,  name:'Sixth Year — Chosen One',   emoji:'⚡', desc:'Dumbledore trusts you. Don\'t let him down.', class:'Sectumsempra (of Procrastination)' },
  { min:1200, name:'Seventh Year — N.E.W.T.s',  emoji:'🌟', desc:'Nastily Exhausting Wizarding Tests. You\'re ready.', class:'Auror Candidate' },
  { min:1800, name:'Prefect',                   emoji:'🏅', desc:'You lead by example. Others look up to you.', class:'Finite Incantatem Laziness' },
  { min:2400, name:'Head Boy / Head Girl',      emoji:'💎', desc:'The highest honour a student can earn.', class:'Patronus of Discipline' },
  { min:3000, name:'⚡ HEADMASTER / HEADMISTRESS', emoji:'🔮', desc:'Dumbledore himself would be proud.', class:'Master of the Elder Wand of Knowledge' },
];

/* ── BREAKING BAD CHARACTERS ── */
const BB_CHARS = {
  walter: {
    name: 'WALTER WHITE', emoji: '🎩',
    color: '#c8b820',
    quotes: [
      "I am the one who knocks. On the door of knowledge. Now open it.",
      "Say my name. ...You're the one who studies. That's right.",
      "I did it for me. I liked it. I was good at it. And I was really... I was alive. That's what studying feels like.",
      "We're done when I say we're done. This session has 12 more minutes.",
      "Tread lightly. Over your textbook. With a highlighter.",
      "Chemistry is the study of change. So is every subject. Embrace the change.",
      "You clearly don't know who you're talking to. I am the one who passes.",
      "Stay out of my territory. My territory is the top of the class. Work for your own.",
      "I have a plan. The plan is to study. Execute the plan.",
      "Congratulations. You're a student. Act like one.",
    ]
  },
  jesse: {
    name: 'JESSE PINKMAN', emoji: '🧪',
    color: '#88c840',
    quotes: [
      "Yeah, science! ...I mean, yeah, studying! Let's go Mr. White!",
      "Yo, I'm not gonna lie, this is actually kinda making sense now. Keep going.",
      "I learned it from you, okay? I learned it from watching you study!",
      "This is not meth. This is knowledge. And knowledge is... actually pretty tight.",
      "B*tch, open the book.",
      "You know what? I get it now. If you just actually sit down and do it... it works.",
      "I'm the bad guy? I'm the one who opened their notes. What does that make everyone else?",
      "We make the best product. The best grade. No shortcuts. Mr. White said so.",
      "Yo, I been thinking... what if we just... studied more? Like, actually studied?",
      "I can't keep running. From deadlines. From exams. I gotta face it.",
    ]
  },
  mike: {
    name: 'MIKE EHRMANTRAUT', emoji: '🔫',
    color: '#7898b0',
    quotes: [
      "No more half measures. Either you study or you don't. Choose.",
      "I've been in this game a long time. Procrastination always loses.",
      "You had one job. One. Study. How hard is that?",
      "Everybody sounds like Hamlet when they're making excuses. Just do it.",
      "I do my job. I study. That's it. That's the whole thing.",
      "The way I see it, you've got two options. Study now. Or study later and panic. Pick one.",
      "Don't make the same mistake twice. You already wasted yesterday. Not today.",
      "I am a professional. Professionals prepare. Prepare.",
      "There are two kinds of students: those who do the work, and those I feel sorry for.",
      "Next time you think about skipping a session — don't.",
    ]
  },
  saul: {
    name: 'SAUL GOODMAN', emoji: '📞',
    color: '#e8a020',
    quotes: [
      "Better call Saul! ...for academic advice. Which is: study now, panic later — it's basic time management!",
      "I know a guy. Who knows a guy. Who passed every exam by actually reading the material. Revolutionary.",
      "Don't drink and derive. That's free advice. You're welcome.",
      "Is what you're doing legal? ...Academically? Good. Then do MORE of it.",
      "You want a good outcome? You gotta put in the work. That's not the law, that's just life.",
      "I'm your lawyer. My legal advice: stop procrastinating. You can't sue a deadline.",
      "Listen, in my experience, the students who succeed are the ones who show up. Show up.",
      "It's all good, man. It's all good — as long as you've done the reading.",
      "Every empire, no matter how glorious, was built one brick at a time. One page at a time.",
      "I work very hard for my clients. Be your own client. Work hard for yourself.",
    ]
  },
  gus: {
    name: 'GUS FRING', emoji: '🍗',
    color: '#d4a840',
    quotes: [
      "I hide in plain sight. Just like the answer to this question — it was in the textbook the whole time.",
      "A man provides. And he does it quietly. With discipline. With focus. Without excuses.",
      "Don't make the same mistake twice. Review your errors. Learn from them. Then do not repeat them.",
      "I learned how to build something from nothing. You can learn how to pass this exam.",
      "Excellence. That is the standard. Not good enough. Not almost. Excellence.",
      "The Chicken Man does not rush. The Chicken Man is precise. Be the Chicken Man of studying.",
      "What does a man do, Walter? A man provides. Provide yourself with knowledge.",
      "I am not in danger. I am the danger. And the danger is not studying enough.",
      "Everything I've built, I built through patience and precision. Apply that to your notes.",
      "Run. *stares* I'm kidding. Sit down. Study.",
    ]
  },
  hank: {
    name: 'HANK SCHRADER', emoji: '🪨',
    color: '#b08040',
    quotes: [
      "You know what this is? It's minerals, Marie. And minerals are SCIENCE. Science is STUDYING. DO IT.",
      "These are rocks. I collect them. I also collect knowledge. Start collecting.",
      "I'm an open book, babe. My notes are literally an open book. Take the hint.",
      "I know what I know. And I know that you haven't studied enough. Get on it.",
      "Junior, finish your breakfast. And then finish your homework. In that order.",
      "I may not be the smartest guy in the room. But I show up every single day. That counts.",
      "ASAC Schrader, DEA. I'm arresting your procrastination. You're done.",
      "You think I don't see what's going on? You've been avoiding this chapter for three days.",
      "Minerals don't apologize for being what they are. You don't apologize for studying hard. Own it.",
      "I'm gonna go get some studying done. You should too. C'mon.",
    ]
  },
};
const BB_KEYS = Object.keys(BB_CHARS);

/* ── BREAKING BAD QUOTES for breathing strip ── */
const BB_QUOTES = [
  '"I am the one who knocks. On the door of knowledge." — W. White',
  '"Say my name. You\'re the one who studies." — Heisenberg',
  '"Yeah, science!" — Jesse Pinkman',
  '"No more half measures. Either you study or you don\'t." — Mike',
  '"A man provides. Quietly. With discipline." — Gus Fring',
  '"Excellence. That is the standard." — Gus Fring',
  '"Chemistry is the study of change. Embrace the change." — W. White',
  '"I did it for me. I liked it. I was good at it." — Walter White',
  '"Don\'t make the same mistake twice. Review your errors." — Gus Fring',
  '"I am not in danger. I am the danger — of not studying." — Heisenberg',
  '"Better call Saul! ...for academic advice." — Saul Goodman',
  '"Every empire was built one brick at a time. One page at a time." — Saul',
  '"I\'ve been in this game a long time. Procrastination always loses." — Mike',
  '"You know what this is? It\'s SCIENCE. STUDY IT." — Hank Schrader',
  '"I show up every single day. That counts." — Hank',
  '"The way I see it: study now, or panic later." — Mike Ehrmantraut',
  '"We make the best product. No shortcuts." — W. White',
  '"I work very hard. Be your own client. Work hard for yourself." — Saul',
  '"What does a man do? A man provides himself with knowledge." — Gus',
  '"Tread lightly. Over your textbook. With a highlighter." — Heisenberg',
];

/* ── BREAKING BAD POPUP TRIGGERS ── */
const BB_POPUP_TRIGGERS = {
  timerStart: ['walter', 'gus', 'mike', 'jesse', 'saul'],
  timerBreak: ['jesse', 'saul', 'hank', 'mike'],
  taskDone:   ['walter', 'gus', 'mike', 'hank', 'jesse'],
  idle:       ['mike', 'saul', 'gus', 'walter', 'hank', 'jesse'],
  sessionLog: ['gus', 'walter', 'mike', 'saul', 'hank'],
  random:     BB_KEYS,
};

/* ── BREAKING BAD RANKS ── */
const BB_RANKS = [
  { min:0,    name:'High School Teacher',   emoji:'👨‍🏫', desc:'Mr. White before it all began. Study hard — legally.' },
  { min:60,   name:'First Cook',            emoji:'🧪', desc:'You\'ve started. The lab awaits.' },
  { min:180,  name:'Street Level',          emoji:'🚗', desc:'Jesse is impressed. Somewhat.' },
  { min:360,  name:'Distribution Manager', emoji:'📦', desc:'Mike has noticed your consistency.' },
  { min:600,  name:'Regional Operator',    emoji:'🗺', desc:'Gus Fring would consider hiring you.' },
  { min:900,  name:'Los Pollos Manager',   emoji:'🍗', desc:'Punctual. Precise. Professional.' },
  { min:1200, name:'Cartel Associate',     emoji:'💼', desc:'You operate at a different level now.' },
  { min:1800, name:'The Cook',             emoji:'🧫', desc:'Blue Sky quality. Consistent. Reliable.' },
  { min:2400, name:'Heisenberg',           emoji:'🎩', desc:'Say your name. You know what it is.' },
  { min:3000, name:'⚗ I AM THE DANGER',   emoji:'⚗', desc:'You built an empire. One study session at a time.' },
];

/* Context-aware popup triggers */
const POPUP_TRIGGERS = {
  timerStart: ['rengoku', 'tanjiro', 'inosuke', 'tengen', 'muichiro'],
  timerBreak: ['zenitsu', 'nezuko', 'tengen', 'shinobu', 'gyomei'],
  taskDone:   ['rengoku', 'tanjiro', 'tengen', 'gyomei', 'muichiro', 'shinobu'],
  idle:       ['zenitsu', 'inosuke', 'shinobu', 'muichiro', 'nezuko', 'rengoku', 'tanjiro', 'gyomei', 'tengen'],
  sessionLog: ['gyomei', 'tanjiro', 'nezuko', 'shinobu', 'rengoku'],
  random:     CHAR_KEYS,
};

const DORA_POPUP_TRIGGERS = {
  timerStart: ['doraemon', 'gian', 'shizuka', 'suneo', 'nobita'],
  timerBreak: ['nobita', 'shizuka', 'doraemon', 'suneo'],
  taskDone:   ['doraemon', 'shizuka', 'suneo', 'gian', 'nobita'],
  idle:       ['nobita', 'gian', 'doraemon', 'suneo', 'shizuka'],
  sessionLog: ['doraemon', 'shizuka', 'nobita', 'suneo', 'gian'],
  random:     DORA_KEYS,
};

const DN_POPUP_TRIGGERS = {
  timerStart: ['light', 'l', 'near', 'misa', 'ryuk'],
  timerBreak: ['ryuk', 'misa', 'l', 'near'],
  taskDone:   ['light', 'near', 'l', 'ryuk', 'misa'],
  idle:       ['ryuk', 'light', 'near', 'misa', 'l'],
  sessionLog: ['light', 'l', 'misa', 'near', 'ryuk'],
  random:     DN_KEYS,
};

let popupTimeout = null;
let lastPopupTime = 0;

function showCharPopup(trigger = 'random') {
  const now = Date.now();
  if (now - lastPopupTime < 8000) return; // 8s min between popups
  lastPopupTime = now;

  const currentTheme = localStorage.getItem('kimetsuTheme') || 'dark';
  const mode = THEME_CONFIG[currentTheme]?.mode || 'kimetsu';

  let charData, triggers, charKey, char, quote;

  if (mode === 'doraemon') {
    triggers = DORA_POPUP_TRIGGERS[trigger] || DORA_KEYS;
    charKey = triggers[Math.floor(Math.random() * triggers.length)];
    char = DORA_CHARS[charKey];
  } else if (mode === 'deathnote') {
    triggers = DN_POPUP_TRIGGERS[trigger] || DN_KEYS;
    charKey = triggers[Math.floor(Math.random() * triggers.length)];
    char = DN_CHARS[charKey];
  } else if (mode === 'harrypotter') {
    triggers = HP_POPUP_TRIGGERS[trigger] || HP_KEYS;
    charKey = triggers[Math.floor(Math.random() * triggers.length)];
    char = HP_CHARS[charKey];
  } else if (mode === 'breakingbad') {
    triggers = BB_POPUP_TRIGGERS[trigger] || BB_KEYS;
    charKey = triggers[Math.floor(Math.random() * triggers.length)];
    char = BB_CHARS[charKey];
  } else {

    const chars = POPUP_TRIGGERS[trigger] || CHAR_KEYS;
    charKey = chars[Math.floor(Math.random() * chars.length)];
    char = DS_CHARS[charKey];
  }

  quote = char.quotes[Math.floor(Math.random() * char.quotes.length)];

  const popup = document.getElementById('charPopup');
  document.getElementById('charAvatar').textContent = char.emoji;
  document.getElementById('charName').textContent = char.name;
  document.getElementById('charName').style.color = char.color;
  document.getElementById('charText').textContent = quote;

  popup.classList.add('show');

  if (popupTimeout) clearTimeout(popupTimeout);
  popupTimeout = setTimeout(() => closeCharPopup(), 7000);
}

function closeCharPopup() {
  document.getElementById('charPopup').classList.remove('show');
}

/* ═══════════════════════════════════════════════════════════════
   DS QUOTES for breathing strip
═══════════════════════════════════════════════════════════════ */
const DS_QUOTES = [
  '"Set your heart ablaze!" — Rengoku',
  '"No matter how many times I get knocked down, I will stand back up." — Tanjiro',
  '"I will not retreat. I will not give up." — Tanjiro',
  '"Even if my legs give out, I will fight with my arms." — Tanjiro',
  '"I have to be worth more than my pain." — Tanjiro',
  '"It\'s all about training. Total concentration breathing... every second." — Tanjiro',
  '"If you focus on your breathing, you can do anything." — Urokodaki',
  '"The weak have no rights. So become strong." — Giyu Tomioka',
  '"I hate myself more than anyone. But I want to change." — Zenitsu',
  '"Don\'t ever give others the chance to look down on you!" — Inosuke',
  '"Breathing decides everything." — Demon Slayer Corps motto',
  '"Become the sharpest blade you can be." — Sakonji Urokodaki',
  '"Consistency over intensity — that is Water Breathing." — Giyu Tomioka',
  '"UMAI!! This study session is delicious!!" — Rengoku, probably',
  '"Humans can surpass their limits — through training." — Tanjiro',
  '"A single focused session beats ten distracted ones." — Kimetsu Academy Proverb',
  '"Total Concentration Breathing — applied to studying — is called Deep Work." — Urokodaki',
];

let quoteIdx = Math.floor(Math.random() * DS_QUOTES.length);

/* ═══════════════════════════════════════════════════════════════
   BREATHING STYLE RANKS (gamification)
═══════════════════════════════════════════════════════════════ */
const DS_RANKS = [
  { min: 0,      name: 'Mizunoto — Lowest Rank',        emoji: '🥉', desc: 'Every Hashira started here. The path is long. Begin.', breathing: 'Water Breathing: First Form' },
  { min: 2160,   name: 'Mizunoe',                        emoji: '🗡', desc: '36 hours in. You\'re no longer a beginner.', breathing: 'Water Breathing: Second Form — Water Wheel' },
  { min: 6480,   name: 'Kanoto',                         emoji: '⚔', desc: '108 hours. Your blade is genuinely sharpening.', breathing: 'Flame Breathing: First Form' },
  { min: 12960,  name: 'Kanoe',                          emoji: '🔥', desc: '216 hours. Rengoku would be proud. SET YOUR HEART ABLAZE!', breathing: 'Flame Breathing: Third Form — Blazing Universe' },
  { min: 21600,  name: 'Tsuchinoto',                     emoji: '⚡', desc: '360 hours. Zenitsu gasps. You\'re actually consistent.', breathing: 'Thunder Breathing: First Form — Thunderclap & Flash' },
  { min: 32400,  name: 'Tsuchinoe',                      emoji: '🌪', desc: '540 hours. Wind Hashira energy. Sanemi is impressed.', breathing: 'Wind Breathing: Fourth Form — Rising Dust Storm' },
  { min: 43200,  name: 'Kinoto',                         emoji: '🌫', desc: '720 hours. Muichiro stares at you blankly. That means respect.', breathing: 'Mist Breathing: Seventh Form — Obscuring Clouds' },
  { min: 64800,  name: 'Kinoe — Upper Rank',             emoji: '💎', desc: '1080 hours. FLAMBOYANT! Tengen approves wholeheartedly!', breathing: 'Sound Breathing: Fourth Form — Constant Resounding Slashes' },
  { min: 86400,  name: 'Tsuguko — Hashira Candidate',   emoji: '🌸', desc: '1440 hours. You could become a Hashira. Shinobu smiles. Dangerously.', breathing: 'Insect Breathing: Dance of the Bee Sting' },
  { min: 108000, name: '🏯 HASHIRA — Pillar of the Corps', emoji: '☀️', desc: '1800 hours. SUN BREATHING ACHIEVED. Yoriichi\'s tears fall.', breathing: 'Hinokami Kagura — Dance of the Fire God' },
];

function getPlayerRank(totalMinutes) {
  let rank = DS_RANKS[0];
  for (const r of DS_RANKS) {
    if (totalMinutes >= r.min) rank = r;
  }
  return rank;
}

/* ═══════════════════════════════════════════════════════════════
   PETALS ANIMATION
═══════════════════════════════════════════════════════════════ */
function spawnPetals() {
  const container = document.getElementById('petals');
  const petalChars = ['🌸','✿','❀','꽃','⚘'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petalChars[Math.floor(Math.random()*petalChars.length)];
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = (8 + Math.random()*12) + 's';
    p.style.animationDelay = (Math.random()*20) + 's';
    p.style.fontSize = (8 + Math.random()*6) + 'px';
    p.style.opacity = '0';
    container.appendChild(p);
  }
}
spawnPetals();

// Zen ring sync - safe stub until zen JS loads
if(typeof _syncZenRing === 'undefined') window._syncZenRing = function(){};

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   SUPABASE — AUTH & CLOUD STORAGE
═══════════════════════════════════════════════════════════════ */
const SUPA_URL = 'https://almkvgvobvjenkewymur.supabase.co';
const SUPA_KEY = 'sb_publishable_iSYH6-UkrRW6-cbgYmCnjA_XV9gy3J_';
if(typeof supabase==='undefined'){window.supabase=window.__supabaseMock;}
const _supa = supabase.createClient(SUPA_URL, SUPA_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

let _currentUser = null;
let _syncTimer = null;
let _pendingSync = false;

// ── AUTH UI helpers ──────────────────────────────────────────
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t,i)=>t.classList.toggle('active', i===(tab==='login'?0:1)));
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
  document.getElementById(tab==='login'?'loginForm':'signupForm').classList.add('active');
}
function setAuthLoading(id, on) {
  document.getElementById(id+'Btn').textContent = on ? (id==='login'?'Entering dojo…':'Joining corps…') : (id==='login'?'⚔ Begin Training':'🌸 Join the Corps');
  document.getElementById(id+'Form').classList.toggle('auth-loading', on);
}
function showAuthError(form, msg) {
  const el = document.getElementById(form+'Error');
  el.textContent = msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 5000);
}
function showAuthSuccessMsg(form, msg) {
  const el = document.getElementById(form+'Success');
  el.textContent = msg; el.classList.add('show');
}

async function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  if (!email || !pass) { showAuthError('login','Enter your email and password.'); return; }
  setAuthLoading('login', true);
  const { data, error } = await _supa.auth.signInWithPassword({ email, password: pass });
  setAuthLoading('login', false);
  if (error) { showAuthError('login', error.message); return; }
  // onAuthStateChange will handle rest
}

async function doSignup() {
  const name     = document.getElementById('signupName').value.trim();
  const username = document.getElementById('signupUsername').value.trim().toLowerCase();
  const email    = document.getElementById('signupEmail').value.trim();
  const pass     = document.getElementById('signupPass').value;
  if (!name)     { showAuthError('signup','Enter your nickname.'); return; }
  if (!username) { showAuthError('signup','Enter a username (letters, numbers, _ only).'); return; }
  if (username.length < 3) { showAuthError('signup','Username must be at least 3 characters.'); return; }
  if (!email || !pass) { showAuthError('signup','Enter email and password.'); return; }
  if (pass.length < 6) { showAuthError('signup','Password must be at least 6 characters.'); return; }

  // Check username uniqueness
  setAuthLoading('signup', true);
  const { data: existing } = await _supa.from('user_profiles').select('id').eq('username', username).maybeSingle();
  if (existing) { setAuthLoading('signup', false); showAuthError('signup','That username is taken. Try another.'); return; }

  const { data, error } = await _supa.auth.signUp({
    email, password: pass,
    options: { data: { display_name: name, username } }
  });
  setAuthLoading('signup', false);
  if (error) { showAuthError('signup', error.message); return; }

  // Store pending profile — onUserLoggedIn inserts it once session is confirmed (RLS-safe)
  if (data.user) {
    _pendingProfile = { id: data.user.id, username, nickname: name };
  }

  if (data.session) {
    // Session active immediately — onAuthStateChange fires and handles profile insert
  } else {
    showAuthSuccessMsg('signup', '✅ Account created! Check your inbox to confirm your email.');
  }
}

async function showForgot() {
  const email = prompt('Enter your email to reset password:');
  if (!email) return;
  const { error } = await _supa.auth.resetPasswordForEmail(email);
  if (error) { notify('Error: ' + error.message, 'info'); }
  else { notify('🌸 Password reset email sent!', 'success'); }
}

async function confirmSignOut() {
  if (!confirm('Sign out and return to login?')) return;
  await _supa.auth.signOut();
  // onAuthStateChange will handle rest
}

let _myProfile = { username: '', nickname: '' };
let _pendingProfile = null;

function onUserLoggedIn(user) {
  _currentUser = user;
  document.getElementById('userChip').style.display = 'flex';
  document.getElementById('signOutBtn').style.display = '';
  document.getElementById('guestLoginBtn').style.display = 'none';
  document.getElementById('authOverlay').classList.add('hidden');
  document.getElementById('chatBubble').style.display = 'flex';
  setSyncStatus('syncing','Loading…');

  // If signup stored a pending profile, insert it now (session is active, RLS passes)
  const profilePromise = _pendingProfile
    ? _supa.from('user_profiles').upsert(_pendingProfile).then(({ error }) => {
        if (error) console.warn('Profile insert error:', error.message);
        const p = _pendingProfile; _pendingProfile = null;
        return { data: p };
      })
    : _supa.from('user_profiles').select('username,nickname').eq('id', user.id).maybeSingle();

  profilePromise.then(({ data }) => {
    if (data) {
      _myProfile = { username: data.username || '', nickname: data.nickname || user.user_metadata?.display_name || 'Slayer' };
    } else {
      // No profile row — auto-create from metadata
      const uname = user.user_metadata?.username || user.email?.split('@')[0] || '';
      const nick  = user.user_metadata?.display_name || 'Slayer';
      _myProfile = { username: uname, nickname: nick };
      if (uname) _supa.from('user_profiles').upsert({ id: user.id, username: uname, nickname: nick });
    }
    const label = _myProfile.nickname || _myProfile.username || 'Slayer';
    document.getElementById('userLabel').textContent = '@' + (_myProfile.username || label);
    document.getElementById('userAvatar').textContent = label.charAt(0).toUpperCase();
  });

  loadStateCloud().then(()=>{
    refreshAll();
    checkCrash();
    checkRoutineAssignments();
    loadHabitsCloud();
    loadRecapIfValid();
    initRecapSettings();
    setInterval(checkRecapTimer, 60000); // check every minute
    loadTasksCloud();
    if(pd().lastSubject) setTimeout(()=>{ const s=document.getElementById('curSubject'); if(s) s.value=pd().lastSubject; },100);
    setTimeout(()=>showCharPopup('random'), 3000);
    initChat();
    if(typeof initSquads==='function') initSquads();
  });
}

function onUserLoggedOut() {
  _currentUser = null;
  _myProfile = { username: '', nickname: '' };
  document.getElementById('userChip').style.display = 'none';
  document.getElementById('signOutBtn').style.display = 'none';
  document.getElementById('guestLoginBtn').style.display = '';
  document.getElementById('chatBubble').style.display = 'none';
  document.getElementById('chatPanel').classList.remove('open');
  document.getElementById('chatBubble').classList.remove('open');
  showChatLoggedInUI(false);
  setSyncStatus('', 'Offline');
  destroyChat();
  loadState();
  refreshAll();
}

function openAuthOverlay() {
  document.getElementById('authOverlay').classList.remove('hidden');
}
function closeAuthOverlay() {
  document.getElementById('authOverlay').classList.add('hidden');
}

// ── SYNC STATUS ──────────────────────────────────────────────
function setSyncStatus(cls, label) {
  const el = document.getElementById('syncStatus');
  el.className = cls ? cls : '';
  document.getElementById('syncLabel').textContent = label;
}

// ── CLOUD SAVE / LOAD ────────────────────────────────────────
async function saveStateCloud() {
  if (!_currentUser) return;
  setSyncStatus('syncing','Saving…');
  try {
    const payload = { user_id: _currentUser.id, user_data: { profiles, currentProfile } };
    const { error } = await _supa.from('user_data').upsert(payload, { onConflict: 'user_id' });
    if (error) throw error;
    setSyncStatus('synced','Saved ✓');
    setTimeout(()=>setSyncStatus('','Cloud'), 3000);
  } catch(e) {
    setSyncStatus('error','Sync error');
    console.warn('Cloud save failed:', e.message);
  }
}

async function loadStateCloud() {
  if (!_currentUser) { loadState(); return; }
  setSyncStatus('syncing','Loading…');
  try {
    const { data, error } = await _supa.from('user_data').select('user_data').eq('user_id', _currentUser.id).maybeSingle();
    if (error) throw error;
    if (data && data.user_data) {
      const d = data.user_data;
      profiles = d.profiles || { Default: blankProfile() };
      currentProfile = d.currentProfile || 'Default';
      if (!profiles[currentProfile]) profiles[currentProfile] = blankProfile();
      // Also update local cache
      localStorage.setItem('kimetsu_v3', JSON.stringify({ profiles, currentProfile }));
      setSyncStatus('synced','Loaded ✓');
      setTimeout(()=>setSyncStatus('','Cloud'), 2000);
    } else {
      // New user — try loading from local storage as seed
      loadState();
      setSyncStatus('synced','New account');
      setTimeout(()=>setSyncStatus('','Cloud'), 2000);
    }
    const saved = localStorage.getItem('kimetsuTheme')||'dark';
    setTheme(saved); themeIdx=themes.indexOf(saved); if(themeIdx<0) themeIdx=0;
  } catch(e) {
    // Fallback to localStorage
    loadState();
    setSyncStatus('error','Using local cache');
    console.warn('Cloud load failed:', e.message);
  }
}

// Debounced cloud save — waits 1.5s after last saveState call
function debouncedCloudSave() {
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(saveStateCloud, 1500);
}

// ── SUPABASE AUTH LISTENER ───────────────────────────────────
_supa.auth.onAuthStateChange((event, session) => {
  if (session && session.user) {
    onUserLoggedIn(session.user);
  } else {
    onUserLoggedOut();
  }
});

let profiles = {};
let currentProfile = 'Default';

function pd() { return profiles[currentProfile]; }

function blankProfile() {
  return {
    sessions: [], tasks: [], subjects: [], exams: [], links: [], notes: [],
    goals: { daily: 120, weekly: 600 },
    settings: { customFocus: 45, customBreak: 10 },
    streak: 0, lastStudyDate: null
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem('kimetsu_v3');
    if (raw) {
      const d = JSON.parse(raw);
      profiles = d.profiles || { Default: blankProfile() };
      currentProfile = d.currentProfile || 'Default';
      if (!profiles[currentProfile]) profiles[currentProfile] = blankProfile();
    } else {
      profiles = { Default: blankProfile() };
    }
  } catch(e) { profiles = { Default: blankProfile() }; }
}

function saveState() {
  try { localStorage.setItem('kimetsu_v3', JSON.stringify({ profiles, currentProfile })); } catch(e) {}
  if (_currentUser) debouncedCloudSave();
}

/* Crash recovery */
let crashData = null;
function saveCrash() {
  if (!tmr.running) return;
  const d = { subject:document.getElementById('curSubject').value, topic:document.getElementById('curTopic').value,
    type:document.getElementById('curType').value, startTime:tmr.sessionStart?tmr.sessionStart.toISOString():new Date().toISOString(),
    elapsed:tmr.elapsed, profile:currentProfile };
  localStorage.setItem('kimetsu_crash', JSON.stringify(d));
}
function checkCrash() {
  const raw = localStorage.getItem('kimetsu_crash');
  if (!raw) return;
  try { crashData = JSON.parse(raw); document.getElementById('recoveryBanner').style.display = 'flex'; } catch(e) {}
}
function restoreCrash() {
  if (!crashData) return;
  const mins = Math.floor(crashData.elapsed / 60);
  if (mins < 1) { dismissCrash(); return; }
  pendS.durationMinutes = mins; pendS.subject = crashData.subject; pendS.topic = crashData.topic;
  pendS.type = crashData.type; pendS.startTime = crashData.startTime;
  document.getElementById('sm_subject').value = crashData.subject || '';
  document.getElementById('sm_topic').value = crashData.topic || '';
  openModal('sessionModal'); dismissCrash();
}
function dismissCrash() {
  localStorage.removeItem('kimetsu_crash');
  document.getElementById('recoveryBanner').style.display = 'none';
  crashData = null;
}
setInterval(saveCrash, 30000);
window.addEventListener('beforeunload', saveCrash);

/* ═══════════════════════════════════════════════════════════════
   PROFILES
═══════════════════════════════════════════════════════════════ */
function renderProfileSelect() {
  const sel = document.getElementById('profileSelect');
  if (!sel) return; // profile bar removed from UI
  sel.innerHTML = Object.keys(profiles).map(p =>
    `<option value="${esc(p)}" ${p===currentProfile?'selected':''}>${esc(p)}</option>`).join('');
}
function switchProfile(name) {
  if (!profiles[name]) return;
  currentProfile = name; saveState(); refreshAll();
  notify(`Switched to "${name}" — FLAMBOYANT!`, 'info');
}
function saveProfile() {
  const name = document.getElementById('np_name').value.trim();
  if (!name) return;
  if (!profiles[name]) profiles[name] = blankProfile();
  currentProfile = name; saveState(); closeModal('addProfileModal');
  renderProfileSelect(); refreshAll();
  notify(`Profile "${name}" created! Your journey begins!`, 'success');
}

/* ═══════════════════════════════════════════════════════════════
   TIMER
═══════════════════════════════════════════════════════════════ */
let tmr = { mode:'p25', phase:'focus', running:false, paused:false, elapsed:0, total:25*60, interval:null, sessionStart:null, pomoCount:0 };
let pendS = { focusRating:3, energyRating:3 };
let mlRatings = { focus:3, energy:3 };
const MODES = { p25:{focus:25,brk:5}, p50:{focus:50,brk:10} };

function setMode(mode, btn) {
  if (tmr.running) return;
  tmr.mode = mode; tmr.phase = 'focus'; tmr.elapsed = 0;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Show/hide custom inputs
  const customRow = document.getElementById('customTimerRow');
  if (customRow) {
    customRow.style.display = mode === 'custom' ? 'flex' : 'none';
    if (mode === 'custom') {
      // Pre-fill from saved settings
      const f = pd().settings.customFocus || 45;
      const b2 = pd().settings.customBreak || 10;
      document.getElementById('customFocusInput').value = f;
      document.getElementById('customBreakInput').value = b2;
    }
  }

  if (mode === 'sw') { tmr.total = Infinity; updDisp(0); setPhaseLabel('TOTAL CONCENTRATION — STOPWATCH'); }
  else {
    const mins = mode === 'custom' ? (pd().settings._routineDuration || pd().settings.customFocus||45) : MODES[mode].focus;
    pd().settings._routineDuration = null; // clear after use
    tmr.total = mins * 60; updDisp(0); setPhaseLabel('TOTAL CONCENTRATION');
  }
  updBar(); renderPomoDots();
}

function applyCustomTimes() {
  if (tmr.running) return;
  const f = Math.max(1, parseInt(document.getElementById('customFocusInput').value) || 45);
  const b = Math.max(1, parseInt(document.getElementById('customBreakInput').value) || 10);
  pd().settings.customFocus = f;
  pd().settings.customBreak = b;
  saveState();
  tmr.total = f * 60;
  tmr.elapsed = 0;
  updDisp(0); updBar();
}

function setPhaseLabel(t) {
  document.getElementById('timerPhase').textContent = t;
  document.getElementById('zenPhase').textContent = t;
  const pb = document.getElementById('zenPhaseB'); if(pb) pb.textContent = t;
  const pc = document.getElementById('zenPhaseCLabel'); if(pc) pc.textContent = t;
}

function updDisp(elapsed) {
  const rem = tmr.total === Infinity ? elapsed : Math.max(0, tmr.total - elapsed);
  const t = `${String(Math.floor(rem/60)).padStart(2,'0')}:${String(rem%60).padStart(2,'0')}`;
  document.getElementById('timerDisp').textContent = t;
  document.getElementById('zenTimer').textContent = t;
  const tb = document.getElementById('zenTimerB'); if(tb) tb.textContent = t;
  const tc = document.getElementById('zenTimerC'); if(tc) tc.textContent = t;
}

function updBar() {
  const pct = tmr.total === Infinity ? 100 : Math.max(0, 100*(1 - tmr.elapsed/tmr.total));
  document.getElementById('timerBar').style.width = pct + '%';
  document.getElementById('zenBar').style.width = pct + '%';
  const zenBarB = document.getElementById('zenBarB'); if(zenBarB) zenBarB.style.width = pct + '%';
  _syncZenRing();
}

function renderPomoDots() {
  const el = document.getElementById('pomoDots');
  if (tmr.mode==='sw'||tmr.mode==='custom') { el.innerHTML=''; return; }
  el.innerHTML = Array.from({length:4},(_,i) => {
    let cls = 'pomo-dot';
    if (i < tmr.pomoCount) cls += ' done';
    else if (i === tmr.pomoCount && tmr.phase==='focus') cls += ' current';
    return `<div class="${cls}" title="Concentration #${i+1}"></div>`;
  }).join('');
}

function toggleTimer() {
  if (!tmr.running) {
    tmr.running = true; tmr.paused = false;
    tmr.sessionStart = new Date();
    if(typeof onTimerStart==='function') onTimerStart();
    document.getElementById('startBtn').textContent = '⏸ Pause';
    document.getElementById('zenIcon').textContent = '⏸ Pause';
    const zib = document.getElementById('zenIconB'); if(zib) zib.textContent = '⏸ Pause';
    const zic = document.getElementById('zenIconC'); if(zic) zic.textContent = '⏸ Pause';
    document.getElementById('timerDisp').classList.add('running');
    document.getElementById('zenTimer').classList.add('running');
    const tb = document.getElementById('zenTimerB'); if(tb) tb.classList.add('running');
    const tc = document.getElementById('zenTimerC'); if(tc) tc.classList.add('running');
    tmr.interval = setInterval(tick, 1000);
    setTimeout(() => showCharPopup('timerStart'), 2000);
  } else if (!tmr.paused) {
    tmr.paused = true; clearInterval(tmr.interval); tmr.interval = null;
    document.getElementById('startBtn').textContent = '▶ Resume';
    document.getElementById('zenIcon').textContent = '▶ Resume';
    const zib = document.getElementById('zenIconB'); if(zib) zib.textContent = '▶ Resume';
    const zic = document.getElementById('zenIconC'); if(zic) zic.textContent = '▶ Resume';
    document.getElementById('timerDisp').classList.remove('running');
    document.getElementById('timerDisp').classList.add('paused');
    document.getElementById('zenTimer').classList.remove('running');
    const tb = document.getElementById('zenTimerB'); if(tb) { tb.classList.remove('running'); }
    const tc = document.getElementById('zenTimerC'); if(tc) { tc.classList.remove('running'); }
  } else {
    tmr.paused = false;
    document.getElementById('startBtn').textContent = '⏸ Pause';
    document.getElementById('zenIcon').textContent = '⏸ Pause';
    const zib = document.getElementById('zenIconB'); if(zib) zib.textContent = '⏸ Pause';
    const zic = document.getElementById('zenIconC'); if(zic) zic.textContent = '⏸ Pause';
    document.getElementById('timerDisp').classList.remove('paused');
    document.getElementById('timerDisp').classList.add('running');
    document.getElementById('zenTimer').classList.add('running');
    const tb = document.getElementById('zenTimerB'); if(tb) tb.classList.add('running');
    const tc = document.getElementById('zenTimerC'); if(tc) tc.classList.add('running');
    tmr.interval = setInterval(tick, 1000);
  }
}

function tick() {
  tmr.elapsed++;
  updDisp(tmr.elapsed); updBar();
  if(typeof updateTree==='function') updateTree(tmr.elapsed);
  if (tmr.total !== Infinity && tmr.elapsed >= tmr.total) phaseComplete();
}

function stopTimer() {
  if (!tmr.running && tmr.elapsed === 0) return;
  clearInterval(tmr.interval); tmr.interval = null;
  const wasFocus = tmr.phase === 'focus';
  const mins = Math.floor(tmr.elapsed / 60);
  if (wasFocus && mins >= 1) promptSession(mins);
  resetTimer();
}

function skipPhase() { stopTimer(); }

function resetTimer() {
  tmr.running = false; tmr.paused = false; tmr.elapsed = 0; tmr.phase = 'focus';
  document.getElementById('startBtn').textContent = '▶ Begin Training';
  document.getElementById('zenIcon').textContent = '▶ Begin';
  const zib = document.getElementById('zenIconB'); if(zib) zib.textContent = '▶ Begin';
  const zic = document.getElementById('zenIconC'); if(zic) zic.textContent = '▶ Begin';
  document.getElementById('timerDisp').classList.remove('running','paused');
  document.getElementById('zenTimer').classList.remove('running');
  const tb = document.getElementById('zenTimerB'); if(tb) tb.classList.remove('running');
  const tc = document.getElementById('zenTimerC'); if(tc) tc.classList.remove('running');
  setPhaseLabel('TOTAL CONCENTRATION');
  setMode(tmr.mode, null);
  if(typeof onTimerStop==='function') onTimerStop();
}

function phaseComplete() {
  clearInterval(tmr.interval); tmr.interval = null;
  tmr.running = false; tmr.paused = false;
  beep();
  if (tmr.phase === 'focus') {
    const mins = Math.floor(tmr.elapsed / 60);
    if(typeof bloomTree==='function') bloomTree();
    if (mins >= 1) promptSession(mins);
    tmr.pomoCount = Math.min(4, tmr.pomoCount + 1);
    tmr.phase = 'break';
    setPhaseLabel('BREAK — RECOVER YOUR BREATHING');
    const brkMins = tmr.mode==='custom'
      ? Math.max(5, Math.round((pd().settings._routineDuration || pd().settings.customFocus || 45) / 5))
      : (MODES[tmr.mode]?.brk || 5);
    tmr.total = brkMins * 60;
    notify(`Training complete! ${brkMins}m recovery breathing! 🔥`, 'success');
    showCharPopup('timerBreak');
  } else {
    tmr.phase = 'focus'; setPhaseLabel('TOTAL CONCENTRATION');
    const fMins = tmr.mode==='custom'?(pd().settings.customFocus||45):(MODES[tmr.mode]?.focus||25);
    tmr.total = fMins * 60;
    notify('Break over! Return to TOTAL CONCENTRATION! ⚔', 'info');
    if (tmr.pomoCount >= 4) { tmr.pomoCount = 0; notify('4 Concentration Forms complete! UMAI!! 🔥', 'success'); }
  }
  tmr.elapsed = 0;
  updDisp(0); updBar(); renderPomoDots();
  localStorage.removeItem('kimetsu_crash');
  // Auto-start next phase
  tmr.running = true; tmr.paused = false;
  document.getElementById('startBtn').textContent = '⏸ Pause';
  document.getElementById('zenIcon').textContent = '⏸ Pause';
  document.getElementById('timerDisp').classList.add('running');
  document.getElementById('zenTimer').classList.add('running');
  document.getElementById('timerDisp').classList.remove('paused');
  tmr.interval = setInterval(tick, 1000);
}

function promptSession(mins) {
  const subject = document.getElementById('curSubject').value || 'General';
  const topic   = document.getElementById('curTopic').value   || '';
  const type    = document.getElementById('curType').value    || 'General';

  // Auto-log immediately
  const session = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    startTime: tmr.sessionStart ? tmr.sessionStart.toISOString() : new Date().toISOString(),
    durationMinutes: mins,
    subject, topic, type,
    focusRating:  pendS.focusRating  || 3,
    energyRating: pendS.energyRating || 3,
    notes: '',
    hour: new Date().getHours()
  };
  session.productiveMinutes = Math.round(mins * session.focusRating / 5);
  pd().sessions.push(session);
  updateStreak(); saveState(); checkBadges();
  localStorage.removeItem('kimetsu_crash');
  refreshAll();

  const savedId = session.id;

  // Show toast with Undo + Edit
  const el = document.getElementById('notif');
  el.className = 'notif success show';
  el.innerHTML = `✅ ${mins}m of <strong>${esc(subject)}</strong> logged!
    <span style="display:inline-flex;gap:6px;margin-left:10px">
      <button onclick="undoSession(${savedId})" style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:inherit;padding:2px 9px;border-radius:5px;cursor:pointer;font-size:11px">↩ Undo</button>
      <button onclick="editSession(${savedId})" style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:inherit;padding:2px 9px;border-radius:5px;cursor:pointer;font-size:11px">✏ Edit</button>
    </span>`;
  clearTimeout(window._notifT);
  window._notifT = setTimeout(() => { el.classList.remove('show'); el.innerHTML = ''; }, 8000);

  pendS = { focusRating:3, energyRating:3 };
  setTimeout(() => showCharPopup('sessionLog'), 500);
  setTimeout(() => showRoutineUpdatePopup(true), 900);
}

function undoSession(id) {
  pd().sessions = pd().sessions.filter(s => s.id !== id);
  updateStreak(); saveState(); refreshAll();
  const el = document.getElementById('notif');
  el.classList.remove('show'); el.innerHTML = '';
  notify('Session removed.', 'info');
}

function editSession(id) {
  const s = pd().sessions.find(s => s.id === id);
  if (!s) { notify('Session already removed.', 'info'); return; }
  // Pre-fill manual log modal
  document.getElementById('ml_date').value     = s.date;
  document.getElementById('ml_subject').value  = s.subject;
  document.getElementById('ml_topic').value    = s.topic || '';
  document.getElementById('ml_duration').value = s.durationMinutes;
  document.getElementById('ml_type').value     = s.type || 'General';
  document.getElementById('ml_notes').value    = s.notes || '';
  mlRatings = { focus: s.focusRating||3, energy: s.energyRating||3 };
  // Keep session alive — only replace it on save
  window._editingSessionId = id;
  openModal('manualModal');
  const el = document.getElementById('notif');
  el.classList.remove('show'); el.innerHTML = '';
}

function rate(type, val) {
  if (type==='focus') {
    pendS.focusRating = val;
    document.querySelectorAll('#sm_focus .r-btn').forEach((b,i) => b.classList.toggle('sel', i+1===val));
  } else {
    pendS.energyRating = val;
    document.querySelectorAll('#sm_energy .r-btn').forEach((b,i) => b.classList.toggle('sel', i+1===val));
  }
}

function rateML(type, val) {
  mlRatings[type] = val;
  document.querySelectorAll(`#ml_focus .r-btn`).forEach((b,i) => b.classList.toggle('sel', i+1===val));
}

function saveSession(skip) {
  const subject = document.getElementById('sm_subject').value || pendS.subject || 'General';
  const topic = document.getElementById('sm_topic').value || pendS.topic || '';
  const type = document.getElementById('sm_type').value || 'General';
  const notes = document.getElementById('sm_notes').value || '';
  const session = {
    id: Date.now(), date: new Date().toISOString().split('T')[0],
    startTime: pendS.startTime || new Date().toISOString(),
    durationMinutes: pendS.durationMinutes || 0,
    subject, topic, type, focusRating: pendS.focusRating||3,
    energyRating: pendS.energyRating||3, notes, hour: new Date().getHours()
  };
  session.productiveMinutes = Math.round(session.durationMinutes * session.focusRating / 5);
  pd().sessions.push(session);
  updateStreak(); saveState(); checkBadges();

  // Deduct from active routine planned session
  if (window._activeRoutinePlanId) {
    const planItem = pdPlanned().find(p => p.id === window._activeRoutinePlanId);
    if (planItem) {
      const remaining = planItem.remainingDuration ?? planItem.duration;
      planItem.remainingDuration = Math.max(0, remaining - session.durationMinutes);
      if (planItem.remainingDuration === 0) {
        planItem.status = 'done';
        setTimeout(()=>notify(`✅ "${planItem.topic||planItem.subject}" fully completed! 🔥`, 'success'), 1000);
      } else {
        setTimeout(()=>notify(`⏱ ${planItem.remainingDuration}m still remaining in "${planItem.topic||planItem.subject}"`, 'info'), 1000);
      }
      saveState();
    }
    window._activeRoutinePlanId = null;
    window._activeRoutineSessionMins = null;
  }

  closeModal('sessionModal');
  document.getElementById('sm_notes').value = '';
  pendS = { focusRating:3, energyRating:3 };
  refreshAll();
  localStorage.removeItem('kimetsu_crash');
  notify(`Session logged! ${session.durationMinutes}m of ${subject} — UMAI!! 📜`, 'success');
  setTimeout(() => showCharPopup('sessionLog'), 500);
  // Show today's routine update popup
  setTimeout(() => showRoutineUpdatePopup(true), 900);
}

function saveManualSession() {
  const date = document.getElementById('ml_date').value || new Date().toISOString().split('T')[0];
  const subject = document.getElementById('ml_subject').value || 'General';
  const topic = document.getElementById('ml_topic').value || '';
  const duration = parseInt(document.getElementById('ml_duration').value) || 0;
  const type = document.getElementById('ml_type').value || 'General';
  const notes = document.getElementById('ml_notes').value || '';
  if (duration < 1) { notify('Enter a duration, Zenitsu! 😤', 'info'); return; }
  if (window._editingSessionId) {
    pd().sessions = pd().sessions.filter(s => s.id !== window._editingSessionId);
    window._editingSessionId = null;
  }
  const session = {
    id: Date.now(), date, startTime: date+'T00:00:00.000Z', durationMinutes: duration,
    subject, topic, type, focusRating: mlRatings.focus||3, energyRating: mlRatings.energy||3,
    notes, hour:12, manual:true
  };
  session.productiveMinutes = Math.round(duration * session.focusRating / 5);
  pd().sessions.push(session);
  updateStreak(); saveState(); checkBadges();
  closeModal('manualModal'); refreshAll();
  notify(`Mission logged! ${duration}m of ${subject}`, 'success');
}

function closeManualModal() {
  window._editingSessionId = null;
  closeModal('manualModal');
}

/* ═══════════════════════════════════════════════════════════════
   STREAK
═══════════════════════════════════════════════════════════════ */
function updateStreak() {
  // Recalculate streak from scratch so deletions are always reflected correctly
  const sessions = pd().sessions;
  if (!sessions.length) {
    pd().streak = 0;
    pd().lastStudyDate = null;
    document.getElementById('streakNum').textContent = 0;
    return;
  }

  // Build a set of unique study dates
  const studiedDates = [...new Set(sessions.map(s => s.date))].sort();
  const lastDate = studiedDates[studiedDates.length - 1];
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Streak is only alive if the user studied today or yesterday
  if (lastDate !== today && lastDate !== yesterdayStr) {
    pd().streak = 0;
    pd().lastStudyDate = lastDate;
    document.getElementById('streakNum').textContent = 0;
    return;
  }

  // Count consecutive days backwards from lastDate
  let streak = 1;
  for (let i = studiedDates.length - 2; i >= 0; i--) {
    const curr = new Date(studiedDates[i + 1] + 'T00:00:00');
    const prev = new Date(studiedDates[i] + 'T00:00:00');
    const diff = Math.round((curr - prev) / 86400000);
    if (diff === 1) streak++;
    else break;
  }

  pd().streak = streak;
  pd().lastStudyDate = lastDate;
  document.getElementById('streakNum').textContent = streak;
}

/* ═══════════════════════════════════════════════════════════════
   TASKS
═══════════════════════════════════════════════════════════════ */
function qaAdd() {
  const txt = document.getElementById('qaInput').value.trim();
  if (!txt) return;
  addTask(txt, document.getElementById('qaPri').value, document.getElementById('qaSubj').value, '');
  document.getElementById('qaInput').value = '';
}
function addTaskFull() {
  const txt = document.getElementById('t_text').value.trim(); if (!txt) return;
  addTask(txt, document.getElementById('t_pri').value, document.getElementById('t_subj').value, document.getElementById('t_due').value);
  document.getElementById('t_text').value = '';
}
// ── TASKS: backed by nerdbi_tasks table ──────────────────────
let _cloudTasks = null; // null = not yet loaded from DB

function pdTasksAll() {
  if (_cloudTasks !== null) return _cloudTasks;
  if (!pd().tasks) pd().tasks = [];
  return pd().tasks;
}

async function loadTasksCloud() {
  if (!_currentUser) return;
  try {
    const { data, error } = await _supa.from('nerdbi_tasks')
      .select('*').eq('user_id', _currentUser.id)
      .order('created_at', { ascending: false });
    if (!error && data) {
      _cloudTasks = data.map(t => ({
        id: t.id, text: t.text, priority: t.priority,
        subject: t.subject||'', dueDate: t.due_date||'',
        done: t.done, doneAt: t.done_at, createdAt: t.created_at
      }));
      refreshTasks();
    }
  } catch(e) { console.warn('loadTasksCloud failed:', e); }
}

async function addTask(text, priority='medium', subject='', dueDate='') {
  if (_currentUser) {
    const { data, error } = await _supa.from('nerdbi_tasks')
      .insert([{ user_id: _currentUser.id, text, priority, subject, due_date: dueDate||null }])
      .select().single();
    if (!error && data) {
      if (!_cloudTasks) _cloudTasks = [];
      _cloudTasks.unshift({ id: data.id, text, priority, subject,
        dueDate: data.due_date||'', done: false, createdAt: data.created_at });
    }
  } else {
    pd().tasks.unshift({ id: Date.now(), text, priority, subject, dueDate, done: false, createdAt: new Date().toISOString() });
    saveState();
  }
  refreshTasks();
  notify('Mission added! The Corps needs you! ⚔', 'info');
}

async function toggleTask(id) {
  const t = pdTasksAll().find(t => t.id===id); if (!t) return;
  const prevDone = t.done;
  const prevDoneAt = t.doneAt;
  t.done = !t.done; if (t.done) t.doneAt = new Date().toISOString();
  refreshTasks(); checkBadges();
  if (t.done) setTimeout(() => showCharPopup('taskDone'), 300);
  if (_currentUser) {
    try {
      const { error } = await _supa.from('nerdbi_tasks').update({ done: t.done, done_at: t.done ? t.doneAt : null }).eq('id', id);
      if (error) throw error;
    } catch(e) {
      console.warn('toggleTask cloud failed — rolling back:', e);
      t.done = prevDone; t.doneAt = prevDoneAt;
      refreshTasks();
      notify('Could not update task — please try again.', 'info');
    }
  } else { saveState(); }
}

async function deleteTask(id) {
  // Snapshot for rollback
  const prevCloud = _cloudTasks ? [..._cloudTasks] : null;
  const prevLocal = pd().tasks ? [...pd().tasks] : null;

  if (_cloudTasks) _cloudTasks = _cloudTasks.filter(t => t.id !== id);
  else { pd().tasks = pd().tasks.filter(t => t.id !== id); saveState(); }
  refreshTasks();

  if (_currentUser) {
    try {
      const { error } = await _supa.from('nerdbi_tasks').delete().eq('id', id).eq('user_id', _currentUser.id);
      if (error) throw error;
    } catch(e) {
      console.warn('deleteTask cloud failed — rolling back:', e);
      // Rollback optimistic UI update
      if (prevCloud !== null) _cloudTasks = prevCloud;
      else if (prevLocal !== null) { pd().tasks = prevLocal; saveState(); }
      refreshTasks();
      notify('Could not delete task — please try again.', 'info');
    }
  }
}
function makeTaskEl(task) {
  const el = document.createElement('div');
  el.className = 'task-item' + (task.done?' done':'');
  const priColors = {high:'var(--red)',medium:'var(--accent)',low:'var(--text3)'};
  const isOverdue = task.dueDate && !task.done && new Date(task.dueDate+'T23:59:59') < new Date();
  el.innerHTML = `
    <div class="task-check ${task.done?'checked':''}" onclick="toggleTask(${task.id})"></div>
    <div class="task-body">
      <div class="task-top">
        ${task.subject ? `<span class="task-subject-tag">${esc(task.subject)}</span>` : ''}
        <span class="task-text">${esc(task.text)}</span>
      </div>
      <div class="task-meta">
        ${task.dueDate ? `<span class="task-due${isOverdue?' overdue':''}">${isOverdue?'⚠ ':'📅 '}${fmtDate(task.dueDate)}</span>` : ''}
        ${task.priority ? `<span><span class="task-priority-dot" style="background:${priColors[task.priority]||'var(--text3)'}"></span>${task.priority}</span>` : ''}
      </div>
    </div>
    <button class="task-del" onclick="deleteTask(${task.id})">✕</button>`;
  return el;
}
function refreshTasks() {
  const pending = pdTasksAll().filter(t=>!t.done);
  const done = pdTasksAll().filter(t=>t.done);
  const fill = (id, items, emptyMsg, emptyIcon) => {
    const el = document.getElementById(id); if (!el) return;
    el.innerHTML = '';
    if (items.length===0) { el.innerHTML=`<div class="empty"><div class="empty-icon">${emptyIcon||'⚔'}</div>${emptyMsg}</div>`; return; }
    items.forEach(t => el.appendChild(makeTaskEl(t)));
  };
  // Dashboard task list — name only (trim after —), subject tag, due date
  const dashEl = document.getElementById('dashTaskList');
  if (dashEl) {
    dashEl.innerHTML = '';
    // Sort: overdue first, then by soonest due date, then no-date last
    const dashItems = [...pending].sort((a,b) => {
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return 0;
    }).slice(0,5);
    if (!dashItems.length) {
      dashEl.innerHTML = '<div class="empty"><div class="empty-icon">🔥</div>No pending missions! Rengoku approves.</div>';
    } else {
      dashItems.forEach(t => {
        const isOverdue = t.dueDate && new Date(t.dueDate+'T23:59:59') < new Date();
        // Show only the name part — everything before first ' — ' or ' | '
        const shortName = t.text.split(/\s[—|]\s/)[0].trim();
        const el = document.createElement('div');
        el.className = 'task-item' + (t.done?' done':'');
        el.innerHTML = `
          <div class="task-check ${t.done?'checked':''}" onclick="toggleTask(${t.id})"></div>
          <div class="task-body">
            <div class="task-top">
              ${t.subject ? `<span class="task-subject-tag">${esc(t.subject)}</span>` : ''}
              <span class="task-text">${esc(shortName)}</span>
            </div>
            ${t.dueDate ? `<div class="task-meta"><span class="task-due${isOverdue?' overdue':''}">${isOverdue?'⚠ ':'📅 '}${fmtDate(t.dueDate)}</span></div>` : ''}
          </div>
          <button class="task-del" onclick="deleteTask(${t.id})">✕</button>`;
        dashEl.appendChild(el);
      });
    }
  }
  fill('allTasksList', pending, 'No pending missions!', '⚔');
  fill('doneTasksList', done.slice(0,10), 'Complete missions to see them here', '✅');

  const ptl = document.getElementById('plannerTasks');
  if (ptl) {
    const sorted = pending.filter(t=>t.dueDate).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
    const hiddenCount = pending.length - sorted.length;
    ptl.innerHTML = '';
    if (!sorted.length) {
      ptl.innerHTML='<div class="empty"><div class="empty-icon">📅</div>No missions with deadlines.<br><span style="font-size:11px;font-family:var(--font-mono)">Add a due date to a mission to see it here.</span></div>';
    } else {
      sorted.forEach(t=>ptl.appendChild(makeTaskEl(t)));
      if (hiddenCount > 0) {
        const note = document.createElement('div');
        note.style.cssText = 'font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:8px 0;margin-top:4px';
        note.textContent = `+ ${hiddenCount} mission${hiddenCount > 1 ? 's' : ''} without a due date — set one to show here`;
        ptl.appendChild(note);
      }
    }
  }
  const pc = document.getElementById('pendCnt'); if(pc) pc.textContent=pending.length;
  const allTasks = pdTasksAll();
  const total = allTasks.length, doneCount = allTasks.filter(t => t.done).length;
  sEl('taskGT',`${doneCount}/${total}`);
  styleEl('taskGB',`width:${total?doneCount/total*100:0}%`);
  refreshSubjectDrops();
}

/* ═══════════════════════════════════════════════════════════════
   NOTES
═══════════════════════════════════════════════════════════════ */
let noteTags = [];
let editingNoteId = null;
function noteFmt(cmd) {
  const ed = document.getElementById('noteEditor'); ed.focus();
  if (cmd==='h2') document.execCommand('formatBlock',false,'<h3>');
  else if (cmd==='code') document.execCommand('insertHTML',false,'<code style="background:var(--bg4);padding:2px 5px;border-radius:3px;font-family:var(--font-mono);font-size:12px">&nbsp;</code>');
  else if (cmd==='hr') document.execCommand('insertHTML',false,'<hr style="border:none;border-top:1px solid var(--border);margin:10px 0">');
  else document.execCommand(cmd,false,null);
}
function addNoteTag() {
  const v = document.getElementById('noteTagInput').value.trim();
  if (!v||noteTags.includes(v)) return;
  noteTags.push(v); document.getElementById('noteTagInput').value=''; renderNoteTagsDisplay();
}
function renderNoteTagsDisplay() {
  document.getElementById('noteTagsDisplay').innerHTML = noteTags.map((t,i) =>
    `<span class="note-tag">${esc(t)}<span class="note-tag-del" onclick="removeNoteTag(${i})">✕</span></span>`).join('');
}
function removeNoteTag(i) { noteTags.splice(i,1); renderNoteTagsDisplay(); }
function clearNoteEditor() {
  document.getElementById('noteEditor').innerHTML='';
  document.getElementById('note_title').value='';
  noteTags=[]; renderNoteTagsDisplay(); editingNoteId=null;
}
function saveNote() {
  const title=document.getElementById('note_title').value.trim()||'Untitled Scroll';
  const content=document.getElementById('noteEditor').innerHTML;
  const subject=document.getElementById('note_subj').value;
  if (!content||content==='<br>') { notify('Write something first, Inosuke!', 'info'); return; }
  if (editingNoteId) {
    const n=pd().notes.find(n=>n.id===editingNoteId);
    if(n){ n.title=title; n.content=content; n.subject=subject; n.tags=[...noteTags]; n.updatedAt=new Date().toISOString(); }
  } else {
    pd().notes.unshift({ id:Date.now(), title, content, subject, tags:[...noteTags], createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() });
  }
  saveState(); clearNoteEditor(); renderNotes();
  notify('Scroll sealed! 📖', 'success');
}
function renderNotes() {
  const el=document.getElementById('notesList'); if(!el) return;
  const q=(document.getElementById('noteSearch')?.value||'').toLowerCase();
  const notes=pd().notes.filter(n=>!q||n.title.toLowerCase().includes(q)||n.content.toLowerCase().includes(q));
  if (!notes.length) { el.innerHTML='<div class="empty"><div class="empty-icon">📖</div>No scrolls yet. Begin writing your training records.</div>'; return; }
  el.innerHTML=notes.map(n=>`
    <div class="note-card" onclick="viewNote(${n.id})">
      <div class="note-card-title">${esc(n.title)}</div>
      <div class="note-card-preview">${n.content.replace(/<[^>]*>/g,' ').substring(0,100)}</div>
      <div class="note-card-meta">${n.subject?'📚 '+esc(n.subject)+' · ':''}${fmtDate(n.updatedAt?.split('T')[0]||'')}</div>
    </div>`).join('');
}
function viewNote(id) {
  const n=pd().notes.find(n=>n.id===id); if(!n) return;
  const v=document.getElementById('noteViewer');
  document.getElementById('noteViewTitle').textContent=n.title;
  document.getElementById('noteViewBody').innerHTML = DOMPurify.sanitize(n.content);
  document.getElementById('noteViewTags').innerHTML=n.tags?.map(t=>`<span class="note-tag">${esc(t)}</span>`).join('')||'';
  v.style.display='block'; v.scrollIntoView({behavior:'smooth'});
  v._editId=id;
}
function editNote() {
  const id=document.getElementById('noteViewer')._editId; const n=pd().notes.find(n=>n.id===id); if(!n) return;
  document.getElementById('note_title').value=n.title;
  document.getElementById('noteEditor').innerHTML = DOMPurify.sanitize(n.content);
  document.getElementById('note_subj').value=n.subject||'';
  noteTags=[...n.tags||[]]; renderNoteTagsDisplay();
  editingNoteId=id; document.getElementById('noteViewer').style.display='none';
  nav('notes', document.querySelector('[onclick*="notes"]'));
}

/* ═══════════════════════════════════════════════════════════════
   SUBJECTS
═══════════════════════════════════════════════════════════════ */
let pickedColor = '#5a9ee8';
function pickColor(c, el) {
  pickedColor = c;
  document.querySelectorAll('#colorPick .color-swatch').forEach(s=>s.classList.remove('sel'));
  el.classList.add('sel');
}
function saveSubject() {
  const name=document.getElementById('ns_name').value.trim(); if(!name) return;
  pd().subjects.push({ id:Date.now(), name, color:pickedColor });
  saveState(); closeModal('addSubjectModal'); refreshSubjects(); refreshSubjectDrops();
  notify(`${name} — Breathing style mastered! 🗡`, 'success');
}
function deleteSubject(id) {
  pd().subjects=pd().subjects.filter(s=>s.id!==id); saveState(); refreshSubjects(); refreshSubjectDrops();
}
function refreshSubjects() {
  const el=document.getElementById('subjectCards'); if(!el) return;
  if (!pd().subjects.length) { el.innerHTML='<div class="empty"><div class="empty-icon">🗡</div>No subjects yet. Add your first breathing style.</div>'; return; }
  const totalTime=pd().subjects.reduce((acc,s)=>{
    acc[s.name]=(pd().sessions.filter(ss=>ss.subject===s.name).reduce((a,ss)=>a+ss.durationMinutes,0));
    return acc;
  },{});
  const maxTime=Math.max(...Object.values(totalTime),1);
  el.innerHTML=pd().subjects.map(s=>{
    const mins=totalTime[s.name]||0;
    const sessions=pd().sessions.filter(ss=>ss.subject===s.name).length;
    const pct=Math.min(100,(mins/maxTime)*100);
    return `<div class="subj-card">
      <div class="subj-card" style="border-left:3px solid ${s.color};background:var(--bg2);border:1px solid var(--border);border-left:3px solid ${s.color}">
      <button class="subj-del" onclick="deleteSubject(${s.id})">✕</button>
      <div class="subj-name">${esc(s.name)}</div>
      <div class="subj-time">${fmtMins(mins)}</div>
      <div class="subj-bar"><div class="subj-fill" style="width:${pct}%;background:${s.color}"></div></div>
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:6px">${sessions} sessions</div>
      </div>
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════
   EXAMS
═══════════════════════════════════════════════════════════════ */
function saveExam() {
  const name=document.getElementById('ne_name').value.trim();
  const date=document.getElementById('ne_date').value;
  if (!name||!date) return;
  pd().exams.push({ id:Date.now(), name, date });
  saveState(); closeModal('addExamModal'); refreshExams();
  notify('Final Selection added! Prepare yourself! ⚔', 'info');
}
function deleteExam(id) {
  pd().exams=pd().exams.filter(e=>e.id!==id); saveState(); refreshExams();
}
function refreshExams() {
  const el=document.getElementById('examList'); if(!el) return;
  const today=new Date(); today.setHours(0,0,0,0);
  const upcoming=pd().exams.filter(e=>new Date(e.date+'T00:00:00')>=today)
    .sort((a,b)=>a.date.localeCompare(b.date));
  if (!upcoming.length) { el.innerHTML='<div class="empty"><div class="empty-icon">📅</div>No Final Selections ahead. Add one.</div>'; return; }
  el.innerHTML=upcoming.map(e=>{
    const days=Math.ceil((new Date(e.date+'T00:00:00')-today)/86400000);
    const urgentClass=days<=3?'soon':'';
    const urgencyText = days===0?'TODAY!':days===1?'TOMORROW!':days<=3?`${days} days — URGENT!`:days===7?'1 week!':days+' days';
    return `<div class="exam-item">
      <div class="exam-name">${esc(e.name)}</div>
      <div class="exam-days ${urgentClass}">${urgencyText}</div>
      <button class="exam-del" onclick="deleteExam(${e.id})">✕</button>
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════
   LINKS
═══════════════════════════════════════════════════════════════ */
function saveLink() {
  const name=document.getElementById('nl_name').value.trim();
  const url=document.getElementById('nl_url').value.trim();
  if (!name||!url) return;
  pd().links.push({ id:Date.now(), name, url });
  saveState(); closeModal('addLinkModal'); refreshLinks();
}
function refreshLinks() {
  const el=document.getElementById('linksList'); if(!el) return;
  if (!pd().links.length) { el.innerHTML='<div style="font-size:12px;color:var(--text3);padding:8px">No links yet — add your training resources.</div>'; return; }
  el.innerHTML=pd().links.map(l=>`
    <span class="link-pill" onclick="window.open('${esc(l.url)}','_blank')">
      🔗 ${esc(l.name)}
      <button class="link-del" onclick="event.stopPropagation();deleteLink(${l.id})">✕</button>
    </span>`).join('');
}
function deleteLink(id) {
  pd().links=pd().links.filter(l=>l.id!==id); saveState(); refreshLinks();
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD & GOALS
═══════════════════════════════════════════════════════════════ */
function refreshDashboard() {
  const today=new Date().toISOString().split('T')[0];
  const todaySess=pd().sessions.filter(s=>s.date===today);
  const todayMins=todaySess.reduce((a,s)=>a+s.durationMinutes,0);
  const todayProd=todaySess.reduce((a,s)=>a+s.productiveMinutes,0);
  const weekStart=new Date(); weekStart.setDate(weekStart.getDate()-weekStart.getDay());
  const weekStr=weekStart.toISOString().split('T')[0];
  const weekSess=pd().sessions.filter(s=>s.date>=weekStr);
  const weekMins=weekSess.reduce((a,s)=>a+s.durationMinutes,0);

  sEl('todayHrs',fmtMins(todayMins));
  sEl('todaySess',todaySess.length);
  sEl('weekHrs',fmtMinsShort(weekMins));
  sEl('prodMin',fmtMins(todayProd));

  const dailyGoal=pd().goals.daily||120;
  const weeklyGoal=pd().goals.weekly||600;
  const dailyPct=Math.min(100,(todayMins/dailyGoal)*100);
  const weeklyPct=Math.min(100,(weekMins/weeklyGoal)*100);
  const ringPct=Math.round(dailyPct);

  sEl('ringPct',ringPct+'%');
  sEl('dailyGT',`${todayMins}/${dailyGoal}m`);
  sEl('weeklyGT',`${weekMins}/${weeklyGoal}m`);
  const offset=251.33*(1-dailyPct/100);
  const rc=document.getElementById('ringCircle');
  if(rc) rc.setAttribute('stroke-dashoffset',offset);
  styleEl('dailyGB',`width:${dailyPct}%`);
  styleEl('weeklyGB',`width:${weeklyPct}%`);
  document.getElementById('streakNum').textContent=pd().streak||0;

  // Breathing Rank
  const totalMins = pd().sessions.reduce((a,s)=>a+s.durationMinutes,0);
  const rank = getPlayerRank(totalMins);
  const el = document.getElementById('rankCard');
  if (el) {
    document.getElementById('rankEmoji').textContent = rank.emoji;
    document.getElementById('rankTitle').textContent = rank.name;
    document.getElementById('rankDesc').textContent = rank.breathing + ' · ' + rank.desc;
  }
}

function saveGoals() {
  const d=parseInt(document.getElementById('g_daily').value)||120;
  const w=parseInt(document.getElementById('g_weekly').value)||600;
  pd().goals={daily:d,weekly:w}; saveState(); refreshDashboard();
  notify('Vow sworn! The Corps acknowledges your resolve. ⚔', 'success');
}

function refreshGoals() {
  const el = document.getElementById('goalsSummary'); if (!el) return;
  const gDaily = document.getElementById('g_daily');
  const gWeekly = document.getElementById('g_weekly');
  if (gDaily) gDaily.value = pd().goals.daily || 120;
  if (gWeekly) gWeekly.value = pd().goals.weekly || 600;

  const dailyGoal = pd().goals.daily || 120;
  const weeklyGoal = pd().goals.weekly || 600;
  const today = new Date().toISOString().split('T')[0];
  const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStr = weekStart.toISOString().split('T')[0];
  const todayMins = pd().sessions.filter(s=>s.date===today).reduce((a,s)=>a+s.durationMinutes,0);
  const weekMins = pd().sessions.filter(s=>s.date>=weekStr).reduce((a,s)=>a+s.durationMinutes,0);
  const totalMins = pd().sessions.reduce((a,s)=>a+s.durationMinutes,0);
  const tasks = pdTasksAll ? pdTasksAll() : (pd().tasks||[]);
  const doneT = tasks.filter(t=>t.done).length;
  const totalT = tasks.length;
  const rank = getPlayerRank(totalMins);

  // Stat strip
  const sset = (id,v) => { const e=document.getElementById(id); if(e) e.textContent=v; };
  sset('vs-today', fmtMins(todayMins));
  sset('vs-week', fmtMinsShort(weekMins));
  sset('vs-total', fmtMinsShort(totalMins));
  sset('vs-streak', pd().streak||0);
  sset('vs-rank', rank.name);

  // Progress bars
  const pct = (v,g) => Math.min(100, Math.round(v/g*100));
  const setBar = (barId, txtId, val, goal, unit='m') => {
    const p = pct(val, goal);
    const b = document.getElementById(barId); if(b) b.style.width = p + '%';
    const t = document.getElementById(txtId); if(t) t.textContent = `${val}${unit} / ${goal}${unit} (${p}%)`;
  };
  setBar('vow-daily-bar','vow-daily-txt', todayMins, dailyGoal);
  setBar('vow-weekly-bar','vow-weekly-txt', weekMins, weeklyGoal);
  const tb = document.getElementById('vow-task-bar'); if(tb) tb.style.width = totalT ? doneT/totalT*100+'%' : '0%';
  const tt = document.getElementById('vow-task-txt'); if(tt) tt.textContent = `${doneT} / ${totalT}`;

  // Week day breakdown bars
  const wbd = document.getElementById('vowWeekBreakdown');
  if (wbd) {
    const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const maxMins = Math.max(dailyGoal, 30);
    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart); d.setDate(d.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      const m = pd().sessions.filter(s=>s.date===ds).reduce((a,s)=>a+s.durationMinutes,0);
      const h = Math.min(100, Math.round(m/maxMins*100));
      const isToday = ds === today;
      const barColor = m >= dailyGoal ? 'var(--green)' : isToday ? 'var(--accent)' : 'var(--water)';
      html += `<div class="vow-week-day${isToday?' today':''}">
        <div class="vow-week-day-lbl">${DAYS[d.getDay()]}</div>
        <div class="vow-week-bar-wrap">
          <div class="vow-week-bar-fill" style="height:${h}%;background:${barColor}"></div>
        </div>
        <div class="vow-week-mins">${m?fmtMins(m):'-'}</div>
      </div>`;
    }
    wbd.innerHTML = html;
  }

  // Summary
  const subjectMap = {};
  pd().sessions.forEach(s => { subjectMap[s.subject||'Other'] = (subjectMap[s.subject||'Other']||0) + s.durationMinutes; });
  const topSubjects = Object.entries(subjectMap).sort((a,b)=>b[1]-a[1]).slice(0,4);
  el.innerHTML = `
    <div class="goal-summary-item"><span>Today's Training</span><span class="goal-summary-val">${fmtMins(todayMins)} / ${fmtMins(dailyGoal)}</span></div>
    <div class="goal-summary-item"><span>This Week</span><span class="goal-summary-val">${fmtMins(weekMins)} / ${fmtMins(weeklyGoal)}</span></div>
    <div class="goal-summary-item"><span>Total Training</span><span class="goal-summary-val">${fmtMins(totalMins)}</span></div>
    <div class="goal-summary-item"><span>Total Sessions</span><span class="goal-summary-val">${pd().sessions.length}</span></div>
    ${topSubjects.map(([s,m])=>`<div class="goal-summary-item"><span>📚 ${esc(s)}</span><span class="goal-summary-val">${fmtMins(m)}</span></div>`).join('')}`;
}

/* ═══════════════════════════════════════════════════════════════
   WEEK PLANNER
═══════════════════════════════════════════════════════════════ */
let _calOffset = 0; // months offset from today

function shiftMonth(dir) { _calOffset += dir; refreshMonthCal(); }
function goToday() { _calOffset = 0; refreshMonthCal(); }

function refreshWeekPlanner() { refreshMonthCal(); } // alias so existing calls still work

function refreshMonthCal() {
  const el = document.getElementById('monthCal'); if (!el) return;
  const labelEl = document.getElementById('monthCalLabel');
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const ref = new Date(today.getFullYear(), today.getMonth() + _calOffset, 1);
  const year = ref.getFullYear(), month = ref.getMonth();
  if (labelEl) labelEl.textContent = ref.toLocaleDateString('en-US',{month:'long',year:'numeric'});

  // Data sources
  const sessions = pd().sessions || [];
  const tasks = pdTasksAll ? pdTasksAll() : (pd().tasks || []);
  const exams = pd().exams || [];
  const logs = pdHabitLogs();
  const habits = pdHabits();

  // Build session map: date -> minutes
  const sessMap = {};
  sessions.forEach(s => { if(s.date) sessMap[s.date] = (sessMap[s.date]||0) + (s.durationMinutes||0); });

  // Build task map: date -> tasks[]
  const taskMap = {};
  tasks.forEach(t => { if(t.dueDate) { if(!taskMap[t.dueDate]) taskMap[t.dueDate]=[]; taskMap[t.dueDate].push(t); } });

  // Build exam map: date -> exams[]
  const examMap = {};
  exams.forEach(e => { const d=e.date||e.dueDate; if(d) { if(!examMap[d]) examMap[d]=[]; examMap[d].push(e); } });

  // Calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const DOWS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html = '<div class="mcal-grid">';
  DOWS.forEach(d => { html += `<div class="mcal-dow">${d}</div>`; });

  // Prev month filler
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    html += `<div class="mcal-cell other-month"><div class="mcal-num">${d}</div></div>`;
  }

  // This month
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = ds === todayStr;
    const mins = sessMap[ds];
    const dayTasks = taskMap[ds] || [];
    const dayExams = examMap[ds] || [];
    const habitsDoneToday = habits.filter(h => (logs[ds]||[]).includes(h.id));

    let inner = `<div class="mcal-num">${d}</div>`;

    // Habit dots
    if (habitsDoneToday.length) {
      inner += `<div class="mcal-dot-row">${habitsDoneToday.slice(0,6).map(h=>`<div class="mcal-dot" style="background:var(--green)" title="${esc(h.name)}"></div>`).join('')}</div>`;
    }

    // Session chip
    if (mins) inner += `<span class="mcal-chip">${fmtMins(mins)}</span>`;

    // Task chips (max 2)
    dayTasks.slice(0,2).forEach(t => {
      const name = t.text.split(/\s[—|]\s/)[0].trim();
      inner += `<span class="mcal-chip task-chip" title="${esc(t.text)}">⚔ ${esc(name)}</span>`;
    });
    if (dayTasks.length > 2) inner += `<span class="mcal-chip" style="color:var(--text3)">+${dayTasks.length-2} more</span>`;

    // Exam chips
    dayExams.forEach(e => { inner += `<span class="mcal-chip exam-chip" title="${esc(e.name||e.subject||'')}">📅 ${esc(e.name||e.subject||'Exam')}</span>`; });

    html += `<div class="mcal-cell${isToday?' today':''}">${inner}</div>`;
  }

  // Next month filler
  const total = firstDay + daysInMonth;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= remaining; d++) {
    html += `<div class="mcal-cell other-month"><div class="mcal-num">${d}</div></div>`;
  }

  html += '</div>';
  el.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   SESSION LOG
═══════════════════════════════════════════════════════════════ */
function deleteSession(id, btn) {
  // Inline undo — no browser confirm
  const row = btn.closest('tr');
  const expandRow = row.nextElementSibling;
  row.style.opacity = '0.35';
  row.style.transition = 'opacity .2s';
  if (expandRow) expandRow.style.opacity = '0.35';

  // Use a dedicated undo toast so notify() calls during the 4s window don't clobber it
  let undoToast = document.getElementById('undoToast');
  if (!undoToast) {
    undoToast = document.createElement('div');
    undoToast.id = 'undoToast';
    undoToast.className = 'notif warning';
    undoToast.style.cssText = 'top:60px'; // offset below main notif
    document.body.appendChild(undoToast);
  }
  undoToast.innerHTML = `🗑 Session removed. <button onclick="undoDeleteSession(${id})" style="margin-left:8px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.35);color:inherit;padding:2px 10px;border-radius:6px;cursor:pointer;font-size:12px">Undo</button>`;
  undoToast.classList.add('show');

  if (window._undoToastT) clearTimeout(window._undoToastT);
  window._undoToastT = setTimeout(() => {
    undoToast.classList.remove('show');
    _commitDeleteSession(id);
  }, 4000);

  window._pendingDeleteId = id;
}

function undoDeleteSession(id) {
  if (window._pendingDeleteId !== id) return;
  window._pendingDeleteId = null;
  clearTimeout(window._undoToastT);
  const undoToast = document.getElementById('undoToast');
  if (undoToast) undoToast.classList.remove('show');
  refreshLog(); // restore the row
  notify('↩ Session restored!', 'success');
}

function _commitDeleteSession(id) {
  if (window._pendingDeleteId !== id) return; // was undone
  window._pendingDeleteId = null;
  pd().sessions = pd().sessions.filter(s => s.id !== id);
  updateStreak(); saveState(); refreshAll();
}

function refreshLog() {
  const tbody=document.getElementById('logBody'); if(!tbody) return;
  const sorted=[...pd().sessions].sort((a,b)=>b.date.localeCompare(a.date));
  if (!sorted.length) { tbody.innerHTML=`<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text3)">No missions logged yet. Begin your training! ⚔</td></tr>`; return; }
  tbody.innerHTML=sorted.map(s=>`
    <tr class="log-row" onclick="if(!event.target.closest('.log-del-btn'))this.nextElementSibling.classList.toggle('open')">
      <td>${fmtDate(s.date)}</td>
      <td>${esc(s.subject||'—')}</td>
      <td>${esc(s.topic||'—')}</td>
      <td><span class="type-badge">${esc(s.type||'General')}</span></td>
      <td>${fmtMins(s.durationMinutes||0)}</td>
      <td><span class="focus-stars">${'★'.repeat(s.focusRating||3)}${'☆'.repeat(5-(s.focusRating||3))}</span></td>
      <td>${s.energyRating||3}/5</td>
      <td>${fmtMins(s.productiveMinutes||0)}</td>
      <td><button class="log-del-btn" onclick="deleteSession(${s.id},this)" title="Remove session">✕</button></td>
    </tr>
    <tr class="log-expand">
      <td colspan="9">${s.notes?'📝 '+esc(s.notes):'No battle notes recorded.'}</td>
    </tr>`).join('');
}

/* ═══════════════════════════════════════════════════════════════
   ANALYTICS CHARTS
═══════════════════════════════════════════════════════════════ */
let charts = {};
function refreshAnalytics() {
  const sessions=pd().sessions;
  // 7 day chart
  const days=[]; const labels=[]; const mins7=[];
  for(let i=6;i>=0;i--){
    const d=new Date(); d.setDate(d.getDate()-i);
    const ds=d.toISOString().split('T')[0];
    days.push(ds);
    labels.push(['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]);
    mins7.push(sessions.filter(s=>s.date===ds).reduce((a,s)=>a+s.productiveMinutes,0));
  }
  rebuildChart('wChart','bar',{labels,datasets:[{label:'Productive min',data:mins7,backgroundColor:'rgba(232,68,58,0.7)',borderColor:'var(--accent)',borderWidth:1,borderRadius:4}]});

  // Pie
  const subjectMins={};
  sessions.forEach(s=>{ subjectMins[s.subject||'Other']=(subjectMins[s.subject||'Other']||0)+s.durationMinutes; });
  const subKeys=Object.keys(subjectMins);
  const subColors=['#5a9ee8','#e85020','#f0d840','#60c870','#7ad4cc','#9b59b6','#b09060','#e86868'];
  rebuildChart('pChart','doughnut',{labels:subKeys,datasets:[{data:subKeys.map(k=>subjectMins[k]),backgroundColor:subColors.slice(0,subKeys.length),borderColor:'var(--bg)',borderWidth:2}]});

  // Focus/energy trend — use s.date (YYYY-MM-DD) for labels, never startTime
  const last14=sessions.slice(-14);
  rebuildChart('fChart','line',{
    labels:last14.map(s => fmtDate((s.date||'').substring(0,10))),
    datasets:[
      {label:'Focus',data:last14.map(s=>s.focusRating||0),borderColor:'var(--accent)',backgroundColor:'var(--accent-dim)',tension:.4,fill:true,pointRadius:3},
      {label:'Energy',data:last14.map(s=>s.energyRating||0),borderColor:'var(--water)',backgroundColor:'rgba(90,158,232,0.1)',tension:.4,fill:true,pointRadius:3}
    ]
  });

  // Session type breakdown
  const typeCounts={};
  sessions.forEach(s=>{ typeCounts[s.type||'General']=(typeCounts[s.type||'General']||0)+1; });
  const tKeys=Object.keys(typeCounts);
  rebuildChart('tChart','bar',{
    labels:tKeys,
    datasets:[{label:'Sessions',data:tKeys.map(k=>typeCounts[k]),backgroundColor:'rgba(90,158,232,0.6)',borderColor:'var(--water)',borderWidth:1,borderRadius:4}]
  });

  // Daily report
  const reportEl=document.getElementById('dailyReport'); if(!reportEl) return;
  const byDate={};
  sessions.forEach(s=>{ if(!byDate[s.date]) byDate[s.date]=[]; byDate[s.date].push(s); });
  const sortedDates=Object.keys(byDate).sort((a,b)=>b.localeCompare(a)).slice(0,14);
  reportEl.innerHTML=sortedDates.map(date=>{
    const daySess=byDate[date];
    const total=daySess.reduce((a,s)=>a+s.durationMinutes,0);
    const subjects=[...new Set(daySess.map(s=>s.subject).filter(Boolean))];
    return `<div class="day-report" onclick="this.classList.toggle('open')">
      <div class="day-report-hd">
        <span class="day-report-date">📅 ${date}</span>
        <span class="day-report-mins">${fmtMins(total)} · ${daySess.length} session${daySess.length!==1?'s':''}</span>
      </div>
      <div class="day-report-body">
        ${subjects.length?'<b>Subjects:</b> '+subjects.map(esc).join(', ')+'<br>':''}
        ${daySess.map(s=>`⚔ ${esc(s.topic||s.type||'Session')} (${fmtMins(s.durationMinutes)}) — Focus: ${'★'.repeat(s.focusRating||3)}`).join('<br>')}
      </div>
    </div>`;
  }).join('')||'<div class="empty"><div class="empty-icon">📊</div>No battle reports yet.</div>';
}

function rebuildChart(id, type, data) {
  const canvas=document.getElementById(id); if(!canvas) return;
  if(charts[id]) { charts[id].destroy(); delete charts[id]; }
  const baseOpts={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:type==='doughnut',labels:{color:'rgba(244,234,216,0.5)',font:{size:11},boxWidth:12}},tooltip:{backgroundColor:'var(--bg2)',borderColor:'var(--border)',borderWidth:1,titleColor:'var(--text)',bodyColor:'var(--text2)'}},scales:type!=='doughnut'?{x:{grid:{color:'rgba(244,234,216,0.04)'},ticks:{color:'rgba(244,234,216,0.35)',font:{size:10}}},y:{grid:{color:'rgba(244,234,216,0.04)'},ticks:{color:'rgba(244,234,216,0.35)',font:{size:10}}}}:{}};
  charts[id]=new Chart(canvas,{type,data,options:baseOpts});
}

/* ═══════════════════════════════════════════════════════════════
   HEATMAP
═══════════════════════════════════════════════════════════════ */
function refreshHeatmap() {
  const hm=document.getElementById('heatmap'); if(!hm) return;
  const end=new Date(); const start=new Date(end); start.setDate(end.getDate()-363);
  const dateMap={};
  pd().sessions.forEach(s=>{ dateMap[s.date]=(dateMap[s.date]||0)+s.productiveMinutes; });
  const maxVal=Math.max(...Object.values(dateMap),1);

  // Day labels
  const hmDays=document.getElementById('hmDays');
  if(hmDays) hmDays.innerHTML=['','Mon','','Wed','','Fri',''].map(d=>`<div class="hm-day-label">${d}</div>`).join('');

  let cur=new Date(start);
  // Align to Sunday
  while(cur.getDay()!==0) cur.setDate(cur.getDate()-1);

  const cols=[]; let monthLabels={}; let colIdx=0;
  while(cur<=end) {
    const col=[];
    for(let d=0;d<7;d++) {
      const ds=cur.toISOString().split('T')[0];
      const val=dateMap[ds]||0;
      let lvl=0;
      if(val>0) lvl=val<maxVal*.25?1:val<maxVal*.5?2:val<maxVal*.75?3:4;
      col.push({ds,lvl,val});
      if(cur.getDate()<=7&&cur>=start&&cur<=end) monthLabels[colIdx]=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][cur.getMonth()];
      cur.setDate(cur.getDate()+1);
    }
    cols.push(col); colIdx++;
  }

  // Months header
  const mEl=document.getElementById('hmMonths');
  if(mEl){
    let mHtml='';
    for(let i=0;i<cols.length;i++) mHtml+=`<div class="hm-month-label" style="width:16px;min-width:16px;flex-shrink:0">${monthLabels[i]||''}</div>`;
    mEl.innerHTML=mHtml;
  }

  hm.innerHTML=cols.map(col=>`<div class="hm-col">${col.map(c=>`<div class="hm-cell${c.lvl?' l'+c.lvl:''}" data-tip="${c.ds}${c.val?' · '+c.val+'m':''}"></div>`).join('')}</div>`).join('');

  // Stats
  const allDates=Object.keys(dateMap);
  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const dayTotals=[0,0,0,0,0,0,0];
  pd().sessions.forEach(s=>{ const day=new Date(s.date+'T12:00:00').getDay(); dayTotals[day]+=s.durationMinutes; });
  const bestDayIdx=dayTotals.indexOf(Math.max(...dayTotals));
  sEl('bestDay',dayNames[bestDayIdx]||'—');

  // Longest streak
  const sortedUnique=[...new Set(pd().sessions.map(s=>s.date))].sort();
  let ls=0,cs=0,prev='';
  sortedUnique.forEach(d=>{
    if(prev){ const diff=Math.floor((new Date(d)-new Date(prev))/86400000); cs=diff===1?cs+1:1; }
    else cs=1; ls=Math.max(ls,cs); prev=d;
  });
  sEl('longestStreak',ls+' days');
  const activeW=new Set(sortedUnique.map(d=>{ const dd=new Date(d+'T12:00:00'); dd.setDate(dd.getDate()-dd.getDay()); return dd.toISOString().split('T')[0]; })).size;
  sEl('activeWeeks',activeW.toString());
}

/* ═══════════════════════════════════════════════════════════════
   BADGES — DS themed
═══════════════════════════════════════════════════════════════ */

const BADGES = [
  { id:'first_blood',   icon:'🗡',  name:'First Blood',          desc:'Log your first session',                                        check:p=>p.sessions.length>=1 },
  { id:'ten_sessions',  icon:'📜',  name:'Ten Missions',          desc:'Log 10 total sessions',                                         check:p=>p.sessions.length>=10 },
  { id:'fifty_sessions',icon:'⚔',  name:'Fifty Battles',         desc:'Log 50 total sessions',                                         check:p=>p.sessions.length>=50 },
  { id:'concentration', icon:'🧘',  name:'Total Concentration',   desc:'One session of 2h+ straight',                                   check:p=>p.sessions.some(s=>s.durationMinutes>=120) },
  { id:'deep_work',     icon:'🎯',  name:'Deep Work',             desc:'One session of 4h+ straight',                                   check:p=>p.sessions.some(s=>s.durationMinutes>=240) },
  { id:'streak3',       icon:'🔥',  name:'Three-Day Flame',       desc:'3-day streak',                                                  check:p=>p.streak>=3 },
  { id:'streak7',       icon:'⚡',  name:'Thunder Week',          desc:'7-day streak — Zenitsu is shaking',                            check:p=>p.streak>=7 },
  { id:'streak30',      icon:'🌸',  name:'Thirty-Day Bloom',      desc:'30-day streak — Shinobu is impressed',                         check:p=>p.streak>=30 },
  { id:'streak100',     icon:'☀️', name:'Hinokami Kagura',        desc:'100-day streak — Sun Breathing unlocked',                      check:p=>p.streak>=100 },
  { id:'h36',           icon:'💧',  name:'Mizunoe',               desc:'36 hours studied — you left Mizunoto behind',                  check:p=>p.sessions.reduce((a,s)=>a+s.durationMinutes,0)>=2160 },
  { id:'h108',          icon:'🔥',  name:'Kanoto',                desc:'108 hours — blade is sharpening',                              check:p=>p.sessions.reduce((a,s)=>a+s.durationMinutes,0)>=6480 },
  { id:'h360',          icon:'⚡',  name:'Tsuchinoto',            desc:'360 hours — actual consistency. Zenitsu notices.',             check:p=>p.sessions.reduce((a,s)=>a+s.durationMinutes,0)>=21600 },
  { id:'h720',          icon:'🌫',  name:'Kinoto',                desc:'720 hours — Muichiro gives you a blank stare of respect',      check:p=>p.sessions.reduce((a,s)=>a+s.durationMinutes,0)>=43200 },
  { id:'h1080',         icon:'💎',  name:'Kinoe — Upper Rank',    desc:'1080 hours. FLAMBOYANT. Tengen approves.',                     check:p=>p.sessions.reduce((a,s)=>a+s.durationMinutes,0)>=64800 },
  { id:'h1440',         icon:'🌸',  name:'Tsuguko',               desc:'1440 hours — Hashira candidate. Shinobu smiles dangerously.',  check:p=>p.sessions.reduce((a,s)=>a+s.durationMinutes,0)>=86400 },
  { id:'hashira',       icon:'🏯',  name:'HASHIRA',               desc:'1800 hours — You ARE a Pillar. Yoriichi weeps.',               check:p=>p.sessions.reduce((a,s)=>a+s.durationMinutes,0)>=108000 },
  { id:'task_slayer',   icon:'✅',  name:'Demon Slayer',          desc:'Complete 10 missions',                                          check:p=>p.tasks.filter(t=>t.done).length>=10 },
  { id:'task_100',      icon:'🗡',  name:'Mission Corps',         desc:'Complete 100 missions',                                         check:p=>p.tasks.filter(t=>t.done).length>=100 },
  { id:'mugen',         icon:'🚂',  name:'Mugen Learner',         desc:'Study across 5 different subjects',                            check:p=>new Set(p.sessions.map(s=>s.subject)).size>=5 },
  { id:'focus_master',  icon:'🎯',  name:'Focus Pillar',          desc:'Avg focus ≥4 over last 10 sessions',                           check:p=>{const s=p.sessions.slice(-10);return s.length>=10&&s.reduce((a,ss)=>a+ss.focusRating,0)/s.length>=4;} },
  { id:'night_warrior', icon:'🌙',  name:'Night Demon Slayer',    desc:'20 sessions after 8pm',                                        check:p=>p.sessions.filter(s=>s.hour>=20).length>=20 },
  { id:'early_bird',    icon:'🌅',  name:'Taisho Dawn',           desc:'20 sessions before 8am',                                       check:p=>p.sessions.filter(s=>s.hour<8).length>=20 },
  { id:'scroll_keeper', icon:'📖',  name:'Scroll Keeper',         desc:'Save 10 notes',                                                check:p=>p.notes.length>=10 },
];

function checkBadges() { saveState(); }
function refreshBadges() {
  const el=document.getElementById('badgesGrid'); if(!el) return;
  el.innerHTML=BADGES.map(b=>`
    <div class="badge${b.check(pd())?' earned':''}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════════
   SETTINGS
═══════════════════════════════════════════════════════════════ */
function saveSettings() {
  const f=parseInt(document.getElementById('s_focus').value)||45;
  const b=parseInt(document.getElementById('s_break').value)||10;
  const existing = pd().settings || {};
  pd().settings = {
    ...existing,
    customFocus:f,
    customBreak:b,
    recapTime: document.getElementById('s_recapTime')?.value || existing.recapTime || '18:00',
    recapEnabled: document.getElementById('s_recapEnabled')?.checked ?? existing.recapEnabled ?? false
  };
  saveState();
  notify('Settings sealed! Breathing forms updated. ⚔', 'success');
}

/* ═══════════════════════════════════════════════════════════════
   THEMES
═══════════════════════════════════════════════════════════════ */
const THEME_CONFIG = {
  dark:          { icon:'🌑', label:'Night Hunt',     mode:'kimetsu', desc:'Dark Demon Slayer night theme' },
  dawn:          { icon:'🌅', label:'Taisho Dawn',    mode:'kimetsu', desc:'Warm dawn light of the Taisho era' },
  mugen:         { icon:'🌀', label:'Mugen Train',    mode:'kimetsu', desc:'Deep purple dream state' },
  'focus-dark':  { icon:'🔥', label:'Focus Dark',     mode:'focus',   desc:'Minimal amber study theme (dark)' },
  'focus-light': { icon:'☀️', label:'Focus Light',   mode:'focus',   desc:'Minimal amber study theme (light)' },
  'focus-dim':   { icon:'🌙', label:'Focus Dim',      mode:'focus',   desc:'Near-black minimal focus mode' },
  'doraemon':      { icon:'🔵', label:'Doraemon',        mode:'doraemon', desc:'Sky blue · cheerful · Anywhere Door' },
  'doraemon-dark': { icon:'🌌', label:'Doraemon Night',  mode:'doraemon', desc:'Midnight blue · stars · 4D pocket' },
  'deathnote':     { icon:'📓', label:'Death Note',      mode:'deathnote', desc:'Ink black · red · write your fate' },
  'hogwarts':    { icon:'⚡', label:'Hogwarts',      mode:'harrypotter', desc:'The Great Hall awaits — study by candlelight' },
  'gryffindor':  { icon:'🦁', label:'Gryffindor',   mode:'harrypotter', desc:'Courage, bravery, and nerve — study like a lion' },
  'slytherin':   { icon:'🐍', label:'Slytherin',    mode:'harrypotter', desc:'Ambition and cunning — every hour is a power move' },
  'heisenberg':  { icon:'🎩', label:'Heisenberg',   mode:'breakingbad', desc:'Say my name — and say it while studying' },
  'lospollos':   { icon:'🍗', label:'Los Pollos',   mode:'breakingbad', desc:'The chicken man never skips a session' },
};
const themes = ['dark','dawn','mugen','focus-dark','focus-light','focus-dim',
  'doraemon','doraemon-dark','deathnote',
  'hogwarts','gryffindor','slytherin',
  'heisenberg','lospollos'];
let themeIdx = 0;

/* Per-theme terminology: [subjects label, tasks label, exams label, goals label, log label, notes label] */
const THEME_TERMS = {
  kimetsu: {
    subjects:'Subjects', tasks:'Missions', exams:'Final Selections', goals:'Vows',
    log:'Battle Log', notes:'Scrolls', planner:'Arc Planner', focus:'Concentration',
    badges:'Corps Marks', topic:'Form / Topic', discipline:'Subject', session:'Training',
    startBtn:'▶ Begin Training', stopBtn:'Stop', skipBtn:'Skip →',
    timerPhase:'TOTAL CONCENTRATION', logSession:'Log Mission ⚔',
    subjectPlaceholder:'Subject…', dailyGoal:'Daily Vow', weeklyGoal:'Weekly Mission',
    addSubject:'Add Subject ⚔', analyticsTitle:'Battle Analytics',
  },
  focus: {
    subjects:'Subjects', tasks:'Tasks', exams:'Exams & Deadlines', goals:'Goals',
    log:'Session Log', notes:'Notes', planner:'Week Planner', focus:'Focus Tools',
    badges:'Achievements', topic:'Topic', discipline:'Subject', session:'Study Session',
    startBtn:'▶ Start', stopBtn:'Stop', skipBtn:'Skip →',
    timerPhase:'FOCUS SESSION', logSession:'Log Session',
    subjectPlaceholder:'Subject…', dailyGoal:'Daily Goal', weeklyGoal:'Weekly Target',
    addSubject:'Add Subject', analyticsTitle:'Analytics',
  },
  doraemon: {
    subjects:'Subjects', tasks:'Missions', exams:'Big Events', goals:'Dreams',
    log:'Adventure Log', notes:'Gadget Notes', planner:'Day Planner', focus:'Focus Gadget',
    badges:'Star Badges', topic:'Topic / Tool', discipline:'Subject', session:'Study Adventure',
    startBtn:'▶ Start Adventure', stopBtn:'Stop', skipBtn:'Skip →',
    timerPhase:'STUDYING HARD!', logSession:'Log Adventure 🔵',
    subjectPlaceholder:'Subject…', dailyGoal:'Daily Dream', weeklyGoal:'Weekly Quest',
    addSubject:'Add Subject 🔵', analyticsTitle:'Adventure Stats',
  },
    deathnote: {
    subjects:'Cases', tasks:'Investigations', exams:'Judgements', goals:'Schemes',
    log:'Death Log', notes:'The Note', planner:'Kira\'s Planner', focus:'Concentration',
    badges:'Achievements', topic:'Case / Topic', discipline:'Case File', session:'Investigation',
    startBtn:'▶ Begin Investigation', stopBtn:'Close Case', skipBtn:'Skip →',
    timerPhase:'UNDER INVESTIGATION', logSession:'Write in the Note 📓',
    subjectPlaceholder:'Case file…', dailyGoal:'Daily Scheme', weeklyGoal:'Weekly Judgement',
    addSubject:'Add Case 📓', analyticsTitle:'Case Analytics',
  },
  harrypotter: {
    subjects:'Subjects', tasks:'Assignments', exams:'O.W.L.s & N.E.W.T.s', goals:'House Points',
    log:'Spell Log', notes:'Spell Books', planner:'Term Planner', focus:'Concentration Charm',
    badges:'House Badges', topic:'Spell / Topic', discipline:'Subject', session:'Study Session',
    startBtn:'▶ Lumos — Begin', stopBtn:'Nox', skipBtn:'Finite →',
    timerPhase:'LUMOS — TOTAL CONCENTRATION', logSession:'Record in Spell Book 📚',
    subjectPlaceholder:'Choose subject…', dailyGoal:'Daily House Points', weeklyGoal:'Weekly Target',
    addSubject:'Add Subject 📚', analyticsTitle:'Academic Record',
  },
  breakingbad: {
    subjects:'Formulas', tasks:'Operations', exams:'Deadlines', goals:'Quotas',
    log:'Cook Log', notes:'The Notebook', planner:'Operation Planner', focus:'The Lab',
    badges:'Achievements', topic:'Formula / Topic', discipline:'Formula', session:'Cook Session',
    startBtn:'▶ Say My Name — Begin', stopBtn:'We\'re Done', skipBtn:'Skip →',
    timerPhase:'IN THE LAB — TOTAL FOCUS', logSession:'Log the Cook 🧪',
    subjectPlaceholder:'Formula…', dailyGoal:'Daily Quota', weeklyGoal:'Weekly Production',
    addSubject:'Add Formula 🧪', analyticsTitle:'Lab Analytics',
  },
};

function getTerms() {
  const t = localStorage.getItem('kimetsuTheme') || 'dark';
  const mode = THEME_CONFIG[t]?.mode || 'kimetsu';
  return THEME_TERMS[mode] || THEME_TERMS[t] || THEME_TERMS.kimetsu;
}

function applyTerminology() {
  const T = getTerms();
  // Nav items
  const navMap = {
    subjects: T.subjects, tasks: T.tasks, planner: T.planner,
    goals: T.goals, log: T.log, notes: T.notes, focus: T.focus, badges: T.badges,
  };
  document.querySelectorAll('.nav-item[onclick]').forEach(btn => {
    const m = btn.getAttribute('onclick').match(/nav\('(\w+)'/);
    if (m && navMap[m[1]]) {
      const icon = btn.querySelector('.nav-icon');
      btn.textContent = '';
      if (icon) btn.appendChild(icon);
      btn.appendChild(document.createTextNode(navMap[m[1]]));
    }
  });
  // Page titles map
  PAGE_TITLES.subjects = T.subjects; PAGE_TITLES.tasks = T.tasks;
  PAGE_TITLES.planner = T.planner; PAGE_TITLES.goals = T.goals;
  PAGE_TITLES.log = T.log; PAGE_TITLES.notes = T.notes;
  PAGE_TITLES.focus = T.focus; PAGE_TITLES.badges = T.badges;
  // Subject dropdowns placeholder
  document.querySelectorAll('#curSubject,#qaSubj,#sm_subject,#t_subj,#ml_subject,#note_subj').forEach(el => {
    if (el && el.options[0]) el.options[0].text = T.subjectPlaceholder;
  });
  // Timer phase label
  const phase = document.getElementById('timerPhase');
  if (phase && !window._timerRunning) phase.textContent = T.timerPhase;
  // Start button
  const sb = document.getElementById('startBtn');
  if (sb && !window._timerRunning) sb.textContent = T.startBtn;
  // Subjects page heading
  const subj_heading = document.querySelector('#page-subjects .card-title');
  if (subj_heading) subj_heading.textContent = T.subjects;
  // Goal labels
  const dg = document.querySelector('.goal-item:first-child .goal-name');
  if (dg) dg.textContent = T.dailyGoal;
  const wg = document.querySelector('.goal-item:nth-child(3) .goal-name');
  if (wg) wg.textContent = T.weeklyGoal;
  // Analytics page
  const an = document.querySelector('#page-analytics .card-title');
  if (an) an.textContent = T.analyticsTitle;
}

function setTheme(t) {
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem('kimetsuTheme',t);
  const cfg = THEME_CONFIG[t] || THEME_CONFIG.dark;
  document.getElementById('themeBtn').textContent = cfg.icon;
  // Update title based on mode / theme
  const mode = cfg.mode;
  if (mode === 'focus') {
    document.title = 'Focus — Personal Study Tracker';
    const logo = document.querySelector('.sidebar-logo h1');
    if (logo) logo.textContent = 'Focus';
    const jp = document.querySelector('.sidebar-logo .jp');
    if (jp) jp.style.display = 'none';
    const logoSub = document.querySelector('.sidebar-logo span');
    if (logoSub) logoSub.textContent = 'Study Tracker';
  } else if (t === 'doraemon' || t === 'doraemon-dark') {
    document.title = t === 'doraemon-dark' ? '🌌 Doraemon Night — Study Tracker' : '🔵 Doraemon Study Tracker';
    const logo = document.querySelector('.sidebar-logo h1');
    if (logo) logo.textContent = 'Study Tracker';
    const jp = document.querySelector('.sidebar-logo .jp');
    if (jp) { jp.style.display = ''; jp.textContent = 'どこでもドア'; }
    const logoSub = document.querySelector('.sidebar-logo span');
    if (logoSub) logoSub.textContent = t === 'doraemon-dark' ? 'Doraemon Night' : 'Doraemon Edition';
   } else if (t === 'deathnote') {
    document.title = '📓 Death Note Study Tracker';
    const logo = document.querySelector('.sidebar-logo h1');
    if (logo) logo.textContent = 'Death Note';
    const jp = document.querySelector('.sidebar-logo .jp');
    if (jp) { jp.style.display = ''; jp.textContent = 'デスノート'; }
    const logoSub = document.querySelector('.sidebar-logo span');
    if (logoSub) logoSub.textContent = 'Study Tracker';
  } else if (t === 'hogwarts' || t === 'gryffindor' || t === 'slytherin') {
    const houseNames = { hogwarts:'Hogwarts', gryffindor:'Gryffindor', slytherin:'Slytherin' };
    const houseEmoji = { hogwarts:'⚡', gryffindor:'🦁', slytherin:'🐍' };
    const houseLatin = { hogwarts:'Draco Dormiens Nunquam Titillandus', gryffindor:'Fortis Est Veritas', slytherin:'Semper Viret' };
    document.title = houseEmoji[t] + ' ' + houseNames[t] + ' — NerdBi Study Tracker';
    const logo = document.querySelector('.sidebar-logo h1');
    if (logo) logo.textContent = houseNames[t] + ' Academy';
    const jp = document.querySelector('.sidebar-logo .jp');
    if (jp) { jp.style.display = ''; jp.textContent = houseEmoji[t] + ' Hogwarts'; }
    const logoSub = document.querySelector('.sidebar-logo span');
    if (logoSub) logoSub.textContent = houseLatin[t];
    document.querySelectorAll('.petal').forEach((p, i) => {
      p.textContent = i % 4 === 0 ? '✦' : i % 4 === 1 ? '⚡' : i % 4 === 2 ? '✨' : '⭒';
    });
  } else if (t === 'heisenberg' || t === 'lospollos') {
    document.title = (t === 'heisenberg' ? '🎩 Heisenberg' : '🍗 Los Pollos') + ' — NerdBi Study Tracker';
    const logo = document.querySelector('.sidebar-logo h1');
    if (logo) logo.textContent = t === 'heisenberg' ? 'Heisenberg Mode' : 'Los Pollos Academy';
    const jp = document.querySelector('.sidebar-logo .jp');
    if (jp) { jp.style.display = ''; jp.textContent = t === 'heisenberg' ? '🎩 Say My Name' : '🍗 Los Pollos'; }
    const logoSub = document.querySelector('.sidebar-logo span');
    if (logoSub) logoSub.textContent = t === 'heisenberg' ? 'I am the one who studies' : 'A man provides. Always.';
    document.querySelectorAll('.petal').forEach((p, i) => {
      p.textContent = i % 4 === 0 ? '⚗' : i % 4 === 1 ? '🧪' : i % 4 === 2 ? '⬡' : '✦';
    });
  } else {
    document.title = '鬼滅学院 — Kimetsu Academy Study Tracker';
    const logo = document.querySelector('.sidebar-logo h1');
    if (logo) logo.textContent = 'Kimetsu Academy';
    const jp = document.querySelector('.sidebar-logo .jp');
    if (jp) { jp.style.display = ''; jp.textContent = '鬼滅学院'; }
    const logoSub = document.querySelector('.sidebar-logo span');
    if (logoSub) logoSub.textContent = 'Study Tracker';
  }
  // Update petal emoji based on theme
  const petalEls = document.querySelectorAll('.petal');
  if (t === 'doraemon' || t === 'doraemon-dark') {
    const stars = t === 'doraemon-dark';
    petalEls.forEach((p, i) => p.textContent = stars ? (i%3===0?'⭐':i%3===1?'🌌':'✨') : (i%3===0?'⭐':i%3===1?'🔵':'✨'));
  } else if (t === 'deathnote') {
    petalEls.forEach(p => p.textContent = '🖤');
  } else if (t === 'heisenberg' || t === 'lospollos') {
    petalEls.forEach((p, i) => p.textContent = i%3===0?'⚗':i%3===1?'🧪':'⬡');
  } else {
    petalEls.forEach(p => p.textContent = '✿');
  }
  // Apply petals only for kimetsu themes (includes doraemon & deathnote)
  const petals = document.getElementById('petals');
  if (petals) petals.style.display = (mode !== 'focus') ? '' : 'none';
  setTimeout(() => { applyTerminology(); updateThemeSelectors(); }, 50);
}
function cycleTheme() {
  themeIdx=(themeIdx+1)%themes.length;
  setTheme(themes[themeIdx]);
}

/* ═══════════════════════════════════════════════════════════════
   SOUND
═══════════════════════════════════════════════════════════════ */
let audioCtx=null, activeNodes={}, masterGain=null;
function getAudio() {
  if (!audioCtx) { audioCtx=new (window.AudioContext||window.webkitAudioContext)(); masterGain=audioCtx.createGain(); masterGain.gain.value=0.3; masterGain.connect(audioCtx.destination); }
  return audioCtx;
}
const SOUND_GENS = {
  rain:() => { const buf=makeNoise(); const src=getAudio().createBufferSource(); src.buffer=buf; src.loop=true; const f=getAudio().createBiquadFilter(); f.type='lowpass'; f.frequency.value=600; src.connect(f); f.connect(masterGain); return src; },
  fire:() => { const buf=makeNoise(); const src=getAudio().createBufferSource(); src.buffer=buf; src.loop=true; const f=getAudio().createBiquadFilter(); f.type='lowpass'; f.frequency.value=300; const g=getAudio().createGain(); g.gain.value=0.6; src.connect(f); f.connect(g); g.connect(masterGain); return src; },
  cafe:() => { const buf=makeNoise(); const src=getAudio().createBufferSource(); src.buffer=buf; src.loop=true; const f=getAudio().createBiquadFilter(); f.type='bandpass'; f.frequency.value=1200; f.Q.value=0.5; src.connect(f); f.connect(masterGain); return src; },
  forest:() => { const buf=makeNoise(); const src=getAudio().createBufferSource(); src.buffer=buf; src.loop=true; const f=getAudio().createBiquadFilter(); f.type='highshelf'; f.frequency.value=2000; f.gain.value=5; src.connect(f); f.connect(masterGain); return src; },
  ocean:() => { const buf=makeNoise(); const src=getAudio().createBufferSource(); src.buffer=buf; src.loop=true; const f=getAudio().createBiquadFilter(); f.type='lowpass'; f.frequency.value=800; const g=getAudio().createGain(); g.gain.value=0.8; src.connect(f); f.connect(g); g.connect(masterGain); return src; }
};
function makeNoise() {
  const dur=2; const sr=getAudio().sampleRate; const buf=getAudio().createBuffer(1,dur*sr,sr);
  const data=buf.getChannelData(0); for(let i=0;i<data.length;i++) data[i]=Math.random()*2-1; return buf;
}
function toggleSound(type, btn) {
  if (activeNodes[type]) { activeNodes[type].stop(); delete activeNodes[type]; btn.classList.remove('active'); }
  else { const node=SOUND_GENS[type](); node.start(); activeNodes[type]=node; btn.classList.add('active'); }
}
function setVol(v) { if(masterGain) masterGain.gain.value=parseFloat(v); }
function beep() {
  try {
    const ctx=getAudio(); const o=ctx.createOscillator(); const g=ctx.createGain();
    o.connect(g); g.connect(masterGain||ctx.destination);
    o.frequency.value=880; g.gain.setValueAtTime(0.3,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.4);
    o.start(ctx.currentTime); o.stop(ctx.currentTime+0.4);
  } catch(e){}
}

/* ═══════════════════════════════════════════════════════════════
   ZEN MODE — MULTI-STYLE
═══════════════════════════════════════════════════════════════ */
let zenActive=false;
let _zenStyle = localStorage.getItem('zenStyle') || 'A';
let _zenQuoteInterval = null;

function setZenStyle(style) {
  _zenStyle = style;
  localStorage.setItem('zenStyle', style);
  const ov = document.getElementById('zenOverlay');
  ov.setAttribute('data-zen-style', style);
  // Update switcher buttons
  ['A','B','C'].forEach(s => {
    const btn = document.getElementById('zenStyle' + s);
    if (btn) btn.classList.toggle('active', s === style);
  });
  // Show/hide correct layout elements
  const isA = style === 'A';
  const isB = style === 'B';
  const isC = style === 'C';
  // A/default elements
  const sharedIds = ['zenPhase','zenTimer','zenBar','zenTask','zenQuote'];
  sharedIds.forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    el.style.display = isB || isC ? 'none' : '';
  });
  document.querySelector('.zen-controls')?.style && (document.querySelector('.zen-overlay > .zen-controls').style.display = isB || isC ? 'none' : '');
  document.querySelector('.zen-exit-hint') && (document.querySelector('.zen-overlay > .zen-exit-hint').style.display = isB || isC ? 'none' : '');
  // B elements
  document.getElementById('zenBLeft').style.display = isB ? 'flex' : 'none';
  document.getElementById('zenBRight').style.display = isB ? 'flex' : 'none';
  // C elements
  document.getElementById('zenRingWrap').style.display = isC ? 'block' : 'none';
  document.getElementById('zenPhaseCLabel').style.display = isC ? '' : 'none';
  document.getElementById('zenControlsC').style.display = isC ? 'flex' : 'none';
  document.getElementById('zenExitC').style.display = isC ? '' : 'none';
  // Sync timer display
  syncZenDisplays();
}

function syncZenDisplays() {
  const t = document.getElementById('zenTimer')?.textContent || '25:00';
  const phase = document.getElementById('zenPhase')?.textContent || '';
  const task = document.getElementById('zenTask')?.textContent || '';
  const running = document.getElementById('zenTimer')?.classList.contains('running');
  // Sync B
  const tb = document.getElementById('zenTimerB'); if(tb) { tb.textContent = t; tb.className = 'zen-clock' + (running?' running':''); }
  const pb = document.getElementById('zenPhaseB'); if(pb) pb.textContent = phase;
  const tkb = document.getElementById('zenTaskB'); if(tkb) tkb.textContent = task;
  // Sync C
  const tc = document.getElementById('zenTimerC'); if(tc) { tc.textContent = t; tc.className = 'zen-clock' + (running?' running':''); }
  const pc = document.getElementById('zenPhaseCLabel'); if(pc) pc.textContent = phase;
  // Sync C ring
  _syncZenRing();
}

function _syncZenRing() {
  const fill = document.getElementById('zenRingFill'); if(!fill) return;
  const pct = tmr.total === Infinity ? 0 : Math.max(0, 1 - tmr.elapsed / tmr.total);
  const circ = 2 * Math.PI * 88; // r=88 → ~553
  fill.setAttribute('stroke-dasharray', circ);
  fill.setAttribute('stroke-dashoffset', circ * (1 - pct));
}

function toggleZen() {
  zenActive=!zenActive;
  const ov=document.getElementById('zenOverlay');
  ov.classList.toggle('active',zenActive);
  if(zenActive) {
    // Apply saved style
    setZenStyle(_zenStyle);
    updateZenTask();
    const _zq = getActiveQuotes();
    const qi=Math.floor(Math.random()*_zq.length);
    const qText = '"'+_zq[qi]+'"';
    const mainQ = document.getElementById('zenQuote');
    if(mainQ) mainQ.textContent = qText;
    // Set B quote
    _setZenBQuote();
    // Start B quote rotation
    clearInterval(_zenQuoteInterval);
    _zenQuoteInterval = setInterval(_setZenBQuote, 60000);
  } else {
    clearInterval(_zenQuoteInterval);
  }
}

function _setZenBQuote() {
  const pool = getActiveQuotes();
  const raw = pool[Math.floor(Math.random() * pool.length)];
  // split "text — attribution"
  const dashIdx = raw.lastIndexOf(' — ');
  const qText = dashIdx > -1 ? raw.slice(0, dashIdx) : raw;
  const qAttr = dashIdx > -1 ? '— ' + raw.slice(dashIdx + 3) : '— NerdBi';
  const qEl = document.getElementById('zenQuoteB'); if(qEl) { qEl.style.opacity='0'; setTimeout(()=>{qEl.textContent=qText;qEl.style.opacity='1';},300); }
  const aEl = document.getElementById('zenQuoteAttrB'); if(aEl) aEl.textContent = qAttr;
}

function updateZenTask() {
  const v=document.getElementById('curTopic')?.value || 'Begin your training';
  const zenTask = document.getElementById('zenTask'); if(zenTask) zenTask.textContent = v;
  const zenTaskB = document.getElementById('zenTaskB'); if(zenTaskB) zenTaskB.textContent = v;
}
document.addEventListener('keydown',e=>{
  if(document.querySelector('.modal-ov.active')) return;
  if(e.key==='Escape'&&zenActive) toggleZen();
  if(e.key==='z'||e.key==='Z') toggleZen();
  if(e.key===' '&&!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) { e.preventDefault(); toggleTimer(); }
  if(e.key==='s'||e.key==='S') { if(!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) stopTimer(); }
  if((e.key==='m'||e.key==='M')&&!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) openModal('manualModal');
  if(e.key==='?') { const h=document.getElementById('kbdHud'); h.classList.toggle('show'); setTimeout(()=>h.classList.remove('show'),3000); }
});

function setThemeAndUpdate(t) {
  themeIdx = themes.indexOf(t); if(themeIdx<0) themeIdx=0;
  setTheme(t);
  updateThemeSelectors();
}

function setThemeFromSettings(t) {
  themeIdx = themes.indexOf(t); if(themeIdx<0) themeIdx=0;
  setTheme(t);
  updateThemeSelectors();
  const cfg = THEME_CONFIG[t] || THEME_CONFIG.dark;
  notify(cfg.icon + ' Theme: ' + cfg.label, 'success');
}

function updateThemeSelectors() {
  const t = localStorage.getItem('kimetsuTheme')||'dark';
  // Settings page theme-card divs
  document.querySelectorAll('.theme-card[data-theme]').forEach(c => {
    c.classList.toggle('active-theme', c.dataset.theme === t);
  });
  // Legacy btn-based selectors
  document.querySelectorAll('.theme-sel-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.t===t));
  // Auth picker buttons
  document.querySelectorAll('.auth-theme-btn').forEach(btn=>btn.classList.toggle('selected', btn.dataset.themePick===t));
  // Current theme label in settings
  const lbl = document.getElementById('currentThemeLabel');
  if(lbl) { const cfg=THEME_CONFIG[t]||THEME_CONFIG.dark; lbl.textContent='Active: '+cfg.icon+' '+cfg.label; }
}
function pickAuthTheme(t) {
  themeIdx = themes.indexOf(t); if(themeIdx<0) themeIdx=0;
  setTheme(t);
  updateThemeSelectors();
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════ */
const PAGE_TITLES = {
  dashboard:'Dashboard',log:'Battle Log',tasks:'Missions',notes:'Scrolls',
  analytics:'Analytics',heatmap:'Calendar',badges:'Corps Marks',subjects:'Subjects',
  planner:'Arc Planner',routine:'Routine',goals:'Vows',focus:'Concentration',settings:'Settings',
  squads:'Squad',scroll:'🐦 The Scroll — AI Companion'
};
