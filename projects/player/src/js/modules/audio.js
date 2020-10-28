let audioArr = [
	'./assets/audio/Blue Stahli - Lakes of Flame.mp3',
	'./assets/audio/Celldweller - End of an Empire.mp3'
];

let elems = [];
for (let i = 0; i < audioArr.length; i++) {
	var url = audioArr[i];
	var elem = document.createElement('audio');
	elem.setAttribute('src', url);
	elems.push(elem);
}

let playBtn = document.querySelector('button.audio-play');

let isPause = false;

let volume = 50;

playBtn.addEventListener('click', (e) => {
	if (!isPause) {
		elems[0].play();
		console.log(elems[0]);
		setTimeout(function() {
			console.log(elems[0].currentTime = 100);
		}, 5000);
		isPause = true;
	} else {
		elems[0].pause();
		isPause = false;
	}
});
