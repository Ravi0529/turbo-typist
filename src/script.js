const typingText = document.querySelector(".typing-text .paragraph-text");
const input = document.querySelector(".input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = [
        "The quick brown fox jumps over the lazy dog in the quiet, moonlit park, its shadow dancing on the ground as it moves with grace and agility, disappearing into the underbrush.",
        "She sells seashells by the seashore, where the salty waves kiss the golden sand, and the seagulls cry above, creating a symphony of nature's beauty and harmony that echoes along the coast.",
        "Under the twinkling stars, they danced together, lost in the rhythm of the night, their hearts beating in unison, as if time itself had paused to witness their love story unfold beneath the celestial canopy.",
        "The ancient castle stood tall, its walls whispering stories of forgotten heroes and battles, with ivy crawling up its stone facade and the echoes of history reverberating through its empty halls.",
        "A gentle breeze carried the sweet scent of blooming flowers across the open meadow, where butterflies flitted from blossom to blossom, creating a tapestry of color and life that enchanted all who passed by.",
        "The bustling city never slept, its streets alive with endless energy and vibrant lights, as people from all walks of life hurried to and fro, creating a mosaic of stories and dreams in constant motion.",
        "In the deep forest, the old oak tree was a silent witness to centuries of history, its gnarled branches reaching towards the sky, and its roots firmly anchored in the rich, ancient soil that held secrets of the past.",
        "The crystal-clear lake mirrored the majestic mountains, creating a breathtaking scene where nature's grandeur was reflected in perfect symmetry, offering a moment of peace and contemplation to all who gazed upon it.",
        "Every morning, the sun's warm rays gently woke the sleepy village from its slumber, casting a golden glow over the rooftops and filling the air with the promise of a new day filled with possibilities and hope.",
        "The curious kitten explored every corner of the house, discovering new wonders each day, its playful antics bringing joy and laughter to the family, as it bounded from room to room with boundless energy.",
        "Beneath the surface of the ocean, a hidden world of colorful coral and exotic fish thrived, their vibrant hues and intricate patterns weaving a mesmerizing underwater tapestry that captivated the imagination of all who ventured below.",
        "The snow-covered landscape sparkled under the winter sun, a pristine blanket of white that stretched as far as the eye could see, inviting adventurers to carve their paths through its untouched beauty.",
        "With each stroke of the brush, the artist brought a vivid dream to life on the canvas, capturing moments of wonder and emotion that spoke to the soul, transcending the boundaries of time and space.",
        "The old library was a treasure trove of knowledge, filled with dusty books and ancient scrolls, each one a portal to a different world, waiting to be discovered by those who sought wisdom and adventure.",
        "The smell of freshly baked bread wafted through the air, inviting everyone to the cozy bakery, where warmth and comfort were served alongside delicious pastries and friendly smiles, making it a beloved community hub.",
        "High above, the eagle soared, its keen eyes scanning the land for any sign of movement, a symbol of freedom and strength, effortlessly riding the thermals that carried it to the highest peaks.",
        "The little boy's laughter echoed through the playground, a sound of pure joy and innocence that brightened the day of everyone who heard it, reminding them of the simple pleasures of childhood.",
        "At the carnival, the bright lights and cheerful music created an atmosphere of festive excitement, where families and friends came together to enjoy rides, games, and the magic of shared experiences.",
        "The mysterious figure in the cloak moved silently through the shadows, unseen by the crowd, its presence a whisper of intrigue and danger that sent shivers down the spines of those who sensed it.",
        "As the ship sailed into the horizon, the crew felt a mix of anticipation and adventure, each wave carrying them closer to the unknown, where dreams and destinies awaited in the vast expanse of the ocean.",
        "In the heart of the city, a hidden garden flourished, providing a serene escape from the urban chaos, where flowers bloomed in riotous colors and birds sang sweet melodies, offering solace to weary souls.",
        "The long, winding road led them through picturesque villages, each with its unique charm and history, where cobblestone streets and quaint cottages painted a picture of timeless beauty and tranquility.",
        "From the top of the mountain, the view was breathtaking, stretching as far as the eye could see, with valleys, rivers, and forests blending into a majestic panorama that filled the heart with awe and wonder.",
        "In the quiet of the early morning, the birds sang a harmonious melody that greeted the new day, their songs weaving a tapestry of sound that welcomed the dawn with a promise of hope and renewal.",
        "The old man sat on the porch, recounting tales of his youth to his wide-eyed grandchildren, his voice a gentle reminder of the past and the lessons learned through a lifetime of experiences.",
        "The enchanted forest was home to many mystical creatures, each with their own magical powers, creating a realm of wonder and mystery that beckoned adventurers to explore its hidden depths.",
        "Under the glowing moonlight, the couple shared a dance, lost in their love and the beauty of the night, their hearts beating as one in a moment of pure, unspoken connection that transcended words.",
        "The abandoned house at the edge of town was said to be haunted, filled with ghostly whispers and eerie shadows, its dark history a source of endless fascination and fear for the townsfolk.",
        "The market was a bustling hub of activity, filled with vibrant colors and enticing aromas, where merchants hawked their wares and shoppers haggled for the best deals, creating a lively tapestry of human interaction.",
        "Through the dense fog, the lighthouse's beam guided the weary sailors safely to shore, its steady light a beacon of hope and safety in the midst of the stormy seas that threatened to engulf them.",
        "The wise old owl perched on the tree, watching over the forest with its all-knowing eyes, a silent guardian of the night, whose presence inspired reverence and respect among the woodland creatures.",
        "As the rain poured down, the children splashed in puddles, their laughter echoing through the streets, a joyful reminder of the simple pleasures that can be found even in the midst of a storm.",
        "The grand ballroom was decorated with sparkling chandeliers and elegant tapestries, ready for the gala, where guests in their finest attire would dance the night away in a celebration of beauty and grace.",
        "In the distance, the sound of thunder rumbled, signaling the approach of a mighty storm, its ominous presence a reminder of nature's power and the unpredictable forces that shape our world.",
        "The scientist worked late into the night, determined to solve the complex equation before dawn, her mind racing with possibilities and the thrill of discovery, driven by a passion for knowledge.",
        "Amidst the chaos of the battlefield, a sense of camaraderie and brotherhood held the soldiers together, their shared experiences forging bonds that would last a lifetime, even in the face of adversity.",
        "The young artist found inspiration in the city's vibrant street art, incorporating it into her own work, creating pieces that spoke to the soul and reflected the diverse and dynamic spirit of urban life.",
        "With a determined spirit, she climbed the steep hill, each step bringing her closer to her goal, her heart filled with a sense of purpose and the promise of achievement at the journey's end.",
        "In the tranquil garden, the gentle hum of bees and the fragrance of roses created a peaceful retreat, a sanctuary where the worries of the world could melt away in the embrace of nature's beauty.",
        "The ancient manuscript held secrets of a bygone era, its fragile pages filled with cryptic symbols and faded illustrations, a testament to the wisdom and mysteries of a civilization long forgotten."
    ];

    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = "";

    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => input.focus());
    typingText.addEventListener("click", () => { input.focus(); });
}

function initTyping(e) {
    const char = typingText.querySelectorAll("span");
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        // Handle backspace
        if (e.inputType === "deleteContentBackward") {
            if (charIndex > 0) {
                charIndex--;
                if (char[charIndex].classList.contains("incorrect")) {
                    mistake--;
                }
                char[charIndex].classList.remove("correct", "incorrect");
                char.forEach(span => span.classList.remove("cursor"));
                char[charIndex].classList.add("active", "cursor");
            }
        } else {
            if (char[charIndex].innerText === typedChar) {
                char[charIndex].classList.add("correct");
            } else {
                char[charIndex].classList.add("incorrect");
                mistake++;
            }
            char.forEach(span => span.classList.remove("cursor"));
            charIndex++;
            if (charIndex < char.length) {
                char[charIndex].classList.add("active", "cursor");
            }
        }

        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        char.forEach(span => span.classList.remove("cursor"));
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;

        let wpmVal = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    clearInterval(timer);
    loadParagraph();
    input.value = "";
    timeLeft = maxTime;
    time.innerText = timeLeft;
    charIndex = 0;
    mistake = 0;
    mistakes.innerText = 0;
    cpm.innerText = 0;
    wpm.innerText = 0;
    isTyping = false;
    input.focus();
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();